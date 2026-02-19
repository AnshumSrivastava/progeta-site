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
    <title>Student Chapters | Progeta Technologies</title>
</svelte:head>

<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<section class="hero-section">
    <div class="container">
        <div use:reveal={{ delay: 0 }} class="status-indicator-wrapper">
            <div class="status-indicator">
                <span class="bulb"></span>
                <span>CHAPTER NETWORK ACTIVE</span>
            </div>
        </div>

        <h1 class="hero-h1 {mounted ? 'active' : ''}">
            <div class="line line-1">CAMPUS CHAPTERS</div>
            <div class="line line-2">Lead the Movement</div>
        </h1>

        <p use:reveal={{ delay: 600 }} class="hero-description">
            A Progeta Campus Chapter is more than a club—it's a satellite of our
            elite growth ecosystem, driven by high-performance student leaders.
        </p>
    </div>
</section>

<!-- WHAT IS A CHAPTER -->
<section class="section-padding">
    <div class="container">
        <div class="grid-2-layout">
            <div use:reveal>
                <h2>What is a Progeta Chapter?</h2>
                <p class="mt-6">
                    Chapters are the front line of our awareness and skill
                    development model. They are autonomous units within colleges
                    that host workshops, run simulations, and build a local
                    community of aspiring operators.
                </p>
                <div class="leadership-callout mt-10">
                    <blockquote>
                        "Leadership is doing the right things." — Peter Drucker
                    </blockquote>
                    <p class="mt-4">
                        We don't just teach technical skills; we provide a
                        platform for students to practice high-stakes
                        leadership.
                    </p>
                </div>
            </div>
            <div class="visual-placeholder" use:reveal={{ delay: 200 }}>
                <div class="chapter-nodes">
                    <div class="node central">COLLEGE</div>
                    <div class="node satellite s1">LEADERSHIP</div>
                    <div class="node satellite s2">WORKSHOPS</div>
                    <div class="node satellite s3">COMMUNITY</div>
                    <div class="node satellite s4">SKILLS</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ROLES -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>Chapter Roles.</h2>
            <p>Defined responsibilities for maximum impact.</p>
        </div>

        <div class="grid-3">
            <div
                class="bento-card role-card"
                use:reveal={{ delay: 100 }}
                use:tilt
            >
                <div class="role-icon">P</div>
                <h3>President</h3>
                <p>
                    Strategic vision, institutional liaison, and overall chapter
                    growth.
                </p>
            </div>
            <div
                class="bento-card role-card"
                use:reveal={{ delay: 200 }}
                use:tilt
            >
                <div class="role-icon">C</div>
                <h3>Core Team</h3>
                <p>
                    Technical leads, community managers, and operational
                    support.
                </p>
            </div>
            <div
                class="bento-card role-card"
                use:reveal={{ delay: 300 }}
                use:tilt
            >
                <div class="role-icon">E</div>
                <h3>Events Lead</h3>
                <p>
                    Planning and executing awareness drives, workshops, and
                    hackathons.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ACTIVITIES & BENEFITS -->
<section class="section-padding">
    <div class="container">
        <div class="grid-2-layout">
            <div use:reveal>
                <h3>Chapter Activities</h3>
                <ul class="feature-list mt-6">
                    <li>Bi-weekly technical workshops</li>
                    <li>Campus-wide awareness drives</li>
                    <li>Inter-college hackathons and CTFs</li>
                    <li>Networking with industry experts</li>
                </ul>
            </div>
            <div use:reveal={{ delay: 200 }}>
                <h3>Member Benefits</h3>
                <ul class="feature-list mt-6">
                    <li>Exclusive access to advanced modules</li>
                    <li>Leadership and Participation Certificates</li>
                    <li>Direct mentorship from Progeta experts</li>
                    <li>Priority access to internships and career roles</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- SEMESTER KPIs -->
<section class="section-padding">
    <div class="container">
        <div class="section-header" use:reveal>
            <h2>Semester KPIs.</h2>
            <p>What your chapter will achieve each semester.</p>
        </div>

        <div class="grid-3">
            <div class="bento-card" use:reveal={{ delay: 100 }} use:tilt>
                <h3 style="font-size: 2.5rem; font-weight: 800;">2+</h3>
                <p>Awareness Drives per semester</p>
            </div>
            <div class="bento-card" use:reveal={{ delay: 200 }} use:tilt>
                <h3 style="font-size: 2.5rem; font-weight: 800;">50+</h3>
                <p>Students engaged per drive</p>
            </div>
            <div class="bento-card" use:reveal={{ delay: 300 }} use:tilt>
                <h3 style="font-size: 2.5rem; font-weight: 800;">4+</h3>
                <p>Workshops or Labs hosted</p>
            </div>
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

<!-- APPLY CTA -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="apply-section" use:reveal>
            <h2>Start a Chapter.</h2>
            <p class="mt-4">
                Ready to bring Progeta to your campus? Apply now and receive
                your semester roadmap, KPI playbook, and mentorship access.
            </p>
            <div class="mt-10">
                <MagneticButton href="{base}/contact" variant="primary"
                    >Apply to Lead &rarr;</MagneticButton
                >
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

    .grid-2-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .leadership-callout {
        padding: 2rem;
        border-left: 2px solid var(--text-primary);
        background: rgba(255, 255, 255, 0.02);
    }

    .leadership-callout blockquote {
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-style: italic;
    }

    .chapter-nodes {
        position: relative;
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .node {
        position: absolute;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 0.8rem;
        transition: all 0.3s;
    }

    .node.central {
        width: 100px;
        height: 100px;
        background: var(--text-primary);
        color: #000;
        font-size: 1rem;
        z-index: 10;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    }

    .node.satellite {
        width: 70px;
        height: 70px;
        opacity: 0.7;
    }

    .s1 {
        transform: translate(-100px, -100px);
    }
    .s2 {
        transform: translate(100px, -100px);
    }
    .s3 {
        transform: translate(-100px, 100px);
    }
    .s4 {
        transform: translate(100px, 100px);
    }

    .node.satellite:hover {
        opacity: 1;
        background: var(--text-primary);
        color: #000;
        border-color: var(--text-primary);
    }

    .role-card {
        text-align: center;
        padding: 3rem 2rem;
    }

    .role-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: var(--font-mono);
        font-weight: 800;
        font-size: 1.5rem;
        margin: 0 auto 2rem;
    }

    .role-card:hover .role-icon {
        background: var(--text-primary);
        color: #000;
        border-color: var(--text-primary);
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

    .apply-section {
        text-align: center;
        padding: 4rem;
    }

    @media (max-width: 900px) {
        .grid-2-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
        }

        .chapter-nodes {
            transform: scale(0.8);
        }

        .hero-section {
            min-height: 60vh;
        }
    }

    .mt-4 {
        margin-top: 1rem;
    }
    .mt-6 {
        margin-top: 1.5rem;
    }
    .mt-10 {
        margin-top: 2.5rem;
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
