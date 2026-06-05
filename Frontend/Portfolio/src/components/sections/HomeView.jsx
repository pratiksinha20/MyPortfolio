import { useEffect, useRef, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import SkillsTicker from './SkillsTicker';
import AchievementGalaxy from './AchievementGalaxy';
import './scrollGrowCard.css';

/* ─── Scroll-grow card (antigravity style) ─────────────────────────────── */
function ScrollGrowCard({ children }) {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // offset: animation starts just before card hits viewport bottom,
  // finishes when card top reaches top. On mobile we widen this range to spread the transition.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: isMobile ? ['start 0.98', 'start 0.0'] : ['start 0.95', 'start 0.1'],
  });

  // Soft spring physics (lower stiffness + moderate damping) smooths out mobile browser scroll inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001
  });

  // Conditionally apply extremely subtle scaling and border-radius on mobile to prevent layout reflows and text displacement
  const scale = useTransform(smoothProgress, [0, 1], [isMobile ? 0.965 : 0.84, 1]);
  const borderRadius = useTransform(smoothProgress, [0, 1], [isMobile ? 12 : 48, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, borderRadius }}
      className="scroll-grow-card"
    >
      {children}
    </motion.div>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
function Footer({ onNavigate }) {
  const navLinks = [
    { label: 'Home', action: 'home' },
    { label: 'About', action: 'about' },
    { label: 'Projects', action: 'projects' },
    { label: 'Skills', action: 'skills' },
    { label: 'Contact', action: 'contact' },
  ];

  const socials = [
    {
      icon: <FaGithub />,
      href: 'https://github.com/pratiksinha20',
      label: 'GitHub',
    },
    {
      icon: <FaLinkedin />,
      href: 'https://linkedin.com/in/pratik-kumar-sinha-9305a0334',
      label: 'LinkedIn',
    },
    {
      icon: <span className="footer-code-icon">LC</span>,
      href: 'https://leetcode.com/u/pratiksinha20/',
      label: 'LeetCode',
    },
    {
      icon: <span className="footer-code-icon">CF</span>,
      href: 'https://codeforces.com/profile/pratiksinha20',
      label: 'Codeforces',
    },
  ];

  return (
    <footer className="portfolio-footer">
      {/* Decorative top border beam */}
      <div className="footer-beam" />

      <div className="footer-inner">
        {/* ── Row 1: Brand + Tagline + Socials ── */}
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-name">Pratik Sinha</span>
            <span className="footer-tagline">
              Full-Stack Developer · Builder of Real-Time Systems
            </span>
          </div>

          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title={s.label}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer-divider">
          <div className="footer-divider-line" />
          <div className="footer-divider-dot" />
          <div className="footer-divider-line" />
        </div>

        {/* ── Row 2: Nav + Status + Email ── */}
        <div className="footer-mid">
          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <button
                key={link.action}
                onClick={() => onNavigate(link.action)}
                className="footer-nav-link"
              >
                {link.label}
              </button>
            ))}
          </nav>

        </div>

        {/* ── Divider ── */}
        <div className="footer-divider-thin" />

        {/* ── Row 3: Copyright + Legal ── */}
        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} Pratik Sinha. All rights reserved.
          </span>
          <div className="footer-legal">
            <a href="#privacy" className="footer-legal-link">Privacy</a>
            <span className="footer-legal-sep" aria-hidden="true">·</span>
            <a href="#terms" className="footer-legal-link">Terms</a>
          </div>
        </div>
      </div>

      {/* Decorative background glows */}
      <div className="footer-glow footer-glow-left" aria-hidden="true" />
      <div className="footer-glow footer-glow-right" aria-hidden="true" />
    </footer>
  );
}

/* ─── HomeView ──────────────────────────────────────────────────────────── */
export default function HomeView({ onNavigate }) {
  return (
    <div className="relative w-full flex flex-col items-center">

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 md:px-12 w-full max-w-5xl mx-auto">
        <div className="relative z-10 text-center flex flex-col items-center w-full flex-grow justify-center">

          <motion.h1
            className="hero-title select-text mb-4 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            <span className="greeting">Hey, I'm</span>
            <span className="name-gradient">Pratik Sinha</span>
          </motion.h1>

          <motion.h2
            className="hero-subtitle mb-6 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I build{' '}
            <TypeAnimation
              sequence={[
                'Real-Time Systems.', 1800,
                'Scalable REST APIs.', 1800,
                'Computer Vision Apps.', 1800,
                'Full-Stack Interfaces.', 1800,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text select-text"
            />
          </motion.h2>

          <motion.p
            className="hero-desc mb-10 select-text font-normal text-text-secondary/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Full-Stack Developer crafting fast, scalable, and impactful products.
          </motion.p>

          <motion.div
            className="hero-ctas flex flex-col items-center justify-center gap-4 w-full sm:flex-row sm:w-auto max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={() => onNavigate('projects')}
              className="btn btn-primary px-8 py-3.5 text-base w-full sm:w-auto cursor-pointer"
            >
              <span>View Projects</span>
              <FaArrowRight className="text-sm" />
            </button>

            <div className="flex flex-row gap-3 w-full sm:w-auto justify-center">
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-4 py-3.5 text-xs sm:text-base sm:px-8 w-full sm:w-auto cursor-pointer flex-1 sm:flex-none"
              >
                <span>View Resume</span>
                <FaArrowRight className="text-sm" />
              </a>

              <a
                href="/assets/resume.pdf"
                download="Pratik_Sinha_Resume.pdf"
                className="btn btn-outline px-4 py-3.5 text-xs sm:text-base sm:px-8 w-full sm:w-auto cursor-pointer flex-1 sm:flex-none"
              >
                <span>Download Resume</span>
                <FaDownload className="text-sm" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Mouse scroll hint */}
        <motion.div
          className="gravity-hint flex flex-col items-center mt-12 mb-4 select-none relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.0 }}
        >
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
        </motion.div>
      </section>

      {/* ── SCROLL-GROW CARD (antigravity effect) ──────────────────────── */}
      <section className="relative w-full z-20 -mt-12 pb-0 bg-transparent">
        <ScrollGrowCard>
          {/* Mesh + glows inside card */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-[20%] -left-[10%] w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-[20%] -right-[10%] w-80 h-80 rounded-full bg-purple-500/10 blur-[90px] pointer-events-none" />

          <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-10 relative">

            {/* Tech Stack */}
            <div className="w-full text-center flex flex-col items-center mb-10 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >

              </motion.div>

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <SkillsTicker />
              </motion.div>
            </div>

            {/* Achievement Galaxy */}
            <div className="w-full flex flex-col items-center">
              <AchievementGalaxy onNavigate={onNavigate} />
            </div>

            {/* Footer lives inside the dark card */}
            <Footer onNavigate={onNavigate} />
          </div>
        </ScrollGrowCard>
      </section>
    </div>
  );
}