// Typing effect with smoother animation
const phrases = ['Technicien spécialisé en gestion de transport et logistique'];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const typingElement = document.getElementById('typing-text');
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Longer pause at the end
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before starting new word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile navigation with smooth animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Enhanced form submission with validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const formData = new FormData(contactForm);
    let isValid = true;
    let errorMessage = '';

    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            errorMessage = 'جميع الحقول مطلوبة';
            break;
        }
        if (key === 'email' && !validateEmail(value)) {
            isValid = false;
            errorMessage = 'الرجاء إدخال بريد إلكتروني صحيح';
            break;
        }
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'جاري الإرسال...';

    setTimeout(() => {
        console.log('Form submitted:', Object.fromEntries(formData));
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'إرسال الرسالة';
        alert('تم إرسال الرسالة بنجاح!');
    }, 1500);
});

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced scroll reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.transitionDelay = entry.target.dataset.delay;
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections and add delay to skill cards
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.dataset.delay = `${index * 0.1}s`;
    observer.observe(card);
});

// Initialize typing effect
typeEffect();