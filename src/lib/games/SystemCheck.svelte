<script lang="ts">
    import { Store } from "./store";

    interface Props {
        onComplete: (data: {
            score: number;
            total: number;
            badgeId?: string | null;
            statLine: string;
        }) => void;
    }
    let { onComplete }: Props = $props();

    const SLUG = "system-check";
    const dimensions = [
        {
            key: "learned",
            label: "What did you learn today?",
            placeholder: "Something new you encountered...",
        },
        {
            key: "applied",
            label: "What did you apply today?",
            placeholder: "Knowledge you put into practice...",
        },
        {
            key: "avoided",
            label: "What did you avoid today?",
            placeholder: "Something you should have done but didn't...",
        },
        {
            key: "confused",
            label: "What confused you today?",
            placeholder: "Something you don't fully understand yet...",
        },
        {
            key: "want",
            label: "What do you want to understand better?",
            placeholder: "Topics to explore next...",
        },
    ];

    let responses = $state<Record<string, string>>({
        learned: "",
        applied: "",
        avoided: "",
        confused: "",
        want: "",
    });
    let currentDim = $state(0);

    function handleComplete() {
        const streak = Store.updateStreak(SLUG);
        const data = Store.get(SLUG);
        const entries = data.entries || [];
        entries.unshift({
            date: new Date().toISOString().slice(0, 10),
            responses: { ...responses },
        });
        Store.set(SLUG, { entries: entries.slice(0, 90) });

        let badge: string | null = null;
        if (streak >= 7 && Store.addBadge(SLUG, "systemcheck-streak-7"))
            badge = "systemcheck-streak-7";
        if (streak >= 30 && Store.addBadge(SLUG, "systemcheck-streak-30"))
            badge = "systemcheck-streak-30";

        onComplete({
            score: 5,
            total: 5,
            badgeId: badge,
            statLine: `STREAK: ${streak} DAYS · 5 DIMENSIONS · ${new Date().toISOString().slice(0, 10)}`,
        });
    }
</script>

<div class="screen-input">
    <span class="si-prompt-num"
        >DIMENSION {currentDim + 1} OF {dimensions.length}</span
    >
    <h2 class="si-prompt">{dimensions[currentDim].label}</h2>
    <textarea
        class="si-textarea"
        placeholder={dimensions[currentDim].placeholder}
        bind:value={responses[dimensions[currentDim].key]}
    ></textarea>
    <div class="si-nav">
        {#if currentDim > 0}
            <button class="si-btn" onclick={() => currentDim--}>← BACK</button>
        {/if}
        {#if currentDim < dimensions.length - 1}
            <button
                class="si-btn primary"
                onclick={() => currentDim++}
                disabled={responses[dimensions[currentDim].key].length === 0}
                >NEXT →</button
            >
        {:else}
            <button
                class="si-btn primary"
                onclick={handleComplete}
                disabled={Object.values(responses).some((r) => r.length === 0)}
                >COMPLETE CHECK →</button
            >
        {/if}
    </div>
</div>

<style>
    .screen-input {
        width: 100%;
        max-width: 640px;
    }
    .si-prompt-num {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .si-prompt {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(20px, 3vw, 28px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 20px 0;
    }
    .si-textarea {
        width: 100%;
        min-height: 140px;
        background: transparent;
        border: none;
        border-bottom: 1px solid #171b30;
        color: #edf0ff;
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        line-height: 1.75;
        resize: none;
        outline: none;
        padding: 0 0 12px;
        caret-color: var(--game-accent, #18c96a);
        box-sizing: border-box;
    }
    .si-textarea:focus {
        border-bottom-color: var(--game-accent, #18c96a);
    }
    .si-textarea::placeholder {
        color: #1e2440;
        font-style: italic;
    }
    .si-nav {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    .si-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        padding: 10px 20px;
        border-radius: 3px;
        background: transparent;
        cursor: pointer;
        color: #424870;
        border: 1px solid #171b30;
    }
    .si-btn.primary {
        color: var(--game-accent, #18c96a);
        border-color: var(--game-accent, #18c96a);
    }
    .si-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }
    .si-btn:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.02);
    }
</style>
