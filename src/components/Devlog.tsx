import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export function Devlog() {
  const { data } = usePortfolioData();

  return (
    <section id="devlog" className="relative py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-2 font-mono text-sm tracking-widest text-accent uppercase">
            // Registros
          </span>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Devlog & Notas</h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-accent box-glow" />
        </motion.div>

        <div className="space-y-8">
          {data.devlog.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="hidden md:block absolute left-0 top-0 h-full w-px bg-white/10" />
              
              <div className="relative rounded-2xl border border-white/10 glass-panel p-6 md:ml-12 transition-all hover:border-accent/30">
                <div className="absolute -left-[57px] top-8 hidden h-4 w-4 rounded-full border-2 border-accent bg-bg-base md:block box-glow" />
                
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">{post.date}</span>
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {post.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
