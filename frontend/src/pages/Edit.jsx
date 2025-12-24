import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    api
      .get(`resume/${id}/`)
      .then((res) => {
        if (!res.data.parsed_data) {
          res.data.parsed_data = {};
        }
        setResume(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load resume");
        setLoading(false);
      });
  }, [id]);

  const updateParsedData = (key, value) => {
    setResume((prev) => ({
      ...prev,
      parsed_data: {
        ...(prev.parsed_data || {}),
        [key]: value,
      },
    }));
  };

  const safeJSON = (value, fallback) =>
    value === undefined || value === null
      ? fallback
      : JSON.stringify(value, null, 2);

  const handleSave = async () => {
    try {
      await api.put(`resume/${id}/`, {
        name: resume.name,
        parsed_data: resume.parsed_data,
      });
      navigate(`/templates/${id}`);
    } catch {
      alert("Save failed");
    }
  };

  const handleGenerateSummary = async () => {
    try {
      setAiLoading(true);
      const res = await api.post("generate-summary/", { resume_id: id });
      const summary = res.data.summary || "";
      updateParsedData("summary", summary);
    } catch (err) {
      console.error(err);
      alert("AI summary generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (error) return <p style={{ padding: 40 }}>{error}</p>;

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
        Edit Parsed Resume
      </h2>
      <p style={{ color: "#9ca3af", marginBottom: "24px" }}>
        Tweak anything the parser missed. Keep JSON arrays/objects valid.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.8fr",
          gap: "24px",
        }}
      >
        {/* LEFT PANEL: basic + links */}
        <div
          style={{
            background: "#0b1120",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          {/* Name */}
          <label style={{ display: "block", marginBottom: "8px" }}>Name</label>
          <input
            value={resume.name || ""}
            onChange={(e) =>
              setResume((prev) => ({ ...prev, name: e.target.value }))
            }
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          {/* Email */}
          <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
          <input
            value={resume.parsed_data.email || ""}
            onChange={(e) => updateParsedData("email", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          {/* Phone */}
          <label style={{ display: "block", marginBottom: "8px" }}>Phone</label>
          <input
            value={resume.parsed_data.phone || ""}
            onChange={(e) => updateParsedData("phone", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          {/* GitHub */}
          <label style={{ display: "block", marginBottom: "8px" }}>
            GitHub URL
          </label>
          <input
            value={resume.parsed_data.github || ""}
            onChange={(e) => updateParsedData("github", e.target.value)}
            placeholder="https://github.com/username"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          {/* LinkedIn */}
          <label style={{ display: "block", marginBottom: "8px" }}>
            LinkedIn URL
          </label>
          <input
            value={resume.parsed_data.linkedin || ""}
            onChange={(e) => updateParsedData("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/username"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          {/* Website / portfolio */}
          <label style={{ display: "block", marginBottom: "8px" }}>
            Website / Portfolio URL
          </label>
          <input
            value={resume.parsed_data.website || ""}
            onChange={(e) => updateParsedData("website", e.target.value)}
            placeholder="https://your-portfolio.com"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          {/* Location */}
          <label style={{ display: "block", marginBottom: "8px" }}>
            Location
          </label>
          <input
            value={resume.parsed_data.location || ""}
            onChange={(e) => updateParsedData("location", e.target.value)}
            placeholder="City, Country"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              marginBottom: "16px",
            }}
          />

          <p style={{ fontSize: "14px", color: "#9ca3af" }}>
            You can also edit JSON blocks on the right. Lists should stay arrays,
            and skills can stay as an object of arrays.
          </p>

          {/* AI summary button */}
          <button
            onClick={handleGenerateSummary}
            disabled={aiLoading}
            style={{
              marginTop: "12px",
              width: "100%",
              padding: "8px 0",
              borderRadius: "999px",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
              fontWeight: 500,
              cursor: aiLoading ? "wait" : "pointer",
            }}
          >
            {aiLoading ? "Generating summary with AI..." : "Generate Summary with AI"}
          </button>

          <button
            onClick={handleSave}
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "10px 0",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(135deg,rgba(52,211,153),rgba(59,130,246))",
              color: "#020617",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save & Choose Template
          </button>
        </div>

        {/* RIGHT PANEL: JSON sections */}
        <div
          style={{
            background: "#0b1120",
            borderRadius: "12px",
            padding: "20px",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Section
            title="Summary (string)"
            value={resume.parsed_data.summary || ""}
            onChange={(val) => updateParsedData("summary", val)}
            isRaw
          />

          <JSONSection
            title="Education (array)"
            value={safeJSON(resume.parsed_data.education, [])}
            onChange={(obj) => updateParsedData("education", obj)}
            fallback="[]"
          />

          <JSONSection
            title="Experience (array)"
            value={safeJSON(resume.parsed_data.experience, [])}
            onChange={(obj) => updateParsedData("experience", obj)}
            fallback="[]"
          />

          <JSONSection
            title="Projects (array)"
            value={safeJSON(resume.parsed_data.projects, [])}
            onChange={(obj) => updateParsedData("projects", obj)}
            fallback="[]"
          />

          <JSONSection
            title="Skills (object)"
            value={safeJSON(resume.parsed_data.skills, {})}
            onChange={(obj) => updateParsedData("skills", obj)}
            fallback="{}"
          />

          <JSONSection
            title="Leadership (array)"
            value={safeJSON(resume.parsed_data.leadership, [])}
            onChange={(obj) => updateParsedData("leadership", obj)}
            fallback="[]"
          />
        </div>
      </div>
    </div>
  );
}

function Section({ title, value, onChange, isRaw = false }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>{title}</h3>
      {isRaw ? (
        <textarea
          rows={3}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #1f2937",
            background: "#020617",
            color: "#e5e7eb",
            fontFamily: "monospace",
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}
    </div>
  );
}

function JSONSection({ title, value, onChange, fallback }) {
  const handleChange = (e) => {
    try {
      const parsed = JSON.parse(e.target.value || fallback);
      onChange(parsed);
    } catch {
      // ignore parse error, user will see invalid JSON visually
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>{title}</h3>
      <textarea
        rows={6}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #1f2937",
          background: "#020617",
          color: "#e5e7eb",
          fontFamily: "monospace",
          fontSize: "13px",
        }}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Edit;
