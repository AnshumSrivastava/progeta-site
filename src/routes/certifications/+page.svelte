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
    <title>Certifications | Progeta Technologies</title>
</svelte:head>

<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<section class="hero-section">
    <div class="container">
        <div use:reveal={{ delay: 0 }} class="status-indicator-wrapper">
            <div class="status-indicator">
                <span class="bulb"></span>
                <span>REGISTRY ACTIVE</span>
            </div>
        </div>

        <h1 class="hero-h1 {mounted ? 'active' : ''}">
            <div class="line line-1">CERTIFICATIONS</div>
            <div class="line line-2">Verify Your Mastery</div>
        </h1>

        <p use:reveal={{ delay: 600 }} class="hero-description">
            We recognize competence and leadership. Our multi-tiered
            certification system provides verifiable proof of your growth within
            the Progeta ecosystem.
        </p>
    </div>
</section>

<!-- CERTIFICATION TIERS -->
<section class="section-padding">
    <div class="container">
        <div class="cert-grid">
            <!-- TYPE 1: AWARENESS -->
            <div class="cert-card" use:reveal={{ delay: 100 }} use:tilt>
                <div class="cert-badge silver">A</div>
                <h3>Awareness Participation</h3>
                <p>
                    Awarded to individuals who have completed our campus-wide
                    awareness drives and demonstrated foundational digital
                    literacy.
                </p>
                <ul class="cert-details">
                    <li>Foundational Literacy</li>
                    <li>Threat Identification</li>
                    <li>Best Practice Implementation</li>
                </ul>
            </div>

            <!-- TYPE 2: LEADERSHIP -->
            <div class="cert-card" use:reveal={{ delay: 200 }} use:tilt>
                <div class="cert-badge gold">L</div>
                <h3>Chapter Leadership</h3>
                <p>
                    Awarded to Chapter Presidents and Core Team members who have
                    successfully led a Progeta Campus Chapter for at least one
                    academic session.
                </p>
                <ul class="cert-details">
                    <li>Strategic Execution</li>
                    <li>Team Orchestration</li>
                    <li>Institutional Impact</li>
                </ul>
            </div>

            <!-- TYPE 3: SKILL TRACKS -->
            <div class="cert-card" use:reveal={{ delay: 300 }} use:tilt>
                <div class="cert-badge cyan">S</div>
                <h3>Skill Track Mastery</h3>
                <p>
                    Elite-level certification awarded upon successful completion
                    of a full Diploma Track and live-fire simulation labs.
                </p>
                <ul class="cert-details">
                    <li>Technical Specialization</li>
                    <li>Live-Fire Proficiency</li>
                    <li>Professional Readiness</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- VERIFICATION -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="verification-section" use:reveal>
            <h2>Verifiable Credentials</h2>
            <p class="mt-4">
                All Progeta certifications are backed by our secure registry.
                Employers and institutions can verify certificate authenticity
                via our digital portal.
            </p>
            <div class="mt-10">
                <MagneticButton href="{base}/contact" variant="outline"
                    >Verify a Certificate</MagneticButton
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

    .cert-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .cert-card {
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        padding: 3rem 2rem;
        border-radius: 40px;
        text-align: center;
        transition: all 0.4s;
    }

    .cert-card:hover {
        border-color: var(--text-primary);
        transform: translateY(-10px);
        background: rgba(255, 255, 255, 0.05);
    }

    .cert-badge {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 2rem;
        font-family: var(--font-mono);
        font-weight: 800;
        font-size: 2rem;
    }

    .silver {
        background: #e2e8f0;
        color: #000;
        box-shadow: 0 0 20px rgba(226, 232, 240, 0.3);
    }
    .gold {
        background: #ecc94b;
        color: #000;
        box-shadow: 0 0 20px rgba(236, 201, 75, 0.3);
    }
    .cyan {
        background: #0bc5ea;
        color: #000;
        box-shadow: 0 0 20px rgba(11, 197, 234, 0.3);
    }

    .cert-card h3 {
        margin-bottom: 1rem;
    }
    .cert-card p {
        color: var(--text-secondary);
        font-size: 0.95rem;
        margin-bottom: 2rem;
    }

    .cert-details {
        list-style: none;
        padding: 0;
        border-top: 1px solid var(--glass-border);
        padding-top: 1.5rem;
        text-align: left;
    }

    .cert-details li {
        margin-bottom: 0.75rem;
        font-size: 0.85rem;
        color: var(--text-secondary);
        position: relative;
        padding-left: 1.25rem;
    }

    .cert-details li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--text-primary);
    }

    .verification-section {
        text-align: center;
        padding: 4rem;
    }

    @media (max-width: 900px) {
        .cert-grid {
            grid-template-columns: 1fr;
        }

        .hero-section {
            min-height: 60vh;
        }
    }

    .mt-4 {
        margin-top: 1rem;
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
