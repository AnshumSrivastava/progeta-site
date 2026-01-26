<script>
    import { reveal, tilt } from "$lib/ui/actions";
    import MagneticButton from "$lib/ui/components/MagneticButton.svelte";
    import TrackGrid from "$lib/ui/components/TrackGrid.svelte";
    import Card from "$lib/ui/components/Card.svelte";
    import ContactForm from "$lib/ui/components/ContactForm.svelte";
    import { onMount } from "svelte";

    // Data Imports
    import { games } from "$lib/content/games";
    import { articles } from "$lib/content/articles";

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    // Data Slicing
    const featureArticles = articles.slice(0, 2);

    // Mouse tracking helper (Fog effect)
    function trackMouse(e) {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--local-x", `${x}px`);
        target.style.setProperty("--local-y", `${y}px`);
    }
</script>

<svelte:head>
    <title>Progeta Technologies | Elite Professional Mastery</title>
</svelte:head>

<!-- BACKGROUND ELEMENTS -->
<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<div class="hero-bg-logo">
    <svg viewBox="0 0 244.5 206.7" class="hero-logo-svg">
        <g transform="translate(1521.307,-1417.5391)">
            <path
                class="logo-path"
                d="m -1354.9492,1417.539 c -0.1016,0 6.7374,13.9017 6.3171,23.1104 -0.7399,16.2277 -2.8416,21.4958 -17.0461,31.6431 -14.7967,13.5407 -16.3574,15.0399 -17.1068,16.4376 -1.3018,2.4268 -1.7645,4.2785 -1.7383,6.9504 0.028,2.859 0.5813,4.8068 2.0633,7.2567 2.3527,3.8902 6.4284,6.2766 11.042,6.465 2.6044,0.1085 3.9706,-0.1385 6.3714,-1.1458 1.7815,-0.7476 2.421,-1.294 16.587,-14.18 l 14.7334,-13.4028 c 14.556,10.2777 26.2041,20.3461 28.7132,39.5838 0.3917,4.2168 -0.305,9.7463 -1.6745,13.2827 -3.4945,9.0247 -12.2676,15.9985 -21.5937,17.1647 -5.8421,0.7308 -10.7941,0.115 -15.7058,-1.9534 -4.131,-1.7393 -6.2548,-3.4864 -12.7345,-10.4766 -5.7602,-6.2142 -7.0186,-7.3136 -9.6719,-8.4507 -6.2604,-2.6826 -14.1663,0 -17.4287,5.9181 -3.1565,5.7251 -2.4631,11.3446 2.0705,16.7866 2.1334,2.5606 9.1728,10.031 11.58,12.2892 9.7358,9.1321 23.3088,14.3367 37.3675,14.3269 14.5458,-0.023 26.4314,-4.622 37.3823,-14.5075 9.4806,-8.5579 15.0606,-18.2614 17.5605,-30.532 0.6904,-3.3898 1.2139,-10.6902 1.0213,-14.2438 -0.5949,-10.962 -5.6907,-20.21 -10.694,-29.7731 -10.3149,-19.7145 -67.1803,-72.5385 -67.4152,-72.5495 z m -110.3542,45.1236 c -14.5454,0.025 -26.4309,4.6223 -37.3815,14.5076 -9.4803,8.5579 -15.0616,18.2606 -17.561,30.5312 -0.6902,3.3898 -1.2137,10.6914 -1.0206,14.2447 0.595,10.9621 5.6905,20.21 10.6938,29.7729 10.3148,19.7147 67.1803,72.5387 67.4155,72.5497 0.099,0 -6.7373,-13.9025 -6.3174,-23.1113 0.7397,-16.2273 2.8416,-21.4953 17.0459,-31.6424 14.7962,-13.5407 16.3577,-15.0405 17.1069,-16.4379 1.3016,-2.4268 1.7651,-4.278 1.7386,-6.9502 -0.028,-2.8589 -0.5821,-4.807 -2.0638,-7.2571 -2.3528,-3.8905 -6.4283,-6.2761 -11.0417,-6.4643 -2.6038,-0.1084 -3.9706,0.1386 -6.371,1.1461 -1.7823,0.7472 -2.4213,1.2934 -16.5871,14.1796 l -14.734,13.4027 c -14.5563,-10.2775 -26.2046,-20.3456 -28.7135,-39.5838 -0.3915,-4.2162 0.306,-9.746 1.6748,-13.2823 3.4949,-9.0248 12.2671,-15.9983 21.5935,-17.165 5.8424,-0.7308 10.7947,-0.1152 15.7058,1.9534 4.1315,1.7392 6.2554,3.4865 12.735,10.4764 5.7604,6.2143 7.0186,7.3138 9.6724,8.4507 6.26,2.6826 14.1656,0 17.4276,-5.9179 3.1567,-5.7251 2.4636,-11.3446 -2.0704,-16.7864 -2.1337,-2.5606 -9.1731,-10.0318 -11.5802,-12.2902 -9.7354,-9.1318 -23.3087,-14.3358 -37.3676,-14.3262 z m 65.8033,44.3665 a 13.289838,13.289838 0 0 0 -12.8356,13.7295 13.289838,13.289838 0 0 0 13.7292,12.8357 13.289838,13.289838 0 0 0 12.8352,-13.7297 13.289838,13.289838 0 0 0 -13.7288,-12.8355 z"
            /></g
        >
    </svg>
</div>

<!-- 1. HERO -->
<section
    style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; position: relative; z-index: 2;"
>
    <div class="container">
        <div
            use:reveal={{ delay: 0 }}
            style="margin-bottom: 2rem; display: flex; justify-content: center;"
        >
            <div class="status-indicator">
                <span class="bulb"></span>
                <span>ECOSYSTEM ACTIVE</span>
            </div>
        </div>

        <h1 class="hero-h1 {mounted ? 'active' : ''}">
            <div class="line line-1 glitch" data-text="TAKE BACK CONTROL">
                TAKE BACK CONTROL
            </div>
            <div class="line line-2">TO RISE ABOVE</div>
        </h1>

        <p
            use:reveal={{ delay: 600 }}
            style="max-width: 650px; margin: 0 auto 3rem; font-size: 1.25rem; opacity: 0; animation: fadeUp 1s forwards 0.8s; text-shadow: 0 0 10px rgba(0,0,0,0.5);"
        >
            An elite ecosystem for professional mastery. We bridge the gap
            between potential and performance.
        </p>

        <div
            use:reveal={{ delay: 800 }}
            style="display: flex; gap: 1.5rem; justify-content: center; opacity: 0; animation: fadeUp 1s forwards 1.0s;"
        >
            <MagneticButton href="/tracks" variant="primary"
                >Explore Programs</MagneticButton
            >
            <MagneticButton href="/contact" variant="outline"
                >Contact Us</MagneticButton
            >
        </div>
    </div>
</section>

<!-- 2. SOCIAL TRANSMISSION - INFINITE MARQUEE -->
<div class="marquee-container">
    <div class="marquee-content">
        {#each Array(4) as _}
            <div class="marquee-group">
                <a href="https://linkedin.com" target="_blank"
                    >LINKEDIN // PROFESSIONAL</a
                >
                <span class="separator">///</span>
                <a href="https://instagram.com" target="_blank"
                    >INSTAGRAM // VISUALS</a
                >
                <span class="separator">///</span>
                <a href="https://discord.com" target="_blank"
                    >DISCORD // COMMUNITY</a
                >
                <span class="separator">///</span>
                <a href="https://github.com" target="_blank">GITHUB // SOURCE</a
                >
                <span class="separator">///</span>
                <span>SYSTEM ONLINE</span>
                <span class="separator">///</span>
            </div>
        {/each}
    </div>
</div>

<!-- 3. MISSION (Architecture) -->
<section class="section-padding">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>The Architecture.</h2>
            <p>Three distinct pillars that define elite performance.</p>
        </div>

        <div class="grid-3">
            <!-- CARD 01: PUZZLE FRACTURE -->
            <div
                class="bento-card puzzle-card"
                use:reveal={{ delay: 0 }}
                use:tilt
            >
                <!-- Shards -->
                <div class="shard shard-tl"></div>
                <div class="shard shard-tr"></div>
                <div class="shard shard-bl"></div>
                <div class="shard shard-br"></div>

                <div class="card-content">
                    <div class="card-icon">
                        <svg
                            viewBox="0 0 40 40"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                        >
                            <circle cx="20" cy="20" r="16" />
                            <circle
                                cx="20"
                                cy="20"
                                r="10"
                                stroke-opacity="0.5"
                            />
                            <circle
                                cx="20"
                                cy="20"
                                r="4"
                                fill="currentColor"
                                stroke="none"
                            />
                        </svg>
                    </div>
                    <div class="card-meta">01 / Foundation</div>
                    <h3>Applied Mastery</h3>
                    <p>
                        Theory is insufficient. We utilize live-fire
                        environments to verify your ability to execute under
                        pressure.
                    </p>
                </div>
            </div>

            <!-- CARD 02: FOG OF WAR (FLASHLIGHT) -->
            <div
                class="bento-card fog-card"
                use:reveal={{ delay: 100 }}
                use:tilt
                on:mousemove={trackMouse}
            >
                <div class="fog-layer"></div>
                <div class="card-content">
                    <div class="card-icon">
                        <svg
                            viewBox="0 0 40 40"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                        >
                            <rect
                                x="4"
                                y="4"
                                width="14"
                                height="14"
                                rx="2"
                                stroke-opacity="0.8"
                            />
                            <rect
                                x="22"
                                y="4"
                                width="14"
                                height="14"
                                rx="2"
                                stroke-opacity="0.5"
                            />
                            <rect
                                x="4"
                                y="22"
                                width="14"
                                height="14"
                                rx="2"
                                stroke-opacity="0.5"
                            />
                            <rect
                                x="22"
                                y="22"
                                width="14"
                                height="14"
                                rx="2"
                                fill="currentColor"
                                stroke="none"
                            />
                        </svg>
                    </div>
                    <div class="card-meta">02 / Vision</div>
                    <h3>Strategic Oversight</h3>
                    <p>
                        See the board. We train operators to understand
                        variable-sum game theory and risk analysis.
                    </p>
                </div>
            </div>

            <!-- CARD 03: NODE DISPERSION -->
            <div
                class="bento-card node-card"
                use:reveal={{ delay: 200 }}
                use:tilt
            >
                <div class="nodes-container">
                    {#each Array(15) as _, i}
                        <div class="node" style="--i: {i};"></div>
                    {/each}
                </div>
                <div class="card-content">
                    <div class="card-icon">
                        <svg
                            viewBox="0 0 40 40"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                        >
                            <circle
                                cx="10"
                                cy="30"
                                r="3"
                                fill="currentColor"
                                stroke="none"
                            />
                            <circle
                                cx="30"
                                cy="10"
                                r="3"
                                fill="currentColor"
                                stroke="none"
                            />
                            <circle
                                cx="30"
                                cy="30"
                                r="3"
                                stroke-opacity="0.5"
                            />
                            <circle
                                cx="10"
                                cy="10"
                                r="3"
                                stroke-opacity="0.5"
                            />
                            <path d="M10 27 L 10 13" stroke-opacity="0.3" />
                            <path d="M13 10 L 27 10" stroke-opacity="0.3" />
                            <path d="M12 28 L 28 12" />
                        </svg>
                    </div>
                    <div class="card-meta">03 / Scale</div>
                    <h3>The Network</h3>
                    <p>
                        Join a vetted collective of 1,200+ high-performance
                        leaders. Iron sharpens iron.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. TRACKS (Career Tracks) -->
<section
    class="section-padding"
    style="background: var(--glass-surface); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);"
>
    <div class="container">
        <div
            class="section-header"
            style="display: flex; justify-content: space-between; align-items: flex-end;"
            use:reveal
        >
            <div>
                <h2>Career Tracks.</h2>
                <p>Simulate your career trajectory with full diploma tracks.</p>
            </div>
            <MagneticButton href="/tracks" variant="outline"
                >Compare All &rarr;</MagneticButton
            >
        </div>

        <TrackGrid />
    </div>
</section>

<!-- 5. INTEL (Articles/Blogs) -->
<section class="section-padding">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>Intelligence Briefs.</h2>
            <p>Latest research and strategy from the front lines.</p>
        </div>

        <div class="grid-2">
            {#each featureArticles as article}
                <div class="bento-card" use:tilt>
                    <span class="cat-pill">{article.category}</span>
                    <h3 style="margin-top: 1rem;">{article.title}</h3>
                    <p style="margin-bottom: 2rem;">{article.summary}</p>
                    <a href="/articles/{article.id}" class="play-link"
                        >READ INTEL &rarr;</a
                    >
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 6. GAMES (Simulations) -->
<section
    class="section-padding"
    style="border-top: 1px solid var(--glass-border);"
>
    <div class="container">
        <div
            class="section-header"
            style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem;"
            use:reveal
        >
            <div>
                <h2>Games.</h2>
                <p>Sharpen your skills in a consequence-free environment.</p>
            </div>
            <MagneticButton href="/games" variant="outline"
                >Enter Game Library &rarr;</MagneticButton
            >
        </div>

        <div
            style="display: flex; justify-content: flex-start; gap: 2rem; flex-wrap: wrap; width: 100%;"
        >
            {#each games as game}
                <a
                    href="/games/{game.id}"
                    class="bento-card game-card"
                    style="max-width: 400px; width: 100%;"
                    use:tilt
                >
                    <div
                        class="game-cover"
                        style="background-image: url('{game.coverImage}');"
                    >
                        <div class="cover-overlay"></div>
                        <span class="game-cat">{game.category}</span>
                    </div>
                    <div class="game-info">
                        <h3>{game.title}</h3>
                        <p>{game.description.substring(0, 80)}...</p>
                        <span class="play-link">Deploy &rarr;</span>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<!-- 7. CONTACT -->
<section
    style="padding: 100px 0; background: var(--glass-surface); border-top: 1px solid var(--glass-border);"
>
    <div class="container">
        <div class="contact-layout">
            <!-- Left Info -->
            <div class="contact-info" use:reveal>
                <div
                    class="section-header"
                    style="text-align: left; margin-bottom: 2rem;"
                >
                    <span class="pill-label">Get in Touch</span>
                    <h2 style="font-size: 3rem; margin-top: 1rem;">
                        Let’s start a conversation.
                    </h2>
                    <p>
                        Whether you’re interested in a partnership, have a
                        technical question, or just want to explore what Progeta
                        can do for you.
                    </p>
                </div>

                <div class="contact-details">
                    <div class="detail-item">
                        <div class="icon-box">✉️</div>
                        <div class="detail-text">
                            <span class="label">Email Us</span>
                            <a
                                href="mailto:operations@progeta.tech"
                                class="value">operations@progeta.tech</a
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Form -->
            <div use:reveal={{ delay: 200 }}>
                <ContactForm />
            </div>
        </div>
    </div>
</section>

<style>
    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* LAYOUT UTILS */
    .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }
    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    .section-header {
        margin-bottom: 4rem;
    }
    .text-sm {
        font-size: 0.95rem;
        color: var(--text-secondary);
    }

    /* PUZZLE CARD */
    .puzzle-card {
        position: relative;
    }
    .shard {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        transition: transform 0.4s ease;
        opacity: 0;
        z-index: 0;
        pointer-events: none;
    }
    .shard-tl {
        clip-path: polygon(0 0, 50% 0, 60% 50%, 0 40%);
        transform-origin: top left;
    }
    .shard-tr {
        clip-path: polygon(50% 0, 100% 0, 100% 50%, 60% 50%);
        transform-origin: top right;
    }
    .shard-bl {
        clip-path: polygon(0 40%, 60% 50%, 40% 100%, 0 100%);
        transform-origin: bottom left;
    }
    .shard-br {
        clip-path: polygon(60% 50%, 100% 50%, 100% 100%, 40% 100%);
        transform-origin: bottom right;
    }

    .puzzle-card:hover .shard {
        opacity: 0.3;
    }
    .puzzle-card:hover .shard-tl {
        transform: translate(-10px, -10px) rotate(-2deg);
    }
    .puzzle-card:hover .shard-tr {
        transform: translate(10px, -5px) rotate(2deg);
    }
    .puzzle-card:hover .shard-bl {
        transform: translate(-5px, 10px) rotate(1deg);
    }
    .puzzle-card:hover .shard-br {
        transform: translate(10px, 10px) rotate(-3deg);
    }
    .puzzle-card .card-content {
        z-index: 2;
        position: relative;
    }

    /* FOG CARD */
    .fog-card {
        position: relative;
        --local-x: 50%;
        --local-y: 50%;
    }
    .fog-layer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(0, 0, 0, 0.4);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        mask-image: radial-gradient(
            circle 100px at var(--local-x) var(--local-y),
            transparent 0%,
            black 100%
        );
        -webkit-mask-image: radial-gradient(
            circle 100px at var(--local-x) var(--local-y),
            transparent 0%,
            black 100%
        );
    }
    .fog-card:hover .fog-layer {
        opacity: 1;
    }
    .fog-card .card-content {
        position: relative;
        z-index: 1;
    }

    /* NODE CARD */
    .node-card {
        overflow: hidden;
    }
    .nodes-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    .node {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        background: var(--text-tertiary);
        border-radius: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .node-card:hover .node {
        opacity: 0.5;
        transform: translate(
            calc(-50% + calc(cos(var(--i) * 24deg) * 100px)),
            calc(-50% + calc(sin(var(--i) * 24deg) * 80px))
        );
    }
    .node-card .card-content {
        z-index: 2;
        position: relative;
    }

    /* CYBER GRID BACKGROUND */
    .cyber-grid-container {
        position: absolute;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 0;
        mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            transparent 80%
        );
    }
    .cyber-grid {
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            );
        background-size: 60px 60px;
        transform: perspective(500px) rotateX(60deg);
        animation: gridMove 20s linear infinite;
    }
    @keyframes gridMove {
        0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
        }
        100% {
            transform: perspective(500px) rotateX(60deg) translateY(60px);
        }
    }

    /* HERO */
    .hero-bg-logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 800px;
        opacity: 0.1;
        pointer-events: none;
        z-index: 0;
    }
    .hero-logo-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 50px rgba(255, 255, 255, 0.2));
    }
    .logo-path {
        fill: transparent;
        stroke: white;
        stroke-width: 1;
        stroke-dasharray: 2000;
        stroke-dashoffset: 2000;
        animation: logoDrawLoop 4s ease-in-out infinite alternate;
    }
    @keyframes logoDrawLoop {
        0% {
            stroke-dashoffset: 2000;
            fill-opacity: 0;
        }
        100% {
            stroke-dashoffset: 0;
            fill-opacity: 0.15;
        }
    }

    .hero-h1 {
        margin-bottom: 2rem;
        perspective: 1000px;
        position: relative;
    }
    .hero-h1 .line {
        display: block;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .hero-h1 .line-1 {
        font-weight: 800;
        font-size: clamp(3.5rem, 6vw, 6rem);
        letter-spacing: -0.03em;
        position: relative;
    }
    .hero-h1 .line-2 {
        font-weight: 300;
        font-size: clamp(2rem, 4vw, 3.5rem);
        color: var(--text-secondary);
        filter: blur(10px);
        transition-delay: 0.1s;
        letter-spacing: 0.1em;
    }
    .hero-h1.active .line-1 {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.2s;
    }
    .hero-h1.active .line-2 {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
        transition-delay: 0.6s;
    }

    /* GLITCH EFFECT */
    .glitch::before,
    .glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
    }
    .glitch::before {
        color: #0ff;
        z-index: -1;
        animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }
    .glitch::after {
        color: #f0f;
        z-index: -2;
        animation: glitch-anim-2 3s infinite linear alternate-reverse;
    }
    @keyframes glitch-anim-1 {
        0% {
            clip-path: inset(20% 0 80% 0);
            transform: translate(-2px, 1px);
        }
        20% {
            clip-path: inset(60% 0 10% 0);
            transform: translate(2px, -1px);
        }
        40% {
            clip-path: inset(40% 0 50% 0);
            transform: translate(-2px, 2px);
        }
        60% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(2px, -2px);
        }
        80% {
            clip-path: inset(10% 0 70% 0);
            transform: translate(-1px, 1px);
        }
        100% {
            clip-path: inset(30% 0 20% 0);
            transform: translate(1px, -1px);
        }
    }
    @keyframes glitch-anim-2 {
        0% {
            clip-path: inset(10% 0 60% 0);
            transform: translate(2px, -1px);
        }
        20% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(-2px, 2px);
        }
        40% {
            clip-path: inset(30% 0 20% 0);
            transform: translate(2px, 1px);
        }
        60% {
            clip-path: inset(15% 0 80% 0);
            transform: translate(-1px, -2px);
        }
        80% {
            clip-path: inset(55% 0 10% 0);
            transform: translate(1px, 2px);
        }
        100% {
            clip-path: inset(40% 0 30% 0);
            transform: translate(-2px, 1px);
        }
    }

    .status-indicator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        border-radius: 100px;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.05em;
    }
    .bulb {
        width: 6px;
        height: 6px;
        background: var(--text-primary);
        border-radius: 50%;
        opacity: 0.8;
    }

    /* MARQUEE */
    .marquee-container {
        border-top: 1px solid var(--glass-border);
        border-bottom: 1px solid var(--glass-border);
        background: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        z-index: 5;
    }
    .marquee-content {
        display: inline-block;
        padding: 0.75rem 0;
        animation: marquee 30s linear infinite;
    }
    .marquee-content:hover {
        animation-play-state: paused;
    }
    .marquee-group {
        display: inline-flex;
        gap: 3rem;
        margin-right: 3rem;
    }

    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .marquee-group a {
        color: var(--text-secondary);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: color 0.2s;
    }
    .marquee-group a:hover {
        color: var(--text-primary);
        text-decoration: underline;
    }
    .separator {
        color: var(--accent-blue);
        opacity: 0.5;
    }

    /* CARD CONTENT UTILS */
    .card-meta {
        font-family: monospace;
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        opacity: 0.7;
    }
    .col-title {
        font-size: 0.8rem;
        letter-spacing: 0.1em;
        color: var(--text-tertiary);
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--glass-border);
        padding-bottom: 0.5rem;
        text-transform: uppercase;
    }
    .card-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
    }

    .ops-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    .ops-date {
        font-family: monospace;
        color: var(--accent-primary);
        opacity: 0.8;
        font-size: 0.85rem;
        padding-top: 2px;
        min-width: 60px;
    }
    .tag-sm {
        display: inline-block;
        font-size: 0.7rem;
        border: 1px solid var(--glass-border);
        padding: 2px 6px;
        border-radius: 100px;
        color: var(--text-tertiary);
        margin-top: 0.25rem;
    }

    /* GAMES SPECIFIC */
    .game-card {
        padding: 0 !important;
        border-radius: 20px;
        text-decoration: none;
    }
    .game-card:hover {
        transform: translateY(-5px);
        border-color: var(--text-secondary);
    }
    .game-cover {
        height: 180px;
        display: flex;
        align-items: flex-end;
        padding: 1.5rem;
        position: relative;
        overflow: hidden;
        background-color: #000;
        background-size: cover;
        background-position: center;
    }
    .cover-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            transparent 100%
        );
        pointer-events: none;
    }
    .game-cat {
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: 2px 8px;
        font-size: 0.7rem;
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: 600;
        position: relative;
        z-index: 2;
        backdrop-filter: blur(4px);
    }
    .game-info {
        padding: 1.5rem;
    }
    .play-link {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--accent-blue);
    }

    @media (max-width: 900px) {
        .grid-3,
        .grid-2 {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .hero-bg-logo {
            width: 400px;
            height: 400px;
        }
        .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 3rem;
        }
    }

    /* CONTACT SECTION STYLES */
    .contact-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }
    .pill-label {
        background: rgba(255, 255, 255, 0.1);
        color: var(--accent-blue);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        display: inline-block;
    }
    .contact-details {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .detail-item {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .icon-box {
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
    }
    .detail-text {
        display: flex;
        flex-direction: column;
    }
    .label {
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
    }
    .value {
        font-size: 1rem;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
    }
    .value:hover {
        color: var(--accent-blue);
    }
</style>
