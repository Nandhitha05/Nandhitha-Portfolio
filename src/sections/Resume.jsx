import { personal, skills } from "../data/portfolioData";

const catColors = {
  "Languages":        "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border border-orange-200 dark:border-orange-900",
  "Frameworks":       "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-900",
  "Databases":        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border border-green-200 dark:border-green-900",
  "Tools":            "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 border border-violet-200 dark:border-violet-900",
  "Cloud & Analytics":"bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-900",
  "Soft Skills":      "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900",
};

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-14">
        <div>
          <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Resume & Skills</p>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">What I Bring</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md">Java full-stack, cloud-certified, and data-driven — ready to build.</p>
        </div>
        <a href={personal.resumeUrl} download
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-pink-200 dark:shadow-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Download Resume
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map(group => (
          <div key={group.category} className="p-6 rounded-2xl border border-pink-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:border-pink-300 dark:hover:border-pink-800 hover:shadow-lg hover:shadow-pink-50 dark:hover:shadow-none transition-all">
            <h3 className="text-xs font-black text-pink-500 uppercase tracking-widest mb-4">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map(skill => (
                <span key={skill} className={`px-3 py-1 rounded-full text-xs font-semibold ${catColors[group.category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
