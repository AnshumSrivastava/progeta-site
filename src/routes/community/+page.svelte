<script>
    import { onMount } from "svelte";

    /** @type {Array<{id: number, x: number, y: number, size: number, duration: number, delay: number, opacity: number, blur: number}>} */
    let particles = [];
    const COUNT = 60;

    onMount(() => {
        // Generate random particles
        particles = Array.from({ length: COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // vw
            y: Math.random() * 100, // vh
            size: Math.random() * 4 + 1, // rem
            duration: Math.random() * 10 + 10, // 10-20s
            delay: Math.random() * -20, // start mid-animation
            opacity: Math.random() * 0.3 + 0.05,
            blur: Math.random() * 4,
        }));
    });
</script>

<svelte:head>
    <title>Void | Coming Soon</title>
</svelte:head>

<div class="abyss-container">
    <!-- PARTICLES -->
    {#each particles as p (p.id)}
        <div
            class="particle"
            style="
                left: {p.x}vw;
                top: {p.y}vh;
                font-size: {p.size}rem;
                opacity: {p.opacity};
                filter: blur({p.blur}px);
                animation-duration: {p.duration}s;
                animation-delay: {p.delay}s;
            "
        >
            ?
        </div>
    {/each}

    <!-- CONTENT -->
    <div class="content-void">
        <h1 class="glitch" data-text="COMING SOON">COMING SOON</h1>
        <p class="sub-void">The extraction protocol is under maintenance.</p>

        <a href="/" class="btn-void">
            <span class="icon">←</span> GO BACK
        </a>
    </div>
</div>

<style>
    :root {
        --void-bg: #030303;
        --void-text: #e5e5e5;
        --void-accent: #333;
    }

    .abyss-container {
        position: fixed;
        inset: 0;
        background: var(--void-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        user-select: none;
        z-index: 9999; /* Above everything */
    }

    /* PARTICLES */
    .particle {
        position: absolute;
        color: #fff;
        font-family: "Times New Roman", serif;
        font-weight: bold;
        pointer-events: none;
        animation: float infinite linear;
    }

    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        33% {
            transform: translateY(-20px) rotate(10deg);
        }
        66% {
            transform: translateY(20px) rotate(-10deg);
        }
        100% {
            transform: translateY(0) rotate(0deg);
        }
    }

    /* CONTENT */
    .content-void {
        position: relative;
        z-index: 10;
        text-align: center;
        width: 100%;
        max-width: 600px;
    }

    h1 {
        font-family: "Inter", sans-serif;
        font-weight: 900;
        font-size: 5rem;
        letter-spacing: -0.05em;
        color: #fff;
        margin-bottom: 20px;
        position: relative;
        display: inline-block;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .sub-void {
        font-family: "JetBrains Mono", monospace;
        font-size: 1rem;
        color: #666;
        margin-bottom: 40px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    /* ACTION */
    .btn-void {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        padding: 16px 32px;
        border-radius: 100px;
        text-decoration: none;
        font-family: "Inter", sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: 0.3s;
    }
    .btn-void:hover {
        background: #fff;
        color: #000;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }
    .icon {
        font-size: 1.1rem;
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 3rem;
        }
    }
</style>
