<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let canvas: HTMLCanvasElement;
  let rafId: number;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let noiseOffset = 0;
    const gridSize = 80;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Noise texture
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      const step = 4; // sample every 4th pixel for performance
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const val = Math.random() * 255;
          for (let dy = 0; dy < step && y + dy < height; dy++) {
            for (let dx = 0; dx < step && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              data[idx] = val;
              data[idx + 1] = val;
              data[idx + 2] = val;
              data[idx + 3] = 4; // opacity ~0.015
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // Grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      noiseOffset += 0.0003;
    }

    function loop() {
      if (document.visibilityState === 'visible') {
        draw();
      }
      // Slow update — every ~100ms
      rafId = requestAnimationFrame(() => {
        setTimeout(() => {
          rafId = requestAnimationFrame(loop);
        }, 100);
      });
    }

    window.addEventListener('resize', resize, { passive: true });
    loop();

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
  class="noise"
  aria-hidden="true"
></canvas>

<style>
  .noise {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 1;
  }
</style>
