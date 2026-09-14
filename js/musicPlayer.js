// Player de Áudio Ambiente Flutuante (Sintetizador Web Audio + Suporte a YouTube)
class AmbientMusicPlayer {
  constructor() {
    this.isPlaying = false;
    this.volume = 0.35;
    this.audioCtx = null;
    this.masterGain = null;
    this.timer = null;
    this.currentChord = 0;
    this.youtubeActive = false;

    // Acordes Lo-fi meditativos (Cmaj9, Am9, Fmaj7#11, G13sus)
    this.chords = [
      [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
      [110.00, 146.83, 164.81, 220.00, 261.63], // Am9
      [87.31, 130.81, 174.61, 220.00, 277.18],  // Fmaj7#11
      [98.00, 146.83, 196.00, 246.94, 329.63]   // G13sus
    ];

    this.initUI();
  }

  initUI() {
    const playerContainer = document.createElement('div');
    playerContainer.className = 'ambient-player-dock';
    playerContainer.id = 'ambientPlayerDock';
    playerContainer.innerHTML = `
      <div class="player-body">
        <button class="player-toggle" id="ambientPlayBtn" aria-label="Tocar música ambiente">
          <svg class="icon-play" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M8 5v14l11-7z"/>
          </svg>
          <svg class="icon-pause hidden" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        <div class="player-info">
          <span class="player-title">Haru Ambient Soundscape</span>
          <span class="player-status">Harmonia Lo-fi & Espiritual</span>
        </div>
        <div class="sound-waves" id="soundWaves">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="player-controls">
          <input type="range" class="volume-slider" id="ambientVolume" min="0" max="1" step="0.05" value="0.35" aria-label="Volume" />
          <button class="yt-stream-btn" id="openYtPlayerBtn" title="Abrir Lofi Player do YouTube">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(playerContainer);

    this.playBtn = document.getElementById('ambientPlayBtn');
    this.waves = document.getElementById('soundWaves');
    this.volumeSlider = document.getElementById('ambientVolume');
    this.ytBtn = document.getElementById('openYtPlayerBtn');

    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.volumeSlider.addEventListener('input', (e) => {
      this.volume = parseFloat(e.target.value);
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.05);
      }
    });

    this.ytBtn.addEventListener('click', () => this.toggleYouTubeModal());
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

      // Efeito de filtro passa-baixas para estética aconchegante lo-fi
      this.filter = this.audioCtx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(680, this.audioCtx.currentTime);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playChord(frequencies) {
    if (!this.isPlaying) return;
    const now = this.audioCtx.currentTime;
    const chordDuration = 4.2;

    frequencies.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Forma de onda quente e suave (sine + triângulo)
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Pequeno detune estéreo para espacialidade
      osc.detune.setValueAtTime((idx - 2) * 5, now);

      // Envelope ADSR aveludado
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.07 / (idx + 1), now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(gain);
      gain.connect(this.filter);

      osc.start(now);
      osc.stop(now + chordDuration + 0.5);
    });

    // Avançar progressão de acordes
    this.currentChord = (this.currentChord + 1) % this.chords.length;
    this.timer = setTimeout(() => {
      if (this.isPlaying) {
        this.playChord(this.chords[this.currentChord]);
      }
    }, (chordDuration - 0.5) * 1000);
  }

  togglePlay() {
    this.ensureAudioContext();
    this.isPlaying = !this.isPlaying;

    const playIcon = this.playBtn.querySelector('.icon-play');
    const pauseIcon = this.playBtn.querySelector('.icon-pause');

    if (this.isPlaying) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      this.waves.classList.add('active');
      this.playChord(this.chords[this.currentChord]);
      if (window.showToast) {
        window.showToast('Trilha sonora iniciada. Sinta a vibração e o foco.', 'info');
      }
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      this.waves.classList.remove('active');
      clearTimeout(this.timer);
    }
  }

  toggleYouTubeModal() {
    let modal = document.getElementById('ytPlayerModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay hidden';
      modal.id = 'ytPlayerModal';
      modal.innerHTML = `
        <div class="modal-card modal-card--audio" role="dialog" aria-modal="true">
          <button class="modal-close" id="closeYtModal">×</button>
          <h3>Lofi & Chill Lounge (YouTube)</h3>
          <p class="modal-desc">Música ambiente relaxante para programar, estudar e meditar com Haru.</p>
          <div class="yt-embed-wrap">
            <iframe 
              id="ytEmbedIframe"
              width="100%" 
              height="240" 
              src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?enablejsapi=1" 
              title="Lofi Girl Ambient Stream" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="modal-footer-notes">
            <span>Você pode pausar a música do sintetizador se preferir ouvir a transmissão do YouTube.</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeYtModal').addEventListener('click', () => {
        modal.classList.add('hidden');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    modal.classList.toggle('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.ambientPlayer = new AmbientMusicPlayer();
});
