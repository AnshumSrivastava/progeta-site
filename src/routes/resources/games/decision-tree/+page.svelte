<script lang="ts">
    interface TreeNode {
        text: string;
        options?: { label: string; next: number; consequence: string }[];
    }

    interface Scenario {
        title: string;
        context: string;
        domain: string;
        nodes: TreeNode[];
    }

    const scenarios: Scenario[] = [
        {
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
                            next: 5,
                            consequence:
                                "Honour matters, but active exploitation changes the calculus. People are being harmed right now while you wait.",
                        },
                    ],
                },
                {
                    text: "The vulnerability is now public. Attackers are actively exploiting it. Was full disclosure the right call?",
                    options: [
                        {
                            label: "Yes — people have a right to know about risks that affect them",
                            next: 6,
                            consequence:
                                "Transparency is a principle. But timing matters. The same information shared after a patch would have been safer.",
                        },
                        {
                            label: "No — I should have given maintainers time to respond",
                            next: 6,
                            consequence:
                                "Responsible disclosure exists to prevent exactly this scenario. Principle without pragmatism can cause harm.",
                        },
                    ],
                },
                {
                    text: "You sold the vulnerability information. The buyer uses it to attack a hospital network. How do you feel about your decision?",
                    options: [
                        {
                            label: "I did not attack anyone — I just provided information",
                            next: 6,
                            consequence:
                                "Legally you may be in a grey area. Ethically, supplying the weapon used in an attack creates shared responsibility.",
                        },
                        {
                            label: "I should have considered who the buyer might be",
                            next: 6,
                            consequence:
                                "The vulnerability market is murky. Without due diligence, you cannot control downstream use. This is the core ethical tension.",
                        },
                    ],
                },
                {
                    text: "Your limited advisory helped defenders mitigate while the patch was developed. The maintainers thank you. End result: minimal damage.",
                    options: [
                        {
                            label: "Reflect on the decision",
                            next: 6,
                            consequence:
                                "Balanced disclosure — sharing enough to protect without sharing enough to exploit — is the hardest but often the best path.",
                        },
                    ],
                },
                {
                    text: "You waited 90 days. The exploitation caused significant damage during that time. The patch eventually shipped. Was the agreement worth the cost?",
                    options: [
                        {
                            label: "Reflect on the decision",
                            next: 6,
                            consequence:
                                "Rigid adherence to timelines when circumstances change is not honour — it is inflexibility. The goal of disclosure is to reduce harm, not to follow rules.",
                        },
                    ],
                },
                {
                    text: "Every decision had trade-offs. There are no perfectly right answers in vulnerability disclosure — only trade-offs between transparency, safety, and trust.",
                },
            ],
        },
        {
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
                                "You stop the harm immediately. But manual hiring has its own biases — and the company loses the efficiency gains.",
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
                                "Post-hoc adjustment treats symptoms but not causes. And forcing equal outcomes regardless of input quality raises its own ethical questions.",
                        },
                    ],
                },
                {
                    text: "With the tool shut down, hiring managers are overwhelmed. Leadership asks when the AI will be back. What do you recommend?",
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
                    text: "You find the training data was 80% male resumes from past hires — the AI learned to prefer what it saw most. How do you fix it?",
                    options: [
                        {
                            label: "Retrain with balanced data and add fairness constraints",
                            next: 4,
                            consequence:
                                'Retraining with deliberately balanced data can reduce bias, but defining "fair" is itself a value judgment.',
                        },
                        {
                            label: "Build a separate bias detection system that flags potentially unfair rankings",
                            next: 4,
                            consequence:
                                "A detection layer adds accountability but increases complexity. It is a good supplement to — not a replacement for — fair training data.",
                        },
                    ],
                },
                {
                    text: "You adjusted outputs to force equal representation. A male candidate with stronger qualifications was ranked below a female candidate. Is this fair?",
                    options: [
                        {
                            label: "Fairness requires correcting for systemic disadvantage",
                            next: 4,
                            consequence:
                                "Affirmative correction addresses historical inequality but can feel unjust to individuals. The tension between group fairness and individual fairness is unresolved in AI ethics.",
                        },
                        {
                            label: "Ranking should always reflect qualifications, regardless of demographics",
                            next: 4,
                            consequence:
                                'Merit-based ranking sounds fair, but if the definition of "merit" was shaped by biased historical data, then meritocracy perpetuates existing inequity.',
                        },
                    ],
                },
                {
                    text: "Any AI system that makes decisions about people carries embedded values. The question is not whether it has bias — it always does. The question is whether you choose to examine, measure, and correct it.",
                },
            ],
        },
    ];

    let scenarioIndex = $state(0);
    let nodeIndex = $state(0);
    let path = $state<
        { nodeIdx: number; choiceIdx: number; consequence: string }[]
    >([]);

    const scenario = $derived(scenarios[scenarioIndex]);
    const currentNode = $derived(scenario.nodes[nodeIndex]);
    const isEnd = $derived(
        !currentNode.options || currentNode.options.length === 0,
    );

    function makeChoice(optionIdx: number) {
        const opt = currentNode.options![optionIdx];
        path = [
            ...path,
            {
                nodeIdx: nodeIndex,
                choiceIdx: optionIdx,
                consequence: opt.consequence,
            },
        ];
        nodeIndex = opt.next;
    }

    function restart() {
        nodeIndex = 0;
        path = [];
    }
    function switchScenario(idx: number) {
        scenarioIndex = idx;
        nodeIndex = 0;
        path = [];
    }
</script>

<svelte:head>
    <title>Decision Tree — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Branching ethical scenarios in cybersecurity and AI. No right answers — only trade-offs."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>
    <header class="game-header">
        <span class="domain-badge">ETHICS</span>
        <h1 class="game-title">Decision Tree</h1>
        <p class="game-sub">
            Every decision closes some doors and opens others. There are no
            resets.
        </p>
    </header>

    <div class="scenario-nav">
        {#each scenarios as s, i}
            <button
                class="scenario-btn"
                class:active={scenarioIndex === i}
                onclick={() => switchScenario(i)}>{s.title}</button
            >
        {/each}
    </div>

    <section class="context-box">
        <span class="ctx-label">{scenario.domain}</span>
        <p class="ctx-text">{scenario.context}</p>
    </section>

    <!-- Decision path -->
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
    <section class="node-card">
        <p class="node-text">{currentNode.text}</p>
        {#if !isEnd}
            <div class="node-options">
                {#each currentNode.options! as opt, i}
                    <button class="node-opt" onclick={() => makeChoice(i)}
                        >{opt.label}</button
                    >
                {/each}
            </div>
        {:else}
            <div class="end-box">
                <span class="end-label">END OF PATH</span>
                <button class="retry-btn" onclick={restart}
                    >EXPLORE A DIFFERENT PATH →</button
                >
            </div>
        {/if}
    </section>
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
        margin-bottom: 24px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #edf0ff;
        border: 1px solid rgba(237, 240, 255, 0.2);
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

    .scenario-nav {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    .scenario-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 8px 14px;
        border-radius: 2px;
        cursor: pointer;
    }
    .scenario-btn.active {
        border-color: #edf0ff;
        color: #edf0ff;
    }

    .context-box {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 16px 20px;
        margin-bottom: 24px;
    }
    .ctx-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .ctx-text {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.65;
        margin: 0;
    }

    .path-history {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
        border-left: 2px solid #0f1220;
        padding-left: 16px;
    }
    .path-step {
        padding: 8px 0;
    }
    .path-choice {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: #edf0ff;
        display: block;
        margin-bottom: 4px;
    }
    .path-consequence {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        line-height: 1.5;
        margin: 0;
    }

    .node-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(20px, 3vw, 32px);
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
    .node-opt {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        background: #03040a;
        border: 1px solid #0f1220;
        padding: 12px 16px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition:
            border-color 0.2s,
            color 0.2s;
    }
    .node-opt:hover {
        border-color: #424870;
        color: #edf0ff;
    }

    .end-box {
        text-align: center;
        padding: 20px 0;
    }
    .end-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 12px;
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
</style>
