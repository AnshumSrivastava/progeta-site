<script lang="ts">
    const STORAGE_KEY = "pt-the-audit";

    interface AuditQuestion {
        category: string;
        question: string;
        options: string[];
        weights: number[];
    }

    interface AuditResult {
        date: string;
        scores: Record<string, number>;
        total: number;
    }

    const questions: AuditQuestion[] = [
        {
            category: "PASSWORDS",
            question: "How do you manage your passwords?",
            options: [
                "Same password everywhere",
                "A few passwords rotated across accounts",
                "Password manager with unique passwords",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "PASSWORDS",
            question: "Do you use multi-factor authentication?",
            options: [
                "Never heard of it",
                "On some accounts",
                "On every account that supports it",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "UPDATES",
            question: "How quickly do you install software updates?",
            options: [
                "I ignore them or delay weeks",
                "Within a few days",
                "Same day or auto-update enabled",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "UPDATES",
            question: "Is your operating system currently up to date?",
            options: ["I don't know", "Probably not", "Yes, verified"],
            weights: [0, 0, 3],
        },
        {
            category: "NETWORK",
            question: "Do you use public Wi-Fi without a VPN?",
            options: [
                "Yes, regularly",
                "Sometimes",
                "Never, or always with VPN",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "NETWORK",
            question: "Do you know what DNS you are using?",
            options: [
                "What is DNS?",
                "My ISP's default",
                "A privacy-focused DNS like 1.1.1.1 or 9.9.9.9",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "AWARENESS",
            question: "How do you verify unexpected emails asking for action?",
            options: [
                "I click links if they look real",
                "I check the sender address",
                "I verify through a separate channel before acting",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "AWARENESS",
            question: "Have you ever shared a password via text or email?",
            options: [
                "Yes, it was convenient",
                "Once or twice",
                "Never — I use secure sharing methods",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "DATA",
            question: "Do you back up your important data?",
            options: [
                "No backups",
                "Occasionally to one location",
                "Regular backups to multiple locations",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "DATA",
            question: "Could you recover if your phone was stolen right now?",
            options: [
                "I would lose everything",
                "I would lose some things",
                "Everything is backed up and encrypted",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "PRIVACY",
            question: "How many apps have access to your location?",
            options: [
                "I have no idea",
                "More than I should allow",
                "I audit permissions regularly",
            ],
            weights: [0, 1, 3],
        },
        {
            category: "PRIVACY",
            question:
                "Do you read privacy policies before signing up for services?",
            options: [
                "Never",
                "Sometimes for important ones",
                "I review key sections — data sharing, deletion rights",
            ],
            weights: [0, 1, 3],
        },
    ];

    const categories = [...new Set(questions.map((q) => q.category))];

    function loadResults(): AuditResult[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveResults(r: AuditResult[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
    }

    let results = $state(loadResults());
    let answers = $state<number[]>(new Array(questions.length).fill(-1));
    let submitted = $state(false);

    function handleSubmit() {
        if (answers.some((a) => a === -1)) return;
        submitted = true;
        const scores: Record<string, number> = {};
        categories.forEach((c) => {
            scores[c] = 0;
        });
        questions.forEach((q, i) => {
            scores[q.category] += q.weights[answers[i]];
        });
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const result: AuditResult = {
            date: new Date().toISOString().slice(0, 10),
            scores,
            total,
        };
        results = [result, ...results];
        saveResults(results);
    }

    function getGrade(total: number): string {
        if (total >= 30) return "EXCELLENT";
        if (total >= 22) return "SOLID";
        if (total >= 14) return "NEEDS WORK";
        return "CRITICAL";
    }

    function getGradeColor(total: number): string {
        if (total >= 30) return "#18c96a";
        if (total >= 22) return "#1a8fe3";
        if (total >= 14) return "#e0a820";
        return "#e05c20";
    }

    function resetAudit() {
        answers = new Array(questions.length).fill(-1);
        submitted = false;
    }

    const currentTotal = $derived(() => {
        if (!submitted) return 0;
        return questions.reduce((acc, q, i) => acc + q.weights[answers[i]], 0);
    });
</script>

<svelte:head>
    <title>The Audit — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Assess your personal digital security posture across 6 categories. Get a readiness grade and track improvement over time."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">CYBERSECURITY</span>
        <h1 class="game-title">The Audit</h1>
        <p class="game-sub">
            You are the weakest link. Or the strongest. Find out which.
        </p>
    </header>

    {#if !submitted}
        <div class="q-list">
            {#each questions as q, i}
                <div class="q-block">
                    <span class="q-cat">{q.category}</span>
                    <p class="q-text">{q.question}</p>
                    <div class="q-opts">
                        {#each q.options as opt, j}
                            <button
                                class="q-opt"
                                class:selected={answers[i] === j}
                                onclick={() => {
                                    answers[i] = j;
                                    answers = [...answers];
                                }}>{opt}</button
                            >
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        <button
            class="submit-btn"
            disabled={answers.some((a) => a === -1)}
            onclick={handleSubmit}>RUN AUDIT →</button
        >
    {:else}
        <section class="results-sec">
            <div
                class="grade-box"
                style="--gc: {getGradeColor(currentTotal())};"
            >
                <span class="grade-label">YOUR GRADE</span>
                <span class="grade-text">{getGrade(currentTotal())}</span>
                <span class="grade-score">{currentTotal()} / 36</span>
            </div>

            <div class="cat-breakdown">
                {#each categories as cat}
                    {@const catQuestions = questions.filter(
                        (q) => q.category === cat,
                    )}
                    {@const catScore = catQuestions.reduce((acc, q, j) => {
                        const idx = questions.indexOf(q);
                        return acc + q.weights[answers[idx]];
                    }, 0)}
                    {@const catMax = catQuestions.length * 3}
                    <div class="cat-row">
                        <span class="cat-name">{cat}</span>
                        <div class="cat-bar-bg">
                            <div
                                class="cat-bar-fill"
                                style="width: {(catScore / catMax) * 100}%"
                            ></div>
                        </div>
                        <span class="cat-score">{catScore}/{catMax}</span>
                    </div>
                {/each}
            </div>

            <button class="retry-btn" onclick={resetAudit}
                >RETAKE AUDIT →</button
            >

            {#if results.length > 1}
                <div class="history-sec">
                    <span class="sec-label">PAST AUDITS</span>
                    {#each results as r}
                        <div class="history-row">
                            <span class="h-date">{r.date}</span><span
                                class="h-score"
                                >{r.total}/36 — {getGrade(r.total)}</span
                            >
                        </div>
                    {/each}
                </div>
            {/if}
        </section>
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
    .game-header {
        margin-bottom: 32px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e05c20;
        border: 1px solid #e05c20;
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
    }
    .game-sub {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #424870;
        margin: 0;
        font-style: italic;
    }

    .q-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 24px;
    }
    .q-block {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 16px 20px;
    }
    .q-cat {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e05c20;
        display: block;
        margin-bottom: 6px;
    }
    .q-text {
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #edf0ff;
        margin: 0 0 12px 0;
        line-height: 1.4;
    }
    .q-opts {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .q-opt {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
        background: #03040a;
        border: 1px solid #0f1220;
        padding: 10px 14px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s;
    }
    .q-opt:hover {
        border-color: #424870;
    }
    .q-opt.selected {
        border-color: #e05c20;
        color: #edf0ff;
        background: rgba(224, 92, 32, 0.05);
    }

    .submit-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #e05c20;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
    }
    .submit-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }
    .submit-btn:hover:not(:disabled) {
        background: rgba(224, 92, 32, 0.08);
    }

    .grade-box {
        text-align: center;
        padding: 32px;
        background: #07090f;
        border: 1px solid var(--gc);
        margin-bottom: 32px;
    }
    .grade-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .grade-text {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 32px;
        color: var(--gc);
        display: block;
    }
    .grade-score {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        color: #424870;
        display: block;
        margin-top: 4px;
    }

    .cat-breakdown {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
    }
    .cat-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .cat-name {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        min-width: 90px;
    }
    .cat-bar-bg {
        flex: 1;
        height: 6px;
        background: #0f1220;
        border-radius: 3px;
        overflow: hidden;
    }
    .cat-bar-fill {
        height: 100%;
        background: #e05c20;
        border-radius: 3px;
        transition: width 0.4s ease;
    }
    .cat-score {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #424870;
        min-width: 30px;
    }

    .retry-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #424870;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
    }

    .history-sec {
        margin-top: 32px;
    }
    .sec-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 12px;
    }
    .history-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #0f1220;
    }
    .h-date,
    .h-score {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #424870;
    }
</style>
