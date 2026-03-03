<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';

  let {
    duration = 1.0,
    delay = 0,
    color = 'var(--ink-2)',
    strokeWidth = 1,
    children,
  }: {
    duration?: number;
    delay?: number;
    color?: string;
    strokeWidth?: number;
    children?: Snippet;
  } = $props();

  let el: HTMLElement;
  let observer: IntersectionObserver;

  onMount(async () => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animatePaths();
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  });

  async function animatePaths() {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap;

    const paths = el.querySelectorAll('path, line, polyline, circle, rect, ellipse');
    paths.forEach((path, i) => {
      const svgPath = path as SVGGeometryElement;
      if (svgPath.getTotalLength) {
        const length = svgPath.getTotalLength();
        gsap.set(svgPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
          stroke: color,
          strokeWidth,
          fill: 'none',
        });
        gsap.to(svgPath, {
          strokeDashoffset: 0,
          duration,
          delay: delay + i * 0.1,
          ease: 'power2.inOut',
        });
      }
    });
  }

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div class="line-drawing" bind:this={el}>
  {@render children?.()}
</div>

<style>
  .line-drawing {
    display: inline-block;
  }
</style>
