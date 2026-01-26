<script>
    import { spring } from 'svelte/motion';
    
    export let href = null;
    export let variant = 'primary'; // primary, outline
    
    let el;
    // Spring physics for smooth, non-wavy movement
    const coords = spring({ x: 0, y: 0 }, {
        stiffness: 0.15,
        damping: 0.4
    });
    
    function handleMouseMove(e) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center of button
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;
        
        // Apply magnetic pull (dampened)
        coords.set({ x: offsetX * 0.2, y: offsetY * 0.2 });
    }
    
    function handleMouseLeave() {
        coords.set({ x: 0, y: 0 });
    }
</script>

{#if href}
    <a 
        {href} 
        class="mag-btn {variant}" 
        bind:this={el} 
        style="transform: translate({$coords.x}px, {$coords.y}px)"
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        role="button"
        tabindex="0"
    >
        <span class="content"><slot /></span>
        <div class="fill"></div>
    </a>
{:else}
    <button 
        class="mag-btn {variant}" 
        bind:this={el} 
        style="transform: translate({$coords.x}px, {$coords.y}px)"
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        on:click
    >
        <span class="content"><slot /></span>
        <div class="fill"></div>
    </button>
{/if}

<style>
    .mag-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2.5rem;
        border-radius: 100px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        /* Remove transform transition to let Spring handle physics */
        transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        overflow: hidden;
        z-index: 1;
        border: 1px solid transparent;
        font-family: var(--font-body);
        will-change: transform;
    }
    
    .mag-btn.primary {
        background: var(--text-primary);
        color: var(--bg-void);
    }
    
    .mag-btn.outline {
        background: transparent;
        border-color: var(--glass-border);
        color: var(--text-primary);
    }
    
    .content {
        position: relative;
        z-index: 2;
        pointer-events: none;
    }
    
    /* Subtle scale on hover, separate from magnetic move */
    .mag-btn:hover {
        /* We don't scale here to avoid conflict with transform translate */
        /* Instead we can scale the content or change the background */
        background-color: var(--glass-highlight);
    }
    
    .mag-btn.primary:hover {
        background-color: #ffffff; /* Brighter white */
        box-shadow: 0 0 20px rgba(255,255,255,0.4);
    }
</style>
