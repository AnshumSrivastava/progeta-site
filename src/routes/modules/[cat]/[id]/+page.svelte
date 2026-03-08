<script>
    import { page } from "$app/stores";
    import { technicalModules, softSkillsModules } from "$lib/content/modules";
    import { careerTracks } from "$lib/content/jobs";
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

    $: cat = $page.params.cat;
    $: id = $page.params.id;
    $: list = cat === "technical" ? technicalModules : softSkillsModules;
    $: module = list ? list.find((m) => String(m.id) === String(id)) : null;

    /* Related tracks */
    let relatedTracks = [];
    $: if (module) {
        relatedTracks = careerTracks.filter((track) =>
            track.phases.some((phase) =>
                phase.modules.some((m) => String(m.id) === String(module.id)),
            ),
        );
    }

    /* Syllabus */
    $: syllabus = module?.syllabus || [
        {
            title: "Core Concepts",
            desc: module?.skills || "Competency development.",
        },
        {
            title: "Methodology",
            desc: module?.goal || "Operational execution.",
        },
    ];

    /* Tools */
    $: toolList =
        module?.toolDetails ||
        (module?.tools
            ? module.tools
                  .split(/[,.]/)
                  .filter((t) => t.trim().length > 0)
                  .map((t) => ({ name: t.trim(), desc: "" }))
            : []);

    /* Skills as outcomes */
    $: skillsList = module?.skills
        ? module.skills.split(".").filter((s) => s.trim().length > 0)
        : [];
</script>

<svelte:head>
    <title>{module ? module.title : "Module"} | Progeta Technologies</title>
</svelte:head>

{#if module}
    <section class="md-page">
        <div class="container">
            <!-- HEADER -->
            <div class="module-header">
                <span class="module-watermark" aria-hidden="true"
                    >#{module.id}</span
                >
                <div class="module-header-content">
                    <ScrollReveal>
                        <span class="breadcrumb"
                            >LAUNCHPAD → MODULES → {cat.toUpperCase()} → #{module.id}</span
                        >
                        <span class="cat-tag">{module.category || "Core"}</span>
                        <h1 class="md-title">{module.title}</h1>
                        <p class="md-goal">
                            {module.goal || "No objective defined."}
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            <!-- BODY -->
            <div class="md-body">
                <!-- Panel 1: What you will learn -->
                <div class="md-section">
                    <ScrollReveal>
                        <span class="eyebrow">ABOUT THIS MODULE</span>
                        <h2 class="section-heading">
                            What you will learn in this module.
                        </h2>
                        <p class="md-prose">
                            {module.goal ||
                                "This module covers the fundamentals of the subject area."}
                            {module.skills || ""}
                        </p>
                    </ScrollReveal>
                </div>

                <!-- Panel 2: Outcomes -->
                {#if skillsList.length > 0}
                    <div class="md-section md-section--surface">
                        <ScrollReveal>
                            <span class="eyebrow">OUTCOMES</span>
                            <h2 class="section-heading">
                                What you will be able to do.
                            </h2>
                        </ScrollReveal>
                        <div class="outcomes-grid">
                            {#each skillsList as skill, i}
                                <ScrollReveal delay={i * 60}>
                                    <div class="outcome-item">
                                        <div class="outcome-bullet"></div>
                                        <span class="outcome-text"
                                            >{skill.trim()}</span
                                        >
                                    </div>
                                </ScrollReveal>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- Panel 3: Tools -->
                {#if toolList.length > 0}
                    <div class="md-section">
                        <ScrollReveal>
                            <span class="eyebrow">TOOLS & STACK</span>
                            <h2 class="section-heading">
                                What you will work with.
                            </h2>
                        </ScrollReveal>
                        <div class="tools-grid">
                            {#each toolList as tool}
                                <div class="tool-chip">{tool.name}</div>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- Panel 4: Metadata & Links -->
                <div class="md-section md-section--surface">
                    <div class="md-meta-grid">
                        <div class="md-meta-col">
                            <ScrollReveal>
                                <span class="eyebrow">MODULE INFO</span>
                                <div class="meta-rows">
                                    <div class="meta-row">
                                        <span class="meta-label">TYPE</span
                                        ><span class="meta-value"
                                            >{module.type}</span
                                        >
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">CATEGORY</span
                                        ><span class="meta-value"
                                            >{module.category || "Core"}</span
                                        >
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">FORMAT</span
                                        ><span class="meta-value"
                                            >Self-paced with live review</span
                                        >
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                        <div class="md-meta-col">
                            <ScrollReveal delay={100}>
                                <span class="eyebrow">INCLUDED IN</span>
                                {#if relatedTracks.length > 0}
                                    <ul class="track-links">
                                        {#each relatedTracks as track}
                                            <li>
                                                <a href="/tracks/{track.id}"
                                                    >{track.title} →</a
                                                >
                                            </li>
                                        {/each}
                                    </ul>
                                {:else}
                                    <p class="meta-note">
                                        This module is available as a standalone
                                        workshop.
                                    </p>
                                {/if}
                                <a
                                    href="/launchpad/workshops"
                                    class="workshop-cta"
                                    >Take this as a standalone workshop →</a
                                >
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md-back">
                <a href="/modules" class="back-link">← Back to module catalog</a
                >
            </div>
        </div>
    </section>
{:else}
    <div class="md-404">
        <h1>Module not found.</h1>
        <a href="/modules">← Back to catalog</a>
    </div>
{/if}

<style>
    .container {
        max-width: 1100px;
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
        font-size: clamp(24px, 3vw, 36px);
        color: #edf0ff;
        margin-bottom: 16px;
    }

    .md-page {
        background: #020408;
        padding: clamp(120px, 14vw, 180px) 0 clamp(80px, 11vw, 144px);
    }

    /* ── HEADER ── */
    .module-header {
        position: relative;
        padding-bottom: 48px;
        border-bottom: 1px solid #0f1220;
        margin-bottom: 64px;
    }
    .module-watermark {
        position: absolute;
        top: -20px;
        right: 0;
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 120px;
        color: var(--ground);
        line-height: 1;
        pointer-events: none;
        user-select: none;
        z-index: 0;
    }
    .module-header-content {
        position: relative;
        z-index: 1;
    }

    .breadcrumb {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #1e2440;
        letter-spacing: 0.12em;
        display: block;
        margin-bottom: 16px;
    }
    .cat-tag {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #e05c20;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        display: block;
        margin-bottom: 16px;
    }
    .md-title {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(32px, 4.5vw, 56px);
        line-height: 1;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 16px;
    }
    .md-goal {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 17px;
        color: var(--ink-2);
        line-height: 1.7;
        max-width: 600px;
    }

    /* ── BODY SECTIONS ── */
    .md-section {
        padding: clamp(48px, 6vw, 80px) 0;
    }
    .md-section--surface {
        background: var(--ground);
        margin: 0 calc(-1 * clamp(20px, 4vw, 64px));
        padding-left: clamp(20px, 4vw, 64px);
        padding-right: clamp(20px, 4vw, 64px);
    }

    .md-prose {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        line-height: 1.8;
        max-width: 680px;
    }

    /* Outcomes */
    .outcomes-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: #0f1220;
        margin-top: 32px;
    }
    @media (max-width: 640px) {
        .outcomes-grid {
            grid-template-columns: 1fr;
        }
    }
    .outcome-item {
        background: var(--ground);
        padding: 20px 24px;
        display: flex;
        gap: 14px;
        align-items: flex-start;
    }
    .outcome-bullet {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #e05c20;
        flex-shrink: 0;
        margin-top: 6px;
    }
    .outcome-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #edf0ff;
        line-height: 1.6;
    }

    /* Tools */
    .tools-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 24px;
    }
    .tool-chip {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.08em;
        padding: 6px 14px;
        border: 1px solid #171b30;
        border-radius: 3px;
        color: var(--ink-2);
    }

    /* Meta */
    .md-meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(32px, 4vw, 64px);
    }
    @media (max-width: 640px) {
        .md-meta-grid {
            grid-template-columns: 1fr;
        }
    }
    .meta-rows {
        display: flex;
        flex-direction: column;
    }
    .meta-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 10px 0;
        border-bottom: 1px solid #0f1220;
    }
    .meta-row:last-child {
        border-bottom: none;
    }
    .meta-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-3);
    }
    .meta-value {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #edf0ff;
    }

    .track-links {
        list-style: none;
        padding: 0;
    }
    .track-links li {
        margin-bottom: 10px;
    }
    .track-links a {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #edf0ff;
        text-decoration: none;
    }
    .track-links a:hover {
        color: #e05c20;
    }
    .meta-note {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: var(--ink-2);
    }
    .workshop-cta {
        display: inline-block;
        margin-top: 20px;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #e05c20;
        text-decoration: none;
    }
    .workshop-cta:hover {
        text-decoration: underline;
    }

    .md-back {
        margin-top: 48px;
    }
    .back-link {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: var(--ink-3);
        text-decoration: none;
        letter-spacing: 0.1em;
    }
    .back-link:hover {
        color: #e05c20;
    }

    /* 404 */
    .md-404 {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #020408;
        gap: 16px;
    }
    .md-404 h1 {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: 36px;
        color: #edf0ff;
    }
    .md-404 a {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #e05c20;
        text-decoration: none;
    }
</style>
