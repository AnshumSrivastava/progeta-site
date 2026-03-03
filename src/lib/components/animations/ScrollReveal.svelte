<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';

  let {
    delay = 0,
    distance = 22,
    duration = 600,
    direction = 'up',
    scale = 1,
    children,
  }: {
    delay?: number;
    distance?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    scale?: number;
    children?: Snippet;
  } = $props();

  let el: HTMLElement;
  let visible = $state(false);
  let observer: IntersectionObserver;

  const getTransform = () => {
    if (visible) return 'translate(0, 0) scale(1)';
    let x = 0, y = 0;
    if (direction === 'up') y = distance;
    if (direction === 'down') y = -distance;
    if (direction === 'left') x = distance;
    if (direction === 'right') x = -distance;
    return `translate(${x}px, ${y}px) scale(${scale})`;
  };

  onMount(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      visible = true;
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -35px 0px' }
    );
    observer.observe(el);
  });

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div
  bind:this={el}
  class="reveal"
  class:is-visible={visible}
  style="
    --delay: {delay}ms;
    --duration: {duration}ms;
    --transform-initial: {getTransform()};
  "
>
  {@render children?.()}
</div>

<style>
  .reveal {
    opacity: 0;
    transform: var(--transform-initial);
    transition:
      opacity var(--duration) cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
      transform var(--duration) cubic-bezier(0.16, 1, 0.3, 1) var(--delay);
    will-change: opacity, transform;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
</style>
