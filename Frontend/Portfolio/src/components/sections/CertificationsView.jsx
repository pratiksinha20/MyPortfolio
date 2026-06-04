import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { certifications } from '../../data/mockData';
import './Certifications.css';

export default function CertificationsView() {
  const cardRefs = useRef({});
  const [highlightedId, setHighlightedId] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive track radii for elliptical layout
  const [radii, setRadii] = useState({ rx: 340, ry: 80 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setRadii({ rx: 130, ry: 35 });
      } else if (w < 768) {
        setRadii({ rx: 220, ry: 55 });
      } else {
        setRadii({ rx: 340, ry: 80 });
      }
    };
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slowly rotate the carousel
  useEffect(() => {
    let frameId;
    const tick = () => {
      if (!isPaused) {
        setRotation(prev => (prev + 0.25) % 360);
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  // Click handler from carousel node
  const handleCarouselItemClick = (id) => {
    setHighlightedId(id);

    // Scroll to the matching card
    const targetElement = cardRefs.current[id];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Reset highlight animation after 2.2 seconds
    setTimeout(() => {
      setHighlightedId(null);
    }, 2200);
  };

  return (
    <div className="cert-page">
      {/* Header */}
      <motion.div
        className="cert-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="cert-eyebrow">Verified Credentials</p>
        <h1 className="cert-headline">
          Certifications &amp; <span className="name-gradient">Badges</span>
        </h1>
        <p className="cert-subheadline">
          Industry-recognized certifications and professional credentials validating my technical expertise.
        </p>
      </motion.div>

      {/* Grid of Certificate Cards */}
      <div className="cert-grid">
        {certifications.map((cert) => {
          const isHighlighted = highlightedId === cert.id;
          return (
            <div
              key={cert.id}
              ref={el => cardRefs.current[cert.id] = el}
              className={`cert-card ${isHighlighted ? 'cert-card-highlight' : ''}`}
              style={{ '--accent-color': cert.accentColor }}
            >
              <div className="cert-img-container">
                <img src={cert.image} alt={cert.title} className="cert-img" />
              </div>
              <div className="cert-info">
                <span className="cert-issuer">{cert.issuer}</span>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.details}</p>
              </div>

              {/* Credential Link or ID */}
              <div className="cert-credential-box">
                <span className="cert-cred-label">
                  {cert.credentialId ? 'Credential ID' : 'Live Verification'}
                </span>
                {cert.credentialId ? (
                  <span className="cert-cred-id" title={cert.credentialId}>
                    {cert.credentialId}
                  </span>
                ) : (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn"
                  >
                    <FaExternalLinkAlt size={11} /> 
                    <span>Verify Credential</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D 360-Degree Rotating Carousel */}
      <div className="cert-carousel-section">
        <h2 className="cert-carousel-title">Interactive Credentials Ring</h2>
        <p className="cert-carousel-subtitle">Hover to pause • Click to scroll &amp; locate card</p>
        
        <div 
          className="cert-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Dashed elliptical track path */}
          <div className="cert-carousel-track" />

          {/* Render rotating cards */}
          {certifications.map((cert, index) => {
            // Space 8 items evenly around the circle
            const baseAngle = index * (360 / certifications.length);
            const currentAngle = (baseAngle + rotation) % 360;
            const angleRad = (currentAngle * Math.PI) / 180;

            // X & Y coordinates on the ellipse
            const x = radii.rx * Math.cos(angleRad);
            const y = radii.ry * Math.sin(angleRad);

            // Compute depth factor from -1 (top/back) to 1 (bottom/front)
            // Tilted angle makes vertical sin coordinate act as depth
            const depthFactor = (Math.sin(angleRad) + 1) / 2; // normalizes to 0-1 range

            // Scale and opacity are higher for cards closer to front
            const scale = 0.62 + 0.38 * depthFactor;
            const opacity = 0.45 + 0.55 * depthFactor;
            const zIndex = Math.round(depthFactor * 100);

            return (
              <div
                key={`carousel-${cert.id}`}
                className="cert-carousel-item"
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  opacity,
                  zIndex,
                  '--accent-color': cert.accentColor
                }}
                onClick={() => handleCarouselItemClick(cert.id)}
              >
                <div className="cert-carousel-card">
                  <img src={cert.image} alt={cert.title} className="cert-carousel-img" />
                </div>
                <div className="cert-carousel-tooltip">
                  {cert.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
