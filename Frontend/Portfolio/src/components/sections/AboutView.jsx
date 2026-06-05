import { motion } from 'framer-motion';
import {
  FaGraduationCap, FaMapMarkerAlt, FaFileAlt, FaRobot,
  FaCertificate, FaReact, FaJava, FaPython, FaServer,
  FaCheckCircle, FaCode, FaLaptopCode, FaGamepad, FaLinkedin,
} from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiOpencv, SiTailwindcss, SiNodedotjs, SiTypescript } from 'react-icons/si';
import PratikPic from '../../assets/PratikPic.webp';
import LinkedInImg from '../../assets/linkedin.webp';
import './About.css';

/* ── animation helpers ───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── small card wrapper ──────────────────────────────────────────── */
function Card({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`about-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── section label ───────────────────────────────────────────────── */
function Label({ children }) {
  return (
    <p className="about-label">{children}</p>
  );
}

export default function AboutView() {
  const skills = [
    { name: 'React.js', icon: <FaReact />, color: '#61dafb' },
    { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6db33f' },
    { name: 'Python', icon: <FaPython />, color: '#3776ab' },
    { name: 'TailwindCSS', icon: <SiTailwindcss />, color: '#06b6d4' },
    { name: 'REST APIs', icon: <FaServer />, color: '#94a3b8' },
    { name: 'Java', icon: <FaJava />, color: '#f89820' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169e1' },
    { name: 'OpenCV', icon: <SiOpencv />, color: '#5c9c36' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
    { name: 'DSA / CP', icon: <FaCode />, color: '#e879f9' },
    { name: 'Full-Stack', icon: <FaLaptopCode />, color: '#f472b6' },
  ];


  return (
    <div className="about-page">
      <div className="about-container">

        {/* ══════════════ LEFT SIDEBAR ══════════════ */}
        <motion.aside
          className="about-sidebar"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* Profile card */}
          <Card className="about-profile-card" delay={0.05}>
            <div className="about-avatar-wrap">
              <div className="about-avatar-glow" />
              <img
                src={PratikPic}
                alt="Pratik Sinha"
                className="about-avatar-img"
              />
            </div>
            <h2 className="about-profile-name">Pratik Sinha</h2>
            <p className="about-profile-role">Full Stack Developer</p>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about-resume-btn"
            >
              <FaFileAlt className="about-resume-icon" />
              <span>View Resume</span>
            </a>
          </Card>

          {/* Quick info card */}
          <Card delay={0.1}>
            <Label>Quick Info</Label>
            <ul className="about-info-list">
              {[
                { icon: <FaCheckCircle />, color: '#22d3ee', text: 'Full Stack Developer' },
                { icon: <FaGraduationCap />, color: '#a78bfa', text: 'CU CSE\'28 Student' },
                { icon: <FaMapMarkerAlt />, color: '#f87171', text: 'Chandigarh, India' },
                // { icon: <FaPhoneAlt />, color: '#34d399', text: '+91-7667238151' },
              ].map((item) => (
                <li key={item.text} className="about-info-item">
                  <span style={{ color: item.color }} className="about-info-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Academics card */}
          <Card delay={0.15}>
            <Label>Academics</Label>
            <ul className="about-academic-list">
              {[
                {
                  icon: <FaGraduationCap />,
                  color: '#22d3ee',
                  title: '8.39 / 10',
                  subtitle: 'B.E. CGPA',
                },
                {
                  icon: <FaGraduationCap />,
                  color: '#a78bfa',
                  title: '91.4%',
                  subtitle: 'Intermediate (12th)',
                },
                {
                  icon: <FaGraduationCap />,
                  color: '#fbbf24',
                  title: '91.4%',
                  subtitle: 'Matriculation (10th)',
                },
              ].map((item, idx) => (
                <li key={idx} className="about-academic-item">
                  <span style={{ color: item.color }} className="about-academic-icon">{item.icon}</span>
                  <div className="about-academic-details">
                    <p className="about-academic-title">{item.title}</p>
                    <p className="about-academic-sub">{item.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Internship card */}
          <Card delay={0.2}>
            <Label>Internship</Label>
            <div className="about-intern-content">
              <div className="about-intern-header">
                <div className="about-intern-logo-wrap">
                  <FaLaptopCode className="about-intern-logo-icon" />
                </div>
                <div>
                  <h4 className="about-intern-role">Web Development Intern</h4>
                  <p className="about-intern-company">InAmigos Foundation</p>
                </div>
              </div>
              <div className="about-intern-project">
                <span className="about-intern-badge">Project</span>
                <p className="about-intern-project-name">3D Interactive Website</p>
                <p className="about-intern-desc">
                  Designed and built an immersive, interactive 3D website for the foundation using modern web technologies to elevate their online presence.
                </p>
              </div>
            </div>
          </Card>

        </motion.aside>

        {/* ══════════════ RIGHT CONTENT ══════════════ */}
        <div className="about-content">

          {/* Hero heading card */}
          <Card delay={0.05}>
            <h1 className="about-hero-title">
              Hi, I'm{' '}
              <span className="name-gradient">Pratik Sinha,</span>
            </h1>
            <p className="about-hero-role">Full Stack Developer &amp; Problem Solver</p>
          </Card>

          {/* Bio card */}
          <Card delay={0.12}>
            <Label>About Me</Label>
            <div className="about-bio">
              <p>
                I am currently pursuing a Bachelor of Engineering in Computer Science and Engineering at Chandigarh University.
                I am passionate about building software that combines clean design, scalable architecture, and meaningful user experiences.
              </p>

              <p>
                As a <strong>Full Stack Developer</strong>, I specialize in developing modern web applications using technologies such as
                React.js, Spring Boot, PostgreSQL, and cloud-native tools. I enjoy transforming complex problems into efficient,
                reliable, and user-friendly solutions.
              </p>

              <p>
                My interests extend beyond web development into Data Structures & Algorithms, System Design, Artificial Intelligence,
                and Computer Vision. Through projects, internships, and continuous learning, I strive to strengthen both my technical
                expertise and problem-solving mindset.
              </p>

              <p>
                Outside development, I actively practice competitive programming on LeetCode and Codeforces, constantly challenging
                myself to think critically and write better code.
              </p>

              <p className="about-bio-cta">
                Building impactful solutions, one challenge at a time.
              </p>
            </div>
          </Card>

          {/* LinkedIn Profile Card */}
          <Card delay={0.18} className="about-linkedin-card">
            <div className="about-linkedin-label-wrap">
              <Label>LinkedIn Profile</Label>
            </div>
            <a
              href="https://www.linkedin.com/in/pratiksinha20/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-linkedin-link"
            >
              <div className="about-linkedin-img-wrap">
                <img
                  src={LinkedInImg}
                  alt="LinkedIn Profile - Pratik Kumar Sinha"
                  className="about-linkedin-img"
                />
                <div className="about-linkedin-overlay">
                  <div className="about-linkedin-overlay-btn">
                    <FaLinkedin />
                    <span>View LinkedIn Profile</span>
                  </div>
                </div>
              </div>
              <div className="about-linkedin-footer">
                <div>
                  <h4 className="about-linkedin-name">Pratik Kumar Sinha</h4>
                  <p className="about-linkedin-tagline">
                    Full Stack Developer | Spring Boot Backend Developer | Building Scalable Applications
                  </p>
                </div>
                <div className="about-linkedin-btn">
                  <FaLinkedin />
                  <span>Connect</span>
                </div>
              </div>
            </a>
          </Card>

        </div>
      </div>
    </div>
  );
}