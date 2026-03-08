<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import glossaryData from "../../../data/glossary.json";

    let searchQuery = $state("");
    let activeCategory = $state("ALL");

    const categories = [
        "ALL",
        ...new Set(glossaryData.map((item) => item.category)),
    ].sort();

    let filteredTerms = $derived(
        glossaryData.filter((item) => {
            const matchesSearch =
                item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.definition
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesCategory =
                activeCategory === "ALL" || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        }),
    );

    function highlightMatch(text: string, query: string) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<mark>$1</mark>");
    }

    function handleRelatedClick(e: Event, term: string) {
        e.preventDefault();
        searchQuery = term;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>

<svelte:head>
    <title>Glossary | Resources | Progeta Technologies</title>
    <meta
        name="description"
        content="A working reference of technical terms, threat actors, and compliance frameworks."
    />
</svelte:head>

<!-- ═══════ HERO & SEARCH ═══════ -->
<section class="glos-hero">
    <div class="glos-container">
        <div class="glos-hero-content">
            <span class="glos-eyebrow">REFERENCE · RESOURCES</span>
            <h1 class="glos-heading">Speak the<br />same language.</h1>
            <p class="glos-body">
                A working reference of technical terms, threat actors,
                compliance frameworks, and LaunchPad vocabulary. If you are
                going to operate in the architecture, you need to understand the
                taxonomy.
            </p>

            <!-- Search Input -->
            <div class="glos-search-box">
                <svg
                    class="glos-search-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search for a term or concept..."
                    class="glos-search-input"
                />
                {#if searchQuery}
                    <button
                        class="glos-clear-btn"
                        onclick={() => (searchQuery = "")}
                    >
                        ×
                    </button>
                {/if}
            </div>

            <!-- Categories -->
            <div class="glos-categories">
                {#each categories as cat}
                    <button
                        class="glos-cat-btn"
                        class:active={activeCategory === cat}
                        onclick={() => (activeCategory = cat)}
                    >
                        {cat}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- ═══════ GLOSSARY LIST ═══════ -->
<section class="glos-list-sec">
    <div class="glos-container-narrow">
        <ScrollReveal>
            <div class="glos-results-meta">
                Showing {filteredTerms.length} terms
                {#if searchQuery}
                    for "{searchQuery}"
                {/if}
            </div>

            <div class="glos-list">
                {#each filteredTerms as entry (entry.term)}
                    <div
                        class="glos-entry"
                        id={entry.term.replace(/\s+/g, "-")}
                    >
                        <div class="glos-entry-header">
                            <h2 class="glos-term">
                                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                {@html highlightMatch(entry.term, searchQuery)}
                            </h2>
                            <span class="glos-entry-cat">{entry.category}</span>
                        </div>
                        <p class="glos-def">
                            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                            {@html highlightMatch(
                                entry.definition,
                                searchQuery,
                            )}
                        </p>

                        {#if entry.related && entry.related.length > 0}
                            <div class="glos-related">
                                <span class="glos-related-label">SEE ALSO:</span
                                >
                                {#each entry.related as rel}
                                    <a
                                        href="#{rel.replace(/\s+/g, '-')}"
                                        class="glos-related-link"
                                        onclick={(e) =>
                                            handleRelatedClick(e, rel)}
                                    >
                                        {rel}
                                    </a>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div class="glos-empty">
                        <span class="glos-empty-icon">∑</span>
                        <h3>No terms found</h3>
                        <p>
                            We couldn't find any terms matching "{searchQuery}".
                        </p>
                        <button
                            class="glos-reset-btn"
                            onclick={() => {
                                searchQuery = "";
                                activeCategory = "ALL";
                            }}
                        >
                            Clear Search
                        </button>
                    </div>
                {/each}
            </div>

            <div class="glos-suggest">
                <h3 class="suggest-heading">Looking for something else?</h3>
                <p class="suggest-body">
                    If you encountered a term in our modules or briefs that
                    isn't defined here, let us know.
                </p>
                <a
                    href="mailto:operations@progeta.tech?subject=Glossary Suggestion"
                    class="suggest-cta"
                >
                    Suggest a Term →
                </a>
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .glos-container {
        max-width: var(--w-site);
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }
    .glos-container-narrow {
        max-width: 760px;
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }

    /* ── HERO & SEARCH ── */
    .glos-hero {
        padding-top: clamp(120px, 15vw, 180px);
        padding-bottom: clamp(60px, 8vw, 100px);
        background: transparent;
        position: relative;
        z-index: 10;
    }
    .glos-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: var(--sp-4);
    }
    .glos-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(40px, 5.5vw, 64px);
        line-height: 0.93;
        color: var(--ink-1);
        margin: 0;
    }
    .glos-body {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 14px;
        line-height: 1.6;
        color: var(--ink-2);
        max-width: 480px;
        margin-top: 16px;
        margin-bottom: 32px;
    }

    .glos-search-box {
        max-width: 600px;
        position: relative;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--border-1);
        transition: border-color 0.2s ease;
    }
    .glos-search-box:focus-within {
        border-color: var(--accent-innercircle); /* Green accent */
    }
    .glos-search-icon {
        width: 20px;
        height: 20px;
        color: var(--ink-3);
        margin-right: 12px;
    }
    .glos-search-input {
        flex: 1;
        background: transparent;
        border: none;
        padding: 16px 0;
        font-family: var(--font-body);
        font-size: 18px;
        color: var(--ink-1);
        outline: none;
    }
    .glos-search-input::placeholder {
        color: var(--ink-3);
    }
    .glos-clear-btn {
        background: transparent;
        border: none;
        color: var(--ink-3);
        font-size: 24px;
        cursor: pointer;
        padding: 0 8px;
        transition: color 0.2s ease;
    }
    .glos-clear-btn:hover {
        color: var(--ink-1);
    }

    .glos-categories {
        margin-top: 32px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }
    .glos-cat-btn {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: color 0.2s ease;
        position: relative;
    }
    .glos-cat-btn:hover {
        color: var(--ink-1);
    }
    .glos-cat-btn.active {
        color: var(--accent-innercircle); /* Green */
    }
    .glos-cat-btn::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--accent-innercircle);
        transition: width 0.3s ease;
    }
    .glos-cat-btn.active::after {
        width: 100%;
    }

    /* ── GLOSSARY LIST ── */
    .glos-list-sec {
        padding-bottom: clamp(100px, 15vw, 160px);
        position: relative;
        z-index: 10;
    }
    .glos-results-meta {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        color: var(--ink-3);
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-1);
    }

    .glos-entry {
        padding: 32px 0;
        border-bottom: 1px solid var(--border-1);
    }
    .glos-entry:last-child {
        border-bottom: none;
    }

    .glos-entry-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 12px;
    }
    .glos-term {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 20px;
        color: var(--ink-1);
        margin: 0;
    }
    .glos-entry-cat {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        color: var(--ink-3);
    }

    .glos-def {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 15px;
        line-height: 1.65;
        color: var(--ink-2);
        margin: 0;
    }

    .glos-related {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
    }
    .glos-related-label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        color: var(--ink-4);
    }
    .glos-related-link {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        color: var(--accent-innercircle);
        text-decoration: none;
        border: 1px solid var(--border-1);
        border-radius: 3px;
        padding: 2px 6px;
        transition: all 0.2s ease;
    }
    .glos-related-link:hover {
        border-color: var(--accent-innercircle);
        background: rgba(24, 201, 106, 0.05); /* very faint green */
    }

    /* Search Highlight */
    :global(mark) {
        background: rgba(24, 201, 106, 0.2);
        color: inherit;
        padding: 0 2px;
        border-radius: 2px;
    }

    /* Empty State */
    .glos-empty {
        padding: 80px 0;
        text-align: center;
    }
    .glos-empty-icon {
        font-family: var(--font-mono);
        font-size: 48px;
        color: var(--ink-4);
        display: block;
        margin-bottom: 24px;
    }
    .glos-empty h3 {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 18px;
        color: var(--ink-1);
        margin: 0 0 8px 0;
    }
    .glos-empty p {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 14px;
        color: var(--ink-2);
        margin: 0 0 24px 0;
    }
    .glos-reset-btn {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--accent-innercircle);
        background: transparent;
        border: 1px solid var(--border-1);
        padding: 8px 16px;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .glos-reset-btn:hover {
        border-color: var(--accent-innercircle);
    }

    /* Suggest Section */
    .glos-suggest {
        margin-top: 80px;
        padding-top: 40px;
        border-top: 1px solid var(--border-1);
    }
    .suggest-heading {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 18px;
        color: var(--ink-1);
        margin: 0 0 8px 0;
    }
    .suggest-body {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 14px;
        color: var(--ink-2);
        margin: 0 0 16px 0;
    }
    .suggest-cta {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--accent-innercircle);
        text-decoration: none;
        transition: opacity 0.2s ease;
    }
    .suggest-cta:hover {
        opacity: 0.7;
    }
</style>
