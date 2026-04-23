import { experience } from "../data/portfolioData";

const dotColors = ["bg-pink-500", "bg-rose-500", "bg-fuchsia-500"];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Background</p>
      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-14">Experience</h2>

      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-pink-300 via-rose-300 to-transparent dark:from-pink-900 dark:via-rose-900 hidden md:block" />

        <div className="flex flex-col gap-8">
          {experience.map((job, idx) => (
            <div key={idx} className="flex gap-8 md:pl-12 relative">
              <div className={`hidden md:flex absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-pink-400 dark:border-pink-700 items-center justify-center flex-shrink-0`}>
                <div className={`w-3 h-3 rounded-full ${dotColors[idx % dotColors.length]}`} />
              </div>

              <div className="flex-1 p-6 rounded-2xl border border-pink-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:border-pink-300 dark:hover:border-pink-800 hover:shadow-lg hover:shadow-pink-50 dark:hover:shadow-none transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">{job.role}</h3>
                    <p className="text-pink-500 dark:text-pink-400 text-sm font-bold">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400 text-xs font-semibold rounded-full border border-pink-200 dark:border-pink-900">
                      {job.duration}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
