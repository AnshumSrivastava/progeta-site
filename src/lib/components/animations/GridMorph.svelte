<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let canvas: HTMLCanvasElement;
  let rafId: number;

  interface Dot {
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    currentX: number;
    currentY: number;
    row: number;
    col: number;
    opacity: number;
    pulseOffset: number;
  }

  onMount(async () => {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth ?? 500;
    let height = parent?.clientHeight ?? 400;
    canvas.width = width;
    canvas.height = height;

    const cols = 20;
    const rows = 12;
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);
    const dots: Dot[] = [];
    const accentCol = cols - 3; // 3rd column from right

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          startX: Math.random() * width,
          startY: Math.random() * height,
          targetX: spacingX * (c + 1),
          targetY: spacingY * (r + 1),
          currentX: Math.random() * width,
          currentY: Math.random() * height,
          row: r,
          col: c,
          opacity: 0.4,
          pulseOffset: (r * cols + c) * 0.02,
        });
      }
    }

    // Morph animation
    const morphProxy = { progress: 0 };

    gsap.to(morphProxy, {
      progress: 1,
      duration: 1.4,
      ease: 'power2.inOut',
      delay: 0.3,
      onUpdate: () => {
        const p = morphProxy.progress;
        for (const dot of dots) {
          const stagger = dot.row * 0.02;
          const adjustedP = Math.max(0, Math.min(1, (p - stagger) / (1 - stagger * rows * 0.5)));
          dot.currentX = dot.startX + (dot.targetX - dot.startX) * adjustedP;
          dot.currentY = dot.startY + (dot.targetY - dot.startY) * adjustedP;
        }
      },
    });

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      for (const dot of dots) {
        // Pulse when morphed
        const pulse = 0.4 + 0.2 * Math.sin(time * 2 + dot.pulseOffset);
        const isAccent = dot.col === accentCol;

        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, 1, 0, Math.PI * 2);

        if (isAccent) {
          ctx.fillStyle = `rgba(192, 57, 43, ${pulse + 0.2})`;
        } else {
          ctx.fillStyle = `rgba(242, 240, 236, ${pulse})`;
        }
        ctx.fill();
      }

      if (document.visibilityState === 'visible') {
        rafId = requestAnimationFrame(draw);
      }
    }

    function resize() {
      width = parent?.clientWidth ?? 500;
      height = parent?.clientHeight ?? 400;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(rafId);
    }
  });
</script>

<canvas
  bind:this={canvas}
  class="grid-morph"
  aria-hidden="true"
></canvas>

<style>
  .grid-morph {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
</style>
