<script>
    import { onMount } from 'svelte';
    
    // Prop to accept dynamic skills [ { label: "Python", r: 6 }, ... ]
    export let skills = [];

    // Default nodes if no skills provided (Fallback / Home Page)
    const defaultNodes = [
        { label: "Network Sec", x: 20, y: 50, r: 6, drift: 0 },
        { label: "Leadership", x: 50, y: 20, r: 8, drift: 2 },
        { label: "Strategy", x: 80, y: 50, r: 7, drift: 4 },
        { label: "Python", x: 50, y: 80, r: 5, drift: 1.5 },
        { label: "Risk Ops", x: 35, y: 35, r: 5, drift: 3 },
        { label: "Forensics", x: 65, y: 65, r: 5, drift: 2.5 }
    ];

    // Merge logic: Map strings or objects to node structure
    let nodes = [];
    
    $: {
        if (skills && skills.length > 0) {
            // Generate positions for dynamic skills based on a simple layout algorithm
            nodes = skills.map((s, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                // Add some randomness to position to look organic but structured
                const distance = 25 + Math.random() * 20; 
                return {
                    label: typeof s === 'string' ? s : s.label,
                    r: typeof s === 'object' && s.r ? s.r : (5 + Math.random() * 3), // Varied radius
                    x: 50 + Math.cos(angle) * distance,
                    y: 50 + Math.sin(angle) * distance,
                    drift: Math.random() * 5
                };
            });
            // Add a center node if we have many skills
             nodes.push({ label: "Core", x: 50, y: 50, r: 8, drift: 1 });
        } else {
            nodes = defaultNodes;
        }
    }
    
    let time = 0;
    let frame;
    let hoveredNode = null;
    let mouseX = 0; 
    let mouseY = 0;

    onMount(() => {
        const animate = () => {
            time += 0.005; 
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    });

    function handleMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }
</script>

<div class="graph-container" on:mousemove={handleMouseMove} role="img" aria-label="Skill Graph">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <!-- Connections -->
        <g stroke="rgba(255,255,255,0.15)" stroke-width="0.5">
            {#each nodes as n, i}
                {#each nodes.slice(i + 1) as m}
                    {#if Math.hypot(n.x - m.x, n.y - m.y) < 50}
                        <line 
                            x1={n.x + Math.sin(time + n.drift) * 2} 
                            y1={n.y + Math.cos(time + n.drift) * 2} 
                            x2={m.x + Math.sin(time + m.drift) * 2} 
                            y2={m.y + Math.cos(time + m.drift) * 2} 
                            opacity={0.5}
                        />
                    {/if}
                {/each}
            {/each}
        </g>
        
        <!-- Nodes -->
        {#each nodes as n}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <g 
                transform="translate({n.x + Math.sin(time + n.drift) * 2}, {n.y + Math.cos(time + n.drift) * 2})"
                on:mouseover={() => hoveredNode = n}
                on:mouseout={() => hoveredNode = null}
                style="cursor: pointer;"
            >
                <circle r={n.r} fill={hoveredNode === n ? "var(--text-primary)" : "var(--accent-blue)"} transition:all />
                
                <!-- Pulse ring (only when not hovering others) -->
                {#if !hoveredNode || hoveredNode === n}
                    <circle r={n.r * 2} fill="none" stroke="var(--accent-blue)" stroke-width="0.2" opacity="0.3">
                        <animate attributeName="r" values="{n.r};{n.r * 2.5}" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite" />
                    </circle>
                {/if}
            </g>
        {/each}
    </svg>
    
    <!-- Floating Tooltip -->
    {#if hoveredNode}
        <div class="tooltip" style="top: {hoveredNode.y}%; left: {hoveredNode.x}%;">
            <div class="tooltip-label">{hoveredNode.label}</div>
            <div class="tooltip-meta">Proficiency: EXPERT</div>
        </div>
    {/if}

    <div class="overlay-stat">
        <span class="label">SKILL MOSAIC</span>
        <span class="value">{nodes === defaultNodes ? 'Interactive' : 'Track Specific'}</span>
    </div>
</div>

<style>
    .graph-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05), transparent 70%);
        border-radius: 12px;
        overflow: hidden;
    }
    
    svg { width: 100%; height: 100%; }
    
    .tooltip {
        position: absolute;
        transform: translate(-50%, -150%);
        background: rgba(10, 10, 10, 0.9);
        backdrop-filter: blur(8px);
        border: 1px solid var(--accent-blue);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        pointer-events: none;
        z-index: 10;
        text-align: center;
        width: max-content;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    
    .tooltip-label {
        color: var(--text-primary);
        font-weight: 700;
        font-size: 0.9rem;
    }
    
    .tooltip-meta {
        color: var(--accent-blue);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .overlay-stat {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        display: flex;
        flex-direction: column;
        pointer-events: none;
    }
    
    .label { font-size: 0.6rem; letter-spacing: 0.1em; color: var(--text-tertiary); }
    .value { font-size: 1.2rem; font-family: var(--font-display); font-weight: 700; color: var(--text-primary); }
</style>
