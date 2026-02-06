// Interaktiver Emoji-Hintergrund für Rectly - Sanftes Schweben von unten nach oben
class EmojiBackground {
  constructor() {
    this.canvas = document.getElementById('emoji-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Meeting/Audio/Transkriptions-Emojis
    this.emojis = ['🎙️', '📝', '🗣️', '💬', '📊', '⏺️', '🎧', '📱', '✨', '🔊', '📋', '🎵', '💡', '📄', '✅'];
    
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseMoving = false;

    // Offscreen-Canvas für gecachten Gradient
    this.bgCanvas = document.createElement('canvas');
    this.bgCtx = this.bgCanvas.getContext('2d');

    this.init();
    this.animate();
    this.setupEventListeners();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cacheGradient();
  }

  cacheGradient() {
    this.bgCanvas.width = this.canvas.width;
    this.bgCanvas.height = this.canvas.height;
    const gradient = this.bgCtx.createLinearGradient(0, 0, this.bgCanvas.width, this.bgCanvas.height);
    gradient.addColorStop(0, '#2B3A47');
    gradient.addColorStop(1, '#1F2937');
    this.bgCtx.fillStyle = gradient;
    this.bgCtx.fillRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
  }

  createParticles() {
    const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)],
        size: Math.random() * 30 + 20,
        // Sanfte vertikale Geschwindigkeit (von unten nach oben)
        speedY: -(Math.random() * 0.3 + 0.2), // Negative Werte = nach oben
        // Minimale horizontale Drift
        speedX: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.createParticles();
    });

    let mouseMoveTimeout;
    
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMouseMoving = true;
      
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 100);
    });

    // Touch-Unterstützung
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
        this.isMouseMoving = true;
        
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
          this.isMouseMoving = false;
        }, 100);
      }
    });
  }

  animate() {
    // Gecachten Gradient als Hintergrund zeichnen (statt jeden Frame neu zu berechnen)
    this.ctx.drawImage(this.bgCanvas, 0, 0);

    this.particles.forEach(particle => {
      // Maus-Interaktion (weichen aus)
      if (this.isMouseMoving) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * force * 3;
          particle.y -= Math.sin(angle) * force * 3;
        }
      }

      // Sanfte Bewegung: nach oben schweben + minimale horizontale Drift
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wenn Partikel oben aus dem Bild verschwindet, respawne unten
      if (particle.y < -50) {
        particle.y = this.canvas.height + 50;
        particle.x = Math.random() * this.canvas.width;
      }

      // Horizontale Grenzen (wrap around)
      if (particle.x < -50) particle.x = this.canvas.width + 50;
      if (particle.x > this.canvas.width + 50) particle.x = -50;

      // Zeichne Emoji (KEINE ROTATION - kein Zittern!)
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.font = `${particle.size}px Arial`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(particle.emoji, particle.x, particle.y);
      this.ctx.restore();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
  new EmojiBackground();
});
