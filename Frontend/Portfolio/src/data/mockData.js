// ═══════════════════════════════════════════
// ANTIGRAVITY DEVELOPER SPACE — Mock Data
// ═══════════════════════════════════════════

import PulseChatImg from '../assets/PulseChat.webp';
import InAmigosImg from '../assets/InAmigos.webp';
import VisioSenseImg from '../assets/VisionSense.webp';
import ExplorilyImg from '../assets/Explorely.webp';

import NptelImg from '../assets/NPTEL.webp';
import OracleImg from '../assets/Oracle.webp';
import DeloitteImg from '../assets/Deloitte.webp';
import InfosysImg from '../assets/Infosys.webp';
import InfosysCredentialImg from '../assets/Infosys.jpeg';
import NaukriImg from '../assets/Naukri.webp';
import AiFestImg from '../assets/AiFest.webp';
import CuImg from '../assets/Cu.webp';
import PowerBiImg from '../assets/PowerBi.webp';

export const personalInfo = {
  name: "Pratik Sinha",
  title: "Full Stack Developer | Java & React Specialist | AI Enthusiast",
  email: "pratiksinha198@gmail.com",
  phone: "+91-7667238151",
  linkedin: "https://www.linkedin.com/in/pratiksinha20/",
  github: "https://github.com/pratiksinha20",
  twitter: "https://x.com/pratiksinha_20",
  instagram: "https://www.instagram.com/sinhapratik2007/",
  bio: "I'm a passionate Full Stack Developer specializing in Java, Spring Boot, and React.js. I love building scalable systems, crafting beautiful UI experiences, and exploring the frontier of AI-powered applications. Currently pursuing B.E. in Computer Science, I thrive at the intersection of engineering excellence and creative problem-solving.",
  education: "B.E. Computer Science & Engineering",
};

export const skills = {
  frontend: {
    label: "Frontend",
    color: "#f97676",
    icon: "🎨",
    items: [
      { name: "React.js", level: 90, description: "Building dynamic SPAs with hooks, context, and modern patterns. Experienced with React Router, state management, and component architecture." },
      { name: "JavaScript", level: 88, description: "ES6+, async/await, closures, prototypes, and DOM manipulation. Strong understanding of the event loop and functional programming patterns." },
      { name: "HTML5", level: 95, description: "Semantic markup, accessibility best practices, canvas API, and modern web standards." },
      { name: "CSS3", level: 90, description: "Flexbox, Grid, animations, custom properties, responsive design, and modern CSS features." },
      { name: "Tailwind CSS", level: 85, description: "Utility-first CSS framework for rapid UI development. Custom theme configuration and responsive design." },
      { name: "Framer Motion", level: 80, description: "Production-ready animations for React. Spring physics, gestures, layout animations, and scroll-triggered effects." },
    ],
  },
  backend: {
    label: "Backend",
    color: "#e8e8e8",
    icon: "⚙️",
    items: [
      { name: "Java", level: 92, description: "Core Java, OOP, Collections, Streams, Multithreading, and design patterns. Strong foundation in enterprise-grade development." },
      { name: "Spring Boot", level: 88, description: "REST API development, dependency injection, Spring Security, Spring Data JPA, and microservice architecture." },
      { name: "REST APIs", level: 90, description: "Designing and building RESTful services with proper HTTP methods, status codes, error handling, and API versioning." },
      { name: "Hibernate", level: 82, description: "ORM framework for Java. Entity mapping, HQL, criteria queries, caching strategies, and database optimization." },
    ],
  },
  database: {
    label: "Database",
    color: "#f97676",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", level: 85, description: "Advanced SQL, indexing, stored procedures, views, and performance optimization for production databases." },
      { name: "MySQL", level: 80, description: "Relational database design, complex queries, joins, normalization, and database administration." },
    ],
  },
  tools: {
    label: "Tools",
    color: "#d4d4d4",
    icon: "🛠️",
    items: [
      { name: "Git", level: 88, description: "Version control with branching strategies, merge conflict resolution, rebasing, and collaborative workflows." },
      { name: "GitHub", level: 90, description: "Repository management, pull requests, code reviews, GitHub Actions CI/CD, and open-source collaboration." },
      { name: "Docker", level: 60, description: "Containerization basics, Dockerfile creation, Docker Compose, and container orchestration concepts." },
      { name: "Postman", level: 85, description: "API testing, collection management, environment variables, automated testing scripts, and API documentation." },
      { name: "IntelliJ IDEA", level: 90, description: "Advanced IDE usage with debugging, refactoring tools, plugins, and productivity shortcuts." },
    ],
  },
  emerging: {
    label: "Emerging",
    color: "#f97676",
    icon: "🚀",
    items: [
      { name: "AI Systems", level: 65, description: "Exploring AI integration in applications, prompt engineering, and building AI-powered features using APIs like Gemini." },
      { name: "Real-time Architecture", level: 60, description: "WebSocket communication, real-time data streaming, event-driven systems, and live notification frameworks." },
      { name: "Kafka", level: 45, description: "Message streaming concepts, pub/sub patterns, event sourcing, and distributed system communication." },
    ],
  },
};

export const projects = [
  {
    id: 1,
    title: "PulseChat",
    subtitle: "AI-Powered Multilingual Chat",
    description: "AI-powered multilingual chat platform enabling real-time communication across languages with intelligent translation and messaging.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "AI & Full Stack",
    githubUrl: "https://github.com/pratiksinha20/PulseChat",
    demoUrl: "https://pulse-chat-frontend.vercel.app",
    image: PulseChatImg,
    features: [
      "Real-time multilingual translation for chats",
      "Instant messaging powered by WebSockets",
      "Intelligent translation suggestion system",
      "Secure user authentication and message history",
      "Clean, modern UI with interactive elements"
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    accentColor: "#8f00ff",
  },
  {
    id: 2,
    title: "InAmigos Foundation",
    subtitle: "3D Interactive Portal",
    description: "Built a highly interactive 3D foundation website featuring immersive animations, floating environments, real-time user interactions, and modern UI/UX experiences to enhance engagement and accessibility.",
    techStack: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    category: "3D & Web",
    githubUrl: "https://github.com/pratiksinha20/InAmigos/tree/main",
    demoUrl: "https://in-amigos-coral.vercel.app",
    image: InAmigosImg,
    features: [
      "Immersive 3D scenes and animations",
      "Floating virtual environments with interactive items",
      "Responsive and modern UI/UX with smooth transitions",
      "Interactive widgets and real-time page updates",
      "Optimized assets for fast load times and accessibility"
    ],
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "#00f0ff",
  },
  {
    id: 3,
    title: "VisioSense",
    subtitle: "Touchless Human-Computer Interaction",
    description: "Real-time computer vision system that recognizes hand gestures and facial landmarks for touchless human-computer interaction.",
    techStack: ["Python", "Flask", "OpenCV", "MediaPipe", "NumPy"],
    category: "AI & Computer Vision",
    githubUrl: "https://github.com/pratiksinha20/VisioSense-Project",
    demoUrl: "https://visio-sense-project.vercel.app",
    image: VisioSenseImg,
    features: [
      "Real-time computer vision gesture control",
      "Facial landmark tracking for posture/intent detection",
      "Flask backend serving predictions with low latency",
      "Robust detection via OpenCV and MediaPipe processing",
      "Optimized numeric pipelines with NumPy array operations"
    ],
    gradient: "from-green-500/20 to-emerald-500/20",
    accentColor: "#34A853",
  },
  {
    id: 4,
    title: "Explorely",
    subtitle: "Travel Exploration Platform",
    description: "Travel exploration platform that helps users discover destinations through dynamic search and real-time location data.",
    techStack: ["React.js", "JavaScript", "REST APIs", "CSS", "HTML"],
    category: "Frontend & APIs",
    githubUrl: "https://github.com/pratiksinha20/Explorely-frontend",
    demoUrl: "https://explorely-brown.vercel.app",
    image: ExplorilyImg,
    features: [
      "Dynamic destination search and recommendation engine",
      "Real-time location data integration via REST APIs",
      "Highly interactive Map widget and user location finding",
      "Clean, modern responsive dashboard with glassmorphism details",
      "Optimized state management for fast filtering and page transitions"
    ],
    gradient: "from-red-500/20 to-orange-500/20",
    accentColor: "#EA4335",
  }
];

export const timeline = [
  {
    id: 5,
    year: "June- 2026",
    title: "InAmigos Foundation",
    subtitle: "Web Development Intern",
    description: "Designed and built an immersive, interactive 3D website for the foundation using modern web technologies to elevate their online presence.",
    type: "experience",
    icon: "💼",
    side: "right",
    accentColor: "#00f0ff"
  },
  {
    id: 4,
    year: "2025 — 2026",
    title: "Personal Project",
    subtitle: "Chandigarh University",
    description: "Developed and launched highly interactive portfolios, 3D web systems, and AI-powered applications.",
    type: "project",
    icon: "💻",
    side: "left",
    accentColor: "#8f00ff"
  },
  {
    id: 3,
    year: "2024 — 2028",
    title: "BE - CSE",
    subtitle: "Chandigarh University, Punjab",
    description: "CGPA: 8.39 / 10",
    type: "education",
    icon: "🎓",
    side: "right",
    accentColor: "#2979ff"
  },
  {
    id: 2,
    year: "2022 — 2024",
    title: "Intermediate (Science)",
    subtitle: "Inter Science College, Hazaribagh",
    description: "Percentage: 91.4%",
    type: "education",
    icon: "🧪",
    side: "left",
    accentColor: "#a78bfa"
  },
  {
    id: 1,
    year: "2021 — 2022",
    title: "Matriculation (10th)",
    subtitle: "Modern Public School, Dadpur",
    description: "Percentage: 91.4%",
    type: "education",
    icon: "📚",
    side: "right",
    accentColor: "#fbbf24"
  }
];

export const certifications = [
  {
    id: 1,
    title: "NPTEL Programming Foundations",
    issuer: "NPTEL / IIT Kharagpur",
    image: NptelImg,
    credentialLink: "https://nptel.ac.in/noc/E_Certificate/NOC26CS74S15280102404271721",
    // details: "Course completion for Python for Data Science, data analysis libraries, and algorithmic foundations.",
    accentColor: "#fbbf24"
  },
  {
    id: 2,
    title: "Oracle Certified Professional",
    issuer: "Oracle University",
    image: OracleImg,
    credentialId: "1030116170C125DSOCP",
    // details: "Industry-standard certification validating enterprise Java programming, OOP, multithreading, and design patterns.",
    accentColor: "#ea4335"
  },
  {
    id: 3,
    title: "Deloitte Tech Consulting",
    issuer: "Deloitte / Forage",
    image: DeloitteImg,
    credentialLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_68b8a9292e447e9e72e9d9c2_1757156517832_completion_certificate.pdf",
    // details: "Completed consulting simulations focusing on systems architecture design, database migration planning, and user stories.",
    accentColor: "#34a853"
  },
  {
    id: 4,
    title: "Infosys Springboard Developer",
    issuer: "Infosys Academy",
    image: InfosysImg,
    credentialLink: InfosysCredentialImg,
    // details: "Software engineering foundations, full-stack architectures, and web modernization techniques.",
    accentColor: "#4285f4"
  },
  {
    id: 5,
    title: "Naukri Verified Code Badge",
    issuer: "Naukri Academy Assessment",
    image: NaukriImg,
    credentialId: "68d9c46d7659006d373b3ce5",
    // details: "Verified technical proficiency score in DSA, React.js frontend structures, and backend systems logic.",
    accentColor: "#a78bfa"
  },
  {
    id: 6,
    title: "AI Fest Hackathon Award",
    issuer: "AI Fest Summit",
    image: AiFestImg,
    credentialId: "Verified Hackathon Participant",
    // details: "Certificate of participation for demonstrating AI integrations, prompt flows, and machine learning pipelines.",
    accentColor: "#00f0ff"
  },
  {
    id: 7,
    title: "CU Academic Excellence",
    issuer: "Chandigarh University",
    image: CuImg,
    credentialId: "CU Merit Certificate",
    // details: "Honors and technical project awards in software development hackathons and academic semesters.",
    accentColor: "#f472b6"
  },
  {
    id: 8,
    title: "Power BI Data Analyst",
    issuer: "Microsoft CertX Partner",
    image: PowerBiImg,
    credentialLink: "https://certx.in/certificate/36a28147-6eed-47a5-8342-e5f926ebba61452289",
    // details: "Professional certification for data modeling, dashboard visualizations, and business intelligence pipelines using Power BI.",
    accentColor: "#06b6d4"
  }
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
