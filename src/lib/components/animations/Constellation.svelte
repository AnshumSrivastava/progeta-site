<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let width = 0;
  let height = 0;
  let rafId: number;

  const NODE_COUNT = 24;
  const CONNECT_DIST = 150;

  interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    pulse: number;
  }

  let nodes: Node[] = [];

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Update and draw connections
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(180, 185, 200, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // Update and draw nodes
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      n.pulse += 0.02;
      const glow = Math.sin(n.pulse) * 0.3 + 0.7;

      ctx.beginPath();
      ctx.fillStyle = `rgba(245, 247, 250, ${glow * 0.6})`;
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle glow
      ctx.beginPath();
      ctx.fillStyle = `rgba(245, 247, 250, ${glow * 0.1})`;
      ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  }

  function resize() {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
    initNodes();
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    draw();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    }
  });
</script>

<div class="constellation" bind:this={container}>
  <canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>
</div>

<style>
  .constellation {
    width: 100%;
    height: 100%;
    min-height: 400px;
    opacity: 0.8;
  }
</style>
