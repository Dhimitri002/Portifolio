import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 py-8 text-center backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="mb-4 font-display text-2xl font-bold tracking-wider text-white">
          HARU<span className="text-accent">.</span>
        </div>
        <p className="mb-6 font-mono text-xs text-gray-500 uppercase tracking-widest">
          Construindo universos digitais
        </p>
        <div className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Dhimitri (Haru). Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
