import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export function Navbar({ onOpenLogin, onOpenAdmin }: { onOpenLogin: () => void, onOpenAdmin: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { activeProfile } = usePortfolioData();
  
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 2 && !isLoggedIn) {
      onOpenLogin();
      setClickCount(0);
    }
  };

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Devlog', href: '#devlog' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed top-4 left-1/2 z-40 w-[95%] max-w-6xl -translate-x-1/2 rounded-full glass-panel px-6 py-3"
    >
      <div className="flex items-center justify-between">
        <div 
          className="cursor-pointer font-display text-xl font-bold tracking-wider text-white transition-colors hover:text-accent uppercase"
          onClick={handleLogoClick}
        >
          {activeProfile.alias}<span className="text-accent">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-6 text-sm font-medium uppercase tracking-widest text-gray-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="transition-colors hover:text-accent hover:text-glow">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-white/10 pl-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={onOpenAdmin}
                  className="flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold text-accent border border-accent/30 hover:bg-accent hover:text-white transition-all"
                >
                  <LayoutDashboard size={14} /> PAINEL
                </button>
                <button onClick={logout} className="text-gray-400 hover:text-white transition-colors" title="Sair do modo Admin">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="text-gray-400 hover:text-accent transition-colors"
                title="Acesso Restrito"
              >
                <Settings size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:hidden"
        >
          <ul className="flex flex-col gap-4 text-center text-sm font-medium uppercase tracking-widest text-gray-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block transition-colors hover:text-accent"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          {isLoggedIn && (
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
              <button onClick={() => { onOpenAdmin(); setIsOpen(false); }} className="flex items-center justify-center gap-2 text-accent font-bold">
                <LayoutDashboard size={16} /> Abrir Painel Admin
              </button>
              <button onClick={logout} className="flex items-center justify-center gap-2 text-gray-400">
                <LogOut size={16} /> Sair
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
