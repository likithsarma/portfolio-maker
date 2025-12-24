import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree";
import AITemplate from "../templates/AITemplate";

function Portfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    api
      .get(`portfolio/${slug}/`)
      .then((res) => {
        setPortfolio(res.data);
        setIsPublished(res.data.is_published);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Portfolio fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p style={{ padding: 40 }}>Loading portfolio...</p>;
  if (!portfolio) return <p style={{ padding: 40 }}>Portfolio not found.</p>;

  const rd = portfolio.resume_data || {};

  const data = {
    name: rd.name || "",
    title: rd.title || "Portfolio",
    summary: rd.summary || "",
    skills: rd.skills || {},
    experience: rd.experience || [],
    projects: rd.projects || [],
    education: rd.education || [],
    leadership: rd.leadership || [],
    email: rd.email || "",
    phone: rd.phone || "",
    github: rd.github || "",
    linkedin: rd.linkedin || "",
    website: rd.website || "",
    location: rd.location || "",
  };

  const template = portfolio.template_name;
  const layoutConfig = portfolio.layout_config || null;

  const togglePublish = async () => {
    try {
      const res = await api.post(`/portfolio/${slug}/toggle-publish/`);
      setIsPublished(res.data.is_published);
    } catch (err) {
      console.error(err);
      alert("Failed to update publish status");
    }
  };

  const shareLink = `https://yourdomain.com/portfolio/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied!");
  };

  if (template === "template-one") {
    return (
      <div>
        <TemplateOne data={data} />
        <div style={{ marginTop: "20px" }}>
          <button onClick={togglePublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          {isPublished && (
            <button onClick={copyLink} style={{ marginLeft: "10px" }}>
              Copy Share Link
            </button>
          )}
        </div>
      </div>
    );
  }

  if (template === "template-two") {
    return (
      <div>
        <TemplateTwo data={data} />
        <div style={{ marginTop: "20px" }}>
          <button onClick={togglePublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          {isPublished && (
            <button onClick={copyLink} style={{ marginLeft: "10px" }}>
              Copy Share Link
            </button>
          )}
        </div>
      </div>
    );
  }

  if (template === "template-three") {
    return (
      <div>
        <TemplateThree data={data} />
        <div style={{ marginTop: "20px" }}>
          <button onClick={togglePublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          {isPublished && (
            <button onClick={copyLink} style={{ marginLeft: "10px" }}>
              Copy Share Link
            </button>
          )}
        </div>
      </div>
    );
  }

  if (template === "template-ai") {
    return (
      <div>
        <AITemplate data={data} layout={layoutConfig} />
        <div style={{ marginTop: "20px" }}>
          <button onClick={togglePublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          {isPublished && (
            <button onClick={copyLink} style={{ marginLeft: "10px" }}>
              Copy Share Link
            </button>
          )}
        </div>
      </div>
    );
  }

  return <p style={{ padding: 40 }}>Template not found.</p>;
}

export default Portfolio;
