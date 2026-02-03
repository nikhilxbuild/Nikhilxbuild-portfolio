document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.section-title, .description, .skill-card, .project-card, .social-links, .cta-buttons');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Mouse move glow effect for project cards
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(168, 85, 247, 0.1), #050505)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '#050505';
        });
    });
});
