document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    // Simple stagger for children of revealed elements
    const staggerItems = document.querySelectorAll('.phil-item, .price-card');
    staggerItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Form submission (specifically for the contact section)
    const contactForm = document.querySelector('#contacto form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Construct the mailto link
            const subject = encodeURIComponent(`Nuevo mensaje de ${name} via bitLayout`);
            const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nIdea/Mensaje:\n${message}`);
            const mailtoLink = `mailto:hola@bitlayout.es?subject=${subject}&body=${body}`;

            setTimeout(() => {
                btn.innerText = '¡Mensaje Enviado!';
                btn.style.background = '#10b981'; // Green
                contactForm.reset();
                
                // Open the mail client
                window.location.href = mailtoLink;
            }, 1000);
        });
    }

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            if (cookieBanner) cookieBanner.classList.add('visible');
        }, 2000);
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) cookieBanner.classList.remove('visible');
            setTimeout(() => {
                if (cookieBanner) cookieBanner.style.display = 'none';
            }, 500);
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('faq-open');
            });
        }
    });

    // --- Background Spotlight Logic ---
    window.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth) * 100;
        const yPos = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${xPos}%`);
        document.documentElement.style.setProperty('--mouse-y', `${yPos}%`);
    });

});
