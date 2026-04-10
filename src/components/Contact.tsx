import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Instagram, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-black/40">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-2 font-mono text-sm tracking-widest text-accent uppercase">
            // Conexão
          </span>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Iniciar Contato</h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-accent box-glow" />
        </motion.div>

        <div className="mx-auto max-w-4xl grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 font-display text-2xl font-bold">Vamos colaborar!</h3>
            <p className="mb-8 text-gray-400 leading-relaxed">
              Estou aberto a projetos interessantes, parcerias e novas oportunidades. 
              Se você tem uma ideia que mistura tecnologia e emoção, vamos conversar.
            </p>

            <div className="space-y-4">
              <a href="mailto:dhimitricarvalho10@gmail.com" className="group flex items-center gap-4 rounded-xl border border-white/10 glass-panel p-4 transition-all hover:border-accent/50 hover:bg-white/5">
                <div className="rounded-full bg-accent/20 p-3 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium text-white">dhimitricarvalho10@gmail.com</div>
                </div>
              </a>

              <a href="https://discord.gg/G3RuhTXJ" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-white/10 glass-panel p-4 transition-all hover:border-accent/50 hover:bg-white/5">
                <div className="rounded-full bg-accent/20 p-3 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Discord</div>
                  <div className="font-medium text-white">0tiltz0</div>
                </div>
              </a>
            </div>

            <div className="mt-8 flex gap-4">
              <a href="https://github.com/Dhimitri002" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 glass-panel p-4 text-gray-400 transition-all hover:border-accent hover:text-accent hover:box-glow">
                <Github size={24} />
              </a>
              <a href="https://www.instagram.com/0dhimitri._.0?igsh=MWFpcDBrMzB5dm9vMw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 glass-panel p-4 text-gray-400 transition-all hover:border-accent hover:text-accent hover:box-glow">
                <Instagram size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-white/10 glass-panel p-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-2 block font-mono text-xs uppercase text-gray-400">Nome</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs uppercase text-gray-400">Email</label>
                <input 
                  type="email" 
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs uppercase text-gray-400">Mensagem</label>
                <textarea 
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Como posso ajudar?"
                />
              </div>
              <button className="w-full rounded-lg bg-accent py-4 font-bold text-white transition-all hover:bg-accent/90 hover:box-glow">
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
