function toast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.innerHTML = `<strong>${type === 'success' ? 'Sucesso' : type === 'error' ? 'Erro' : 'Info'}</strong><span>${message}</span>`;
  container.appendChild(toastEl);
  setTimeout(() => {
    toastEl.remove();
  }, 4000);
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text).then(() => {
    toast('Link copiado para a área de transferência.', 'success');
  }).catch(() => {
    toast('Não foi possível copiar o link.', 'error');
  });
}
