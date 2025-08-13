// main.js - Nexcent Studios

document.addEventListener('DOMContentLoaded', function () {
  // Navbar mobile toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const navItems = document.querySelectorAll('.navbar-links a');
  navItems.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  // Make all sections visible by default
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('visible');
  });

  // Internship form tooltip
  const form = document.querySelector('#internship-form');
  if (form) {
    const tooltip = form.querySelector('.tooltiptext');
    form.addEventListener('mouseover', () => {
      if (tooltip) tooltip.style.visibility = 'visible';
    });
    form.addEventListener('mouseout', () => {
      if (tooltip) tooltip.style.visibility = 'hidden';
    });
  }

  // Contact form handling
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      // Basic validation
      let isValid = true;
      const email = data.email;
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        isValid = false;
        const emailInput = contactForm.querySelector('#email');
        emailInput.style.borderColor = '#ff4444';
        setTimeout(() => emailInput.style.borderColor = '', 3000);
      }

      if (isValid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
          const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            // Show success message
            btn.textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(90deg, #00D75F 0%, #00A642 100%)';
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
              btn.textContent = originalText;
              btn.style.background = '';
              btn.disabled = false;
            }, 3000);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
          }
        } catch (error) {
          console.error('Error:', error);
          btn.textContent = 'Error! Try Again';
          btn.style.background = '#ff4444';
          
          // Reset button after delay
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        }
      }
    });

    // Real-time validation feedback
    const emailInput = contactForm.querySelector('#email');
    emailInput.addEventListener('input', function(e) {
      const email = e.target.value;
      if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        this.style.borderColor = '#ff4444';
      } else {
        this.style.borderColor = '';
      }
    });
  }
});
