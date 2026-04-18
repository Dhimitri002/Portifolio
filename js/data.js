const dataSources = {
  profile: 'data/profile.json',
  projects: 'data/projects.json',
  skills: 'data/skills.json',
  socials: 'data/socials.json',
  settings: 'data/settings.json',
  timeline: 'data/timeline.json',
  services: 'data/services.json',
  stats: 'data/stats.json'
};

window.siteData = {
  profile: null,
  projects: [],
  skills: [],
  socials: [],
  settings: null,
  timeline: [],
  services: [],
  stats: []
};

async function loadJSON(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error);
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
