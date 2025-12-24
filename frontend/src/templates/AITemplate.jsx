function AITemplate({ data, layout, compact = false }) {
  const layoutType = layout?.layout || "two-column"; // "bento" | "two-column" | "single-column"
  const theme = layout?.theme || "dark";
  const accentColor = layout?.accentColor || "#6366f1";

  const themeDark = theme !== "light";

  const sections = layout?.sections || [
    { type: "summary", position: "hero" },
    { type: "skills", style: "chips" },
    { type: "experience", style: "timeline" },
    { type: "projects", style: "cards" },
    { type: "education", style: "minimal" },
    { type: "leadership", style: "simple" },
  ];

  const containerStyle = compact
    ? {
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
        background: themeDark ? "#020617" : "#f3f4f6",
        color: themeDark ? "#e5e7eb" : "#111827",
      }
    : {
        minHeight: "100vh",
        padding: "40px 16px",
        fontFamily: "system-ui, sans-serif",
        background: themeDark
          ? "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 55%), #020617"
          : "#f3f4f6",
        color: themeDark ? "#e5e7eb" : "#111827",
      };

  const cardStyle =
    layoutType === "bento"
      ? {
          maxWidth: "1120px",
          margin: "0 auto",
          borderRadius: "28px",
          padding: "30px 26px 36px",
          background: themeDark ? "#020617" : "#ffffff",
          boxShadow: themeDark
            ? "0 40px 100px rgba(15,23,42,0.9)"
            : "0 24px 60px rgba(15,23,42,0.25)",
          border: themeDark
            ? "1px solid rgba(148,163,184,0.35)"
            : "1px solid rgba(209,213,219,0.8)",
        }
      : {
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "22px",
          padding: "28px 24px 34px",
          background: themeDark ? "#020617" : "#ffffff",
          boxShadow: themeDark
            ? "0 24px 60px rgba(15,23,42,0.85)"
            : "0 16px 40px rgba(15,23,42,0.18)",
          border: themeDark
            ? "1px solid rgba(148,163,184,0.4)"
            : "1px solid rgba(209,213,219,0.8)",
        };

  const Hero = () => {
    return (
      <div
        style={{
          display: layoutType === "bento" ? "flex" : "block",
          flexDirection: "row",
          gap: "18px",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: themeDark ? "#818cf8" : "#4f46e5",
              marginBottom: "6px",
            }}
          >
            Portfolio
          </p>
          <h1
            style={{
              fontSize: "28px",
              lineHeight: 1.1,
              marginBottom: "6px",
            }}
          >
            {data.name || "Portfolio"}
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: themeDark ? "#9ca3af" : "#4b5563",
              marginBottom: "10px",
            }}
          >
            {data.title || "Professional Portfolio"}
          </p>

          {(data.location ||
            data.email ||
            data.github ||
            data.linkedin ||
            data.website) && (
            <div style={{ marginTop: "4px" }}>
              {data.location && (
                <p
                  style={{
                    fontSize: "12px",
                    margin: 0,
                    color: themeDark ? "#e5e7eb" : "#111827",
                  }}
                >
                  {data.location}
                </p>
              )}
              <div
                style={{
                  marginTop: "6px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {data.email && (
                  <Chip
                    label={data.email}
                    href={`mailto:${data.email}`}
                    type="soft"
                  />
                )}
                {data.github && (
                  <Chip
                    label="GitHub"
                    href={data.github}
                    type="solid"
                    color={accentColor}
                  />
                )}
                {data.linkedin && (
                  <Chip
                    label="LinkedIn"
                    href={data.linkedin}
                    type="solid"
                    color="#38bdf8"
                  />
                )}
                {data.website && (
                  <Chip
                    label="Portfolio"
                    href={data.website}
                    type="solid"
                    color="#22c55e"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSection = (section, index) => {
    const style = section.style || "";

    switch (section.type) {
      case "summary":
        return (
          data.summary && (
            <Section key={`summary-${index}`} title="About">
              <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
                {data.summary}
              </p>
            </Section>
          )
        );

      case "skills":
        if (!data.skills || Object.keys(data.skills).length === 0) return null;

        if (style === "chips") {
          return (
            <Section key={`skills-${index}`} title="Skills">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginTop: "4px",
                }}
              >
                {Object.entries(data.skills).flatMap(([group, values]) =>
                  values.map((v, i) => (
                    <Chip
                      key={`${group}-${v}-${i}`}
                      label={v}
                      type="soft"
                      color={accentColor}
                    />
                  ))
                )}
              </div>
            </Section>
          );
        }

        return (
          <Section key={`skills-${index}`} title="Skills">
            {Object.entries(data.skills).map(([k, v]) => (
              <p key={k} style={{ fontSize: "13px", marginBottom: "4px" }}>
                <strong>{k}:</strong> {v.join(", ")}
              </p>
            ))}
          </Section>
        );

      case "experience":
        if (!data.experience?.length) return null;

        return (
          <Section key={`experience-${index}`} title="Experience">
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ fontWeight: 600 }}>
                  {exp.role} {exp.company && `· ${exp.company}`}
                </div>
                {exp.dates && (
                  <div style={{ fontSize: "11px", opacity: 0.75 }}>
                    {exp.dates}
                  </div>
                )}
                <ul style={{ fontSize: "13px", paddingLeft: "18px" }}>
                  {(exp.points || []).map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        );

      case "projects":
        if (!data.projects?.length) return null;

        if (style === "bento-grid" || layoutType === "bento") {
          return (
            <Section key={`projects-${index}`} title="Projects">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "12px",
                }}
              >
                {data.projects.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "14px",
                      padding: "10px 12px",
                      background: themeDark
                        ? "rgba(15,23,42,0.95)"
                        : "#f9fafb",
                      border: themeDark
                        ? "1px solid rgba(51,65,81,0.9)"
                        : "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: "14px" }}>
                        {p.title}
                      </div>
                      <span
                        style={{
                          height: "6px",
                          width: "6px",
                          borderRadius: "999px",
                          background: accentColor,
                        }}
                      />
                    </div>
                    {p.description && (
                      <p
                        style={{
                          margin: "0 0 4px",
                          fontSize: "13px",
                          opacity: 0.9,
                        }}
                      >
                        {p.description}
                      </p>
                    )}
                    {p.tech && (
                      <p
                        style={{
                          fontSize: "11px",
                          opacity: 0.7,
                          margin: 0,
                        }}
                      >
                        Tech: {p.tech}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          );
        }

        return (
          <Section key={`projects-${index}`} title="Projects">
            {data.projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                {p.description && (
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    {p.description}
                  </p>
                )}
                {p.tech && (
                  <p style={{ fontSize: "11px", opacity: 0.75 }}>
                    Tech: {p.tech}
                  </p>
                )}
              </div>
            ))}
          </Section>
        );

      case "education":
        if (!data.education?.length) return null;

        return (
          <Section key={`education-${index}`} title="Education">
            {data.education.map((e, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: 600 }}>{e.institution}</div>
                {e.degree && <div>{e.degree}</div>}
                {e.years && (
                  <div style={{ fontSize: "11px", opacity: 0.75 }}>
                    {e.years}
                  </div>
                )}
              </div>
            ))}
          </Section>
        );

      case "leadership":
        if (!data.leadership?.length) return null;

        return (
          <Section key={`leadership-${index}`} title="Leadership & Activities">
            <ul style={{ paddingLeft: "18px", fontSize: "13px" }}>
              {data.leadership.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </Section>
        );

      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <Hero />
        {sections.map((s, i) => renderSection(s, i))}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "20px" }}>
      <h2
        style={{
          fontSize: "13px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(148,163,184,0.4)",
          paddingBottom: "6px",
          marginBottom: "8px",
          opacity: 0.9,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Chip({ label, href, type = "soft", color = "#64748b" }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    border: "1px solid transparent",
    cursor: href ? "pointer" : "default",
    textDecoration: "none",
    transition: "all 0.18s ease-out",
  };

  const softStyle = {
    background: "rgba(15,23,42,0.7)",
    borderColor: "rgba(55,65,81,0.9)",
    color: "#e5e7eb",
  };

  const solidStyle = {
    background: color,
    borderColor: color,
    color: "#020617",
    fontWeight: 600,
  };

  const style = { ...base, ...(type === "solid" ? solidStyle : softStyle) };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={style}>
        {label}
      </a>
    );
  }
  return <span style={style}>{label}</span>;
}

export default AITemplate;
