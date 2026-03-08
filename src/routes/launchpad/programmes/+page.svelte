<script>
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
</script>

<svelte:head>
    <title>Programmes | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="How LaunchPad builds capability: Tracks, Workshops, Chapters, and Certifications."
    />
</svelte:head>

<!-- ═══ HERO ═══ -->
<section class="prog-hero">
    <div class="container">
        <ScrollReveal>
            <span class="eyebrow">PROGRAMMES · LAUNCHPAD</span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h1 class="prog-hero__heading">
                How LaunchPad<br />builds capability.
            </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
            <p class="prog-hero__body">
                Progeta Technologies builds campus ecosystems that make students
                digitally aware, technically skilled, leadership-ready, and
                execution-driven. This is how.
            </p>
        </ScrollReveal>
    </div>
</section>

<!-- ═══ THE FOUR STAGES ═══ -->
{#each [{ num: "01", name: "Tracks", bg: "void", audience: "All students, 2nd year and above", format: "Full diploma programmes (multi-module)", outcome: "Technical mastery in a cybersecurity domain", prose: "Tracks are the backbone of LaunchPad. Six months. A specific cybersecurity role. Every module builds on the last. By the end, a student has not just studied the subject — they have operated in it. Mock environments, live scenarios, real tools.", bullets: ["6 specialisations: CTI, SOC, DevSecOps, GRC, Pentest, Automation", "Hybrid delivery: campus-based or self-directed", "Verifiable credential on completion", "Connects directly to the module catalog"], cta: "Choose a track →", link: "/tracks" }, { num: "02", name: "Workshops", bg: "surface", audience: "Intermediate to advanced students", format: "Hands-on simulation labs (half to full day)", outcome: "Live-fire proficiency under pressure", prose: "Workshops are standalone events — a single module or a curated combination, run in one intense session. No prerequisite. A workshop can be your first exposure to LaunchPad or your sharpest drill inside a track.", bullets: ["Half-day or full-day formats", "Available as campus drives or online", "No certificate, but documented participation", "Can be combined into a track credit"], cta: "View upcoming workshops →", link: "/launchpad/workshops" }, { num: "03", name: "Chapters", bg: "void", audience: "Student leaders and campus ambassadors", format: "Semester-long campus programme", outcome: "Leadership, execution, and institutional impact", prose: "A Student Chapter is a permanent LaunchPad presence on your campus. Progeta Technologies trains the founding members, provides all programme materials, and supports ongoing activities. The chapter owns its own calendar, runs its own events, and builds its own reputation. We simply give it the infrastructure to succeed.", bullets: ["One chapter per campus", "Chapter leader training included", "Access to Progeta Technologies resources and networks", "Eligible for national chapter events and competitions"], cta: "Start a chapter →", link: "/launchpad/chapters" }, { num: "04", name: "Certifications", bg: "surface", audience: "All programme participants", format: "Verifiable digital credentials", outcome: "Proof of competence for employers and institutions", prose: "Every LaunchPad track ends with a verifiable Progeta Technologies credential. Not a participation certificate — a credential tied to specific demonstrated competencies. Employers can verify it instantly at progeta.tech/verify. It does not expire.", bullets: ["Tied to completed track and modules", "Publicly verifiable by any employer", "Shareable as a URL or QR code", "Connects to your Progeta Technologies profile"], cta: "View credential format →", link: "/launchpad/certifications" }] as stage, i}
    <section
        class="prog-stage"
        class:prog-stage--surface={stage.bg === "surface"}
    >
        <div class="container">
            <div class="prog-stage__grid">
                <div class="prog-stage__left">
                    <ScrollReveal>
                        <span class="stage-num">STAGE {stage.num}</span>
                        <div class="stage-rule"></div>
                        <span class="stage-audience"
                            >AUDIENCE · {stage.audience}</span
                        >
                        <h2 class="stage-title">{stage.name}</h2>
                        <span class="stage-format">{stage.format}</span>
                        <span class="stage-outcome"
                            >OUTCOME ↗ {stage.outcome}</span
                        >
                        <a href={stage.link} class="stage-link">{stage.cta}</a>
                    </ScrollReveal>
                </div>
                <div class="prog-stage__right">
                    <ScrollReveal delay={100}>
                        <p class="stage-prose">{stage.prose}</p>
                        <ul class="stage-bullets">
                            {#each stage.bullets as bullet}
                                <li>
                                    <span class="bullet-dash">—</span>
                                    {bullet}
                                </li>
                            {/each}
                        </ul>
                        <a href={stage.link} class="stage-right-cta"
                            >{stage.cta}</a
                        >
                    </ScrollReveal>
                </div>
            </div>
        </div>
    </section>
{/each}

<!-- ═══ PROGRESSION CHART ═══ -->
<section class="prog-chart-section">
    <div class="container">
        <ScrollReveal>
            <div class="prog-chart-header">
                <span class="eyebrow">THE PATH</span>
                <h2 class="section-heading">How the stages connect.</h2>
            </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <div class="progression-chart">
                {#each [{ num: "01", name: "Tracks", desc: "6-month certification" }, { num: "02", name: "Workshops", desc: "Live simulations" }, { num: "03", name: "Chapters", desc: "Campus leadership" }, { num: "04", name: "Certified", desc: "Verifiable credential" }] as step, i}
                    {#if i > 0}
                        <span class="prog-arrow" aria-hidden="true">→</span>
                    {/if}
                    <div class="prog-step" class:prog-step--final={i === 3}>
                        <span class="prog-step-num">{step.num}</span>
                        <span class="prog-step-name">{step.name}</span>
                        <span class="prog-step-desc">{step.desc}</span>
                    </div>
                {/each}
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 64px);
    }
    .eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: 16px;
    }
    .section-heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(32px, 4vw, 48px);
        line-height: 1.05;
        color: #edf0ff;
    }

    /* ── HERO ── */
    .prog-hero {
        min-height: 55vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
    }
    .prog-hero__heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(44px, 6vw, 68px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 18px;
    }
    .prog-hero__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        max-width: 520px;
        line-height: 1.75;
    }

    /* ── STAGES ── */
    .prog-stage {
        background: #020408;
        padding: clamp(64px, 8vw, 104px) 0;
    }
    .prog-stage--surface {
        background: var(--ground);
    }
    .prog-stage__grid {
        display: grid;
        grid-template-columns: 48% 52%;
        gap: clamp(32px, 4vw, 64px);
    }
    @media (max-width: 768px) {
        .prog-stage__grid {
            grid-template-columns: 1fr;
        }
    }

    .stage-num {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #1e2440;
        letter-spacing: 0.14em;
        display: block;
    }
    .stage-rule {
        width: 32px;
        height: 2px;
        background: #e05c20;
        margin: 12px 0 20px;
    }
    .stage-audience {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: 12px;
    }
    .stage-title {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(28px, 3.5vw, 44px);
        line-height: 1;
        color: #edf0ff;
        margin-bottom: 14px;
    }
    .stage-format {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: var(--ink-3);
        display: block;
    }
    .stage-outcome {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #18c96a;
        display: block;
        margin-top: 6px;
    }
    .stage-link {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #e05c20;
        text-decoration: none;
        display: inline-block;
        margin-top: 24px;
        letter-spacing: 0.1em;
    }
    .stage-link:hover {
        text-decoration: underline;
    }

    .stage-prose {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        line-height: 1.8;
    }
    .stage-bullets {
        list-style: none;
        padding: 0;
        margin-top: 24px;
    }
    .stage-bullets li {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 13px;
        color: #edf0ff;
        line-height: 2;
    }
    .bullet-dash {
        color: #e05c20;
        margin-right: 8px;
    }
    .stage-right-cta {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #e05c20;
        text-decoration: none;
        display: inline-block;
        margin-top: 24px;
        letter-spacing: 0.1em;
    }
    .stage-right-cta:hover {
        text-decoration: underline;
    }

    /* ── PROGRESSION CHART ── */
    .prog-chart-section {
        background: #0c0e18;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .prog-chart-header {
        text-align: center;
        margin-bottom: 48px;
    }
    .progression-chart {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        flex-wrap: wrap;
    }
    .prog-step {
        padding: 28px 32px;
        text-align: center;
        border: 1px solid #0f1220;
        min-width: 160px;
    }
    .prog-step--final {
        border-color: #e05c20;
    }
    .prog-step-num {
        display: block;
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #1e2440;
        margin-bottom: 8px;
    }
    .prog-step-name {
        display: block;
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: #edf0ff;
        margin-bottom: 4px;
    }
    .prog-step-desc {
        display: block;
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 12px;
        color: var(--ink-3);
    }
    .prog-arrow {
        font-size: 16px;
        color: #e05c20;
        padding: 0 12px;
        align-self: center;
    }
    @media (max-width: 640px) {
        .progression-chart {
            flex-direction: column;
        }
        .prog-arrow {
            transform: rotate(90deg);
        }
    }
</style>
