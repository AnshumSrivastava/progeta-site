<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import BrandMark from "$lib/components/site/BrandMark.svelte";
</script>

<svelte:head>
    <title>Resources | Progeta Technologies</title>
    <meta
        name="description"
        content="Intelligence briefs, training simulations, a visual record of our work, and a terminology reference. Everything we publish, in one place."
    />
</svelte:head>

<!-- ═══════ HERO ═══════ -->
<section class="rhub-hero">
    <div class="rhub-container">
        <div class="rhub-hero-content">
            <span class="rhub-eyebrow">RESOURCES · PROGETA TECHNOLOGIES</span>
            <h1 class="rhub-heading">Read. Play. Remember. Reference.</h1>
            <p class="rhub-body">
                Intelligence briefs, training simulations, a visual record of
                our work, and a terminology reference. Everything we publish, in
                one place.
            </p>
        </div>
    </div>
</section>

<!-- ═══════ STRIPS ═══════ -->
<section class="rhub-strips">
    <div class="rhub-container">
        <ScrollReveal>
            <!-- Articles -->
            <a
                href="/resources/articles"
                class="resource-strip resource-strip--articles"
            >
                <div class="strip-watermark">A</div>
                <div class="strip-content">
                    <span class="strip-label">INTEL BRIEFS</span>
                    <h2 class="strip-heading">Read the field.</h2>
                    <p class="strip-desc">
                        Threat intelligence analysis, cybersecurity commentary,
                        digital sovereignty philosophy, and observations on the
                        industry. Written for practitioners, not audiences.
                    </p>
                    <div class="strip-meta">
                        CYBERSECURITY · PRIVACY · EDUCATION · PHILOSOPHY
                    </div>
                </div>
                <div class="strip-stat-block">
                    <span class="strip-stat-num">5</span>
                    <span class="strip-stat-unit">PUBLISHED BRIEFS</span>
                </div>
            </a>

            <!-- Simulations -->
            <a
                href="/resources/simulations"
                class="resource-strip resource-strip--simulations"
            >
                <div class="strip-watermark">G</div>
                <div class="strip-content">
                    <span class="strip-label">TRAINING LABS</span>
                    <h2 class="strip-heading">Test your skills.</h2>
                    <p class="strip-desc">
                        Real terminal environments, live network simulations,
                        and logic puzzles built on actual cybersecurity tools.
                        No stakes, real consequence-free experience.
                    </p>
                    <div class="strip-meta">
                        LINUX · NETWORKING · CTI · INCIDENT RESPONSE
                    </div>
                </div>
                <div class="strip-stat-block">
                    <span class="strip-stat-num">7</span>
                    <span class="strip-stat-unit">ACTIVE LABS</span>
                </div>
            </a>

            <!-- Gallery -->
            <a
                href="/resources/gallery"
                class="resource-strip resource-strip--gallery"
            >
                <div class="strip-watermark">◻</div>
                <div class="strip-content">
                    <span class="strip-label">VISUAL RECORD</span>
                    <h2 class="strip-heading">Where we have been.</h2>
                    <p class="strip-desc">
                        Campus drives, workshops, chapter events, the Founders
                        Mixer. A record of what has been built and where.
                        Currently text-and-metadata format — image integration
                        coming.
                    </p>
                    <div class="strip-meta">
                        CAMPUS DRIVES · WORKSHOPS · EVENTS · CHAPTERS
                    </div>
                </div>
                <div class="strip-stat-block">
                    <span class="strip-stat-num">28</span>
                    <span class="strip-stat-unit">EVENTS DOCUMENTED</span>
                </div>
            </a>

            <!-- Glossary -->
            <a
                href="/resources/glossary"
                class="resource-strip resource-strip--glossary"
            >
                <div class="strip-watermark">∑</div>
                <div class="strip-content">
                    <span class="strip-label">REFERENCE</span>
                    <h2 class="strip-heading">Know the language.</h2>
                    <p class="strip-desc">
                        Technical terms, threat actor terminology, compliance
                        frameworks, privacy concepts, and LaunchPad-specific
                        vocabulary. Alphabetical. Searchable. Growing.
                    </p>
                    <div class="strip-meta">
                        CYBERSECURITY · GRC · PRIVACY · LAUNCHPAD
                    </div>
                </div>
                <div class="strip-stat-block">
                    <span class="strip-stat-num">22+</span>
                    <span class="strip-stat-unit">TERMS DEFINED</span>
                </div>
            </a>
        </ScrollReveal>
    </div>
</section>

<!-- ═══════ LATEST GRID ═══════ -->
<section class="rhub-latest">
    <div class="rhub-container">
        <ScrollReveal>
            <div class="latest-grid">
                <!-- Articles -->
                <a
                    href="/intel/local-first"
                    class="latest-cell latest-cell--articles"
                >
                    <span class="latest-source">LATEST INTEL</span>
                    <h3 class="latest-title">
                        The State of Local-First Systems
                    </h3>
                    <p class="latest-sub">
                        Why shared responsibility is shifting toward individual
                        sovereignty.
                    </p>
                    <span class="latest-cta">Read Brief →</span>
                </a>

                <!-- Simulations -->
                <a
                    href="/simulations/linux-labyrinth"
                    class="content-card content-card--interactive"
                    style="--delay: 100ms"
                >
                    <span class="latest-source">ACTIVE LAB</span>
                    <h3 class="latest-title">Linux Terminal Labyrinth</h3>
                    <p class="latest-sub">
                        Navigate the filesystem using real commands: cd, ls,
                        sudo, chmod.
                    </p>
                    <span class="latest-cta">Launch Lab →</span>
                </a>

                <!-- Gallery -->
                <a
                    href="/resources/gallery"
                    class="latest-cell latest-cell--gallery"
                >
                    <span class="latest-source">RECENT EVENT</span>
                    <h3 class="latest-title">
                        Campus Drive — Amity Noida, March 2026
                    </h3>
                    <p class="latest-sub">
                        LaunchPad awareness session. 340 students.
                    </p>
                    <span class="latest-cta">View Record →</span>
                </a>

                <!-- Glossary -->
                <a
                    href="/resources/glossary"
                    class="latest-cell latest-cell--glossary"
                >
                    <span class="latest-source">TERM OF THE WEEK</span>
                    <h3 class="latest-title">Lateral Movement</h3>
                    <p class="latest-sub">
                        The technique of moving through a compromised network
                        after initial access, using legitimate credentials and
                        tools.
                    </p>
                    <span class="latest-cta">Browse Glossary →</span>
                </a>
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .rhub-container {
        max-width: var(--w-site);
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }

    /* ── HERO ── */
    .rhub-hero {
        height: 44vh;
        min-height: 400px;
        display: flex;
        align-items: center;
        background: transparent;
        padding-top: var(--sp-20);
        position: relative;
        z-index: 10;
    }
    .rhub-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: var(--sp-4);
    }
    .rhub-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(44px, 6vw, 68px);
        line-height: 0.93;
        color: var(--ink-1);
        margin: 0;
    }
    .rhub-body {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 15px;
        line-height: 1.6;
        color: var(--ink-2);
        max-width: 480px;
        margin-top: 18px;
    }

    /* ── STRIPS ── */
    .rhub-strips {
        padding-bottom: clamp(80px, 11vw, 144px);
        position: relative;
        z-index: 10;
    }

    .resource-strip {
        display: grid;
        grid-template-columns: 100px 1fr auto;
        gap: 0 40px;
        padding: clamp(32px, 5vw, 52px) 0;
        border-top: 1px solid var(--border-1);
        text-decoration: none;
        position: relative;
        overflow: hidden;
        transition: background 0.2s ease;
        align-items: center;
    }
    .resource-strip:last-child {
        border-bottom: 1px solid var(--border-1);
    }
    .resource-strip:hover {
        background: var(--surface-1);
    }

    .resource-strip::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .resource-strip--articles::before {
        background: var(--ink-1);
    }
    .resource-strip--simulations::before {
        background: var(--accent-launchpad);
    }
    .resource-strip--gallery::before {
        background: var(--accent-selfos);
    }
    .resource-strip--glossary::before {
        background: var(--accent-innercircle);
    }
    .resource-strip:hover::before {
        width: 100%;
    }

    .strip-watermark {
        font-family: var(--font-mono);
        font-size: 56px;
        color: var(--surface-2);
        line-height: 1;
        text-align: center;
        user-select: none;
    }

    .strip-content {
        display: flex;
        flex-direction: column;
    }
    .strip-label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-bottom: 8px;
    }
    .strip-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(24px, 3vw, 36px);
        color: var(--ink-1);
        line-height: 1;
        margin-bottom: 10px;
        transition: color 0.2s ease;
    }
    .strip-desc {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 14px;
        line-height: 1.65;
        color: var(--ink-2);
        max-width: 480px;
    }
    .strip-meta {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.12em;
        color: var(--ink-4);
        margin-top: 12px;
    }

    .strip-stat-block {
        text-align: right;
    }
    .strip-stat-num {
        display: block;
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: clamp(28px, 3.5vw, 44px);
        color: var(--ink-1);
        line-height: 1;
    }
    .strip-stat-unit {
        display: block;
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.12em;
        color: var(--ink-3);
        margin-top: 8px;
    }

    /* Colour adaptations on hover */
    .resource-strip--articles:hover .strip-heading {
        color: #ffffff;
    }
    .resource-strip--simulations:hover .strip-heading {
        color: var(--accent-launchpad);
    }
    .resource-strip--gallery:hover .strip-heading {
        color: var(--accent-selfos);
    }
    .resource-strip--glossary:hover .strip-heading {
        color: var(--accent-innercircle);
    }

    /* ── LATEST GRID ── */
    .rhub-latest {
        padding-bottom: clamp(80px, 11vw, 144px);
        position: relative;
        z-index: 10;
    }
    .latest-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: var(--border-1);
        margin-top: 48px;
    }
    .latest-cell {
        background: var(--surface-1);
        padding: 28px 30px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: background 0.2s ease;
    }
    .latest-cell:hover {
        background: var(--surface-2);
    }

    .latest-source {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }
    .latest-cell--articles .latest-source {
        color: var(--ink-1);
    }
    .content-card--interactive .latest-source {
        color: var(--accent-launchpad);
    }
    .latest-cell--gallery .latest-source {
        color: var(--accent-selfos);
    }
    .latest-cell--glossary .latest-source {
        color: var(--accent-innercircle);
    }

    .latest-title {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 16px;
        color: var(--ink-1);
        line-height: 1.3;
        margin: 0;
    }
    .latest-sub {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 13px;
        color: var(--ink-2);
        line-height: 1.6;
        flex: 1;
        margin: 0;
    }
    .latest-cta {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        margin-top: 8px;
    }
    .latest-cell--articles .latest-cta {
        color: var(--ink-1);
    }
    .content-card--interactive .latest-cta {
        color: var(--accent-launchpad);
    }
    .latest-cell--gallery .latest-cta {
        color: var(--accent-selfos);
    }
    .latest-cell--glossary .latest-cta {
        color: var(--accent-innercircle);
    }

    @media (max-width: 860px) {
        .resource-strip {
            grid-template-columns: 80px 1fr;
        }
        .strip-stat-block {
            grid-column: 2;
            text-align: left;
            margin-top: var(--sp-2);
        }
    }

    @media (max-width: 640px) {
        .rhub-hero {
            height: auto;
            min-height: auto;
            padding-top: var(--sp-32);
            padding-bottom: var(--sp-12);
        }
        .resource-strip {
            grid-template-columns: 100%;
            gap: var(--sp-4);
            padding: var(--sp-8) 0;
        }
        .strip-watermark {
            display: none;
        }
        .strip-stat-block {
            grid-column: 1;
        }
        .latest-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
