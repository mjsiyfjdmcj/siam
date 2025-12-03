// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    setInterval(nextSlide, 4000); // Change slide every 4 seconds
});

// Hero animations
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('show');
    }, 500);
    
    setTimeout(() => {
        document.querySelector('.hero-subtitle').classList.add('show');
    }, 800);
    
    setTimeout(() => {
        document.querySelector('.cta-button').classList.add('show');
    }, 1100);
});

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Climate data simulation
function updateClimateData() {
    document.getElementById('co2-level').textContent = '421.3';
    document.getElementById('temperature').textContent = '+1.1';
    document.getElementById('ice-extent').textContent = '4.92';
}

// Initialize data
setTimeout(updateClimateData, 2000);