// Haupt-JavaScript für Rectly Website

document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling für Anchor-Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navigation Scroll-Effekt
  let lastScroll = 0;
  const nav = document.querySelector('nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
      }

      lastScroll = currentScroll;
    });
  }

  // Feature Cards
  const isTouchDevice = !window.matchMedia('(hover: hover)').matches;

  document.querySelectorAll('.feature-cards').forEach(container => {
    if (isTouchDevice) {
      // Mobile: beim Scrollen aufklappen
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-open', entry.isIntersecting);
        });
      }, { threshold: 0.5 });
      cardObserver.observe(container);
    }

    // Desktop + Mobile: per Klick togglen
    container.addEventListener('click', () => {
      container.classList.toggle('is-open');
    });
  });
});
