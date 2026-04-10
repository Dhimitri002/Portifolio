import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export function About() {
  const { activeProfile } = usePortfolioData();

  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-2 font-mono text-sm tracking-widest text-accent uppercase">
            // Identidade
          </span>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Sobre Mim</h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-accent box-glow" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 glass-panel">
              <img 
                src={activeProfile.avatar || "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop"} 
                alt="Abstract Identity" 
                className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border border-accent/30" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="mb-6 font-display text-2xl font-bold text-white">
              {activeProfile.role}
            </h3>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-400">
              {activeProfile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p className="border-l-2 border-accent pl-4 italic text-gray-300">
                "Acredito em construir coisas que quebram limites, misturando tecnologia com sentimento e significado."
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10">
              <div>
                <div className="font-mono text-xs text-accent uppercase mb-1">Base</div>
                <div className="font-bold text-white">Brasil</div>
              </div>
              <div>
                <div className="font-mono text-xs text-accent uppercase mb-1">Foco</div>
                <div className="font-bold text-white">Full Stack & IA</div>
              </div>
              <div>
                <div className="font-mono text-xs text-accent uppercase mb-1">Interesses</div>
                <div className="font-bold text-white">Filosofia, Anime, Tech</div>
              </div>
              <div>
                <div className="font-mono text-xs text-accent uppercase mb-1">Status</div>
                <div className="font-bold text-white">Criando o Futuro</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
