// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation on scroll
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe subject items
document.querySelectorAll('.subject-item').forEach((item, index) => {
    item.style.animation = `fadeInUp 0.8s ease-out backwards ${0.1 * index}s`;
    observer.observe(item);
});

// Observe feature items
document.querySelectorAll('.feature-item').forEach((item, index) => {
    item.style.animation = `fadeInUp 0.8s ease-out backwards ${0.1 * index}s`;
    observer.observe(item);
});

// Active navigation link indicator
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00ccff';
            link.style.borderBottom = '2px solid #00ccff';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// Class box click animation
document.querySelectorAll('.class-box').forEach(box => {
    box.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'bounce 0.6s ease-in-out';
        }, 10);
    });
});

// Card hover lift effect
document.querySelectorAll('.board-card, .subject-item, .feature-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease-out';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Count animation for stats if added
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    // Fade in hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    // Add subtle animation to header on load
    const header = document.querySelector('header');
    if (header) {
        header.style.animation = 'slideInDown 0.6s ease-out';
    }
});

// Mobile menu toggle (for future mobile menu implementation)
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Scroll to top button functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑ Top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #003366;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    width: 50px;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('hover', function() {
    this.style.background = '#c41e3a';
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.background = '#c41e3a';
    this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.background = '#003366';
    this.style.transform = 'scale(1)';
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Initialize AOS-like effects
function initializeAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
        const animationType = element.getAttribute('data-animate');
        observer.observe(element);
    });
}

initializeAnimations();

console.log('Nobel Classes website animations loaded successfully!');
