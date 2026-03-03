<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let {
    target,
    duration = 1.5,
    suffix = '',
    prefix = '',
  }: {
    target: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
  } = $props();

  let el: HTMLElement;
  let displayValue = $state('0');
  let observer: IntersectionObserver;

  onMount(async () => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCount();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
  });

  async function startCount() {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap;

    const proxy = { value: 0 };
    gsap.to(proxy, {
      value: target,
      duration,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => {
        displayValue = Math.round(proxy.value).toLocaleString('en-IN');
      },
    });
  }

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<span class="count-up" bind:this={el}>
  {prefix}{displayValue}{suffix}
</span>

<style>
  .count-up {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-2xl);
    color: var(--ink-1);
    line-height: var(--leading-tight);
    display: inline-block;
  }
</style>
