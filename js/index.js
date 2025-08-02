document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = document.querySelector('header').offsetHeight;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dark mode toggle
  const toggleBtn = document.getElementById('darkModeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  });

  // Scroll shadow for header
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (Math.abs(currentY - lastScrollY) > 5) {
      lastScrollY = currentY;
      header.style.boxShadow = currentY > 10
        ? '0 2px 20px rgba(0, 0, 0, 0.1)'
        : '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  }, { passive: true });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.slider-dot');
  let currentIndex = 0;
  let testimonialTimer;

  function showTestimonial(index) {
    testimonials.forEach((el, i) => {
      el.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function startSlider() {
    testimonialTimer = setInterval(() => {
      const next = (currentIndex + 1) % testimonials.length;
      showTestimonial(next);
    }, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialTimer);
      showTestimonial(i);
      startSlider();
    });
  });

  showTestimonial(0);
  startSlider();

  // Contact form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Update copyright
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
