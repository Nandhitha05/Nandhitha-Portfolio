import { certifications } from "../data/portfolioData";

const platformIcons = {
  "Google Cloud": "https://img.icons8.com/?size=100&id=WHRLQdbEXQ16&format=png",
  "Oracle":       "https://img.icons8.com/?size=100&id=39913&format=png",
  "Coursera":     "https://img.icons8.com/?size=100&id=YpTLIHoEkqTC&format=png",
};

const platformColors = [
  "from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 border-pink-200 dark:border-pink-900",
  "from-fuchsia-50 to-pink-50 dark:from-fuchsia-950 dark:to-pink-950 border-fuchsia-200 dark:border-fuchsia-900",
  "from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 border-rose-200 dark:border-rose-900",
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Credentials</p>
      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-14">Certifications</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => (
          <div key={idx}
            className={`flex gap-4 p-5 rounded-2xl border bg-gradient-to-br backdrop-blur-sm ${platformColors[idx % platformColors.length]} transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-none`}>
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm border border-pink-100 dark:border-gray-800 p-2">
              {platformIcons[cert.platform] ? (
                <img
                  src={platformIcons[cert.platform]}
                  alt={cert.platform}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-2xl">🏅</span>
              )}
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white leading-tight mb-1">{cert.title}</h3>
              <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold">{cert.platform}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-white/80 dark:bg-gray-900/80 text-xs text-gray-500 dark:text-gray-400 rounded-full border border-pink-100 dark:border-gray-800">
                {cert.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}