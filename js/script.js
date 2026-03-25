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