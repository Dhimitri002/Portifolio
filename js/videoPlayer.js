// Controlador dos Vídeos de Ukulele (.MOV) e Media Lightbox
class VideoPlayerManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.ukulele-video-card');
      if (card) {
        const videoSrc = card.getAttribute('data-video-src');
        const videoTitle = card.getAttribute('data-video-title');
        if (videoSrc) {
          this.openVideoModal(videoSrc, videoTitle);
        }
      }

      const galleryItem = e.target.closest('.gallery-item[data-lightbox]');
      if (galleryItem) {
        const imgSrc = galleryItem.getAttribute('data-src');
        const imgTitle = galleryItem.getAttribute('data-title');
        const imgDesc = galleryItem.getAttribute('data-desc');
        if (imgSrc) {
          this.openImageModal(imgSrc, imgTitle, imgDesc);
        }
      }
    });
  }

  openVideoModal(src, title) {
    let modal = document.getElementById('videoLightboxModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay hidden';
      modal.id = 'videoLightboxModal';
      modal.innerHTML = `
        <div class="modal-card modal-card--video" role="dialog" aria-modal="true">
          <button class="modal-close" id="closeVideoModal">×</button>
          <h3 id="videoModalTitle">Sessão de Ukulele</h3>
          <div class="video-container">
            <video id="activeLightboxVideo" controls preload="metadata" playsinline>
              <source src="" type="video/mp4">
              <source src="" type="video/quicktime">
              Seu navegador não suporta reprodução direta deste formato de vídeo.
            </video>
          </div>
          <p class="video-notes">Haru tocando ukulele nas horas vagas.</p>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeVideoModal').addEventListener('click', () => this.closeVideoModal());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeVideoModal();
      });
    }

    const videoElem = modal.querySelector('#activeLightboxVideo');
    const titleElem = modal.querySelector('#videoModalTitle');
    titleElem.textContent = title || 'Sessão de Ukulele — Haru';
    videoElem.src = src;
    modal.classList.remove('hidden');
    videoElem.play().catch(() => {});
  }

  closeVideoModal() {
    const modal = document.getElementById('videoLightboxModal');
    if (modal) {
      const videoElem = modal.querySelector('#activeLightboxVideo');
      if (videoElem) {
        videoElem.pause();
        videoElem.currentTime = 0;
        videoElem.src = '';
      }
      modal.classList.add('hidden');
    }
  }

  openImageModal(src, title, desc) {
    let modal = document.getElementById('imageLightboxModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay hidden';
      modal.id = 'imageLightboxModal';
      modal.innerHTML = `
        <div class="modal-card modal-card--image" role="dialog" aria-modal="true">
          <button class="modal-close" id="closeImageModal">×</button>
          <div class="lightbox-image-wrap">
            <img id="lightboxImg" src="" alt="" />
          </div>
          <div class="lightbox-caption">
            <h3 id="lightboxTitle"></h3>
            <p id="lightboxDesc"></p>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeImageModal').addEventListener('click', () => {
        modal.classList.add('hidden');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    modal.querySelector('#lightboxImg').src = src;
    modal.querySelector('#lightboxTitle').textContent = title || '';
    modal.querySelector('#lightboxDesc').textContent = desc || '';
    modal.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.videoManager = new VideoPlayerManager();
});
