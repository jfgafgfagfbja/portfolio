/* ============================================================
   ALEX MORGAN PORTFOLIO — JavaScript
   script.js
   ============================================================ */

'use strict';

/* ======================== LOADER ======================== */
(function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loaderBar');
  const pct     = document.getElementById('loaderPct');
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 14 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      pct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        animateHero();
      }, 480);
    } else {
      bar.style.width = progress + '%';
      pct.textContent = Math.floor(progress) + '%';
    }
  }, 60);
})();

function animateHero() {
  document.querySelectorAll('.hero-text, .hero-visual').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 160);
  });
  startTypewriter();
}

/* ======================== CUSTOM CURSOR ======================== */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(hover:none)').matches) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a,button,.filter-btn,.exp-tab,.project-card,.skill-card,.srv-card,.cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovering');  ring.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
  });
})();

/* ======================== SCROLL PROGRESS ======================== */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max  = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ======================== NAVBAR ======================== */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const ham     = document.getElementById('hamburger');
  const menu    = document.getElementById('navMenu');
  const overlay = document.getElementById('navOverlay');
  if (!navbar) return;

  // Scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    toggleBackToTop();
  }, { passive: true });

  // Hamburger toggle
  function openMenu()  { menu.classList.add('open'); ham.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); ham.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; }

  ham.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
})();

/* ======================== ACTIVE NAV ON SCROLL ======================== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const navbar   = document.getElementById('navbar');
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: `-${(navbar?.offsetHeight || 76) + 20}px 0px -50% 0px` });

  sections.forEach(s => observer.observe(s));
})();

/* ======================== TYPEWRITER ======================== */
function startTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const phrases = [
    'software solutions.',
    'backend systems.',
    'web applications.',
    'clean, scalable code.',
    'real-world projects.',
  ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(type, 350);
        return;
      }
    }
    setTimeout(type, deleting ? 48 : 82);
  }
  type();
}

/* ======================== SCROLL REVEAL ======================== */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
})();

/* ======================== STAT COUNTERS ======================== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-val[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start    = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

/* ======================== SKILL BARS ======================== */
(function initSkillBars() {
  const bars = document.querySelectorAll('.sk-fill[data-w]');
  if (!bars.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => obs.observe(b));
})();

/* ======================== PROJECT FILTER ======================== */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        if (show) {
          card.classList.remove('hidden-card');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });
})();

/* ======================== EXPERIENCE TABS ======================== */
(function initTabs() {
  const tabs     = document.querySelectorAll('.exp-tab');
  const contents = document.querySelectorAll('.exp-content');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) {
        target.classList.add('active');
        // Re-trigger reveal animations inside this tab
        target.querySelectorAll('.reveal').forEach(el => {
          el.classList.add('visible');
        });
      }
    });
  });
})();

/* ======================== TESTIMONIAL SLIDER ======================== */
(function initTestimonials() {
  const track = document.getElementById('testiTrack');
  const dots  = document.getElementById('testiDots');
  const prev  = document.getElementById('testiPrev');
  const next  = document.getElementById('testiNext');
  if (!track) return;

  const cards  = track.querySelectorAll('.testi-card');
  const dotEls = dots ? dots.querySelectorAll('.t-dot') : [];
  let current  = 0;
  let autoTimer;

  function getPerPage() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 900)  return 1;
    return 3;
  }

  function go(idx) {
    const perPage    = getPerPage();
    const maxIdx     = Math.max(0, cards.length - perPage);
    current          = Math.max(0, Math.min(idx, maxIdx));
    const cardWidth  = cards[0] ? cards[0].offsetWidth + 24 : 0; // 24 = gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next_() { go(current + 1 >= cards.length - getPerPage() + 1 ? 0 : current + 1); }
  function prev_() { go(current - 1 < 0 ? Math.max(0, cards.length - getPerPage()) : current - 1); }

  prev && prev.addEventListener('click', () => { prev_(); resetAuto(); });
  next && next.addEventListener('click', () => { next_(); resetAuto(); });
  dotEls.forEach((d, i) => d.addEventListener('click', () => { go(i); resetAuto(); }));

  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(next_, 5000); }
  autoTimer = setInterval(next_, 5000);
  window.addEventListener('resize', () => go(current), { passive: true });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next_() : prev_();
    resetAuto();
  }, { passive: true });
})();

/* ======================== CONTACT FORM ======================== */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('cfSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'rgba(239,68,68,0.7)';
        field.style.background  = 'rgba(239,68,68,0.05)';
      } else {
        field.style.borderColor = '';
        field.style.background  = '';
      }
    });

    // Email format check
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      valid = false;
      emailField.style.borderColor = 'rgba(239,68,68,0.7)';
    }

    if (!valid) return;

    // Simulate send
    const submitBtn = form.querySelector('[type="submit"]');
    const origHtml  = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending…</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origHtml;
      form.reset();
      if (success) success.classList.add('show');
      setTimeout(() => success && success.classList.remove('show'), 5000);
    }, 1200);
  });

  // Clear error styling on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.background  = '';
    });
  });
})();

/* ======================== BACK TO TOP ======================== */
function toggleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.classList.toggle('show', window.scrollY > 400);
}

(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
