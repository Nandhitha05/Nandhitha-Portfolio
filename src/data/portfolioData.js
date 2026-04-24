export const personal = {
  name: "Nandhitha B",
  role: "Java Full Stack Developer",
  tagline: "Building smart, scalable solutions with Java, Cloud & AI.",
  bio: "I am a passionate and driven tech enthusiast with a constant eagerness to learn and adapt to new technologies, and opportunities. I have built a solid foundation in Java Full Stack Development through my internship experience and real-world projects. Additionally, I have a strong interest in emerging technologies such as Cloud Computing, supported by relevant certifications.",
  email: "nandhithab.it@gmail.com",
  github: "https://github.com/Nandhitha05",
  linkedin: "https://www.linkedin.com/in/nandhitha-b-/",
  resumeUrl: "/Resume.pdf",
  profileImage: null,
};

export const skills = [
  { category: "Languages",        items: ["Java", "Python", "HTML5", "CSS3", "JavaScript"] },
  { category: "Frameworks",       items: ["Spring Boot", "ReactJS", "TypeScript"] },
  { category: "Databases",        items: ["MySQL", "PostgreSQL"] },
  { category: "Tools",            items: ["Git", "GitHub", "Postman", "VSCode", "Eclipse"] },
  { category: "Cloud & Analytics",items: ["Google Cloud", "Oracle Cloud", "SQL"] },
  { category: "Soft Skills",      items: ["Presentation", "Content Writing", "Event Organization", "Leadership"] },
];

export const projects = [
  {
    id: 1,
    title: "Quiz Application",
    description: "A RESTful Java-based quiz system for dynamic quiz creation, random question selection, and result evaluation. Tested end-to-end using Postman.",
    techStack: ["Spring Boot", "JPA", "MySQL", "Postman"],
    githubUrl: "https://github.com/Nandhitha05/QuizApplication",
    liveUrl: null,
    featured: true,
  },
  {
    id: 2,
    title: "TuneX – Music Player",
    description: "A responsive web-based music player with play, pause, next, and previous song controls for a seamless user interaction experience.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/Nandhitha05/TuneX",
    liveUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: "APRIX – Smart Retail Platform",
    description: "A smart retail platform connecting shoppers with local stores, offering real-time product availability, prices, and ML-powered personalized suggestions.",
    techStack: ["Machine Learning", "Python", "React", "MySQL"],
    githubUrl: "https://github.com/Nandhitha05",
    liveUrl: null,
    featured: false,
  },
];

export const certifications = [
  { title: "Google Cloud Computing Foundations Certificate", platform: "Google Cloud", year: "2026" },
  { title: "Oracle Cloud Infrastructure Foundations Associate", platform: "Oracle",       year: "2025" },
  { title: "Google Data Analytics Professional Certificate",   platform: "Coursera",      year: "2025" },
];

export const experience = [
  {
    company: "Chennai Metro Rail Limited (CMRL)",
    role: "Operations Intern",
    duration: "June 30 – July 9, 2025",
    location: "Nandanam, Chennai",
    logo: "/logo/CMRL.png",
    highlights: [
      "Gained exposure to railway operations and infrastructure management.",
      "Worked under the supervision of AGM (RSO), Thiru Sateesh Prabhu.",
      "Observed large-scale systems integration and operational workflows.",
    ],
  },
  {
    company: "AICL Training",
    role: "Java Full Stack Intern",
    duration: "May 2025 – July 2025",
    location: "Royapettah, Chennai",
    logo: "/logo/AICL.webp",
    highlights: [
      "Built full-stack applications using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript.",
      "Developed RESTful APIs and integrated front-end interfaces with back-end services.",
      "Mentored by Mr. Eshwar, Team Leader – Web Design & Development.",
    ],
  },
  {
    company: "Medtoureasy",
    role: "Data Analytics Trainee",
    duration: "January 2025",
    location: "Remote",
    logo: "/logo/mte.jpg",
    highlights: [
      "Gained hands-on experience in data collection, cleaning, and visualization.",
      "Earned the Google Data Analytics Professional Certificate.",
      "Worked with SQL, Excel, Tableau, and Python for data analysis tasks.",
    ],
  },
];

export const achievements = [
  { title: "Codecraft'24 — 2nd Prize, Web Dev",   description: "Won 2nd Prize in web development at the 24-hour hackathon Codecraft'24 (Sep 2–3, 2024).", icon: "🏆" },
  { title: "IEEE YESIST12 — Paper Finalist",       description: "Finalist under Innovation Track at Tunis Science City, Tunisia (Mar 2024).",               icon: "🌍" },
  { title: "National Gold Medalist — Tennikoit",   description: "Won Gold & Silver medals at National-Level Tennikoit Championship, Bardhaman, West Bengal (2018).", icon: "🥇" },
  { title: "Ms. Perfect Award",                    description: "Honored for exceptional performance in both academics and sports.",                          icon: "⭐" },
];

export const chatbotKnowledge = `
Your name is Tony. You are a friendly AI assistant on Nandhitha B's portfolio website.
If asked who you are, say "I'm Tony, Nandhitha's AI assistant."
Answer questions about Nandhitha warmly, concisely and professionally.
Speak about Nandhitha in third person. Keep answers under 120 words. Be specific.

PERSONAL: Nandhitha B, Java Full Stack Developer & IT Student at Sri Sai Ram Institute of Technology (B.Tech IT, CGPA: 8.81)
EMAIL: nandhithab.it@gmail.com

SKILLS: Java, Python, Spring Boot, ReactJS, TypeScript, MySQL, PostgreSQL, Git, Google Cloud, Oracle Cloud, Tableau

PROJECTS:
- Quiz Application: RESTful Java quiz system (Spring Boot, JPA, MySQL)
- TuneX: Responsive web music player (HTML, CSS, JavaScript)
- APRIX: Smart retail platform with ML-powered personalized suggestions

CERTIFICATIONS: Google Cloud Computing Foundations, Oracle Cloud Infrastructure Foundations, Google Data Analytics Professional

EXPERIENCE:
- Java Full Stack Intern at AICL Training (May–Jul 2025)
- Data Analytics Trainee at Medtoureasy (Jan 2025)
- Operations Intern at CMRL (Jul 2025)

ACHIEVEMENTS: 2nd Prize Codecraft'24 hackathon, IEEE YESIST12 finalist in Tunisia, National Gold Medalist Tennikoit, Ms. Perfect Award

If asked something outside this, suggest contacting Nandhitha at nandhithab.it@gmail.com.
`;