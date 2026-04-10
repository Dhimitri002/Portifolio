import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export function Projects() {
  const { data } = usePortfolioData();

  return (
    <section id="projects" className="relative py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-2 font-mono text-sm tracking-widest text-accent uppercase">
            // Arquivo
          </span>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Projetos em Destaque</h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-accent box-glow" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 glass-panel transition-all hover:-translate-y-2 hover:border-accent/50 hover:box-glow"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 font-display text-xl font-bold text-white group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="mb-6 flex-1 text-sm text-gray-400">
                  {project.description}
                </p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                      <ExternalLink size={16} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
