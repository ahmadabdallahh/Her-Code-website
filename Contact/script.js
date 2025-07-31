// Loading Screen
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 2000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

// Smooth Scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 1s ease-out forwards';
    }
  });
}, observerOptions);

document
  .querySelectorAll('.contact-card, .social-card, .faq-item')
  .forEach((el) => {
    observer.observe(el);
  });

// Typing Effect for Hero Title
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
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      typeWriter(heroTitle, 'تواصلي معنا', 150);
    }, 1000);
  }
});

// Particle System
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${
              Math.random() * 10 + 10
            }s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Hover Effects
document
  .querySelectorAll('.contact-card, .social-card, .faq-item')
  .forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

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

// Initialize cursor trail
document.addEventListener('DOMContentLoaded', createCursorTrail);
console.log('🎯 Cursor trail initialized on Contact page');

// Add hover effects for cursor trail
document.addEventListener('DOMContentLoaded', () => {
  // Make cursor trail larger on hover over interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .contact-card, .social-card, .faq-item, input, textarea'
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

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('contactName').value,
    email: document.getElementById('contactEmail').value,
    subject: document.getElementById('contactSubject').value,
    message: document.getElementById('contactMessage').value,
  };

  // Simulate form submission
  showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');

  // Reset form
  this.reset();
});

// Contact Functions
function copyEmail() {
  const email = 'your@email.com';
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showNotification('تم نسخ البريد الإلكتروني!', 'success');
    })
    .catch(() => {
      showNotification('فشل في نسخ البريد الإلكتروني', 'error');
    });
}

function callPhone() {
  const phone = '+201234567890';
  window.open(`tel:${phone}`);
  showNotification('جاري الاتصال...', 'success');
}

function showLocation() {
  // Open Google Maps with Cairo location
  window.open('https://maps.app.goo.gl/sbW6jx4q58QayQATA');
  showNotification('تم فتح الخريطة!', 'success');
}

// Social Media Functions
function openSocial(platform) {
  const socialUrls = {
    twitter: 'https://twitter.com/HerCodeOfficial',
    instagram: 'https://instagram.com/HerCodeOfficial',
    facebook: 'https://facebook.com/HerCodeOfficial',
    linkedin: 'https://linkedin.com/company/HerCodeOfficial',
  };

  if (socialUrls[platform]) {
    window.open(socialUrls[platform], '_blank');
    showNotification(`تم فتح ${platform}!`, 'success');
  }
}

// FAQ Functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.classList.remove('active');
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Notification System
function showNotification(message, type = 'info') {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;

  const icon =
    type === 'success'
      ? 'fas fa-check-circle'
      : type === 'error'
      ? 'fas fa-exclamation-circle'
      : 'fas fa-info-circle';

  notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

  container.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    '.contact-card, .social-card'
  );

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Icon Rotation on Hover
document.querySelectorAll('.contact-icon, .social-icon').forEach((icon) => {
  icon.addEventListener('mouseenter', function () {
    this.style.transform = 'rotate(360deg) scale(1.1)';
    this.style.transition = 'transform 0.6s ease';
  });

  icon.addEventListener('mouseleave', function () {
    this.style.transform = 'rotate(0deg) scale(1)';
  });
});

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Rainbow effect
    document.body.style.animation = 'rainbow 2s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 2000);

    showNotification('🎉 Konami Code Activated! 🌈', 'success');
    konamiCode = [];
  }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Throttle function for performance
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
  throttle(() => {
    // Scroll-based animations
  }, 16)
);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or menus
    document.querySelectorAll('.faq-item.active').forEach((item) => {
      item.classList.remove('active');
    });
  }
});

// Focus styles for keyboard navigation
document
  .querySelectorAll('button, a, input, select, textarea')
  .forEach((element) => {
    element.addEventListener('focus', function () {
      this.style.outline = '2px solid #00FFFF';
      this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function () {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('Contact page loaded successfully!');

  // Add loading animation to contact cards
  document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Add loading animation to social cards
  document.querySelectorAll('.social-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Add loading animation to FAQ items
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});
