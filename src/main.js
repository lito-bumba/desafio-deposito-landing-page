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

    /* 
    ==============================================
       HERO CAROUSEL
    ==============================================
    */
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.hero-slide');
        const dots = carousel.querySelectorAll('.carousel-dots .dot');
        const prevBtn = document.getElementById('hero-prev');
        const nextBtn = document.getElementById('hero-next');
        let currentSlide = 0;
        let slideInterval = null;
        const autoPlayDelay = 6000;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startAutoplay() {
            stopAutoplay();
            slideInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoplay() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoplay();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                startAutoplay();
            });
        });

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Touch swipe support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 40) {
                if (swipeDistance < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoplay();
        }, { passive: true });

        startAutoplay();
    }

    /* 
    ==============================================
       SMART REDIRECT ("Começar Agora")
    ==============================================
    */
    const comecarButtons = document.querySelectorAll('#btn-comecar-agora, .btn-comecar-agora');

    comecarButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ua = navigator.userAgent || '';
            const isAndroid = /Android/i.test(ua);
            const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

            if (isAndroid) {
                e.preventDefault();
                window.location.href = 'https://play.google.com/store/apps/details?id=com.desafio.deposito';
            } else if (isIOS) {
                e.preventDefault();
                window.location.href = 'https://www.apple.com/br/app-store/';
            } else {
                e.preventDefault();
                const downloadSection = document.getElementById('download');
                if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, '', '#download');
                } else {
                    window.location.hash = '#download';
                }
            }
        });
    });

    // Se o usuário acessar a raiz com parâmetros ?app, ?download ou hash #app / #comecar
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('app') || searchParams.has('download') || window.location.hash === '#app' || window.location.hash === '#comecar') {
        const ua = navigator.userAgent || '';
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (isAndroid) {
            window.location.replace('https://play.google.com/store/apps/details?id=com.desafio.deposito');
        } else if (isIOS) {
            window.location.replace('https://www.apple.com/br/app-store/');
        } else {
            const downloadSection = document.getElementById('download');
            if (downloadSection) {
                downloadSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});
