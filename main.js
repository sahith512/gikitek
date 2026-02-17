import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// 1. SMOOTH SCROLL WITH LENIS
// ----------------------------------------------------
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ----------------------------------------------------
// 2. REVEAL ANIMATIONS (Luxoft Spec)
// ----------------------------------------------------
const initAnimations = () => {
  // 1. Generic Scroll Reveal (Fade Up)
  const revealItems = document.querySelectorAll('.hero-text-content > *, .section-header, .stat-item, .service-card, .industry-card, .timeline-node, .principle-item, .pillar-card, .product-content, .product-visual, .timeline-container > div, .solution-card-direct');

  revealItems.forEach(item => {
    gsap.set(item, {
      opacity: 0,
      y: 40
    });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  });

  // 2. Stats Counter Animation
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseFloat(stat.innerText.replace(/[^0-9.]/g, ''));
    const suffix = stat.innerText.replace(/[0-9.]/g, '');
    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (target % 1 === 0) {
              stat.innerText = Math.floor(obj.value) + suffix;
            } else {
              stat.innerText = obj.value.toFixed(1) + suffix;
            }
          }
        });
      }
    });
  });

  // 3. Engineering Timeline Line Growth
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    gsap.set(timelineLine, { scaleX: 0, transformOrigin: 'left' });
    gsap.to(timelineLine, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%',
        once: true
      }
    });
  }
};

window.addEventListener('DOMContentLoaded', initAnimations);

// ----------------------------------------------------
// 3. ACCORDIONS
// ----------------------------------------------------
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  const body = item.querySelector('.accordion-body');
  const icon = item.querySelector('.acc-icon');

  if (header && body) {
    let isOpen = false;
    header.addEventListener('click', () => {
      isOpen = !isOpen;
      item.classList.toggle('active', isOpen);

      gsap.to(body, {
        height: isOpen ? 'auto' : 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });

      if (icon) {
        gsap.to(icon, {
          rotation: isOpen ? 45 : 0,
          duration: 0.3
        });
      }
    });
  }
});

// ----------------------------------------------------
// 4. NAVBAR STYLES
// ----------------------------------------------------
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ----------------------------------------------------
// 5. TYPEWRITER EFFECT
// ----------------------------------------------------
const initTypewriter = () => {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = ['ERP Solutions', 'AI Governance', 'Cloud Engineering'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 150;

  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      speed = 100;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      speed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      speed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(type, speed);
  };

  type();
};

window.addEventListener('DOMContentLoaded', initTypewriter);

// ----------------------------------------------------
// 6. MOBILE MENU & BACK TO TOP
// ----------------------------------------------------
const initNavigation = () => {
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.getElementById('backToTop');

  // Mobile Toggle
  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileNavToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Back to Top Visibility
  // Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Back to Top Click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Chat Widget Action
  const chatWidget = document.getElementById('chatWidget');
  if (chatWidget) {
    chatWidget.addEventListener('click', () => {
      window.open('https://wa.me/916307983231', '_blank');
    });
  }
};

window.addEventListener('DOMContentLoaded', initNavigation);

console.log('gikitek - Enterprise Platform Ready');
