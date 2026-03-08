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

    const SLUG = "decision-tree";
    interface TreeNode {
        text: string;
        options?: { label: string; next: number; consequence: string }[];
    }
    interface Scenario {
        id: string;
        title: string;
        context: string;
        domain: string;
        nodes: TreeNode[];
    }

    const scenarios: Scenario[] = [
        {
            id: "vuln-disclosure",
            title: "The Vulnerability You Found",
            context:
                "You discover a critical vulnerability in a widely-used open source library. It could affect millions of systems. You have not told anyone yet.",
            domain: "CYBERSECURITY · ETHICS",
            nodes: [
                {
                    text: "You have found a critical vulnerability in an open source library used by millions. What do you do first?",
                    options: [
                        {
                            label: "Report it responsibly to the maintainers via private disclosure",
                            next: 1,
                            consequence:
                                "You follow responsible disclosure — giving maintainers time to patch before the vulnerability becomes public.",
                        },
                        {
                            label: "Post it publicly on social media to warn everyone immediately",
                            next: 2,
                            consequence:
                                "Full disclosure alerts everyone, but also gives attackers immediate exploit information before a patch exists.",
                        },
                        {
                            label: "Sell the information to a vulnerability broker",
                            next: 3,
                            consequence:
                                "You monetise the finding. Some brokers sell to governments, some to defensive companies, some to anyone who pays.",
                        },
                    ],
                },
                {
                    text: "The maintainers acknowledge your report and say they need 90 days to patch. Meanwhile, you discover someone else is already exploiting it in the wild. What now?",
                    options: [
                        {
                            label: "Publish a limited advisory with mitigation steps but no exploit details",
                            next: 4,
                            consequence:
                                "A limited advisory helps defenders without giving attackers more tools. This is the balanced approach.",
                        },
                        {
                            label: "Wait the full 90 days as agreed — a promise is a promise",
                            next: 4,
                            consequence:
                                "Honour matters, but active exploitation changes the calculus. People are being harmed right now while you wait.",
                        },
                    ],
                },
                {
                    text: "The vulnerability is now public. Attackers are actively exploiting it.",
                    options: [
                        {
                            label: "Yes — people have a right to know about risks that affect them",
                            next: 4,
                            consequence:
                                "Transparency is a principle. But timing matters. The same information shared after a patch would have been safer.",
                        },
                        {
                            label: "No — I should have given maintainers time to respond",
                            next: 4,
                            consequence:
                                "Responsible disclosure exists to prevent exactly this scenario.",
                        },
                    ],
                },
                {
                    text: "You sold the vulnerability information. The buyer uses it to attack a hospital network.",
                    options: [
                        {
                            label: "I did not attack anyone — I just provided information",
                            next: 4,
                            consequence:
                                "Legally grey. Ethically, supplying the weapon used in an attack creates shared responsibility.",
                        },
                        {
                            label: "I should have considered who the buyer might be",
                            next: 4,
                            consequence:
                                "Without due diligence, you cannot control downstream use. This is the core ethical tension.",
                        },
                    ],
                },
                {
                    text: "Every decision had trade-offs. There are no perfectly right answers in vulnerability disclosure — only trade-offs between transparency, safety, and trust.",
                },
            ],
        },
        {
            id: "ai-hiring",
            title: "The AI That Makes Hiring Decisions",
            context:
                "Your company deploys an AI hiring tool. After 6 months, you notice it consistently ranks male candidates higher than equally qualified female candidates for technical roles.",
            domain: "AI · ETHICS",
            nodes: [
                {
                    text: "You discover the AI hiring tool is ranking male candidates higher for technical roles. What is your first step?",
                    options: [
                        {
                            label: "Immediately shut down the tool and revert to manual hiring",
                            next: 1,
                            consequence:
                                "You stop the harm immediately. But manual hiring has its own biases — and the company loses efficiency gains.",
                        },
                        {
                            label: "Investigate the training data to find the source of bias",
                            next: 2,
                            consequence:
                                "Understanding the root cause is essential for a real fix. But the biased system continues making decisions while you investigate.",
                        },
                        {
                            label: "Adjust the outputs to force equal gender representation",
                            next: 3,
                            consequence:
                                "Post-hoc adjustment treats symptoms but not causes. Forcing equal outcomes regardless of input quality raises its own questions.",
                        },
                    ],
                },
                {
                    text: "With the tool shut down, leadership asks when the AI will be back.",
                    options: [
                        {
                            label: "Only when we have verified the bias is eliminated and tested extensively",
                            next: 4,
                            consequence:
                                'Thoroughness protects against reintroducing bias. But "verified" is hard to define — how much testing is enough?',
                        },
                        {
                            label: "Immediately, with human oversight on every decision",
                            next: 4,
                            consequence:
                                "Human-in-the-loop reduces harm but adds cost and does not fix the underlying model.",
                        },
                    ],
                },
                {
                    text: "You find the training data was 80% male resumes from past hires — the AI learned to prefer what it saw most.",
                    options: [
                        {
                            label: "Retrain with balanced data and add fairness constraints",
                            next: 4,
                            consequence:
                                'Retraining with balanced data can reduce bias, but defining "fair" is itself a value judgment.',
                        },
                        {
                            label: "Build a separate bias detection system that flags potentially unfair rankings",
                            next: 4,
                            consequence:
                                "A detection layer adds accountability but increases complexity. It supplements — not replaces — fair training data.",
                        },
                    ],
                },
                {
                    text: "You adjusted outputs to force equal representation. A stronger candidate was ranked below a weaker one.",
                    options: [
                        {
                            label: "Fairness requires correcting for systemic disadvantage",
                            next: 4,
                            consequence:
                                "Affirmative correction addresses historical inequality but can feel unjust to individuals. The tension is unresolved.",
                        },
                        {
                            label: "Ranking should always reflect qualifications regardless of demographics",
                            next: 4,
                            consequence:
                                'Merit-based ranking sounds fair, but if the definition of "merit" was shaped by biased data, meritocracy perpetuates inequity.',
                        },
                    ],
                },
                {
                    text: "Any AI system that makes decisions about people carries embedded values. The question is not whether it has bias — it always does. The question is whether you choose to examine, measure, and correct it.",
                },
            ],
        },
    ];

    let scenarioIdx = $state(0);
    let nodeIdx = $state(0);
    let path = $state<
        { nodeIdx: number; choiceIdx: number; consequence: string }[]
    >([]);

    const scenario = $derived(scenarios[scenarioIdx]);
    const node = $derived(scenario.nodes[nodeIdx]);
    const isEnd = $derived(!node.options || node.options.length === 0);

    function makeChoice(optIdx: number) {
        const opt = node.options![optIdx];
        path = [
            ...path,
            { nodeIdx, choiceIdx: optIdx, consequence: opt.consequence },
        ];
        nodeIdx = opt.next;
    }

    function handleRestart() {
        nodeIdx = 0;
        path = [];
    }

    function handleFinish() {
        if (scenarioIdx < scenarios.length - 1) {
            scenarioIdx++;
            nodeIdx = 0;
            path = [];
        } else {
            const data = Store.get(SLUG);
            const played = data.scenariosPlayed || [];
            scenarios.forEach((s) => {
                if (!played.includes(s.id)) played.push(s.id);
            });
            Store.set(SLUG, { scenariosPlayed: played });

            let badge: string | null = null;
            if (Store.addBadge(SLUG, "decision-first"))
                badge = "decision-first";
            if (
                played.length >= scenarios.length &&
                Store.addBadge(SLUG, "decision-all")
            )
                badge = "decision-all";

            onComplete({
                score: path.length,
                total: path.length,
                badgeId: badge,
                statLine: `${path.length} DECISIONS · ${played.length} SCENARIOS`,
            });
        }
    }
</script>

<div class="screen-build">
    <span class="sq-eyebrow"
        >{scenario.domain} · {scenario.title.toUpperCase()}</span
    >

    {#if nodeIdx === 0 && path.length === 0}
        <div class="context-box">
            <span class="ctx-label">SCENARIO</span>
            <p class="ctx-text">{scenario.context}</p>
        </div>
    {/if}

    <!-- Path history -->
    {#if path.length > 0}
        <div class="path-history">
            {#each path as step}
                <div class="path-step">
                    <span class="path-choice"
                        >{scenario.nodes[step.nodeIdx].options![step.choiceIdx]
                            .label}</span
                    >
                    <p class="path-consequence">{step.consequence}</p>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Current node -->
    <div class="node-card">
        <p class="node-text">{node.text}</p>
        {#if !isEnd}
            <div class="node-options">
                {#each node.options! as opt, i}
                    <button class="sb-option" onclick={() => makeChoice(i)}
                        >{opt.label}</button
                    >
                {/each}
            </div>
        {:else}
            <div class="end-box">
                <span class="end-label">END OF PATH</span>
                <div class="end-actions">
                    <button class="si-btn" onclick={handleRestart}
                        >EXPLORE DIFFERENT PATH</button
                    >
                    <button class="si-btn primary" onclick={handleFinish}
                        >{scenarioIdx < scenarios.length - 1
                            ? "NEXT SCENARIO →"
                            : "COMPLETE →"}</button
                    >
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .screen-build {
        width: 100%;
        max-width: 680px;
    }
    .sq-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .context-box {
        background: #07090f;
        border: 1px solid #171b30;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
    }
    .ctx-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .ctx-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0;
    }

    .path-history {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 20px;
        border-left: 2px solid #0f1220;
        padding-left: 16px;
    }
    .path-step {
        padding: 6px 0;
    }
    .path-choice {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 13px;
        color: #edf0ff;
        display: block;
        margin-bottom: 2px;
    }
    .path-consequence {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 12px;
        color: #8890bb;
        line-height: 1.5;
        margin: 0;
    }

    .node-card {
        background: #07090f;
        border: 1px solid #171b30;
        padding: clamp(20px, 3vw, 28px);
        border-radius: 4px;
    }
    .node-text {
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #edf0ff;
        line-height: 1.5;
        margin: 0 0 20px 0;
    }
    .node-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .sb-option {
        padding: 14px 18px;
        border: 1px solid #171b30;
        border-radius: 4px;
        background: #03040a;
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

    .end-box {
        text-align: center;
        padding: 16px 0;
    }
    .end-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 12px;
    }
    .end-actions {
        display: flex;
        gap: 8px;
        justify-content: center;
        flex-wrap: wrap;
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
        color: var(--game-accent, #edf0ff);
        border-color: var(--game-accent, #edf0ff);
    }
</style>
