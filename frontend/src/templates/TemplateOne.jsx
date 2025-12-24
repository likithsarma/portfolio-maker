function TemplateOne({ data, compact = false }) {
  const containerStyle = compact
    ? {
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
        background: "#0f172a",
        color: "#e5e7eb",
      }
    : {
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 55%), #020617",
        padding: "40px 16px",
        fontFamily: "system-ui, sans-serif",
        color: "#e5e7eb",
      };

  const cardStyle = compact
    ? {
        maxWidth: "900px",
        margin: "0 auto",
        background: "#020617",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 18px 40px rgba(15,23,42,0.5)",
        border: "1px solid rgba(148,163,184,0.25)",
      }
    : {
        maxWidth: "1000px",
        margin: "0 auto",
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.98))",
        borderRadius: "24px",
        padding: "32px 30px 40px",
        boxShadow: "0 30px 80px rgba(15,23,42,0.95)",
        border: "1px solid rgba(148,163,184,0.3)",
      };

  // Contact / social flags come from data (already wired in Portfolio.jsx)
  const hasContact =
    data.email ||
    data.phone ||
    data.github ||
    data.linkedin ||
    data.website ||
    data.location;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* HERO / HEADER SECTION */}
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#818cf8",
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
                color: "#f9fafb",
              }}
            >
              {data.name}
            </h1>
            <h3
              style={{
                fontSize: "14px",
                color: "#9ca3af",
                marginBottom: hasContact ? "10px" : 0,
              }}
            >
              {data.title}
            </h3>

            {hasContact && (
              <div style={{ marginTop: "6px" }}>
                {data.location && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#cbd5f5",
                      margin: "0 0 4px",
                    }}
                  >
                    {data.location}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginTop: "4px",
                  }}
                >
                  {data.email && (
                    <Chip
                      label={data.email}
                      href={`mailto:${data.email}`}
                      type="soft"
                    />
                  )}
                  {data.phone && <Chip label={data.phone} type="soft" />}
                  {data.github && (
                    <Chip
                      label="GitHub"
                      href={data.github}
                      type="solid"
                      color="#818cf8"
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
        </header>

        {/* MAIN BODY – TWO COLUMNS ON DESKTOP */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: "28px",
          }}
        >
          {/* LEFT COLUMN: summary + experience + projects */}
          <div>
            {data.summary && (
              <Section title="About">
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#e5e7eb",
                    margin: 0,
                  }}
                >
                  {data.summary}
                </p>
              </Section>
            )}

            {data.experience?.length > 0 && (
              <Section title="Experience">
                {data.experience.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "14px",
                      paddingBottom: "10px",
                      borderBottom:
                        i === data.experience.length - 1
                          ? "none"
                          : "1px solid rgba(31,41,55,0.9)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "8px",
                        marginBottom: "2px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#e5e7eb",
                          fontSize: "14px",
                        }}
                      >
                        {exp.role}{" "}
                        {exp.company && (
                          <span style={{ color: "#9ca3af", fontWeight: 500 }}>
                            · {exp.company}
                          </span>
                        )}
                      </div>
                      {exp.dates && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#6b7280",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {exp.dates}
                        </div>
                      )}
                    </div>
                    <ul
                      style={{
                        marginTop: "6px",
                        paddingLeft: "18px",
                        color: "#d1d5db",
                        fontSize: "13px",
                      }}
                    >
                      {(exp.points || []).map((p, idx) => (
                        <li key={idx} style={{ marginBottom: "2px" }}>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Section>
            )}

            {data.projects?.length > 0 && (
              <Section title="Projects">
                {data.projects.map((proj, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "12px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(55,65,81,0.9)",
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
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#f9fafb",
                        }}
                      >
                        {proj.title}
                      </div>
                      <span
                        style={{
                          height: "6px",
                          width: "6px",
                          borderRadius: "999px",
                          background:
                            "linear-gradient(135deg,#a855f7,#22c55e)",
                        }}
                      />
                    </div>
                    {proj.description && (
                      <p
                        style={{
                          margin: "0 0 4px",
                          fontSize: "13px",
                          color: "#d1d5db",
                          lineHeight: 1.5,
                        }}
                      >
                        {proj.description}
                      </p>
                    )}
                    {proj.tech && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          margin: 0,
                        }}
                      >
                        Tech: {proj.tech}
                      </p>
                    )}
                  </div>
                ))}
              </Section>
            )}
          </div>

          {/* RIGHT COLUMN: skills + education + leadership */}
          <div>
            {data.skills && Object.keys(data.skills).length > 0 && (
              <Section title="Skills">
                {Object.entries(data.skills).map(([key, values]) => (
                  <div
                    key={key}
                    style={{ marginBottom: "6px", fontSize: "13px" }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        color: "#e5e7eb",
                      }}
                    >
                      {key}:
                    </span>{" "}
                    <span style={{ color: "#d1d5db" }}>
                      {values.join(", ")}
                    </span>
                  </div>
                ))}
              </Section>
            )}

            {data.education?.length > 0 && (
              <Section title="Education">
                {data.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "10px",
                      paddingBottom: "8px",
                      borderBottom:
                        i === data.education.length - 1
                          ? "none"
                          : "1px dashed rgba(55,65,81,0.8)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#e5e7eb",
                        fontSize: "14px",
                      }}
                    >
                      {edu.institution}
                    </div>
                    {edu.degree && (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#d1d5db",
                          marginTop: "2px",
                        }}
                      >
                        {edu.degree}
                      </div>
                    )}
                    {edu.years && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          marginTop: "2px",
                        }}
                      >
                        {edu.years}
                      </div>
                    )}
                  </div>
                ))}
              </Section>
            )}

            {data.leadership?.length > 0 && (
              <Section title="Leadership & Activities">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "18px",
                    fontSize: "13px",
                    color: "#d1d5db",
                  }}
                >
                  {data.leadership.map((item, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "22px" }}>
      <h2
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "#9ca3af",
          borderBottom: "1px solid rgba(51,65,85,0.9)",
          paddingBottom: "6px",
          marginBottom: "10px",
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
    gap: "6px",
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
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={style}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(15,23,42,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {label}
      </a>
    );
  }

  return <span style={style}>{label}</span>;
}

export default TemplateOne;
