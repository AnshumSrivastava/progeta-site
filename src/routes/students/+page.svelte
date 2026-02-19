<script lang="ts">
    import { reveal, tilt } from "$lib/ui/actions";
    import MagneticButton from "$lib/ui/components/MagneticButton.svelte";
    import { base } from "$app/paths";
    import { onMount } from "svelte";

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<svelte:head>
    <title>For Students | Progeta Technologies</title>
</svelte:head>

<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<section class="hero-section">
    <div class="container">
        <div use:reveal={{ delay: 0 }} class="status-indicator-wrapper">
            <div class="status-indicator">
                <span class="bulb"></span>
                <span>STUDENT PORTAL ACTIVE</span>
            </div>
        </div>

        <h1 class="hero-h1 {mounted ? 'active' : ''}">
            <div class="line line-1">FOR THE OPERATOR</div>
            <div class="line line-2">Architect Your Future</div>
        </h1>

        <p use:reveal={{ delay: 600 }} class="hero-description">
            Progeta is not just a learning platform. it's an ecosystem designed
            to take you from awareness to elite execution.
        </p>
    </div>
</section>

<!-- SECTION A: STUDENT JOURNEY -->
<section class="section-padding">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>The Student Journey.</h2>
            <p>Our four-stage model for professional evolution.</p>
        </div>

        <div class="journey-funnel">
            <div class="funnel-step" use:reveal={{ delay: 100 }}>
                <div class="step-icon">01</div>
                <div class="step-content">
                    <h3>Awareness</h3>
                    <p>
                        Understanding the landscape and identifying potential
                        threats and opportunities.
                    </p>
                </div>
            </div>
            <div class="funnel-arrow">↓</div>
            <div class="funnel-step" use:reveal={{ delay: 200 }}>
                <div class="step-icon">02</div>
                <div class="step-content">
                    <h3>Skill</h3>
                    <p>
                        Deep technical specialization through our rigorous,
                        track-based curriculum.
                    </p>
                </div>
            </div>
            <div class="funnel-arrow">↓</div>
            <div class="funnel-step" use:reveal={{ delay: 300 }}>
                <div class="step-icon">03</div>
                <div class="step-content">
                    <h3>Leadership</h3>
                    <p>
                        Leading Campus Chapters and driving community-wide
                        digital awareness.
                    </p>
                </div>
            </div>
            <div class="funnel-arrow">↓</div>
            <div class="funnel-step" use:reveal={{ delay: 400 }}>
                <div class="step-icon">04</div>
                <div class="step-content">
                    <h3>Execution</h3>
                    <p>
                        Applying systems thinking and productivity tools to
                        achieve elite performance.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION B: LEARNING PATHS -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="grid-2-layout">
            <div use:reveal>
                <span class="pill-label">Learning Paths</span>
                <h2 class="mt-4">From Foundations to Mastery.</h2>
                <p class="mt-4">
                    Our tracks are designed to bridge the gap between potential
                    and performance. Choose your specialization and start your
                    journey under the guidance of elite mentors.
                </p>

                <div class="track-levels mt-8">
                    <div class="level-item">
                        <strong>Beginner</strong>
                        <span>Awareness + foundations of digital defense.</span>
                    </div>
                    <div class="level-item">
                        <strong>Intermediate</strong>
                        <span>Skill specialization tracks and simulations.</span
                        >
                    </div>
                    <div class="level-item">
                        <strong>Advanced</strong>
                        <span
                            >Career-oriented mastery and leadership roles.</span
                        >
                    </div>
                </div>

                <div class="mt-12">
                    <MagneticButton href="{base}/tracks" variant="primary"
                        >Explore Tracks &rarr;</MagneticButton
                    >
                </div>
            </div>
            <div class="visual-placeholder" use:reveal={{ delay: 200 }}>
                <div class="cyber-box">
                    <div class="box-content">
                        <!-- Visual representation of tracks -->
                        <div class="track-stack">
                            <div class="stack-layer layer-3">CYBER DEFENSE</div>
                            <div class="stack-layer layer-2">
                                SYSTEMS THINKING
                            </div>
                            <div class="stack-layer layer-1">
                                CORE AWARENESS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION C: COMMUNITY -->
<section class="section-padding">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>The Ecosystem.</h2>
            <p>You are the average of the people you surround yourself with.</p>
        </div>

        <div class="grid-3">
            <div class="bento-card" use:reveal={{ delay: 100 }} use:tilt>
                <h3>Peer Network</h3>
                <p>
                    Engage in deep technical discussions with a vetted
                    collective of high-performers.
                </p>
            </div>
            <div class="bento-card" use:reveal={{ delay: 200 }} use:tilt>
                <h3>Growth Mindset</h3>
                <p>
                    An interdisciplinary network focused on more than just
                    code—we focus on total growth.
                </p>
            </div>
            <div class="bento-card" use:reveal={{ delay: 300 }} use:tilt>
                <h3>Opportunity</h3>
                <p>
                    Access exclusive events, hackathons, and career paths within
                    the Progeta network.
                </p>
            </div>
        </div>

        <div class="text-center mt-12" use:reveal>
            <MagneticButton href="{base}/community" variant="outline"
                >Learn About Community</MagneticButton
            >
        </div>
    </div>
</section>

<!-- SECTION D: STUDENT CHAPTERS -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="cta-banner" use:reveal>
            <div class="banner-content">
                <h2>Lead Your Campus.</h2>
                <p>
                    Become a Progeta Ambassador by forming a Student Chapter at
                    your college.
                </p>
                <div class="mt-8">
                    <MagneticButton href="{base}/chapters" variant="primary"
                        >Explore Chapter Model &rarr;</MagneticButton
                    >
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION E: PRODUCTIVITY SYSTEMS -->
<section class="section-padding">
    <div class="container">
        <div class="grid-2-layout">
            <div class="visual-placeholder" use:reveal={{ delay: 200 }}>
                <div class="systems-visual">
                    <div class="circle-path"></div>
                    <div class="core-node">SYST</div>
                </div>
            </div>
            <div use:reveal>
                <span class="pill-label">Productivity</span>
                <h2 class="mt-4">Execution is the Difference.</h2>
                <p class="mt-4">
                    Most students fail not due to lack of skill, but lack of
                    systems. We integrate high-performance productivity
                    frameworks into your learning experience.
                </p>
                <ul class="feature-list mt-8">
                    <li>Systems thinking approach to goal setting</li>
                    <li>Managing large-scale projects and technical debt</li>
                    <li>Iterative habit formation for long-term growth</li>
                </ul>
            </div>
        </div>
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
        max-width: 650px;
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

    .journey-funnel {
        max-width: 800px;
        margin: 4rem auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .funnel-step {
        display: flex;
        align-items: center;
        gap: 2rem;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        padding: 2rem;
        border-radius: 20px;
        width: 100%;
        transition: transform 0.3s ease;
    }

    .funnel-step:hover {
        transform: translateX(10px);
        border-color: var(--text-primary);
    }

    .step-icon {
        font-size: 2rem;
        font-weight: 800;
        font-family: var(--font-mono);
        color: var(--text-primary);
        opacity: 0.5;
    }

    .funnel-arrow {
        font-size: 2rem;
        margin: 1rem 0;
        opacity: 0.3;
        color: var(--text-primary);
    }

    .grid-2-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .level-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5rem;
    }

    .level-item strong {
        color: var(--text-primary);
        font-size: 1.1rem;
    }

    .level-item span {
        color: var(--text-secondary);
        font-size: 0.95rem;
    }

    .visual-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cyber-box {
        width: 100%;
        max-width: 400px;
        aspect-ratio: 1;
        background: linear-gradient(45deg, var(--glass-surface), transparent);
        border: 1px solid var(--glass-border);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .track-stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 80%;
    }

    .stack-layer {
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        font-weight: 700;
        letter-spacing: 0.1em;
        font-size: 0.8rem;
        transition: all 0.3s;
    }

    .stack-layer:hover {
        background: var(--text-primary);
        color: #000;
    }

    .cta-banner {
        padding: 4rem;
        background: radial-gradient(
            circle at top right,
            rgba(255, 255, 255, 0.05),
            transparent
        );
        border: 1px solid var(--glass-border);
        border-radius: 40px;
        text-align: center;
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

    .systems-visual {
        position: relative;
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle-path {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px dashed rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        animation: rotate 20s linear infinite;
    }

    .core-node {
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
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 900px) {
        .grid-2-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
        }

        .cta-banner {
            padding: 2rem;
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
