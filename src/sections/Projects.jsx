import { projects } from "../data/portfolioData";

const barColors = ["from-pink-400 to-rose-500", "from-fuchsia-400 to-pink-500", "from-rose-400 to-pink-400"];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Portfolio</p>
      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">My Projects</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-14 max-w-xl">Things I've designed, coded, and built.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <article key={project.id}
            className="group flex flex-col rounded-2xl border border-pink-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-100 dark:hover:shadow-none transition-all duration-300">

            <div className={`h-1.5 w-full bg-gradient-to-r ${barColors[idx % barColors.length]}`} />

            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-900">
                    {tech}
                  </span>
                ))}
              </div>

              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-pink-500 hover:text-pink-700 dark:hover:text-pink-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                View on GitHub
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}