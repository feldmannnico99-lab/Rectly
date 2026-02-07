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

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Schließe alle anderen offenen Items
      item.closest('.faq-list').querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle aktuelles Item
      item.classList.toggle('open', !isOpen);
      button.setAttribute('aria-expanded', !isOpen);
    });
  });
});
