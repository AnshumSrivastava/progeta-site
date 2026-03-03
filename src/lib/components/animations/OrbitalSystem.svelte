<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let container: HTMLElement;
  let visible = $state(false);
  let observer: IntersectionObserver;

  const orbits = [
    { radius: 80, dots: 1, speed: 8, dotSize: 4 },
    { radius: 140, dots: 2, speed: 12, dotSize: 3 },
    { radius: 200, dots: 3, speed: 18, dotSize: 2 },
  ];

  onMount(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.unobserve(container);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(container);
  });

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div class="orbital" bind:this={container}>
  <svg class="orbital__svg" viewBox="-250 -250 500 500">
    <!-- Orbit rings -->
    {#each orbits as orbit, i}
      <circle
        r={orbit.radius}
        fill="none"
        stroke="var(--border-2)"
        stroke-width="1"
        class="orbital__ring"
        class:orbital__ring--visible={visible}
        style="--draw-delay: {i * 0.3}s"
        stroke-dasharray={2 * Math.PI * orbit.radius}
        stroke-dashoffset={visible ? 0 : 2 * Math.PI * orbit.radius}
      />
    {/each}

    <!-- Orbiting dots -->
    {#if visible}
      {#each orbits as orbit, oi}
        {#each Array(orbit.dots) as _, di}
          <circle
            r={orbit.dotSize}
            fill="rgba(242, 240, 236, 0.7)"
            class="orbital__dot"
            style="
              --orbit-radius: {orbit.radius}px;
              --orbit-speed: {orbit.speed}s;
              --orbit-offset: {(di / orbit.dots) * 360}deg;
            "
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="{(di / orbit.dots) * 360} 0 0"
              to="{(di / orbit.dots) * 360 + 360} 0 0"
              dur="{orbit.speed}s"
              repeatCount="indefinite"
            />
            <animateMotion
              dur="{orbit.speed}s"
              repeatCount="indefinite"
              begin="{(di / orbit.dots) * orbit.speed}s"
            >
              <mpath>
                <circle r={orbit.radius} fill="none"/>
              </mpath>
            </animateMotion>
          </circle>
        {/each}
      {/each}
    {/if}

    <!-- Centre glow -->
    <circle r="2" fill="white" class="orbital__center">
      {#if visible}
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      {/if}
    </circle>
    <circle
      r="8"
      fill="none"
      stroke="rgba(26, 86, 219, 0.4)"
      stroke-width="1"
      class="orbital__center-glow"
    />
  </svg>
</div>

<style>
  .orbital {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .orbital__svg {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;
  }
  .orbital__ring {
    transition: stroke-dashoffset 1.2s ease-in-out;
    transition-delay: var(--draw-delay, 0s);
  }
  .orbital__dot {
    animation: orbitSpin var(--orbit-speed) linear infinite;
    transform-origin: 0 0;
  }

  @keyframes orbitSpin {
    from { transform: rotate(var(--orbit-offset, 0deg)) translateX(var(--orbit-radius)); }
    to { transform: rotate(calc(var(--orbit-offset, 0deg) + 360deg)) translateX(var(--orbit-radius)); }
  }

  .orbital__center {
    filter: drop-shadow(0 0 12px rgba(26, 86, 219, 0.4));
  }
  .orbital__center-glow {
    opacity: 0.4;
  }

  /* Simple orbit implementation using CSS transforms */
  .orbital__dot {
    animation: none; /* Disable CSS animation, use SVG animateTransform below */
  }
</style>
