<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let {
    count,
    connectionDistance = 120,
    maxConnectionOpacity = 0.15,
    interactive = true,
  }: {
    count?: number;
    connectionDistance?: number;
    maxConnectionOpacity?: number;
    interactive?: boolean;
  } = $props();

  let canvas: HTMLCanvasElement;
  let rafId: number;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    let height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const particleCount = count ?? (isMobile ? 40 : 100);
    let mouseX = -1000;
    let mouseY = -1000;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    let frameCount = 0;

    function handleMouseMove(e: MouseEvent) {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function resize() {
      width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      frameCount++;
      // Skip frames on mobile
      if (isMobile && frameCount % 2 !== 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Mouse repulsion (desktop only)
        if (!isMobile && interactive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200 * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.5) {
          p.vx = (p.vx / speed) * 0.5;
          p.vy = (p.vy / speed) * 0.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 240, 236, ${p.opacity})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * maxConnectionOpacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(242, 240, 236, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (document.visibilityState === 'visible') {
        rafId = requestAnimationFrame(draw);
      }
    }

    if (!isMobile && interactive) {
      canvas.parentElement?.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('resize', resize, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
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
  class="particle-field"
  aria-hidden="true"
></canvas>

<style>
  .particle-field {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
</style>
