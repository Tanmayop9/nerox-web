// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Commands Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const commandsCategories = document.querySelectorAll('.commands-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        tabBtns.forEach(b => b.classList.remove('active'));
        commandsCategories.forEach(cat => cat.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding category
        const category = btn.getAttribute('data-category');
        const targetCategory = document.querySelector(`.commands-category[data-category="${category}"]`);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.feature-card, .command-card, .team-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic particle background (optional enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: particle-float ${5 + Math.random() * 10}s linear infinite;
    `;
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 2000);

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    let isVisible = false;

    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isVisible) {
                isVisible = true;
                // Optional: Add typing effect here if desired
            }
        });
    }, { threshold: 0.5 });

    typingObserver.observe(heroTitle);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats (if added)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Add copy to clipboard functionality for command names
const commandNames = document.querySelectorAll('.command-name');
commandNames.forEach(cmd => {
    cmd.style.cursor = 'pointer';
    cmd.title = 'Click to copy';
    
    cmd.addEventListener('click', function() {
        const commandText = this.textContent;
        navigator.clipboard.writeText(commandText).then(() => {
            // Show tooltip
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: #43b581;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                margin-top: -30px;
                z-index: 1000;
                animation: fadeOut 1s ease forwards;
            `;
            this.style.position = 'relative';
            this.appendChild(tooltip);
            setTimeout(() => tooltip.remove(), 1000);
        });
    });
});

// Add fade out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            // When image loads, fade it in
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
            
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

images.forEach(img => imageObserver.observe(img));

// Console easter egg
console.log('%c👋 Welcome to Nerox!', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%c🎵 The best Discord music bot', 'font-size: 16px; color: #b9bbbe;');
console.log('%c💻 Made with ❤️ by Tanmay', 'font-size: 14px; color: #43b581;');
