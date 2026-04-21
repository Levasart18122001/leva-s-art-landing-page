// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileMenu);

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when tapping outside
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Close menu on resize to prevent locked scrolling if screen is enlarged
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ===== HERO BG PARALLAX & LOAD =====
const heroBg = document.getElementById('hero-bg');
const heroContent = document.getElementById('hero-content');
window.addEventListener('load', () => {
  heroBg.classList.add('loaded');
  setTimeout(() => heroContent.classList.add('visible'), 200);
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  // Use background-position to avoid conflicting with the 8s transform transition
  if (heroBg) heroBg.style.backgroundPosition = `center calc(50% + ${scrolled * 0.15}px)`;
});

// ===== FLOATING PARTICLES (reduced on mobile for performance) =====
const container = document.getElementById('particles-container');
const isMobile = window.innerWidth <= 768;
const PARTICLE_COUNT = isMobile ? 10 : 25;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${Math.random() * 12 + 8}s;
    animation-delay: ${Math.random() * 8}s;
    opacity: 0;
  `;
  container.appendChild(p);
}

// ===== INTERSECTION OBSERVER (scroll reveals) =====
const observerOpts = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll(
  '.about-text, .about-visual, .product-card, .feature-card, .newsletter-inner'
).forEach(el => revealObserver.observe(el));

// ===== NEWSLETTER FORM =====
const form = document.getElementById('newsletter-form');
const successMsg = document.getElementById('newsletter-success');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value.trim();
  if (!email || !email.includes('@')) return;
  form.style.display = 'none';
  successMsg.classList.add('show');
});

// ===== CART BUTTONS (demo feedback) =====
function cartFeedback(btn, originalText) {
  btn.textContent = '✓ Added!';
  btn.style.borderColor = 'var(--accent)';
  btn.style.color = 'var(--accent-light)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.borderColor = '';
    btn.style.color = '';
  }, 2000);
}

document.querySelectorAll('.btn-cart').forEach(btn => {
  const originalText = btn.textContent;
  btn.addEventListener('click', () => cartFeedback(btn, originalText));
});
document.querySelectorAll('.product-quick-btn').forEach(btn => {
  const originalText = btn.textContent;
  btn.addEventListener('click', () => cartFeedback(btn, originalText));
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
