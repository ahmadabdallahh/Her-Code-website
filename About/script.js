// Loading Screen Management
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.querySelector('.loading-progress');

  if (!loadingScreen) {
    console.warn('Loading screen element not found');
    return;
  }

  let loadingHidden = false;

  function hideLoadingScreen() {
    if (loadingHidden) return;
    loadingHidden = true;

    // Stop the infinite animation
    if (loadingProgress) {
      loadingProgress.style.animation = 'none';
    }

    // Fade out the loading screen
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.5s ease-out';

    // Hide the loading screen completely after fade out
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      console.log('Loading screen hidden successfully');
    }, 500);
  }

  // Hide after 3 seconds (normal case)
  setTimeout(hideLoadingScreen, 3000);

  // Failsafe: force hide after 8 seconds in case something goes wrong
  setTimeout(hideLoadingScreen, 8000);

  // Additional safety: hide immediately if page is already fully loaded
  if (document.readyState === 'complete') {
    setTimeout(hideLoadingScreen, 1000);
  }
});

// Additional loading screen safety check
document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen && document.readyState === 'complete') {
    // If page is already fully loaded when DOMContentLoaded fires, hide loading screen immediately
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 500);
  }
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

      // Animate counters when impact stats section is visible
      if (entry.target.classList.contains('impact-stats')) {
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
    '.content-box, .team-card, .mission-card, .vision-card, .impact-stats'
  );
  animatedElements.forEach((el) => observer.observe(el));
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
      typeWriter(heroTitle, 'عن المبادرة', 150);
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

// Hover effects for team cards
document.querySelectorAll('.team-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.boxShadow = '0 20px 40px rgba(255, 0, 255, 0.4)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.2)';
  });
});

// Team member hover effects
document.querySelectorAll('.member').forEach((member) => {
  member.addEventListener('mouseenter', function () {
    this.style.transform = 'translateX(-10px) scale(1.05)';
    this.style.background = 'rgba(255, 0, 255, 0.2)';
  });

  member.addEventListener('mouseleave', function () {
    this.style.transform = 'translateX(0) scale(1)';
    this.style.background = 'rgba(255, 255, 255, 0.05)';
  });
});

// Mission & Vision cards hover effects
document.querySelectorAll('.mission-card, .vision-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-15px) scale(1.03)';
    this.style.boxShadow = '0 25px 50px rgba(255, 0, 255, 0.4)';
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

// Empowerment statement animation
function animateEmpowermentStatement() {
  const statement = document.querySelector('.empowerment-statement');
  if (statement) {
    statement.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 0 50px rgba(255, 0, 255, 0.8)';
    });

    statement.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.3)';
    });
  }
}

// Initialize empowerment statement animation
document.addEventListener('DOMContentLoaded', animateEmpowermentStatement);

// Team icon rotation on hover
document.querySelectorAll('.team-icon').forEach((icon) => {
  icon.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.2) rotate(360deg)';
    this.style.transition = 'all 0.5s ease';
  });

  icon.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Card icon pulse animation
document.querySelectorAll('.card-icon').forEach((icon) => {
  icon.addEventListener('mouseenter', function () {
    this.style.animation = 'iconPulse 0.5s ease-in-out';
  });

  icon.addEventListener('mouseleave', function () {
    this.style.animation = 'iconPulse 2s infinite';
  });
});

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
  // Escape key to close any open modals or menus
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
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

// Highlight effect for team members
function addHighlightEffect() {
  document.querySelectorAll('.member').forEach((member) => {
    member.addEventListener('click', function () {
      // Remove highlight from other members
      document.querySelectorAll('.member').forEach((m) => {
        m.style.background = 'rgba(255, 255, 255, 0.05)';
      });

      // Add highlight to clicked member
      this.style.background = 'rgba(255, 0, 255, 0.3)';
      this.style.transform = 'scale(1.05)';

      // Show member details (you can expand this)
      const memberName = this.querySelector('h4').textContent;
      const memberRole = this.querySelector('span').textContent;
      showNotification(`👤 ${memberName} - ${memberRole}`, 'info');
    });
  });
}

// Initialize highlight effect
document.addEventListener('DOMContentLoaded', addHighlightEffect);

// Animate team cards on scroll
function animateTeamCards() {
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

// Initialize team card animations
document.addEventListener('DOMContentLoaded', animateTeamCards);

// Special effect for empowerment statement
function addEmpowermentEffect() {
  const statement = document.querySelector('.empowerment-statement');
  if (statement) {
    statement.addEventListener('click', function () {
      // Create sparkle effect
      for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #FF00FF;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: sparkle 1s ease-out forwards;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
        this.appendChild(sparkle);

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 1000);
      }

      // Add sparkle animation
      const sparkleStyle = document.createElement('style');
      sparkleStyle.textContent = `
                @keyframes sparkle {
                    0% { transform: scale(0) rotate(0deg); opacity: 1; }
                    100% { transform: scale(1) rotate(360deg); opacity: 0; }
                }
            `;
      document.head.appendChild(sparkleStyle);
    });
  }
}

// Initialize empowerment effect
document.addEventListener('DOMContentLoaded', addEmpowermentEffect);

console.log('🚀 Her Code About page loaded successfully!');
console.log('💡 Try the Konami code: ↑↑↓↓←→←→BA');
console.log('🌟 Click on team members to see their details!');
console.log('✨ Click on the empowerment statement for a special effect!');

// Debug loading screen status
setTimeout(() => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    console.log(
      'Loading screen visibility:',
      loadingScreen.style.display,
      loadingScreen.style.opacity
    );
  }
}, 5000);

// Manual override function for loading screen (can be called from console)
window.forceHideLoading = function () {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.display = 'none';
    console.log('Loading screen manually hidden');
  }
};

// Make it available globally for debugging
console.log('💡 If loading screen gets stuck, run: forceHideLoading()');
