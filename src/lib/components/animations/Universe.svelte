<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let frameId: number;
  let mouse = { x: -9999, y: -9999 };
  let scrollY = 0;
  let width = 0;
  let height = 0;
  let prefersReducedMotion = false;
  let isVisible = true;

  /* ── CONFIG ─────────────────────────────────── */
  const GRID_STEP = 85;
  const CONNECTION_DIST = 85;
  const CONNECTION_MAX_ALPHA = 0.10;
  const REPULSION_RADIUS = 130;
  const REPULSION_STRENGTH = 0.04;
  const RETURN_STRENGTH = 0.012;
  const GRID_CURSOR_RADIUS = 50;

  const ACCENT_COLORS = ['#D35400', '#2980B9', '#1B5E20'];
  const INK_1 = '#F5F7FA';

  /* ── TYPES ──────────────────────────────────── */
  interface Particle {
    x: number; y: number;
    ox: number; oy: number;
    vx: number; vy: number;
    size: number;
    baseOpacity: number;
    opacity: number;
    phase: number;
    twinkleSpeed: number;
    isAccent: boolean;
    color: string;
  }

  interface ShootingStar {
    x: number; y: number;
    vx: number; vy: number;
    trail: { x: number; y: number }[];
    opacity: number;
    maxTrail: number;
  }

  let particles: Particle[] = [];
  let shootingStar: ShootingStar | null = null;
  let nextShootingStarAt = 0;

  /* ── PARTICLE INIT ─────────────────────────── */
  function getParticleCount(): number {
    const area = width * height;
    const calculated = Math.floor(area / 7000);
    const maxCount = width < 768 ? 80 : 200;
    return Math.min(calculated, maxCount);
  }

  function initParticles() {
    const count = getParticleCount();
    particles = [];
    for (let i = 0; i < count; i++) {
      const isAccent = Math.random() < 0.05;
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * (0.1 + Math.random() * 0.2),
        vy: (Math.random() - 0.5) * (0.1 + Math.random() * 0.2),
        size: isAccent ? (Math.random() * 1.5 + 1.5) : (Math.random() * 2 + 0.5),
        baseOpacity: Math.random() * 0.5 + 0.3,
        opacity: 0,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        isAccent,
        color: isAccent ? ACCENT_COLORS[Math.floor(Math.random() * 3)] : INK_1,
      });
    }
  }

  /* ── SHOOTING STAR ─────────────────────────── */
  function spawnShootingStar() {
    // Spawn from top or left edges, biased top-left
    const fromTop = Math.random() < 0.6;
    const x = fromTop ? Math.random() * width : 0;
    const y = fromTop ? 0 : Math.random() * height * 0.5;
    const angle = Math.random() * 0.6 + 0.3; // ~17-52 degrees toward bottom-right
    const speed = 4 + Math.random() * 4;

    shootingStar = {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      trail: [],
      opacity: 0.9,
      maxTrail: Math.floor(Math.random() * 8) + 20,
    };
  }

  function updateShootingStar() {
    if (!shootingStar || !ctx) return;
    const s = shootingStar;

    s.trail.unshift({ x: s.x, y: s.y });
    if (s.trail.length > s.maxTrail) s.trail.pop();

    s.x += s.vx;
    s.y += s.vy;
    s.opacity -= 0.012;

    if (s.opacity <= 0 || s.x > width + 50 || s.y > height + 50) {
      shootingStar = null;
      nextShootingStarAt = performance.now() + (5000 + Math.random() * 10000);
      return;
    }

    // Draw trail
    for (let i = 0; i < s.trail.length - 1; i++) {
      const t = 1 - i / s.trail.length;
      const a = t * s.opacity;
      const lw = t * 1.5 + 0.3;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(245, 247, 250, ${a})`;
      ctx.lineWidth = lw;
      ctx.moveTo(s.trail[i].x, s.trail[i].y);
      ctx.lineTo(s.trail[i + 1].x, s.trail[i + 1].y);
      ctx.stroke();
    }

    // Head glow
    const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
    grd.addColorStop(0, `rgba(245, 247, 250, ${s.opacity * 0.8})`);
    grd.addColorStop(1, `rgba(245, 247, 250, 0)`);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ── MAIN DRAW ─────────────────────────────── */
  function draw() {
    if (!ctx || !isVisible) {
      frameId = requestAnimationFrame(draw);
      return;
    }

    const w = width;
    const h = height;
    ctx.clearRect(0, 0, w, h);

    /* Layer A — Deep Nebulae */
    drawNebulae(w, h);

    /* Layer B — Structural Grid */
    drawGrid(w, h);

    /* Layer C+D — Particles & Connections */
    drawParticles(w, h);

    /* Layer E — Shooting Stars */
    if (!prefersReducedMotion) {
      if (shootingStar) {
        updateShootingStar();
      } else if (performance.now() > nextShootingStarAt) {
        spawnShootingStar();
      }
    }

    frameId = requestAnimationFrame(draw);
  }

  /* ── LAYER A: NEBULAE ──────────────────────── */
  function drawNebulae(w: number, h: number) {
    const scrollOffset = scrollY * 0.07;
    const nebulae = [
      { cx: w * 0.78, cy: h * 0.18 - scrollOffset * 0.5, color: '211, 84, 0' },    // Ember — top-right
      { cx: w * 0.15, cy: h * 0.50 + scrollOffset * 0.3, color: '41, 128, 185' },   // Blue — middle-left
      { cx: w * 0.55, cy: h * 0.82 - scrollOffset * 0.2, color: '27, 94, 32' },     // Green — bottom-centre
    ];
    const radius = Math.min(w, h) * 0.35;

    for (const nb of nebulae) {
      const grd = ctx!.createRadialGradient(nb.cx, nb.cy, 0, nb.cx, nb.cy, radius);
      grd.addColorStop(0, `rgba(${nb.color}, 0.04)`);
      grd.addColorStop(0.6, `rgba(${nb.color}, 0.015)`);
      grd.addColorStop(1, `rgba(${nb.color}, 0)`);
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, w, h);
    }
  }

  /* ── LAYER B: STRUCTURAL GRID ──────────────── */
  function drawGrid(w: number, h: number) {
    ctx!.strokeStyle = 'rgba(255, 255, 255, 0.018)';
    ctx!.lineWidth = 0.5;

    for (let x = 0; x < w; x += GRID_STEP) {
      ctx!.beginPath();
      ctx!.moveTo(x, 0);
      ctx!.lineTo(x, h);
      ctx!.stroke();
    }
    for (let y = 0; y < h; y += GRID_STEP) {
      ctx!.beginPath();
      ctx!.moveTo(0, y);
      ctx!.lineTo(w, y);
      ctx!.stroke();
    }

    // Cursor-proximity intersection dots
    if (mouse.x > -1000 && !prefersReducedMotion) {
      const nearestGridX = Math.round(mouse.x / GRID_STEP) * GRID_STEP;
      const nearestGridY = Math.round(mouse.y / GRID_STEP) * GRID_STEP;

      for (let gx = nearestGridX - GRID_STEP; gx <= nearestGridX + GRID_STEP; gx += GRID_STEP) {
        for (let gy = nearestGridY - GRID_STEP; gy <= nearestGridY + GRID_STEP; gy += GRID_STEP) {
          const dx = mouse.x - gx;
          const dy = mouse.y - gy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GRID_CURSOR_RADIUS * 2.5) {
            const t = 1 - dist / (GRID_CURSOR_RADIUS * 2.5);
            const alpha = t * 0.35;

            // Intersection dot
            ctx!.beginPath();
            ctx!.fillStyle = `rgba(245, 247, 250, ${alpha})`;
            ctx!.arc(gx, gy, 1.5, 0, Math.PI * 2);
            ctx!.fill();

            // Cardinal lines (20px)
            const lineLen = 20 * t;
            ctx!.strokeStyle = `rgba(245, 247, 250, ${alpha * 0.6})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(gx - lineLen, gy); ctx!.lineTo(gx + lineLen, gy);
            ctx!.moveTo(gx, gy - lineLen); ctx!.lineTo(gx, gy + lineLen);
            ctx!.stroke();
          }
        }
      }
    }
  }

  /* ── LAYER C+D: PARTICLES & CONNECTIONS ────── */
  function drawParticles(w: number, h: number) {
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      const p = particles[i];

      if (!prefersReducedMotion) {
        // Twinkle
        p.phase += p.twinkleSpeed;
        p.opacity = p.baseOpacity * (0.7 + 0.3 * Math.sin(p.phase));

        // Drift
        p.ox += p.vx;
        p.oy += p.vy;

        // Wrap
        if (p.ox < 0) p.ox = w;
        if (p.ox > w) p.ox = 0;
        if (p.oy < 0) p.oy = h;
        if (p.oy > h) p.oy = 0;

        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPULSION_RADIUS * REPULSION_RADIUS && mouse.x > -1000) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS * REPULSION_STRENGTH;
          p.x -= Math.cos(angle) * force * 50;
          p.y -= Math.sin(angle) * force * 50;
        } else {
          p.x += (p.ox - p.x) * RETURN_STRENGTH;
          p.y += (p.oy - p.y) * RETURN_STRENGTH;
        }
      } else {
        p.opacity = p.baseOpacity;
        p.x = p.ox;
        p.y = p.oy;
      }

      // Connections (Layer D) — using squared distance
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = p.y - p2.y;
        const cdSq = cdx * cdx + cdy * cdy;

        if (cdSq < CONNECTION_DIST * CONNECTION_DIST) {
          const cd = Math.sqrt(cdSq);
          const alpha = (1 - cd / CONNECTION_DIST) * CONNECTION_MAX_ALPHA;
          const useAccent = p.isAccent || p2.isAccent;

          ctx!.beginPath();
          if (useAccent) {
            const ac = p.isAccent ? p.color : p2.color;
            ctx!.strokeStyle = ac;
            ctx!.globalAlpha = alpha * 1.3;
          } else {
            ctx!.strokeStyle = INK_1;
            ctx!.globalAlpha = alpha;
          }
          ctx!.lineWidth = 0.4;
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.stroke();
          ctx!.globalAlpha = 1;
        }
      }

      // Accent particle glow
      if (p.isAccent) {
        const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9);
        grd.addColorStop(0, p.color);
        grd.addColorStop(1, `rgba(0,0,0,0)`);
        ctx!.fillStyle = grd;
        ctx!.globalAlpha = p.opacity * 0.15;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      // Draw particle
      ctx!.beginPath();
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = p.opacity;
      ctx!.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }
  }

  /* ── LIFECYCLE ─────────────────────────────── */
  function handleResize() {
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
    initParticles();
  }

  function handleMouseMove(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function handleScroll() {
    scrollY = window.scrollY;
  }

  function handleVisibility() {
    isVisible = document.visibilityState === 'visible';
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ctx = canvas.getContext('2d');
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    nextShootingStarAt = performance.now() + 3000 + Math.random() * 7000;
    draw();
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(frameId);
    }
  });
</script>

<canvas
  bind:this={canvas}
  class="universe-canvas"
  style="width: {width}px; height: {height}px;"
  aria-hidden="true"
></canvas>

<style>
  .universe-canvas {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: var(--ground);
    pointer-events: none;
  }
</style>
