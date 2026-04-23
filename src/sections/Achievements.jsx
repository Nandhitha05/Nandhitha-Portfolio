import { achievements } from "../data/portfolioData";

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Honours</p>
      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-14">Achievements & Awards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {achievements.map((a, idx) => (
          <div key={idx}
            className="flex gap-4 p-6 rounded-2xl border border-pink-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:border-pink-300 dark:hover:border-pink-800 hover:shadow-lg hover:shadow-pink-50 transition-all hover:-translate-y-1">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950 flex items-center justify-center text-2xl shadow-sm">
              {a.icon}
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white mb-1">{a.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
