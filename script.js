/* ══════════════════════════════════════════════
   CANVA CLONE — script.js  (complete final)
══════════════════════════════════════════════ */

/* ──────────────────────────────────────
   1. MEGA MENU — hover open / close
──────────────────────────────────────── */
const navItems = document.querySelectorAll('.nav-item');
const navInner = document.querySelector('.nav-inner');

function closeAllMenus() {
  navItems.forEach(i => {
    i.classList.remove('open');
    const m = i.querySelector('.mega-dropdown');
    if (m) m.classList.remove('open');
  });
}

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    closeAllMenus();
    item.classList.add('open');
    const menuId = item.getAttribute('data-menu');
    const target = document.getElementById('menu-' + menuId);
    if (target) target.classList.add('open');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('open');
    const menuId = item.getAttribute('data-menu');
    const target = document.getElementById('menu-' + menuId);
    if (target) target.classList.remove('open');
  });
});

if (navInner) {
  navInner.addEventListener('mouseleave', closeAllMenus);
}

document.addEventListener('click', e => {
  if (!e.target.closest('.nav-item')) closeAllMenus();
});


/* ──────────────────────────────────────
   2. HERO VIDEO — play/pause & mute
──────────────────────────────────────── */
const heroVideo   = document.getElementById('heroVideo');
const playIcon    = document.getElementById('playIcon');
const pauseIcon   = document.getElementById('pauseIcon');
const mutedIcon   = document.getElementById('mutedIcon');
const volumeIcon  = document.getElementById('volumeIcon');

function togglePlay() {
  if (!heroVideo) return;
  if (heroVideo.paused) {
    heroVideo.play();
    if (playIcon)  playIcon.style.display  = 'none';
    if (pauseIcon) pauseIcon.style.display = 'block';
  } else {
    heroVideo.pause();
    if (playIcon)  playIcon.style.display  = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
  }
}

function toggleMute() {
  if (!heroVideo) return;
  heroVideo.muted = !heroVideo.muted;
  if (heroVideo.muted) {
    if (mutedIcon)  mutedIcon.style.display  = 'block';
    if (volumeIcon) volumeIcon.style.display = 'none';
  } else {
    if (mutedIcon)  mutedIcon.style.display  = 'none';
    if (volumeIcon) volumeIcon.style.display = 'block';
  }
}


/* ──────────────────────────────────────
   3. TAB BAR — active state switching
──────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});


/* ──────────────────────────────────────
   4. TEMPLATES ROW — scroll on arrow btn
──────────────────────────────────────── */
(function () {

  const row1    = document.getElementById('tmplRow1');
  const row2    = document.getElementById('tmplRow2');
  const btnNext = document.getElementById('tmplNext');
  const btnPrev = document.getElementById('tmplPrev');

  if (!row1 || !row2 || !btnNext || !btnPrev) return;

  const SCROLL_AMOUNT = 760;

  function scrollRows(direction) {
    const delta = direction === 'next' ? SCROLL_AMOUNT : -SCROLL_AMOUNT;
    row1.scrollBy({ left: delta, behavior: 'smooth' });
    row2.scrollBy({ left: delta, behavior: 'smooth' });
  }

  btnNext.addEventListener('click', () => scrollRows('next'));
  btnPrev.addEventListener('click', () => scrollRows('prev'));

  function updateArrows() {
    const scrollLeft = row1.scrollLeft;
    const maxScroll  = row1.scrollWidth - row1.clientWidth;
    if (scrollLeft > 10) btnPrev.classList.add('visible');
    else btnPrev.classList.remove('visible');
    if (scrollLeft >= maxScroll - 10) btnNext.classList.add('hidden');
    else btnNext.classList.remove('hidden');
  }

  row1.addEventListener('scroll', updateArrows, { passive: true });

  let isSyncingRow1 = false;
  let isSyncingRow2 = false;

  row1.addEventListener('scroll', () => {
    if (isSyncingRow1) return;
    isSyncingRow2 = true;
    row2.scrollLeft = row1.scrollLeft;
    setTimeout(() => { isSyncingRow2 = false; }, 50);
  }, { passive: true });

  row2.addEventListener('scroll', () => {
    if (isSyncingRow2) return;
    isSyncingRow1 = true;
    row1.scrollLeft = row2.scrollLeft;
    setTimeout(() => { isSyncingRow1 = false; }, 50);
    updateArrows();
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    const section = document.querySelector('.templates-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowRight') scrollRows('next');
    if (e.key === 'ArrowLeft')  scrollRows('prev');
  });

  document.querySelectorAll('.tmpl-video-card').forEach(card => {
    const video = card.querySelector('.tmpl-video');
    if (!video) return;
    card.addEventListener('mouseenter', () => { video.muted = false; video.volume = 0.15; });
    card.addEventListener('mouseleave', () => { video.muted = true; });
  });

  document.querySelectorAll('.tmpl-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.zIndex = '5'; });
    card.addEventListener('mouseleave', () => { card.style.zIndex = ''; });
  });

  updateArrows();

})();


/* ──────────────────────────────────────
   5. NAVBAR — shrink on scroll
──────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,0.10)' : 'none';
});


/* ──────────────────────────────────────
   6. STYLE CHIPS — active selection
──────────────────────────────────────── */
document.querySelectorAll('.style-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.style-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});


/* ──────────────────────────────────────
   7. BUSINESS CAROUSEL
──────────────────────────────────────── */
function scrollBizCarousel() {
  const carousel = document.getElementById('bizCarousel');
  if (carousel) carousel.scrollBy({ left: 340, behavior: 'smooth' });
}


/* ──────────────────────────────────────
   8. PROMPT CREATE BUTTON
──────────────────────────────────────── */
const createBtn = document.querySelector('.prompt-create-btn');

if (createBtn) {
  createBtn.addEventListener('click', () => {
    const original = createBtn.innerHTML;
    createBtn.innerHTML = '✓ Generating...';
    createBtn.style.background = '#16a34a';
    setTimeout(() => {
      createBtn.innerHTML = original;
      createBtn.style.background = '';
    }, 2000);
  });
}


/* ──────────────────────────────────────
   9. CARD ACTION BUTTONS — ripple
──────────────────────────────────────── */
document.querySelectorAll('.card-action-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      background: rgba(0,0,0,0.08);
      width: 100px; height: 100px;
      top: ${e.offsetY - 50}px; left: ${e.offsetX - 50}px;
      transform: scale(0);
      animation: rippleAnim 0.5s ease-out forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

if (!document.getElementById('ripple-style')) {
  const style = document.createElement('style');
  style.id = 'ripple-style';
  style.textContent = `@keyframes rippleAnim { to { transform: scale(3); opacity: 0; } }`;
  document.head.appendChild(style);
}