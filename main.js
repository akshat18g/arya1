// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
  }, 1500);
});

// Particles.js Configuration
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#0fe0ff', '#ff00e5', '#7000ff']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#0fe0ff',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
});

// Navbar Scroll Effect
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Add scrolled class to header
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks2 = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks2.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks2.classList.remove('active');
  });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    formInputs.forEach(input => {
      if (!input.value.trim()) {
        showError(input, 'This field is required');
        isValid = false;
      } else {
        clearError(input);
        
        // Email validation
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
          }
        }
      }
    });
    
    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        formInputs.forEach(input => input.value = '');
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    }
  });
  
  // Real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        showError(input, 'This field is required');
      } else {
        clearError(input);
        
        // Email validation
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            showError(input, 'Please enter a valid email address');
          }
        }
      }
    });
    
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        clearError(input);
      }
    });
  });
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  formGroup.classList.add('error');
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  
  errorMessage.textContent = '';
  errorMessage.style.display = 'none';
  formGroup.classList.remove('error');
}

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
} else {
  // Fallback for browsers that don't support IntersectionObserver
  lazyImages.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile Navigation Toggle Animation
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const spans = navToggle.querySelectorAll('span');
    
    if (navToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Animate on Scroll (Simple Implementation)
const animateElements = document.querySelectorAll('[data-aos]');

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.8;
  
  animateElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < triggerBottom) {
      const delay = element.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        element.classList.add('aos-animate');
      }, delay);
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);
window.addEventListener('load', checkScroll);

// Add CSS class for animation
animateElements.forEach(element => {
  element.classList.add('aos-init');
  const animation = element.getAttribute('data-aos') || 'fade-up';
  element.classList.add(`aos-${animation}`);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .aos-init {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .aos-animate {
    opacity: 1;
    transform: translateY(0);
  }
  .aos-fade-up {
    transform: translateY(50px);
  }
  .aos-fade-down {
    transform: translateY(-50px);
  }
  .aos-fade-left {
    transform: translateX(50px);
  }
  .aos-fade-right {
    transform: translateX(-50px);
  }
`;
document.head.appendChild(style);