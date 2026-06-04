import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import ThreeBackground from './components/effects/ThreeBackground';
import CustomCursor from './components/effects/CustomCursor';
import AmbientOrbs from './components/effects/AmbientOrbs';
import TechGrid from './components/effects/TechGrid';

// Views
import HomeView from './components/sections/HomeView';
import AboutView from './components/sections/AboutView';
import SkillsView from './components/sections/SkillsView';
import ProjectsView from './components/sections/ProjectsView';
import JourneyView from './components/sections/JourneyView';
import CertificationsView from './components/sections/CertificationsView';
import ContactView from './components/sections/ContactView';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Sync state with URL Hash for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'about', 'skills', 'projects', 'journey', 'certifications', 'contact'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      } else {
        // Fallback or default page
        setActivePage('home');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    window.location.hash = page;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans select-none" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      {/* Global Ambient Background Effects */}
      <ThreeBackground />
      <AmbientOrbs />
      <TechGrid />
      <CustomCursor />

      {/* Navigation */}
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      {/* Main Pages with AnimatePresence Transitions */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            {activePage === 'home' && <HomeView onNavigate={navigateTo} />}
            {activePage === 'about' && <AboutView />}
            {activePage === 'skills' && <SkillsView />}
            {activePage === 'projects' && <ProjectsView />}
            {activePage === 'journey' && <JourneyView />}
            {activePage === 'certifications' && <CertificationsView />}
            {activePage === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
