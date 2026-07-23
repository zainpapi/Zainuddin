export const site = {
  name: "Zain Uddin",
  role: "Future Front-End Developer",
  location: "Quetta, Pakistan",
  tagline: "I build interactive web experiences.",
  positioning:
    "9th-grade aspiring developer & skilled copywriter crafting fast, beautiful, and human interfaces on the web.",
  email: "cadetzain102@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/cadetzain102-glitch" },
    {
      label: "INSTANT.",
      href: "https://slowinstant.vercel.app",
    },
    {
      label: "Portfolio",
      href: "https://zainuddin7.github.io/-portfolio/",
    },
  ],
} as const;

export type SkillCluster = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  skills: string[];
};

export const skills: SkillCluster[] = [
  {
    id: "frontend-core",
    title: "Frontend Core",
    blurb: "The structural layer of every interface I build.",
    icon: "layout",
    skills: ["HTML5", "CSS3", "JavaScript (ES2023)", "Responsive Design"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    blurb: "Production apps with modern, opinionated tooling.",
    icon: "stack",
    skills: ["Next.js", "React", "Bootstrap", "Supabase"],
  },
  {
    id: "motion",
    title: "Motion & 3D",
    blurb: "Interfaces that feel alive, not static.",
    icon: "motion",
    skills: ["GSAP", "Framer Motion", "Three.js / R3F", "CSS Animations"],
  },
  {
    id: "craft",
    title: "Craft",
    blurb: "The human side — taste, words, and clarity.",
    icon: "spark",
    skills: ["UI Design", "Copywriting", "UX Writing", "Accessibility"],
  },
];

export type Project = {
  id: string;
  name: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  href: string;
  accent: "indigo" | "violet" | "teal";
};

export const projects: Project[] = [
  {
    id: "instant",
    name: "INSTANT.",
    year: "2025",
    role: "Creator & Full-Stack Dev",
    description:
      "A free, AI-powered link-in-bio platform for creators — 81+ features including AI themes, real analytics, and instant publishing. Built for indie devs, gamers, students & Pakistani creators.",
    stack: ["Next.js", "Supabase", "Groq AI", "Tailwind", "Recharts"],
    href: "https://slowinstant.vercel.app",
    accent: "violet",
  },
  {
    id: "zeetable",
    name: "ZeeTable",
    year: "2025",
    role: "Creator & Developer",
    description:
      "A clean, fast utility app focused on giving users a frictionless tabular data experience. Designed around clarity and speed.",
    stack: ["JavaScript", "CSS3", "Responsive UI"],
    href: "https://zainuddin7.github.io/-portfolio/",
    accent: "indigo",
  },
  {
    id: "pakphantom",
    name: "PakPhantom",
    year: "2025",
    role: "Creator & Developer",
    description:
      "A privacy-focused web tool built with a sharp, modern aesthetic — exploring stealth and anonymity online for a Pakistani audience.",
    stack: ["JavaScript", "UI Design", "Copywriting"],
    href: "https://zainuddin7.github.io/-portfolio/",
    accent: "teal",
  },
  {
    id: "cckn",
    name: "CCKN",
    year: "2024",
    role: "Creator & Developer",
    description:
      "An educational / community web project focused on clean information architecture and accessible content delivery.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    href: "https://zainuddin7.github.io/-portfolio/",
    accent: "violet",
  },
  {
    id: "portfolio-v1",
    name: "Portfolio v1",
    year: "2024",
    role: "Designer & Developer",
    description:
      "My first personal portfolio — a cyberpunk-themed showcase that taught me motion, layout, and shipping in public.",
    stack: ["HTML5", "CSS3", "GSAP", "JavaScript"],
    href: "https://zainuddin7.github.io/-portfolio/",
    accent: "indigo",
  },
];

export type Milestone = {
  year: string;
  title: string;
  detail: string;
};

export const journey: Milestone[] = [
  {
    year: "2024",
    title: "First lines of code",
    detail:
      "Started with HTML, CSS & JavaScript. Shipped my first portfolio and learned to build in public.",
  },
  {
    year: "2025",
    title: "Frameworks & products",
    detail:
      "Leveled into Next.js, Supabase & GSAP. Shipped INSTANT. — a full link-in-bio platform with AI theming and analytics.",
  },
  {
    year: "2026",
    title: "Interactive & 3D",
    detail:
      "Exploring real-time 3D, WebGL shaders, and motion engineering to craft premium, immersive interfaces.",
  },
];

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Play", href: "/play" },
  { label: "Contact", href: "#contact" },
] as const;

/* ---------- Homepage anchors (for in-page nav when on /) ---------- */
export const homeAnchors = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

/* ---------- Services / "What I Do" ---------- */
export type Service = {
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
  icon: "code" | "layers" | "motion" | "pen";
};

export const services: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    blurb: "Production-grade web apps built fast, built right.",
    bullets: ["Next.js & React", "API integration", "Performance-first"],
    icon: "code",
  },
  {
    id: "interactive-3d",
    title: "Interactive & 3D",
    blurb: "Real-time WebGL, shaders, and motion that feels alive.",
    bullets: ["Three.js / R3F", "Custom GLSL", "Scroll-driven scenes"],
    icon: "layers",
  },
  {
    id: "ui-motion",
    title: "UI & Motion",
    blurb: "Interfaces with taste — micro-interactions and transitions.",
    bullets: ["Design systems", "GSAP / Framer", "Accessibility"],
    icon: "motion",
  },
  {
    id: "copywriting",
    title: "Copywriting",
    blurb: "Words that convert — landing pages, UX, and brand voice.",
    bullets: ["Landing pages", "UX writing", "Brand voice"],
    icon: "pen",
  },
];

/* ---------- Stats (animated counters) ---------- */
export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Live projects shipped" },
  { value: 81, suffix: "+", label: "Features in INSTANT." },
  { value: 3, suffix: "", label: "Years learning" },
  { value: 100, suffix: "%", label: "Self-taught" },
];

/* ---------- Testimonials ---------- */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Zain thinks like a designer and ships like an engineer. The polish on his work is rare for someone his age.",
    name: "Mentor Feedback",
    role: "From a code review",
  },
  {
    quote:
      "INSTANT. is genuinely impressive — AI themes, real analytics, 80+ features. All from a 9th-grader. Wild.",
    name: "Indie Dev Community",
    role: "Public feedback",
  },
  {
    quote:
      "His copywriting is sharp. Every headline does work — no filler, just clarity and punch.",
    name: "Collaborator",
    role: "On a landing page",
  },
  {
    quote:
      "Fast, communicative, and genuinely curious. He asks the right questions before writing a line of code.",
    name: "Project Partner",
    role: "Joint build",
  },
];

/* ---------- FAQ ---------- */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Are you available for freelance work?",
    a: "Yes — I'm open to small-to-medium front-end, interactive, and copywriting projects. I balance this around school, so I take on a limited number at a time. Reach out and we'll figure out fit.",
  },
  {
    q: "How experienced are you, really?",
    a: "I'm 15, in 9th grade, and entirely self-taught. I've shipped 5+ live projects including a full link-in-bio SaaS (INSTANT.) with AI theming and analytics. I'm honest about where I'm learning and where I'm strong.",
  },
  {
    q: "What's your tech stack?",
    a: "Next.js + React + TypeScript for apps, Three.js / React Three Fiber for 3D, GSAP and Framer Motion for animation, Tailwind for styling, and Supabase when I need a backend. Plain HTML/CSS/JS when it fits.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Absolutely. I'm based in Quetta but work entirely online and communicate in English. Time zones are manageable — I'm flexible.",
  },
  {
    q: "How much do you charge?",
    a: "It depends on scope. For smaller front-end or copy work I keep it accessible. Tell me what you're building and I'll give you a clear quote — no surprises.",
  },
];
