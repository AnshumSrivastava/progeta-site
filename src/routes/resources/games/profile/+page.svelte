<script lang="ts">
    import { Store } from "$lib/games/store";
    import {
        BADGES,
        RARITY_COLORS,
        LEVEL_THRESHOLDS,
        getLevelForXp,
        getXpForNextLevel,
        type Badge,
        type BadgeRarity,
    } from "$lib/games/badges";

    let aggregate = $state(Store.getAggregate());
    const allBadges = $derived(aggregate.allBadges);
    const badgeEntries = Object.entries(BADGES);
    const earned = $derived(
        badgeEntries.filter(([id]) => allBadges.includes(id)),
    );
    const locked = $derived(
        badgeEntries.filter(([id]) => !allBadges.includes(id)),
    );
    const nextLevelXp = $derived(getXpForNextLevel(aggregate.level));
    const currentLevelXp = $derived(
        LEVEL_THRESHOLDS[
            Math.min(aggregate.level - 1, LEVEL_THRESHOLDS.length - 1)
        ] || 0,
    );
    const progressPct = $derived(
        nextLevelXp > currentLevelXp
            ? ((aggregate.xp - currentLevelXp) /
                  (nextLevelXp - currentLevelXp)) *
                  100
            : 100,
    );

    function handleExport() {
        Store.exportAll();
    }

    function getRarityColor(rarity: BadgeRarity) {
        return RARITY_COLORS[rarity];
    }
</script>

<svelte:head>
    <title>My Badges — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="View your earned badges, XP level, and progress across all training labs."
    />
</svelte:head>

<div class="profile-page">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <!-- Level Header -->
    <header class="profile-header">
        <span class="profile-eyebrow">YOUR PROGRESS</span>
        <div class="level-display">
            <span class="level-num">LV{aggregate.level}</span>
            <div class="level-info">
                <span class="level-xp">{aggregate.xp} XP</span>
                <div class="level-bar">
                    <div
                        class="level-fill"
                        style="width: {progressPct}%;"
                    ></div>
                </div>
                <span class="level-next"
                    >{nextLevelXp - aggregate.xp} XP to Level {aggregate.level +
                        1}</span
                >
            </div>
        </div>
    </header>

    <!-- Stats -->
    <section class="profile-stats">
        <div class="pstat">
            <span class="pstat-val">{aggregate.totalBadgesEarned}</span>
            <span class="pstat-lbl">BADGES EARNED</span>
        </div>
        <div class="pstat">
            <span class="pstat-val">{aggregate.uniqueGamesPlayed.length}</span>
            <span class="pstat-lbl">GAMES TRIED</span>
        </div>
        <div class="pstat">
            <span class="pstat-val">{aggregate.totalGamesPlayed}</span>
            <span class="pstat-lbl">TOTAL PLAYS</span>
        </div>
    </section>

    <!-- Earned Badges -->
    {#if earned.length > 0}
        <section class="badge-section">
            <span class="section-label">EARNED ({earned.length})</span>
            <div class="badge-grid">
                {#each earned as [id, badge]}
                    {@const rc = getRarityColor(badge.rarity)}
                    <div
                        class="badge-card earned"
                        style="border-color: {rc.border}; background: {rc.bg};"
                    >
                        <span class="badge-rarity" style="color: {rc.text};"
                            >{badge.rarity.toUpperCase()}</span
                        >
                        <span class="badge-name">{badge.name}</span>
                        <span class="badge-desc">{badge.desc}</span>
                        <span class="badge-xp">+{badge.xp} XP</span>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Locked Badges -->
    <section class="badge-section">
        <span class="section-label">LOCKED ({locked.length})</span>
        <div class="badge-grid">
            {#each locked as [id, badge]}
                <div class="badge-card locked">
                    <span class="badge-rarity"
                        >{badge.rarity.toUpperCase()}</span
                    >
                    <span class="badge-name">{badge.name}</span>
                    <span class="badge-desc">{badge.desc}</span>
                    <span class="badge-xp">+{badge.xp} XP</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- Actions -->
    <div class="profile-actions">
        <button class="profile-btn" onclick={handleExport}
            >EXPORT MY DATA →</button
        >
    </div>
</div>

<style>
    .profile-page {
        max-width: 800px;
        margin: 0 auto;
        padding: clamp(100px, 14vw, 140px) clamp(20px, 4vw, 40px) 80px;
        min-height: 100vh;
        background: #020408;
    }
    .back-link {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 32px;
        transition: color 0.2s;
    }
    .back-link:hover {
        color: #8890bb;
    }

    .profile-header {
        margin-bottom: 32px;
    }
    .profile-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .level-display {
        display: flex;
        align-items: center;
        gap: 24px;
    }
    .level-num {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: clamp(48px, 8vw, 72px);
        color: #edf0ff;
        line-height: 1;
    }
    .level-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .level-xp {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        color: #8890bb;
    }
    .level-bar {
        width: 100%;
        height: 4px;
        background: #0f1220;
        border-radius: 2px;
        overflow: hidden;
    }
    .level-fill {
        height: 100%;
        background: #18c96a;
        border-radius: 2px;
        transition: width 0.5s ease;
    }
    .level-next {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #424870;
    }

    .profile-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: #0f1220;
        margin-bottom: 40px;
    }
    .pstat {
        background: #03040a;
        padding: 16px;
        text-align: center;
    }
    .pstat-val {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 24px;
        color: #edf0ff;
        display: block;
    }
    .pstat-lbl {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-top: 4px;
    }

    .badge-section {
        margin-bottom: 32px;
    }
    .section-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .badge-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 8px;
    }
    .badge-card {
        padding: 16px;
        border: 1px solid #171b30;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        transition: transform 0.15s;
    }
    .badge-card.earned:hover {
        transform: translateY(-2px);
    }
    .badge-card.locked {
        opacity: 0.3;
        filter: grayscale(0.8);
    }
    .badge-rarity {
        font-family: "DM Mono", monospace;
        font-size: 8px;
        letter-spacing: 0.14em;
        color: #424870;
    }
    .badge-name {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: 16px;
        color: #edf0ff;
    }
    .badge-desc {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 12px;
        color: #8890bb;
        line-height: 1.5;
    }
    .badge-xp {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #18c96a;
    }
    .badge-card.locked .badge-xp {
        color: #424870;
    }

    .profile-actions {
        display: flex;
        gap: 12px;
        margin-top: 40px;
    }
    .profile-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        padding: 10px 20px;
        border: 1px solid #171b30;
        border-radius: 3px;
        background: transparent;
        color: #424870;
        cursor: pointer;
        transition:
            border-color 0.15s,
            color 0.15s;
    }
    .profile-btn:hover {
        border-color: #424870;
        color: #8890bb;
    }
</style>
