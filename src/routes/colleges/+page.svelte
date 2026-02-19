<script lang="ts">
    import { reveal, tilt } from "$lib/ui/actions";
    import MagneticButton from "$lib/ui/components/MagneticButton.svelte";
    import ImpactStats from "$lib/ui/components/ImpactStats.svelte";
    import { base } from "$app/paths";
    import { onMount } from "svelte";

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<svelte:head>
    <title>For Colleges | Progeta Technologies</title>
</svelte:head>

<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<section class="hero-section">
    <div class="container">
        <div use:reveal={{ delay: 0 }} class="status-indicator-wrapper">
            <div class="status-indicator">
                <span class="bulb"></span>
                <span>INSTITUTIONAL PORTAL ACTIVE</span>
            </div>
        </div>

        <h1 class="hero-h1 {mounted ? 'active' : ''}">
            <div class="line line-1">FOR INSTITUTIONS</div>
            <div class="line line-2">Build a Culture of Security</div>
        </h1>

        <p use:reveal={{ delay: 600 }} class="hero-description">
            Partner with Progeta to bring elite cybersecurity awareness and
            skill development to your campus. We build sustainable, student-led
            ecosystems that drive long-term value.
        </p>
    </div>
</section>

<!-- SECTION A: AWARENESS PROGRAMS -->
<section class="section-padding">
    <div class="container">
        <div class="grid-2-layout">
            <div use:reveal>
                <span class="pill-label">Awareness</span>
                <h2 class="mt-4">Impactful Awareness Drives.</h2>
                <p class="mt-4">
                    Our awareness programs are designed to engage the entire
                    student body, not just technical enthusiasts. Through
                    real-world demonstrations and interactive sessions, we
                    cultivate a digital-first mindset.
                </p>
                <ul class="feature-list mt-8">
                    <li>Live-fire threat demonstrations</li>
                    <li>Social engineering simulations</li>
                    <li>Best-practice workshops for non-technical students</li>
                </ul>
            </div>
            <div class="visual-placeholder" use:reveal={{ delay: 200 }}>
                <div class="awareness-visual">
                    <div class="ripple"></div>
                    <div class="ripple delay-1"></div>
                    <div class="ripple delay-2"></div>
                    <div class="core-icon">AWR</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION B: CAMPUS CHAPTER MODEL -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>The Chapter Model.</h2>
            <p>Scalable, sustainable, and student-led.</p>
        </div>

        <div class="grid-3">
            <div class="bento-card" use:reveal={{ delay: 100 }} use:tilt>
                <h3>Leadership Structure</h3>
                <p>
                    We empower students with defined roles (President, Core
                    Team, Events Lead) to manage the chapter.
                </p>
            </div>
            <div class="bento-card" use:reveal={{ delay: 200 }} use:tilt>
                <h3>Recurring Engagement</h3>
                <p>
                    Chapters host regular workshops and events, ensuring
                    security stays top-of-mind year-round.
                </p>
            </div>
            <div class="bento-card" use:reveal={{ delay: 300 }} use:tilt>
                <h3>Institutional Trust</h3>
                <p>
                    Our model provides colleges with a structured way to manage
                    student initiatives with high accountability.
                </p>
            </div>
        </div>

        <div class="text-center mt-12" use:reveal>
            <MagneticButton href="{base}/chapters" variant="outline"
                >Explore Chapter Details</MagneticButton
            >
        </div>
    </div>
</section>

<!-- SECTION C: WORKSHOPS & TRAINING -->
<section class="section-padding">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>Layered Training.</h2>
            <p>From campus-wide awareness to elite performance labs.</p>
        </div>

        <div class="training-tiers">
            <div class="tier-card" use:reveal={{ delay: 100 }}>
                <div class="tier-label">T1 / Awareness</div>
                <h3>Foundational</h3>
                <p>
                    Large-scale sessions focused on digital literacy and
                    security basics for the general student body.
                </p>
            </div>
            <div class="tier-card active" use:reveal={{ delay: 200 }}>
                <div class="tier-label">T2 / Skills</div>
                <h3>Technical</h3>
                <p>
                    Hands-on workshops covering specific domains like network
                    security, OSINT, and forensics.
                </p>
            </div>
            <div class="tier-card" use:reveal={{ delay: 300 }}>
                <div class="tier-label">T3 / Elite</div>
                <h3>Live Simulations</h3>
                <p>
                    Advanced labs where students operate in high-pressure,
                    realistic threat environments.
                </p>
            </div>
        </div>

        <div class="text-center mt-12" use:reveal>
            <MagneticButton href="{base}/workshops" variant="primary"
                >View All Workshops</MagneticButton
            >
        </div>
    </div>
</section>

<!-- SECTION D: PARTNERSHIP PROCESS -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>Operational Flow.</h2>
            <p>Our roadmap for institutional success.</p>
        </div>

        <div class="process-flow">
            <div class="process-node" use:reveal={{ delay: 0 }}>
                <div class="node-num">1</div>
                <h4>Awareness Session</h4>
                <span>Engage the campus</span>
            </div>
            <div class="process-line"></div>
            <div class="process-node" use:reveal={{ delay: 100 }}>
                <div class="node-num">2</div>
                <h4>Community Building</h4>
                <span>Identify leaders</span>
            </div>
            <div class="process-line"></div>
            <div class="process-node" use:reveal={{ delay: 200 }}>
                <div class="node-num">3</div>
                <h4>Chapter Formation</h4>
                <span>Establish structure</span>
            </div>
            <div class="process-line"></div>
            <div class="process-node" use:reveal={{ delay: 300 }}>
                <div class="node-num">4</div>
                <h4>Recurring Events</h4>
                <span>Sustainable impact</span>
            </div>
        </div>

        <div class="cta-section text-center mt-12" use:reveal={{ delay: 400 }}>
            <MagneticButton href="{base}/contact" variant="primary"
                >Schedule Campus Consultation</MagneticButton
            >
        </div>
    </div>
</section>

<!-- IMPACT STATS -->
<section
    class="section-padding"
    style="border-top: 1px solid var(--glass-border);"
>
    <div class="container">
        <ImpactStats />
    </div>
</section>

<style>
    .hero-section {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        z-index: 2;
        padding-top: 100px;
    }

    .hero-h1 .line-1 {
        font-weight: 800;
        font-size: clamp(3rem, 6vw, 5rem);
        letter-spacing: -0.03em;
    }

    .hero-h1 .line-2 {
        font-weight: 300;
        font-size: clamp(1.5rem, 4vw, 3rem);
        color: var(--text-secondary);
        letter-spacing: 0.1em;
    }

    .hero-description {
        max-width: 700px;
        margin: 2rem auto 0;
        font-size: 1.25rem;
        opacity: 0.8;
    }

    .section-padding {
        padding: 100px 0;
    }

    .bg-glass {
        background: var(--glass-surface);
        border-top: 1px solid var(--glass-border);
        border-bottom: 1px solid var(--glass-border);
    }

    .grid-2-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .feature-list {
        list-style: none;
        padding: 0;
    }

    .feature-list li {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-secondary);
    }

    .feature-list li::before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--text-primary);
    }

    .awareness-visual {
        position: relative;
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ripple {
        position: absolute;
        width: 100px;
        height: 100px;
        border: 1px solid var(--text-primary);
        border-radius: 50%;
        animation: rippleEffect 3s linear infinite;
        opacity: 0;
    }

    .delay-1 {
        animation-delay: 1s;
    }
    .delay-2 {
        animation-delay: 2s;
    }

    @keyframes rippleEffect {
        0% {
            transform: scale(1);
            opacity: 0.5;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }

    .core-icon {
        width: 80px;
        height: 80px;
        background: var(--text-primary);
        color: #000;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 800;
        font-family: var(--font-mono);
        z-index: 10;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }

    .training-tiers {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 4rem;
    }

    .tier-card {
        padding: 2.5rem;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 30px;
        transition: all 0.4s;
    }

    .tier-card.active {
        border-color: var(--text-primary);
        background: rgba(255, 255, 255, 0.05);
        transform: translateY(-10px);
    }

    .tier-label {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-primary);
        margin-bottom: 1rem;
        opacity: 0.7;
    }

    .process-flow {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 4rem;
        position: relative;
        padding: 0 2rem;
    }

    .process-node {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        z-index: 1;
    }

    .node-num {
        width: 50px;
        height: 50px;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: var(--font-mono);
        font-weight: 700;
        margin-bottom: 1.5rem;
        transition: all 0.3s;
    }

    .process-node:hover .node-num {
        background: var(--text-primary);
        color: #000;
        border-color: var(--text-primary);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .process-node h4 {
        margin-bottom: 0.5rem;
    }
    .process-node span {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .process-line {
        position: absolute;
        top: 25px;
        height: 1px;
        background: var(--glass-border);
        width: calc(100% - 100px);
        left: 50px;
        z-index: 0;
    }

    @media (max-width: 900px) {
        .grid-2-layout,
        .training-tiers {
            grid-template-columns: 1fr;
        }

        .process-flow {
            flex-direction: column;
            gap: 3rem;
            align-items: center;
        }

        .process-line {
            display: none;
        }

        .hero-section {
            min-height: 60vh;
        }
    }

    .mt-4 {
        margin-top: 1rem;
    }
    .mt-8 {
        margin-top: 2rem;
    }
    .mt-12 {
        margin-top: 3rem;
    }
    .text-center {
        text-align: center;
    }

    .cyber-grid-container {
        position: fixed;
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
        pointer-events: none;
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
</style>
