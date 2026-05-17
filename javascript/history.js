(function() {
    function initHistoryPage() {
        console.log('📜 Inicializando página de Historia...');
        initializeTimeline();
    }

    function initializeTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    window.initHistoryPage = initHistoryPage;
})();
