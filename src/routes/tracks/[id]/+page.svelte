<script>
    import { page } from "$app/stores";
    import { careerTracks } from "$lib/content/jobs";
    import { technicalModules, softSkillsModules } from "$lib/content/modules";
    import { tracksMeta, getLevelLabel } from "$lib/content/launchpad-data";
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import EnrollmentModal from "$lib/components/ui/EnrollmentModal.svelte";

    let isModalOpen = false;

    $: id = parseInt($page.params.id);
    $: track = careerTracks.find((t) => t.id === id);
    $: meta = tracksMeta.find((t) => t.id === id);

    /* Module accordion */
    let expandedModuleId = null;
    function toggleModule(modId) {
        expandedModuleId = expandedModuleId === modId ? null : modId;
    }

    function getModuleDetails(mod) {
        const list =
            mod.type === "Technical" ? technicalModules : softSkillsModules;
        return list.find((m) => String(m.id) === String(mod.id)) || mod;
    }

    /* Hydrated phases */
    let phases = [];
    $: if (track && track.phases) {
        phases = track.phases.map((p) => ({
            ...p,
            modules: p.modules.map((m) => {
                const d = getModuleDetails(m);
                return { ...m, goal: d.goal, tools: d.tools, dbId: d.id };
            }),
        }));
    }

    /* Total module count */
    let totalModules = 0;
    $: if (track && track.phases) {
        totalModules = track.phases.reduce(
            (sum, p) => sum + p.modules.length,
            0,
        );
    }

    function getModuleLink(cat, modId) {
        return `/modules/${cat}/${modId}?trackId=${id}`;
    }
</script>

<svelte:head>
    <title>{track ? track.title : "Track Detail"} | Progeta Technologies</title>
</svelte:head>

{#if track && meta}
    <!-- ═══ HERO ═══ -->
    <section class="td-hero">
        <div class="td-hero__grid container--wide">
            <div class="td-hero__left">
                <ScrollReveal>
                    <span class="breadcrumb"
                        >LAUNCHPAD → TRACKS → {meta.num}</span
                    >
                    <span class="track-tag">{meta.num}</span>
                    <h1 class="td-hero__title">{track.title}</h1>
                    <p class="td-hero__tagline">{meta.tagline}</p>
                    <p class="td-hero__body">{meta.description}</p>
                </ScrollReveal>
            </div>
            <div class="td-hero__right">
                <ScrollReveal delay={200}>
                    <div class="track-meta-card">
                        {#each [{ label: "DURATION", value: "6 Months", cls: "" }, { label: "LEVEL", value: getLevelLabel(meta.level), cls: "" }, { label: "FORMAT", value: "Hybrid (Campus + Self-Directed)", cls: "" }, { label: "MODULES", value: `${meta.moduleCount.tech} Technical + ${meta.moduleCount.prof} Professional`, cls: "" }, { label: "CREDENTIAL", value: meta.credentialName, cls: "" }, { label: "STATUS", value: "● Enrolling Now", cls: "green" }] as row}
                            <div class="meta-row">
                                <span class="meta-label">{row.label}</span>
                                <span
                                    class="meta-value"
                                    class:ember={row.cls === "ember"}
                                    class:green={row.cls === "green"}
                                    >{row.value}</span
                                >
                            </div>
                        {/each}
                    </div>
                    <button
                        on:click={() => (isModalOpen = true)}
                        class="track-enroll-btn">ENROLL IN THIS TRACK →</button
                    >
                </ScrollReveal>
            </div>
        </div>
    </section>

    <!-- ═══ COMPETENCIES ═══ -->
    <section class="td-competencies">
        <div class="container">
            <ScrollReveal>
                <span class="eyebrow">WHAT YOU WILL LEARN</span>
                <h2 class="section-heading">Competencies you will build.</h2>
            </ScrollReveal>
            <div class="competency-grid">
                {#each meta.competencies as comp, i}
                    <ScrollReveal delay={i * 60}>
                        <div class="competency-item">
                            <div class="competency-bullet"></div>
                            <div class="competency-text">
                                <strong>{comp.title}</strong>
                                {comp.body}
                            </div>
                        </div>
                    </ScrollReveal>
                {/each}
            </div>
        </div>
    </section>

    <!-- ═══ MODULE BREAKDOWN ═══ -->
    <section class="td-modules">
        <div class="container">
            <ScrollReveal>
                <span class="eyebrow">WHAT'S INSIDE</span>
                <h2 class="section-heading">Modules in this track.</h2>
                <p class="section-body">
                    This track draws from the following modules in the LaunchPad
                    catalog. Each module is a focused unit of instruction with
                    practical exercises.
                </p>
            </ScrollReveal>

            <div class="module-list">
                {#each phases as phase, pi}
                    <div class="phase-header">
                        <span class="phase-num">PHASE 0{pi + 1}</span>
                        <span class="phase-name">{phase.name}</span>
                    </div>
                    {#each phase.modules as m, mi}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div
                            class="module-row"
                            class:open={expandedModuleId === m.id}
                        >
                            <div
                                class="module-row-header"
                                on:click={() => toggleModule(m.id)}
                            >
                                <span class="module-seq"
                                    >M{String(mi + 1).padStart(2, "0")}</span
                                >
                                <span class="module-name">{m.title}</span>
                                <span class="module-type-tag"
                                    >{m.type === "Technical"
                                        ? "TECHNICAL"
                                        : "PROFESSIONAL"}</span
                                >
                                <span
                                    class="module-expand-icon"
                                    class:rotated={expandedModuleId === m.id}
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        ><path d="M6 9l6 6 6-6" /></svg
                                    >
                                </span>
                            </div>
                            {#if expandedModuleId === m.id}
                                <div class="module-body">
                                    <div class="module-body-inner">
                                        {#if m.goal}<p>{m.goal}</p>{/if}
                                        <a
                                            href={getModuleLink(
                                                m.type === "Technical"
                                                    ? "technical"
                                                    : "soft_skills",
                                                m.dbId,
                                            )}
                                            class="module-detail-link"
                                            >View full module →</a
                                        >
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                {/each}
            </div>
            <a href="/modules" class="catalog-link"
                >View all modules in the catalog →</a
            >
        </div>
    </section>

    <!-- ═══ PREREQUISITES & WHO FOR ═══ -->
    <section class="td-prereq">
        <div class="container">
            <div class="prereq-grid">
                <div class="prereq-col">
                    <ScrollReveal>
                        <span class="eyebrow">PREREQUISITES</span>
                        <h2 class="section-heading">
                            What you need before you start.
                        </h2>
                        <ul class="dash-list">
                            {#each meta.prerequisites as item}
                                <li><span class="dash">—</span> {item}</li>
                            {/each}
                        </ul>
                    </ScrollReveal>
                </div>
                <div class="prereq-col">
                    <ScrollReveal delay={100}>
                        <span class="eyebrow">WHO THIS IS FOR</span>
                        <h2 class="section-heading">
                            This track is right for you if...
                        </h2>
                        <ul class="dash-list">
                            {#each meta.whoFor as item}
                                <li><span class="dash">—</span> {item}</li>
                            {/each}
                        </ul>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ ENROLL CTA ═══ -->
    <section class="td-enroll">
        <div class="container">
            <ScrollReveal>
                <div class="td-enroll__inner">
                    <h2 class="section-heading">Ready to start?</h2>
                    <p class="section-body">
                        Enrollment is done through direct contact. We will
                        confirm availability and walk you through the first
                        steps.
                    </p>
                    <div class="td-enroll__ctas">
                        <button
                            on:click={() => (isModalOpen = true)}
                            class="btn-ember">ENROLL NOW →</button
                        >
                        <a
                            href="mailto:operations@progeta.tech?subject=Question - {track.title}"
                            class="btn-ghost-ember">ASK A QUESTION →</a
                        >
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
{:else}
    <div class="td-404">
        <h1>Track not found.</h1>
        <a href="/tracks">← Back to all tracks</a>
    </div>
{/if}

<EnrollmentModal
    bind:isOpen={isModalOpen}
    trackName={track ? track.title : ""}
/>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 64px);
    }
    .container--wide {
        max-width: 1320px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 48px);
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
        font-size: clamp(28px, 3.5vw, 40px);
        color: #edf0ff;
        margin-bottom: 14px;
    }
    .section-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: var(--ink-2);
        line-height: 1.7;
        max-width: 520px;
    }
    .ember {
        color: #e05c20;
    }
    .green {
        color: #18c96a;
    }

    /* ── HERO ── */
    .td-hero {
        min-height: 60vh;
        display: flex;
        align-items: center;
        background: #020408;
        padding: clamp(120px, 14vw, 180px) 0 clamp(60px, 8vw, 100px);
    }
    .td-hero__grid {
        display: grid;
        grid-template-columns: 60% 40%;
        gap: clamp(32px, 4vw, 64px);
        align-items: start;
    }
    @media (max-width: 900px) {
        .td-hero__grid {
            grid-template-columns: 1fr;
        }
    }

    .breadcrumb {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #1e2440;
        letter-spacing: 0.12em;
        display: block;
        margin-bottom: 14px;
    }
    .track-tag {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #e05c20;
        border: 1px solid #e05c20;
        padding: 2px 8px;
        border-radius: 2px;
        display: inline-block;
        margin-bottom: 14px;
    }
    .td-hero__title {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(36px, 5vw, 60px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 14px;
    }
    .td-hero__tagline {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: clamp(16px, 2vw, 20px);
        color: #edf0ff;
        margin-bottom: 16px;
    }
    .td-hero__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        max-width: 480px;
        line-height: 1.75;
    }

    /* Metadata card */
    .track-meta-card {
        padding: clamp(28px, 4vw, 44px);
        background: var(--ground);
        border-left: 2px solid #e05c20;
    }
    .meta-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 12px 0;
        border-bottom: 1px solid #0f1220;
    }
    .meta-row:last-child {
        border-bottom: none;
    }
    .meta-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
    }
    .meta-value {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #edf0ff;
        text-align: right;
        max-width: 240px;
    }

    .track-enroll-btn {
        display: block;
        width: 100%;
        margin-top: 20px;
        padding: 16px;
        background: #e05c20;
        color: #edf0ff;
        border: none;
        font-family: "DM Mono", monospace;
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        transition: background 0.2s;
    }
    .track-enroll-btn:hover {
        background: #c44e14;
    }

    /* ── COMPETENCIES ── */
    .td-competencies {
        background: var(--ground);
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .competency-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: #0f1220;
        margin-top: 40px;
    }
    @media (max-width: 640px) {
        .competency-grid {
            grid-template-columns: 1fr;
        }
    }
    .competency-item {
        background: var(--ground);
        padding: 24px 28px;
        display: flex;
        gap: 16px;
        align-items: flex-start;
    }
    .competency-bullet {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #e05c20;
        flex-shrink: 0;
        margin-top: 7px;
    }
    .competency-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.65;
        color: var(--ink-2);
    }
    .competency-text strong {
        color: #edf0ff;
        font-weight: 500;
        display: block;
        margin-bottom: 4px;
        font-size: 15px;
    }

    /* ── MODULES ── */
    .td-modules {
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .module-list {
        margin-top: 36px;
        border-top: 1px solid #0f1220;
    }
    .phase-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px 0 12px;
    }
    .phase-num {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #1e2440;
        letter-spacing: 0.12em;
    }
    .phase-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 15px;
        color: #edf0ff;
    }

    .module-row {
        border-bottom: 1px solid #0f1220;
    }
    .module-row-header {
        display: grid;
        grid-template-columns: 56px 1fr auto auto;
        gap: 0 16px;
        padding: 18px 0;
        cursor: pointer;
        align-items: center;
        transition: background 0.15s;
        border-radius: 4px;
    }
    .module-row-header:hover {
        background: rgba(7, 9, 15, 0.5);
    }
    .module-seq {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #1e2440;
    }
    .module-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: #edf0ff;
    }
    .module-type-tag {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ink-3);
        padding: 2px 7px;
        border: 1px solid #171b30;
        border-radius: 3px;
    }
    .module-expand-icon {
        font-size: 14px;
        color: var(--ink-3);
        transition: transform 0.2s;
        display: flex;
        align-items: center;
    }
    .module-expand-icon.rotated {
        transform: rotate(180deg);
    }

    .module-body {
        overflow: hidden;
    }
    .module-body-inner {
        padding: 0 0 20px 72px;
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.7;
        color: var(--ink-2);
        max-width: 600px;
    }
    .module-detail-link {
        display: inline-block;
        margin-top: 10px;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #e05c20;
        text-decoration: none;
    }
    .module-detail-link:hover {
        text-decoration: underline;
    }

    .catalog-link {
        display: inline-block;
        margin-top: 24px;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #e05c20;
        letter-spacing: 0.1em;
        text-decoration: none;
    }
    .catalog-link:hover {
        text-decoration: underline;
    }

    /* ── PREREQUISITES ── */
    .td-prereq {
        background: var(--ground);
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .prereq-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(32px, 4vw, 64px);
    }
    @media (max-width: 768px) {
        .prereq-grid {
            grid-template-columns: 1fr;
        }
    }
    .dash-list {
        list-style: none;
        padding: 0;
        margin-top: 20px;
    }
    .dash-list li {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 13px;
        color: var(--ink-2);
        line-height: 2;
    }
    .dash {
        color: #e05c20;
        margin-right: 8px;
    }

    /* ── ENROLL CTA ── */
    .td-enroll {
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .td-enroll__inner {
        text-align: center;
        max-width: 480px;
        margin: 0 auto;
    }
    .td-enroll__inner .section-body {
        max-width: 100%;
        margin: 0 auto;
    }
    .td-enroll__ctas {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 28px;
        flex-wrap: wrap;
    }
    .btn-ember {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        background: #e05c20;
        color: #edf0ff;
        padding: 14px 28px;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        text-decoration: none;
        transition: background 0.2s;
    }
    .btn-ember:hover {
        background: #c44e14;
    }
    .btn-ghost-ember {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        border: 1px solid #e05c20;
        color: #e05c20;
        padding: 14px 28px;
        border-radius: 4px;
        text-decoration: none;
        background: transparent;
        transition: background 0.2s;
    }
    .btn-ghost-ember:hover {
        background: rgba(224, 92, 32, 0.08);
    }

    /* ── 404 ── */
    .td-404 {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #020408;
        gap: 16px;
    }
    .td-404 h1 {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: 36px;
        color: #edf0ff;
    }
    .td-404 a {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #e05c20;
        text-decoration: none;
    }
</style>
