<script lang="ts">
    import { Store } from "./store";
    import ResultScreen from "./ResultScreen.svelte";
    import type { Snippet } from "svelte";

    interface Props {
        active: boolean;
        gameId: string;
        gameName: string;
        gameIndex: string;
        accentColor: string;
        streakKey?: string;
        totalScreens?: number;
        currentScreen?: number;
        children: Snippet;
        /** Result data — when set, shows the result screen. */
        resultData?: {
            score: number;
            total: number;
            badgeId?: string | null;
            statLine: string;
            tags: string[];
        } | null;
        onClose: () => void;
        onPlayAgain?: () => void;
    }

    let {
        active = false,
        gameId,
        gameName,
        gameIndex,
        accentColor,
        streakKey = "",
        totalScreens = 1,
        currentScreen = 0,
        children,
        resultData = null,
        onClose,
        onPlayAgain,
    }: Props = $props();

    let streak = $state(0);
    const progressPct = $derived(
        resultData
            ? 100
            : totalScreens > 0
              ? (currentScreen / totalScreens) * 100
              : 0,
    );

    $effect(() => {
        if (active && streakKey) {
            const data = Store.get(streakKey);
            streak = data.streak || 0;
        }
    });

    // Lock body scroll when active
    $effect(() => {
        if (typeof document !== "undefined") {
            document.body.style.overflow = active ? "hidden" : "";
        }
    });

    function handleClose() {
        onClose();
    }

    function handlePlayAgain() {
        if (onPlayAgain) onPlayAgain();
    }
</script>

{#if active}
    <div
        class="game-shell"
        class:active
        style="--game-accent: {accentColor};"
        role="dialog"
        aria-modal="true"
        aria-label={gameName}
    >
        <!-- Header -->
        <header class="gs-header">
            <div class="gs-header-left">
                <span class="gs-game-id">{gameIndex}</span>
                <span class="gs-separator">·</span>
                <span class="gs-game-name">{gameName}</span>
            </div>
            <div class="gs-header-center">
                <div class="gs-progress">
                    <div
                        class="gs-progress-fill"
                        style="width: {progressPct}%"
                    ></div>
                </div>
            </div>
            <div class="gs-header-right">
                {#if streakKey}
                    <span class="gs-streak" title="Your current streak">
                        <span class="gs-streak-icon">◈</span>
                        <span class="gs-streak-count">{streak}</span>
                    </span>
                {/if}
                <button
                    class="gs-close"
                    aria-label="Close game"
                    onclick={handleClose}>✕</button
                >
            </div>
        </header>

        <!-- Stage or Result -->
        {#if resultData}
            <main class="gs-stage">
                <ResultScreen
                    score={resultData.score}
                    total={resultData.total}
                    {gameName}
                    gameTags={resultData.tags}
                    badgeId={resultData.badgeId}
                    statLine={resultData.statLine}
                    onPlayAgain={handlePlayAgain}
                    onClose={handleClose}
                />
            </main>
        {:else}
            <main class="gs-stage">
                {@render children()}
            </main>
        {/if}
    </div>
{/if}

<style>
    .game-shell {
        position: fixed;
        inset: 0;
        background: #020408;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s ease;
    }
    .game-shell.active {
        opacity: 1;
        pointer-events: all;
    }

    /* Header */
    .gs-header {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        padding: 0 clamp(20px, 4vw, 48px);
        height: 56px;
        border-bottom: 1px solid #0f1220;
        flex-shrink: 0;
    }
    .gs-header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }
    .gs-game-id {
        color: #1e2440;
    }
    .gs-separator {
        color: #1e2440;
    }
    .gs-game-name {
        color: #424870;
    }

    /* Progress */
    .gs-progress {
        width: 160px;
        height: 2px;
        background: #0f1220;
        border-radius: 1px;
        overflow: hidden;
    }
    .gs-progress-fill {
        height: 100%;
        background: var(--game-accent, #edf0ff);
        border-radius: 1px;
        transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Streak */
    .gs-header-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
    }
    .gs-streak {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #424870;
    }
    .gs-streak-icon {
        color: var(--game-accent, #edf0ff);
        font-size: 12px;
    }
    .gs-streak-count {
        color: #8890bb;
    }

    /* Close */
    .gs-close {
        width: 32px;
        height: 32px;
        border: 1px solid #171b30;
        border-radius: 50%;
        background: transparent;
        color: #424870;
        font-size: 13px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            border-color 0.15s,
            color 0.15s;
    }
    .gs-close:hover {
        border-color: #424870;
        color: #edf0ff;
    }

    /* Stage */
    .gs-stage {
        flex: 1;
        overflow-y: auto;
        padding: clamp(32px, 5vw, 64px) clamp(20px, 5vw, 80px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        .game-shell {
            transition: none;
        }
        .gs-progress-fill {
            transition: none;
        }
    }
</style>
