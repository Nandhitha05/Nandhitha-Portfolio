import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Resume from "./sections/Resume";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300"> 
      <div className="bg-animated">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Resume />
        <Projects />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-pink-400 dark:text-pink-800 border-t border-pink-100 dark:border-gray-900">
        <p>Crafted with by Nandhitha B</p>
      </footer>
      <Chatbot />
    </div>
  );
}
