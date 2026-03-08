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

    const SLUG = "reflection-log";
    const promptBank = [
        "What did you learn today that you did not know yesterday?",
        "What is one thing you avoided today — and why?",
        "If you could change one decision you made this week, what would it be?",
        "What confused you recently that you have not resolved yet?",
        "What do you want to understand better by next week?",
        "What is a skill you are actively building right now?",
        "What is one belief you held a year ago that you no longer hold?",
        "What is the most important problem you are ignoring?",
        "Who influenced your thinking recently — and how?",
        "What would you do differently if nobody was watching?",
        "What are you most proud of in the last 30 days?",
        "What is one habit that is holding you back?",
        "What is the hardest question someone could ask you right now?",
        "What are you doing today that your future self will thank you for?",
        "What is one thing you pretend to know but actually do not?",
        "What is the biggest risk you are not taking?",
        "What did failure teach you recently?",
        "What do you spend time on that does not matter?",
        "If you had to teach someone one thing, what would it be?",
        "What are you afraid of — and what would change if you were not?",
        "What is the difference between what you say you want and what you actually do?",
        "What question are you avoiding asking yourself?",
        "What do you need to let go of?",
        "What is the best piece of feedback you have received recently?",
        "What would make today meaningful?",
        "What is one system or process you could improve in your life?",
        "What assumption have you been operating on without testing it?",
        "What do you wish you had started six months ago?",
        "What is one thing you are doing just because everyone else does?",
        "When was the last time you changed your mind about something important?",
    ];

    function getTodayPrompts(): string[] {
        const now = new Date();
        const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
                86400000,
        );
        const base = (dayOfYear * 3) % promptBank.length;
        return [
            promptBank[base % promptBank.length],
            promptBank[(base + 1) % promptBank.length],
            promptBank[(base + 2) % promptBank.length],
        ];
    }

    const prompts = getTodayPrompts();
    let responses = $state(["", "", ""]);
    let phase: "write" | "review" | "saved" = $state("write");
    let currentPrompt = $state(0);

    function handleSave() {
        phase = "review";
    }

    function handleConfirm() {
        const streak = Store.updateStreak(SLUG);
        const data = Store.get(SLUG);
        const entries = data.entries || [];
        entries.unshift({
            id: `entry-${new Date().toISOString().slice(0, 10)}`,
            date: new Date().toISOString().slice(0, 10),
            prompts: [...prompts],
            responses: [...responses],
        });
        Store.set(SLUG, { entries });

        let badge: string | null = null;
        if (streak >= 7 && Store.addBadge(SLUG, "reflection-streak-7"))
            badge = "reflection-streak-7";
        if (streak >= 30 && Store.addBadge(SLUG, "reflection-streak-30"))
            badge = "reflection-streak-30";

        onComplete({
            score: 3,
            total: 3,
            badgeId: badge,
            statLine: `STREAK: ${streak} DAYS · 3 PROMPTS · ${new Date().toISOString().slice(0, 10)}`,
        });
    }
</script>

<div class="screen-input">
    {#if phase === "write"}
        <span class="si-prompt-num">PROMPT {currentPrompt + 1} OF 3</span>
        <h2 class="si-prompt">{prompts[currentPrompt]}</h2>
        <p class="si-sub">Be honest. Nobody reads this but you.</p>
        <textarea
            class="si-textarea"
            placeholder="Write your response..."
            bind:value={responses[currentPrompt]}
        ></textarea>
        <span class="si-char-count"
            >{responses[currentPrompt].length} characters</span
        >
        <div class="si-nav">
            {#if currentPrompt > 0}
                <button class="si-btn" onclick={() => currentPrompt--}
                    >← BACK</button
                >
            {/if}
            {#if currentPrompt < 2}
                <button
                    class="si-btn primary"
                    onclick={() => currentPrompt++}
                    disabled={responses[currentPrompt].length === 0}
                    >NEXT →</button
                >
            {:else}
                <button
                    class="si-btn primary"
                    onclick={handleSave}
                    disabled={responses.some((r) => r.length === 0)}
                    >REVIEW →</button
                >
            {/if}
        </div>
    {:else if phase === "review"}
        <span class="si-prompt-num">REVIEW YOUR ENTRIES</span>
        {#each prompts as prompt, i}
            <div class="review-block">
                <h3 class="review-prompt">{prompt}</h3>
                <p class="review-response">{responses[i]}</p>
            </div>
        {/each}
        <p class="review-check">Does this reflect where you actually are?</p>
        <button class="si-btn primary" onclick={handleConfirm}
            >SAVE & COMPLETE →</button
        >
    {/if}
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
        margin: 0 0 12px 0;
    }
    .si-sub {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #424870;
        font-style: italic;
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
        transition: border-color 0.2s;
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
    .si-char-count {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        color: #1e2440;
        text-align: right;
        display: block;
        margin-top: 6px;
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

    .review-block {
        padding: 16px 0;
        border-bottom: 1px solid #0f1220;
    }
    .review-prompt {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        color: #424870;
        margin: 0 0 8px 0;
    }
    .review-response {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0;
    }
    .review-check {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #424870;
        font-style: italic;
        margin: 20px 0;
    }
</style>
