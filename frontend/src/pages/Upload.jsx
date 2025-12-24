import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setError("");
      const response = await api.post("upload-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const resumeId = response.data.id;
      navigate(`/edit/${resumeId}`);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#0f172a,#020617)",
        color: "#e5e7eb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "#020617",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Portfolio Maker</h1>
        <p style={{ marginBottom: "24px", color: "#9ca3af" }}>
          Upload your resume; edit the parsed details; pick a template; get a
          shareable portfolio.
        </p>

        <label
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: "999px",
            border: "1px dashed #4b5563",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          <span>{file ? file.name : "Choose resume (PDF / DOCX)"}</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            display: "block",
            width: "100%",
            padding: "10px 0",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg,rgba(96,165,250),rgba(129,140,248))",
            color: "#0b1020",
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Uploading..." : "Upload & Continue"}
        </button>

        {error && (
          <p style={{ color: "#f97373", marginTop: "12px", fontSize: "14px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Upload;
