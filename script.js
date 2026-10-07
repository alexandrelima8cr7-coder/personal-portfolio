const audio = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggle');
const volumeSlider = document.getElementById('volumeSlider');

if (audio && toggleBtn && volumeSlider) {
  audio.volume = Number(volumeSlider.value);
  audio.muted = true;

  const updateToggleButton = () => {
    const isPlaying = !audio.paused && !audio.muted;
    toggleBtn.textContent = isPlaying ? '⏸' : '▶';
    toggleBtn.setAttribute('aria-label', isPlaying ? 'Pausar música de fundo' : 'Tocar música de fundo');
  };

  toggleBtn.addEventListener('click', async () => {
    try {
      if (audio.paused || audio.muted) {
        audio.muted = false;
        await audio.play();
      } else {
        audio.pause();
        audio.muted = true;
      }
    } catch (error) {
      audio.muted = true;
      console.warn('A reprodução automática foi bloqueada pelo navegador.', error);
    }

    updateToggleButton();
  });

  volumeSlider.addEventListener('input', (event) => {
    const value = Number(event.target.value);
    audio.volume = value;
    if (value > 0) {
      audio.muted = false;
    }
    updateToggleButton();
  });

  audio.addEventListener('play', updateToggleButton);
  audio.addEventListener('pause', updateToggleButton);
  audio.addEventListener('volumechange', updateToggleButton);

  updateToggleButton();
}

const emailToast = document.getElementById('emailToast');

const showEmailToast = (email) => {
  if (!emailToast) return;

  emailToast.textContent = email;
  emailToast.classList.add('visible');

  clearTimeout(showEmailToast.timeoutId);
  showEmailToast.timeoutId = setTimeout(() => {
    emailToast.classList.remove('visible');
  }, 2200);
};

const emailButtons = document.querySelectorAll('.email-btn, .footer-name-btn');
emailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const email = button.dataset.email;
    if (email) {
      showEmailToast(email);
    }
  });
});
