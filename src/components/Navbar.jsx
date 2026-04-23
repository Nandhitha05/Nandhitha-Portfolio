import { useState, useEffect } from "react";
import { personal } from "../data/portfolioData";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm shadow-pink-100 dark:shadow-none border-b border-pink-100 dark:border-gray-900" : "bg-transparent"
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center text-sm font-black hover:scale-110 transition-transform shadow-lg shadow-pink-200 dark:shadow-none">
          NB
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
            {dark ? (
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
          <button className="md:hidden p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-pink-100 dark:border-gray-900 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
