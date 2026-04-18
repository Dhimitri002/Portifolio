const navLinks = document.querySelectorAll('.nav-list a');
const backToTopButton = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const settingsToggle = document.getElementById('settingsToggle');
const loginButton = document.getElementById('loginButton');
const settingsModal = document.getElementById('settingsModal');
const loginModal = document.getElementById('loginModal');
const adminModal = document.getElementById('adminModal');
const closeSettings = document.getElementById('closeSettings');
const closeLogin = document.getElementById('closeLogin');
const closeAdmin = document.getElementById('closeAdmin');
const projectSearch = document.getElementById('projectSearch');
const projectStatusFilter = document.getElementById('projectStatusFilter');
const clearFilters = document.getElementById('clearFilters');
const contactLinks = document.getElementById('contactLinks');
const skillsGrid = document.getElementById('skillsGrid');
const featuredProjects = document.getElementById('featuredProjects');
const projectsGrid = document.getElementById('projectsGrid');
const timelineList = document.getElementById('timelineList');
const servicesGrid = document.getElementById('servicesGrid');
const statsGrid = document.getElementById('statsGrid');
const heroText = document.querySelector('.hero-text');
const themeOptionsContainer = document.getElementById('themeOptions');
const modeButtonsContainer = document.getElementById('modeButtons');

function setActiveLink() {
  const fromTop = window.scrollY + 130;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const active = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
    link.classList.toggle('active', active);
  });
}

function onScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
}

function createElement(tag, attrs = {}, text = '') {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') element.className = value;
    else if (key === 'dataset') Object.entries(value).forEach(([dk, dv]) => element.dataset[dk] = dv);
    else element.setAttribute(key, value);
  });
  if (text) element.textContent = text;
  return element;
}

function renderContactLinks(links) {
  contactLinks.innerHTML = '';
  links.forEach(item => {
    const card = createElement('div', { className: 'contact-card' });
    const info = createElement('div');
    const title = createElement('strong', {}, item.label);
    const value = createElement('p', {}, item.value);
    info.append(title, value);
    const action = createElement('a', { href: item.href, target: '_blank', rel: 'noreferrer', className: 'button button-secondary' }, 'Abrir');
    card.append(info, action);
    contactLinks.append(card);
  });
}

function mapSkills(skills) {
  skillsGrid.innerHTML = '';
  skills.forEach(skill => {
    const card = createElement('article', { className: 'skill-card animated delay-1' });
    const title = createElement('h3', {}, skill.name);
    const meta = createElement('div', { className: 'skill-meta' });
    const category = createElement('span', {}, skill.category);
    const level = createElement('strong', {}, `${skill.level}%`);
    const bar = createElement('div', { className: 'skill-bar' });
    const fill = createElement('div', { className: 'skill-fill' });
    fill.style.width = `${skill.level}%`;
    bar.append(fill);
    meta.append(category, level);
    const summary = createElement('p', {}, skill.description);
    card.append(title, meta, bar, summary);
    skillsGrid.append(card);
  });
}

function renderFeatured(projects) {
  featuredProjects.innerHTML = '';
  projects.filter(project => project.featured).slice(0, 3).forEach(project => {
    const card = createElement('article', { className: 'project-card animated delay-2' });
    const image = createElement('img', { src: project.image, alt: project.title });
    const title = createElement('h3', {}, project.title);
    const desc = createElement('p', {}, project.shortDescription);
    const tagWrap = createElement('div', { className: 'project-tags' });
    project.tags.forEach(tag => tagWrap.append(createElement('span', {}, tag)));
    const actions = createElement('div', { className: 'project-actions' });
    actions.append(createElement('a', { href: project.demo, target: '_blank', rel: 'noreferrer', className: 'button button-primary' }, 'Demo'));
    actions.append(createElement('a', { href: project.github, target: '_blank', rel: 'noreferrer', className: 'button button-secondary' }, 'GitHub'));
    card.append(image, title, desc, tagWrap, actions);
    featuredProjects.append(card);
  });
}

function renderProjects(projects) {
  const query = projectSearch.value.trim().toLowerCase();
  const statusFilter = projectStatusFilter.value;
  const filtered = projects.filter(project => {
    const matchesQuery = [project.title, project.shortDescription, project.description, project.category, ...project.tags].some(value => value.toLowerCase().includes(query));
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  projectsGrid.innerHTML = filtered.length ? '' : '<p>Nenhum projeto encontrado com esses filtros.</p>';
  filtered.forEach(project => {
    const card = createElement('article', { className: 'project-card animated delay-3' });
    const image = createElement('img', { src: project.image, alt: project.title });
    const title = createElement('h3', {}, project.title);
    const row = createElement('div', { className: 'skill-meta' });
    row.append(createElement('span', {}, project.status), createElement('span', {}, project.category));
    const desc = createElement('p', {}, project.shortDescription);
    const tags = createElement('div', { className: 'project-tags' });
    project.tags.forEach(tag => tags.append(createElement('span', {}, tag)));
    const actions = createElement('div', { className: 'project-actions' });
    actions.append(createElement('a', { href: project.demo, target: '_blank', rel: 'noreferrer', className: 'button button-primary' }, 'Demo'));
    actions.append(createElement('a', { href: project.github, target: '_blank', rel: 'noreferrer', className: 'button button-secondary' }, 'GitHub'));
    actions.append(createElement('button', { className: 'button button-ghost', type: 'button', onclick: `copyToClipboard('${project.demo}')` }, 'Copiar link'));
    card.append(image, title, row, desc, tags, actions);
    projectsGrid.append(card);
  });
}

function renderTimeline(items) {
  timelineList.innerHTML = '';
  items.forEach(item => {
    const block = createElement('article', { className: 'timeline-item animated delay-1' });
    block.append(createElement('time', {}, item.year));
    block.append(createElement('h3', {}, item.title));
    block.append(createElement('p', {}, item.description));
    timelineList.append(block);
  });
}

function renderServices(services) {
  servicesGrid.innerHTML = '';
  services.forEach(service => {
    const card = createElement('article', { className: 'service-card animated delay-2' });
    card.append(createElement('h3', {}, service.title));
    card.append(createElement('p', {}, service.description));
    card.append(createElement('span', {}, service.detail));
    servicesGrid.append(card);
  });
}

function renderStats(stats) {
  statsGrid.innerHTML = '';
  stats.forEach(stat => {
    const card = createElement('article', { className: 'stat-card animated delay-3' });
    card.append(createElement('span', {}, stat.label));
    card.append(createElement('strong', {}, stat.value));
    card.append(createElement('p', {}, stat.description));
    statsGrid.append(card);
  });
}

function initializeSite(data) {
  renderContactLinks(data.socials);
  mapSkills(data.skills);
  renderFeatured(data.projects);
  renderProjects(data.projects);
  renderTimeline(data.timeline);
  renderServices(data.services);
  renderStats(data.stats);
  document.body.classList.add('animated');
  if (window.observeAnimatedSections) {
    window.observeAnimatedSections();
  }
}

function setThemeMode(theme) {
  document.body.classList.remove('theme-anime', 'theme-minimal', 'theme-developer', 'theme-presentation', 'theme-performance');
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('portfolioTheme', theme);
}

function loadThemeMode() {
  const saved = localStorage.getItem('portfolioTheme') || 'anime';
  setThemeMode(saved);
}

function setupSettingsPanel() {
  const themes = ['anime', 'minimal', 'developer', 'presentation', 'performance'];
  themeOptionsContainer.innerHTML = '';
  themes.forEach(theme => {
    const button = createElement('button', { type: 'button', className: theme === localStorage.getItem('portfolioTheme') ? 'active' : '' }, theme.replace(/^[a-z]/, char => char.toUpperCase()));
    button.addEventListener('click', () => {
      setThemeMode(theme);
      document.querySelectorAll('#themeOptions button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
    themeOptionsContainer.append(button);
  });

  const modes = ['Anime Mode', 'Minimal Mode', 'Developer Mode', 'Presentation Mode', 'Performance Mode'];
  modeButtonsContainer.innerHTML = '';
  modes.forEach(mode => {
    const btn = createElement('button', { type: 'button' }, mode);
    btn.addEventListener('click', () => {
      toast(`Modo ativado: ${mode}`);
      document.querySelectorAll('#modeButtons button').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    });
    modeButtonsContainer.append(btn);
  });
}

function toggleModal(modal, show = true) {
  modal.classList.toggle('hidden', !show);
  modal.setAttribute('aria-hidden', String(!show));
}

function setupListeners() {
  document.addEventListener('scroll', () => {
    setActiveLink();
    onScrollProgress();
  });

  backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('portfolioTheme') || 'anime';
    const themes = ['anime', 'minimal', 'developer', 'presentation', 'performance'];
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    setThemeMode(next);
    setupSettingsPanel();
  });

  settingsToggle.addEventListener('click', () => toggleModal(settingsModal, true));
  closeSettings.addEventListener('click', () => toggleModal(settingsModal, false));

  closeLogin.addEventListener('click', () => toggleModal(loginModal, false));
  closeAdmin.addEventListener('click', () => toggleModal(adminModal, false));

  projectSearch.addEventListener('input', () => renderProjects(window.siteData.projects));
  projectStatusFilter.addEventListener('change', () => renderProjects(window.siteData.projects));
  clearFilters.addEventListener('click', () => {
    projectSearch.value = '';
    projectStatusFilter.value = 'all';
    renderProjects(window.siteData.projects);
  });

  document.getElementById('importSettings').addEventListener('click', () => document.getElementById('importSettingsFile').click());
  document.getElementById('importSettingsFile').addEventListener('change', handleImportSettings);
  document.getElementById('exportSettings').addEventListener('click', exportSettingsJSON);
  document.getElementById('resetSettings').addEventListener('click', resetSettings);

  document.getElementById('contactForm').addEventListener('submit', event => {
    event.preventDefault();
    toast('Mensagem enviada localmente com sucesso!', 'success');
    event.target.reset();
  });
}

function handleImportSettings(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const config = JSON.parse(reader.result);
      if (config.theme) {
        setThemeMode(config.theme);
        setupSettingsPanel();
        toast('Configurações importadas com sucesso.', 'success');
      }
    } catch (error) {
      toast('Falha ao importar JSON.', 'error');
    }
  };
  reader.readAsText(file);
}

function exportSettingsJSON() {
  const config = {
    theme: localStorage.getItem('portfolioTheme') || 'anime'
  };
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'portfolio-settings.json';
  link.click();
}

function resetSettings() {
  localStorage.removeItem('portfolioTheme');
  setThemeMode('anime');
  setupSettingsPanel();
  toast('Configurações restauradas.', 'success');
}

function initializePage() {
  loadThemeMode();
  setupSettingsPanel();
  setupListeners();
  setTimeout(() => setActiveLink(), 200);
}

window.addEventListener('DOMContentLoaded', async () => {
  initializePage();
  const data = await initializeData();
  initializeSite(data);
});
