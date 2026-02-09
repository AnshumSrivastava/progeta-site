<script>
    import { page } from "$app/stores";
    import { technicalModules, softSkillsModules } from "$lib/content/modules";
    import { careerTracks } from "$lib/content/jobs";
    import { base } from "$app/paths";

    $: cat = $page.params.cat;
    $: id = $page.params.id;
    $: list = cat === "technical" ? technicalModules : softSkillsModules;
    $: module = list ? list.find((m) => String(m.id) === String(id)) : null;

    // FIND RELATED TRACKS
    let relatedTracks = [];
    $: if (module) {
        relatedTracks = careerTracks.filter((track) =>
            track.phases.some((phase) =>
                phase.modules.some((m) => String(m.id) === String(module.id)),
            ),
        );
    }

    // SYLLABUS LOGIC
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

    // TOOLS LOGIC
    $: toolList =
        module?.toolDetails ||
        (module?.tools
            ? module.tools
                  .split(/[,.]/)
                  .filter((t) => t.trim().length > 0)
                  .map((t) => ({ name: t.trim(), desc: "Standard Toolkit" }))
            : []);

    // SKILLS LOGIC
    $: skillsList = module?.skills
        ? module.skills.split(".").filter((s) => s.trim().length > 0)
        : [];

    // CLEAN TEXT HELPER (Removes (...) content)
    const cleanText = (text) => text.replace(/\s*\(.*?\)\s*/g, "").trim();
</script>

<svelte:head>
    <title>{module ? cleanText(module.title) : "Details"} | Progeta</title>
</svelte:head>

{#if module}
    <div class="zen-layout">
        <!-- ATMOSPHERE -->
        <div class="hero-glow"></div>

        <div class="zen-container">
            <!-- BREADCRUMB -->
            <div class="nav-bar">
                <a href="{base}/modules" class="nav-link">← RETURN TO BASE</a>
            </div>

            <!-- IMMERSIVE HERO -->
            <header class="detail-hero">
                <span class="dh-super">{module.category || "Capability"}</span>
                <h1>{cleanText(module.title)}</h1>
                <p class="hero-goal">
                    {module.goal || "No objective defined."}
                </p>

                <!-- INCLUDED IN (Moved from Sidebar) -->
                {#if relatedTracks.length > 0}
                    <div class="dh-tracks">
                        <span class="track-label">INCLUDED IN:</span>
                        <div class="track-list">
                            {#each relatedTracks as track}
                                <a
                                    href="{base}/tracks/{track.id}"
                                    class="mini-track-pill"
                                >
                                    {cleanText(track.title)}
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
            </header>

            <!-- MAIN GRID -->
            <div class="detail-grid">
                <!-- LEFT: ARSENAL & SKILLS (Swapped) -->
                <aside class="col-side">
                    <!-- TOOLS -->
                    <section class="zen-card tool-card">
                        <h3>Tactical Arsenal</h3>
                        {#if toolList.length > 0}
                            <div class="tool-list-clean">
                                {#each toolList as tool}
                                    <div class="tool-item">
                                        <strong>{cleanText(tool.name)}</strong>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <p class="empty-text">
                                No specific tools required.
                            </p>
                        {/if}
                    </section>

                    <!-- SKILLS GAINED -->
                    {#if skillsList.length > 0}
                        <section class="zen-card skill-card">
                            <h3>Skills Acquired</h3>
                            <ul class="skill-list">
                                {#each skillsList as skill}
                                    <li>{skill}</li>
                                {/each}
                            </ul>
                        </section>
                    {/if}
                </aside>

                <!-- RIGHT: TIMELINE SYLLABUS -->
                <div class="col-main">
                    <section class="zen-card">
                        <h2>Operational Phase</h2>
                        <div class="timeline-container">
                            {#each syllabus as item, i}
                                <div class="timeline-node">
                                    <div class="node-marker">
                                        <div class="node-dot"></div>
                                        <div class="node-line"></div>
                                    </div>
                                    <div class="node-content">
                                        <span class="node-idx">0{i + 1}</span>
                                        <h3>{cleanText(item.title)}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="layout-error">
        <h1>Capability Not Found</h1>
        <a href="{base}/modules">Return to Catalog</a>
    </div>
{/if}

<style>
    /* --- IMMERSIVE TIMELINE (MARK XVI - REVISION A) --- */
    :root {
        --z-bg: #0f1115;
        --z-card: #14161b;
        --z-text: #e5e7eb;
        --z-text-dim: #9ca3af;
        --z-border: rgba(255, 255, 255, 0.08);
        --z-accent: #3b82f6; /* Subtle Blue */
        --font-body: "Inter", sans-serif;
        --font-head: "Manrope", sans-serif;
        --radius: 20px;
    }

    .zen-layout {
        background-color: var(--z-bg);
        color: var(--z-text);
        font-family: var(--font-body);
        min-height: 100vh;
        width: 100%;
        position: relative;
        overflow-x: hidden;
    }

    /* ATMOSPHERE */
    .hero-glow {
        position: absolute;
        top: -200px;
        left: 50%;
        transform: translateX(-50%);
        width: 1000px;
        height: 800px;
        background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.08) 0%,
            rgba(15, 17, 21, 0) 70%
        );
        z-index: 0;
        pointer-events: none;
    }

    .zen-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 60px 40px;
        position: relative;
        z-index: 1;
    }

    /* NAV */
    .nav-bar {
        text-align: center;
        margin-bottom: 40px;
    }
    .nav-link {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        color: var(--z-text-dim);
        text-decoration: none;
        letter-spacing: 0.1em;
        border: 1px solid var(--z-border);
        padding: 8px 16px;
        border-radius: 100px;
        transition: 0.2s;
    }
    .nav-link:hover {
        color: #fff;
        border-color: rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.05);
    }

    /* HERO */
    .detail-hero {
        text-align: center;
        margin: 0 auto 80px;
        max-width: 800px;
    }
    .dh-super {
        display: block;
        font-family: var(--font-head);
        font-weight: 700;
        text-transform: uppercase;
        color: var(--z-accent);
        margin-bottom: 16px;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }
    h1 {
        font-family: var(--font-head);
        font-size: 3.5rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.1;
        margin-bottom: 24px;
        color: #fff;
        background: linear-gradient(180deg, #fff 0%, #aaa 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .hero-goal {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--z-text-dim);
        margin-bottom: 32px;
    }

    .dh-tracks {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        margin-top: 32px;
    }
    .track-label {
        font-size: 0.7rem;
        color: var(--z-text-dim);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        opacity: 0.6;
    }
    .track-list {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }
    .mini-track-pill {
        font-size: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--z-border);
        padding: 6px 14px;
        border-radius: 100px;
        color: #fff;
        text-decoration: none;
        transition: 0.2s;
    }
    .mini-track-pill:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }

    /* GRID - SWAPPED: Left is Tools(1fr), Right is Syllabus(1.4fr for space) */
    .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        gap: 60px;
        align-items: start;
    }

    /* LEFT SIDEBAR (STICKY) */
    .col-side {
        position: sticky;
        top: 40px;
    }

    /* CARD STYLING */
    .zen-card {
        margin-bottom: 40px;
    }
    .zen-card h2,
    .zen-card h3 {
        font-family: var(--font-head);
        font-size: 1.1rem;
        color: #fff;
        margin-bottom: 24px;
        letter-spacing: -0.01em;
    }

    /* TIMELINE */
    .timeline-container {
        padding-left: 10px;
    }
    .timeline-node {
        display: flex;
        gap: 24px;
        position: relative;
        padding-bottom: 40px;
    }
    .timeline-node:last-child {
        padding-bottom: 0;
    }
    .timeline-node:last-child .node-line {
        display: none;
    }

    .node-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20px;
        flex-shrink: 0;
    }
    .node-dot {
        width: 12px;
        height: 12px;
        background: var(--z-accent);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
        margin-top: 6px;
    }
    .node-line {
        width: 2px;
        flex-grow: 1;
        background: rgba(59, 130, 246, 0.2);
        margin-top: 4px;
    }

    .node-content {
        padding-top: 0;
    }
    .node-idx {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        color: var(--z-accent);
        display: block;
        margin-bottom: 4px;
        opacity: 0.8;
    }
    .node-content h3 {
        margin: 0 0 8px 0;
        font-size: 1.1rem;
        color: #fff;
    }
    .node-content p {
        margin: 0;
        font-size: 0.95rem;
        color: var(--z-text-dim);
        line-height: 1.6;
    }

    /* TOOL LIST CLEAN */
    .tool-list-clean {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .tool-item {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--z-border);
        border-radius: 8px;
        padding: 12px 16px;
        color: #fff;
        font-size: 0.95rem;
    }

    /* SKILL LIST */
    .skill-list {
        padding-left: 20px;
        color: var(--z-text-dim);
        line-height: 1.6;
        font-size: 0.95rem;
    }
    .skill-list li {
        margin-bottom: 8px;
    }

    .empty-text {
        font-style: italic;
        color: var(--z-text-dim);
        opacity: 0.6;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
        .detail-grid {
            grid-template-columns: 1fr;
        }
        .col-side {
            position: static;
            order: 2;
        } /* Put tools below syllabus on mobile? Or above? */
        .col-main {
            order: 1;
        }
        h1 {
            font-size: 2.5rem;
        }
        .hero-glow {
            width: 100%;
            top: -100px;
        }
        .nav-bar {
            text-align: left;
        }
        .detail-hero {
            text-align: left;
            margin-bottom: 60px;
        }
    }
</style>
