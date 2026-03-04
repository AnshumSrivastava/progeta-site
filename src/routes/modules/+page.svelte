<script>
    import { allModules } from "$lib/content/modules";
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

    let typeFilter = "all";
    let categoryFilter = "all";

    const techCategories = [
        "Offensive Security",
        "GRC & Strategy",
        "Future Tech & AI",
    ];
    const profCategories = [
        "Communication",
        "Management & Business",
        "EQ & Leadership",
    ];

    $: visibleCategories =
        typeFilter === "Soft Skills"
            ? profCategories
            : typeFilter === "Technical"
              ? techCategories
              : [];

    $: showCategoryRow = typeFilter !== "all";

    $: filteredModules = allModules.filter((m) => {
        const matchesType = typeFilter === "all" || m.type === typeFilter;
        const matchesCat =
            categoryFilter === "all" ||
            (m.category && m.category === categoryFilter);
        return matchesType && matchesCat;
    });

    function setType(t) {
        typeFilter = t;
        categoryFilter = "all";
    }
    function setCat(c) {
        categoryFilter = c;
    }

    function getLink(mod) {
        return `/modules/${mod.type === "Technical" ? "technical" : "soft_skills"}/${mod.id}`;
    }

    $: techCount = allModules.filter((m) => m.type === "Technical").length;
    $: profCount = allModules.filter((m) => m.type === "Soft Skills").length;
</script>

<svelte:head>
    <title>Module Catalog | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="{techCount} technical modules. {profCount} professional modules. The complete LaunchPad curriculum."
    />
</svelte:head>

<!-- ═══ HERO ═══ -->
<section class="mod-hero">
    <div class="container">
        <ScrollReveal>
            <span class="eyebrow">MODULE CATALOG · LAUNCHPAD</span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h1 class="mod-hero__heading">
                {techCount} technical modules.<br />{profCount} professional modules.<br
                />Every one live.
            </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
            <p class="mod-hero__body">
                This is the full LaunchPad curriculum. Every module is a focused
                unit of instruction. Modules combine into tracks — or you can
                take individual workshops. Filter by category to find what you
                need.
            </p>
        </ScrollReveal>
    </div>
</section>

<!-- ═══ CATALOG ═══ -->
<section class="mod-catalog">
    <div class="container--wide">
        <div class="filter-bar">
            <div class="filter-row">
                {#each [{ key: "all", label: "ALL" }, { key: "Technical", label: "TECHNICAL" }, { key: "Soft Skills", label: "PROFESSIONAL" }] as btn}
                    <button
                        class="filter-btn"
                        class:active={typeFilter === btn.key}
                        on:click={() => setType(btn.key)}>{btn.label}</button
                    >
                {/each}
            </div>
            {#if showCategoryRow}
                <div class="filter-row">
                    <button
                        class="filter-btn"
                        class:active={categoryFilter === "all"}
                        on:click={() => setCat("all")}>ALL</button
                    >
                    {#each visibleCategories as cat}
                        <button
                            class="filter-btn"
                            class:active={categoryFilter === cat}
                            on:click={() => setCat(cat)}
                            >{cat.toUpperCase()}</button
                        >
                    {/each}
                </div>
            {/if}
        </div>

        <div class="modules-grid">
            {#each filteredModules as mod (mod.id + mod.type)}
                <a href={getLink(mod)} class="module-card">
                    <span class="module-card-cat">{mod.category || "Core"}</span
                    >
                    <span class="module-card-num">#{mod.id}</span>
                    <h3 class="module-card-name">{mod.title}</h3>
                    {#if mod.goal}
                        <p class="module-card-desc">{mod.goal}</p>
                    {/if}
                    <span class="module-card-type">{mod.type}</span>
                </a>
            {/each}

            {#if filteredModules.length === 0}
                <div class="empty-state">
                    <p>No modules match this filter.</p>
                    <button
                        class="reset-btn"
                        on:click={() => {
                            typeFilter = "all";
                            categoryFilter = "all";
                        }}>Clear Filters</button
                    >
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 64px);
    }
    .container--wide {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 48px);
    }
    .eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }

    /* ── HERO ── */
    .mod-hero {
        min-height: 44vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
    }
    .mod-hero__heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(40px, 5.5vw, 64px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 16px;
    }
    .mod-hero__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        max-width: 480px;
        line-height: 1.75;
    }

    /* ── CATALOG ── */
    .mod-catalog {
        background: #020408;
        padding: clamp(40px, 5vw, 64px) 0 clamp(80px, 11vw, 144px);
    }

    .filter-bar {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 40px;
    }
    .filter-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    .filter-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 7px 14px;
        border: 1px solid #171b30;
        border-radius: 3px;
        background: transparent;
        color: #424870;
        cursor: pointer;
        transition: all 0.18s;
    }
    .filter-btn:hover {
        border-color: #e05c20;
        color: #edf0ff;
    }
    .filter-btn.active {
        border-color: #e05c20;
        color: #edf0ff;
        background: rgba(224, 92, 32, 0.08);
    }

    .modules-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: #0f1220;
    }
    @media (max-width: 960px) {
        .modules-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 480px) {
        .modules-grid {
            grid-template-columns: 1fr;
        }
    }

    .module-card {
        background: #020408;
        padding: 24px 22px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: background 0.18s;
        position: relative;
        overflow: hidden;
    }
    .module-card:hover {
        background: #07090f;
    }
    .module-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: #e05c20;
        transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .module-card:hover::before {
        width: 100%;
    }

    .module-card-cat {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #424870;
    }
    .module-card-num {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        color: #1e2440;
    }
    .module-card-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 15px;
        color: #edf0ff;
        line-height: 1.3;
    }
    .module-card-desc {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        line-height: 1.6;
        color: #8890bb;
        flex: 1;
    }
    .module-card-type {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 2px 7px;
        border: 1px solid #0f1220;
        border-radius: 3px;
        color: #424870;
        align-self: flex-start;
        margin-top: 4px;
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 80px 20px;
        background: #020408;
        color: #8890bb;
        font-family: "DM Sans", sans-serif;
    }
    .reset-btn {
        margin-top: 16px;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        background: transparent;
        border: 1px solid #e05c20;
        color: #e05c20;
        padding: 8px 16px;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
