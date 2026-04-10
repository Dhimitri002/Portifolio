import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Palette, User, FolderGit2, FileText, Settings, Download, Upload, Plus, Trash2 } from 'lucide-react';
import { usePortfolioData, Profile, Project, Post, Skill } from '../hooks/usePortfolioData';
import { useTheme, Theme, BackgroundPattern } from '../context/ThemeContext';

export function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'appearance' | 'profiles' | 'projects' | 'devlog' | 'skills'>('appearance');
  const { data, updateData, exportData, importData, activeProfile } = usePortfolioData();
  const { theme, setTheme, pattern, setPattern } = useTheme();

  if (!isOpen) return null;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importData(e.target.files[0]);
    }
  };

  const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'dark-anime', name: 'Dark Anime', color: 'bg-[#ff2a5f]' },
    { id: 'cyber-blue', name: 'Cyber Blue', color: 'bg-[#0ea5e9]' },
    { id: 'ethereal-purple', name: 'Ethereal Purple', color: 'bg-[#a855f7]' },
    { id: 'flora-nature', name: 'Flora Nature', color: 'bg-[#22c55e]' },
    { id: 'abyss-black', name: 'Abyss Black', color: 'bg-[#ffffff]' },
    { id: 'solar-flare', name: 'Solar Flare', color: 'bg-[#ff5500]' },
  ];

  const patterns: { id: BackgroundPattern; name: string }[] = [
    { id: 'none', name: 'Nenhum' },
    { id: 'grid', name: 'Grid' },
    { id: 'dots', name: 'Dots' },
    { id: 'scanlines', name: 'Scanlines' },
  ];

  const handleProfileChange = (profileId: string) => {
    updateData({ ...data, activeProfileId: profileId });
  };

  const tabs = [
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'profiles', label: 'Perfis', icon: User },
    { id: 'projects', label: 'Projetos', icon: FolderGit2 },
    { id: 'devlog', label: 'Devlog', icon: FileText },
    { id: 'skills', label: 'Skills', icon: Settings },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 glass-panel md:flex-row"
      >
        {/* Sidebar */}
        <div className="w-full border-b border-white/10 bg-black/40 p-6 md:w-64 md:border-b-0 md:border-r">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-white">Painel Admin</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-accent/20 text-accent border border-accent/30' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 hidden border-t border-white/10 pt-8 md:block">
            <h3 className="mb-4 font-mono text-xs text-gray-500 uppercase">Sistema</h3>
            <div className="space-y-3">
              <button onClick={exportData} className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 transition-all hover:border-accent hover:text-accent">
                <Download size={16} /> Exportar Backup
              </button>
              <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 transition-all hover:border-accent hover:text-accent">
                <Upload size={16} /> Importar Backup
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h3 className="font-display text-2xl font-bold text-white capitalize">{activeTab}</h3>
          </div>
          
          <div className="hidden md:block mb-8">
            <h3 className="font-display text-3xl font-bold text-white capitalize">{activeTab}</h3>
            <div className="mt-2 h-1 w-16 rounded-full bg-accent box-glow" />
          </div>

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="space-y-10">
              <section>
                <h4 className="mb-4 font-mono text-sm text-gray-400 uppercase">Tema Visual</h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition-all ${
                        theme === t.id ? 'border-accent bg-accent/10 box-glow' : 'border-white/10 hover:border-white/30 bg-black/20'
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full ${t.color} shadow-lg`} />
                      <span className="text-sm font-medium text-white">{t.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="mb-4 font-mono text-sm text-gray-400 uppercase">Padrão de Fundo</h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {patterns.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPattern(p.id)}
                      className={`rounded-xl border p-4 text-sm font-medium transition-all ${
                        pattern === p.id ? 'border-accent bg-accent/10 text-accent' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-black/20'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* PROFILES TAB */}
          {activeTab === 'profiles' && (
            <div className="space-y-8">
              <section>
                <h4 className="mb-4 font-mono text-sm text-gray-400 uppercase">Perfil Ativo</h4>
                <div className="flex flex-wrap gap-4">
                  {data.profiles.map(profile => (
                    <button
                      key={profile.id}
                      onClick={() => handleProfileChange(profile.id)}
                      className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                        data.activeProfileId === profile.id ? 'border-accent bg-accent/10 box-glow' : 'border-white/10 hover:border-white/30 bg-black/20'
                      }`}
                    >
                      {profile.avatar && (
                        <img src={profile.avatar} alt={profile.name} className="h-12 w-12 rounded-full object-cover border border-white/20" />
                      )}
                      <div className="text-left">
                        <div className="font-bold text-white">{profile.name}</div>
                        <div className="text-xs text-gray-400">{profile.alias}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-white/10 bg-black/20 p-6">
                <h4 className="mb-6 font-mono text-sm text-accent uppercase">Editar Perfil Ativo</h4>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-gray-400">Nome</label>
                      <input type="text" value={activeProfile.name} onChange={(e) => {
                        const newProfiles = data.profiles.map(p => p.id === activeProfile.id ? { ...p, name: e.target.value } : p);
                        updateData({ ...data, profiles: newProfiles });
                      }} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:border-accent focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-400">Alias / Apelido</label>
                      <input type="text" value={activeProfile.alias} onChange={(e) => {
                        const newProfiles = data.profiles.map(p => p.id === activeProfile.id ? { ...p, alias: e.target.value } : p);
                        updateData({ ...data, profiles: newProfiles });
                      }} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:border-accent focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-400">Cargo / Título</label>
                    <input type="text" value={activeProfile.role} onChange={(e) => {
                      const newProfiles = data.profiles.map(p => p.id === activeProfile.id ? { ...p, role: e.target.value } : p);
                      updateData({ ...data, profiles: newProfiles });
                    }} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:border-accent focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-400">URL do Avatar</label>
                    <input type="text" value={activeProfile.avatar || ''} onChange={(e) => {
                      const newProfiles = data.profiles.map(p => p.id === activeProfile.id ? { ...p, avatar: e.target.value } : p);
                      updateData({ ...data, profiles: newProfiles });
                    }} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:border-accent focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-400">Bio (Parágrafos separados por nova linha)</label>
                    <textarea rows={5} value={activeProfile.bio.join('\n')} onChange={(e) => {
                      const newBio = e.target.value.split('\n');
                      const newProfiles = data.profiles.map(p => p.id === activeProfile.id ? { ...p, bio: newBio } : p);
                      updateData({ ...data, profiles: newProfiles });
                    }} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:border-accent focus:outline-none" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button onClick={() => {
                  const newProject: Project = { id: Date.now().toString(), title: 'Novo Projeto', description: '', image: '', tags: [] };
                  updateData({ ...data, projects: [newProject, ...data.projects] });
                }} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/90">
                  <Plus size={16} /> Adicionar Projeto
                </button>
              </div>
              <div className="grid gap-4">
                {data.projects.map(project => (
                  <div key={project.id} className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-start">
                    <div className="flex-1 space-y-3">
                      <input type="text" value={project.title} onChange={(e) => {
                        const newProjects = data.projects.map(p => p.id === project.id ? { ...p, title: e.target.value } : p);
                        updateData({ ...data, projects: newProjects });
                      }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 font-bold text-white focus:border-accent focus:outline-none" placeholder="Título" />
                      
                      <textarea value={project.description} onChange={(e) => {
                        const newProjects = data.projects.map(p => p.id === project.id ? { ...p, description: e.target.value } : p);
                        updateData({ ...data, projects: newProjects });
                      }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-gray-300 focus:border-accent focus:outline-none" placeholder="Descrição" rows={2} />
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input type="text" value={project.image} onChange={(e) => {
                          const newProjects = data.projects.map(p => p.id === project.id ? { ...p, image: e.target.value } : p);
                          updateData({ ...data, projects: newProjects });
                        }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none" placeholder="URL da Imagem" />
                        <input type="text" value={project.tags.join(', ')} onChange={(e) => {
                          const newTags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                          const newProjects = data.projects.map(p => p.id === project.id ? { ...p, tags: newTags } : p);
                          updateData({ ...data, projects: newProjects });
                        }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none" placeholder="Tags (separadas por vírgula)" />
                      </div>
                    </div>
                    <button onClick={() => {
                      if(confirm('Tem certeza que deseja excluir este projeto?')) {
                        updateData({ ...data, projects: data.projects.filter(p => p.id !== project.id) });
                      }
                    }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEVLOG TAB */}
          {activeTab === 'devlog' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button onClick={() => {
                  const newPost: Post = { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], content: 'Nova nota...', tags: [] };
                  updateData({ ...data, devlog: [newPost, ...data.devlog] });
                }} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/90">
                  <Plus size={16} /> Nova Nota
                </button>
              </div>
              <div className="grid gap-4">
                {data.devlog.map(post => (
                  <div key={post.id} className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-start">
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-3">
                        <input type="date" value={post.date} onChange={(e) => {
                          const newDevlog = data.devlog.map(p => p.id === post.id ? { ...p, date: e.target.value } : p);
                          updateData({ ...data, devlog: newDevlog });
                        }} className="rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none" />
                        <input type="text" value={post.tags.join(', ')} onChange={(e) => {
                          const newTags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                          const newDevlog = data.devlog.map(p => p.id === post.id ? { ...p, tags: newTags } : p);
                          updateData({ ...data, devlog: newDevlog });
                        }} className="flex-1 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none" placeholder="Tags (separadas por vírgula)" />
                      </div>
                      <textarea value={post.content} onChange={(e) => {
                        const newDevlog = data.devlog.map(p => p.id === post.id ? { ...p, content: e.target.value } : p);
                        updateData({ ...data, devlog: newDevlog });
                      }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-gray-300 focus:border-accent focus:outline-none" placeholder="Conteúdo da nota" rows={3} />
                    </div>
                    <button onClick={() => {
                      if(confirm('Excluir esta nota?')) {
                        updateData({ ...data, devlog: data.devlog.filter(p => p.id !== post.id) });
                      }
                    }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button onClick={() => {
                  const newSkill: Skill = { id: Date.now().toString(), name: 'Nova Skill', level: 50, category: 'Geral' };
                  updateData({ ...data, skills: [...data.skills, newSkill] });
                }} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/90">
                  <Plus size={16} /> Adicionar Skill
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.skills.map(skill => (
                  <div key={skill.id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                    <input type="text" value={skill.name} onChange={(e) => {
                      const newSkills = data.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s);
                      updateData({ ...data, skills: newSkills });
                    }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm font-bold text-white focus:border-accent focus:outline-none" placeholder="Nome da Skill" />
                    
                    <input type="text" value={skill.category} onChange={(e) => {
                      const newSkills = data.skills.map(s => s.id === skill.id ? { ...s, category: e.target.value } : s);
                      updateData({ ...data, skills: newSkills });
                    }} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none" placeholder="Categoria" />
                    
                    <div className="flex items-center gap-3">
                      <input type="range" min="0" max="100" value={skill.level} onChange={(e) => {
                        const newSkills = data.skills.map(s => s.id === skill.id ? { ...s, level: parseInt(e.target.value) } : s);
                        updateData({ ...data, skills: newSkills });
                      }} className="flex-1 accent-accent" />
                      <span className="w-8 text-right font-mono text-xs text-accent">{skill.level}%</span>
                    </div>

                    <button onClick={() => {
                      updateData({ ...data, skills: data.skills.filter(s => s.id !== skill.id) });
                    }} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 py-2 text-xs text-red-500 hover:bg-red-500/10">
                      <Trash2 size={14} /> Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
