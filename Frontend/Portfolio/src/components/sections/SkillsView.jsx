import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaJava, FaPython, FaJs, FaReact, FaServer, FaHtml5, FaCss3Alt,
  FaGitAlt, FaGithub, FaAws, FaLinux, FaDocker, FaCode, FaCubes,
  FaDesktop, FaSitemap, FaDatabase, FaBrain, FaArrowRight, FaRobot,
  FaBootstrap, FaExternalLinkAlt,
  FaNetworkWired,
} from 'react-icons/fa';
import {
  SiSpringboot, SiTailwindcss, SiPostgresql, SiMysql,
  SiIntellijidea, SiOpencv, SiFlask, SiPostman, SiNetlify,
  SiVercel, SiKubernetes, SiFramer, SiRedis, SiSupabase,
  SiHibernate,
  SiGitlab,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { GiArtificialIntelligence } from 'react-icons/gi';
import './Skills.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const CATEGORIES = [
  {
    id: 'languages',
    badge: 'Programming Languages',
    title: 'Core Syntax',
    desc: 'Core langs + algorithms, systems, scripting.',
    accent: { h: '185', color: '#00f0ff', border: 'rgba(0,240,255,0.28)', glow: 'rgba(0,240,255,0.07)' },
    projects: [],
    skills: [
      { name: 'Java', icon: <FaJava />, color: '#f89820' },
      { name: 'JavaScript', icon: <FaJs />, color: '#f7df1e' },
      { name: 'Python', icon: <FaPython />, color: '#3776ab' },
      { name: 'C++', icon: <TbBrandCpp />, color: '#00599c' },
      { name: 'C', icon: <FaCode />, color: '#a8b9cc' },
      { name: 'R', icon: <FaCode />, color: '#276dc3' },
    ],
  },
  {
    id: 'frontend',
    badge: 'Frontend Engineering',
    title: 'UI Craft',
    desc: 'Responsive UIs + smooth animations.',
    accent: { h: '200', color: '#38bdf8', border: 'rgba(56,189,248,0.28)', glow: 'rgba(56,189,248,0.07)' },
    projects: [
      { name: 'Explorely', href: '#projects' },
      { name: 'Portfolio', href: '#projects' },
    ],
    skills: [
      { name: 'React.js', icon: <FaReact />, color: '#61dafb' },
      { name: 'HTML5', icon: <FaHtml5 />, color: '#e34f26' },
      { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06b6d4' },
      { name: 'Bootstrap', icon: <FaBootstrap />, color: '#7952b3' },
      { name: 'Framer Motion', icon: <SiFramer />, color: '#e879f9' },
    ],
  },
  {
    id: 'backend',
    badge: 'Backend Engineering',
    title: 'Server Side',
    desc: 'Server logic + APIs, data layers.',
    accent: { h: '142', color: '#4ade80', border: 'rgba(74,222,128,0.28)', glow: 'rgba(74,222,128,0.07)' },
    projects: [
      { name: 'PulseChat', href: '#projects' },
    ],
    skills: [
      { name: 'Java', icon: <FaJava />, color: '#f89820' },
      { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6db33f' },
      { name: 'REST APIs', icon: <FaServer />, color: '#94a3b8' },
      { name: 'JPA', icon: <FaDatabase />, color: '#4169e1' },
      { name: 'Hibernate', icon: <SiHibernate />, color: '#59666c' },
    ],
  },
  {
    id: 'database',
    badge: 'Database & Data Services',
    title: 'Data Layer',
    desc: 'Relational + NoSQL, real‑time data.',
    accent: { h: '275', color: '#a78bfa', border: 'rgba(167,139,250,0.28)', glow: 'rgba(167,139,250,0.07)' },
    projects: [],
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169e1' },
      { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
      { name: 'Redis', icon: <SiRedis />, color: '#dc382d' },
      { name: 'Supabase', icon: <SiSupabase />, color: '#3ecf8e' },
    ],
  },
  {
    id: 'devops',
    badge: 'Cloud & DevOps',
    title: 'Infrastructure',
    desc: 'Containers + Cloud, CI/CD deploys.',
    accent: { h: '25', color: '#fb923c', border: 'rgba(251,146,60,0.28)', glow: 'rgba(251,146,60,0.07)' },
    projects: [],
    skills: [
      { name: 'Docker', icon: <FaDocker />, color: '#2496ed' },
      { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
      { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
      { name: 'Linux', icon: <FaLinux />, color: '#fcc624' },
      { name: 'Render', icon: <FaServer />, color: '#46e3b7' },
      { name: 'Vercel', icon: <SiVercel />, color: '#ffffff' },
      { name: 'Netlify', icon: <SiNetlify />, color: '#00ad9f' },
    ],
  },
  {
    id: 'toolkit',
    badge: 'Developer Toolkit',
    title: 'Dev Tools',
    desc: 'VC + IDEs, streamlined API tests.',
    accent: { h: '340', color: '#fb7185', border: 'rgba(251,113,133,0.28)', glow: 'rgba(251,113,133,0.07)' },
    projects: [],
    skills: [
      { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
      { name: 'GitHub', icon: <FaGithub />, color: '#ffffff' },
      { name: 'GitLab', icon: <SiGitlab />, color: '#ffffff' },
      { name: 'Postman', icon: <SiPostman />, color: '#ff6c37' },
      { name: 'VS Code', icon: <VscVscode />, color: '#007acc' },
      { name: 'IntelliJ IDEA', icon: <SiIntellijidea />, color: '#fe315d' },
      // { name: 'GitLab', icon: <SiGitlab />, color: '#ffffff' },
    ],
  },
  {
    id: 'ai',
    badge: 'AI & Computer Vision',
    title: 'Machine Intelligence',
    desc: 'AI/ML + Vision, LLM apps.',
    accent: { h: '280', color: '#c084fc', border: 'rgba(192,132,252,0.28)', glow: 'rgba(192,132,252,0.07)' },
    projects: [
      { name: 'VisioSense', href: '#projects' },
      { name: 'PulseForm', href: '#projects' },
    ],
    skills: [
      { name: 'OpenCV', icon: <SiOpencv />, color: '#5c9c36' },
      { name: 'MediaPipe', icon: <FaRobot />, color: '#00e5ff' },
      { name: 'Machine Learning', icon: <FaBrain />, color: '#fbbf24' },
      { name: 'Flask', icon: <SiFlask />, color: '#ffffff' },
    ],
  },
  {
    id: 'cs',
    badge: 'CS Foundations',
    title: 'Theory & Systems',
    desc: 'CS concepts + scalable software.',
    // offsetX: 40,
    // offsetY: 1200,
    accent: { h: '45', color: '#fbbf24', border: 'rgba(251,191,36,0.28)', glow: 'rgba(251,191,36,0.07)' },
    projects: [],
    skills: [
      { name: 'DSA', icon: <FaCode />, color: '#e879f9' },
      { name: 'OOP', icon: <FaCubes />, color: '#38bdf8' },
      { name: 'OS', icon: <FaDesktop />, color: '#a78bfa' },
      { name: 'DBMS', icon: <FaDatabase />, color: '#34d399' },
      { name: 'System Design', icon: <FaSitemap />, color: '#fb7185' },
      { name: 'CN', icon: <FaNetworkWired />, color: '#e879f9' },
    ],
  },
];

function SkillChip({ name, icon, color, delay }) {
  return (
    <motion.div
      className="sk-chip"
      style={{ '--chip-color': color }}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.32, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.06, y: -2 }}
    >
      <span className="sk-chip-icon" style={{ color }}>{icon}</span>
      <span className="sk-chip-name">{name}</span>
    </motion.div>
  );
}

// True diagonal Y offsets — card 0 top, cascades down then back up
// Creates the staircase effect from image 1
const DIAGONAL_OFFSETS = [20, 90, 220, 400, 300, 200, 110, 20];

function SkillCard({ cat, index }) {
  const [hovered, setHovered] = useState(false);
  const yOffset = DIAGONAL_OFFSETS[index] ?? 0;

  return (
    <motion.div
      className="sk-card-wrap"
      style={{ '--y-offset': `${yOffset}px` }}
      initial={{ opacity: 0, y: 40 + yOffset * 0.3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`sk-card ${hovered ? 'sk-card-hovered' : ''}`}
        style={{
          '--acc-color': cat.accent.color,
          '--acc-border': cat.accent.border,
          '--acc-glow': cat.accent.glow,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow blob */}
        <div className="sk-card-glow" />

        {/* Badge */}
        <span className="sk-badge">{cat.badge}</span>

        {/* Title */}
        <h3 className="sk-title">{cat.title}</h3>

        {/* Description */}
        <p className="sk-desc">{cat.desc}</p>

        {/* Divider */}
        <div className="sk-divider-line" />

        {/* Related Projects */}
        {cat.projects.length > 0 && (
          <div className="sk-projects">
            <span className="sk-projects-label">Projects ↗</span>
            <div className="sk-projects-list">
              {cat.projects.map((p) => (
                <a key={p.name} href={p.href} className="sk-project-tag">
                  <FaExternalLinkAlt style={{ fontSize: '0.6rem' }} />
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Skills chips */}
        <div className="sk-chips">
          {cat.skills.map((s, i) => (
            <SkillChip
              key={s.name}
              {...s}
              delay={0.05 + i * 0.04}
            />
          ))}
        </div>

        {/* Action */}
        <a href="#projects" className="sk-action">
          <span>View Projects</span>
          <FaArrowRight className="sk-arrow" />
        </a>
      </div>
    </motion.div>
  );
}

export default function SkillsView() {
  return (
    <div className="sk-page">
      {/* Header */}
      <motion.div
        className="sk-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="sk-eyebrow">Tech Arsenal</p>
        <h1 className="sk-headline">
          Technical <span className="name-gradient">Skills</span>
        </h1>
        <p className="sk-subheadline">
          Technologies and core engineering concepts I leverage to build modern full-stack web applications.
        </p>
      </motion.div>

      {/* Diagonal staggered grid */}
      <div className="sk-grid">
        {CATEGORIES.map((cat, i) => (
          <SkillCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>
    </div>
  );
}