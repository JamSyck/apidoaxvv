document.addEventListener('DOMContentLoaded', () => {
    const girls = document.querySelectorAll('.girl');
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir un retraso basado en la posición del elemento
                entry.target.style.transitionDelay = `${index * 0.5}s`;
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Dejar de observar una vez que la animación ha comenzado
            }
        });
    }, {
        threshold: 0.1 // El umbral puede ser ajustado según la necesidad
    });
    girls.forEach(girl => {
        observer.observe(girl);
    });
});