document.addEventListener('DOMContentLoaded', () => {
    /* 
    ==============================================
       SCROLL ANIMATIONS (Intersection Observer)
    ==============================================
    */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation
                entry.target.classList.add('is-visible');
                
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));


    /* 
    ==============================================
       STICKY NAVBAR
    ==============================================
    */
    const navbar = document.querySelector('.navbar');
    
    const navLinksList = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Se chegou no final da página (limite físico do scroll), ativa o menu "Sobre"
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
            navLinksList.forEach(link => {
                const href = link.getAttribute('href');
                if (href === '#sobre' || href === 'index.html#sobre') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });


    /* 
    ==============================================
       MOBILE MENU TOGGLE
    ==============================================
    */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    /* 
    ==============================================
       SCROLL SPY (Highlight active nav link)
    ==============================================
    */
    const spySections = document.querySelectorAll('section[id], footer[id]');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}` || href === `index.html#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger active state when section occupies the main screen area
        threshold: 0
    });

    spySections.forEach(section => spyObserver.observe(section));
});
