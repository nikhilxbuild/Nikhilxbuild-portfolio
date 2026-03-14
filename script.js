const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
});

const loop = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(loop);
};
requestAnimationFrame(loop);

const interactables = document.querySelectorAll('a, button, .social-btn, .tech-item');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

const duration = 1600;
const loader = document.getElementById('loader');
const progressEl = document.getElementById('loaderProgress');
const chars = document.querySelectorAll('.loader-char');
let startTime = null;

function animateLoader(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    progressEl.style.width = `${progress * 100}%`;
    
    const charIndex = Math.floor(progress * chars.length);
    for(let i=0; i<chars.length; i++) {
        if(i <= charIndex && chars[i].style.opacity !== "1") {
            chars[i].style.opacity = 1;
            chars[i].style.transform = "translateY(0)";
            chars[i].style.transition = "opacity 0.2s, transform 0.2s";
        }
    }
    
    if (progress < 1) {
        requestAnimationFrame(animateLoader);
    } else {
        loader.style.opacity = 0;
        loader.style.visibility = "hidden";
        document.body.classList.remove('loading');
        
        document.querySelectorAll('.rev').forEach(el => {
            el.classList.add('in');
        });
        
        setTimeout(() => {
            loader.style.display = 'none';
            initScrollReveal();
        }, 500);
    }
}
requestAnimationFrame(animateLoader);

function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.rev').forEach(el => el.classList.add('in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.rev').forEach(el => {
        observer.observe(el);
    });
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.menu-link');

hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
});
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
    });
});

const timelineContainer = document.getElementById('timelineContainer');
const timelineProgress = document.getElementById('timelineProgress');
const timelineItems = document.querySelectorAll('.timeline-item');

window.addEventListener('scroll', () => {
    if(!timelineContainer) return;
    
    const rect = timelineContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const start = viewportHeight / 2;
    let progress = 0;
    
    if (rect.top < start) {
        progress = (start - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));
        timelineProgress.style.height = `${progress * 100}%`;
    } else {
        timelineProgress.style.height = '0%';
    }

    timelineItems.forEach((item) => {
        const dot = item.querySelector('.timeline-dot');
        const dotRect = dot.getBoundingClientRect();
        const lineBottom = timelineProgress.getBoundingClientRect().bottom;

        if (lineBottom >= dotRect.top + dotRect.height / 2) {
            item.classList.add('active');
        } else if(item !== timelineItems[0]) {
            item.classList.remove('active');
        }
    });
});
