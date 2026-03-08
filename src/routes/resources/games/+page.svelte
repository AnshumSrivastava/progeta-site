<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import { games, TAG_OPTIONS, type Game } from "$lib/content/games-catalog";
    import GameShell from "$lib/games/GameShell.svelte";
    import { Store } from "$lib/games/store";
    import SignalOrNoise from "$lib/games/SignalOrNoise.svelte";
    import OneConceptADay from "$lib/games/OneConceptADay.svelte";
    import ReflectionLog from "$lib/games/ReflectionLog.svelte";
    import SystemCheck from "$lib/games/SystemCheck.svelte";
    import SpeechOfTheDay from "$lib/games/SpeechOfTheDay.svelte";
    import Mirror from "$lib/games/Mirror.svelte";
    import QuantumQuestion from "$lib/games/QuantumQuestion.svelte";
    import TheAudit from "$lib/games/TheAudit.svelte";
    import Cipher from "$lib/games/Cipher.svelte";
    import TheBreach from "$lib/games/TheBreach.svelte";
    import ThreatProfile from "$lib/games/ThreatProfile.svelte";
    import DecisionTree from "$lib/games/DecisionTree.svelte";
    import BuildAThreatModel from "$lib/games/BuildAThreatModel.svelte";
    import TheBoard from "$lib/games/TheBoard.svelte";

    // Map game IDs to their component constructors
    const GAME_COMPONENTS: Record<string, any> = {
        "signal-or-noise": SignalOrNoise,
        "one-concept-a-day": OneConceptADay,
        "reflection-log": ReflectionLog,
        "system-check": SystemCheck,
        "speech-of-the-day": SpeechOfTheDay,
        mirror: Mirror,
        "quantum-question": QuantumQuestion,
        "the-audit": TheAudit,
        cipher: Cipher,
        "the-breach": TheBreach,
        "threat-profile": ThreatProfile,
        "decision-tree": DecisionTree,
        "build-a-threat-model": BuildAThreatModel,
        "the-board": TheBoard,
    };

    let activeTag = $state("ALL");
    let searchQuery = $state("");

    // Overlay state
    let activeGame = $state<Game | null>(null);
    let resultData = $state<{
        score: number;
        total: number;
        badgeId?: string | null;
        statLine: string;
        tags: string[];
    } | null>(null);
    let shellKey = $state(0);

    // Aggregate data from Store
    let aggregate = $state(Store.getAggregate());

    const filteredGames = $derived(
        games.filter((g) => {
            const matchesTag =
                activeTag === "ALL" || g.tags.includes(activeTag);
            const matchesSearch =
                searchQuery.length === 0 ||
                g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                g.tagline.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTag && matchesSearch;
        }),
    );

    function todayLabel(): string {
        return new Date()
            .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
            .toUpperCase();
    }

    function openGame(game: Game) {
        activeGame = game;
        resultData = null;
        shellKey++;
    }

    function closeGame() {
        activeGame = null;
        resultData = null;
        aggregate = Store.getAggregate();
    }

    function handleGameComplete(data: {
        score: number;
        total: number;
        badgeId?: string | null;
        statLine: string;
    }) {
        if (!activeGame) return;
        resultData = { ...data, tags: activeGame.tags };
    }

    function handlePlayAgain() {
        resultData = null;
        shellKey++;
    }

    // Simulated engagement data (static — no backend)
    const engagement: Record<string, { stars: number; users: string }> = {
        "signal-or-noise": { stars: 4.8, users: "2.1k" },
        "the-breach": { stars: 4.6, users: "890" },
        mirror: { stars: 4.7, users: "1.4k" },
        "speech-of-the-day": { stars: 4.5, users: "760" },
        "quantum-question": { stars: 4.3, users: "540" },
        "threat-profile": { stars: 4.4, users: "430" },
        "decision-tree": { stars: 4.9, users: "1.8k" },
        cipher: { stars: 4.2, users: "670" },
        "the-audit": { stars: 4.7, users: "1.2k" },
        "one-concept-a-day": { stars: 4.6, users: "3.2k" },
        "build-a-threat-model": { stars: 4.1, users: "310" },
        "reflection-log": { stars: 4.8, users: "2.4k" },
        "the-board": { stars: 4.5, users: "580" },
        "system-check": { stars: 4.4, users: "1.9k" },
    };

    const dailyCount = games.filter((g) => g.frequency === "daily").length;
    const liveCount = games.filter((g) => g.status === "live").length;
</script>

<svelte:head>
    <title>Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="14 training labs across cybersecurity, AI, and quantum. Simulations, daily challenges, and reflective practices. All run in your browser. No account required."
    />
    <link rel="canonical" href="https://www.progeta.tech/resources/games" />
</svelte:head>

<!-- ═══════ HERO BAR ═══════ -->
<section class="hero-bar">
    <div class="hero-bar__inner">
        <div class="hero-bar__left">
            <!-- Rotating geometry — compact -->
            <div class="geo-wrap">
                <div class="geo geo--outer"></div>
                <div class="geo geo--mid"></div>
                <div class="geo geo--inner"></div>
            </div>
        </div>
        <div class="hero-bar__content">
            <span class="eyebrow">TRAINING LABS · PROGETA TECHNOLOGIES</span>
            <h1 class="hero-bar__heading">Enter.</h1>
            <p class="hero-bar__body">
                Simulations, challenges, and daily practices across
                cybersecurity, AI, and quantum. All run entirely in your
                browser.
            </p>
        </div>
    </div>
</section>

<!-- ═══════ MAIN SPLIT LAYOUT ═══════ -->
<div class="split-layout">
    <!-- ── LEFT SIDEBAR ── -->
    <aside class="sidebar">
        <div class="sidebar__sticky">
            <!-- Search -->
            <div class="sidebar-block">
                <label class="sidebar-label" for="game-search">SEARCH</label>
                <div class="search-wrap">
                    <input
                        id="game-search"
                        type="text"
                        class="search-input"
                        placeholder="Find a lab..."
                        bind:value={searchQuery}
                    />
                    {#if searchQuery.length > 0}
                        <button
                            class="search-clear"
                            onclick={() => (searchQuery = "")}>×</button
                        >
                    {/if}
                </div>
            </div>

            <!-- Filters -->
            <div class="sidebar-block">
                <span class="sidebar-label">FILTER BY</span>
                <div class="filter-list">
                    {#each TAG_OPTIONS as tag}
                        <button
                            class="filter-btn"
                            class:active={activeTag === tag}
                            onclick={() => (activeTag = tag)}
                        >
                            <span
                                class="filter-dot"
                                class:on={activeTag === tag}
                            ></span>
                            {tag}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="sidebar-block">
                <span class="sidebar-label">SYSTEM STATUS</span>
                <div class="sidebar-stats">
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-val"
                            >{filteredGames.length}</span
                        >
                        <span class="sidebar-stat-lbl">SHOWING</span>
                    </div>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-val">{dailyCount}</span>
                        <span class="sidebar-stat-lbl">DAILY</span>
                    </div>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-val">{liveCount}</span>
                        <span class="sidebar-stat-lbl">ON-DEMAND</span>
                    </div>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-val"
                            >{aggregate.totalBadgesEarned}</span
                        >
                        <span class="sidebar-stat-lbl">BADGES</span>
                    </div>
                </div>
            </div>

            <!-- Player Level -->
            <div class="sidebar-block">
                <span class="sidebar-label">YOUR LEVEL</span>
                <div class="sidebar-stats">
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-val">LV{aggregate.level}</span
                        >
                        <span class="sidebar-stat-lbl">{aggregate.xp} XP</span>
                    </div>
                </div>
                <a href="/resources/games/profile" class="profile-link"
                    >MY BADGES →</a
                >
            </div>

            <!-- Domains -->
            <div class="sidebar-block">
                <span class="sidebar-label">DOMAINS</span>
                <div class="domain-pills">
                    <span class="domain-pill" style="--d: #E05C20;">CYBER</span>
                    <span class="domain-pill" style="--d: #1A8FE3;">AI</span>
                    <span class="domain-pill" style="--d: #A78FFF;"
                        >QUANTUM</span
                    >
                </div>
            </div>

            <!-- Data notice -->
            <div class="sidebar-block sidebar-notice">
                <span class="notice-text"
                    >All progress stored locally in this browser. No data
                    uploaded.</span
                >
            </div>
        </div>
    </aside>

    <!-- ── RIGHT PANEL — GAME CARDS ── -->
    <main class="game-panel">
        {#if filteredGames.length === 0}
            <div class="no-results">
                <span class="no-results-text">No labs match that filter.</span>
                <button
                    class="no-results-reset"
                    onclick={() => {
                        activeTag = "ALL";
                        searchQuery = "";
                    }}
                >
                    CLEAR FILTERS →
                </button>
            </div>
        {/if}

        <div class="game-grid">
            {#each filteredGames as game, i (game.id)}
                <button
                    class="game-card"
                    style="--game-accent: {game.accentColor}; --game-hover-bg: {game.hoverBg};"
                    onclick={() => openGame(game)}
                >
                    <!-- Top row: index + status -->
                    <div class="card-top">
                        <span class="card-index">{game.index}</span>
                        <span class="card-status">
                            <span
                                class="status-dot"
                                class:live={game.status === "live"}
                                class:daily={game.status === "daily"}
                            ></span>
                            <span
                                class="status-label"
                                class:live={game.status === "live"}
                                class:daily={game.status === "daily"}
                                >{game.statusLabel}</span
                            >
                        </span>
                    </div>

                    <!-- Daily notice -->
                    {#if game.frequency === "daily"}
                        <span class="daily-badge"
                            >NEW TODAY · {todayLabel()}</span
                        >
                    {/if}

                    <!-- Name -->
                    <h2 class="card-name">{game.name}</h2>

                    <!-- Tagline -->
                    <p class="card-tagline">{game.tagline}</p>

                    <!-- Tags -->
                    <div class="card-tags">
                        {#each game.tags as tag}
                            <span class="card-tag">{tag}</span>
                        {/each}
                    </div>

                    <!-- Bottom row: stars, users, meta -->
                    <div class="card-bottom">
                        <div class="card-engagement">
                            <span class="card-stars">
                                <span class="star-icon">★</span>
                                {engagement[game.id]?.stars ?? "—"}
                            </span>
                            <span class="card-users">
                                <span class="user-icon">●</span>
                                {engagement[game.id]?.users ?? "—"}
                            </span>
                        </div>
                        <div class="card-meta">
                            {#each game.meta as m}
                                <span class="meta-item">{m}</span>
                            {/each}
                        </div>
                    </div>

                    <!-- CTA -->
                    <span class="card-cta">{game.cta}</span>

                    <!-- Accent line -->
                    <div class="card-accent-line"></div>
                </button>
            {/each}
        </div>

        <!-- Export utility -->
        <div class="export-row">
            <button class="export-btn" onclick={() => Store.exportAll()}
                >EXPORT ALL MY DATA →</button
            >
        </div>
    </main>
</div>

<!-- ═══════ GAME SHELL OVERLAY ═══════ -->
{#if activeGame}
    {#key shellKey}
        <GameShell
            active={true}
            gameId={activeGame.id}
            gameName={activeGame.name}
            gameIndex={activeGame.index}
            accentColor={activeGame.accentColor}
            streakKey={activeGame.frequency === "daily" ? activeGame.id : ""}
            totalScreens={5}
            currentScreen={0}
            {resultData}
            onClose={closeGame}
            onPlayAgain={handlePlayAgain}
        >
            {#if GAME_COMPONENTS[activeGame.id]}
                {@const GameComponent = GAME_COMPONENTS[activeGame.id]}
                <GameComponent onComplete={handleGameComplete} />
            {/if}
        </GameShell>
    {/key}
{/if}

<style>
    /* ═══════════════════════════════════════════════════
     TOKENS
     ═══════════════════════════════════════════════════ */
    .eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
    }

    /* ═══════════════════════════════════════════════════
     HERO BAR
     ═══════════════════════════════════════════════════ */
    .hero-bar {
        background: #020408;
        padding: clamp(100px, 14vw, 160px) 0 clamp(40px, 5vw, 60px);
        border-bottom: 1px solid #0f1220;
    }
    .hero-bar__inner {
        display: flex;
        align-items: center;
        gap: 48px;
        padding: 0 32px;
    }
    .hero-bar__left {
        flex-shrink: 0;
    }
    .hero-bar__content {
        flex: 1;
    }
    .hero-bar__heading {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(48px, 7vw, 72px);
        line-height: 0.9;
        color: #edf0ff;
        margin-top: 12px;
        letter-spacing: -0.03em;
    }
    .hero-bar__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: clamp(14px, 1.4vw, 15px);
        color: #424870;
        max-width: 460px;
        margin-top: 12px;
        line-height: 1.68;
    }

    /* Rotating geometry — compact version */
    .geo-wrap {
        width: 80px;
        height: 80px;
        position: relative;
    }
    .geo {
        position: absolute;
        border: 1px solid #0f1220;
        top: 50%;
        left: 50%;
    }
    .geo--outer {
        width: 80px;
        height: 80px;
        margin-top: -40px;
        margin-left: -40px;
        animation: rot-outer 200s linear infinite;
    }
    .geo--mid {
        width: 52px;
        height: 52px;
        margin-top: -26px;
        margin-left: -26px;
        animation: rot-mid 120s linear infinite;
    }
    .geo--inner {
        width: 28px;
        height: 28px;
        margin-top: -14px;
        margin-left: -14px;
        animation: rot-inner 75s linear infinite;
    }
    @keyframes rot-outer {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes rot-mid {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }
    @keyframes rot-inner {
        from {
            transform: rotate(15deg);
        }
        to {
            transform: rotate(375deg);
        }
    }

    /* ═══════════════════════════════════════════════════
     SPLIT LAYOUT
     ═══════════════════════════════════════════════════ */
    .split-layout {
        display: grid;
        grid-template-columns: 240px 1fr;
        min-height: 80vh;
        background: #020408;
    }

    /* ═══════════════════════════════════════════════════
     SIDEBAR
     ═══════════════════════════════════════════════════ */
    .sidebar {
        border-right: 1px solid #0f1220;
        padding: 0;
        position: relative;
    }
    .sidebar__sticky {
        position: sticky;
        top: 80px;
        padding: 24px 20px 40px;
        display: flex;
        flex-direction: column;
        gap: 28px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
    }
    .sidebar-block {
        /* Spacing handled by parent gap */
    }
    .sidebar-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 10px;
    }

    /* Search */
    .search-wrap {
        position: relative;
    }
    .search-input {
        width: 100%;
        background: #07090f;
        border: 1px solid #0f1220;
        border-radius: 3px;
        padding: 8px 10px;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #8890bb;
        letter-spacing: 0.04em;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }
    .search-input::placeholder {
        color: #424870;
    }
    .search-input:focus {
        border-color: #424870;
    }
    .search-clear {
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #424870;
        font-size: 14px;
        cursor: pointer;
        padding: 2px 4px;
    }

    /* Filter list */
    .filter-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .filter-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: transparent;
        border: none;
        padding: 6px 8px;
        border-radius: 3px;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #424870;
        cursor: pointer;
        transition:
            background 0.15s,
            color 0.15s;
        text-align: left;
    }
    .filter-btn:hover {
        background: #07090f;
        color: #8890bb;
    }
    .filter-btn.active {
        color: #edf0ff;
        background: rgba(237, 240, 255, 0.04);
    }
    .filter-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        border: 1px solid #1e2440;
        flex-shrink: 0;
        transition:
            background 0.15s,
            border-color 0.15s;
    }
    .filter-dot.on {
        background: #edf0ff;
        border-color: #edf0ff;
    }

    /* Sidebar stats */
    .sidebar-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1px;
        background: #0f1220;
    }
    .sidebar-stat {
        background: #020408;
        padding: 12px 10px;
        text-align: center;
    }
    .sidebar-stat-val {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 18px;
        color: #edf0ff;
        display: block;
    }
    .sidebar-stat-lbl {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-top: 2px;
    }

    /* Domain pills */
    .domain-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }
    .domain-pill {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--d);
        border: 1px solid var(--d);
        padding: 3px 8px;
        border-radius: 2px;
        opacity: 0.6;
    }

    /* Notice */
    .sidebar-notice {
        margin-top: auto;
    }
    .notice-text {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.08em;
        color: #424870;
        line-height: 1.5;
    }

    /* Profile link */
    .profile-link {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        text-decoration: none;
        display: inline-block;
        margin-top: 8px;
        transition: color 0.15s;
    }
    .profile-link:hover {
        color: #8890bb;
    }

    /* ═══════════════════════════════════════════════════
     GAME PANEL (RIGHT)
     ═══════════════════════════════════════════════════ */
    .game-panel {
        padding: 24px 0 60px;
        background: #03040a;
    }

    .no-results {
        text-align: center;
        padding: 80px 20px;
    }
    .no-results-text {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #424870;
        display: block;
        margin-bottom: 12px;
    }
    .no-results-reset {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #0f1220;
        padding: 6px 14px;
        border-radius: 2px;
        cursor: pointer;
    }

    /* Game grid — 2 columns */
    .game-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: #0f1220;
    }

    /* Game card (button reset) */
    .game-card {
        background: #03040a;
        padding: clamp(20px, 2.5vw, 32px);
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        position: relative;
        overflow: hidden;
        transition: background 0.3s ease;
        border: none;
        border-radius: 0;
        text-align: left;
        cursor: pointer;
        font: inherit;
        width: 100%;
        cursor: pointer;
    }
    .game-card:hover {
        background: var(--game-hover-bg, #07090f);
    }

    /* Accent line on hover */
    .card-accent-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--game-accent, #edf0ff);
        transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .game-card:hover .card-accent-line {
        width: 100%;
    }

    /* Card top row */
    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .card-index {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
    }
    .card-status {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .status-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #1e2440;
    }
    .status-dot.live {
        background: #18c96a;
        animation: pulse-g 2.4s ease-in-out infinite;
    }
    .status-dot.daily {
        background: #1a8fe3;
        animation: pulse-b 2s ease-in-out infinite;
    }
    @keyframes pulse-g {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
    }
    @keyframes pulse-b {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
    }

    .status-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .status-label.live {
        color: #18c96a;
    }
    .status-label.daily {
        color: #1a8fe3;
    }

    /* Daily badge */
    .daily-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #1a8fe3;
        margin-bottom: 8px;
        display: block;
    }

    /* Card name */
    .card-name {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(20px, 2.2vw, 28px);
        color: #edf0ff;
        line-height: 1.05;
        margin: 0 0 8px 0;
        letter-spacing: -0.01em;
    }

    /* Tagline */
    .card-tagline {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-style: italic;
        font-size: 13px;
        line-height: 1.55;
        color: #424870;
        margin: 0 0 12px 0;
        transition: color 0.3s ease;
        flex: 1;
    }
    .game-card:hover .card-tagline {
        color: #8890bb;
    }

    /* Card tags */
    .card-tags {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        margin-bottom: 14px;
    }
    .card-tag {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 2px 5px;
        border: 1px solid #0f1220;
        border-radius: 2px;
        color: #424870;
        transition:
            border-color 0.2s,
            color 0.2s;
    }
    .game-card:hover .card-tag {
        border-color: #1e2440;
        color: #8890bb;
    }

    /* Bottom row: engagement + meta */
    .card-bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 12px;
        gap: 12px;
        flex-wrap: wrap;
    }
    .card-engagement {
        display: flex;
        gap: 12px;
        align-items: center;
    }
    .card-stars,
    .card-users {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #424870;
        display: flex;
        align-items: center;
        gap: 3px;
    }
    .star-icon {
        color: #e05c20;
        font-size: 10px;
    }
    .user-icon {
        color: #424870;
        font-size: 6px;
    }
    .card-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    .meta-item {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #424870;
    }

    /* CTA */
    .card-cta {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #424870;
        transition: color 0.2s ease;
        margin-top: auto;
    }
    .game-card:hover .card-cta {
        color: var(--game-accent, #edf0ff);
    }

    /* ═══════════════════════════════════════════════════
     EXPORT ROW
     ═══════════════════════════════════════════════════ */
    .export-row {
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid #0f1220;
    }
    .export-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #424870;
        background: transparent;
        border: 1px solid #0f1220;
        padding: 8px 14px;
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

    /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
    @media (max-width: 960px) {
        .game-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 740px) {
        .split-layout {
            grid-template-columns: 1fr;
        }
        .sidebar {
            border-right: none;
            border-bottom: 1px solid #0f1220;
        }
        .sidebar__sticky {
            position: static;
            max-height: none;
            padding: 20px clamp(16px, 4vw, 40px);
            flex-direction: row;
            flex-wrap: wrap;
            gap: 16px;
        }
        .sidebar-block {
            min-width: 140px;
            flex: 1;
        }
        .filter-list {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 4px;
        }
        .sidebar-stats {
            grid-template-columns: repeat(4, 1fr);
        }
        .sidebar-notice {
            display: none;
        }
        .hero-bar__inner {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
        }
        .hero-bar__heading {
            font-size: clamp(40px, 9vw, 56px);
        }
        .game-grid {
            grid-template-columns: 1fr;
        }
        .card-name {
            font-size: clamp(20px, 5vw, 26px);
        }
    }
</style>
