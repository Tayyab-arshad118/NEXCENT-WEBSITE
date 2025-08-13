document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const navbar = document.querySelector('.navbar');
    let isMenuOpen = false;

    if (menuToggle && navbarLinks) {
        // Add animation class after a slight delay to ensure CSS transitions work
        setTimeout(() => {
            navbarLinks.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 100);

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            menuToggle.classList.toggle('active');
            navbarLinks.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Smooth animation for menu items
        const menuItems = navbarLinks.querySelectorAll('a');
        menuItems.forEach((item, index) => {
            item.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, 
                                   opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        });

        // Handle menu item clicks
        menuItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !e.target.closest('.navbar')) {
                closeMenu();
            }
        });

        // Close menu function
        function closeMenu() {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
            navbar.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    }

    // Form popup functionality
    const modal = document.getElementById('internshipFormModal');
    const form = document.getElementById('internshipForm');
    if (!modal || !form) return;

    // Education other field toggle
    const educationSelect = document.getElementById('education');
    const educationOther = document.getElementById('educationOther');
    
    educationSelect.addEventListener('change', function() {
        educationOther.classList.toggle('hidden', this.value !== 'other');
        educationOther.required = this.value === 'other';
    });

    // Previous internship description toggle
    const hasInternshipRadios = document.getElementsByName('hasInternship');
    const internshipDescGroup = document.getElementById('internshipDescGroup');
    const internshipDesc = document.getElementById('internshipDesc');
    
    hasInternshipRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            internshipDescGroup.classList.toggle('hidden', this.value !== 'yes');
            internshipDesc.required = this.value === 'yes';
        });
    });

    // Word count for motivation
    const motivationText = document.getElementById('motivation');
    const wordCount = document.getElementById('wordCount');
    
    motivationText.addEventListener('input', function() {
        const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = words.length;
        
        if (words.length < 50 || words.length > 100) {
            wordCount.style.color = '#ff4444';
        } else {
            wordCount.style.color = '';
        }
    });

    // File validation
    const paymentProof = document.getElementById('paymentProof');
    
    paymentProof.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert('File is too large. Maximum size is 5MB.');
                this.value = '';
            }
        }
    });

    // Form submission
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerText = 'Submitting...';

        try {
            const formData = new FormData(this);
            // Here you would send the data to your backend
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success state
            submitButton.innerText = 'Application Submitted!';
            submitButton.style.background = 'linear-gradient(135deg, #00D75F 0%, #4ADE80 100%)';

            // Close modal and reset after delay
            setTimeout(() => {
                modal.classList.remove('active');
                form.reset();
                submitButton.disabled = false;
                submitButton.innerText = 'Submit Application';
                submitButton.style.background = '';
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            submitButton.innerText = 'Error! Try Again';
            submitButton.style.background = '#EF4444';

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerText = 'Submit Application';
                submitButton.style.background = '';
            }, 3000);
        }
    });

    // Modal functionality
    window.openInternshipForm = function() {
        modal.style.display = 'flex';
        // Force reflow
        modal.offsetHeight;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeInternshipForm = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Wait for animation to finish before hiding
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = 'none';
            }
        }, 300);
    };

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeInternshipForm();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeInternshipForm();
        }
    });

    // Form validation and submission
    if (form) {
        const educationSelect = document.getElementById('education');
        const educationOther = document.getElementById('educationOther');
        const hasInternshipRadios = document.getElementsByName('hasInternship');
        const internshipDescGroup = document.getElementById('internshipDescGroup');
        const internshipDesc = document.getElementById('internshipDesc');
        const motivationText = document.getElementById('motivation');
        const wordCount = document.getElementById('wordCount');
        const paymentProof = document.getElementById('paymentProof');

        // Education other field toggle
        educationSelect?.addEventListener('change', function() {
            educationOther.classList.toggle('hidden', this.value !== 'other');
            educationOther.required = this.value === 'other';
        });

        // Previous internship description toggle
        hasInternshipRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                internshipDescGroup.classList.toggle('hidden', this.value !== 'yes');
                internshipDesc.required = this.value === 'yes';
            });
        });

        // Word count for motivation
        motivationText?.addEventListener('input', function() {
            const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
            wordCount.textContent = words.length;
            if (words.length < 50 || words.length > 100) {
                wordCount.style.color = '#ff4444';
            } else {
                wordCount.style.color = '';
            }
        });

        // File validation
        paymentProof?.addEventListener('change', function() {
            const file = this.files[0];
            if (file && file.size > 5 * 1024 * 1024) { // 5MB
                alert('File size should not exceed 5MB');
                this.value = '';
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Form submitted successfully!');
            closeInternshipForm();
        });
    }

    // Modal functions
    window.openInternshipForm = function() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (form) {
                form.reset();
                const wordCount = document.getElementById('wordCount');
                const educationOther = document.getElementById('educationOther');
                const internshipDescGroup = document.getElementById('internshipDescGroup');
                if (wordCount) wordCount.textContent = '0';
                if (educationOther) educationOther.classList.add('hidden');
                if (internshipDescGroup) internshipDescGroup.classList.add('hidden');
            }
        }
    };

    window.closeInternshipForm = function() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Click outside to close
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeInternshipForm();
            }
        });
    }
});
