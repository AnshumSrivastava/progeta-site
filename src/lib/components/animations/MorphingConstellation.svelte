<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let width = 0;
  let height = 0;
  let rafId: number;

  const NODE_COUNT = 64; // Enough nodes to form detailed shapes
  const CONNECT_DIST = 45; // Distance to draw lines between nodes

  interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    pulse: number;
    targetX: number | null;
    targetY: number | null;
    baseX: number;
    baseY: number;
  }

  let nodes: Node[] = [];
  let currentShapeIndex = -1;
  let shapeTimer: ReturnType<typeof setInterval>;

  // Shapes defined on a 100x100 grid, will be scaled to canvas size
  const shapes = [
    // 0: Logo (Abstract P/T geometric shape)
    [
      {x: 30, y: 20}, {x: 50, y: 20}, {x: 70, y: 20},
      {x: 30, y: 40}, {x: 50, y: 40}, {x: 70, y: 40},
      {x: 30, y: 60}, {x: 50, y: 60},
      {x: 30, y: 80},
      {x: 70, y: 60}, {x: 70, y: 80},
      {x: 50, y: 50}
    ],
    // 1: Code (</>)
    [
      {x: 20, y: 50}, {x: 35, y: 30}, {x: 35, y: 70}, // <
      {x: 65, y: 80}, {x: 45, y: 20},                 // /
      {x: 80, y: 50}, {x: 65, y: 30}, {x: 65, y: 70}  // >
    ],
    // 2: Shield/Skill (Security/Competence)
    [
      {x: 50, y: 15}, {x: 25, y: 25}, {x: 75, y: 25}, // top
      {x: 25, y: 50}, {x: 75, y: 50},                 // sides
      {x: 35, y: 75}, {x: 65, y: 75},                 // bottom curve
      {x: 50, y: 85},                                 // point
      {x: 50, y: 40}, {x: 50, y: 60}                  // inner line
    ],
    // 3: Hierarchy/Network (Node system)
    [
      {x: 50, y: 20},
      {x: 25, y: 50}, {x: 75, y: 50},
      {x: 15, y: 80}, {x: 35, y: 80}, {x: 65, y: 80}, {x: 85, y: 80},
      {x: 50, y: 40}
    ],
    // 4: Hammer/Build
    [
      {x: 70, y: 30}, {x: 85, y: 20}, {x: 90, y: 35}, {x: 75, y: 45}, // head right
      {x: 60, y: 20}, {x: 50, y: 30}, // head left
      {x: 65, y: 35}, {x: 30, y: 70}, {x: 20, y: 80}, {x: 30, y: 90}, {x: 40, y: 80}, {x: 75, y: 45} // handle
    ]
  ];

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
      nodes.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 1,
        pulse: Math.random() * Math.PI * 2,
        targetX: null,
        targetY: null
      });
    }
  }

  function pickShape() {
    currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
    const shape = shapes[currentShapeIndex];
    
    // Some nodes form the shape, the rest drift
    // We map shape points to specific nodes
    const size = Math.min(width, height) * 1.5; // Increased scale factor to 1.5 per request
    const offsetX = (width - size) / 2;
    const offsetY = (height - size) / 2;

    // Shuffle nodes so different particles form the shape each time
    const shuffledNodes = [...nodes].sort(() => Math.random() - 0.5);

    // Map shape points to the first N nodes
    for (let i = 0; i < shape.length; i++) {
        if (i < shuffledNodes.length) {
            const point = shape[i];
            // 0-100 coordinates to actual canvas coordinates
            shuffledNodes[i].targetX = (point.x / 100) * size + offsetX;
            shuffledNodes[i].targetY = (point.y / 100) * size + offsetY;
        }
    }

    // Set remaining nodes to random drift (target = null)
    for (let i = shape.length; i < shuffledNodes.length; i++) {
        shuffledNodes[i].targetX = null;
        shuffledNodes[i].targetY = null;
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Update nodes
    for (const n of nodes) {
      if (n.targetX !== null && n.targetY !== null) {
        // Move towards target smoothly (lerp)
        const dx = n.targetX - n.x;
        const dy = n.targetY - n.y;
        n.x += dx * 0.05; // 5% approach per frame to form shape
        n.y += dy * 0.05;
        
        // Add tiny wobble even when in shape
        n.x += (Math.random() - 0.5) * 0.5;
        n.y += (Math.random() - 0.5) * 0.5;
      } else {
        // Random drift for background particles
        n.x += n.vx;
        n.y += n.vy;

        // Bounce off walls
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      n.pulse += 0.02;
    }

    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        
        // Draw lines. If both nodes are part of the target shape, draw a stronger line between them
        const isShapeLine = n1.targetX !== null && n2.targetX !== null;
        const currentConnectDist = isShapeLine ? CONNECT_DIST * 1.5 : CONNECT_DIST;

        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < currentConnectDist) {
          const alpha = (1 - dist / currentConnectDist) * (isShapeLine ? 0.7 : 0.25);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245, 247, 250, ${alpha})`; // Whiter color instead of greyish
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // Draw node dots
    for (const n of nodes) {
      const glow = Math.sin(n.pulse) * 0.3 + 0.7;
      const isTarget = n.targetX !== null;

      ctx.beginPath();
      // Target nodes are slightly brighter and use the accent color randomly or white
      ctx.fillStyle = isTarget ? `rgba(245, 247, 250, ${glow * 0.9})` : `rgba(245, 247, 250, ${glow * 0.4})`;
      ctx.arc(n.x, n.y, isTarget ? n.size * 1.5 : n.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle glow for target nodes
      if (isTarget) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(211, 84, 0, ${glow * 0.15})`; // Accent orange glow
          ctx.arc(n.x, n.y, n.size * 4, 0, Math.PI * 2);
          ctx.fill();
      }
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
    if (nodes.length === 0) {
        initNodes();
        pickShape();
        // Morph every 4 seconds
        shapeTimer = setInterval(pickShape, 4000);
    }
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
      clearInterval(shapeTimer);
    }
  });
</script>

<div class="morphing-constellation" bind:this={container}>
  <canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>
</div>

<style>
  .morphing-constellation {
    width: 100%;
    height: 100%;
    min-height: 400px;
    opacity: 0.9;
  }
</style>
