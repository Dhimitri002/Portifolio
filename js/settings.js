window.userSettings = window.userSettings || {
  theme: localStorage.getItem('portfolioTheme') || 'anime',
  particles: 65,
  glow: 82,
  motion: 90
};

function saveUserSettings(settings) {
  window.userSettings = { ...window.userSettings, ...settings };
  localStorage.setItem('portfolioSettings', JSON.stringify(window.userSettings));
}

function loadUserSettings() {
  try {
    const stored = localStorage.getItem('portfolioSettings');
    if (stored) {
      window.userSettings = JSON.parse(stored);
      return window.userSettings;
    }
  } catch (error) {
    console.warn('Não foi possível carregar configurações salvas.', error);
  }
  return window.userSettings;
}
