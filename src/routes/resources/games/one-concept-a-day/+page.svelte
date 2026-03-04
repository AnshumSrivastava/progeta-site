<script lang="ts">
    import { concepts, type Concept } from "$lib/content/concepts";

    const STORAGE_KEY = "pt-one-concept";

    interface DayRecord {
        conceptId: number;
        correct: boolean;
        date: string;
    }

    // Deterministically pick today's concept based on the date
    function getTodayConcept(): Concept {
        const now = new Date();
        const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
                86400000,
        );
        return concepts[dayOfYear % concepts.length];
    }

    function loadHistory(): DayRecord[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }

    function saveHistory(history: DayRecord[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    function todayStr(): string {
        return new Date().toISOString().slice(0, 10);
    }

    const concept = getTodayConcept();
    let history = $state(loadHistory());

    const todayRecord = $derived(history.find((r) => r.date === todayStr()));
    const alreadyAnswered = $derived(!!todayRecord);

    let selectedIndex = $state<number | null>(null);
    let showResult = $state(false);

    // Streak
    const streak = $derived(() => {
        const sorted = [...history].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        let count = 0;
        const today = new Date();
        for (let i = 0; i < sorted.length; i++) {
            const expected = new Date(today);
            expected.setDate(expected.getDate() - i);
            const expectedStr = expected.toISOString().slice(0, 10);
            if (sorted[i]?.date === expectedStr) {
                count++;
            } else {
                break;
            }
        }
        return count;
    });

    // Last 30 days for heatmap
    const last30 = $derived(() => {
        const days: { date: string; done: boolean; correct: boolean }[] = [];
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const ds = d.toISOString().slice(0, 10);
            const record = history.find((r) => r.date === ds);
            days.push({
                date: ds,
                done: !!record,
                correct: record?.correct ?? false,
            });
        }
        return days;
    });

    function handleAnswer(idx: number) {
        if (alreadyAnswered || showResult) return;
        selectedIndex = idx;
        showResult = true;

        const record: DayRecord = {
            conceptId: concept.id,
            correct: idx === concept.correctIndex,
            date: todayStr(),
        };
        history = [...history, record];
        saveHistory(history);
    }

    function getDomainColor(domain: string): string {
        if (domain === "CYBERSECURITY") return "#E05C20";
        if (domain === "AI") return "#1A8FE3";
        return "#A78FFF";
    }

    // If already answered on load, show the result
    $effect(() => {
        if (alreadyAnswered && !showResult) {
            selectedIndex = todayRecord!.correct
                ? concept.correctIndex
                : concept.options.findIndex(
                      (_, i) => i !== concept.correctIndex,
                  );
            showResult = true;
        }
    });
</script>

<svelte:head>
    <title>One Concept a Day — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Three minutes. One idea. One question. Learn cybersecurity, AI, and quantum concepts — one day at a time."
    />
</svelte:head>

<div class="game-shell">
    <!-- Back link -->
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <!-- Header -->
    <header class="game-header">
        <span
            class="domain-badge"
            style="--dc: {getDomainColor(concept.domain)};"
        >
            {concept.domain}
        </span>
        <h1 class="game-title">One Concept a Day</h1>
        <p class="game-sub">
            Three minutes. One idea. One question. Come back tomorrow.
        </p>
    </header>

    <!-- Streak + Heatmap -->
    <section class="stats-row">
        <div class="streak-box">
            <span class="streak-num">{streak()}</span>
            <span class="streak-label">DAY STREAK</span>
        </div>
        <div class="streak-box">
            <span class="streak-num">{history.length}</span>
            <span class="streak-label">TOTAL CONCEPTS</span>
        </div>
        <div class="streak-box">
            <span class="streak-num"
                >{history.filter((r) => r.correct).length}</span
            >
            <span class="streak-label">CORRECT</span>
        </div>
    </section>

    <div class="heatmap-wrap">
        <span class="heatmap-label">LAST 30 DAYS</span>
        <div class="heatmap">
            {#each last30() as day}
                <div
                    class="heatmap-cell"
                    class:done={day.done}
                    class:correct={day.done && day.correct}
                    class:wrong={day.done && !day.correct}
                    title={day.date}
                ></div>
            {/each}
        </div>
    </div>

    <!-- Concept Card -->
    <article class="concept-card">
        <div class="concept-header">
            <span class="concept-num">CONCEPT #{concept.id}</span>
            <span class="concept-date">{todayStr()}</span>
        </div>

        <h2 class="concept-title">{concept.title}</h2>
        <p class="concept-body">{concept.explanation}</p>

        <div class="analogy-box">
            <span class="analogy-label">ANALOGY</span>
            <p class="analogy-text">{concept.analogy}</p>
        </div>
    </article>

    <!-- Question -->
    <section class="question-sec">
        <h3 class="question-heading">THE QUESTION</h3>
        <p class="question-text">{concept.question}</p>

        <div class="options">
            {#each concept.options as option, i}
                <button
                    class="option-btn"
                    class:selected={selectedIndex === i}
                    class:correct={showResult && i === concept.correctIndex}
                    class:wrong={showResult &&
                        selectedIndex === i &&
                        i !== concept.correctIndex}
                    disabled={showResult}
                    onclick={() => handleAnswer(i)}
                >
                    <span class="option-letter">{["A", "B", "C"][i]}</span>
                    <span class="option-text">{option}</span>
                </button>
            {/each}
        </div>

        {#if showResult}
            <div
                class="result-box"
                class:is-correct={selectedIndex === concept.correctIndex}
            >
                <span class="result-label">
                    {selectedIndex === concept.correctIndex
                        ? "✓ CORRECT"
                        : "✗ INCORRECT"}
                </span>
                <p class="result-text">{concept.reinforcement}</p>
            </div>
        {/if}
    </section>

    <!-- Come back tomorrow -->
    {#if showResult}
        <footer class="tomorrow-footer">
            <p class="tomorrow-text">
                Concept #{concept.id} complete. Come back tomorrow for the next one.
            </p>
        </footer>
    {/if}
</div>

<style>
    .game-shell {
        max-width: 680px;
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

    /* Header */
    .game-header {
        margin-bottom: 32px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--dc);
        border: 1px solid var(--dc);
        padding: 3px 10px;
        border-radius: 2px;
        display: inline-block;
        margin-bottom: 12px;
        opacity: 0.8;
    }
    .game-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(32px, 5vw, 44px);
        color: #edf0ff;
        line-height: 1;
        margin: 0 0 8px 0;
        letter-spacing: -0.02em;
    }
    .game-sub {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #424870;
        line-height: 1.6;
        margin: 0;
    }

    /* Stats */
    .stats-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: #0f1220;
        margin-bottom: 16px;
    }
    .streak-box {
        background: #03040a;
        padding: 16px;
        text-align: center;
    }
    .streak-num {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 24px;
        color: #edf0ff;
        display: block;
    }
    .streak-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-top: 4px;
    }

    /* Heatmap */
    .heatmap-wrap {
        margin-bottom: 40px;
    }
    .heatmap-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .heatmap {
        display: flex;
        gap: 3px;
        flex-wrap: wrap;
    }
    .heatmap-cell {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background: #0a0c14;
        border: 1px solid #0f1220;
    }
    .heatmap-cell.correct {
        background: #18c96a;
        border-color: #18c96a;
    }
    .heatmap-cell.wrong {
        background: #e05c20;
        border-color: #e05c20;
    }

    /* Concept card */
    .concept-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(24px, 4vw, 40px);
        margin-bottom: 32px;
    }
    .concept-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .concept-num,
    .concept-date {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .concept-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(22px, 3vw, 30px);
        color: #edf0ff;
        line-height: 1.1;
        margin: 0 0 16px 0;
    }
    .concept-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        line-height: 1.72;
        color: #8890bb;
        margin: 0 0 24px 0;
    }

    /* Analogy */
    .analogy-box {
        border-top: 1px solid #0f1220;
        padding-top: 16px;
    }
    .analogy-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .analogy-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-style: italic;
        font-size: 14px;
        line-height: 1.65;
        color: #8890bb;
        margin: 0;
    }

    /* Question */
    .question-sec {
        margin-bottom: 32px;
    }
    .question-heading {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        color: #424870;
        margin: 0 0 8px 0;
    }
    .question-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #edf0ff;
        line-height: 1.5;
        margin: 0 0 20px 0;
    }

    /* Options */
    .options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .option-btn {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 14px 16px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition:
            border-color 0.2s,
            background 0.2s;
    }
    .option-btn:not(:disabled):hover {
        border-color: #424870;
        background: #0a0e18;
    }
    .option-btn:disabled {
        cursor: default;
    }
    .option-btn.correct {
        border-color: #18c96a;
        background: rgba(24, 201, 106, 0.06);
    }
    .option-btn.wrong {
        border-color: #e05c20;
        background: rgba(224, 92, 32, 0.06);
    }
    .option-letter {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        font-weight: 700;
        color: #424870;
        min-width: 16px;
        margin-top: 1px;
    }
    .option-text {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.5;
    }

    /* Result */
    .result-box {
        margin-top: 20px;
        padding: 16px 20px;
        border-left: 2px solid #424870;
        background: #07090f;
    }
    .result-box.is-correct {
        border-left-color: #18c96a;
    }
    .result-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-bottom: 6px;
    }
    .result-box.is-correct .result-label {
        color: #18c96a;
    }
    .result-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.65;
        color: #8890bb;
        margin: 0;
    }

    /* Tomorrow */
    .tomorrow-footer {
        text-align: center;
        padding: 24px 0;
        border-top: 1px solid #0f1220;
    }
    .tomorrow-text {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.08em;
        color: #424870;
        margin: 0;
    }

    @media (max-width: 520px) {
        .stats-row {
            grid-template-columns: 1fr;
        }
        .heatmap-cell {
            width: 12px;
            height: 12px;
        }
    }
</style>
