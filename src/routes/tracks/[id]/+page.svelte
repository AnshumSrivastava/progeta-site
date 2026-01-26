<script>
    import { page } from "$app/stores";
    import { slide } from "svelte/transition";
    import { careerTracks } from "$lib/content/jobs";
    import { technicalModules, softSkillsModules } from "$lib/content/modules";

    $: id = parseInt($page.params.id);
    $: track = careerTracks.find((t) => t.id === id);

    // STATE
    let expandedModuleId = null;

    function toggleModule(modId) {
        if (expandedModuleId === modId) {
            expandedModuleId = null;
        } else {
            expandedModuleId = modId;
        }
    }

    function getModuleDetails(mod) {
        const list =
            mod.type === "Technical" ? technicalModules : softSkillsModules;
        return list.find((m) => String(m.id) === String(mod.id)) || mod;
    }

    // HYDRATED PHASES
    let phases = [];
    $: if (track && track.phases) {
        phases = track.phases.map((p) => ({
            ...p,
            modules: p.modules.map((m) => {
                const details = getModuleDetails(m);
                return {
                    ...m,
                    goal: details.goal, // Hydrated Goal
                    tools: details.tools, // Hydrated Tools
                    dbId: details.id,
                };
            }),
        }));
    }

    // DATA LOGIC FOR SIDEBAR
    let techSkills = [];
    let softSkills = [];
    let totalModules = 0;

    $: if (track && track.phases) {
        const uniqueTech = new Set();
        const uniqueSoft = new Set();
        let modCount = 0;

        track.phases.forEach((phase) => {
            modCount += phase.modules.length;
            phase.modules.forEach((m) => {
                let label = m.title.replace(/\(.*\)/, "").trim();
                if (label.includes(" & ")) label = label.split(" & ")[0];

                if (m.type === "Technical") uniqueTech.add(label);
                else uniqueSoft.add(label);
            });
        });

        techSkills = Array.from(uniqueTech).slice(0, 8);
        softSkills = Array.from(uniqueSoft).slice(0, 4);
        totalModules = modCount;
    }

    function getModuleLink(cat, modId) {
        return `/modules/${cat}/${modId}?trackId=${id}`;
    }
</script>

<svelte:head>
    <title>{track ? track.title : "Details"} | Progeta</title>
</svelte:head>

{#if track}
    <!-- MARK XV: ZEN PROFESSIONAL LAYOUT -->
    <div class="zen-layout">
        <div class="grid-container">
            <!-- LEFT COLUMN: CONTEXT -->
            <aside class="col-left">
                <!-- HERO CARD -->
                <div class="card-soft hero-card">
                    <div class="card-header">
                        <span class="pill-label"
                            >Professional Track 0{track.id}</span
                        >
                        <div class="status-badge">
                            <span class="dot"></span> Open
                        </div>
                    </div>

                    <h1>{track.title}</h1>
                    <p class="desc">{track.description}</p>

                    <div class="metrics-row">
                        <div class="metric">
                            <span class="m-val">24</span>
                            <span class="m-lbl">Weeks</span>
                        </div>
                        <div class="sep"></div>
                        <div class="metric">
                            <span class="m-val">{totalModules}</span>
                            <span class="m-lbl">Units</span>
                        </div>
                        <div class="sep"></div>
                        <div class="metric">
                            <span class="m-val">Pro</span>
                            <span class="m-lbl">Level</span>
                        </div>
                    </div>

                    <button class="btn-primary">
                        Start Role Preparation
                    </button>
                </div>

                <!-- SKILL MATRIX -->
                <div class="card-soft">
                    <h3 class="card-title">Core Capabilities</h3>
                    <div class="zen-tags">
                        {#each techSkills as skill}
                            <span class="z-tag">{skill}</span>
                        {/each}
                    </div>
                </div>

                <!-- DELIVERABLES -->
                <div class="card-soft">
                    <h3 class="card-title">What You'll Deliver</h3>
                    <ul class="zen-list">
                        {#if track.deliverables}
                            {#each track.deliverables as item}
                                <li>
                                    <div class="icon-box">✓</div>
                                    <div class="li-content">
                                        <strong>{item.title}</strong>
                                        <span>{item.desc}</span>
                                    </div>
                                </li>
                            {/each}
                        {/if}
                    </ul>
                </div>
            </aside>

            <!-- RIGHT COLUMN: ROADMAP -->
            <section class="col-right">
                <div class="card-soft roadmap-card">
                    <div class="card-header-lg">
                        <h2>Execution Roadmap</h2>
                        <span class="sub-text">Detailed Syllabus Preview</span>
                    </div>

                    <div class="roadmap-flow">
                        {#each phases as phase, i}
                            <div class="phase-group">
                                <div class="phase-title">
                                    <span class="p-num">0{i + 1}</span>
                                    <h3>{phase.name}</h3>
                                </div>

                                <div class="module-stack">
                                    {#each phase.modules as m, j}
                                        <!-- ZEN ACCORDION -->
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                                        <div
                                            class="z-item {expandedModuleId ===
                                            m.id
                                                ? 'active'
                                                : ''}"
                                        >
                                            <div
                                                class="z-header"
                                                on:click={() =>
                                                    toggleModule(m.id)}
                                            >
                                                <div class="zh-left">
                                                    <span class="zh-num"
                                                        >{j + 1}</span
                                                    >
                                                    <span class="zh-title"
                                                        >{m.title}</span
                                                    >
                                                </div>
                                                <div class="zh-right">
                                                    <span
                                                        class="zh-icon"
                                                        class:rotated={expandedModuleId ===
                                                            m.id}
                                                    >
                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                        >
                                                            <path
                                                                d="M6 9l6 6 6-6"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            {#if expandedModuleId === m.id}
                                                <div
                                                    class="z-body"
                                                    transition:slide={{
                                                        duration: 250,
                                                        axis: "y",
                                                    }}
                                                >
                                                    <div class="zb-inner">
                                                        {#if m.goal}
                                                            <div
                                                                class="zb-block"
                                                            >
                                                                <span
                                                                    class="zb-label"
                                                                    >Mission
                                                                    Goal</span
                                                                >
                                                                <p>{m.goal}</p>
                                                            </div>
                                                        {/if}
                                                        {#if m.tools}
                                                            <div
                                                                class="zb-block"
                                                            >
                                                                <span
                                                                    class="zb-label"
                                                                    >Tools &
                                                                    Stack</span
                                                                >
                                                                <div
                                                                    class="tool-pills"
                                                                >
                                                                    {#each m.tools.split(", ") as t}
                                                                        <span
                                                                            class="tp"
                                                                            >{t}</span
                                                                        >
                                                                    {/each}
                                                                </div>
                                                            </div>
                                                        {/if}

                                                        <div class="zb-action">
                                                            <a
                                                                href={getModuleLink(
                                                                    m.type ===
                                                                        "Technical"
                                                                        ? "technical"
                                                                        : "soft_skills",
                                                                    m.dbId,
                                                                )}
                                                                class="btn-link-zen"
                                                            >
                                                                View Full
                                                                Briefing →
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/if}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </section>
        </div>
    </div>
{:else}
    <div class="layout-error">
        <h1>Solution Not Found</h1>
        <a href="/tracks">Return to Base</a>
    </div>
{/if}

<style>
    /* --- MARK XV: ZEN PROFESSIONAL --- */
    :root {
        --z-bg: #0f1115; /* Soft Charcoal */
        --z-card: #16181d; /* Surface L1 */
        --z-card-h: #1c1e24; /* Surface L2 */
        --z-text: #f3f4f6;
        --z-text-dim: #9ca3af;
        --z-accent: #3a3f4b;
        --z-border: rgba(255, 255, 255, 0.06);

        --font-body: "Inter", sans-serif;
        --font-head: "Manrope", sans-serif;

        --radius: 16px;
    }

    /* GLOBAL RESET */
    .zen-layout {
        background-color: var(--z-bg);
        color: var(--z-text);
        font-family: var(--font-body);
        min-height: 100vh;
        width: 100%;
        padding-top: 100px;
        padding-bottom: 80px;
    }

    .grid-container {
        max-width: 1400px; /* Slightly tighter for focus */
        margin: 0 auto;
        padding: 0 40px;
        display: grid;
        grid-template-columns: 1fr 1.2fr; /* Right col slightly wider for content */
        gap: 40px;
        align-items: start;
    }

    /* CARDS */
    .card-soft {
        background: var(--z-card);
        border: 1px solid var(--z-border);
        border-radius: var(--radius);
        padding: 32px;
        margin-bottom: 24px;
        /* Subtle shadow for depth */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    /* LEFT COL */
    .col-left {
        display: flex;
        flex-direction: column;
        position: sticky;
        top: 110px;
        height: fit-content;
    }

    /* HERO */
    .card-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
    }
    .pill-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--z-text-dim);
        background: var(--z-accent);
        padding: 4px 10px;
        border-radius: 100px;
    }
    .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: #10b981;
    }
    .dot {
        width: 6px;
        height: 6px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    }

    h1 {
        font-family: var(--font-head);
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 16px;
        letter-spacing: -0.02em;
    }
    .desc {
        color: var(--z-text-dim);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 32px;
    }

    .metrics-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 32px;
        border-bottom: 1px solid var(--z-border);
        margin-bottom: 32px;
    }
    .sep {
        width: 1px;
        height: 30px;
        background: var(--z-border);
    }
    .metric {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .m-val {
        font-family: var(--font-head);
        font-size: 1.25rem;
        font-weight: 700;
        color: #fff;
    }
    .m-lbl {
        font-size: 0.75rem;
        color: var(--z-text-dim);
        text-transform: uppercase;
        margin-top: 4px;
    }

    .btn-primary {
        width: 100%;
        background: #fff;
        color: #000;
        font-weight: 600;
        padding: 16px;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
        font-family: var(--font-body);
        font-size: 1rem;
    }
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
    }

    /* TAGS */
    .card-title {
        font-family: var(--font-head);
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: #fff;
    }
    .zen-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .z-tag {
        font-size: 0.8rem;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--z-border);
        border-radius: 8px;
        color: var(--z-text-dim);
    }

    /* LIST */
    .zen-list {
        list-style: none;
        padding: 0;
    }
    .zen-list li {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;
        align-items: flex-start;
    }
    .icon-box {
        min-width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        color: #fff;
    }
    .li-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .li-content strong {
        font-size: 0.95rem;
        color: #fff;
    }
    .li-content span {
        font-size: 0.85rem;
        color: var(--z-text-dim);
        line-height: 1.4;
    }

    /* ROADMAP */
    .card-header-lg {
        margin-bottom: 40px;
    }
    .card-header-lg h2 {
        font-family: var(--font-head);
        font-size: 1.5rem;
        margin-bottom: 8px;
    }
    .sub-text {
        color: var(--z-text-dim);
        font-size: 0.95rem;
    }

    .roadmap-flow {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }
    .phase-group {
    }
    .phase-title {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
    }
    .p-num {
        font-family: var(--font-head);
        font-size: 2rem;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.1);
    }
    .phase-title h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #fff;
    }

    .module-stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    /* ACCORDION */
    .z-item {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid transparent;
        border-radius: 12px;
        transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        overflow: hidden;
    }
    .z-item:hover {
        background: rgba(255, 255, 255, 0.04);
    }
    .z-item.active {
        background: var(--z-card-h);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .z-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 24px;
        cursor: pointer;
    }
    .zh-left {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .zh-num {
        font-size: 0.8rem;
        color: var(--z-text-dim);
        width: 20px;
    }
    .zh-title {
        font-weight: 500;
        color: var(--z-text);
        font-size: 1rem;
    }
    .zh-icon {
        color: var(--z-text-dim);
        transition: transform 0.3s;
        display: flex;
        align-items: center;
    }
    .zh-icon.rotated {
        transform: rotate(180deg);
        color: #fff;
    }

    /* EXPANDED CONTENT */
    .z-body {
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .zb-inner {
        padding: 24px 24px 24px 60px; /* Indent to align with title */
    }

    .zb-block {
        margin-bottom: 20px;
    }
    .zb-label {
        display: block;
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
        margin-bottom: 8px;
        letter-spacing: 0.05em;
    }
    .zb-block p {
        font-size: 0.95rem;
        line-height: 1.6;
        color: #d1d5db;
        margin: 0;
        max-width: 600px;
    }

    .tool-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .tp {
        font-size: 0.75rem;
        padding: 4px 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        color: #d1d5db;
    }

    .btn-link-zen {
        display: inline-flex;
        align-items: center;
        font-size: 0.9rem;
        color: #fff;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 2px;
        transition: border-color 0.2s;
    }
    .btn-link-zen:hover {
        border-color: #fff;
    }

    /* RESPONSIVE */
    @media (max-width: 1000px) {
        .grid-container {
            grid-template-columns: 1fr;
        }
        .col-left {
            position: static;
            margin-bottom: 40px;
        }
        .zb-inner {
            padding: 20px;
        }
    }
</style>
