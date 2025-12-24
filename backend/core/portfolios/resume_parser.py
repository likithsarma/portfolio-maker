import pdfplumber
import docx
import re

SECTION_HEADERS = [
    "education",
    "experience",
    "technical skills",
    "projects",
    "leadership",
    "leadership & activities",
]

def extract_text(file_path):
    text = ""

    if file_path.endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += (page.extract_text() or "") + "\n"

    elif file_path.endswith(".docx"):
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"

    return text


def split_sections(text):
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    sections = {}
    current_section = "header"
    sections[current_section] = []

    for line in lines:
        lower = line.lower()

        if lower in SECTION_HEADERS:
            current_section = lower
            sections[current_section] = []
        else:
            sections[current_section].append(line)

    return sections


def extract_basic_info(header_lines):
    full_text = " ".join(header_lines)

    email = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}", full_text)
    phone = re.search(r"\+?\d[\d\s\-]{8,}\d", full_text)
    linkedin = re.search(r"linkedin\.com/[^\s]+", full_text)

    return {
        "name": header_lines[0] if header_lines else "",
        "email": email.group() if email else "",
        "phone": phone.group() if phone else "",
        "linkedin": f"https://{linkedin.group()}" if linkedin else "",
        "location": header_lines[-1] if len(header_lines) > 2 else ""
    }


def parse_education(lines):
    education = []
    current = {}

    for line in lines:
        if "institute" in line.lower() or "college" in line.lower() or "school" in line.lower():
            if current:
                education.append(current)
            current = {"institution": line, "details": []}
        else:
            current.setdefault("details", []).append(line)

    if current:
        education.append(current)

    return education


def parse_experience(lines):
    experience = []
    current = {}

    for line in lines:
        if "|" not in line and any(word in line.lower() for word in ["intern", "engineer", "manager"]):
            if current:
                experience.append(current)
            current = {"role": line, "points": []}
        elif line.startswith("•"):
            current.setdefault("points", []).append(line.replace("•", "").strip())

    if current:
        experience.append(current)

    return experience


def parse_skills(lines):
    skills = {}

    for line in lines:
        if ":" in line:
            category, items = line.split(":", 1)
            skills[category.strip()] = [i.strip() for i in items.split(",")]

    return skills


def parse_projects(lines):
    projects = []
    current = {}

    for line in lines:
        if "|" in line:
            if current:
                projects.append(current)
            title, tech = line.split("|", 1)
            current = {
                "title": title.strip(),
                "tech": [t.strip() for t in tech.split(",")],
                "description": []
            }
        elif line.startswith("•"):
            current.setdefault("description", []).append(line.replace("•", "").strip())

    if current:
        projects.append(current)

    return projects


def parse_resume(text):
    sections = split_sections(text)

    basic = extract_basic_info(sections.get("header", []))

    return {
        **basic,
        "education": parse_education(sections.get("education", [])),
        "experience": parse_experience(sections.get("experience", [])),
        "skills": parse_skills(sections.get("technical skills", [])),
        "projects": parse_projects(sections.get("projects", [])),
        "leadership": sections.get("leadership & activities", [])
    }
