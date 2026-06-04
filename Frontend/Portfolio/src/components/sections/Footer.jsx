import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo, navLinks } from '../../data/mockData';
import './Footer.css';

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-custom-footer" style={{ paddingLeft: "20px" }}>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-3 gap-16 mb-10 items-start">
          {/* Logo & description */}
          <div>
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
              className="flex items-center gap-3 mb-4 group"
              whileHover={{ x: 3 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(249,118,118,0.15), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(249,118,118,0.2)',
                  fontFamily: 'Space Grotesk',
                  color: '#f97676',
                }}
              >
                PS
              </div>
              <span className="footer-logo-text">
                Pratik<span> . </span>dev
              </span>
            </motion.a>
            <p className="footer-description">
              Full stack Developer.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="footer-section-title">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="footer-nav-btn"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="footer-section-title">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: <FaGithub size={16} />, href: personalInfo.github },
                { icon: <FaLinkedin size={16} />, href: personalInfo.linkedin },
                { icon: <FaXTwitter size={16} />, href: personalInfo.twitter },
                { icon: <FaEnvelope size={16} />, href: `mailto:${personalInfo.email}` },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  whileHover={{ y: -2 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-divider-custom flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="footer-bottom-text">
            © {new Date().getFullYear()} Pratik Sinha. All rights reserved.
          </p>
          <motion.p
            className="footer-bottom-built"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Built with <FaHeart className="text-red-400/50 text-[10px]" />
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
