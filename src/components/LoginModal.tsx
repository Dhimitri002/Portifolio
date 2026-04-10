import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Unlock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
      setPassword('');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 glass-panel p-8"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent box-glow">
                {error ? <Lock size={28} /> : <Unlock size={28} />}
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Acesso Restrito</h3>
              <p className="mt-2 font-mono text-xs text-gray-400 uppercase tracking-widest">
                Modo Desenvolvedor
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg border bg-black/50 px-4 py-3 text-center font-mono text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-accent focus:ring-accent'
                  }`}
                  placeholder="Insira a chave de acesso"
                  autoFocus
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-center text-xs text-red-500"
                  >
                    Acesso negado. Chave incorreta.
                  </motion.p>
                )}
              </div>
              <button 
                type="submit"
                className="w-full rounded-lg bg-accent py-3 font-bold text-white transition-all hover:bg-accent/90 hover:box-glow"
              >
                Desbloquear Interface
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
