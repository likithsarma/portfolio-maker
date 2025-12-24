import json
import re
import traceback

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from django.conf import settings
from openai import OpenAI

from .models import Resume, Portfolio
from .serializer import ResumeSerializer, PortfolioSerializer
from .resume_parser import extract_text, parse_resume

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

APP_URL = settings.APP_URL
APP_TITLE = settings.APP_TITLE


def extract_json_block(text: str) -> str:
    """
    Extract the first JSON object { ... } from the model output.
    Handles `````` code fences.
    """
    # Remove leading/trailing code fences if present
    text = re.sub(r"^``````$", "", text)

    start = text.find("{")
    if start == -1:
        return ""

    depth = 0
    for i, ch in enumerate(text[start:], start=start):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[start : i + 1]

    return ""


class GenerateLayoutAPIView(APIView):
    def post(self, request, *args, **kwargs):
        resume_id = request.data.get("resume_id")
        user_prompt = request.data.get("prompt", "")

        if not resume_id:
            return Response({"error": "resume_id is required"}, status=400)

        try:
            resume = Resume.objects.get(id=resume_id)
        except Resume.DoesNotExist:
            return Response({"error": "Resume not found"}, status=404)

        parsed = resume.parsed_data or {}

        system = (
            "You design modern portfolio layouts for software developers. "
            "You MUST output valid JSON only, no extra text. "
            "Think like a top-tier product designer (Lovable, Framer, V0 style). "
            "Use sections: summary, skills, experience, projects, education, leadership. "
            "Attributes allowed: layout, theme, accentColor, hero, sections[].type, sections[].style, sections[].position. "
            "layout: 'bento' | 'two-column' | 'single-column'. "
            "theme: 'dark' | 'light'. "
            "hero.style: 'left', 'centered', or 'split'. "
            "For section styles you can use values like: "
            "'timeline', 'cards', 'bento-grid', 'chips', 'minimal', 'columns'. "
        )
        user = (
            f"Resume data: {parsed}\n\n"
            f"User preference (MUST influence layout): {user_prompt}\n\n"
            "Example: 'dark bento, highlight projects first' -> layout='bento', theme='dark', "
            "projects section early in list, projects style='bento-grid'.\n\n"
            "Return ONLY a single JSON object like:\n"
            "{\n"
            '  "layout": "bento",\n'
            '  "theme": "dark",\n'
            '  "accentColor": "#6366f1",\n'
            '  "sections": [\n'
            '    {"type": "summary", "position": "hero"},\n'
            '    {"type": "projects", "style": "bento-grid"},\n'
            '    {"type": "skills", "style": "chips"},\n'
            '    {"type": "experience", "style": "timeline"}\n'
            "  ]\n"
            "}"
        )

        try:
            completion = client.chat.completions.create(
                extra_headers={
                    "HTTP-Referer": APP_URL,
                    "X-Title": APP_TITLE,
                },
                model="deepseek/deepseek-r1-0528:free",
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
            )
            content = completion.choices[0].message.content
            print("RAW LLM RESPONSE:", repr(content))

            json_str = extract_json_block(content)
            print("EXTRACTED JSON:", repr(json_str))

            if not json_str:
                return Response(
                    {"error": "No valid JSON found in LLM response"},
                    status=500,
                )

            layout_config = json.loads(json_str)

        except Exception as e:
            print("ERROR IN GENERATE-LAYOUT:", e)
            traceback.print_exc()
            return Response(
                {"error": "Failed to generate layout", "details": str(e)},
                status=500,
            )

        portfolio, _ = Portfolio.objects.update_or_create(
            resume=resume,
            defaults={
                "template_name": "template-ai",
                "is_published": True,
                "layout_config": layout_config,
            },
        )

        return Response(
            {
                "slug": portfolio.slug,
                "layout_config": layout_config,
            },
            status=200,
        )


class GenerateSummaryAPIView(APIView):
    def post(self, request, *args, **kwargs):
        resume_id = request.data.get("resume_id")
        if not resume_id:
            return Response({"error": "resume_id is required"}, status=400)

        try:
            resume = Resume.objects.get(id=resume_id)
        except Resume.DoesNotExist:
            return Response({"error": "Resume not found"}, status=404)

        parsed = resume.parsed_data or {}

        prompt = (
            "You are writing a concise, first-person portfolio summary for a software/dev "
            "candidate. 3–4 sentences max, friendly but professional.\n\n"
            f"Name: {resume.name}\n"
            f"Location: {parsed.get('location', '')}\n"
            f"Skills: {parsed.get('skills', {})}\n"
            f"Experience: {parsed.get('experience', [])}\n"
            f"Projects: {parsed.get('projects', [])}\n\n"
            "Write only the summary text, no headings."
        )

        try:
            completion = client.chat.completions.create(
                extra_headers={
                    "HTTP-Referer": APP_URL,
                    "X-Title": APP_TITLE,
                },
                model="deepseek/deepseek-r1-0528:free",
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
            )
            summary = completion.choices[0].message.content.strip()
        except Exception as e:
            print("ERROR IN GENERATE-SUMMARY:", e)
            traceback.print_exc()
            return Response(
                {"error": "Failed to generate summary", "details": str(e)},
                status=500,
            )

        parsed["summary"] = summary
        resume.parsed_data = parsed
        resume.save(update_fields=["parsed_data"])

        return Response({"summary": summary}, status=200)


class ResumeUploadAPIView(APIView):
    def post(self, request):
        resume_file = request.FILES.get("resume")

        if not resume_file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_extensions = (".pdf", ".doc", ".docx")
        if not any(resume_file.name.lower().endswith(ext) for ext in allowed_extensions):
            return Response(
                {"error": "Only PDF, DOC, DOCX files are allowed"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        resume = Resume.objects.create(resume_file=resume_file)

        try:
            text = extract_text(resume.resume_file.path)
            parsed_data = parse_resume(text)

            resume.name = parsed_data.get("name", "")
            resume.parsed_data = parsed_data
            resume.save()
        except Exception as e:
            resume.delete()
            return Response(
                {"error": "Failed to parse resume", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ResumeSerializer(resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ResumeDetailAPIView(RetrieveUpdateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer


class PortfolioCreateAPIView(APIView):
    def post(self, request):
        resume_id = request.data.get("resume_id")
        template_name = request.data.get("template_name")

        if not resume_id or not template_name:
            return Response(
                {"error": "resume_id and template_name are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            resume = Resume.objects.get(id=resume_id)
        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        portfolio, created = Portfolio.objects.update_or_create(
            resume=resume,
            defaults={
                "template_name": template_name,
                "is_published": True,
            },
        )

        serializer = PortfolioSerializer(portfolio)
        status_code = (
            status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )
        return Response(serializer.data, status=status_code)


class PublicPortfolioAPIView(RetrieveAPIView):
    queryset = Portfolio.objects.filter(is_published=True)
    serializer_class = PortfolioSerializer
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

class TogglePublishAPIView(APIView):
    def post(self, request, slug):
        try:
            portfolio = Portfolio.objects.get(slug=slug)
            portfolio.is_published = not portfolio.is_published
            portfolio.save()
            return Response({"is_published": portfolio.is_published}, status=200)
        except Portfolio.DoesNotExist:
            return Response({"error": "Portfolio not found"}, status=404)
