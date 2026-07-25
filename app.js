/**
 * 川魚堂 藥膳火鍋 官網互動邏輯 (app.js)
 * Features: Dual-theme toggle, Dynamic random carousels, Mobile drawer, Scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --------------------------------------------------------------------------
     1. Mobile Menu Toggler
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-item');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Theme Switcher (風格切換)
     -------------------------------------------------------------------------- */
  const themeSwitcherBtn = document.getElementById('theme-switcher');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  const body = document.body;

  // Check saved theme or default to dark (深夜食堂)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  if (themeSwitcherBtn) {
    themeSwitcherBtn.addEventListener('click', () => {
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-leaf theme-icon'; // Leaf icon for herbal theme
      }
      if (themeLabel) {
        themeLabel.textContent = '溫潤草本版';
      }
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon theme-icon'; // Moon icon for late-night theme
      }
      if (themeLabel) {
        themeLabel.textContent = '深夜食堂版';
      }
      localStorage.setItem('theme', 'dark');
    }
  }

  /* --------------------------------------------------------------------------
     3. Auto-Slideshow with Random Start (首頁大圖輪播)
     -------------------------------------------------------------------------- */
  const heroSlides = document.querySelectorAll('#hero-carousel .carousel-slide');
  const heroDots = document.querySelectorAll('#hero-carousel .dot');
  
  if (heroSlides.length > 0) {
    // Choose a random starting slide index
    let currentHeroIndex = Math.floor(Math.random() * heroSlides.length);
    let slideInterval;

    // Show initial random slide
    showHeroSlide(currentHeroIndex);
    startHeroAutoplay();

    function showHeroSlide(index) {
      heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentHeroIndex = index;
    }

    function nextHeroSlide() {
      if (heroSlides.length <= 1) return;
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * heroSlides.length);
      } while (nextIndex === currentHeroIndex);
      showHeroSlide(nextIndex);
    }

    function startHeroAutoplay() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextHeroSlide, 5000); // Change image every 5 seconds
    }

    // Indicators click event
    heroDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-index'));
        showHeroSlide(targetIndex);
        startHeroAutoplay(); // Reset timer on manual click
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Mascot Carousel (酒酒專區輪播 + 手勢與控制鈕)
     -------------------------------------------------------------------------- */
  const mascotSlides = document.querySelectorAll('#mascot-carousel .mascot-slide');
  const btnPrev = document.getElementById('mascot-prev');
  const btnNext = document.getElementById('mascot-next');
  const mascotCarouselWrap = document.querySelector('.mascot-carousel-wrapper');
  
  if (mascotSlides.length > 0) {
    // Choose a random starting index for mascot gallery
    let currentMascotIndex = Math.floor(Math.random() * mascotSlides.length);
    
    showMascotSlide(currentMascotIndex);

    function showMascotSlide(index) {
      mascotSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      currentMascotIndex = index;
    }

    function nextMascot() {
      let nextIndex = (currentMascotIndex + 1) % mascotSlides.length;
      showMascotSlide(nextIndex);
    }

    function prevMascot() {
      let prevIndex = (currentMascotIndex - 1 + mascotSlides.length) % mascotSlides.length;
      showMascotSlide(prevIndex);
    }

    if (btnNext) btnNext.addEventListener('click', nextMascot);
    if (btnPrev) btnPrev.addEventListener('click', prevMascot);

    // Auto rotate mascot photos every 6 seconds
    let mascotInterval = setInterval(nextMascot, 6000);

    // Pause autoplay on mouse hover (desktop)
    if (mascotCarouselWrap) {
      mascotCarouselWrap.addEventListener('mouseenter', () => clearInterval(mascotInterval));
      mascotCarouselWrap.addEventListener('mouseleave', () => {
        clearInterval(mascotInterval);
        mascotInterval = setInterval(nextMascot, 6000);
      });

      // Swipe support for Mobile (Touch Events)
      let touchStartX = 0;
      let touchEndX = 0;
      
      mascotCarouselWrap.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(mascotInterval); // stop timer on touch
      }, { passive: true });

      mascotCarouselWrap.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        mascotInterval = setInterval(nextMascot, 6000); // restart timer
      }, { passive: true });

      function handleSwipe() {
        const threshold = 50; // minimum distance in pixels
        if (touchStartX - touchEndX > threshold) {
          nextMascot(); // swiped left -> next
        } else if (touchEndX - touchStartX > threshold) {
          prevMascot(); // swiped right -> prev
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. Scroll Reveal (滾動淡入顯現效果)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      root: null,
      threshold: 0.15, // trigger when 15% of element is visible
      rootMargin: '0px 0px -50px 0px' // adjust activation point slightly above screen bottom
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* --------------------------------------------------------------------------
     6. Floating FAB Button Visibility (點餐按鈕滾動顯現)
     -------------------------------------------------------------------------- */
  const mobileFab = document.getElementById('mobile-order-fab');
  const heroSection = document.getElementById('home');

  if (mobileFab && heroSection) {
    window.addEventListener('scroll', () => {
      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      
      // Only show the floating FAB on mobile after scroll past hero top area
      if (scrollPosition > 200) {
        mobileFab.style.opacity = '1';
        mobileFab.style.pointerEvents = 'auto';
        mobileFab.style.transform = 'translateY(0) scale(1)';
      } else {
        mobileFab.style.opacity = '0';
        mobileFab.style.pointerEvents = 'none';
        mobileFab.style.transform = 'translateY(20px) scale(0.9)';
      }
    });
    
    // Initial style overrides
    mobileFab.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    mobileFab.style.opacity = '0';
    mobileFab.style.pointerEvents = 'none';
    mobileFab.style.transform = 'translateY(20px) scale(0.9)';
  }
});
