// Lógica de Doação & Chave Pix Interativa
class PixManager {
  constructor() {
    this.pixKey = "dhimitricarvalho10@gmail.com";
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('#copyPixBtn');
      if (copyBtn) {
        this.copyKey(copyBtn);
      }

      const qrBtn = e.target.closest('#viewQrCodeBtn');
      if (qrBtn) {
        this.showQrModal();
      }
    });
  }

  async copyKey(button) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(this.pixKey);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = this.pixKey;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // Feedback visual no botão
      const originalHTML = button.innerHTML;
      button.classList.add('copied');
      button.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>Chave Copiada!</span>
      `;

      if (window.showToast) {
        window.showToast('✨ Chave Pix copiada com sucesso! Obrigado pelo apoio à Loborgy Studios e muito axé!', 'success');
      }

      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalHTML;
      }, 3000);
    } catch (err) {
      console.error('Erro ao copiar chave:', err);
      if (window.showToast) {
        window.showToast(`Chave Pix: ${this.pixKey}`, 'info');
      }
    }
  }

  showQrModal() {
    let modal = document.getElementById('pixQrModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay hidden';
      modal.id = 'pixQrModal';
      modal.innerHTML = `
        <div class="modal-card modal-card--pix" role="dialog" aria-modal="true">
          <button class="modal-close" id="closePixQrModal">×</button>
          <div class="pix-modal-header">
            <span class="pix-badge">Apoie com Pix</span>
            <h3>Fortaleça a Loborgy Studios</h3>
            <p>Toda contribuição apoia a infraestrutura de IA, novos servidores e o desenvolvimento independente de Dhimitri.</p>
          </div>
          
          <div class="pix-qr-visual">
            <!-- QR Code estilizado gerado via API SVG para o email -->
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=dhimitricarvalho10@gmail.com&color=0a0812&bgcolor=ffffff" 
                 alt="QR Code Pix: dhimitricarvalho10@gmail.com" 
                 class="qr-image" />
          </div>

          <div class="pix-modal-key-box">
            <code>${this.pixKey}</code>
            <button class="button button-primary mini" id="modalCopyPixBtn">Copiar</button>
          </div>

          <p class="pix-modal-thanks">Axé e gratidão infinita a cada apoiador!</p>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closePixQrModal').addEventListener('click', () => modal.classList.add('hidden'));
      modal.querySelector('#modalCopyPixBtn').addEventListener('click', (e) => this.copyKey(e.currentTarget));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    modal.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.pixManager = new PixManager();
});
