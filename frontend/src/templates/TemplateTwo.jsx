import { motion } from "framer-motion";

function TemplateTwo({ data, compact = false }) {
  const wrapperClasses = compact
    ? "flex min-h-[420px] font-sans"
    : "flex min-h-screen font-sans";

  const skillsArray = Object.entries(data.skills || {}).flatMap(
    ([group, values]) => values.map((v) => ({ group, value: v }))
  );

  return (
    <div className={wrapperClasses}>
      {/* Sidebar */}
      <aside className="w-[30%] bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50 px-6 py-8 flex flex-col gap-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-semibold tracking-tight">
            {data.name}
          </h1>
          <p className="text-sm text-slate-400">{data.title}</p>
        </motion.div>

        {skillsArray.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((s, i) => (
                <motion.span
                  key={`${s.group}-${s.value}-${i}`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-3 py-1 rounded-full bg-slate-800/80 text-xs text-slate-100 border border-slate-700/70 shadow-sm"
                >
                  {s.value}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {data.education?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Education
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="font-semibold text-slate-100">
                    {edu.institution}
                  </div>
                  {edu.degree && <div>{edu.degree}</div>}
                  {edu.years && (
                    <div className="text-slate-500">{edu.years}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </aside>

      {/* Main content */}
      <main className="w-[70%] bg-slate-950 px-10 py-10 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Summary */}
          {data.summary && (
            <MotionSection title="About">
              <p className="text-slate-300 leading-relaxed text-sm">
                {data.summary}
              </p>
            </MotionSection>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <MotionSection title="Experience">
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="relative pl-6 border-l border-slate-800 group"
                  >
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-[0_0_0_3px_rgba(129,140,248,0.35)]" />
                    <div className="flex justify-between items-baseline gap-3">
                      <h4 className="text-sm font-semibold text-slate-100">
                        {exp.role}
                      </h4>
                      {exp.dates && (
                        <span className="text-[11px] text-slate-500">
                          {exp.dates}
                        </span>
                      )}
                    </div>
                    {exp.company && (
                      <div className="text-xs text-slate-400 mb-1">
                        {exp.company}
                      </div>
                    )}
                    <ul className="mt-2 space-y-1 text-xs text-slate-300">
                      {(exp.points || []).map((p, idx) => (
                        <li key={idx} className="leading-snug">
                          • {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </MotionSection>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <MotionSection title="Projects">
              <div className="grid md:grid-cols-2 gap-5">
                {data.projects.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/90 p-4 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-400/60 transition-all duration-300"
                  >
                    <h4 className="text-sm font-semibold text-slate-50 mb-1 flex items-center gap-2">
                      {p.title}
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                    </h4>
                    {p.description && (
                      <p className="text-xs text-slate-300 mb-2 leading-snug">
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
              </div>
            </MotionSection>
          )}

          {/* Leadership */}
          {data.leadership?.length > 0 && (
            <MotionSection title="Leadership & Activities">
              <ul className="space-y-2 text-xs text-slate-300">
                {data.leadership.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </MotionSection>
          )}
        </div>
      </main>
    </div>
  );
}

function MotionSection({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-500">
          {title}
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-slate-700 via-slate-800 to-transparent" />
      </div>
      {children}
    </motion.section>
  );
}

export default TemplateTwo;
