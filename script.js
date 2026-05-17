/* ===========================
   NAVBAR SCROLL
   =========================== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ===========================
   HAMBURGER MENU
   =========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ===========================
   TYPED TEXT EFFECT
   =========================== */
const phrases = [
  'Full-Stack Developer',
  'AI Enthusiast',
  'React & Node.js Dev',
  'Problem Solver',
  'Open to Opportunities',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typingSpeed = 1600;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 300;
  }

  setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 800);

/* ===========================
   SCROLL REVEAL
   =========================== */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (!entry.target.classList.contains('lang-bar')) {
          observer.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

/* ===========================
   LANGUAGE BAR ANIMATION
   =========================== */
const langBars = document.querySelectorAll('.lang-bar');

const langObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        langObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

langBars.forEach(bar => langObserver.observe(bar));

/* ===========================
   CONTACT FORM (Formspree)
   =========================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = '[ Please fill in all fields ]';
    formStatus.style.color = '#ff5874';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = '[ Invalid email address ]';
    formStatus.style.color = '#ff5874';
    return;
  }

  const submitBtn = contactForm.querySelector('.form-submit');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  formStatus.textContent = '';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formStatus.textContent = '[ Message sent! I\'ll get back to you soon. ]';
      formStatus.style.color = 'var(--accent)';
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formStatus.textContent = '[ Oops! Something went wrong. Please try again. ]';
    formStatus.style.color = '#ff5874';
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

/* ===========================
   SMOOTH SCROLL FOR ANCHORS
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ===========================
   GLOW CURSOR TRAIL (subtle)
   =========================== */
let mouseX = 0, mouseY = 0;
const glowCursor = document.createElement('div');
glowCursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  pointer-events: none;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(glowCursor);

document.addEventListener('mousemove', (e) => {
  glowCursor.style.left = e.clientX + 'px';
  glowCursor.style.top = e.clientY + 'px';
});

/* ===========================
   INIT
   =========================== */
updateActiveNav();
