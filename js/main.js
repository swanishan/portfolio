(function () {
  'use strict';

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .bento');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // Active nav link
  const path = window.location.pathname;
  const current = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const target = href.split('/').pop();
    if (target === current || (current === '' && target === 'index.html')) {
      a.classList.add('active');
    }
  });
  /* ---------- IMAGE MODAL ---------- */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  // Wire up all modal triggers and close handlers
  document.addEventListener('DOMContentLoaded', () => {
    // Open buttons
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
    });

    // Close buttons (X or Close text)
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
    });

    // Click backdrop to close (but not the modal card itself)
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
      });
    });

    // ESC key to close any open modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => closeModal(m.id));
      }
    });
  });
})();
