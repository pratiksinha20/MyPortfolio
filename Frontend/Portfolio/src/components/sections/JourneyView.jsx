import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { timeline } from '../../data/mockData';
import './Journey.css';

function JourneyCard({ item }) {
  const cardRef = useRef(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth 3D tilt
  const rotateXSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(x, { stiffness: 150, damping: 20 });

  // Map normalized coordinates to rotation angles (tilt range: -12 to 12 degrees)
  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Local state for css custom properties (glare position)
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalized coordinates from -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // Glare position in percentages
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    setMousePos({ x: `${glareX}%`, y: `${glareY}%` });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos({ x: '50%', y: '50%' });
  };

  return (
    <div
      ref={cardRef}
      className="jrn-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="jrn-card-diamond"
        style={{
          rotate: 45, // Outer rotation for diamond look
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          '--accent-color': item.accentColor,
          '--glow-color': `${item.accentColor}25`,
          '--jrn-badge-bg': `${item.accentColor}10`,
          '--jrn-badge-border': `${item.accentColor}20`,
          '--mouse-x': mousePos.x,
          '--mouse-y': mousePos.y
        }}
      >
        {/* Specular glare reflection */}
        <div className="jrn-card-glare" />

        {/* Ambient Corner Glow */}
        <div className="jrn-card-glow" />

        {/* Card Content rotated back by -45 degrees */}
        <div className="jrn-card-content">
          <span className="jrn-year">{item.year}</span>
          <h3 className="jrn-title">{item.title}</h3>
          <p className="jrn-subtitle">{item.subtitle}</p>
          <p className="jrn-desc">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function JourneyView() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <div className="jrn-page" ref={containerRef}>
      {/* Section Header */}
      <motion.div
        className="jrn-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="jrn-eyebrow">Academic &amp; Professional Path</p>
        <h1 className="jrn-headline">
          My <span className="name-gradient">Journey</span>
        </h1>
        <p className="jrn-subheadline">
          Milestones shaping my foundation in computer science and engineering.
        </p>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="jrn-timeline">
        {/* Vertical Track Line */}
        <div className="jrn-timeline-track" />

        {/* Render timeline items */}
        {timeline.map((item, index) => {
          const isLeft = item.side === 'left';
          
          return (
            <motion.div
              key={item.id}
              className={`jrn-row ${isLeft ? 'jrn-row-left' : 'jrn-row-right'}`}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left Column (renders card on left side) */}
              <div className="jrn-side-col jrn-left-col">
                {isLeft && <JourneyCard item={item} />}
              </div>

              {/* Center Dot and Arrows Column */}
              <div className="jrn-center-col">
                <div className="jrn-timeline-dot-wrapper">
                  <div 
                    className="jrn-timeline-dot" 
                    style={{ 
                      backgroundColor: item.accentColor,
                      boxShadow: `0 0 12px ${item.accentColor}`
                    }} 
                  />
                  {/* Timeline Connecting Arrow Line */}
                  <div 
                    className="jrn-arrow-line" 
                    style={{ 
                      '--accent-color': item.accentColor,
                      background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, ${item.accentColor}, ${item.accentColor}10)`
                    }} 
                  >
                    <div 
                      className="jrn-arrowhead" 
                      style={{ 
                        '--accent-color': item.accentColor 
                      }} 
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (renders card on right side) */}
              <div className="jrn-side-col jrn-right-col">
                {!isLeft && <JourneyCard item={item} />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
