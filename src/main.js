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

  // ── 3. DAILY MENU TABS ─────────────────────────────────
  const menus = {
    pazartesi: { title: 'Pazartesi', kcal: '820 Kcal', courses: [
      { lbl: '1. Kap — Çorba',    dish: 'Ezogelin Çorbası' },
      { lbl: '2. Kap — Ana Yemek', dish: 'İnegöl Köfte & Izgara Domates' },
      { lbl: '3. Kap — Yardımcı', dish: 'Tereyağlı Şehriyeli Pirinç Pilavı' },
      { lbl: '4. Kap — Tatlı / Salata', dish: 'Mevsim Salatası veya Cacık' }
    ]},
    sali: { title: 'Salı', kcal: '850 Kcal', courses: [
      { lbl: '1. Kap — Çorba',    dish: 'Süzme Mercimek Çorbası' },
      { lbl: '2. Kap — Ana Yemek', dish: 'Fırında Sebzeli Tavuk Pirzola' },
      { lbl: '3. Kap — Yardımcı', dish: 'Nohutlu Bulgur Pilavı' },
      { lbl: '4. Kap — Tatlı / Salata', dish: 'Geleneksel Fırın Sütlaç' }
    ]},
    carsamba: { title: 'Çarşamba', kcal: '810 Kcal', courses: [
      { lbl: '1. Kap — Çorba',    dish: 'Süzme Tarhana Çorbası' },
      { lbl: '2. Kap — Ana Yemek', dish: 'Dana Tas Kebabı & Patates Püresi' },
      { lbl: '3. Kap — Yardımcı', dish: 'Fesleğenli Napoliten Makarna' },
      { lbl: '4. Kap — Tatlı / Salata', dish: 'Akdeniz Yeşillikleri Salatası' }
    ]},
    persembe: { title: 'Perşembe', kcal: '880 Kcal', courses: [
      { lbl: '1. Kap — Çorba',    dish: 'Nane Yağlı Yayla Çorbası' },
      { lbl: '2. Kap — Ana Yemek', dish: 'Etli Kuru Fasulye (Geleneksel)' },
      { lbl: '3. Kap — Yardımcı', dish: 'Tereyağlı Pirinç Pilavı' },
      { lbl: '4. Kap — Tatlı / Salata', dish: 'Turşu & Ev Yapımı Cacık' }
    ]},
    cuma: { title: 'Cuma', kcal: '910 Kcal', courses: [
      { lbl: '1. Kap — Çorba',    dish: 'Közlenmiş Domates Çorbası' },
      { lbl: '2. Kap — Ana Yemek', dish: 'Fırında Etli Orman Kebabı' },
      { lbl: '3. Kap — Yardımcı', dish: 'Peynirli Su Böreği' },
      { lbl: '4. Kap — Tatlı / Salata', dish: 'Cevizli Baklava veya Mevsim Meyvesi' }
    ]}
  };

  const menuCoursesEl = document.getElementById('menuCourses');
  const menuKcalEl    = document.getElementById('menuKcal');
  const menuTabBtns   = document.querySelectorAll('.menu-tab-btn');

  function renderMenu(key) {
    const data = menus[key] || menus.pazartesi;
    menuCoursesEl.innerHTML = data.courses.map(c => `
      <div class="course-col">
        <span class="course-type-lbl">${c.lbl}</span>
        <div class="course-dish">${c.dish}</div>
      </div>
    `).join('');
    menuKcalEl.textContent = `Ortalama enerji: ${data.kcal}`;
  }

  renderMenu('pazartesi');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.day);
    });
  });

  // ── 4. GALLERY FILTER ───────────────────────────────────
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
