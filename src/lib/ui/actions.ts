/**
 * Svelte Action for Scroll Reveal Animation
 * Blueprint: Elements slide up 24px + fade in, 0.4s ease-out, 0.08s stagger
 * Usage: <div use:reveal={{ delay: 200 }}>
 */
export function reveal(node: HTMLElement, options: { delay?: number, key?: string } = {}) {
    const { delay = 0 } = options;

    node.style.opacity = '0';
    node.style.transform = 'translateY(24px)';
    node.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(node);

    return {
        update(newOptions: { delay?: number, key?: string }) {
            // Re-trigger animation on key change
            node.style.opacity = '0';
            node.style.transform = 'translateY(24px)';
            node.style.transitionDelay = `${newOptions.delay || 0}ms`;
            requestAnimationFrame(() => {
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
            });
        },
        destroy() {
            observer.disconnect();
        }
    };
}

/**
 * Stagger reveal — applies staggered reveal to child elements
 * Usage: <div use:staggerReveal={{ stagger: 80 }}>
 */
export function staggerReveal(node: HTMLElement, options: { stagger?: number, selector?: string } = {}) {
    const { stagger = 80, selector = ':scope > *' } = options;
    const children = node.querySelectorAll(selector);

    children.forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        el.style.transitionDelay = `${i * stagger}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                children.forEach((child) => {
                    const el = child as HTMLElement;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
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
 * Legacy stubs — these actions were removed in the design rebuild.
 * Kept as no-ops so existing unrebuilt pages don't crash on import.
 */
export function hoverLift(node: HTMLElement, _options: any = {}) {
    return { destroy() { } };
}

export function tilt(node: HTMLElement, _options: any = {}) {
    return { destroy() { } };
}

export function shimmer(node: HTMLElement) {
    return { destroy() { } };
}
