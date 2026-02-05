// Interaktiver Emoji-Hintergrund für Rectly
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
  }

  createParticles() {
    const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)],
        size: Math.random() * 30 + 20,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.3,
        originalX: 0,
        originalY: 0
      });
    }
    
    // Speichere ursprüngliche Positionen
    this.particles.forEach(p => {
      p.originalX = p.x;
      p.originalY = p.y;
    });
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Gradient Hintergrund
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#1E90FF');
    gradient.addColorStop(1, '#1565C0');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      // Maus-Interaktion
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
      } else {
        // Zurück zur ursprünglichen Position
        particle.x += (particle.originalX - particle.x) * 0.05;
        particle.y += (particle.originalY - particle.y) * 0.05;
      }

      // Normale Bewegung
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;

      // Grenzen
      if (particle.x < -50) particle.x = this.canvas.width + 50;
      if (particle.x > this.canvas.width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = this.canvas.height + 50;
      if (particle.y > this.canvas.height + 50) particle.y = -50;

      // Update original position for boundary wrapping
      if (particle.x < -50 || particle.x > this.canvas.width + 50) {
        particle.originalX = particle.x;
      }
      if (particle.y < -50 || particle.y > this.canvas.height + 50) {
        particle.originalY = particle.y;
      }

      // Zeichne Emoji
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.rotation);
      this.ctx.font = `${particle.size}px Arial`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(particle.emoji, 0, 0);
      this.ctx.restore();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
  new EmojiBackground();
});
