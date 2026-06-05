import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaTimes, FaUndo, FaMousePointer
} from 'react-icons/fa';
import { projects } from '../../data/mockData';
import './Projects.css';

function ProjectCard({ project, isFlipped, onFlip, index }) {
  return (
    <div
      className="proj-card-wrapper"
      onClick={onFlip}
    >
      <motion.div
        className="proj-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE */}
        <div
          className="proj-card-front"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="proj-img-container">
            <img src={project.image} alt={project.title} className="proj-img" />
          </div>
          <div className="proj-info">
            <div className="flex justify-between items-center w-full mb-1">
              <span className="proj-cat-badge">{project.category}</span>
              <span className="proj-flip-hint">
                <FaMousePointer className="proj-flip-icon" />
                Click to flip
              </span>
            </div>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-subtitle">{project.subtitle}</p>
          </div>

          {/* Hover overlay */}
          <div className="proj-hover-overlay">
            <h4 className="proj-overlay-title">{project.title}</h4>
            <p className="proj-tech-label">Tech Stack</p>
            <div className="proj-tech-chips">
              {project.techStack.map(tech => (
                <span key={tech} className="proj-tech-chip">{tech}</span>
              ))}
            </div>
            <div className="proj-actions" onClick={e => e.stopPropagation()}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn-primary"
              >
                <FaExternalLinkAlt size={12} /> Live Link
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn-secondary"
              >
                <FaGithub size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="proj-card-back"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="proj-back-header">
            <div className="proj-back-title-wrap">
              <span className="proj-cat-badge">{project.category}</span>
              <h3 className="proj-back-title">{project.title}</h3>
            </div>
            <button
              className="proj-back-close"
              onClick={(e) => {
                e.stopPropagation();
                onFlip();
              }}
              title="Close description"
            >
              <FaTimes size={12} />
            </button>
          </div>

          <p className="proj-back-desc">{project.description}</p>

          <div className="proj-features-wrap">
            <p className="proj-features-label">Key Highlights</p>
            <ul className="proj-features-list">
              {project.features.map((feature, i) => (
                <li key={i} className="proj-feature-item">
                  <span className="proj-feature-bullet" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="proj-back-footer">
            <div className="proj-actions-back" onClick={e => e.stopPropagation()}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn-primary py-1 px-2.5 text-[11px]"
              >
                <FaExternalLinkAlt size={10} /> Live Link
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn-secondary py-1 px-2.5 text-[11px]"
              >
                <FaGithub size={11} /> GitHub
              </a>
            </div>
            <div className="proj-back-footer-right">
              <span className="proj-back-hint">Click to return</span>
              <button
                className="proj-btn proj-btn-secondary flex items-center gap-1 py-1 px-3 text-[11px]"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlip();
                }}
              >
                <FaUndo size={9} /> Flip Back
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filterProject = (project, filter) => {
    if (filter === 'All') return true;
    if (filter === 'AI & CV') return project.category.includes('AI') || project.category.includes('Vision');
    if (filter === 'Full Stack') return project.category.includes('Full Stack');
    if (filter === 'Frontend') return project.category.includes('Frontend') || project.category.includes('Web');
    return true;
  };

  const filteredProjects = projects.filter(project => filterProject(project, activeFilter));

  return (
    <div className="proj-page">
      <motion.div
        className="proj-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="proj-eyebrow">Work Showcase</p>
        <h1 className="proj-headline">
          Featured <span className="name-gradient">Projects</span>
        </h1>
        <p className="proj-subheadline">
          A collection of interactive web platforms, AI applications, and computer vision systems.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className="proj-tabs"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {['All', 'AI & CV', 'Full Stack', 'Frontend'].map(cat => (
          <button
            key={cat}
            className={`proj-tab-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid of Projects */}
      <motion.div
        className="proj-grid"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            isFlipped={!!flippedCards[project.id]}
            onFlip={() => toggleFlip(project.id)}
            index={idx}
          />
        ))}
      </motion.div>
    </div>
  );
}
