import { useState } from "react";
import { personal } from "../data/portfolioData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Hi Nandhitha,\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const filled = form.name && form.email && form.message;

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Let's Talk</p>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Get in Touch</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12">Have a project in mind or just want to say hi? I'd love to hear from you!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Your Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="name"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Share your thoughts..."
              className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition resize-none" />
          </div>
          <button type="submit" disabled={!filled}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-black rounded-xl transition-all hover:scale-[1.02] active:scale-100 shadow-lg shadow-pink-200 dark:shadow-none">
            {sent ? "✓ Email client opened!" : "Send Message"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400">
          Or email directly at{" "}
          <a href={`mailto:${personal.email}`} className="text-pink-500 hover:underline font-semibold">{personal.email}</a>
        </p>
      </div>
    </section>
  );
}
