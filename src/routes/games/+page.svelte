<script>
    import { games as allGames } from "$lib/content/games";
    import { reveal } from "$lib/ui/actions";
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    let filteredGames = allGames;
    let loading = true;

    onMount(() => {
        const isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
            );
        const deviceType = isMobile ? "Phone" : "PC";

        filteredGames = allGames.filter(
            (g) =>
                g.platform === deviceType ||
                g.platform === "All" ||
                !g.platform,
        );
        loading = false;
    });
</script>

<svelte:head>
    <title>Progeta Technologies | Game Library</title>
</svelte:head>

<div class="library-container">
    <!-- SIDEBAR -->
    <aside class="lib-sidebar">
        <div class="search-bar">
            <input type="text" placeholder="Filter Collection..." />
        </div>

        <!-- ONGOING STREAKS -->
        <div class="category-group">
            <h3 class="cat-header">ONGOING STREAKS 🔥</h3>
            {#each filteredGames.filter((g) => g.lastPlayed === "Today") as game}
                <a href="{base}/games/{game.id}" class="game-row active">
                    <span class="status-dot online"></span>
                    {game.title}
                </a>
            {/each}
        </div>

        <div class="separator"></div>

        <!-- CYBER OPS -->
        <div class="category-group">
            <h3 class="cat-header">CYBER OPS</h3>
            {#each filteredGames.filter((g) => g.category !== "Soft Skills" && g.lastPlayed !== "Today") as game}
                <a href="{base}/games/{game.id}" class="game-row">
                    {game.title}
                </a>
            {/each}
        </div>

        <!-- SOFT SKILLS -->
        <div class="category-group">
            <h3 class="cat-header">HUMAN INT (SOFT SKILLS)</h3>
            {#each filteredGames.filter((g) => g.category === "Soft Skills" && g.lastPlayed !== "Today") as game}
                <a href="{base}/games/{game.id}" class="game-row">
                    {game.title}
                </a>
            {/each}
        </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="lib-content">
        {#if filteredGames.length > 0}
            <!-- FEATURED HERO -->
            <div
                class="lib-hero"
                style="background: url({base}{filteredGames[0]
                    .coverImage}) no-repeat center;"
            >
                <div class="hero-content">
                    <img
                        src="{base}/logo_icon.svg"
                        alt="Logo"
                        class="hero-logo"
                    />
                    <h1>{filteredGames[0].title}</h1>
                    <p>{filteredGames[0].description}</p>
                    <div class="hero-actions">
                        <a
                            href="{base}/games/{filteredGames[0].id}"
                            class="play-btn"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor"
                                ><path d="M8 5v14l11-7z" /></svg
                            >
                            RESUME
                        </a>
                        <span class="play-meta"
                            >Last played: Today • 2.4 hrs</span
                        >
                    </div>
                </div>
                <div class="hero-overlay"></div>
            </div>

            <!-- SHELF -->
            <h2 class="shelf-title">Recent Activity</h2>
            <div class="games-grid">
                {#each filteredGames as game}
                    <div class="game-card-wrapper">
                        <!-- Main Card Container (Div) -->
                        <div class="game-card">
                            <div
                                class="cover-art"
                                style="background: url({base}{game.coverImage}) no-repeat center;"
                            >
                                <!-- Full Card Link (Underneath Overlay) -->
                                <a
                                    href="{base}/games/{game.id}"
                                    class="cover-click-target"
                                    aria-label="View Details"
                                ></a>

                                <!-- Hover Overlay -->
                                <div class="card-overlay">
                                    <a
                                        href="{base}/games/{game.id}?play=1"
                                        class="mini-play-btn"
                                        aria-label="Play {game.title}"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            ><path d="M8 5v14l11-7z" /></svg
                                        >
                                    </a>
                                </div>
                            </div>

                            <a href="{base}/games/{game.id}" class="game-meta">
                                <h4>{game.title}</h4>
                                <div class="tags">
                                    {#each game.tags.slice(0, 2) as tag}
                                        <span class="tag">{tag}</span>
                                    {/each}
                                </div>
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        {:else if !loading}
            <div class="empty-state">
                <h2>No compatible games found</h2>
                <p>
                    Most of our tactical simulations require a desktop
                    environment. Any mobile-compatible modules will appear here
                    automatically.
                </p>
            </div>
        {/if}
    </main>
</div>

<style>
    :global(body) {
        overflow-y: hidden;
    } /* App-like feel */

    .library-container {
        display: flex;
        height: 100dvh;
        padding-top: 70px; /* Navbar offset */
        background: #0f1012; /* Deep Steam/Discord Dark */
    }

    /* SIDEBAR */
    .lib-sidebar {
        width: 250px;
        background: rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .search-bar input {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.5rem;
        border-radius: 4px;
        color: var(--text-primary);
        font-size: 0.85rem;
    }

    .cat-header {
        font-size: 0.75rem;
        color: var(--text-tertiary);
        margin-bottom: 0.5rem;
        padding-left: 0.5rem;
        font-weight: 600;
        letter-spacing: 0.05em;
    }

    .separator {
        height: 1px;
        background: rgba(255, 255, 255, 0.05);
        margin: 0.5rem 1rem;
    }

    .game-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.6rem;
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        border-radius: 4px;
        transition: all 0.2s;
    }

    .game-row:hover,
    .game-row.active {
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-primary);
    }

    .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .status-dot.online {
        background: #10b981;
    }

    /* MAIN CONTENT */
    .lib-content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
    }

    /* HERO */
    .lib-hero {
        position: relative;
        border-radius: 12px;
        padding: 3rem;
        margin-bottom: 3rem;
        overflow: hidden;
        color: white;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        background-size: cover !important;
        background-position: center !important;
    }

    .hero-content {
        position: relative;
        z-index: 2;
        max-width: 600px;
    }
    .hero-logo {
        width: 48px;
        margin-bottom: 1rem;
        opacity: 1;
        filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    }
    .lib-hero h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        font-weight: 800;
        text-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
    }
    .lib-hero p {
        font-size: 1.1rem;
        opacity: 1;
        margin-bottom: 2rem;
        line-height: 1.5;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    }

    .hero-actions {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .play-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #10b981; /* Steam Green */
        color: white;
        padding: 0.75rem 2rem;
        border-radius: 4px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-decoration: none;
        transition:
            transform 0.2s,
            background 0.2s;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    .play-btn:hover {
        background: #059669;
        transform: scale(1.02);
    }
    .play-btn svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
    }

    .play-meta {
        font-size: 0.85rem;
        opacity: 0.8;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }

    .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.9),
            transparent 80%
        );
        z-index: 1;
    }

    /* GRID */
    .shelf-title {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
        font-weight: 500;
    }

    .games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1.5rem;
    }

    .game-card {
        text-decoration: none;
        transition: transform 0.3s;
    }
    .game-card:hover {
        transform: translateY(-5px);
    }
    .game-card:hover .cover-art {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        filter: brightness(1.1);
    }

    .cover-art {
        aspect-ratio: 2/3;
        border-radius: 4px;
        margin-bottom: 0.75rem;
        position: relative;
        background-size: cover !important;
        background-position: center !important;
        overflow: hidden;
    }

    .cover-click-target {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }

    .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 2;
        pointer-events: none; /* Let clicks pass to the cover link... unless hitting the button */
    }

    .game-card:hover .card-overlay {
        opacity: 1;
    }

    .mini-play-btn {
        width: 48px;
        height: 48px;
        background: #10b981;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transform: scale(0.8);
        transition:
            transform 0.2s,
            background 0.2s;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        pointer-events: auto; /* Re-enable clicks for button */
        cursor: pointer;
    }
    .mini-play-btn:hover {
        background: #059669;
        transform: scale(1.1);
    }
    .mini-play-btn svg {
        width: 24px;
        height: 24px;
        margin-left: 2px;
    } /* Optical center */

    .game-meta {
        display: block;
        text-decoration: none;
    }
    .game-meta h4 {
        font-size: 0.95rem;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
    }
    .tags {
        display: flex;
        gap: 0.25rem;
    }
    .tag {
        font-size: 0.7rem;
        color: var(--text-tertiary);
        background: rgba(255, 255, 255, 0.05);
        padding: 2px 4px;
        border-radius: 2px;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
        text-align: center;
        color: var(--text-tertiary);
        margin: 0 auto;
        max-width: 400px;
    }
    .empty-state h2 {
        font-size: 1.5rem;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    .empty-state p {
        font-size: 1rem;
        line-height: 1.5;
    }

    @media (max-width: 900px) {
        .lib-sidebar {
            display: none;
        }
        .library-container {
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 20px; /* Reduced top padding since title is in hero */
        }
        .lib-content {
            padding-bottom: 100px; /* Space for MobileNav */
        }
    }
</style>
