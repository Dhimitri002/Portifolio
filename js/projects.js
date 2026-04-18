function renderProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card animated delay-3';
  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.title;
  const title = document.createElement('h3');
  title.textContent = project.title;
  const row = document.createElement('div');
  row.className = 'skill-meta';
  row.append(createElement('span', {}, project.status), createElement('span', {}, project.category));
  const desc = document.createElement('p');
  desc.textContent = project.shortDescription;
  const tags = document.createElement('div');
  tags.className = 'project-tags';
  project.tags.forEach(tag => tags.append(createElement('span', {}, tag)));
  const actions = document.createElement('div');
  actions.className = 'project-actions';
  actions.append(createElement('a', { href: project.demo, target: '_blank', rel: 'noreferrer', className: 'button button-primary' }, 'Demo'));
  actions.append(createElement('a', { href: project.github, target: '_blank', rel: 'noreferrer', className: 'button button-secondary' }, 'GitHub'));
  actions.append(createElement('button', { className: 'button button-ghost', type: 'button', onclick: `copyToClipboard('${project.demo}')` }, 'Copiar link'));
  card.append(image, title, row, desc, tags, actions);
  return card;
}
