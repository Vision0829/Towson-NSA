// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll-triggered fade-in animations with enhanced timing
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
};

// Fallback for browsers without Intersection Observer
if (!('IntersectionObserver' in window)) {
    // Simple fallback: show all sections immediately
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fade-section').forEach(section => {
            section.classList.add('visible');
        });
    });
} else {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for E-Board members
            if (entry.target.id === 'eboard') {
                const members = entry.target.querySelectorAll('.eboard-member');
                members.forEach((member, index) => {
                    setTimeout(() => {
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        } else {
            // Fade out when scrolling away
            entry.target.classList.remove('visible');
            
            // Reset E-Board member animations when scrolling away
            if (entry.target.id === 'eboard') {
                const members = entry.target.querySelectorAll('.eboard-member');
                members.forEach((member) => {
                    member.style.opacity = '0';
                    member.style.transform = 'translateY(20px)';
                });
            }
        }
    });
}, observerOptions);

    // Observe all fade sections
    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize E-Board member animations
    const eboardMembers = document.querySelectorAll('.eboard-member');
    eboardMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.3s ease';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Check if smooth scrolling is supported
            if ('scrollBehavior' in document.documentElement.style) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback for older browsers
                target.scrollIntoView();
            }
        }
    });
});

// Enhanced navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.2)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const backgroundElements = document.querySelector('.background-elements');
    
    // Only apply subtle parallax to non-mountain elements
    const buddha = backgroundElements.querySelector('.buddha');
    const pagoda = backgroundElements.querySelector('.pagoda');
    const mandala = backgroundElements.querySelector('.mandala');
    
    // Mountains stay fixed at bottom - no parallax
    if (buddha) buddha.style.transform = `translateY(${scrolled * 0.02}px)`;
    if (pagoda) pagoda.style.transform = `translateY(${scrolled * 0.03}px)`;
    if (mandala) mandala.style.transform = `translateY(${scrolled * 0.01}px)`;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial fade-in for first section
    const firstSection = document.querySelector('.fade-section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.classList.add('visible');
        }, 100);
    }
    
    // Animate stats numbers
    animateStats();
});

// Animate statistics numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        // Only animate if the content is numeric
        if (text.includes('Coming Soon')) {
            // For "Coming Soon" text, just add a subtle fade-in effect
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(10px)';
            stat.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 200);
        } else if (/^\d+/.test(text)) {
            // Original numeric animation for actual numbers
            const target = parseInt(text);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
            }, 30);
        }
    });
}

// Enhanced interactive hover effects
document.querySelectorAll('.feature, .highlight, .event, .contact-item, .eboard-member').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(220, 53, 69, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});



// Simple fade-in effect that preserves layout completely
function fadeInTitle(element, text) {
    // Set the text immediately to establish layout
    element.textContent = text;
    
    // Start invisible and fade in
    element.style.opacity = '0';
    element.style.transition = 'opacity 1.5s ease-in-out';
    
    // Trigger fade in after a brief delay
    setTimeout(() => {
        element.style.opacity = '1';
    }, 300);
}

// Initialize fade-in effect when the page loads
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        fadeInTitle(mainTitle, originalText);
    }
});

// Enhanced scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #dc3545, #003893);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(220, 53, 69, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize scroll progress bar
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add floating animation to background elements
function addFloatingAnimation() {
    const backgroundElements = document.querySelectorAll('.mountain, .buddha, .pagoda, .mandala');
    
    backgroundElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
}

// Add CSS keyframes for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .mountain, .buddha, .pagoda, .mandala {
        animation: float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Initialize floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Add image lazy loading and intersection observer for images
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

// Observe all images for lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
});

// Add smooth reveal animation for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Add staggered animation for grid items
            const gridItems = entry.target.querySelectorAll('.feature, .highlight, .eboard-member, .event');
            gridItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        } else {
            // Fade out when scrolling away
            entry.target.classList.remove('revealed');
            
            // Reset grid items when scrolling away
            const gridItems = entry.target.querySelectorAll('.feature, .highlight, .eboard-member, .event');
            gridItems.forEach((item) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
        }
    });
}

// Enhanced section observer
const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
});

// Observe sections for enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Initialize grid items
        const gridItems = section.querySelectorAll('.feature, .highlight, .eboard-member, .event');
        gridItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.3s ease';
        });
    });
});







// Add smooth scroll to top functionality
const createScrollToTop = () => {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(-3px)';
        scrollButton.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'translateY(0)';
        scrollButton.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
    });
};

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Nepal Time Widget
function updateNepalTime() {
    const now = new Date();
    
    // Nepal is UTC+5:45
    const nepalOffset = 5.75 * 60 * 60 * 1000; // 5 hours 45 minutes in milliseconds
    const nepalTime = new Date(now.getTime() + nepalOffset);
    
    // Format time (HH:MM:SS)
    const hours = nepalTime.getUTCHours().toString().padStart(2, '0');
    const minutes = nepalTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = nepalTime.getUTCSeconds().toString().padStart(2, '0');
    
    // Convert to Bikram Sambat (Nepal Calendar)
    const nepalDate = convertToBikramSambat(nepalTime);
    
    // Update DOM elements
    const timeElement = document.getElementById('nepal-time');
    const dateElement = document.getElementById('nepal-date');
    
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    if (dateElement) {
        dateElement.textContent = nepalDate;
    }
}

// Convert Gregorian date to Bikram Sambat
function convertToBikramSambat(gregorianDate) {
    // Bikram Sambat starts on April 13-14 of Gregorian calendar
    // This is a simplified conversion - for exact dates, you'd need a proper calendar library
    
    const year = gregorianDate.getUTCFullYear();
    const month = gregorianDate.getUTCMonth() + 1; // 0-indexed
    const day = gregorianDate.getUTCDate();
    
    let bsYear = year;
    let bsMonth = month;
    let bsDay = day;
    
    // Adjust for Bikram Sambat year (starts in April)
    if (month < 4 || (month === 4 && day < 13)) {
        bsYear = year - 1;
    }
    
    // Convert month names to Nepali
    const nepaliMonths = [
        'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Ashoj',
        'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
    ];
    
    // Adjust month for Bikram Sambat (starts from Baisakh in April)
    if (month >= 4) {
        bsMonth = month - 3;
    } else {
        bsMonth = month + 9;
    }
    
    const nepaliMonth = nepaliMonths[bsMonth - 1];
    
    return `${bsDay} ${nepaliMonth} ${bsYear + 57}`; // Add 57 to convert to BS year
}

// Update Nepal time every second
setInterval(updateNepalTime, 1000);

// Initialize time display immediately
document.addEventListener('DOMContentLoaded', updateNepalTime);

// E-Board Carousel with Three Visible Items
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'hidden');
            
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalSlides) {
                slide.classList.add('next');
            } else {
                slide.classList.add('hidden');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Initialize
    updateCarousel();
}); 