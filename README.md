# Personal Portfolio — React + Tailwind CSS + Claude AI Chatbot

A modern, responsive portfolio website with dark/light mode and an AI-powered chatbot.

---

## Folder Structure

```
portfolio/
├── public/
│   └── resume.pdf          ← Put your resume PDF here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      ← Sticky nav with dark/light toggle
│   │   └── Chatbot.jsx     ← AI-powered floating chatbot
│   ├── sections/
│   │   ├── Hero.jsx        ← Name, role, bio, CTA, social links
│   │   ├── Resume.jsx      ← Download button + skills grid
│   │   ├── Projects.jsx    ← Project cards with tech stack
│   │   ├── Certifications.jsx
│   │   ├── Experience.jsx  ← Timeline layout
│   │   └── Contact.jsx     ← Email-linked contact form
│   ├── data/
│   │   └── portfolioData.js ← ← ← ALL YOUR CONTENT LIVES HERE
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── netlify.toml
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Personalise your content
Open `src/data/portfolioData.js` and replace ALL placeholder values:

```js
export const personal = {
  name: "Your Real Name",
  role: "Your Role",
  tagline: "Your tagline here",
  bio: "Your bio...",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resumeUrl: "/resume.pdf",   // Put your PDF in /public/resume.pdf
  profileImage: null,          // Or: "https://your-image-url.com/photo.jpg"
};
```

Fill in `skills`, `projects`, `certifications`, and `experience` similarly.

### 3. Add your resume PDF
Place your resume file at: `public/resume.pdf`

### 4. Run locally
```bash
npm run dev
```
Visit http://localhost:5173

---

## Chatbot Setup (Claude API)

The chatbot uses the Anthropic Claude API. Here's how to connect it:

### Option A — Development (Quick)
The chatbot calls the API directly from the browser. This works for demos but
exposes your API key. Only use this for local development.

Add a `.env` file in the project root:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Then update `src/components/Chatbot.jsx`, change the fetch headers to:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
```

### Option B — Production (Recommended)
Use a Netlify serverless function to proxy the API call (keeps your key secret):

1. Create `netlify/functions/chat.js`:
```js
export async function handler(event) {
  const { messages } = JSON.parse(event.body);
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages,
    }),
  });
  const data = await response.json();
  return { statusCode: 200, body: JSON.stringify(data) };
}
```

2. Update `Chatbot.jsx` to call `/.netlify/functions/chat` instead of the Anthropic URL.

3. In Netlify dashboard → Site settings → Environment variables, add:
   `ANTHROPIC_API_KEY = sk-ant-your-key-here`

---

## Deploy to Netlify

### Via Netlify CLI (Recommended)
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Via GitHub (Auto-deploy on push)
1. Push your project to GitHub
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

Every `git push` to main will trigger a new deploy automatically.

### Custom Domain (Optional)
In Netlify: Site settings → Domain management → Add custom domain

---

## Customisation Tips

| What you want to change | Where to go |
|---|---|
| Your info, skills, projects | `src/data/portfolioData.js` |
| Chatbot personality & knowledge | `chatbotKnowledge` string in `portfolioData.js` |
| Colour accent (indigo → any) | Replace `indigo` with any Tailwind colour in all JSX files |
| Add/remove sections | Edit `src/App.jsx` |
| Nav links | Edit `navLinks` array in `src/components/Navbar.jsx` |
| Suggested chatbot questions | Edit `SUGGESTED_QUESTIONS` in `src/components/Chatbot.jsx` |

---

## Tech Stack
- **React 18** — functional components + hooks
- **Tailwind CSS 3** — utility-first styling with dark mode
- **Vite** — fast dev server and build tool
- **@heroicons/react** — clean SVG icons
- **Anthropic Claude API** — AI chatbot
- **Netlify** — deployment + serverless functions
