<script>
    import { page } from '$app/stores';
    import { games } from '$lib/content/games';
    import CmdCross from '$lib/games/cmdcross/CmdCross.svelte';
    import { onMount } from 'svelte';

    $: id = $page.params.id;
    $: game = games.find(g => g.id === id);

    let isPlaying = false;
    
    // Stats
    let xp = 0;
    let level = 1;
    let hasSave = false;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('play') === '1') {
            isPlaying = true;
        }
        
        // Load Real Stats
        if(id === 'cmdcross') {
             const savedXp = localStorage.getItem('cmdHero_xp');
             const savedLvl = localStorage.getItem('cmdHero_level');
             
             if(savedXp) {
                 xp = parseInt(savedXp);
                 hasSave = true;
             }
             if(savedLvl) {
                 level = parseInt(savedLvl) + 1; // Index 0 -> Level 1
             }
        }
    });

    $: if (isPlaying) {
        // Optional: Lock scroll or other immersive effects
    }
</script>

<svelte:head>
    <title>Progeta Technologies | {game ? game.title : 'Store'}</title>
</svelte:head>

<div class="store-container">
    {#if game}
        <!-- HERO / HEADER -->
        <div class="game-hero" style="background-image: url({game.coverImage});">
            <div class="hero-gradient"></div>
            <div class="hero-content">
                <a href="/games" class="back-link">&larr; Library</a>
                <h1>{game.title}</h1>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="gog-layout">
            <!-- MAIN INFO (Left) -->
            <div class="main-column">
                {#if isPlaying && id === 'cmdcross'}
                    <div class="game-frame">
                        <div class="exit-bar">
                             <button class="exit-btn" on:click={() => isPlaying = false}>EXIT SIMULATION</button>
                        </div>
                        <CmdCross />
                    </div>
                {:else if isPlaying}
                     <div class="game-frame placeholder-frame">
                        <div class="exit-bar">
                             <button class="exit-btn" on:click={() => isPlaying = false}>EXIT</button>
                        </div>
                        <div style="color:white;">Simulation Coming Soon...</div>
                     </div>
                {:else}
                    <div class="about-section">
                        <h2>About</h2>
                        <hr class="divider">
                        <p class="desc-text">{game.description}</p>
                        
                        <div class="media-grid">
                            {#if game.screenshots && game.screenshots.length > 0}
                                {#each game.screenshots as screen, i}
                                    <img src="{screen}" alt="Gameplay Screen {i+1}" class="screenshot" />
                                {/each}
                            {:else}
                                <img src="{game.coverImage}" alt="Cover" class="screenshot" />
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>

            <!-- SIDEBAR (Right) -->
            <aside class="sidebar-column">
                <div class="buy-card">
                    <div class="price-row">
                        <span class="status-badge">{game.status}</span>
                    </div>
                    
                    <button class="play-btn-gog" on:click={() => isPlaying = true}>
                        PLAY NOW
                    </button>
                    
                    <div class="features-list">
                        <div class="feature">
                            <span class="label">Category:</span>
                            <span class="val">{game.category}</span>
                        </div>
                        
                        <!-- DYNAMIC STATS FOR CMD HERO -->
                        {#if id === 'cmdcross'}
                             <div class="feature">
                                <span class="label">Rank:</span>
                                <span class="val">{hasSave ? ('Lvl ' + level) : 'Rookie'}</span>
                            </div>
                            <div class="feature">
                                <span class="label">Total XP:</span>
                                <span class="val">{hasSave ? xp : '0'}</span>
                            </div>
                        {:else}
                            <div class="feature">
                                <span class="label">Time Played:</span>
                                <span class="val">{game.playTime}</span>
                            </div>
                             <div class="feature">
                                <span class="label">Achievements:</span>
                                <span class="val">{game.achievements} / 12</span>
                            </div>
                        {/if}
                    </div>
                </div>

                    <div class="info-block">
                        <h3>Game Details</h3>
                        <div class="tags-cloud">
                            {#each game.tags as tag}
                                <span class="gog-tag">{tag}</span>
                            {/each}
                        </div>
                        
                        {#if game.learnedSkills}
                            <div class="reqs">
                                <h4>Commands Covered</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; color: #aaa; font-size: 0.85rem;">
                                    {#each game.learnedSkills as skill}
                                        <li style="margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                                            <span style="color: #10b981;">&gt;</span> {skill}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}

                        <div class="reqs" style="margin-top: 1.5rem;">
                            <h4>System Requirements</h4>
                            <p>Progeta OS v4.0+<br>8GB RAM<br>Broadband</p>
                        </div>
                    </div>
            </aside>
        </div>
    {:else}
        <div style="padding: 100px; text-align: center;">Game Not Found</div>
    {/if}
</div>

<style>
    /* GOG STYLE AESTHETIC */
    /* GOG STYLE AESTHETIC */
    .store-container {
        padding-top: 0; /* Hero takes over */
        background: #0b0b0b;
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        color: #dcdcdc;
    }

    .game-hero {
        height: 60vh;
        min-height: 400px;
        position: relative;
        background-size: cover;
        background-position: center top;
    }
    .hero-gradient {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(to bottom, rgba(11,11,11,0.2) 0%, #0b0b0b 100%);
    }
    .hero-content {
        position: absolute; bottom: 0; left: 0; padding: 2rem calc((100vw - 1200px)/2);
        width: 100%; z-index: 2;
        display: flex; flex-direction: column; align-items: flex-start;
    }
    .hero-content h1 { font-size: 3.5rem; font-weight: 700; color: white; text-shadow: 0 4px 20px rgba(0,0,0,0.8); margin: 0; }
    
    .back-link {
        color: rgba(255,255,255,0.8); text-decoration: none; font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;
        background: rgba(0,0,0,0.5); padding: 5px 15px; border-radius: 20px;
    }

    .gog-layout {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        padding: 2rem 2rem 100px;
        position: relative; z-index: 3;
    }

    /* LEFT CONTENT */
    .about-section h2 { font-size: 1.5rem; color: white; font-weight: 600; margin-bottom: 0.5rem; }
    .divider { border: 0; height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 1.5rem; }
    .desc-text { font-size: 1.05rem; line-height: 1.8; color: #b0b0b0; }
    
    .screenshot { width: 100%; border-radius: 4px; box-shadow: 0 5px 20px rgba(0,0,0,0.5); margin-top: 2rem; }

    /* RIGHT SIDEBAR */
    .sidebar-column { display: flex; flex-direction: column; gap: 1.5rem; }
    
    .buy-card {
        background: linear-gradient(135deg, #1c1c1c 0%, #161616 100%);
        padding: 2rem;
        border-radius: 4px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border-top: 2px solid #10b981;
    }
    .price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .status-badge { background: #333; color: #fff; padding: 4px 8px; font-size: 0.75rem; border-radius: 3px; }
    
    .play-btn-gog {
        width: 100%;
        background: #10b981;
        color: white;
        border: none;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: 700;
        border-radius: 3px; /* Square GOG style */
        cursor: pointer;
        transition: filter 0.2s;
        margin-bottom: 1.5rem;
    }
    .play-btn-gog:hover { filter: brightness(1.1); }
    
    .features-list .feature { display: flex; justify-content: space-between; font-size: 0.9rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .features-list .feature .label { color: #888; }
    .features-list .feature .val { color: #eee; }

    .info-block { padding: 1rem 0; }
    .info-block h3 { font-size: 1rem; color: #bbb; margin-bottom: 1rem; font-weight: 600; }
    
    .tags-cloud { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
    .gog-tag { background: #262626; padding: 5px 10px; font-size: 0.8rem; color: #ccc; border-radius: 3px; }
    
    .reqs h4 { font-size: 0.9rem; color: #888; margin-bottom: 0.5rem; }
    .reqs p { font-size: 0.85rem; color: #aaa; line-height: 1.5; }

    /* FULL SCREEN */
    .game-frame {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 2000; background: black; display: flex; flex-direction: column;
    }
    .game-frame.placeholder-frame { display: flex; justify-content: center; align-items: center; }
    .exit-bar { position: absolute; bottom: 2rem; left: 2rem; right: auto; top: auto; z-index: 2001; }
    .exit-btn {
        background: rgba(255,0,0,0.2); color: white; border: 1px solid rgba(255,0,0,0.5);
        padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 600;
    }

    @media (max-width: 900px) {
        .gog-layout { grid-template-columns: 1fr; }
        .hero-content { padding-left: 1rem; }
    }
</style>
