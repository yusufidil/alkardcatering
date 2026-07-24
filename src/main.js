// Alkard Catering — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. MOBILE MENU TOGGLE ────────────────────────────────
  const toggle = document.getElementById('mobileToggle');
  const menu   = document.getElementById('mobileMenu');
  toggle?.addEventListener('click', () => menu?.classList.toggle('open'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // ── 2. HOME GALLERY CAROUSEL ─────────────────────────────
  const gSlides = document.querySelectorAll('.g-slide-item');
  const gPrev   = document.getElementById('gPrev');
  const gNext   = document.getElementById('gNext');
  let gIndex = 0;

  function showGSlide(idx) {
    if (!gSlides.length) return;
    gSlides[gIndex].classList.remove('active');
    gIndex = (idx + gSlides.length) % gSlides.length;
    gSlides[gIndex].classList.add('active');
  }

  gPrev?.addEventListener('click', () => showGSlide(gIndex - 1));
  gNext?.addEventListener('click', () => showGSlide(gIndex + 1));

  if (gSlides.length > 1) {
    setInterval(() => showGSlide(gIndex + 1), 4500);
  }

  // ── 3. FACILITY SLIDER (KONUM & TESİSİMİZ SLİDER) ────────
  const fSlides = document.querySelectorAll('.facility-slide');
  const fDots   = document.querySelectorAll('.fdot');
  const fPrev   = document.getElementById('fPrev');
  const fNext   = document.getElementById('fNext');
  let fIndex = 0;

  function showFSlide(idx) {
    if (!fSlides.length) return;
    fSlides[fIndex].classList.remove('active');
    fDots[fIndex]?.classList.remove('active');

    fIndex = (idx + fSlides.length) % fSlides.length;

    fSlides[fIndex].classList.add('active');
    fDots[fIndex]?.classList.add('active');
  }

  fPrev?.addEventListener('click', () => showFSlide(fIndex - 1));
  fNext?.addEventListener('click', () => showFSlide(fIndex + 1));
  fDots.forEach((dot, idx) => dot.addEventListener('click', () => showFSlide(idx)));

  if (fSlides.length > 1) {
    setInterval(() => showFSlide(fIndex + 1), 4000);
  }

  // ── 4. FORM SUBMIT ───────────────────────────────────────
  const handleFormSubmit = (formId, adId, telId, hizmetId, mesajId) => {
    const form = document.getElementById(formId);
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const ad     = document.getElementById(adId)?.value.trim() || '';
      const tel    = document.getElementById(telId)?.value.trim() || '';
      const hizmet = document.getElementById(hizmetId)?.value || '';
      const mesaj  = document.getElementById(mesajId)?.value.trim() || '';
      if (!ad || !tel) {
        alert('Lütfen Ad/Firma ve Telefon bilgilerini doldurunuz.');
        return;
      }
      const text = encodeURIComponent(`Merhaba Alkard Yemek, teklif almak istiyorum.\n\nAd/Firma: ${ad}\nTelefon: ${tel}\nHizmet: ${hizmet}\nMesaj: ${mesaj}`);
      window.open(`https://wa.me/905320000000?text=${text}`, '_blank');
    });
  };

  handleFormSubmit('teklifForm', 'ad', 'tel', 'hizmet', 'mesaj');
  handleFormSubmit('teklifFormPage', 'adPage', 'telPage', 'hizmetPage', 'mesajPage');

  // ── 5. GALLERY FILTERING & LIGHTBOX MODAL ────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.g-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src') || item.querySelector('img')?.src;
      if (src && lightbox && lbImg) {
        lbImg.src = src;
        lightbox.classList.add('active');
      }
    });
  });

  lbClose?.addEventListener('click', () => lightbox?.classList.remove('active'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox?.classList.remove('active');
  });

});
