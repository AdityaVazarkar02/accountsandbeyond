// DOM Ready
function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
}

function toggleFloat(){
  document.querySelector('.floating-contact').style.display='none';
}



document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality (animations removed)
    // initCounterAnimation();
    // initProgressBars();
    // initTestimonialSlider();
    // initSmoothScrolling();
    // initBackToTop();
    // initFormSubmission();
    // initScrollAnimations();
    // initHeaderScrollEffect();
    // initResponsiveBehaviors();
    // initPageScrollEffects();
});

// Page Scroll Effects (removed)
function initPageScrollEffects() {
    // All scroll effects removed
    console.log("Scroll effects disabled");
}

// Fade in elements on scroll (removed)
function initFadeInOnScroll() {
    // Scroll animations removed
    console.log("Fade-in scroll effects disabled");
}

// Parallax scrolling effects (removed)
function initParallaxEffects() {
    // Parallax effects removed
    console.log("Parallax effects disabled");
}

// Sticky elements on scroll (removed)
function initStickyElements() {
    // Sticky elements removed
    console.log("Sticky elements disabled");
}

// Scroll progress indicator (removed)
function initScrollProgressIndicators() {
    // Scroll progress indicators removed
    console.log("Scroll progress indicators disabled");
}

// Element reveal animations (removed)
function initElementRevealAnimations() {
    // Reveal animations removed
    console.log("Element reveal animations disabled");
}

// Scroll trigger initialization (removed)
function initScrollTriggers() {
    // Scroll triggers removed
    console.log("Scroll triggers disabled");
}

// Main scroll handler (removed)
function handleScrollEffects() {
    // Scroll handling removed
    console.log("Scroll handling disabled");
}

// Throttle function removed (not needed without scroll effects)

// Scroll effect styles removed



// function initMobileMenu() {
//     const hamburger = document.querySelector('.hamburger');
//     const menu = document.querySelector('.menu');
//     const menuLinks = document.querySelectorAll('.menu a');
    
//     // Close menu when clicking outside
//     document.addEventListener('click', function(e) {
//         if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
//             menu.classList.remove('show');
//         }
//     });
    
//     // Close menu when clicking links (except external links and anchor links)
//     menuLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             const href = link.getAttribute('href');
            
//             // Close menu for internal page links and anchor links on same page
//             if (href.endsWith('.html') || href.startsWith('#')) {
//                 // Add a slight delay to ensure the menu closes before navigation
//                 setTimeout(() => {
//                     menu.classList.remove('show');
//                 }, 100);
                
//                 // Handle anchor links on the same page
//                 if (href.startsWith('#') && window.location.pathname === '/') {
//                     e.preventDefault();
//                     const targetElement = document.querySelector(href);
//                     if (targetElement) {
//                         const offsetTop = targetElement.offsetTop - 80;
//                         window.scrollTo({
//                             top: offsetTop,
//                             behavior: 'smooth'
//                         });
//                     }
//                 }
//             }
//         });
//     });
    
//     // Handle window resize
//     window.addEventListener('resize', () => {
//         if (window.innerWidth > 768) {
//             menu.classList.remove('show');
//         }
//     });
    
//     // Handle escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && menu.classList.contains('show')) {
//             menu.classList.remove('show');
//         }
//     });
    
//     // Set active state for current page
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//     menuLinks.forEach(link => {
//         const href = link.getAttribute('href');
//         if ((currentPage === 'index.html' && (href === '#home' || href === '/')) || 
//             (currentPage === 'about.html' && href === 'about.html') ||
//             (currentPage === 'courses.html' && href === 'courses.html') ||
//             (currentPage === 'admissions.html' && href === 'admissions.html') ||
//             (currentPage === 'contact.html' && href === 'contact.html')) {
//             link.classList.add('active');
//         } else {
//             link.classList.remove('active');
//         }
//     });
    
//     // Add toggleMenu function for hamburger menu
//     window.toggleMenu = function() {
//         const menu = document.querySelector('.menu');
//         if (menu) {
//             // Toggle the show class to open/close menu
//             menu.classList.toggle('show');
            
//             // Add accessibility attribute
//             const isOpen = menu.classList.contains('show');
//             const hamburger = document.querySelector('.hamburger');
//             if (hamburger) {
//                 hamburger.setAttribute('aria-expanded', isOpen);
//             }
//         }
//     };
// }

// Counter Animation



// ===== MOBILE NAV TOGGLE FIX =====

// ===== FIX NAV TOGGLE =====
function toggleMenu() {
    const menu = document.querySelector(".menu");
    if (menu) {
        menu.classList.toggle("show");
    }
}



function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200; // Lower value = faster animation
    
    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (counter.innerText.includes('%') ? '%' : '+');
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
            }
        };
        
        updateCounter();
    };
    
    // Check if counters are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Progress Bar Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const animateProgressBar = (bar) => {
        const width = bar.dataset.width;
        let currentWidth = 0;
        const increment = width / 50;
        
        const updateWidth = () => {
            currentWidth += increment;
            if (currentWidth < width) {
                bar.style.width = currentWidth + '%';
                bar.innerText = Math.ceil(currentWidth) + '%';
                setTimeout(updateWidth, 20);
            } else {
                bar.style.width = width + '%';
                bar.innerText = width + '%';
            }
        };
        
        updateWidth();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    // Show first testimonial
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
    }
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Auto-rotate testimonials (pause on hover for better UX)
    let autoRotate = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);
    
    // Pause auto-rotate on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 6000);
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {

            const targetId = this.getAttribute('href');

            // Only prevent default if target exists on SAME page
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const offsetTop = targetElement.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu
            const menu = document.querySelector('.menu');
            if (menu) menu.classList.remove('show');
        });
    });
}


// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Submission
function initFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', { name, email, phone, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Scroll Animations (removed)
function initScrollAnimations() {
    // Scroll animations removed
    console.log("Scroll animations disabled");
}

// Header Scroll Effect (removed)
function initHeaderScrollEffect() {
    // Header scroll effects removed
    console.log("Header scroll effects disabled");
}

// Responsive Behaviors
function initResponsiveBehaviors() {
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Reinitialize any components that might need adjustment
            const menu = document.querySelector('.menu');
            if (menu && menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        }, 100);
    });
    
    // Handle viewport changes for touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        
        // Add touch-friendly styles
        const style = document.createElement('style');
        style.textContent = `
            .btn, .menu a, .testimonial-nav button {
                min-height: 44px;
                min-width: 44px;
            }
            
            .menu a {
                padding: 15px 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Handle high DPI displays
    if (window.devicePixelRatio > 1) {
        document.body.classList.add('high-dpi');
    }
    
    // Adjust testimonial slider height based on screen size
    function adjustTestimonialHeight() {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            if (window.innerWidth <= 576) {
                testimonialSlider.style.height = '380px';
            } else if (window.innerWidth <= 768) {
                testimonialSlider.style.height = '350px';
            } else {
                testimonialSlider.style.height = '300px';
            }
        }
    }
    
    // Initial adjustment
    adjustTestimonialHeight();
    
    // Adjust on resize
    window.addEventListener('resize', adjustTestimonialHeight);
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS for animations (removed)
const style = document.createElement('style');
style.textContent = `
    /* All animations removed */
    
    /* Mobile-specific transitions */
    @media (max-width: 768px) {
        header {
            transition: none;
        }
        
        .menu {
            transition: none;
        }
    }
`;
document.head.appendChild(style);


