<script>
    import { allModules } from "$lib/content/modules";
    import { fade, fly } from "svelte/transition";

    let searchQuery = "";
    let currentFilter = "all";

    $: filteredModules = allModules.filter((m) => {
        const matchesType = currentFilter === "all" || m.type === currentFilter;
        const matchesSearch =
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (m.category &&
                m.category.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesType && matchesSearch;
    });

    function setFilter(filter) {
        currentFilter = filter;
    }

    function getLink(mod) {
        const typePath = mod.type === "Technical" ? "technical" : "soft_skills";
        return `/modules/${typePath}/${mod.id}`;
    }
</script>

<svelte:head>
    <title>Module Catalog | Progeta</title>
</svelte:head>

<!-- ZEN LAYOUT WRAPPER -->
<div class="zen-page">
    <div class="zen-container">
        <!-- HEADER & OMNIBOX -->
        <header class="catalog-header">
            <h1 class="page-title">Capability Catalog</h1>
            <p class="page-subtitle">
                Explore our full range of technical and professional service
                modules.
            </p>

            <div class="omnibox-wrapper">
                <div class="omnibox">
                    <svg
                        class="search-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search capabilities..."
                        class="omni-input"
                        bind:value={searchQuery}
                    />
                    <div class="filter-tabs">
                        <button
                            class="ft-btn {currentFilter === 'all'
                                ? 'active'
                                : ''}"
                            on:click={() => setFilter("all")}>All</button
                        >
                        <button
                            class="ft-btn {currentFilter === 'Technical'
                                ? 'active'
                                : ''}"
                            on:click={() => setFilter("Technical")}
                            >Technical</button
                        >
                        <button
                            class="ft-btn {currentFilter === 'Soft Skills'
                                ? 'active'
                                : ''}"
                            on:click={() => setFilter("Soft Skills")}
                            >Professional</button
                        >
                    </div>
                </div>
            </div>
        </header>

        <!-- GRID -->
        <div class="zen-grid">
            {#if filteredModules.length === 0}
                <div class="empty-state" in:fade>
                    <p>No capabilities found matching "{searchQuery}".</p>
                    <button
                        class="btn-reset"
                        on:click={() => {
                            searchQuery = "";
                            currentFilter = "all";
                        }}>Clear Filters</button
                    >
                </div>
            {:else}
                {#each filteredModules as module, index (module.id + module.type)}
                    <a
                        href={getLink(module)}
                        class="zen-card"
                        in:fly={{
                            y: 20,
                            duration: 300,
                            delay: Math.min(index * 50, 500),
                        }}
                    >
                        <div class="card-content">
                            <div class="card-top">
                                <span class="c-category"
                                    >{module.category || "Core"}</span
                                >
                                <span class="c-id">#{module.id}</span>
                            </div>

                            <h3 class="c-title">{module.title}</h3>

                            {#if module.goal}
                                <p class="c-desc">{module.goal}</p>
                            {/if}

                            <div class="c-footer">
                                <span class="c-type">{module.type}</span>
                                <span class="c-arrow">→</span>
                            </div>
                        </div>
                    </a>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    /* --- ZEN PROFESSIONAL THEME (LOCAL) --- */
    :root {
        --z-bg: #0f1115;
        --z-card: #16181d;
        --z-card-hover: #1c1e24;
        --z-text: #f3f4f6;
        --z-text-dim: #9ca3af;
        --z-border: rgba(255, 255, 255, 0.06);
        --z-accent: #3a3f4b;
        --z-primary: #fff;

        --font-body: "Inter", sans-serif;
        --font-head: "Manrope", sans-serif;
    }

    .zen-page {
        background-color: var(--z-bg);
        color: var(--z-text);
        font-family: var(--font-body);
        min-height: 100vh;
        width: 100%;
        padding-top: 120px; /* Space for Fixed Nav */
        padding-bottom: 80px;
    }

    @media (max-width: 900px) {
        .zen-page {
            padding-top: 80px;
        }
    }

    .zen-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 40px;
    }

    /* HEADER */
    .catalog-header {
        text-align: center;
        margin-bottom: 60px;
    }

    .page-title {
        font-family: var(--font-head);
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 16px;
        color: var(--z-primary);
    }

    .page-subtitle {
        font-size: 1.1rem;
        color: var(--z-text-dim);
        margin-bottom: 40px;
    }

    /* OMNIBOX */
    .omnibox-wrapper {
        display: flex;
        justify-content: center;
    }
    .omnibox {
        background: var(--z-card);
        border: 1px solid var(--z-border);
        border-radius: 100px;
        padding: 8px 8px 8px 24px;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 700px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        transition:
            box-shadow 0.3s,
            border-color 0.3s;
    }
    .omnibox:focus-within {
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.15);
    }

    .search-icon {
        color: var(--z-text-dim);
        margin-right: 12px;
    }

    .omni-input {
        background: transparent;
        border: none;
        color: var(--z-text);
        font-size: 1rem;
        flex-grow: 1;
        outline: none;
        font-family: var(--font-body);
    }
    .omni-input::placeholder {
        color: #555;
    }

    .filter-tabs {
        display: flex;
        gap: 4px;
        background: rgba(0, 0, 0, 0.2);
        padding: 4px;
        border-radius: 100px;
        margin-left: 12px;
    }
    .ft-btn {
        background: transparent;
        border: none;
        color: var(--z-text-dim);
        font-size: 0.85rem;
        font-weight: 600;
        padding: 8px 16px;
        border-radius: 100px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: var(--font-body);
    }
    .ft-btn:hover {
        color: var(--z-text);
    }
    .ft-btn.active {
        background: var(--z-accent);
        color: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    /* GRID */
    .zen-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
    }

    /* ZEN CARD */
    .zen-card {
        background: var(--z-card);
        border: 1px solid var(--z-border);
        border-radius: 20px;
        padding: 28px;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
    }
    .zen-card:hover {
        transform: translateY(-4px);
        background: var(--z-card-hover);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
    }
    .c-category {
        color: var(--z-text-dim);
    }
    .c-id {
        color: #555;
    }

    .c-title {
        font-family: var(--font-head);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--z-primary);
        margin-bottom: 12px;
        line-height: 1.3;
    }

    .c-desc {
        font-size: 0.95rem;
        color: var(--z-text-dim);
        line-height: 1.6;
        margin-bottom: 24px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
    }

    .c-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        border-top: 1px solid var(--z-border);
        margin-top: auto;
    }
    .c-type {
        font-size: 0.75rem;
        color: #666;
        font-weight: 600;
        text-transform: uppercase;
    }
    .c-arrow {
        color: var(--z-primary);
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s;
        font-size: 1.2rem;
    }
    .zen-card:hover .c-arrow {
        opacity: 1;
        transform: translateX(0);
    }

    /* EMPTY STATE */
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 80px 0;
        color: var(--z-text-dim);
    }
    .btn-reset {
        margin-top: 16px;
        background: transparent;
        border: 1px solid var(--z-border);
        color: var(--z-primary);
        padding: 8px 16px;
        border-radius: 100px;
        cursor: pointer;
        transition: 0.2s;
    }
    .btn-reset:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
        .page-title {
            font-size: 2rem;
        }
        .omnibox {
            flex-direction: column;
            padding: 12px;
            border-radius: 24px;
        }
        .omni-input {
            width: 100%;
            margin-bottom: 12px;
            padding: 0 12px;
        }
        .filter-tabs {
            margin-left: 0;
            width: 100%;
            justify-content: space-between;
        }
        .ft-btn {
            flex-grow: 1;
            padding: 8px;
            font-size: 0.75rem;
            text-align: center;
        }
        .zen-container {
            padding: 0 20px;
        }
    }
</style>
