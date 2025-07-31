// Loading Screen
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 3000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 255, 0.3)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll(
    '.area-item, .info-card, .benefit-item, .social-btn'
  );
  animatedElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function () {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      typeWriter(heroTitle, 'انضمي إلينا', 150);
    }, 1000);
  }
});

// Particle system
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Create particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Hover effects for interactive elements
function addHoverEffects() {
  const interactiveElements = document.querySelectorAll(
    '.area-item, .info-card, .benefit-item, .social-btn, .cta-button'
  );

  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    element.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Cursor trail effect
function createCursorTrail() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-trail';
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 0, 255, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });
}

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Parallax effect for background elements
function createParallax() {
  window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Special effects for volunteer areas
function addVolunteerAreaEffects() {
  const areaItems = document.querySelectorAll('.area-item');

  areaItems.forEach((item) => {
    item.addEventListener('click', function () {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Special effects for student info cards
function addStudentCardEffects() {
  const infoCards = document.querySelectorAll('.info-card');

  infoCards.forEach((card) => {
    card.addEventListener('click', function () {
      // Create sparkle effect
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        this.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }
    });
  });
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function () {
  const volunteerForm = document.querySelector('.volunteer-form');
  const studentForm = document.querySelector('.student-form');

  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Show success notification
      showNotification(
        'تم إرسال طلب التطوع بنجاح! سنتواصل معك قريباً.',
        'success'
      );

      // Close modal
      closeVolunteerModal();

      // Reset form
      this.reset();
    });
  }

  if (studentForm) {
    studentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Show success notification
      showNotification(
        'تم تسجيل الطالبة بنجاح! سنتواصل معك قريباً.',
        'success'
      );

      // Close modal
      closeStudentModal();

      // Reset form
      this.reset();
    });
  }
});

// Notification system
function showNotification(message, type = 'info') {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;

  const icon = document.createElement('i');
  icon.className =
    type === 'success'
      ? 'fas fa-check-circle'
      : type === 'error'
      ? 'fas fa-exclamation-circle'
      : 'fas fa-info-circle';

  const text = document.createElement('span');
  text.textContent = message;

  notification.appendChild(icon);
  notification.appendChild(text);
  container.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Social media links
function openSocial(platform) {
  const urls = {
    instagram: 'https://instagram.com/hercode',
    facebook: 'https://facebook.com/hercode',
  };

  if (urls[platform]) {
    window.open(urls[platform], '_blank');
    showNotification(
      `جاري فتح ${platform === 'instagram' ? 'انستجرام' : 'فيسبوك'}...`,
      'info'
    );
  }
}

// Schedule and location functions
function showSchedule() {
  showNotification('سيتم إضافة مواعيد البرنامج قريباً!', 'info');
}

function showLocations() {
  showNotification('سيتم إضافة أماكن التدريب قريباً!', 'info');
}

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

// Icon rotation on hover
function addIconRotation() {
  const icons = document.querySelectorAll(
    '.area-item i, .info-card i, .benefit-item i'
  );

  icons.forEach((icon) => {
    icon.addEventListener('mouseenter', function () {
      this.style.transform = 'rotate(360deg) scale(1.2)';
      this.style.transition = 'transform 0.5s ease';
    });

    icon.addEventListener('mouseleave', function () {
      this.style.transform = 'rotate(0deg) scale(1)';
    });
  });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function (e) {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Konami code activated!
    showNotification('🎉 مبروك! لقد اكتشفت الكود السري!', 'success');

    // Add rainbow effect to all elements
    document.querySelectorAll('*').forEach((element) => {
      element.style.animation = 'rainbow 2s infinite';
    });

    // Reset after 5 seconds
    setTimeout(() => {
      document.querySelectorAll('*').forEach((element) => {
        element.style.animation = '';
      });
    }, 5000);

    konamiCode = [];
  }
});

// Initialize all effects
document.addEventListener('DOMContentLoaded', function () {
  addHoverEffects();
  createCursorTrail();
  createScrollProgress();
  console.log('🎯 Cursor trail initialized on JoinUs page');
  createParallax();
  addVolunteerAreaEffects();
  addStudentCardEffects();
  addIconRotation();

  // Add fade-in class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add hover effects for cursor trail
  const interactiveElements = document.querySelectorAll(
    'a, button, .area-item, .info-card, .social-btn, input, textarea'
  );

  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      const cursor = document.querySelector('.cursor-trail');
      if (cursor) {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background =
          'radial-gradient(circle, rgba(255, 0, 255, 1), transparent)';
      }
    });

    element.addEventListener('mouseleave', () => {
      const cursor = document.querySelector('.cursor-trail');
      if (cursor) {
        cursor.style.transform = 'scale(1)';
        cursor.style.background =
          'radial-gradient(circle, rgba(255, 0, 255, 0.8), transparent)';
      }
    });
  });
});

// Throttle scroll events for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  'scroll',
  throttle(function () {
    // Scroll-based animations and effects
  }, 16)
); // ~60fps
