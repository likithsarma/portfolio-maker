import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree";

function Templates() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    api
      .get(`resume/${id}/`)
      .then((res) => {
        setResume(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const selectTemplate = async (template) => {
    try {
      const res = await api.post("portfolio/", {
        resume_id: id,
        template_name: template,
      });
      const slug = res.data.slug;
      navigate(`/portfolio/${slug}`);
    } catch {
      alert("Failed to create portfolio");
    }
  };

  const generateWithAI = async () => {
    try {
      setAiLoading(true);
      const res = await api.post("generate-layout/", {
        resume_id: id,
        prompt: aiPrompt,
      });
      const slug = res.data.slug;
      navigate(`/portfolio/${slug}`);
    } catch (err) {
      console.error(err);
      alert("AI layout generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading || !resume) return <p style={{ padding: 40 }}>Loading...</p>;

  const data = {
    name: resume.name,
    title: resume.parsed_data?.title || "Portfolio",
    summary: resume.parsed_data?.summary || "",
    skills: resume.parsed_data?.skills || {},
    experience: resume.parsed_data?.experience || [],
    projects: resume.parsed_data?.projects || [],
    education: resume.parsed_data?.education || [],
    leadership: resume.parsed_data?.leadership || [],
    email: resume.parsed_data?.email || "",
    phone: resume.parsed_data?.phone || "",
    github: resume.parsed_data?.github || "",
    linkedin: resume.parsed_data?.linkedin || "",
    website: resume.parsed_data?.website || "",
    location: resume.parsed_data?.location || "",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "32px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
        Choose Your Portfolio Template
      </h2>
      <p style={{ color: "#9ca3af", marginBottom: "24px" }}>
        Preview your resume in different layouts, or let AI design a custom
        portfolio from your prompt.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "32px",
          marginBottom: "32px",
        }}
      >
        <TemplateCard
          title="Clean Resume"
          description="Single-column, focused on readability."
          onSelect={() => selectTemplate("template-one")}
        >
          <TemplateOne data={data} compact />
        </TemplateCard>

        <TemplateCard
          title="Split Layout"
          description="Sidebar profile with detailed content area."
          onSelect={() => selectTemplate("template-two")}
        >
          <TemplateTwo data={data} compact />
        </TemplateCard>

        <TemplateCard
          title="Bento Pro"
          description="Bento-style, dark, animated layout with modern tiles."
          onSelect={() => selectTemplate("template-three")}
        >
          <TemplateThree data={data} compact />
        </TemplateCard>

        {/* AI Generated template */}
        <TemplateCard
          title="AI Generated"
          description="Describe the vibe and let AI build a layout from your resume."
          onSelect={generateWithAI}
          buttonLabel={aiLoading ? "Generating..." : "Use AI Layout"}
          disabled={aiLoading}
        >
          <div style={{ padding: "12px" }}>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              Tell the AI how you want your portfolio. This prompt is sent along
              with your parsed resume.
            </p>
            <textarea
              rows={5}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Dark bento, cinematic hero, highlight projects and AI skills first, minimal text."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                resize: "vertical",
                fontSize: "13px",
              }}
            />
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "6px",
              }}
            >
              Example prompts: “Framer-style landing”, “Light, minimal, case
              study style for each major project”.
            </p>
          </div>
        </TemplateCard>
      </div>
    </div>
  );
}

function TemplateCard({
  title,
  description,
  children,
  onSelect,
  buttonLabel = "Use This Template",
  disabled = false,
}) {
  return (
    <div
      style={{
        background: "#0b1120",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <h3 style={{ fontSize: "18px" }}>{title}</h3>
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>{description}</p>
      </div>
      <div
        style={{
          background: "#fff",
          color: "#000",
          borderRadius: "12px",
          overflow: "hidden",
          maxHeight: "420px",
          border: "1px solid #e5e7eb",
          flexGrow: 1,
        }}
      >
        {children}
      </div>
      <button
        onClick={onSelect}
        disabled={disabled}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "10px 0",
          borderRadius: "999px",
          border: "none",
          background: disabled
            ? "linear-gradient(135deg,rgba(148,163,184,0.7),rgba(148,163,184,0.9))"
            : "linear-gradient(135deg,rgba(244,114,182),rgba(129,140,248))",
          color: "#020617",
          fontWeight: 600,
          cursor: disabled ? "wait" : "pointer",
          opacity: disabled ? 0.85 : 1,
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default Templates;
