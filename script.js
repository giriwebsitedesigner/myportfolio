/* ===========================
   LOADER
=========================== */
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 600);
  }, 1600);

  initTypewriter();
  initScrollProgress();
  initBackToTop();
  initMobileMenu();
  initReveal();
  initSkillBars();
  initContactForm();
});

/* ===========================
   TYPEWRITER
=========================== */
function initTypewriter() {
  const roles = ['Frontend Developer', 'Web Designer', 'UI/UX Enthusiast'];
  const el = document.getElementById('typewriter');
  if (!el) return;

  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const role = roles[ri];
    if (!deleting) {
      el.textContent = role.slice(0, ci + 1);
      ci++;
      if (ci === role.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 100);
    } else {
      el.textContent = role.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
      setTimeout(tick, deleting ? 50 : 120);
    }
  }
  tick();
}

/* ===========================
   SCROLL PROGRESS
=========================== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = window.scrollY / total;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

/* ===========================
   BACK TO TOP
=========================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===========================
   MOBILE MENU
=========================== */
function initMobileMenu() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  ham.addEventListener('click', () => menu.classList.toggle('open'));
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ===========================
   REVEAL ON SCROLL
=========================== */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ===========================
   SKILL BARS
=========================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.width;
        e.target.style.width = w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(el => obs.observe(el));
}

/* ===========================
   CONTACT FORM — WhatsApp Redirect
=========================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name     = document.getElementById('fname');
    const phone    = document.getElementById('fphone');
    const email    = document.getElementById('femail');
    const service  = document.getElementById('fservice');
    const budget   = document.getElementById('fbudget');
    const subject  = document.getElementById('fsubject');
    const timeline = document.getElementById('ftimeline');
    const message  = document.getElementById('fmessage');

    clearErrors();

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError('fname-err', 'Full name is required (min 2 characters)');
      valid = false;
    }
    if (!phone.value.trim() || phone.value.trim().length < 7) {
      showError('fphone-err', 'Please enter a valid phone number');
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError('femail-err', 'Please enter a valid email address');
      valid = false;
    }
    if (!service.value) {
      showError('fservice-err', 'Please select a service');
      valid = false;
    }
    if (!subject.value.trim() || subject.value.trim().length < 2) {
      showError('fsubject-err', 'Subject is required');
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      showError('fmessage-err', 'Message must be at least 10 characters');
      valid = false;
    }

    if (valid) {
      const waNumber = '919150341905';
      const text = [
        '*New Project Inquiry — Giri Prasath Portfolio*',
        '',
        '*Name:* ' + name.value.trim(),
        '*Phone:* ' + phone.value.trim(),
        '*Email:* ' + email.value.trim(),
        '*Service:* ' + service.value,
        '*Budget:* ' + (budget.value || 'Not specified'),
        '*Subject:* ' + subject.value.trim(),
        '*Timeline:* ' + (timeline.value || 'Flexible'),
        '',
        '*Message:*',
        message.value.trim()
      ].join('\n');

      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);

      const success = document.getElementById('form-success');
      success.classList.remove('hidden');

      setTimeout(() => {
        window.open(waUrl, '_blank');
        form.reset();
        setTimeout(() => success.classList.add('hidden'), 4000);
      }, 600);
    }
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ['fname-err', 'fphone-err', 'femail-err', 'fservice-err', 'fsubject-err', 'fmessage-err'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}
