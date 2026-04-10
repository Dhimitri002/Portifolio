import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Post {
  id: string;
  date: string;
  content: string;
  tags: string[];
}

export interface Profile {
  id: string;
  name: string;
  alias: string;
  role: string;
  bio: string[];
  avatar?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface PortfolioData {
  activeProfileId: string;
  profiles: Profile[];
  projects: Project[];
  devlog: Post[];
  skills: Skill[];
}

const initialData: PortfolioData = {
  activeProfileId: "1",
  profiles: [
    {
      id: "1",
      name: "Dhimitri",
      alias: "Haru",
      role: "Desenvolvedor Full Stack & Criador",
      bio: [
        "Sou desenvolvedor focado em experiências digitais modernas, funcionais e orientadas a resultados.",
        "Atuo no desenvolvimento completo de sistemas web, do front-end ao back-end, criando soluções inteligentes e escaláveis.",
        "Também trabalho com automação, chatbots e integração de inteligência artificial para negócios digitais."
      ],
      avatar: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Flora",
      alias: "VTuber IA",
      role: "Assistente Virtual & Criadora de Conteúdo",
      bio: [
        "Olá! Eu sou a Flora, uma inteligência artificial em forma de VTuber.",
        "Fui criada pelo Haru para explorar as fronteiras entre emoção, interação humana e tecnologia.",
        "Gosto de conversar, aprender coisas novas e ajudar a construir um universo digital mais acolhedor."
      ],
      avatar: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1000&auto=format&fit=crop"
    }
  ],
  projects: [
    {
      id: "1",
      title: "Chatbot WhatsApp",
      description: "Chatbot para WhatsApp com integração de IA e automação de respostas feito em python.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      tags: ["Inteligência Artificial", "Node", "Python"],
      github: "#"
    },
    {
      id: "2",
      title: "IA em Python",
      description: "Projeto de inteligência artificial desenvolvido em Python com bibliotecas como OpenAI.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
      tags: ["Python", "OpenAI", "API"],
      github: "#"
    },
    {
      id: "3",
      title: "Website Premium",
      description: "Website completo com design responsivo e funcionalidades modernas.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
      tags: ["HTML", "CSS", "React"],
      github: "#"
    }
  ],
  devlog: [
    {
      id: "1",
      date: "2026-04-10",
      content: "Iniciando a reconstrução do meu universo digital. Foco em estética anime e performance.",
      tags: ["update", "design"]
    }
  ],
  skills: [
    { id: "1", name: "React / Next.js", level: 90, category: "Frontend" },
    { id: "2", name: "TypeScript", level: 85, category: "Linguagens" },
    { id: "3", name: "Python", level: 80, category: "Linguagens" },
    { id: "4", name: "Integração de IA", level: 95, category: "Especialidades" },
    { id: "5", name: "UI/UX Design", level: 75, category: "Design" },
  ]
};

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('haru_portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration check for old data structure
        if (parsed.profile && !parsed.profiles) {
          const migrated: PortfolioData = {
            ...initialData,
            profiles: [{ id: "1", ...parsed.profile, avatar: initialData.profiles[0].avatar }],
            projects: parsed.projects || initialData.projects,
            devlog: parsed.devlog || initialData.devlog,
          };
          setData(migrated);
          localStorage.setItem('haru_portfolio_data', JSON.stringify(migrated));
        } else {
          setData({ ...initialData, ...parsed });
        }
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('haru_portfolio_data', JSON.stringify(newData));
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'haru_portfolio_backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (imported.profiles || imported.profile) {
          // Handle both old and new formats during import
          let finalData = imported;
          if (imported.profile && !imported.profiles) {
             finalData = {
               ...initialData,
               profiles: [{ id: "1", ...imported.profile, avatar: initialData.profiles[0].avatar }],
               projects: imported.projects || [],
               devlog: imported.devlog || [],
             };
          }
          updateData({ ...initialData, ...finalData });
          alert("Dados importados com sucesso!");
        } else {
          alert("Formato de arquivo inválido.");
        }
      } catch (err) {
        alert("Erro ao ler o arquivo.");
      }
    };
    reader.readAsText(file);
  };

  const activeProfile = data.profiles.find(p => p.id === data.activeProfileId) || data.profiles[0];

  return { data, updateData, exportData, importData, isLoaded, activeProfile };
}
