import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export function Hero() {
  const { activeProfile } = usePortfolioData();

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center pt-20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] h-[40vw] w-[40vw] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-gray-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent box-glow animate-pulse" />
              Sistema Online
            </div>
            
            <h1 className="mb-4 font-display text-5xl font-bold leading-tight md:text-7xl">
              Oi, eu sou <br />
              <span className="text-accent text-glow">{activeProfile.name}</span>
              <span className="text-gray-500"> ({activeProfile.alias})</span>
            </h1>
            
            <h2 className="mb-6 font-mono text-xl text-gray-400 md:text-2xl">
              &gt; {activeProfile.role}_
            </h2>
            
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-gray-400">
              {activeProfile.bio[0]}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="group flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white transition-all hover:bg-accent/90 hover:box-glow"
              >
                Explorar Universo
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
              </a>
              <a 
                href="#contact" 
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                <Terminal size={20} />
                Iniciar Contato
              </a>
            </div>
          </motion.div>

          {/* Visual/Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto w-full max-w-md lg:max-w-full"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 glass-panel p-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-50" />
              <img 
                src={activeProfile.avatar || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"} 
                alt="Profile Aesthetic" 
                className="h-full w-full rounded-2xl object-cover mix-blend-luminosity opacity-80 transition-all duration-700 hover:mix-blend-normal hover:opacity-100"
              />
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-1/4 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-md"
              >
                <div className="font-mono text-xs text-accent">STATUS</div>
                <div className="font-bold text-white">Criando...</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-6 bottom-1/4 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-md"
              >
                <div className="font-mono text-xs text-blue-400">IDENTIDADE</div>
                <div className="font-bold text-white">{activeProfile.alias}</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
