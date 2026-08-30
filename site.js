(function () {
  var body = document.body;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SFX manager — short UI blips, off by default, toggled via .sound-toggle */
  var SFX_KEY = 'amapola-sound';
  var soundOn = false;
  try { soundOn = localStorage.getItem(SFX_KEY) === '1'; } catch (e) {}
  var sfxFiles = { hover: '/assets/audio/hover.wav', click: '/assets/audio/click.wav', send: '/assets/audio/send.wav', boot: '/assets/audio/boot.wav' };
  var sfxCache = {};
  function playSfx(name) {
    if (!soundOn) return;
    try {
      var base = sfxCache[name] || (sfxCache[name] = new Audio(sfxFiles[name]));
      var el = base.cloneNode(true);
      el.volume = 0.5;
      el.play().catch(function () {});
    } catch (e) {}
  }
  function setSoundState(on) {
    soundOn = on;
    try { localStorage.setItem(SFX_KEY, on ? '1' : '0'); } catch (e) {}
    document.querySelectorAll('.sound-toggle').forEach(function (b) {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  setSoundState(soundOn);

  /* ── Splash gate ─────────────────────────────────────────────────── */
  var enterBtn = document.getElementById('enterBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      body.setAttribute('data-splash', 'off');
      playSfx('boot');
    });
  }

  /* ── Sound toggle ─────────────────────────────────────────────────── */
  document.querySelectorAll('.sound-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setSoundState(btn.getAttribute('aria-pressed') !== 'true');
    });
  });

  /* ── Hover / click SFX on interactive elements ───────────────────── */
  document.querySelectorAll('.card, .gallery-tile, .platform-link, .stub, .card-links a, .topnav a').forEach(function (el) {
    el.addEventListener('mouseenter', function () { playSfx('hover'); });
  });
  document.querySelectorAll('.enter-btn, .platform-link, .card-links a, .stub, .soon-cta a').forEach(function (el) {
    el.addEventListener('click', function () { playSfx('click'); });
  });

  /* ── Newsletter form ─────────────────────────────────────────────── */
  var form = document.getElementById('newsForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = 'TRANSMISIÓN RECIBIDA.';
      status.setAttribute('data-ok', '1');
      playSfx('send');
      form.reset();
    });
  }

  /* ── Scroll reveal ────────────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.js-reveal');
  if (reveals.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el, i) {
        el.style.setProperty('--reveal-i', i % 6);
        io.observe(el);
      });
    }
  }

  /* ── Cursor-follow glow on tiles/cards ───────────────────────────── */
  if (!reducedMotion && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card, .gallery-tile, .platform-link, .stub').forEach(function (el) {
      var target = el.classList.contains('gallery-tile') ? el.querySelector('.gallery-tile-frame') : el;
      if (!target) return;
      el.addEventListener('mousemove', function (e) {
        var r = target.getBoundingClientRect();
        target.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        target.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
})();
