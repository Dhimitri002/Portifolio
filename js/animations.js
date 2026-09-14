window.observeAnimatedSections = function() {
  const elements = document.querySelectorAll('.animated');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  elements.forEach(el => observer.observe(el));
};
