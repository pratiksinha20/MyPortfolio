import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Animated Count-Up component that supports integers, floats, and custom suffixes
function AnimatedCount({ value, isInView }) {
  const [current, setCurrent] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric part and suffix
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setCurrent(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2] || '';
    const isFloat = match[1].includes('.');
    const decimalPlaces = isFloat ? match[1].split('.')[1].length : 0;

    let startTimestamp = null;
    const duration = 1600; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out quad function
      const easeProgress = progress * (2 - progress);
      const currentValue = easeProgress * target;

      setCurrent(currentValue.toFixed(decimalPlaces) + suffix);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, isInView]);

  return <span className="select-text">{current}</span>;
}

export default function AchievementGalaxy({ onNavigate }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Mouse parallax tracking
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalized coordinates from -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setMouseOffset({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Achievement Orbs definition
  const orbs = [
    {
      id: 'projects',
      value: '4+',
      label: 'Projects',
      icon: '🚀',
      target: 'projects',
      details: 'Full-stack platforms, web apps, and AI applications.',
      sizeClass: 'w-40 h-40 md:w-48 md:h-48',
      glowClass: 'orb-cyan-glow',
      gradient: 'from-cyan-500/10 via-cyan-400/20 to-blue-500/30',
      borderClass: 'border-cyan-500/35 hover:border-cyan-400/60',
      accentColor: '#00f0ff',
      parallaxFactor: -25, // Move slightly against mouse for 3D depth
      floatHeight: -14,
      floatDuration: 6.2,
      emergeDelay: 0.1,
    },
    {
      id: 'certifications',
      value: '3+',
      label: 'Certificates',
      icon: '🏆',
      target: 'skills', // Maps to Skills where credentials are shown
      details: 'Specialized backend Java, Spring Boot, and enterprise skill badges.',
      sizeClass: 'w-36 h-36 md:w-40 md:h-40',
      glowClass: 'orb-purple-glow',
      gradient: 'from-purple-500/10 via-purple-400/20 to-indigo-600/30',
      borderClass: 'border-purple-500/35 hover:border-purple-400/60',
      accentColor: '#8f00ff',
      parallaxFactor: 18, // Move with mouse
      floatHeight: -10,
      floatDuration: 5.4,
      emergeDelay: 0.3,
    },
    {
      id: 'internship',
      value: '1',
      label: 'Internship',
      icon: '💼',
      target: 'journey',
      details: 'SDE Industry experience building end-to-end features and APIs.',
      sizeClass: 'w-32 h-32 md:w-36 md:h-36',
      glowClass: 'orb-emerald-glow',
      gradient: 'from-emerald-500/10 via-emerald-400/20 to-teal-500/30',
      borderClass: 'border-emerald-500/35 hover:border-emerald-400/60',
      accentColor: '#10b981',
      parallaxFactor: -12,
      floatHeight: -12,
      floatDuration: 7.0,
      emergeDelay: 0.5,
    },
    {
      id: 'education',
      value: '8.39',
      label: 'CGPA',
      icon: '🎓',
      target: 'journey',
      details: 'Pursuing B.E. CSE. Core theory, data structures, and computer science.',
      sizeClass: 'w-38 h-38 md:w-44 md:h-44',
      glowClass: 'orb-orange-glow',
      gradient: 'from-orange-500/10 via-orange-400/20 to-rose-500/30',
      borderClass: 'border-orange-500/35 hover:border-orange-400/60',
      accentColor: '#f97316',
      parallaxFactor: 28,
      floatHeight: -16,
      floatDuration: 4.8,
      emergeDelay: 0.2,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto py-20 px-6 overflow-visible select-none flex flex-col items-center"
    >
      {/* Galaxy Concentric Orbits SVG Backdrop */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-40">
        <svg className="w-[850px] h-[550px] absolute" viewBox="0 0 850 550" fill="none">
          <ellipse cx="425" cy="275" rx="390" ry="240" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="6 8" className="opacity-[0.03]" />
          <ellipse cx="425" cy="275" rx="270" ry="160" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 6" className="opacity-[0.04]" />
          <ellipse cx="425" cy="275" rx="140" ry="80" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2 4" className="opacity-[0.05]" />
        </svg>
      </div>

      {/* Galaxy Title */}
      <div className="text-center mb-16 relative z-10">

        <h2 className="text-3xl md:text-4xl font-bold font-heading bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Achievement Galaxy
        </h2>
      </div>

      {/* Planetary Orbs container */}
      <div className="relative w-full z-10 flex flex-wrap justify-center items-center gap-10 md:gap-14 lg:gap-20 py-6 min-h-[260px]">
        {orbs.map((orb) => (
          <OrbCard
            key={orb.id}
            orb={orb}
            mouseOffset={mouseOffset}
            isInView={isInView}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

// Single planetary orb component to manage separate float, parallax and click states
function OrbCard({ orb, mouseOffset, isInView, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setRippleActive(true);

    // Zoom / Navigate timeline
    setTimeout(() => {
      setRippleActive(false);
    }, 450);

    setTimeout(() => {
      onNavigate(orb.target);
      setClicked(false);
    }, 400);
  };

  // Generate 5 random drift particles for each orb
  const particlesRef = useRef(
    [...Array(5)].map((_, i) => {
      const angle = (i / 5) * Math.PI * 2;
      const radius = 60 + Math.random() * 20;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: 0.6 + Math.random() * 0.7,
        duration: 3 + Math.random() * 3.5,
      };
    })
  );

  return (
    <div className="relative flex justify-center items-center">
      {/* Outer float animation layer */}
      <motion.div
        animate={{
          y: [0, orb.floatHeight, 0]
        }}
        transition={{
          duration: orb.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Parallax and scale entry layer */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: clicked ? [1, 1.22, 1] : 1,
            opacity: 1,
            x: mouseOffset.x * orb.parallaxFactor,
            y: mouseOffset.y * orb.parallaxFactor,
          }}
          transition={{
            x: { type: "spring", stiffness: 70, damping: 22 },
            y: { type: "spring", stiffness: 70, damping: 22 },
            scale: clicked
              ? { duration: 0.4, ease: "easeInOut" }
              : { type: "spring", stiffness: 90, damping: 16, delay: orb.emergeDelay },
            opacity: { duration: 0.6, delay: orb.emergeDelay }
          }}
          whileHover={{
            scale: 1.12,
            transition: { duration: 0.25 }
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={handleClick}
          className={`relative cursor-pointer flex flex-col justify-center items-center select-none text-center ${orb.sizeClass} ${orb.glowClass} iridescent-planet transition-shadow duration-300 z-10`}
          style={{
            touchAction: 'none',
            borderRadius: '50%'
          }}
        >
          {/* Internal count and label */}
          <div className="relative z-10 flex flex-col items-center justify-center p-4">
            <span className="text-xs md:text-sm mb-1 opacity-75">{orb.icon}</span>
            <span className="text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight select-text">
              <AnimatedCount value={orb.value} isInView={isInView} />
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-[2px] mt-1.5 select-text">
              {orb.label}
            </span>
          </div>

          {/* Ripple Wave Element */}
          <AnimatePresence>
            {rippleActive && (
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: `2px solid ${orb.accentColor}`,
                  boxShadow: `0 0 25px ${orb.accentColor}`,
                  zIndex: -1
                }}
                initial={{ scale: 0.85, opacity: 0.9 }}
                animate={{ scale: 2.3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Glassmorphic detailed tooltip on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.92, x: '-50%' }}
                animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                exit={{ opacity: 0, y: 10, scale: 0.92, x: '-50%' }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute bottom-[108%] left-1/2 w-44 md:w-52 p-3 rounded-2xl border border-white/10 shadow-2xl z-50 pointer-events-none text-center"
                style={{
                  background: 'rgba(15, 15, 16, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                <div
                  className="font-bold text-xs uppercase tracking-[1.5px] mb-1.5"
                  style={{ color: orb.accentColor }}
                >
                  {orb.label} Details
                </div>
                <div className="text-[11px] text-white/70 leading-normal">
                  {orb.details}
                </div>
                {/* Pointer arrow down */}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px]"
                  style={{ borderTColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating particles revolving around the planet orb */}
        {particlesRef.current.map((pt, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1 md:w-1.5 h-1 md:h-1.5 rounded-full pointer-events-none opacity-40 z-0"
            style={{
              left: `calc(50% + ${pt.x}px)`,
              top: `calc(50% + ${pt.y}px)`,
              background: orb.accentColor,
              boxShadow: `0 0 10px ${orb.accentColor}`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 16, 0],
              y: [0, (Math.random() - 0.5) * 16, 0],
              scale: [1, pt.scale, 1],
              opacity: [0.3, 0.75, 0.3],
            }}
            transition={{
              duration: pt.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
