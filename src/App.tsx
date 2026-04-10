import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { IntroSequence } from './components/IntroSequence';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Devlog } from './components/Devlog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('haru_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('haru_intro_seen', 'true');
  };

  return (
    <>
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      
      {!showIntro && (
        <div className="min-h-screen">
          <Navbar 
            onOpenLogin={() => setShowLoginModal(true)} 
            onOpenAdmin={() => setShowAdminPanel(true)}
          />
          
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Devlog />
            <Contact />
          </main>
          
          <Footer />

          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)} 
          />

          {isLoggedIn && (
            <AdminPanel 
              isOpen={showAdminPanel} 
              onClose={() => setShowAdminPanel(false)} 
            />
          )}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

