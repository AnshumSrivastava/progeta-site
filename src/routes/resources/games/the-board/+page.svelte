<script lang="ts">
    const STORAGE_KEY = "pt-the-board";

    interface Quarter {
        id: number;
        label: string;
        event: string;
        eventType: "opportunity" | "crisis" | "neutral";
        decisions: {
            label: string;
            effects: {
                budget: number;
                security: number;
                growth: number;
                reputation: number;
            };
            feedback: string;
        }[];
    }

    interface SessionResult {
        date: string;
        finalBudget: number;
        finalSecurity: number;
        finalGrowth: number;
        finalReputation: number;
    }

    const quarters: Quarter[] = [
        {
            id: 1,
            label: "Q1 — YEAR ONE",
            event: "A major client asks you to implement end-to-end encryption for their data. This was not in your roadmap.",
            eventType: "opportunity",
            decisions: [
                {
                    label: "Invest in encryption now — it becomes a differentiator",
                    effects: {
                        budget: -20,
                        security: +30,
                        growth: +10,
                        reputation: +15,
                    },
                    feedback:
                        "Expensive but positions you ahead of competitors. Client trusts you more, and the feature attracts security-conscious buyers.",
                },
                {
                    label: "Promise it for next quarter and focus on current roadmap",
                    effects: {
                        budget: 0,
                        security: 0,
                        growth: +5,
                        reputation: -5,
                    },
                    feedback:
                        "Keeps the team focused but the client notices the delay. Competitors who moved faster may capture their attention.",
                },
                {
                    label: "Outsource the encryption work to ship faster",
                    effects: {
                        budget: -10,
                        security: +15,
                        growth: +10,
                        reputation: 0,
                    },
                    feedback:
                        "Faster delivery but reliance on third-party code introduces supply chain risk. The feature ships but quality depends on vendor reliability.",
                },
            ],
        },
        {
            id: 2,
            label: "Q2 — YEAR ONE",
            event: "A former employee publicly tweets that your company has poor internal security practices. Media picks it up.",
            eventType: "crisis",
            decisions: [
                {
                    label: "Commission an independent security audit and publish results transparently",
                    effects: {
                        budget: -15,
                        security: +20,
                        growth: 0,
                        reputation: +25,
                    },
                    feedback:
                        'Transparency costs money but builds massive trust. The audit finds minor issues which you fix publicly. The narrative becomes "they responded responsibly."',
                },
                {
                    label: "Issue a legal threat to the former employee",
                    effects: {
                        budget: -5,
                        security: 0,
                        growth: 0,
                        reputation: -20,
                    },
                    feedback:
                        "The Streisand Effect kicks in. Threatening a whistleblower amplifies the story and makes you look defensive. Trust drops.",
                },
                {
                    label: "Ignore it — the news cycle will move on",
                    effects: {
                        budget: 0,
                        security: 0,
                        growth: -5,
                        reputation: -10,
                    },
                    feedback:
                        "The story fades in a week but the screenshot lives forever. Future investors, clients, and hires will find it.",
                },
            ],
        },
        {
            id: 3,
            label: "Q3 — YEAR ONE",
            event: "An AI startup offers to integrate their model into your product for personalised recommendations.",
            eventType: "opportunity",
            decisions: [
                {
                    label: "Integrate the AI but with strict data governance and user consent",
                    effects: {
                        budget: -10,
                        security: -5,
                        growth: +20,
                        reputation: +10,
                    },
                    feedback:
                        "The feature is popular and you gain market differentiation. Consent-first approach aligns with privacy regulations.",
                },
                {
                    label: "Build your own recommendation system in-house",
                    effects: {
                        budget: -25,
                        security: +5,
                        growth: +10,
                        reputation: +5,
                    },
                    feedback:
                        "Full control over data and quality. But the timeline is 6 months longer and costs significantly more than integration.",
                },
                {
                    label: "Decline — AI personalisation raises privacy concerns you are not ready to handle",
                    effects: {
                        budget: 0,
                        security: +10,
                        growth: -5,
                        reputation: +5,
                    },
                    feedback:
                        "Conservative but principled. You avoid risk but competitors who integrate AI capture more market attention.",
                },
            ],
        },
        {
            id: 4,
            label: "Q4 — YEAR ONE",
            event: "You discover a vulnerability in your own product that could expose user data. No evidence of exploitation yet.",
            eventType: "crisis",
            decisions: [
                {
                    label: "Fix it immediately and proactively notify all affected users",
                    effects: {
                        budget: -10,
                        security: +25,
                        growth: -5,
                        reputation: +20,
                    },
                    feedback:
                        "Proactive disclosure is costly short-term but builds long-term trust. Users appreciate honesty. Regulators note your compliance.",
                },
                {
                    label: "Fix it quietly and monitor for any signs of exploitation",
                    effects: {
                        budget: -5,
                        security: +15,
                        growth: 0,
                        reputation: -5,
                    },
                    feedback:
                        "The fix ships, but if the vulnerability is later discovered to have been known and not disclosed, the reputation damage is severe.",
                },
                {
                    label: "Assign it to the backlog — no evidence of exploitation means low priority",
                    effects: {
                        budget: 0,
                        security: -10,
                        growth: +5,
                        reputation: 0,
                    },
                    feedback:
                        "Prioritising features over security is a gamble. If this vulnerability is found by an attacker before you fix it, the damage is catastrophic.",
                },
            ],
        },
    ];

    function loadResults(): SessionResult[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveResults(r: SessionResult[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
    }

    let results = $state(loadResults());
    let budget = $state(100);
    let security = $state(50);
    let growth = $state(50);
    let reputation = $state(50);
    let qIndex = $state(0);
    let showFeedback = $state(false);
    let feedbackText = $state("");
    let sessionDone = $state(false);
    let choiceIdx = $state(-1);

    function handleDecision(idx: number) {
        if (showFeedback) return;
        const decision = quarters[qIndex].decisions[idx];
        budget += decision.effects.budget;
        security = Math.max(
            0,
            Math.min(100, security + decision.effects.security),
        );
        growth = Math.max(0, Math.min(100, growth + decision.effects.growth));
        reputation = Math.max(
            0,
            Math.min(100, reputation + decision.effects.reputation),
        );
        feedbackText = decision.feedback;
        choiceIdx = idx;
        showFeedback = true;
    }

    function nextQuarter() {
        if (qIndex < quarters.length - 1) {
            qIndex++;
            showFeedback = false;
            feedbackText = "";
            choiceIdx = -1;
        } else {
            sessionDone = true;
            const r: SessionResult = {
                date: new Date().toISOString().slice(0, 10),
                finalBudget: budget,
                finalSecurity: security,
                finalGrowth: growth,
                finalReputation: reputation,
            };
            results = [r, ...results];
            saveResults(results);
        }
    }

    function restart() {
        budget = 100;
        security = 50;
        growth = 50;
        reputation = 50;
        qIndex = 0;
        showFeedback = false;
        feedbackText = "";
        choiceIdx = -1;
        sessionDone = false;
    }

    function getBarColor(val: number): string {
        if (val >= 70) return "#18c96a";
        if (val >= 40) return "#e0a820";
        return "#e05c20";
    }
</script>

<svelte:head>
    <title>The Board — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Play as a tech company CEO. Navigate quarterly business decisions balancing budget, security, growth, and reputation."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>
    <header class="game-header">
        <span class="domain-badge">STRATEGY</span>
        <h1 class="game-title">The Board</h1>
        <p class="game-sub">
            You are the CEO. Every quarter brings a decision. Every decision has
            a cost.
        </p>
    </header>

    <!-- Dashboard -->
    <div class="dash">
        <div class="dash-metric">
            <span class="dash-label">BUDGET</span>
            <div class="dash-bar-bg">
                <div
                    class="dash-bar"
                    style="width: {Math.max(
                        0,
                        budget,
                    )}%; background: {getBarColor(budget)}"
                ></div>
            </div>
            <span class="dash-val">{budget}</span>
        </div>
        <div class="dash-metric">
            <span class="dash-label">SECURITY</span>
            <div class="dash-bar-bg">
                <div
                    class="dash-bar"
                    style="width: {security}%; background: {getBarColor(
                        security,
                    )}"
                ></div>
            </div>
            <span class="dash-val">{security}</span>
        </div>
        <div class="dash-metric">
            <span class="dash-label">GROWTH</span>
            <div class="dash-bar-bg">
                <div
                    class="dash-bar"
                    style="width: {growth}%; background: {getBarColor(growth)}"
                ></div>
            </div>
            <span class="dash-val">{growth}</span>
        </div>
        <div class="dash-metric">
            <span class="dash-label">REPUTATION</span>
            <div class="dash-bar-bg">
                <div
                    class="dash-bar"
                    style="width: {reputation}%; background: {getBarColor(
                        reputation,
                    )}"
                ></div>
            </div>
            <span class="dash-val">{reputation}</span>
        </div>
    </div>

    {#if !sessionDone}
        <section class="quarter-card">
            <span class="quarter-label">{quarters[qIndex].label}</span>
            <span
                class="event-type"
                class:crisis={quarters[qIndex].eventType === "crisis"}
                class:opp={quarters[qIndex].eventType === "opportunity"}
                >{quarters[qIndex].eventType.toUpperCase()}</span
            >
            <p class="quarter-event">{quarters[qIndex].event}</p>

            <div class="q-decisions">
                {#each quarters[qIndex].decisions as dec, i}
                    <button
                        class="dec-btn"
                        class:selected={choiceIdx === i}
                        disabled={showFeedback}
                        onclick={() => handleDecision(i)}
                    >
                        {dec.label}
                        <span class="dec-effects">
                            {#if dec.effects.budget !== 0}<span
                                    class="eff"
                                    class:neg={dec.effects.budget < 0}
                                    >Budget {dec.effects.budget > 0
                                        ? "+"
                                        : ""}{dec.effects.budget}</span
                                >{/if}
                            {#if dec.effects.security !== 0}<span
                                    class="eff"
                                    class:neg={dec.effects.security < 0}
                                    >Security {dec.effects.security > 0
                                        ? "+"
                                        : ""}{dec.effects.security}</span
                                >{/if}
                            {#if dec.effects.growth !== 0}<span
                                    class="eff"
                                    class:neg={dec.effects.growth < 0}
                                    >Growth {dec.effects.growth > 0
                                        ? "+"
                                        : ""}{dec.effects.growth}</span
                                >{/if}
                            {#if dec.effects.reputation !== 0}<span
                                    class="eff"
                                    class:neg={dec.effects.reputation < 0}
                                    >Rep {dec.effects.reputation > 0
                                        ? "+"
                                        : ""}{dec.effects.reputation}</span
                                >{/if}
                        </span>
                    </button>
                {/each}
            </div>

            {#if showFeedback}
                <div class="feedback-box">
                    <span class="fb-label">OUTCOME</span>
                    <p class="fb-text">{feedbackText}</p>
                </div>
                <button class="next-btn" onclick={nextQuarter}
                    >{qIndex < quarters.length - 1
                        ? "NEXT QUARTER →"
                        : "END OF YEAR →"}</button
                >
            {/if}
        </section>
    {:else}
        <section class="results-sec">
            <h2 class="results-heading">Year-End Report</h2>
            <div class="results-grid">
                <div class="result-cell">
                    <span class="rc-lbl">BUDGET</span><span class="rc-val"
                        >{budget}</span
                    >
                </div>
                <div class="result-cell">
                    <span class="rc-lbl">SECURITY</span><span class="rc-val"
                        >{security}</span
                    >
                </div>
                <div class="result-cell">
                    <span class="rc-lbl">GROWTH</span><span class="rc-val"
                        >{growth}</span
                    >
                </div>
                <div class="result-cell">
                    <span class="rc-lbl">REPUTATION</span><span class="rc-val"
                        >{reputation}</span
                    >
                </div>
            </div>
            <button class="next-btn" onclick={restart}>PLAY AGAIN →</button>
        </section>
    {/if}
</div>

<style>
    .game-shell {
        max-width: 700px;
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
        margin-bottom: 24px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e0a820;
        border: 1px solid #e0a820;
        padding: 3px 10px;
        border-radius: 2px;
        display: inline-block;
        margin-bottom: 12px;
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

    .dash {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 16px 20px;
    }
    .dash-metric {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .dash-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        min-width: 80px;
    }
    .dash-bar-bg {
        flex: 1;
        height: 6px;
        background: #0f1220;
        border-radius: 3px;
        overflow: hidden;
    }
    .dash-bar {
        height: 100%;
        border-radius: 3px;
        transition:
            width 0.4s ease,
            background 0.4s ease;
    }
    .dash-val {
        font-family: "DM Mono", monospace;
        font-size: 12px;
        color: #edf0ff;
        min-width: 30px;
        text-align: right;
    }

    .quarter-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(20px, 3vw, 32px);
    }
    .quarter-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 4px;
    }
    .event-type {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 2px;
        margin-bottom: 10px;
    }
    .event-type.crisis {
        color: #e05c20;
        border: 1px solid #e05c20;
    }
    .event-type.opp {
        color: #18c96a;
        border: 1px solid #18c96a;
    }
    .quarter-event {
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #edf0ff;
        line-height: 1.5;
        margin: 0 0 20px 0;
    }

    .q-decisions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .dec-btn {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        background: #03040a;
        border: 1px solid #0f1220;
        padding: 14px 16px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .dec-btn:not(:disabled):hover {
        border-color: #424870;
    }
    .dec-btn:disabled {
        cursor: default;
    }
    .dec-btn.selected {
        border-color: #e0a820;
        color: #edf0ff;
    }
    .dec-effects {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
    .eff {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.06em;
        color: #18c96a;
    }
    .eff.neg {
        color: #e05c20;
    }

    .feedback-box {
        margin-top: 16px;
        padding: 14px 16px;
        border-left: 2px solid #e0a820;
    }
    .fb-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #e0a820;
        display: block;
        margin-bottom: 4px;
    }
    .fb-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.6;
        margin: 0;
    }

    .next-btn {
        margin-top: 16px;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #e0a820;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
    }

    .results-sec {
        text-align: center;
    }
    .results-heading {
        font-family: "DM Mono", monospace;
        font-size: 20px;
        color: #edf0ff;
        margin: 0 0 20px 0;
        letter-spacing: 0.1em;
    }
    .results-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: #0f1220;
        margin-bottom: 24px;
    }
    .result-cell {
        background: #07090f;
        padding: 20px;
        text-align: center;
    }
    .rc-lbl {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-bottom: 4px;
    }
    .rc-val {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 24px;
        color: #edf0ff;
    }
</style>
