document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slideshow');
    if (!container) return;

    const slides = container.querySelectorAll('.slide');
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    let i = 0;

    function show(index) {
        slides.forEach((s, idx) => s.classList.toggle('active', idx === index));
    }

    function nextSlide() {
        i = (i + 1) % slides.length;
        show(i);
    }

    function prevSlide() {
        i = (i - 1 + slides.length) % slides.length;
        show(i);
    }

    if (next) next.addEventListener('click', nextSlide);
    if (prev) prev.addEventListener('click', prevSlide);

    // show the first slide initially
    show(i);
});
