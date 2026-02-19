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

    interface Programme {
        id: string;
        tag: string;
        title: string;
        audience: string;
        format: string;
        outcome: string;
        nextStage: string;
        cta: string;
        href: string;
    }

    const programmes: Programme[] = [
        {
            id: "awareness",
            tag: "STAGE 01",
            title: "Awareness Sessions",
            audience: "All students & faculty",
            format: "Campus-wide live sessions (2-3 hours)",
            outcome:
                "Digital literacy and threat identification across the student body",
            nextStage: "Community → Skill Tracks",
            cta: "Book a Session",
            href: "/contact",
        },
        {
            id: "tracks",
            tag: "STAGE 02",
            title: "Skill Tracks",
            audience: "Students seeking career specialization",
            format: "Full diploma programmes (multi-module)",
            outcome: "Technical mastery in a cybersecurity domain",
            nextStage: "Certification → Chapters",
            cta: "Explore Tracks",
            href: "/tracks",
        },
        {
            id: "workshops",
            tag: "STAGE 02",
            title: "Workshops",
            audience: "Intermediate to advanced students",
            format: "Hands-on simulation labs (half to full day)",
            outcome: "Live-fire proficiency under pressure",
            nextStage: "Certification",
            cta: "View Workshops",
            href: "/workshops",
        },
        {
            id: "chapters",
            tag: "STAGE 03",
            title: "Student Chapters",
            audience: "Student leaders & campus ambassadors",
            format: "Semester-long campus programme",
            outcome: "Leadership, execution, and institutional impact",
            nextStage: "Leadership Certification → Execution Systems",
            cta: "Start a Chapter",
            href: "/chapters",
        },
        {
            id: "certifications",
            tag: "STAGE 04",
            title: "Certifications",
            audience: "All programme participants",
            format: "Verifiable digital credentials",
            outcome: "Proof of competence for employers and institutions",
            nextStage: "Career readiness",
            cta: "View Certifications",
            href: "/certifications",
        },
        {
            id: "productivity",
            tag: "STAGE 04",
            title: "Productivity Systems",
            audience: "Advanced students & chapter leaders",
            format: "Frameworks and toolkits",
            outcome: "Systems thinking and execution discipline",
            nextStage: "Mentorship & Outcomes",
            cta: "Learn More",
            href: "/students",
        },
    ];
</script>

<svelte:head>
    <title>Programmes | Progeta Technologies</title>
    <meta
        name="description"
        content="Explore all Progeta programmes: Awareness Sessions, Skill Tracks, Workshops, Student Chapters, Certifications, and Productivity Systems."
    />
</svelte:head>

<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<!-- HERO -->
<section class="hero-section">
    <div class="container">
        <div use:reveal={{ delay: 0 }} class="status-indicator-wrapper">
            <div class="status-indicator">
                <span class="bulb"></span>
                <span>PROGRAMME REGISTRY</span>
            </div>
        </div>

        <h1 class="hero-h1 {mounted ? 'active' : ''}">
            <div class="line line-1">ALL PROGRAMMES</div>
            <div class="line line-2">Your Complete Growth Map</div>
        </h1>

        <p use:reveal={{ delay: 600 }} class="hero-description">
            Progeta builds campus ecosystems that make students digitally aware,
            technically skilled, leadership-ready, and execution-driven. Here's
            how.
        </p>
    </div>
</section>

<!-- LIFECYCLE VISUAL -->
<section class="section-padding">
    <div class="container">
        <div class="section-header text-center" use:reveal>
            <h2>The Lifecycle.</h2>
            <p>
                Each programme maps to a stage in student and institutional
                growth.
            </p>
        </div>

        <div class="lifecycle-bar" use:reveal={{ delay: 200 }}>
            <div class="lc-stage"><span class="lc-num">01</span> Awareness</div>
            <div class="lc-arrow">→</div>
            <div class="lc-stage"><span class="lc-num">02</span> Skill</div>
            <div class="lc-arrow">→</div>
            <div class="lc-stage">
                <span class="lc-num">03</span> Leadership
            </div>
            <div class="lc-arrow">→</div>
            <div class="lc-stage"><span class="lc-num">04</span> Execution</div>
        </div>
    </div>
</section>

<!-- PROGRAMME CARDS -->
<section class="section-padding bg-glass">
    <div class="container">
        <div class="programmes-grid">
            {#each programmes as prog, i}
                <div class="prog-card" use:reveal={{ delay: i * 80 }} use:tilt>
                    <div class="prog-tag">{prog.tag}</div>
                    <h3>{prog.title}</h3>

                    <div class="prog-meta">
                        <div class="meta-row">
                            <span class="meta-label">AUDIENCE</span>
                            <span class="meta-value">{prog.audience}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">FORMAT</span>
                            <span class="meta-value">{prog.format}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">OUTCOME</span>
                            <span class="meta-value">{prog.outcome}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">NEXT</span>
                            <span class="meta-value">{prog.nextStage}</span>
                        </div>
                    </div>

                    <a href="{base}{prog.href}" class="prog-cta">{prog.cta} →</a
                    >
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- IMPACT STATS -->
<section class="section-padding">
    <div class="container">
        <div class="section-header text-center" use:reveal>
            <h2>Measured Impact.</h2>
            <p>Real outcomes across campuses and students.</p>
        </div>
        <ImpactStats />
    </div>
</section>

<!-- DUAL CTA -->
<section class="section-padding bg-glass">
    <div class="container text-center">
        <div use:reveal>
            <h2>Ready to Get Started?</h2>
            <p class="mt-4">Choose your path and take the first step.</p>
            <div class="dual-cta mt-8">
                <MagneticButton href="{base}/students" variant="primary"
                    >I'm a Student</MagneticButton
                >
                <MagneticButton href="{base}/colleges" variant="outline"
                    >I'm from a College</MagneticButton
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

    /* LIFECYCLE BAR */
    .lifecycle-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        margin-top: 3rem;
        flex-wrap: wrap;
    }
    .lc-stage {
        padding: 1rem 2rem;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .lc-stage:hover {
        border-color: var(--text-primary);
        background: rgba(255, 255, 255, 0.05);
    }
    .lc-num {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        opacity: 0.5;
    }
    .lc-arrow {
        color: var(--text-secondary);
        opacity: 0.3;
        font-size: 1.5rem;
    }

    /* PROGRAMME CARDS GRID */
    .programmes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 2rem;
    }

    .prog-card {
        background: rgba(13, 13, 18, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .prog-card:hover {
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-5px);
    }

    .prog-tag {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--accent-blue, #3b82f6);
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
    }

    .prog-card h3 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        line-height: 1.2;
    }

    .prog-meta {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--glass-border);
    }

    .meta-row {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .meta-label {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--text-tertiary);
    }
    .meta-value {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
    }

    .prog-cta {
        display: inline-block;
        margin-top: 2rem;
        padding: 0.75rem 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        border-radius: 100px;
        color: var(--text-primary);
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        text-align: center;
        transition: all 0.3s;
    }
    .prog-cta:hover {
        background: var(--text-primary);
        color: #000;
    }

    .dual-cta {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .mt-4 {
        margin-top: 1rem;
    }
    .mt-8 {
        margin-top: 2rem;
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
        pointer-events: none;
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

    @media (max-width: 900px) {
        .programmes-grid {
            grid-template-columns: 1fr;
        }
        .lifecycle-bar {
            gap: 0.75rem;
        }
        .lc-arrow {
            display: none;
        }
        .hero-section {
            min-height: 60vh;
        }
    }
</style>
