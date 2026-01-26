/**
 * Svelte Action for Scroll Reveal Animation
 * Usage: <div use:reveal={{ delay: 200, duration: 800 }}>
 */
export function reveal(node: HTMLElement, options: { delay?: number, duration?: number, y?: number } = {}) {
    const { delay = 0, duration = 800, y = 30 } = options;

    // Initial State
    node.style.opacity = '0';
    node.style.transform = `translateY(${y}px)`;
    node.style.transition = `opacity ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1), transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
    node.style.transitionDelay = `${delay}ms`;
    node.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
                observer.unobserve(node);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}

/**
 * 3D Tilt Effect on Hover
 * Usage: <div use:tilt>
 */
export function tilt(node: HTMLElement, options: { max?: number, scale?: number, speed?: number } = {}) {
    const { max = 15, scale = 1.05, speed = 400 } = options;

    node.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    node.style.transformStyle = 'preserve-3d';

    function handleMouseMove(e: MouseEvent) {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -max;
        const rotateY = ((x - centerX) / centerX) * max;

        node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    }

    function handleMouseLeave() {
        node.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    }

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return {
        destroy() {
            node.removeEventListener('mousemove', handleMouseMove);
            node.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}
