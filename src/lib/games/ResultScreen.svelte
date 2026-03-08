<script lang="ts">
    import { BADGES, RARITY_COLORS, type Badge } from "./badges";
    import {
        generateShareCard,
        downloadShareCard,
        generatePostText,
        type ShareGameData,
    } from "./ShareCard";

    interface Props {
        score: number;
        total: number;
        gameName: string;
        gameTags: string[];
        badgeId?: string | null;
        statLine: string;
        onPlayAgain: () => void;
        onClose: () => void;
    }

    let {
        score,
        total,
        gameName,
        gameTags,
        badgeId = null,
        statLine,
        onPlayAgain,
        onClose,
    }: Props = $props();

    let shareCanvas: HTMLCanvasElement | undefined = $state();
    let postText = $state("");
    let copied = $state(false);
    let badge: Badge | null = $derived(
        badgeId ? (BADGES[badgeId] ?? null) : null,
    );

    $effect(() => {
        if (badge && badgeId && shareCanvas) {
            const gameData: ShareGameData = {
                name: gameName,
                tags: gameTags,
                statLine,
            };
            generateShareCard(shareCanvas, badgeId, gameData);
            postText = generatePostText(badge, gameData);
        }
    });

    function handleDownload() {
        if (shareCanvas && badge) {
            downloadShareCard(shareCanvas, badge.name);
        }
    }

    async function handleCopyText() {
        try {
            await navigator.clipboard.writeText(postText);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } catch {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = postText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        }
    }

    function getRarityColor(rarity: string): {
        border: string;
        bg: string;
        text: string;
    } {
        return (
            RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] ||
            RARITY_COLORS.common
        );
    }
</script>

<div class="result-screen">
    <!-- Score -->
    <div class="rs-score">
        <div class="rs-score-num">
            {score}<span class="rs-score-total">/{total}</span>
        </div>
        <div class="rs-score-label">
            {gameName.toUpperCase()} · {new Date()
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .toUpperCase()}
        </div>
    </div>

    <!-- Badge reveal -->
    {#if badge && badgeId}
        {@const rc = getRarityColor(badge.rarity)}
        <div class="rs-badge-reveal">
            <div class="rs-badge-earned-label">BADGE EARNED</div>
            <div
                class="rs-badge"
                class:rarity-common={badge.rarity === "common"}
                class:rarity-uncommon={badge.rarity === "uncommon"}
                class:rarity-rare={badge.rarity === "rare"}
                class:rarity-legendary={badge.rarity === "legendary"}
                style="border-color: {rc.border}; background: {rc.bg};"
            >
                <div class="rs-badge-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48">
                        <!-- Simple diamond icon -->
                        <polygon
                            points="24,4 44,24 24,44 4,24"
                            fill="none"
                            stroke={rc.text}
                            stroke-width="2"
                        />
                    </svg>
                </div>
                <div class="rs-badge-name">{badge.name}</div>
                <div class="rs-badge-desc">{badge.desc}</div>
                <div class="rs-badge-xp">+{badge.xp} XP</div>
                <div class="rs-badge-rarity" style="color: {rc.text};">
                    {badge.rarity.toUpperCase()}
                </div>
            </div>
        </div>
    {/if}

    <!-- Share card -->
    {#if badge && badgeId}
        <div class="rs-share-section">
            <div class="rs-share-label">SHARE YOUR PROGRESS</div>
            <div class="rs-canvas-wrap">
                <canvas bind:this={shareCanvas} width="1200" height="630"
                ></canvas>
            </div>
            <div class="rs-share-actions">
                <button class="rs-btn rs-download-btn" onclick={handleDownload}
                    >DOWNLOAD IMAGE →</button
                >
                <button class="rs-btn rs-copy-btn" onclick={handleCopyText}
                    >{copied ? "COPIED ✓" : "COPY POST TEXT →"}</button
                >
            </div>
            <textarea class="rs-post-text" bind:value={postText} rows="5"
            ></textarea>
        </div>
    {/if}

    <!-- Actions -->
    <div class="rs-actions">
        <button class="rs-btn rs-play-again" onclick={onPlayAgain}
            >PLAY AGAIN →</button
        >
        <button class="rs-btn rs-all-games" onclick={onClose}
            >ALL GAMES →</button
        >
    </div>
</div>

<style>
    .result-screen {
        width: 100%;
        max-width: 640px;
        display: flex;
        flex-direction: column;
        gap: 48px;
        margin: 0 auto;
    }

    /* Score */
    .rs-score {
        text-align: center;
        padding: 32px 0;
        border-bottom: 1px solid #0f1220;
    }
    .rs-score-num {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: clamp(60px, 10vw, 90px);
        color: var(--game-accent, #edf0ff);
        line-height: 1;
    }
    .rs-score-total {
        font-size: 0.45em;
        color: #424870;
        vertical-align: baseline;
    }
    .rs-score-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #424870;
        margin-top: 8px;
    }

    /* Badge reveal */
    .rs-badge-reveal {
        animation: badge-entrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes badge-entrance {
        from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    .rs-badge-earned-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--game-accent, #edf0ff);
        margin-bottom: 16px;
        text-align: center;
    }
    .rs-badge {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 28px;
        border: 1px solid;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
    }
    .rs-badge.rarity-legendary {
        animation: legendary-pulse 3s ease-in-out infinite;
    }
    @keyframes legendary-pulse {
        0%,
        100% {
            box-shadow: 0 0 0 0 rgba(224, 92, 32, 0);
        }
        50% {
            box-shadow: 0 0 20px 4px rgba(224, 92, 32, 0.12);
        }
    }
    .rs-badge-icon {
        width: 48px;
        height: 48px;
    }
    .rs-badge-name {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: 22px;
        color: #edf0ff;
        text-align: center;
    }
    .rs-badge-desc {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        text-align: center;
        max-width: 300px;
    }
    .rs-badge-xp {
        font-family: "DM Mono", monospace;
        font-size: 12px;
        letter-spacing: 0.1em;
        color: #18c96a;
    }
    .rs-badge-rarity {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    /* Share */
    .rs-share-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .rs-share-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
    }
    .rs-canvas-wrap {
        width: 100%;
        aspect-ratio: 1200 / 630;
        background: #020408;
        border: 1px solid #0f1220;
        border-radius: 4px;
        overflow: hidden;
    }
    .rs-canvas-wrap canvas {
        width: 100%;
        height: 100%;
        display: block;
    }
    .rs-share-actions {
        display: flex;
        gap: 8px;
    }
    .rs-post-text {
        width: 100%;
        background: #07090f;
        border: 1px solid #171b30;
        border-radius: 4px;
        color: #8890bb;
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        line-height: 1.6;
        padding: 12px;
        resize: none;
        outline: none;
        box-sizing: border-box;
    }
    .rs-post-text:focus {
        border-color: #424870;
    }

    /* Buttons */
    .rs-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 10px 20px;
        border-radius: 3px;
        background: transparent;
        cursor: pointer;
        transition:
            background 0.15s,
            border-color 0.15s;
    }
    .rs-download-btn {
        color: var(--game-accent, #edf0ff);
        border: 1px solid var(--game-accent, #edf0ff);
    }
    .rs-download-btn:hover {
        background: rgba(237, 240, 255, 0.04);
    }
    .rs-copy-btn {
        color: #18c96a;
        border: 1px solid #18c96a;
    }
    .rs-copy-btn:hover {
        background: rgba(24, 201, 106, 0.06);
    }
    .rs-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
    }
    .rs-play-again {
        color: var(--game-accent, #edf0ff);
        border: 1px solid var(--game-accent, #edf0ff);
    }
    .rs-play-again:hover {
        background: rgba(237, 240, 255, 0.04);
    }
    .rs-all-games {
        color: #424870;
        border: 1px solid #171b30;
    }
    .rs-all-games:hover {
        border-color: #424870;
        color: #8890bb;
    }
</style>
