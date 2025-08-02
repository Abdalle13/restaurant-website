document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Smooth scroll with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced dark mode toggle with localStorage
  const toggleBtn = document.getElementById('darkModeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check for saved user preference or system preference
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });

  // Optimized scroll event for header
  let lastScrollY = window.scrollY;
  const header = document.querySelector('header');
  const scrollThreshold = 5;

  window.addEventListener('scroll', () => {
    // Only update if scroll position changed significantly
    if (Math.abs(lastScrollY - window.scrollY) > scrollThreshold) {
      lastScrollY = window.scrollY;
      
      // Add slight shadow when scrolled
      if (lastScrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    }
  }, { passive: true });

  // Testimonial slider functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.slider-dot');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
  }

  function startTestimonialSlider() {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialInterval);
      showTestimonial(index);
      startTestimonialSlider();
    });
  });

  // Start the slider
  showTestimonial(0);
  startTestimonialSlider();

  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show an alert
      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset the form
      contactForm.reset();
    });
  }

  // Update copyright year automatically
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});