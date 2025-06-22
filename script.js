// Scroll progress bar
window.onscroll = function () {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-bar").style.width = scrolled + "%";
};

// Intersection Observer for reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Observe all elements with reveal class
document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});

// Hamburger menu toggle
document.getElementById("hamburger").onclick = function () {
  document.getElementById("nav-menu").classList.toggle("show-menu");
};

// Modal functions
function openModal() {
  document.getElementById("testimonial-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("testimonial-modal").style.display = "none";
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

// Newsletter form validation
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const feedback = document.getElementById("email-feedback");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(emailInput.value)) {
    feedback.textContent = "Please enter a valid email address";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Thank you for subscribing!";
    feedback.style.color = "green";
    emailInput.value = "";
  }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        const navMenu = document.getElementById("nav-menu");
        if (navMenu && navMenu.classList.contains("show-menu")) {
          navMenu.classList.remove("show-menu");
          document.getElementById("hamburger").setAttribute('aria-expanded', 'false');
          document.body.style.overflow = "";
        }
        
        // Smooth scroll to target
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.onscroll = throttle(window.onscroll, 16); // ~60fps
