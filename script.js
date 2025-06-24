// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.getAttribute('href') === "#") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Add counter animation for skills
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        const nav = document.querySelector('nav');
    const heroSection = document.querySelector('.hero');
    if (!nav || !heroSection) return;

    // hero bölümünün altına inildiyse nav'a "light" (mor) sınıfı ekle
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY >= heroBottom - nav.offsetHeight) {
        nav.classList.add('light');
    } else {
        nav.classList.remove('light');
    }
    });
    
    // Add loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        body.style.opacity = '1';
    });
    
    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add form validation (if contact form is added later)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add smooth reveal animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add mobile menu toggle (for future mobile menu implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
const images = [
  "images/foto1.jpg",
  "images/foto2.jpg",
];
let current = 0;

const heroBg = document.querySelector('.hero-bg');
const heroBgNext = document.querySelector('.hero-bg-next');

function setHeroBg(index) {
    heroBg.style.background = `
        linear-gradient(rgba(0,30,60,0.7), rgba(0,0,0,0.6)),
        url('${images[index]}') center/cover no-repeat
    `;
}
function setHeroBgNext(index) {
    heroBgNext.style.background = `
        linear-gradient(rgba(0,30,60,0.7), rgba(0,0,0,0.6)),
        url('${images[index]}') center/cover no-repeat
    `;
}

setHeroBg(current);

setInterval(() => {
    const next = (current + 1) % images.length;
    setHeroBgNext(next);
    heroBgNext.style.opacity = 1;
    setTimeout(() => {
        setHeroBg(next);
        heroBgNext.style.opacity = 0;
        current = next;
    }, 1200); 
}, 4000);

});