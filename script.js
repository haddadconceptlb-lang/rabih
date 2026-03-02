/**
 * Haddad Concept - Landing Page Interactions
 * Smooth animations, scroll effects, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initLightbox();
  initScrollTop();
  initSmoothScroll();
  initParallax();
  initPortfolioCarousel();
  initScrollProgress();
});

/**
 * Sticky header - add scrolled class on scroll
 */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('.mobile-menu__link, .btn--mobile');

  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));

  // Also observe sections for divider animation
  const sections = document.querySelectorAll('section.animate-on-scroll');
  sections.forEach(el => observer.observe(el));
}

/**
 * Portfolio lightbox
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const portfolioItems = document.querySelectorAll('[data-lightbox]');

  if (!lightbox || !lightboxImg) return;

  portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = item.getAttribute('href');
      const imgAlt = item.querySelector('img')?.alt || 'Project image';
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/**
 * Scroll to top button
 */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  const handleScroll = () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * Mobile portfolio carousel - auto-scroll one at a time
 */
function initPortfolioCarousel() {
  const carousel = document.getElementById('portfolio-carousel');
  if (!carousel) return;

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  let autoScrollInterval;

  const scrollToNext = () => {
    if (!isMobile()) return;

    const itemWidth = carousel.clientWidth;
    const gap = 16; // var(--space-md)
    const scrollAmount = itemWidth + gap;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    if (carousel.scrollLeft >= maxScroll - 10) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const startAutoScroll = () => {
    if (!isMobile()) return;
    autoScrollInterval = setInterval(scrollToNext, 4000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAutoScroll();
    } else if (isMobile()) {
      startAutoScroll();
    }
  };

  const handleResize = () => {
    stopAutoScroll();
    if (isMobile()) {
      startAutoScroll();
    }
  };

  if (isMobile()) {
    startAutoScroll();
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('resize', handleResize);

  // Pause on user interaction (touch/scroll)
  carousel.addEventListener('touchstart', stopAutoScroll);
  carousel.addEventListener('touchend', () => {
    if (isMobile()) setTimeout(startAutoScroll, 5000);
  });
}

/**
 * Parallax - disabled when hero has Ken Burns animation
 */
function initParallax() {
  // Hero uses CSS Ken Burns animation for dynamic feel
}

/**
 * Scroll progress bar
 */
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = `${percent}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
