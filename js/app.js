// Aplicação Principal — Haru Nexus Portfolio (Dhimitri Carvalho Da Silva)
let activeTab = 'hero';
let viewMode = 'tabs'; // 'tabs' ou 'scroll'

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span class="toast-text">${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}
window.showToast = showToast;

function switchViewMode(mode) {
  viewMode = mode;
  const body = document.body;
  const toggleBtn = document.getElementById('viewModeToggle');

  if (viewMode === 'scroll') {
    body.classList.add('mode-scroll');
    body.classList.remove('mode-tabs');
    if (toggleBtn) toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 3h18v2H3V3zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
      <span>Modo Abas</span>
    `;
    // Mostrar todas as seções no scroll
    document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('hidden-tab'));
    showToast('Visualização alterada para Página Contínua', 'info');
  } else {
    body.classList.add('mode-tabs');
    body.classList.remove('mode-scroll');
    if (toggleBtn) toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
      <span>Modo Rolagem</span>
    `;
    activateTab(activeTab, false);
    showToast('Visualização alterada para Abas Rápidas (App Mode)', 'info');
  }
}

function activateTab(tabId, smoothScroll = true) {
  activeTab = tabId;

  // Atualizar botões da barra de navegação
  document.querySelectorAll('.tab-nav-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (viewMode === 'tabs') {
    // Esconder todas e mostrar apenas a ativa
    document.querySelectorAll('.tab-section').forEach(sec => {
      if (sec.id === tabId) {
        sec.classList.remove('hidden-tab');
        sec.classList.add('tab-enter');
        setTimeout(() => sec.classList.remove('tab-enter'), 400);
      } else {
        sec.classList.add('hidden-tab');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // No modo scroll, rolar suavemente até a seção
    const targetSection = document.getElementById(tabId);
    if (targetSection && smoothScroll) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function setupNavigation() {
  const navContainer = document.getElementById('tabNavList');
  if (!navContainer) return;

  navContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-nav-btn');
    if (btn) {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        activateTab(tabId);
      }
    }
  });

  const viewToggle = document.getElementById('viewModeToggle');
  if (viewToggle) {
    viewToggle.addEventListener('click', () => {
      switchViewMode(viewMode === 'tabs' ? 'scroll' : 'tabs');
    });
  }

  // Scrollspy para modo contínuo
  window.addEventListener('scroll', () => {
    if (viewMode !== 'scroll') return;
    const sections = document.querySelectorAll('.tab-section');
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.id;
      }
    });

    if (current && current !== activeTab) {
      activeTab = current;
      document.querySelectorAll('.tab-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === current);
      });
    }
  });
}

// Renderização dos Módulos com Dados Vivos
function renderHero(data) {
  const hero = data.profile || {};
  const heroName = document.getElementById('heroName');
  const heroRole = document.getElementById('heroRole');
  const heroTagline = document.getElementById('heroTagline');
  const heroAvatar = document.getElementById('heroAvatarImg');

  if (heroName) heroName.textContent = hero.name || "Dhimitri Carvalho Da Silva";
  if (heroRole) heroRole.textContent = hero.role || "Fundador da Loborgy Studios | Programador & Médium";
  if (heroTagline) heroTagline.textContent = hero.tagline || "";
  if (heroAvatar && hero.avatar) heroAvatar.src = hero.avatar;
}

function renderBio(data) {
  const profile = data.profile || {};
  const bioContainer = document.getElementById('bioParagraphs');
  if (bioContainer && profile.bio) {
    bioContainer.innerHTML = profile.bio.map(p => `<p class="bio-text">${p}</p>`).join('');
  }

  const relationshipBadge = document.getElementById('relationshipBadge');
  if (relationshipBadge && profile.relationshipStatus) {
    relationshipBadge.textContent = profile.relationshipStatus;
  }
}

function renderFamily(data) {
  const family = data.family || {};
  const container = document.getElementById('familyCardsGrid');
  if (!container || !family.members) return;

  container.innerHTML = family.members.map(member => `
    <article class="family-card" id="family-${member.id}">
      <div class="family-card__header">
        <span class="family-relation-badge">${member.relation}</span>
        <span class="family-tag">${member.tag}</span>
      </div>
      <h3 class="family-name">${member.name}</h3>
      <h4 class="family-title">${member.title}</h4>
      <p class="family-bio">${member.bio}</p>
      
      <div class="family-achievements">
        <h5>Destaques & Legado:</h5>
        <ul>
          ${member.achievements.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>

      <blockquote class="family-quote">
        “${member.quote}”
      </blockquote>
    </article>
  `).join('');
}

function renderStudio(data) {
  const studio = data.studio || {};
  const container = document.getElementById('studioPillarsGrid');
  if (!container || !studio.pillars) return;

  container.innerHTML = studio.pillars.map(pillar => `
    <div class="studio-pillar-card">
      <div class="pillar-icon-box">
        <span class="pillar-bullet"></span>
      </div>
      <h4>${pillar.title}</h4>
      <p>${pillar.description}</p>
    </div>
  `).join('');

  const floraDesc = document.getElementById('floraDescription');
  const floraHighlights = document.getElementById('floraHighlightsList');
  if (studio.flora) {
    if (floraDesc) floraDesc.textContent = studio.flora.description;
    if (floraHighlights && studio.flora.highlights) {
      floraHighlights.innerHTML = studio.flora.highlights.map(h => `<li>${h}</li>`).join('');
    }
  }
}

function renderSpirituality(data) {
  const sp = data.spirituality || {};
  const introElem = document.getElementById('spiritualityIntro');
  const mediumshipDesc = document.getElementById('mediumshipDesc');
  const mediumshipAxe = document.getElementById('mediumshipAxe');
  const principlesGrid = document.getElementById('spiritualityPrinciples');
  const photosGrid = document.getElementById('spiritualityPhotos');

  if (introElem) introElem.textContent = sp.intro || '';
  if (mediumshipDesc && sp.mediumship) mediumshipDesc.textContent = sp.mediumship.description;
  if (mediumshipAxe && sp.mediumship) mediumshipAxe.textContent = sp.mediumship.axe;

  if (principlesGrid && sp.principles) {
    principlesGrid.innerHTML = sp.principles.map(p => `
      <div class="spirit-principle-card">
        <h4>${p.title}</h4>
        <p>${p.text}</p>
      </div>
    `).join('');
  }

  if (photosGrid && sp.photos) {
    photosGrid.innerHTML = sp.photos.map(photo => `
      <div class="spirit-photo-card gallery-item" data-lightbox="true" data-src="${photo.src}" data-title="Espiritualidade & Terreiro" data-desc="${photo.caption}">
        <div class="spirit-photo-frame">
          <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
          <div class="spirit-photo-overlay">
            <span class="zoom-icon">🔍 Ampliar foto</span>
          </div>
        </div>
        <p class="spirit-photo-caption">${photo.caption}</p>
      </div>
    `).join('');
  }
}

function renderMusic(data) {
  const music = data.music || {};
  const introElem = document.getElementById('musicIntro');
  const philosophyElem = document.getElementById('musicPhilosophy');
  const videosGrid = document.getElementById('ukuleleVideosGrid');

  if (introElem) introElem.textContent = music.intro || '';
  if (philosophyElem) philosophyElem.textContent = music.philosophy || '';

  if (videosGrid && music.videos) {
    videosGrid.innerHTML = music.videos.map(v => `
      <div class="ukulele-video-card" data-video-src="${v.src}" data-video-title="${v.title}">
        <div class="video-thumbnail-placeholder">
          <video src="${v.src}" preload="metadata" muted playsinline></video>
          <div class="video-play-badge">
            <svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
          </div>
          <span class="video-tag">${v.tag}</span>
        </div>
        <div class="ukulele-video-info">
          <h4>${v.title}</h4>
          <p>${v.description}</p>
          <button class="button button-ghost mini">Assistir Ukulele ▶</button>
        </div>
      </div>
    `).join('');
  }
}

function renderGallery(data) {
  const gallery = data.gallery || [];
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  function displayItems(items) {
    container.innerHTML = items.map(item => `
      <div class="gallery-card gallery-item" data-lightbox="true" data-src="${item.src}" data-title="${item.title}" data-desc="${item.description}">
        <div class="gallery-image-wrap">
          <img src="${item.src}" alt="${item.title}" loading="lazy" />
          <div class="gallery-hover-overlay">
            <span class="gallery-tag">${item.tag}</span>
            <h4>${item.title}</h4>
            <span class="view-btn">Ver Detalhes ↗</span>
          </div>
        </div>
        <div class="gallery-footer">
          <span class="cat-pill">${item.category}</span>
          <span class="title-label">${item.title}</span>
        </div>
      </div>
    `).join('');
  }

  displayItems(gallery);

  // Filtros da galeria
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      if (cat === 'all') {
        displayItems(gallery);
      } else {
        displayItems(gallery.filter(item => item.category === cat));
      }
    });
  });
}

function renderProjects(data) {
  const projects = data.projects || [];
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  function displayProjects(items) {
    container.innerHTML = items.map(p => `
      <article class="project-card ${p.featured ? 'featured' : ''}">
        <div class="project-card__thumb">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="project-card__badges">
            <span class="status-badge ${p.status === 'Concluído' ? 'done' : 'wip'}">${p.status}</span>
            <span class="priority-badge">${p.priority}</span>
          </div>
        </div>
        <div class="project-card__content">
          <span class="project-cat">${p.category}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.shortDescription}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span>#${t}</span>`).join('')}
          </div>
          <div class="project-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="button button-ghost mini">GitHub</a>` : ''}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="button button-primary mini">Acessar Demo</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');
  }

  displayProjects(projects);

  const searchInput = document.getElementById('projectSearch');
  const statusFilter = document.getElementById('projectStatusFilter');

  function filterProjects() {
    const q = (searchInput ? searchInput.value : '').toLowerCase();
    const st = statusFilter ? statusFilter.value : 'all';

    const filtered = projects.filter(p => {
      const matchQ = p.title.toLowerCase().includes(q) ||
                     p.description.toLowerCase().includes(q) ||
                     p.tags.some(t => t.toLowerCase().includes(q));
      const matchSt = st === 'all' || p.status === st;
      return matchQ && matchSt;
    });
    displayProjects(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterProjects);
  if (statusFilter) statusFilter.addEventListener('change', filterProjects);
}

function renderSkills(data) {
  const skills = data.skills || [];
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  container.innerHTML = skills.map(skill => `
    <div class="skill-meter-card">
      <div class="skill-meter-head">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percent">${skill.level}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
      </div>
      <div class="skill-meta">
        <span class="skill-cat">${skill.category}</span>
        <p class="skill-desc">${skill.description}</p>
      </div>
    </div>
  `).join('');
}

function renderSocials(data) {
  const socials = data.socials || [];
  const container = document.getElementById('socialsList');
  if (!container) return;

  container.innerHTML = socials.map(s => `
    <a href="${s.href}" target="_blank" rel="noopener" class="social-link-card" id="social-${s.id}">
      <div class="social-icon-box">
        <span class="social-bullet"></span>
      </div>
      <div class="social-text">
        <span class="social-label">${s.label}</span>
        <span class="social-value">${s.value}</span>
        <p class="social-desc">${s.description}</p>
      </div>
      <span class="social-arrow">→</span>
    </a>
  `).join('');
}

// Inicialização Geral
window.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();

  // Carregar dados (JSON com fallback embutido)
  const data = await initializeData();

  renderHero(data);
  renderBio(data);
  renderFamily(data);
  renderStudio(data);
  renderSpirituality(data);
  renderMusic(data);
  renderGallery(data);
  renderProjects(data);
  renderSkills(data);
  renderSocials(data);

  // Botão voltar ao topo
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Formulário de contato
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const message = document.getElementById('messageInput').value;

      showToast(`Obrigado pelo contato, ${name}! Mensagem registrada com sucesso.`, 'success');

      // Abre opção de mailto para envio real se o usuário desejar
      const mailtoUrl = `mailto:dhimitricarvalho10@gmail.com?subject=Contato de ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nEmail de retorno: " + email)}`;
      window.open(mailtoUrl, '_blank');
      contactForm.reset();
    });
  }

  // Alternador de temas
  const themeToggle = document.getElementById('themeToggle');
  const themes = ['theme-ruby', 'theme-esmeralda', 'theme-anime'];
  let currentThemeIdx = 0;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.remove(themes[currentThemeIdx]);
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      document.body.classList.add(themes[currentThemeIdx]);
      showToast(`Tema alterado para: ${themes[currentThemeIdx].replace('theme-', '').toUpperCase()}`, 'info');
    });
  }
});
