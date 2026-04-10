import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2500);
    const timer3 = setTimeout(() => setStep(3), 4000);
    const timer4 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05050a] text-white"
      >
        <div className="w-full max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="font-display text-4xl tracking-widest text-accent text-glow uppercase">
              System Boot
            </h1>
          </motion.div>

          <div className="space-y-4 font-mono text-sm text-gray-400">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 0 ? 1 : 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-accent">]</span>
              <span>Inicializando universo...</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 1 ? 1 : 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-accent">]</span>
              <span>Carregando identidade [Haru]...</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-accent">]</span>
              <span>Desbloqueando interface...</span>
            </motion.div>

            {step >= 2 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'linear' }}
                className="h-1 bg-accent box-glow mt-4"
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
