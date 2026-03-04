<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import { games, TAG_OPTIONS } from "$lib/content/games-catalog";

    let activeTag = $state("ALL");

    const filteredGames = $derived(
        activeTag === "ALL"
            ? games
            : games.filter((g) => g.tags.includes(activeTag)),
    );

    function todayLabel(): string {
        return new Date()
            .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
            .toUpperCase();
    }
</script>

<svelte:head>
    <title>Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="14 training labs across cybersecurity, AI, and quantum. Simulations, daily challenges, and reflective practices. All run in your browser. No account required."
    />
    <link rel="canonical" href="https://www.progeta.tech/resources/games" />
</svelte:head>

<!-- ═══════ SECTION 1 — THE ENTRY ═══════ -->
<section class="entry">
    <!-- Rotating geometry -->
    <div class="entry-geo-wrap">
        <div class="entry-geo entry-geo--outer"></div>
        <div class="entry-geo entry-geo--mid"></div>
        <div class="entry-geo entry-geo--inner"></div>
    </div>

    <div class="container entry__content">
        <ScrollReveal delay={200}>
            <span class="eyebrow">TRAINING LABS · PROGETA TECHNOLOGIES</span>
        </ScrollReveal>
        <ScrollReveal delay={500}>
            <h1 class="entry__heading">Enter.</h1>
        </ScrollReveal>
        <ScrollReveal delay={700}>
            <p class="entry__body">
                Simulations, challenges, and daily practices across
                cybersecurity, artificial intelligence, and quantum concepts.
                Some run in minutes. Some return you every day. All run entirely
                in your browser.
            </p>
        </ScrollReveal>
        <div class="scroll-indicator" aria-hidden="true">
            <span class="scroll-line"></span>
            <span class="scroll-label">SCROLL</span>
        </div>
    </div>
</section>

<!-- ═══════ SECTION 2 — STATS BAR ═══════ -->
<section class="stats-sec">
    <div class="container">
        <ScrollReveal>
            <div class="game-stats-row">
                <span>14 ACTIVE LABS</span>
                <span class="sep">·</span>
                <span>5 DAILY</span>
                <span class="sep">·</span>
                <span>CYBERSECURITY · AI · QUANTUM</span>
                <span class="sep">·</span>
                <span>0 ACCOUNTS REQUIRED</span>
                <span class="sep">·</span>
                <span>LOCAL STORAGE</span>
            </div>
        </ScrollReveal>
    </div>
</section>

<!-- ═══════ SECTION 3 — TAG FILTER ═══════ -->
<section class="filter-sec">
    <div class="container">
        <div class="tag-filter">
            {#each TAG_OPTIONS as tag}
                <button
                    class="tag-btn"
                    class:active={activeTag === tag}
                    onclick={() => (activeTag = tag)}
                >
                    {tag}
                </button>
            {/each}
        </div>
    </div>
</section>

<!-- ═══════ SECTION 4 — GAME LIST ═══════ -->
<section class="game-list-sec">
    <div class="container">
        {#each filteredGames as game, i}
            <ScrollReveal delay={80 + i * 40}>
                <a
                    href={game.href}
                    class="game-band"
                    style="--game-hover-bg: {game.hoverBg}; --game-accent: {game.accentColor};"
                >
                    <!-- Index -->
                    <span class="game-index">{game.index}</span>

                    <!-- Identity -->
                    <div class="game-identity">
                        {#if game.frequency === "daily"}
                            <span class="game-daily-notice"
                                >NEW TODAY · {todayLabel()}</span
                            >
                        {/if}
                        <div class="game-tags-row">
                            {#each game.tags as tag}
                                <span class="game-tag">{tag}</span>
                            {/each}
                        </div>
                        <h2 class="game-name">{game.name}</h2>
                        <p class="game-desc">{game.description}</p>
                        <div class="game-meta">
                            {#each game.meta as m}
                                <span class="game-meta-item">{m}</span>
                            {/each}
                        </div>
                    </div>

                    <!-- Status + CTA -->
                    <div class="game-action">
                        <span class="game-status">
                            <span
                                class="status-dot"
                                class:live={game.status === "live"}
                                class:daily={game.status === "daily"}
                                class:soon={game.status === "coming-soon"}
                            ></span>
                            <span
                                class="status-text"
                                class:live={game.status === "live"}
                                class:daily={game.status === "daily"}
                                >{game.statusLabel}</span
                            >
                        </span>
                        <span class="game-enter-cta">{game.cta}</span>
                    </div>
                </a>
            </ScrollReveal>
        {/each}
    </div>
</section>

<!-- ═══════ EXPORT UTILITY ═══════ -->
<section class="export-sec">
    <div class="container">
        <ScrollReveal>
            <div class="export-row">
                <button
                    class="export-btn"
                    onclick={() => {
                        const keys = Object.keys(localStorage).filter((k) =>
                            k.startsWith("pt-"),
                        );
                        const data: Record<string, string | null> = {};
                        keys.forEach((k) => {
                            data[k] = localStorage.getItem(k);
                        });
                        const blob = new Blob([JSON.stringify(data, null, 2)], {
                            type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `progeta-game-data-${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }}>EXPORT ALL MY DATA →</button
                >
                <span class="export-note"
                    >Downloads all locally stored game progress as a JSON file.</span
                >
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    /* ═══════════════════════════════════════════════════
     SHARED TOKENS
     ═══════════════════════════════════════════════════ */
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
        color: #424870;
        display: block;
    }

    /* ═══════════════════════════════════════════════════
     SECTION 1 — ENTRY
     ═══════════════════════════════════════════════════ */
    .entry {
        min-height: 100vh;
        display: flex;
        align-items: flex-end;
        padding-bottom: clamp(60px, 8vw, 100px);
        background: #020408;
        position: relative;
        overflow: hidden;
    }
    .entry__content {
        position: relative;
        z-index: 1;
    }
    .entry__heading {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(48px, 7vw, 80px);
        line-height: 0.9;
        color: #edf0ff;
        margin-top: 16px;
        letter-spacing: -0.03em;
    }
    .entry__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: clamp(14px, 1.5vw, 16px);
        color: #424870;
        max-width: 420px;
        margin-top: 16px;
        line-height: 1.72;
    }

    /* Rotating geometry — three concentric rectangles */
    .entry-geo-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 120px;
        pointer-events: none;
        z-index: 0;
    }
    .entry-geo {
        position: absolute;
        border: 1px solid #0f1220;
        top: 50%;
        left: 50%;
    }
    .entry-geo--outer {
        width: 120px;
        height: 120px;
        margin-top: -60px;
        margin-left: -60px;
        animation: rotate-outer 200s linear infinite;
    }
    .entry-geo--mid {
        width: 80px;
        height: 80px;
        margin-top: -40px;
        margin-left: -40px;
        animation: rotate-mid 120s linear infinite;
    }
    .entry-geo--inner {
        width: 40px;
        height: 40px;
        margin-top: -20px;
        margin-left: -20px;
        animation: rotate-inner 75s linear infinite;
    }

    @keyframes rotate-outer {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes rotate-mid {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }
    @keyframes rotate-inner {
        from {
            transform: rotate(15deg);
        }
        to {
            transform: rotate(375deg);
        }
    }

    /* Scroll indicator */
    .scroll-indicator {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .scroll-line {
        width: 1px;
        height: 32px;
        background: #1e2440;
        animation: float-line 2.4s ease-in-out infinite;
    }
    .scroll-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        color: #1e2440;
    }
    @keyframes float-line {
        0%,
        100% {
            opacity: 0.4;
            transform: translateY(0);
        }
        50% {
            opacity: 1;
            transform: translateY(6px);
        }
    }

    /* ═══════════════════════════════════════════════════
     SECTION 2 — STATS BAR
     ═══════════════════════════════════════════════════ */
    .stats-sec {
        background: #020408;
    }
    .game-stats-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 16px;
        align-items: center;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #1e2440;
        padding: 24px 0;
        border-top: 1px solid #0f1220;
        border-bottom: 1px solid #0f1220;
    }
    .game-stats-row .sep {
        color: #0f1220;
    }

    /* ═══════════════════════════════════════════════════
     SECTION 3 — TAG FILTER
     ═══════════════════════════════════════════════════ */
    .filter-sec {
        background: #020408;
    }
    .tag-filter {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding: clamp(24px, 3vw, 40px) 0;
    }
    .tag-btn {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 6px 12px;
        border: 1px solid #0f1220;
        border-radius: 2px;
        background: transparent;
        color: #1e2440;
        cursor: pointer;
        transition:
            border-color 0.15s,
            color 0.15s,
            background 0.15s;
    }
    .tag-btn:hover {
        border-color: #424870;
        color: #8890bb;
    }
    .tag-btn.active {
        border-color: #edf0ff;
        color: #edf0ff;
        background: rgba(237, 240, 255, 0.05);
    }

    /* ═══════════════════════════════════════════════════
     SECTION 4 — GAME BANDS
     ═══════════════════════════════════════════════════ */
    .game-list-sec {
        background: #03040a;
        padding-bottom: clamp(40px, 6vw, 80px);
    }

    .game-band {
        border-top: 1px solid #0f1220;
        padding: clamp(32px, 5vw, 56px) 0;
        display: grid;
        grid-template-columns: 48px 1fr minmax(120px, 160px);
        gap: 0 32px;
        align-items: start;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        position: relative;
        overflow: hidden;
        transition: background 0.3s ease;
    }
    .game-band:last-child {
        border-bottom: 1px solid #0f1220;
    }
    .game-band:hover {
        background: var(--game-hover-bg, #07090f);
    }

    .game-band::after {
        content: "";
        position: absolute;
        top: -1px;
        left: 0;
        height: 1px;
        width: 0;
        background: var(--game-accent, #edf0ff);
        transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .game-band:hover::after {
        width: 100%;
    }

    /* Index */
    .game-index {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #1e2440;
        padding-top: 5px;
    }

    /* Identity */
    .game-daily-notice {
        font-family: "DM Mono", monospace;
        font-size: 8px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #1a8fe3;
        margin-bottom: 6px;
        display: block;
    }
    .game-tags-row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }
    .game-tag {
        font-family: "DM Mono", monospace;
        font-size: 8px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 2px 6px;
        border: 1px solid #0f1220;
        border-radius: 2px;
        color: #424870;
        transition:
            border-color 0.2s,
            color 0.2s;
    }
    .game-band:hover .game-tag {
        border-color: #1e2440;
        color: #8890bb;
    }
    .game-name {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(24px, 3vw, 38px);
        color: #edf0ff;
        line-height: 1;
        margin: 0 0 10px 0;
        letter-spacing: -0.01em;
    }
    .game-desc {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.72;
        color: #424870;
        max-width: 560px;
        margin: 0 0 14px 0;
        transition: color 0.3s ease;
    }
    .game-band:hover .game-desc {
        color: #8890bb;
    }

    .game-meta {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #1e2440;
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }

    /* Action column */
    .game-action {
        text-align: right;
        padding-top: 4px;
    }
    .game-status {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 12px;
    }
    .status-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
    }
    .status-dot.live {
        background: #18c96a;
        animation: pulse-green 2.4s ease-in-out infinite;
    }
    .status-dot.daily {
        background: #1a8fe3;
        animation: pulse-blue 2s ease-in-out infinite;
    }
    .status-dot.soon {
        background: #1e2440;
    }

    @keyframes pulse-green {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
    }
    @keyframes pulse-blue {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
    }

    .status-text {
        color: #424870;
    }
    .status-text.live {
        color: #18c96a;
    }
    .status-text.daily {
        color: #1a8fe3;
    }

    .game-enter-cta {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #1e2440;
        opacity: 0;
        transform: translateX(8px);
        transition:
            opacity 0.2s ease,
            transform 0.2s ease,
            color 0.2s ease;
        display: block;
    }
    .game-band:hover .game-enter-cta {
        opacity: 1;
        transform: translateX(0);
        color: var(--game-accent, #edf0ff);
    }

    /* ═══════════════════════════════════════════════════
     EXPORT UTILITY
     ═══════════════════════════════════════════════════ */
    .export-sec {
        background: #03040a;
        padding-bottom: clamp(80px, 11vw, 144px);
    }
    .export-row {
        border-top: 1px solid #0f1220;
        padding-top: 32px;
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
    }
    .export-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #424870;
        background: transparent;
        border: 1px solid #0f1220;
        padding: 8px 16px;
        border-radius: 2px;
        cursor: pointer;
        transition:
            border-color 0.2s,
            color 0.2s;
    }
    .export-btn:hover {
        border-color: #edf0ff;
        color: #edf0ff;
    }
    .export-note {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        color: #1e2440;
    }

    /* ═══════════════════════════════════════════════════
     RESPONSIVE (< 640px)
     ═══════════════════════════════════════════════════ */
    @media (max-width: 640px) {
        .entry__heading {
            font-size: clamp(40px, 10vw, 56px);
        }
        .entry-geo-wrap {
            width: 80px;
            height: 80px;
        }
        .entry-geo--outer {
            width: 80px;
            height: 80px;
            margin-top: -40px;
            margin-left: -40px;
        }
        .entry-geo--mid {
            width: 52px;
            height: 52px;
            margin-top: -26px;
            margin-left: -26px;
        }
        .entry-geo--inner {
            width: 28px;
            height: 28px;
            margin-top: -14px;
            margin-left: -14px;
        }

        .game-band {
            grid-template-columns: 1fr;
            gap: 12px 0;
            padding: 24px 0;
        }
        .game-index {
            font-size: 8px;
            margin-bottom: 4px;
            display: block;
        }
        .game-name {
            font-size: clamp(22px, 6vw, 30px);
        }
        .game-action {
            text-align: left;
        }
        .game-status {
            justify-content: flex-start;
        }
        /* CTA always visible on mobile */
        .game-enter-cta {
            opacity: 1;
            transform: translateX(0);
            color: #424870;
        }
        .game-stats-row {
            gap: 6px 12px;
            font-size: 9px;
        }
    }
</style>
