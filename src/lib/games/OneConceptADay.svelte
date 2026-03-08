<script lang="ts">
    import { Store } from "./store";
    import { concepts, type Concept } from "$lib/content/concepts";

    interface Props {
        onComplete: (data: {
            score: number;
            total: number;
            badgeId?: string | null;
            statLine: string;
        }) => void;
    }
    let { onComplete }: Props = $props();

    const SLUG = "one-concept-a-day";

    function getTodayConcept(): Concept {
        const now = new Date();
        const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
                86400000,
        );
        return concepts[dayOfYear % concepts.length];
    }

    const concept = getTodayConcept();
    let phase: "learn" | "quiz" | "done" = $state("learn");
    let selected = $state(-1);
    let answered = $state(false);

    function startQuiz() {
        phase = "quiz";
    }

    function handleAnswer(idx: number) {
        if (answered) return;
        selected = idx;
        answered = true;
    }

    function handleComplete() {
        const correct = selected === concept.correctIndex;
        const streak = Store.updateStreak(SLUG);
        const data = Store.get(SLUG);
        const calendar = data.calendar || {};
        calendar[new Date().toISOString().slice(0, 10)] = correct;
        const totalAnswered = (data.totalPlayed || 0) + 1;
        const totalCorrect = (data.totalCorrect || 0) + (correct ? 1 : 0);
        Store.set(SLUG, {
            calendar,
            totalPlayed: totalAnswered,
            totalCorrect,
            accuracy: totalCorrect / totalAnswered,
        });

        let badge: string | null = null;
        if (streak >= 7 && Store.addBadge(SLUG, "concept-streak-7"))
            badge = "concept-streak-7";
        if (streak >= 30 && Store.addBadge(SLUG, "concept-streak-30"))
            badge = "concept-streak-30";
        if (streak >= 90 && Store.addBadge(SLUG, "concept-streak-90"))
            badge = "concept-streak-90";

        onComplete({
            score: correct ? 1 : 0,
            total: 1,
            badgeId: badge,
            statLine: `STREAK: ${streak} DAYS · ${correct ? "CORRECT" : "INCORRECT"} · ${new Date().toISOString().slice(0, 10)}`,
        });
    }
</script>

<div class="screen-question">
    {#if phase === "learn"}
        <span class="sq-eyebrow">{concept.domain} · TODAY'S CONCEPT</span>
        <h2 class="sq-question">{concept.title}</h2>
        <div class="sq-content">
            <div class="concept-block">
                <p class="concept-explain">{concept.explanation}</p>
                <div class="concept-analogy">
                    <span class="analogy-label">ANALOGY</span>
                    <p class="analogy-text">{concept.analogy}</p>
                </div>
            </div>
        </div>
        <button class="sq-continue visible" onclick={startQuiz}
            >TEST YOUR UNDERSTANDING →</button
        >
    {:else if phase === "quiz"}
        <span class="sq-eyebrow">QUIZ · {concept.domain}</span>
        <h2 class="sq-question">{concept.question}</h2>
        <div class="sq-options">
            {#each concept.options as opt, i}
                <button
                    class="sq-option"
                    class:correct={answered && i === concept.correctIndex}
                    class:wrong={answered &&
                        i === selected &&
                        i !== concept.correctIndex}
                    disabled={answered}
                    onclick={() => handleAnswer(i)}>{opt}</button
                >
            {/each}
        </div>
        {#if answered}
            <div class="sq-reveal visible">
                <p class="sq-reveal-text">
                    <strong
                        >{selected === concept.correctIndex
                            ? "✓ Correct"
                            : "✗ Incorrect"}</strong
                    >
                    — {concept.reinforcement}
                </p>
            </div>
            <button class="sq-continue visible" onclick={handleComplete}
                >COMPLETE →</button
            >
        {/if}
    {/if}
</div>

<style>
    .screen-question {
        width: 100%;
        max-width: 640px;
        display: flex;
        flex-direction: column;
    }
    .sq-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        margin-bottom: 16px;
    }
    .sq-question {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(22px, 3.5vw, 32px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 28px 0;
    }
    .sq-content {
        margin-bottom: 28px;
    }

    .concept-block {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .concept-explain {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        line-height: 1.75;
        margin: 0;
    }
    .concept-analogy {
        padding: 16px 18px;
        border-left: 2px solid var(--game-accent, #1a8fe3);
        background: rgba(255, 255, 255, 0.02);
    }
    .analogy-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.16em;
        color: #424870;
        display: block;
        margin-bottom: 6px;
    }
    .analogy-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0;
        font-style: italic;
    }

    .sq-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .sq-option {
        padding: 14px 18px;
        border: 1px solid #171b30;
        border-radius: 4px;
        background: #07090f;
        color: #8890bb;
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        cursor: pointer;
        text-align: left;
        transition:
            border-color 0.15s,
            background 0.15s,
            color 0.15s;
    }
    .sq-option:hover:not(:disabled) {
        border-color: var(--game-accent, #edf0ff);
        background: #0c0e18;
        color: #edf0ff;
    }
    .sq-option.correct {
        border-color: #18c96a;
        background: rgba(24, 201, 106, 0.06);
        color: #18c96a;
    }
    .sq-option.wrong {
        border-color: #e05c20;
        background: rgba(224, 92, 32, 0.06);
        color: #e05c20;
    }
    .sq-option:disabled {
        cursor: default;
    }

    .sq-reveal {
        margin-top: 20px;
        padding: 16px 18px;
        border-left: 2px solid var(--game-accent, #edf0ff);
        background: rgba(255, 255, 255, 0.02);
    }
    .sq-reveal-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.72;
        color: #8890bb;
        margin: 0;
    }
    .sq-reveal-text strong {
        color: #edf0ff;
        font-weight: 400;
    }
    .sq-continue {
        align-self: flex-end;
        margin-top: 20px;
        padding: 10px 24px;
        border: 1px solid var(--game-accent, #edf0ff);
        border-radius: 3px;
        background: transparent;
        color: var(--game-accent, #edf0ff);
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        cursor: pointer;
    }
    .sq-continue:hover {
        background: rgba(237, 240, 255, 0.04);
    }
</style>
