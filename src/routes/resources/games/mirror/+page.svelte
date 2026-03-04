<script lang="ts">
    const STORAGE_KEY = "pt-mirror";

    interface Pair {
        textA: string;
        textB: string;
        aiIs: "A" | "B";
        topic: string;
    }

    interface SessionResult {
        date: string;
        score: number;
        total: number;
    }

    const pairSets: Pair[][] = [
        [
            {
                topic: "What makes a great leader",
                textA: "Great leaders are not defined by how many people follow them, but by how many people they genuinely serve. Leadership is the willingness to be wrong publicly, to change course when evidence demands it, and to let your team take credit for victories while you absorb the weight of failures.",
                textB: "Great leaders are fundamentally defined by their ability to inspire and empower those around them. True leadership encompasses the courage to embrace vulnerability, the wisdom to adapt strategies based on evolving circumstances, and the selflessness to attribute successes to the collective while shouldering responsibility during setbacks.",
                aiIs: "B",
            },
            {
                topic: "Why people procrastinate",
                textA: "Procrastination is not laziness. It is an emotional regulation problem. People delay tasks not because they cannot do them, but because the task triggers an uncomfortable emotion — anxiety, boredom, self-doubt — and avoidance provides temporary relief. Understanding this reframes the problem entirely: the solution is not discipline but emotional management.",
                textB: "Procrastination often stems from a fear of failure or perfectionism. When individuals face tasks that seem overwhelming or unclear, they may unconsciously avoid starting to protect themselves from potential disappointment. The key to overcoming procrastination lies in breaking tasks into smaller, manageable steps and creating accountability structures.",
                aiIs: "B",
            },
            {
                topic: "The value of reading",
                textA: "Reading serves as a transformative cognitive exercise that strengthens neural pathways and enhances both analytical and empathetic capacities. Through engaging with diverse texts, readers develop a more nuanced understanding of human experiences, cultural perspectives, and complex systemic interactions that shape our world.",
                textB: "I learned more from reading than from any degree. Not because books contain answers — most don't — but because they force you to sit with someone else's thinking for hours at a time. That patience, that willingness to follow another mind without interrupting, is the real skill reading builds.",
                aiIs: "A",
            },
            {
                topic: "Remote work challenges",
                textA: "Remote work has fundamentally altered the landscape of professional collaboration, presenting both unprecedented opportunities and significant challenges. The absence of physical proximity impacts spontaneous knowledge sharing, creates potential feelings of isolation, and requires intentional effort to maintain organizational culture and team cohesion across distributed environments.",
                textB: "The hard part of remote work is not productivity — most people work fine from home. The hard part is that nobody interrupts you anymore. And those interruptions, annoying as they were, carried information. You learned who was struggling, who had an idea, who was about to quit. Remote work made us efficient but less aware.",
                aiIs: "A",
            },
            {
                topic: "Why simplicity is hard",
                textA: "Simplicity requires more effort than complexity because subtraction demands understanding. Anyone can add features, details, or caveats. Removing them without losing meaning requires you to know exactly what is essential and what is decoration. That knowledge only comes from deep familiarity with the problem.",
                textB: "Achieving simplicity represents one of the most challenging intellectual endeavors. It demands a profound understanding of underlying principles and the courage to eliminate superfluous elements. The pursuit of simplicity requires continuous refinement, critical evaluation, and an unwavering commitment to distilling concepts to their most essential and impactful form.",
                aiIs: "B",
            },
        ],
        [
            {
                topic: "The purpose of education",
                textA: "Education fundamentally serves to cultivate critical thinking skills, foster intellectual curiosity, and prepare individuals for meaningful participation in society. A well-designed educational framework balances the transmission of established knowledge with the development of analytical capabilities and creative problem-solving methodologies.",
                textB: "The purpose of education is not to produce people who know things. It is to produce people who can figure things out. Knowledge expires. The ability to learn, unlearn, and relearn does not. Every system that optimises for memorisation over understanding is training for a world that no longer exists.",
                aiIs: "A",
            },
            {
                topic: "What makes writing good",
                textA: "Good writing is clear thinking made visible. Every unnecessary word is a decision not to edit. Every jargon-filled sentence is a decision not to understand your own ideas well enough to explain them simply. The best writing feels effortless because the effort went into thinking, not into impressing.",
                textB: "Effective writing is characterized by its ability to communicate ideas with clarity, precision, and engagement. Strong writing demonstrates a command of language conventions while maintaining authenticity and purpose. It requires careful attention to structure, audience awareness, and the deliberate selection of language that resonates with readers.",
                aiIs: "B",
            },
            {
                topic: "Sleep and performance",
                textA: "I stopped bragging about sleeping four hours a night when I realised I was making worse decisions, snapping at people I cared about, and confusing activity for progress. Sleep is not lost time. It is when your brain decides what to keep and what to throw away. Starve it, and it keeps the wrong things.",
                textB: "The relationship between sleep quality and cognitive performance is well-established in neuroscience research. Adequate sleep facilitates memory consolidation, emotional regulation, and executive function. Sleep deprivation impairs decision-making capabilities, reduces creative problem-solving abilities, and compromises the brain's capacity for effective information processing.",
                aiIs: "B",
            },
            {
                topic: "Technology and attention",
                textA: "Contemporary digital technologies present an unprecedented challenge to human attention systems. The constant availability of stimulating content, combined with algorithmically optimized engagement mechanisms, creates an environment where sustained focus becomes increasingly difficult to maintain across extended periods of concentrated effort.",
                textB: "Every notification is a tiny negotiation. Your phone is not asking for your attention — it is taking it and hoping you do not notice the cost. The cost is not time. It is depth. You can get the time back. You cannot get back the thought you were about to have when the buzz interrupted it.",
                aiIs: "A",
            },
            {
                topic: "Trust in teams",
                textA: 'Trust in teams is not built by agreeing with each other. It is built by disagreeing safely. When someone can say "I think this is wrong" without fear of punishment, the team gets access to information it otherwise would not have. Psychological safety is not about comfort — it is about access to truth.',
                textB: "Building trust within teams requires consistent demonstration of reliability, transparency, and mutual respect. Effective team trust develops through shared experiences, open communication channels, and a collective commitment to common goals. Leaders play a crucial role in establishing trust by modeling vulnerability and creating environments where diverse perspectives are valued.",
                aiIs: "B",
            },
        ],
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
    let currentSetIndex = $state(0);
    let pairIndex = $state(0);
    let userChoices = $state<("A" | "B" | null)[]>(new Array(5).fill(null));
    let reasons = $state<string[]>(new Array(5).fill(""));
    let showResult = $state(false);
    let sessionScore = $state(0);
    let sessionDone = $state(false);

    // Pick a set based on how many sessions done
    $effect(() => {
        currentSetIndex = results.length % pairSets.length;
    });

    const currentPairs = $derived(pairSets[currentSetIndex]);

    function handleChoice(choice: "A" | "B") {
        if (showResult) return;
        userChoices[pairIndex] = choice;
        userChoices = [...userChoices];
    }

    function handleReveal() {
        showResult = true;
    }

    function handleNext() {
        if (pairIndex < 4) {
            pairIndex++;
            showResult = false;
        } else {
            // Session done
            sessionScore = currentPairs.reduce(
                (acc, p, i) => acc + (userChoices[i] === p.aiIs ? 1 : 0),
                0,
            );
            sessionDone = true;
            const result: SessionResult = {
                date: new Date().toISOString(),
                score: sessionScore,
                total: 5,
            };
            results = [result, ...results];
            saveResults(results);
        }
    }

    function startNewSession() {
        pairIndex = 0;
        userChoices = new Array(5).fill(null);
        reasons = new Array(5).fill("");
        showResult = false;
        sessionDone = false;
        currentSetIndex = results.length % pairSets.length;
    }
</script>

<svelte:head>
    <title>Mirror — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Two texts. One human, one AI. Can you tell which is which? Build your understanding of how you detect AI-generated content."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">AI · AWARENESS</span>
        <h1 class="game-title">Mirror</h1>
        <p class="game-sub">
            The AI is generating. So are you. Only one of you knows what it
            means.
        </p>
    </header>

    <section class="stats-row">
        <div class="stat-box">
            <span class="stat-num">{results.length}</span><span class="stat-lbl"
                >SESSIONS</span
            >
        </div>
        <div class="stat-box">
            <span class="stat-num"
                >{results.reduce((a, r) => a + r.score, 0)}/{results.reduce(
                    (a, r) => a + r.total,
                    0,
                )}</span
            ><span class="stat-lbl">LIFETIME CORRECT</span>
        </div>
    </section>

    {#if !sessionDone}
        <div class="progress-row">
            {#each Array(5) as _, i}
                <div
                    class="progress-dot"
                    class:active={i === pairIndex}
                    class:done={i < pairIndex}
                ></div>
            {/each}
        </div>

        <section class="pair-sec">
            <span class="pair-topic"
                >TOPIC: {currentPairs[pairIndex].topic.toUpperCase()}</span
            >
            <p class="pair-instruction">
                One of these was written by a human. The other was generated by
                AI. Which is the AI?
            </p>

            <div class="text-columns">
                <div class="text-col">
                    <button
                        class="text-card"
                        class:selected={userChoices[pairIndex] === "A"}
                        class:correct={showResult &&
                            currentPairs[pairIndex].aiIs === "A"}
                        class:wrong={showResult &&
                            userChoices[pairIndex] === "A" &&
                            currentPairs[pairIndex].aiIs !== "A"}
                        onclick={() => handleChoice("A")}
                        disabled={showResult}
                    >
                        <span class="text-label">TEXT A</span>
                        <p class="text-body">{currentPairs[pairIndex].textA}</p>
                    </button>
                </div>
                <div class="text-col">
                    <button
                        class="text-card"
                        class:selected={userChoices[pairIndex] === "B"}
                        class:correct={showResult &&
                            currentPairs[pairIndex].aiIs === "B"}
                        class:wrong={showResult &&
                            userChoices[pairIndex] === "B" &&
                            currentPairs[pairIndex].aiIs !== "B"}
                        onclick={() => handleChoice("B")}
                        disabled={showResult}
                    >
                        <span class="text-label">TEXT B</span>
                        <p class="text-body">{currentPairs[pairIndex].textB}</p>
                    </button>
                </div>
            </div>

            <div class="reason-row">
                <label class="reason-label" for="reason"
                    >Why do you think so? (optional)</label
                >
                <input
                    id="reason"
                    class="reason-input"
                    type="text"
                    placeholder="What gave it away..."
                    bind:value={reasons[pairIndex]}
                    disabled={showResult}
                />
            </div>

            {#if !showResult}
                <button
                    class="action-btn"
                    disabled={userChoices[pairIndex] === null}
                    onclick={handleReveal}>REVEAL →</button
                >
            {:else}
                <div
                    class="reveal-box"
                    class:is-correct={userChoices[pairIndex] ===
                        currentPairs[pairIndex].aiIs}
                >
                    <span class="reveal-label"
                        >{userChoices[pairIndex] ===
                        currentPairs[pairIndex].aiIs
                            ? "✓ CORRECT"
                            : "✗ INCORRECT"}</span
                    >
                    <p class="reveal-text">
                        Text {currentPairs[pairIndex].aiIs} was AI-generated.
                    </p>
                </div>
                <button class="action-btn" onclick={handleNext}
                    >{pairIndex < 4 ? "NEXT PAIR →" : "SEE RESULTS →"}</button
                >
            {/if}
        </section>
    {:else}
        <section class="results-sec">
            <h2 class="results-heading">{sessionScore}/5</h2>
            <p class="results-sub">pairs identified correctly this session.</p>
            <button class="action-btn" onclick={startNewSession}
                >NEW SESSION →</button
            >
        </section>
    {/if}
</div>

<style>
    .game-shell {
        max-width: 800px;
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
        color: #1a8fe3;
        border: 1px solid #1a8fe3;
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

    .stats-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: #0f1220;
        margin-bottom: 24px;
    }
    .stat-box {
        background: #03040a;
        padding: 14px;
        text-align: center;
    }
    .stat-num {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 20px;
        color: #edf0ff;
        display: block;
    }
    .stat-lbl {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-top: 4px;
    }

    .progress-row {
        display: flex;
        gap: 6px;
        margin-bottom: 24px;
    }
    .progress-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #0f1220;
    }
    .progress-dot.active {
        border-color: #1a8fe3;
        background: #1a8fe3;
    }
    .progress-dot.done {
        border-color: #18c96a;
        background: #18c96a;
    }

    .pair-topic {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 6px;
    }
    .pair-instruction {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        margin: 0 0 20px 0;
    }

    .text-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 16px;
    }
    .text-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 18px;
        cursor: pointer;
        text-align: left;
        transition:
            border-color 0.2s,
            background 0.2s;
        display: block;
        width: 100%;
    }
    .text-card:not(:disabled):hover {
        border-color: #424870;
    }
    .text-card:disabled {
        cursor: default;
    }
    .text-card.selected {
        border-color: #1a8fe3;
        background: rgba(26, 143, 227, 0.04);
    }
    .text-card.correct {
        border-color: #18c96a;
        background: rgba(24, 201, 106, 0.04);
    }
    .text-card.wrong {
        border-color: #e05c20;
        background: rgba(224, 92, 32, 0.04);
    }
    .text-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 10px;
    }
    .text-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.65;
        color: #8890bb;
        margin: 0;
    }

    .reason-row {
        margin-bottom: 16px;
    }
    .reason-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-bottom: 6px;
    }
    .reason-input {
        width: 100%;
        background: #07090f;
        border: 1px solid #0f1220;
        border-radius: 3px;
        padding: 8px 12px;
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
        outline: none;
        box-sizing: border-box;
    }
    .reason-input:focus {
        border-color: #424870;
    }

    .action-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #1a8fe3;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .action-btn:hover {
        background: rgba(26, 143, 227, 0.08);
    }
    .action-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }

    .reveal-box {
        padding: 14px 18px;
        border-left: 2px solid #424870;
        background: #07090f;
        margin-bottom: 16px;
    }
    .reveal-box.is-correct {
        border-left-color: #18c96a;
    }
    .reveal-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #e05c20;
        display: block;
        margin-bottom: 4px;
    }
    .reveal-box.is-correct .reveal-label {
        color: #18c96a;
    }
    .reveal-text {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
        margin: 0;
    }

    .results-sec {
        text-align: center;
        padding: 60px 0;
    }
    .results-heading {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 48px;
        color: #edf0ff;
        margin: 0 0 8px 0;
    }
    .results-sub {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #424870;
        margin: 0 0 24px 0;
    }

    @media (max-width: 640px) {
        .text-columns {
            grid-template-columns: 1fr;
        }
    }
</style>
