import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function TemplateThree({ data, compact = false }) {
  const wrapperClasses = compact
    ? "min-h-[420px] bg-slate-950 text-slate-50 font-sans p-6"
    : "min-h-screen bg-slate-950 text-slate-50 font-sans py-10 px-6 md:px-10";

  const skillsArray = Object.entries(data.skills || {}).flatMap(
    ([group, values]) => values.map((v) => ({ group, value: v }))
  );

  return (
    <div className={wrapperClasses}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top row: Identity + summary */}
        <div className="grid md:grid-cols-[2fr,3fr] gap-6">
          {/* Identity card */}
          <motion.div
            {...fadeIn(0)}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-6 md:p-7"
          >
            <div className="absolute -top-16 -right-10 h-40 w-40 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-14 -left-10 h-36 w-36 bg-cyan-500/20 rounded-full blur-3xl" />

            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-300/80">
                Portfolio
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {data.name}
              </h1>
              <p className="text-sm text-slate-300">{data.title}</p>

              {/* Contact + social links */}
              {(data.email ||
                data.phone ||
                data.location ||
                data.github ||
                data.linkedin ||
                data.website) && (
                <div className="mt-3 space-y-1 text-xs text-slate-200">
                  {data.location && (
                    <p className="text-slate-300">{data.location}</p>
                  )}

                  {data.email && (
                    <p>
                      <span className="text-slate-400">Email:</span>{" "}
                      <a
                        href={`mailto:${data.email}`}
                        className="text-indigo-200 hover:text-indigo-100 underline underline-offset-2"
                      >
                        {data.email}
                      </a>
                    </p>
                  )}

                  {data.phone && (
                    <p>
                      <span className="text-slate-400">Phone:</span>{" "}
                      {data.phone}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.github && (
                      <a
                        href={data.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-[11px] text-slate-50 hover:border-indigo-400 hover:text-indigo-200 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {data.linkedin && (
                      <a
                        href={data.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-[11px] text-slate-50 hover:border-sky-400 hover:text-sky-200 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {data.website && (
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-[11px] text-slate-50 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                      >
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {skillsArray.length > 0 && (
              <div className="relative mt-6 flex flex-wrap gap-2">
                {skillsArray.slice(0, 6).map((s, i) => (
                  <motion.span
                    key={`${s.group}-${s.value}-${i}`}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-xs text-slate-100 shadow-sm"
                  >
                    {s.value}
                  </motion.span>
                ))}
                {skillsArray.length > 6 && (
                  <span className="px-3 py-1 rounded-full bg-slate-900/50 border border-dashed border-slate-700 text-[11px] text-slate-400">
                    +{skillsArray.length - 6} more
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Summary card */}
          <motion.div
            {...fadeIn(0.1)}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 md:p-7 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-semibold tracking-[0.35em] uppercase text-slate-500">
                  About
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-indigo-500/40 via-slate-700 to-transparent" />
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {data.summary ||
                  "Passionate about building products that blend delightful UX with solid engineering."}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: Experience timeline */}
          <motion.div
            {...fadeIn(0.2)}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 flex flex-col"
          >
            <SectionHeader
              label="Experience"
              accent="from-emerald-400/70 to-cyan-400/40"
            />
            <div className="mt-4 space-y-5">
              {(data.experience || []).map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="relative pl-5 border-l border-slate-700/70"
                >
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.3)]" />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {exp.role}
                    </h3>
                    {exp.dates && (
                      <span className="text-[11px] text-slate-500">
                        {exp.dates}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <p className="text-xs text-slate-400 mb-1">
                      {exp.company}
                    </p>
                  )}
                  <ul className="mt-1 space-y-1 text-[11px] text-slate-300">
                    {(exp.points || []).map((p, idx) => (
                      <li key={idx}>• {p}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              {(!data.experience || data.experience.length === 0) && (
                <p className="text-xs text-slate-500">
                  Add experience entries in your resume to populate this section.
                </p>
              )}
            </div>
          </motion.div>

          {/* Middle column: Projects bento */}
          <motion.div
            {...fadeIn(0.25)}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 flex flex-col"
          >
            <SectionHeader
              label="Projects"
              accent="from-fuchsia-400/70 to-violet-400/40"
            />
            <div className="mt-4 grid grid-cols-1 gap-4">
              {(data.projects || []).map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-slate-900 border border-slate-800/80 p-4 cursor-default"
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {p.title}
                    </h3>
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  </div>
                  {p.description && (
                    <p className="text-xs text-slate-300 leading-snug mb-2">
                      {p.description}
                    </p>
                  )}
                  {p.tech && (
                    <p className="text-[11px] text-slate-400">
                      Tech: {p.tech}
                    </p>
                  )}
                </motion.div>
              ))}
              {(!data.projects || data.projects.length === 0) && (
                <p className="text-xs text-slate-500">
                  Add project entries to showcase your work.
                </p>
              )}
            </div>
          </motion.div>

          {/* Right column: Skills bento + Education & Leadership */}
          <div className="space-y-6">
            {/* Skills bento */}
            <motion.div
              {...fadeIn(0.3)}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl p-6"
            >
              <SectionHeader
                label="Highlights"
                accent="from-amber-400/70 to-orange-400/40"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(Object.entries(data.skills || {}) || []).map(
                  ([group, values], i) => (
                    <motion.div
                      key={group + i}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-slate-900 border border-slate-800/80 p-3"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                        {group}
                      </p>
                      <p className="text-xs text-slate-200">
                        {values.join(", ")}
                      </p>
                    </motion.div>
                  )
                )}
                {Object.keys(data.skills || {}).length === 0 && (
                  <p className="text-xs text-slate-500 col-span-2">
                    Add skills in categories (Languages, Frameworks, Tools...) to
                    fill this grid.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Education + Leadership stacked card */}
            <motion.div
              {...fadeIn(0.35)}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 space-y-5"
            >
              {data.education?.length > 0 && (
                <div>
                  <SectionHeader
                    label="Education"
                    accent="from-sky-400/70 to-cyan-400/40"
                    compact
                  />
                  <div className="mt-3 space-y-3 text-xs text-slate-300">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <p className="font-semibold text-slate-100">
                          {edu.institution}
                        </p>
                        {edu.degree && <p>{edu.degree}</p>}
                        {edu.years && (
                          <p className="text-slate-500">{edu.years}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.leadership?.length > 0 && (
                <div>
                  <SectionHeader
                    label="Leadership"
                    accent="from-rose-400/70 to-red-400/40"
                    compact
                  />
                  <ul className="mt-3 space-y-2 text-xs text-slate-300">
                    {data.leadership.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!data.education?.length && !data.leadership?.length && (
                <p className="text-xs text-slate-500">
                  Education and leadership activities will appear here when
                  provided.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, accent, compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "mb-1"}`}>
      <h2 className="text-[11px] font-semibold tracking-[0.35em] uppercase text-slate-500">
        {label}
      </h2>
      <span
        className={`h-px flex-1 bg-gradient-to-r ${accent} via-slate-700 to-transparent`}
      />
    </div>
  );
}

export default TemplateThree;
