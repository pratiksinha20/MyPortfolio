import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [dotPosition, setDotPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Lerp follow loop
    let animId;
    const updateCursor = () => {
      // Ring (lag follow)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      setPosition({ x: ringX, y: ringY });

      // Dot (fast follow)
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      setDotPosition({ x: dotX, y: dotY });

      animId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Hover listeners
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .project-card, .btn'
      );
      
      const onEnter = () => setIsHovered(true);
      const onLeave = () => setIsHovered(false);

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      };
    };

    // Re-bind hover listeners since components can mount dynamically
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    const removeListeners = addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
      observer.disconnect();
      removeListeners();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className={`custom-cursor ${isHovered ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Inner Dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
        }}
      />
    </>
  );
}
