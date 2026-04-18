const loginForm = document.getElementById('loginForm');
const togglePasswordButton = document.getElementById('togglePassword');
const loginStatus = document.getElementById('loginStatus');
const authAdminModal = document.getElementById('adminModal');
const authCloseAdmin = document.getElementById('closeAdmin');
const authLoginButton = document.getElementById('loginButton');
const rememberMeInput = document.getElementById('rememberMe');

function isAuthenticated() {
  return localStorage.getItem('portfolioAuth') === 'admin';
}

function updateLoginState() {
  if (loginButton) {
    loginButton.textContent = isAuthenticated() ? 'Painel' : 'Login';
  }
}

const adminTabs = document.querySelectorAll('#adminTabs button');
const adminPanel = document.getElementById('adminPanel');

function openAdminPanel() {
  if (!isAuthenticated()) return toggleModal(loginModal, true);
  toggleModal(authAdminModal, true);
  renderAdminPanelSection('content');
}

function createAdminCard(title, description, buttonText, onClick) {
  const card = document.createElement('div');
  card.className = 'info-card';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const text = document.createElement('p');
  text.textContent = description;
  const action = document.createElement('button');
  action.className = 'button button-primary';
  action.textContent = buttonText;
  action.addEventListener('click', onClick);
  card.append(heading, text, action);
  return card;
}

function renderAdminPanelSection(section) {
  if (!adminPanel) return;
  adminPanel.innerHTML = '';
  if (section === 'content') {
    adminPanel.append(createAdminCard('Editar Perfil', 'Abra e altere conteúdo do site usando JSON em arquivos locais.', 'Abrir JSON', () => toast('Edite os arquivos dentro de data/ ou expanda o painel para edição futura.')));
    adminPanel.append(createAdminCard('Exportar conteúdo', 'Faça backup dos dados ativos do seu portfólio em JSON.', 'Exportar JSON', exportSettingsJSON));
  }
  if (section === 'projects') {
    adminPanel.append(createAdminCard('Gerenciar projetos', 'Adicione ou ajuste projetos em data/projects.json e atualize o site.', 'Abrir projetos', () => toast('Use os arquivos JSON em data/projects.json para editar projetos.')));
  }
  if (section === 'appearance') {
    adminPanel.append(createAdminCard('Tema e estilo', 'Altere o estilo do site em css/themes.css e os presets em data/settings.json.', 'Abrir temas', () => toggleModal(settingsModal, true)));
  }
  if (section === 'backup') {
    adminPanel.append(createAdminCard('Backup local', 'Baixe as configurações atuais e mantenha sua identidade visual salva.', 'Exportar backup', exportSettingsJSON));
    adminPanel.append(createAdminCard('Reset visual', 'Restaure o tema padrão do portfólio.', 'Restaurar padrão', resetSettings));
  }
}

function setupAdminTabs() {
  adminTabs.forEach(button => {
    button.addEventListener('click', () => {
      adminTabs.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderAdminPanelSection(button.dataset.tab);
    });
  });
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const username = loginForm.loginUser.value.trim();
  const password = loginForm.loginPassword.value.trim();
  if (username.toLowerCase() === 'haru' && password === 'anime2026') {
    localStorage.setItem('portfolioAuth', 'admin');
    if (rememberMeInput.checked) localStorage.setItem('portfolioRemember', 'true');
    loginStatus.textContent = 'Acesso concedido. Painel ativado.';
    loginStatus.style.color = '#9ffea4';
    setTimeout(() => {
      toggleModal(loginModal, false);
      openAdminPanel();
    }, 800);
  } else {
    loginStatus.textContent = 'Usuário ou senha incorretos.';
    loginStatus.style.color = '#ff6a6a';
  }
}

function setupAuth() {
  updateLoginState();
  if (authLoginButton) {
    if (isAuthenticated()) {
      authLoginButton.textContent = 'Painel';
      authLoginButton.addEventListener('click', openAdminPanel);
    } else {
      authLoginButton.textContent = 'Login';
      authLoginButton.addEventListener('click', () => toggleModal(loginModal, true));
    }
  }
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener('click', () => {
      const passwordInput = document.getElementById('loginPassword');
      if (!passwordInput) return;
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      togglePasswordButton.textContent = type === 'password' ? '👁' : '👁️‍🗨️';
    });
  }
  if (adminTabs.length) setupAdminTabs();
  if (loginForm) loginForm.addEventListener('submit', handleAuthSubmit);
}

window.addEventListener('DOMContentLoaded', setupAuth);
