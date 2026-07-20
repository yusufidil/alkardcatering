// Alkard Catering — Kurumsal Web Sitesi Etkileşim Kodu

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. HEADER SCROLL EFFECT ─────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── 2. MOBILE NAVIGATION ────────────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav    = document.getElementById('mobileNav');

  mobileToggle?.addEventListener('click', () => {
    const open = mobileNav.style.display === 'flex';
    mobileNav.style.display = open ? 'none' : 'flex';
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileNav.style.display = 'none'; });
  });

  // ── 3. GALLERY FILTER ───────────────────────────────────
  const galFilters = document.querySelectorAll('.gal-filter');
  const galItems   = document.querySelectorAll('.g-item');

  galFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      galFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });

  // ── 5. LIGHTBOX ─────────────────────────────────────────
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose   = document.getElementById('lbClose');

  galItems.forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src         = item.dataset.src || item.querySelector('img')?.src || '';
      lbImg.alt         = item.dataset.caption || '';
      lbCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('active');
    });
  });

  lbClose?.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });

  // ── 6. FAQ ACCORDION ────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-trigger')?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ── 7. EXTERIOR PHOTO SLIDER (ŞİRKET DIŞ MEKAN SLİDER'I) ──
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let sliderTimer = null;

  function showSlide(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function startAutoSlide() {
    stopAutoSlide();
    sliderTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4000); // 4 saniyede bir otomatik geçiş
  }

  function stopAutoSlide() {
    if (sliderTimer) clearInterval(sliderTimer);
  }

  prevBtn?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startAutoSlide();
  });

  nextBtn?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    startAutoSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      showSlide(idx);
      startAutoSlide();
    });
  });

  // Start slider
  startAutoSlide();

});
