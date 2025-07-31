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

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 255, 0.3)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    navbar.style.boxShadow = 'none';
  }
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // Animate counters when stats section is visible
      if (entry.target.classList.contains('stats-container')) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.content-box, .program-card, .stats-container, .values-container'
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === 'success' ? 'fa-check-circle' : 'fa-info-circle'
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === 'success'
            ? 'linear-gradient(45deg, #00FF00, #008000)'
            : 'linear-gradient(45deg, #FF00FF, #800080)'
        };
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-icon');

  floatingElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      typeWriter(heroTitle, 'Her Code', 150);
    }, 1000);
  }
});

// Particle system for background
function createParticles() {
  const hero = document.querySelector('.hero');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 0, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
    hero.appendChild(particle);
  }
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Hover effects for program cards
document.querySelectorAll('.program-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.boxShadow = '0 20px 40px rgba(255, 0, 255, 0.4)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.2)';
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

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF00FF, #00FF00, #FF00FF);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrolled + '%';
  });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Trigger special effect
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎉 مبروك! لقد اكتشفت سر الموقع!', 'success');

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(rainbowStyle);

    // Reset after 5 seconds
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);

    konamiCode = [];
  }
});

// Performance optimization: Throttle scroll events
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
  // Escape key to close modal
  if (e.key === 'Escape') {
    const modal = document.getElementById('registrationModal');
    if (modal.style.display === 'block') {
      closeRegistrationModal();
    }
  }

  // Tab navigation improvements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #FF00FF !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyles);

console.log('🚀 Her Code website loaded successfully!');
console.log('💡 Try the Konami code: ↑↑↓↓←→←→BA');
