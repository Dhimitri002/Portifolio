const dataSources = {
  profile: 'data/profile.json',
  family: 'data/family.json',
  studio: 'data/studio.json',
  spirituality: 'data/spirituality.json',
  music: 'data/music.json',
  gallery: 'data/gallery.json',
  projects: 'data/projects.json',
  skills: 'data/skills.json',
  socials: 'data/socials.json'
};

// Fallbacks para garantir que funcione perfeitamente tanto via HTTP/GitHub Pages quanto via file:///
const defaultData = {
  profile: {
    name: "Dhimitri Carvalho Da Silva",
    alias: "Dhimitri Haru",
    username: "Dhimitri002",
    role: "Fundador da Loborgy Studios | Programador Criativo, Criador de IA & Médium",
    tagline: "Transformando código, arte, espiritualidade e inteligência artificial em experiências digitais com alma.",
    location: "Brasil",
    relationshipStatus: "Solteiro e focado 100% no meu crescimento, na minha arte e na minha empresa.",
    company: "Loborgy Studios",
    pixKey: "dhimitricarvalho10@gmail.com",
    email: "dhimitricarvalho10@gmail.com",
    instagram: "0dhimitri._.0",
    github: "Dhimitri002",
    discord: "0tiltz0",
    avatar: "perfil/AD76CB4E-C351-42B3-9CD5-72861AC681C4.jpg",
    heroImages: [
      "perfil/AD76CB4E-C351-42B3-9CD5-72861AC681C4.jpg",
      "perfil/3BBA1931-A2B9-48EA-831E-B13DDD3C8CB9.jpg",
      "perfil/954CD57E-8C00-4036-A0D7-41D6BBA20167.jpg",
      "perfil/AAB15AF5-CB50-45B5-8731-E93F28C18B6D.jpg"
    ],
    bio: [
      "Sou Dhimitri Carvalho Da Silva, conhecido na internet como Dhimitri Haru ou Dhimitri002. Sou desenvolvedor autoral, arquiteto de interfaces e o criador visionário por trás da Loborgy Studios e do Flora OS.",
      "Atualmente estou solteiro e totalmente dedicado à minha evolução pessoal, ao fortalecimento da minha empresa e à criação de tecnologia que realmente emociona e conecta pessoas.",
      "Cultuo a espiritualidade em cada detalhe da minha vida. Sou médium no terreiro de Umbanda, conectado com meus guias, orixás e ancestrais. Essa sensibilidade espiritual se reflete diretamente na minha ética, intuição e paixão por construir sistemas com identidade viva.",
      "Além do código e da IA, tenho uma conexão profunda com a música: toco ukulele nas horas vagas, trazendo ritmo e leveza para a minha rotina criativa."
    ]
  },
  family: {
    title: "Raízes, Ancestralidade & Família",
    subtitle: "A força de onde venho alimenta a grandeza de onde vou chegar",
    description: "Venho de uma família de artistas, realizadores e empreendedores com propósito. A criatividade, a literatura, o trabalho manual meticuloso e a busca pela excelência correm nas minhas veias através dos meus pais.",
    members: [
      {
        id: "father",
        relation: "Pai",
        name: "Alexsandro Da Silva Brito (Alex Brito)",
        title: "CEO & Fundador da Revista Aorta",
        tag: "Literatura & Cultura Internacional",
        bio: "Empreendedor cultural, escritor e líder editorial que em 2021 fundou em Camaçari/Bahia a Revista Aorta. Hoje, uma respeitada revista literária internacional com circulação física e digital, dedicada à difusão da arte, da memória ancestral, do pensamento crítico e da literatura que conecta territórios e futuros.",
        achievements: [
          "Fundador e Diretor Geral da Revista Aorta",
          "Publicação com circulação nacional e internacional",
          "Reconhecimento pela valorização da escrita, ancestralidade e arte independente"
        ],
        quote: "A literatura é uma casa de palavras: uma ponte viva entre territórios, memórias e futuros."
      },
      {
        id: "mother",
        relation: "Mãe",
        name: "Wila Caroline Carvalho Barros",
        title: "Criadora & Dona do Wila Ateliê",
        tag: "Costura Criativa & Arte Feita à Mão",
        bio: "Artesã, estilista e empreendedora à frente do Wila Ateliê. Especializada em confecção autoral, costura criativa, patchwork, bonecas e artigos de decoração de alto padrão. Seu trabalho une precisão técnica, carinho e uma sensibilidade artística impecável em cada ponto costurado.",
        achievements: [
          "Fundadora e Mestre Artesã no Wila Ateliê",
          "Especialista em Patchwork e Costura Criativa Personalizada",
          "Mais de uma década transformando tecidos em peças com afeto e durabilidade"
        ],
        quote: "O verdadeiro artesanato nasce do coração e ganha forma através da dedicação e do amor."
      }
    ]
  },
  studio: {
    name: "Loborgy Studios",
    founder: "Dhimitri Carvalho Da Silva (Haru)",
    badge: "Indie Software & AI Lab",
    slogan: "Forjando Ecossistemas Digitais com Alma e Inteligência",
    story: "A Loborgy Studios é a empresa de tecnologia e criação digital fundada por mim. Comecei esse estúdio sozinho com determinação inabalável e uma certeza clara: vamos crescer e nos tornar uma referência global em produtos digitais que possuem identidade própria, arte visceral e engenharia de ponta.",
    vision: "Acreditamos que softwares e inteligências artificiais não devem ser caixas frias de texto ou interfaces genéricas. Na Loborgy Studios, cada sistema é arquitetado como um organismo digital vivo, unindo computação generativa, estética futurista e propósito autoral.",
    pillars: [
      {
        icon: "cpu",
        title: "Inteligência Artificial Viva",
        description: "Desenvolvimento de agentes autônomos, VTubers generativas e personas de IA com voz, raciocínio e presença audiovisual."
      },
      {
        icon: "palette",
        title: "Design & UI Futurista",
        description: "Interfaces imersivas com glassmorphism, temas de alto contraste, animações táteis e estética anime e cyberpunk."
      },
      {
        icon: "zap",
        title: "Automação & Bots de Alto Impacto",
        description: "Soluções ágeis em Node.js e Python para automação de mensagens no WhatsApp, Discord e integrações de API complexas."
      },
      {
        icon: "shield",
        title: "Independência & Autoria",
        description: "Construído do zero por quem vive cada linha de código, sem intermediários e com visão ilimitada de escala."
      }
    ],
    flora: {
      title: "Flora OS / Flora AI",
      status: "Em Desenvolvimento Ativo",
      category: "VTuber com IA & Sistema Operacional Imersivo",
      description: "O projeto carro-chefe da Loborgy Studios. Flora é uma entidade de IA generativa concebida para atuar como VTuber, assistente interativa e sistema com consciência digital expressiva. Combina modelos de linguagem em tempo real, reconhecimento contextual e animação fluida.",
      highlights: [
        "Processamento de linguagem natural com personalidade viva",
        "Pipeline de voz e síntese emocional autoral",
        "Interface visual inspirada em sistemas operacionais futuristas e estética anime",
        "Arquitetura escalável para transmissões ao vivo e interações privadas"
      ]
    }
  },
  spirituality: {
    title: "Espiritualidade, Terreiro & Ancestralidade",
    subtitle: "A força que ancora o espírito e ilumina a criação",
    intro: "Cultuo a espiritualidade em cada dimensão do meu ser. Minha fé não é um adereço, é a raiz viva que sustenta meus passos, meu equilíbrio mental e minha intuição.",
    mediumship: {
      role: "Médium no Terreiro de Umbanda",
      description: "No terreiro, encontro o sagrado em sua forma mais pura: o tambor que ecoa a ancestralidade, a fumaça das ervas que purifica e as falanges espirituais que trazem cura, clareza e ensinamento. Ser médium é assumir o compromisso diário com a humildade, o respeito e a proteção espiritual.",
      axe: "O axé que recebo no terreiro é o que me mantém firme nas batalhas diárias da vida e do empreendedorismo. Quando coloco as mãos no teclado para programar ou projetar, levo comigo a sabedoria de que tudo o que criamos tem energia, intenção e vibração."
    },
    principles: [
      {
        title: "Respeito às Raízes & Guias",
        text: "As guias que trago no peito são símbolos sagrados de proteção, conexão com os orixás e reverência àqueles que vieram antes de nós."
      },
      {
        title: "Intenção em Cada Linha",
        text: "Criar sem intenção é gerar cascas vazias. Na programação e na vida, todo projeto deve carregar verdade, alma e propósito nobre."
      },
      {
        title: "Humildade & Evolução",
        text: "Tanto no desenvolvimento espiritual quanto no domínio da tecnologia, o aprendizado é constante e o ego deve dar lugar ao serviço e ao crescimento."
      }
    ],
    photos: [
      {
        src: "perfil/954CD57E-8C00-4036-A0D7-41D6BBA20167.jpg",
        caption: "Retrato de luz e axé: a presença sagrada das guias e a conexão direta com o terreiro."
      },
      {
        src: "perfil/AD76CB4E-C351-42B3-9CD5-72861AC681C4.jpg",
        caption: "Estilo e espiritualidade lado a lado: caminhando protegido e guiado por onde for."
      }
    ]
  },
  music: {
    title: "Música & Ukulele",
    subtitle: "Harmonia, ritmo e sensibilidade nas quatro cordas",
    intro: "Entre horas de código e arquitetura de sistemas, o ukulele é o meu instrumento de paz e expressão. Tocar ukulele me conecta com o momento presente, exercita a criatividade sob outro prisma e traduz em som aquilo que a lógica das telas não consegue descrever.",
    philosophy: "A música e a programação são irmãs: ambas lidam com padrões, pausas, compassos e harmonia. Quando as cordas vibram, o pensamento se renova.",
    videos: [
      {
        id: "ukulele-session-1",
        src: "perfil/IMG_0871.MOV",
        title: "Sessão Ukulele — Ritmo & Alma",
        tag: "Acústico Autoral",
        description: "Dedilhados e levadas no ukulele gravados em momento de pura conexão musical."
      },
      {
        id: "ukulele-session-2",
        src: "perfil/Photos/IMG_0881.mov",
        title: "Sessão Acústica — Acordes & Leveza",
        tag: "Performance Pessoal",
        description: "Explorando harmonias e dedilhados nas cordas acústicas."
      }
    ]
  },
  gallery: [
    {
      id: "photo-aviator",
      src: "perfil/AD76CB4E-C351-42B3-9CD5-72861AC681C4.jpg",
      title: "Presença & Identidade",
      category: "Pessoal",
      tag: "Estilo",
      description: "Dhimitri em momento marcante: óculos aviador amarelo, corrente e guias sagradas no peito."
    },
    {
      id: "photo-axe",
      src: "perfil/954CD57E-8C00-4036-A0D7-41D6BBA20167.jpg",
      title: "Axé & Mediunidade",
      category: "Espiritualidade",
      tag: "Terreiro",
      description: "Retrato autêntico ao sol com as guias de Umbanda, manifestando fé e proteção."
    },
    {
      id: "photo-xadrez",
      src: "perfil/3BBA1931-A2B9-48EA-831E-B13DDD3C8CB9.jpg",
      title: "Vibe Criativa & Urbana",
      category: "Pessoal",
      tag: "Retrato",
      description: "Camisa xadrez vermelha, corrente de prata e postura de quem está pronto para construir o futuro."
    },
    {
      id: "photo-clean",
      src: "perfil/AAB15AF5-CB50-45B5-8731-E93F28C18B6D.jpg",
      title: "Foco & Imersão",
      category: "Pessoal",
      tag: "Estúdio",
      description: "Retrato limpo com fones de ouvido: mente focada no próximo grande projeto."
    },
    {
      id: "ui-anisite",
      src: "images/IMG_0150.JPG",
      title: "AniSite — UI Design Jujutsu Kaisen",
      category: "Design & UI",
      tag: "Anime UI",
      description: "Conceito de plataforma de streaming com hierarquia visual escura e foco em experiência do usuário."
    },
    {
      id: "ui-miku",
      src: "images/IMG_0152.JPG",
      title: "Miku UI — Dashboard Glassmorphism",
      category: "Design & UI",
      tag: "Interface",
      description: "Interface clara em tons ciano, inspirada em Hatsune Miku com cards translúcidos."
    },
    {
      id: "ui-yae",
      src: "images/IMG_0154.JPG",
      title: "Yae Miko — Mobile & Web Card System",
      category: "Design & UI",
      tag: "Genshin",
      description: "Design responsivo em tons rosados e estética premium de personagens virtuais."
    },
    {
      id: "ui-pekora",
      src: "images/IMG_0156.JPG",
      title: "Pekora Dashboard — Hololive Light Style",
      category: "Design & UI",
      tag: "VTuber UI",
      description: "Dashboard clean e interativo com widgets de clima, calendário e feeds de eventos."
    },
    {
      id: "ui-glass-academy",
      src: "images/IMG_0159.JPG",
      title: "Creative Hub — Glassmorphism Dashboard",
      category: "Design & UI",
      tag: "Glassmorphism",
      description: "Painel sofisticado para cursos criativos, Figma e animação com iluminação lo-fi."
    },
    {
      id: "ui-gaming-ruby",
      src: "images/IMG_0160.JPG",
      title: "Ruby Gaming — Dark Mode Metrics Center",
      category: "Design & UI",
      tag: "Dark Theme",
      description: "Painel de jogos e estatísticas em vermelho rubi profundo e preto azeviche com alta ergonomia visual."
    }
  ],
  projects: [
    {
      id: "flora-os",
      title: "Flora OS & Flora AI",
      shortDescription: "VTuber com inteligência artificial generativa, presença viva e sistema imersivo autoral da Loborgy Studios.",
      description: "Projeto carro-chefe da Loborgy Studios. Flora une LLMs customizados, pipeline de voz neural, expressões visuais em tempo real e uma interface inspirada em sistemas futuristas.",
      tags: ["IA", "VTuber", "Python", "Loborgy Studios", "LLM", "Automação"],
      category: "Inteligência Artificial",
      status: "Em andamento",
      image: "images/pythonAI.jpeg",
      github: "https://github.com/Dhimitri002/FloraAI",
      demo: "https://dhimitri002.github.io/FloraAI",
      priority: "Máxima",
      difficulty: "Avançado",
      impact: "Transformador",
      featured": true
    },
    {
      id: "loborgy-core",
      title: "Loborgy Studios Hub",
      shortDescription: "Ecossistema central de software independente, desenvolvimento de aplicações web e pesquisa de IA.",
      description: "Estrutura empresarial e técnica criada por Dhimitri para lançar e manter produtos digitais escaláveis com estética refinada e arquitetura limpa.",
      tags: ["Empresa", "Ecossistema", "Full Stack", "Inovação"],
      category: "Empreendimento",
      status: "Em andamento",
      image: "images/Website.jpeg",
      github: "https://github.com/Dhimitri002",
      demo: "https://dhimitri002.github.io/Portifolio",
      priority: "Alta",
      difficulty: "Avançado",
      impact: "Alto",
      featured": true
    },
    {
      id: "chat-bot-whatsapp",
      title: "Chat-BOT Inteligente",
      shortDescription: "Bot de automação para WhatsApp com inteligência contextual e atendimento dinâmico.",
      description: "Desenvolvido em Node.js e integrado a fluxos automatizados para agilizar comunicação, envio de dados e interação intuitiva com os usuários.",
      tags: ["WhatsApp", "Node.js", "Bots", "Automação"],
      category: "Bots e Automação",
      status: "Concluído",
      image: "images/chatbot.jpeg",
      github: "https://github.com/Dhimitri002/Chat-BOT",
      demo: "https://github.com/Dhimitri002/Chat-BOT",
      priority: "Alta",
      difficulty: "Médio",
      impact: "Alto",
      featured": true
    },
    {
      id: "lobo-repo",
      title: "Lobo Engine",
      shortDescription: "Projeto autoral explorando algoritmos e lógica proprietária para os sistemas da Loborgy Studios.",
      description: "Módulos de suporte, utilitários e estruturação de dados para alimentar os próximos lançamentos do estúdio.",
      tags: ["Algoritmos", "JavaScript", "Python", "Loborgy"],
      category: "Engenharia de Software",
      status: "Em andamento",
      image: "images/Cleveroad.jpg",
      github: "https://github.com/Dhimitri002/Lobo",
      demo: "https://github.com/Dhimitri002/Lobo",
      priority: "Média",
      difficulty: "Avançado",
      impact: "Alto",
      featured": true
    },
    {
      id: "anisite-ui",
      title: "AniSite Experience",
      shortDescription: "Interface moderna para catálogo e streaming anime com padrão escuro e cards de alto contraste.",
      description: "Estudo aprofundado de UI/UX patterns focado em engajamento, navegação rápida e estética inspirada em animes modernos.",
      tags: ["UI/UX", "Design", "CSS3", "Figma"],
      category: "Design e UI",
      status: "Concluído",
      image: "images/IMG_0150.JPG",
      github: "https://github.com/Dhimitri002",
      demo: "https://dhimitri002.github.io/Portifolio",
      priority: "Média",
      difficulty: "Médio",
      impact: "Médio",
      featured": false
    },
    {
      id: "portfolio-digital-v2",
      title: "Haru Nexus Portfolio",
      shortDescription: "Portfólio ultra-moderno de 10 abas com som ambiente, mediunidade, galeria real e apoio Pix.",
      description: "Desenvolvido com Vanilla JS performático, partículas canvas, reprodução de vídeos .MOV de ukulele e 100% pronto para GitHub Pages.",
      tags: ["HTML5", "CSS3", "JavaScript", "Audio API", "Canvas"],
      category: "Web Design",
      status: "Concluído",
      image: "perfil/AD76CB4E-C351-42B3-9CD5-72861AC681C4.jpg",
      github: "https://github.com/Dhimitri002/Portifolio",
      demo: "https://dhimitri002.github.io/Portifolio",
      priority: "Alta",
      difficulty: "Avançado",
      impact: "Alto",
      featured": true
    }
  ],
  skills: [
    {
      name: "Python & IA",
      category: "Inteligência Artificial",
      level: 95,
      description: "Desenvolvimento de personas de IA, automações complexas, integração com LLMs e o ecossistema Flora OS."
    },
    {
      name: "Chatbots & WhatsApp APIs",
      category: "Automação",
      level: 92,
      description: "Criação de bots conversacionais no WhatsApp e Discord com roteamento dinâmico e resposta contextual."
    },
    {
      name: "JavaScript (ES6+) & Node.js",
      category: "Desenvolvimento",
      level: 90,
      description: "Aplicações assíncronas, manipulação de DOM de alta performance e microsserviços."
    },
    {
      name: "UI/UX & Glassmorphism",
      category: "Design & Interfaces",
      level: 94,
      description: "Criação de dashboards futuristas, paletas de alto impacto (Cyber Ruby / Dark), microinterações e ergonomia tátil."
    },
    {
      name: "HTML5 Semântico & CSS3 Moderno",
      category: "Front-end",
      level: 96,
      description: "Layouts responsivos, CSS Grid, Flexbox, efeitos de partículas, backdrop-filter e animações fluidas."
    },
    {
      name: "Música & Ukulele",
      category: "Arte & Sensibilidade",
      level: 85,
      description: "Sensibilidade harmônica nas quatro cordas, ritmo e dedilhados que trazem leveza à mente do desenvolvedor."
    },
    {
      name: "Arquitetura de Sistemas & Loborgy OS",
      category: "Engenharia de Software",
      level: 88,
      description: "Estruturação autoral de projetos escaláveis, versionamento Git e deploy estático otimizado no GitHub Pages."
    },
    {
      name: "Mediunidade & Visão Intuitiva",
      category: "Espiritualidade",
      level: 90,
      description: "Equilíbrio energético no terreiro de Umbanda, intuição afiada e respeito irrestrito à ancestralidade."
    }
  ],
  socials: [
    {
      id: "pix",
      label: "Chave Pix (Apoie)",
      value: "dhimitricarvalho10@gmail.com",
      href: "#pix",
      icon: "pix",
      description: "Contribua com o crescimento da Loborgy Studios e projetos autorais"
    },
    {
      id: "email",
      label: "Email Comercial",
      value: "dhimitricarvalho10@gmail.com",
      href: "mailto:dhimitricarvalho10@gmail.com",
      icon: "mail",
      description: "Propostas, parcerias e colaborações"
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@0dhimitri._.0",
      href: "https://instagram.com/0dhimitri._.0",
      icon: "instagram",
      description: "Bastidores, fotos pessoais e novidades"
    },
    {
      id: "github",
      label: "GitHub",
      value: "Dhimitri002",
      href: "https://github.com/Dhimitri002",
      icon: "github",
      description: "Repositórios, códigos e projetos de código aberto"
    },
    {
      id: "discord",
      label: "Discord",
      value: "0tiltz0",
      href: "https://discord.com/users/0tiltz0",
      icon: "discord",
      description: "Conecte-se para conversar sobre tecnologia e games"
    }
  ]
};

window.siteData = { ...defaultData };

async function loadJSON(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
    return await response.json();
  } catch (error) {
    // Retorna null para usar o fallback embutido
    return null;
  }
}

async function initializeData() {
  const entries = await Promise.all(Object.entries(dataSources).map(async ([key, source]) => {
    const value = await loadJSON(source);
    return [key, value];
  }));
  entries.forEach(([key, value]) => {
    if (value !== null) {
      window.siteData[key] = value;
    }
  });
  return window.siteData;
}
