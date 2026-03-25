// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Video filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const videoCards = document.querySelectorAll('.video-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        videoCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Watch button functionality (placeholder)
const watchButtons = document.querySelectorAll('.watch-btn');
watchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoTitle = button.parentElement.querySelector('h3').textContent;
        alert(`Playing: ${videoTitle}\n\nThis is a placeholder. In a real implementation, this would open a video player or redirect to a video hosting platform.`);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('mobile-menu-active');
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
@media (max-width: 768px) {
    nav ul.mobile-menu-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.9);
        padding: 1rem 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Placeholder for future video hosting integration
const videoLibrary = {
    // Structure for storing video data
    videos: [
        {
            id: 1,
            title: "Perfect Punch Technique",
            category: "techniques",
            thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Master the fundamental punching techniques used in karate, focusing on speed, power, and accuracy.",
            videoUrl: "https://www.youtube.com/watch?v=placeholder1" // Placeholder for YouTube or private video
        },
        // Add more video objects here
    ],

    // Method to load videos dynamically
    loadVideos: function(category = 'all') {
        // This would be used to dynamically populate the video grid
        console.log(`Loading videos for category: ${category}`);
    },

    // Method to play video
    playVideo: function(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (video) {
            // In a real implementation, this would open a video player
            window.open(video.videoUrl, '_blank');
        }
    }
};

// Export for potential future use
window.videoLibrary = videoLibrary;

// Hero Animation
class HeroAnimation {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mistParticles = [];
        this.sparks = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        
        this.resize();
        this.initParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    initParticles() {
        // Snow particles falling from top
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 2 + 1,
                size: Math.random() * 3 + 1,
                alpha: Math.random() * 0.8 + 0.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
        
        // Mist particles (now like fog in snow)
        for (let i = 0; i < 20; i++) {
            this.mistParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                size: Math.random() * 30 + 20,
                alpha: Math.random() * 0.05 + 0.02
            });
        }
        
        // Sparks now like glowing snow crystals or energy particles
        for (let i = 0; i < 30; i++) {
            this.sparks.push({
                x: this.canvas.width / 2 + (Math.random() - 0.5) * 300,
                y: this.canvas.height / 2 + (Math.random() - 0.5) * 300,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random() * 200 + 100,
                maxLife: Math.random() * 200 + 100,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 180}, 100%, ${Math.random() * 30 + 70}%)`
            });
        }
    }
    
    updateParticles() {
        // Update snow particles
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            
            // Wind effect based on mouse
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                p.vx += dx * 0.00005;
                p.vy += dy * 0.00005;
            }
            
            if (p.y > this.canvas.height + 10) {
                p.y = -10;
                p.x = Math.random() * this.canvas.width;
                p.vx = (Math.random() - 0.5) * 0.5;
            }
            
            // Wrap around horizontally
            if (p.x < -10) p.x = this.canvas.width + 10;
            if (p.x > this.canvas.width + 10) p.x = -10;
        });
        
        // Update mist particles (fog)
        this.mistParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < -p.size) p.x = this.canvas.width + p.size;
            if (p.x > this.canvas.width + p.size) p.x = -p.size;
            if (p.y < -p.size) p.y = this.canvas.height + p.size;
            if (p.y > this.canvas.height + p.size) p.y = -p.size;
        });
        
        // Update energy crystals/sparks
        this.sparks.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.life--;
            
            if (s.life <= 0) {
                s.x = this.canvas.width / 2 + (Math.random() - 0.5) * 300;
                s.y = this.canvas.height / 2 + (Math.random() - 0.5) * 300;
                s.vx = (Math.random() - 0.5) * 2;
                s.vy = (Math.random() - 0.5) * 2;
                s.life = s.maxLife;
            }
            
            // Add some swirling effect
            const angle = this.time * 0.005 + s.x * 0.005;
            s.vx += Math.cos(angle) * 0.005;
            s.vy += Math.sin(angle) * 0.005;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw fog (behind everything)
        this.ctx.globalCompositeOperation = 'source-over';
        this.mistParticles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw snow particles
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowBlur = 5;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw energy crystals/sparks
        this.ctx.globalCompositeOperation = 'screen';
        this.sparks.forEach(s => {
            const alpha = s.life / s.maxLife;
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = s.color;
            this.ctx.shadowColor = s.color;
            this.ctx.shadowBlur = 20;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    animate() {
        this.time++;
        this.updateParticles();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize hero animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroAnimation();
});