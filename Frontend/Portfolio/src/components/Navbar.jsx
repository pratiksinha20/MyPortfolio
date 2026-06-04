import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar({ activePage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.body.classList.contains('dark');
    }
    return false;
  });

  // Sync state on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDark(true);
    } else {
      document.body.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Journey', id: 'journey' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      className="header scrolled"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        zIndex: 100,
        position: 'fixed',
        width: '100%'
      }}
    >
      <div className="nav-container select-none">
        
        {/* Logo <Pratik /> */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="logo font-bold text-xl cursor-pointer"
        >
          <span className="logo-accent">&lt;</span>
          Pratik
          <span className="logo-accent">/&gt;</span>
        </a>

        {/* Desktop Navbar Middle Links */}
        <nav className="navbar hidden md:flex items-center">
          {links.map((link) => {
            const isActive = activePage === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`nav-link cursor-pointer ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Social Icons & Theme Toggle (Right Side) */}
        <div className="nav-socials hidden md:flex items-center">
          <a
            href="https://github.com/pratiksinha20"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="social-icon cursor-pointer"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/pratik-kumar-sinha-9305a0334"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="social-icon cursor-pointer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://leetcode.com/u/pratiksinha20/"
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode"
            className="social-icon code-icon cursor-pointer"
          >
            LC
          </a>
          <a
            href="https://codeforces.com/profile/pratiksinha20"
            target="_blank"
            rel="noopener noreferrer"
            title="Codeforces"
            className="social-icon code-icon cursor-pointer"
          >
            CF
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="social-icon cursor-pointer text-base focus:outline-none"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-[#8f00ff]" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn md:hidden ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="mobile-nav active select-none"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              height: '100vh',
              zIndex: 90,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="mobile-link cursor-pointer text-2xl font-semibold"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Socials & Theme Toggle */}
            <div className="mobile-socials flex items-center gap-6 mt-4">
              <a
                href="https://github.com/pratiksinha20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/pratik-kumar-sinha-9305a0334"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://leetcode.com/u/pratiksinha20/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold font-sans"
              >
                LC
              </a>
              <a
                href="https://codeforces.com/profile/pratiksinha20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold font-sans"
              >
                CF
              </a>

              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                className="text-2xl cursor-pointer focus:outline-none"
                aria-label="Toggle Theme"
              >
                {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-[#8f00ff]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
