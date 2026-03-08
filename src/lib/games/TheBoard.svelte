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

    const SLUG = "the-board";
    interface Event {
        title: string;
        desc: string;
        options: {
            label: string;
            budget: number;
            security: number;
            growth: number;
            reputation: number;
        }[];
    }

    const quarters: Event[][] = [
        [
            // Q1
            {
                title: "Board Meeting: Digital Transformation",
                desc: "The board wants faster digital transformation. Your CISO warns that the current pace of change is creating security gaps faster than they can be patched.",
                options: [
                    {
                        label: "Slow down transformation, prioritise security assessment",
                        budget: -5,
                        security: 20,
                        growth: -10,
                        reputation: 5,
                    },
                    {
                        label: "Continue at current pace with additional security budget",
                        budget: -15,
                        security: 10,
                        growth: 10,
                        reputation: 0,
                    },
                    {
                        label: "Accelerate transformation — we can fix security later",
                        budget: 5,
                        security: -15,
                        growth: 20,
                        reputation: -5,
                    },
                ],
            },
            {
                title: "Vendor Risk Assessment",
                desc: "A critical vendor fails their SOC 2 audit. They handle customer payment data. Switching vendors would take 6 months.",
                options: [
                    {
                        label: "Demand remediation within 30 days or terminate the contract",
                        budget: -10,
                        security: 15,
                        growth: -5,
                        reputation: 10,
                    },
                    {
                        label: "Accept the risk and monitor closely",
                        budget: 0,
                        security: -10,
                        growth: 5,
                        reputation: -5,
                    },
                    {
                        label: "Begin vendor transition immediately",
                        budget: -20,
                        security: 10,
                        growth: -15,
                        reputation: 5,
                    },
                ],
            },
        ],
        [
            // Q2
            {
                title: "Ransomware Insurance",
                desc: "Your insurer doubles the premium for cyber coverage. Without it, a ransomware event could cost $5M. The premium is $800K annually.",
                options: [
                    {
                        label: "Pay the premium — the risk justifies the cost",
                        budget: -15,
                        security: 5,
                        growth: 0,
                        reputation: 5,
                    },
                    {
                        label: "Self-insure and invest the premium in prevention",
                        budget: -10,
                        security: 15,
                        growth: 0,
                        reputation: 0,
                    },
                    {
                        label: "Drop insurance — we have not been attacked before",
                        budget: 10,
                        security: -20,
                        growth: 5,
                        reputation: -10,
                    },
                ],
            },
            {
                title: "Talent Acquisition",
                desc: "You need to hire 3 security engineers. Market rate is 40% above your salary bands. HR says adjusting bands will affect the entire engineering team.",
                options: [
                    {
                        label: "Adjust salary bands company-wide to attract talent",
                        budget: -20,
                        security: 15,
                        growth: 5,
                        reputation: 10,
                    },
                    {
                        label: "Hire contractors at market rate while you find permanent staff",
                        budget: -10,
                        security: 10,
                        growth: 0,
                        reputation: 0,
                    },
                    {
                        label: "Promote from within and provide training",
                        budget: -5,
                        security: 5,
                        growth: 0,
                        reputation: 5,
                    },
                ],
            },
        ],
        [
            // Q3
            {
                title: "Data Breach Response",
                desc: "A breach is detected: 50,000 customer records accessed. Legal says notification is required within 72 hours. PR wants to control the narrative. The board wants to know the financial impact.",
                options: [
                    {
                        label: "Full transparency: notify immediately, offer credit monitoring, hire external forensics",
                        budget: -25,
                        security: 10,
                        growth: -5,
                        reputation: 15,
                    },
                    {
                        label: "Minimise disclosure: meet regulatory requirements only",
                        budget: -10,
                        security: 0,
                        growth: 0,
                        reputation: -10,
                    },
                    {
                        label: "Delay notification to complete internal investigation first",
                        budget: -5,
                        security: -5,
                        growth: -5,
                        reputation: -20,
                    },
                ],
            },
        ],
        [
            // Q4
            {
                title: "Year-End Security Program Review",
                desc: "The board reviews the year. Security incidents are down 40%, but security spending is up 60%. A board member asks whether you are over-investing in security at the expense of growth.",
                options: [
                    {
                        label: "Present the ROI: incidents down means avoided costs — we are investing correctly",
                        budget: 0,
                        security: 5,
                        growth: 5,
                        reputation: 10,
                    },
                    {
                        label: "Agree to moderate spending next year to balance growth",
                        budget: 10,
                        security: -10,
                        growth: 10,
                        reputation: 0,
                    },
                    {
                        label: "Propose reducing security to redirecting budget to product development",
                        budget: 15,
                        security: -20,
                        growth: 15,
                        reputation: -5,
                    },
                ],
            },
        ],
    ];

    let currentQ = $state(0);
    let currentEvent = $state(0);
    let metrics = $state({
        budget: 100,
        security: 50,
        growth: 50,
        reputation: 50,
    });
    let showFeedback = $state(false);
    let lastDelta = $state({
        budget: 0,
        security: 0,
        growth: 0,
        reputation: 0,
    });
    let decisions = $state<string[]>([]);

    function handleChoice(optIdx: number) {
        if (showFeedback) return;
        const opt = quarters[currentQ][currentEvent].options[optIdx];
        lastDelta = {
            budget: opt.budget,
            security: opt.security,
            growth: opt.growth,
            reputation: opt.reputation,
        };
        metrics = {
            budget: Math.max(0, Math.min(200, metrics.budget + opt.budget)),
            security: Math.max(
                0,
                Math.min(100, metrics.security + opt.security),
            ),
            growth: Math.max(0, Math.min(100, metrics.growth + opt.growth)),
            reputation: Math.max(
                0,
                Math.min(100, metrics.reputation + opt.reputation),
            ),
        };
        decisions = [...decisions, opt.label];
        showFeedback = true;
    }

    function handleContinue() {
        showFeedback = false;
        if (currentEvent < quarters[currentQ].length - 1) {
            currentEvent++;
        } else if (currentQ < quarters.length - 1) {
            currentQ++;
            currentEvent = 0;
        } else {
            const finalScore = Math.round(
                (metrics.security + metrics.growth + metrics.reputation) / 3,
            );
            Store.set(SLUG, {
                lastScore: finalScore,
                metrics: { ...metrics },
                gamesPlayed: (Store.get(SLUG).gamesPlayed || 0) + 1,
                highScore: Math.max(Store.get(SLUG).highScore || 0, finalScore),
            });

            let badge: string | null = null;
            if (Store.addBadge(SLUG, "board-first")) badge = "board-first";
            if (
                metrics.security >= 80 &&
                Store.addBadge(SLUG, "board-defender")
            )
                badge = "board-defender";

            onComplete({
                score: finalScore,
                total: 100,
                badgeId: badge,
                statLine: `SEC: ${metrics.security} · GROWTH: ${metrics.growth} · REP: ${metrics.reputation} · BUDGET: ${metrics.budget}`,
            });
        }
    }

    function formatDelta(v: number): string {
        return v >= 0 ? `+${v}` : `${v}`;
    }
    function deltaColor(v: number): string {
        return v > 0 ? "#18C96A" : v < 0 ? "#E05C20" : "#424870";
    }
</script>

<div class="screen-build">
    <!-- Dashboard -->
    <div class="board-dash">
        <div class="dash-metric">
            <span class="dash-label">BUDGET</span>
            <div class="dash-bar">
                <div
                    class="dash-fill"
                    style="width: {Math.min(
                        100,
                        metrics.budget / 2,
                    )}%; background: #1A8FE3;"
                ></div>
            </div>
            <span class="dash-val">{metrics.budget}</span>
        </div>
        <div class="dash-metric">
            <span class="dash-label">SECURITY</span>
            <div class="dash-bar">
                <div
                    class="dash-fill"
                    style="width: {metrics.security}%; background: #18C96A;"
                ></div>
            </div>
            <span class="dash-val">{metrics.security}</span>
        </div>
        <div class="dash-metric">
            <span class="dash-label">GROWTH</span>
            <div class="dash-bar">
                <div
                    class="dash-fill"
                    style="width: {metrics.growth}%; background: #A78FFF;"
                ></div>
            </div>
            <span class="dash-val">{metrics.growth}</span>
        </div>
        <div class="dash-metric">
            <span class="dash-label">REPUTATION</span>
            <div class="dash-bar">
                <div
                    class="dash-fill"
                    style="width: {metrics.reputation}%; background: #E0A820;"
                ></div>
            </div>
            <span class="dash-val">{metrics.reputation}</span>
        </div>
    </div>

    <span class="sq-eyebrow">Q{currentQ + 1} · EVENT {currentEvent + 1}</span>
    <h2 class="sb-question">{quarters[currentQ][currentEvent].title}</h2>
    <p class="sb-context">{quarters[currentQ][currentEvent].desc}</p>

    {#if !showFeedback}
        <div class="sb-options">
            {#each quarters[currentQ][currentEvent].options as opt, i}
                <button class="sb-option" onclick={() => handleChoice(i)}
                    >{opt.label}</button
                >
            {/each}
        </div>
    {:else}
        <div class="delta-display">
            <span class="delta" style="color: {deltaColor(lastDelta.budget)};"
                >BUDGET {formatDelta(lastDelta.budget)}</span
            >
            <span class="delta" style="color: {deltaColor(lastDelta.security)};"
                >SECURITY {formatDelta(lastDelta.security)}</span
            >
            <span class="delta" style="color: {deltaColor(lastDelta.growth)};"
                >GROWTH {formatDelta(lastDelta.growth)}</span
            >
            <span
                class="delta"
                style="color: {deltaColor(lastDelta.reputation)};"
                >REPUTATION {formatDelta(lastDelta.reputation)}</span
            >
        </div>
        <button class="sq-continue visible" onclick={handleContinue}>
            {currentEvent < quarters[currentQ].length - 1
                ? "NEXT EVENT →"
                : currentQ < quarters.length - 1
                  ? `Q${currentQ + 2} →`
                  : "YEAR-END REPORT →"}
        </button>
    {/if}
</div>

<style>
    .screen-build {
        width: 100%;
        max-width: 680px;
    }

    .board-dash {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 24px;
    }
    @media (max-width: 600px) {
        .board-dash {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .dash-metric {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .dash-label {
        font-family: "DM Mono", monospace;
        font-size: 8px;
        letter-spacing: 0.14em;
        color: #424870;
    }
    .dash-bar {
        width: 100%;
        height: 4px;
        background: #0f1220;
        border-radius: 2px;
        overflow: hidden;
    }
    .dash-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .dash-val {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        font-weight: 700;
        color: #edf0ff;
    }

    .sq-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 12px;
    }
    .sb-question {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(20px, 3vw, 28px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 12px 0;
    }
    .sb-context {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0 0 20px 0;
    }

    .sb-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .sb-option {
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
            border-color 0.2s,
            color 0.2s;
    }
    .sb-option:hover {
        border-color: #424870;
        color: #edf0ff;
    }

    .delta-display {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 16px;
        padding: 12px 0;
        border-bottom: 1px solid #0f1220;
    }
    .delta {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
    }

    .sq-continue {
        align-self: flex-end;
        padding: 10px 24px;
        border: 1px solid var(--game-accent, #e05c20);
        border-radius: 3px;
        background: transparent;
        color: var(--game-accent, #e05c20);
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        cursor: pointer;
    }
</style>
