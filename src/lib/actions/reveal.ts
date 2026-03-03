export function reveal(node: HTMLElement, { delay = 0, distance = 20, duration = 600, stagger = 0 } = {}) {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return { destroy() { } };

    node.style.opacity = '0';
    node.style.transform = `translateY(${distance}px)`;
    node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (stagger > 0 && node.parentNode) {
                // Find index among siblings with same action
                const siblings = Array.from(node.parentNode.children).filter(el => el.hasAttribute('data-reveal'));
                const index = siblings.indexOf(node);
                const actualDelay = delay + (index * stagger);
                node.style.transitionDelay = `${actualDelay}ms`;
            }

            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
            node.setAttribute('data-revealed', 'true');
            observer.disconnect();
        }
    }, { rootMargin: '0px 0px -50px 0px' });

    node.setAttribute('data-reveal', 'true');
    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
