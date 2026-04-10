import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export function Skills() {
  const { data } = usePortfolioData();

  // Group skills by category
  const groupedSkills = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof data.skills>);

  return (
    <section id="skills" className="relative py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-2 font-mono text-sm tracking-widest text-accent uppercase">
            // Capacidades
          </span>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Stack & Skills</h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-accent box-glow" />
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groupedSkills).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 glass-panel p-8"
            >
              <h3 className="mb-6 font-display text-xl font-bold text-white border-b border-white/10 pb-4">
                {category}
              </h3>
              
              <div className="space-y-6">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="mb-2 flex justify-between font-mono text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-black/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="h-full rounded-full bg-accent box-glow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
