<script lang="ts">
    const STORAGE_KEY = "pt-quantum-q";

    interface Scenario {
        question: string;
        context: string;
        options: string[];
        correctIndex: number;
        explanation: string;
        category: string;
    }

    interface SessionResult {
        date: string;
        score: number;
        total: number;
    }

    const scenarios: Scenario[] = [
        {
            category: "MYTH",
            question:
                "A colleague claims quantum computers can already break AES-256 encryption. Is this correct?",
            context:
                "AES-256 is a symmetric encryption algorithm used globally.",
            options: [
                "Yes — quantum computers make all encryption obsolete",
                "No — Grover's algorithm only halves effective key length, making AES-256 equivalent to AES-128, which is still secure",
                "No — but they will be able to within 1-2 years",
            ],
            correctIndex: 1,
            explanation:
                "Grover's algorithm provides a quadratic speedup for searching, reducing AES-256's security to that of AES-128 — still considered secure. Quantum computers threaten asymmetric encryption (RSA, ECC) far more directly.",
        },
        {
            category: "CAPABILITY",
            question:
                "Your organisation is evaluating whether a quantum computer could help optimise their supply chain routing. Is this a realistic use case?",
            context:
                "The supply chain involves 500+ variables with complex interdependencies.",
            options: [
                "No — quantum computers can only factor numbers",
                "Potentially yes — optimisation with many variables is a promising quantum use case",
                "Yes — quantum computers already solve these problems routinely",
            ],
            correctIndex: 1,
            explanation:
                "Combinatorial optimisation is one of the most promising near-term quantum applications. Current quantum hardware is not yet large enough for production use, but this is an active research area with genuine potential.",
        },
        {
            category: "TIMELINE",
            question:
                'A news article claims a "cryptographically relevant" quantum computer will exist within 5 years. How should you interpret this?',
            context:
                '"Cryptographically relevant" means capable of breaking RSA-2048.',
            options: [
                "Take immediate action — migrate all systems to post-quantum encryption now",
                "Plan ahead — begin assessing cryptographic inventory and migration strategy",
                "Ignore it — this has been predicted for decades and never happened",
            ],
            correctIndex: 1,
            explanation:
                'Most experts estimate 10-15+ years for a cryptographically relevant quantum computer, but the "harvest now, decrypt later" threat means planning should begin now. Immediate panic is unwarranted; ignoring it is irresponsible.',
        },
        {
            category: "PHYSICS",
            question:
                "Can quantum entanglement be used to send messages faster than light?",
            context:
                "Entanglement creates correlated states between particles.",
            options: [
                'Yes — Einstein proved this with "spooky action at a distance"',
                "No — entanglement creates correlations but cannot transmit chosen information",
                "Only if both particles are measured simultaneously",
            ],
            correctIndex: 1,
            explanation:
                'The no-communication theorem proves that entanglement cannot be used for FTL communication. Einstein called it "spooky action at a distance" but this describes correlation, not information transfer. Relativity is not violated.',
        },
        {
            category: "DEFENCE",
            question:
                "Which current encryption method is NOT significantly threatened by quantum computers?",
            context:
                "Consider the difference between symmetric and asymmetric encryption.",
            options: [
                "RSA-2048",
                "Elliptic Curve Cryptography (ECC)",
                "AES-256 (symmetric)",
            ],
            correctIndex: 2,
            explanation:
                "AES-256 is a symmetric algorithm. Grover's algorithm reduces its security to AES-128 equivalent, which remains secure. RSA and ECC, being asymmetric algorithms based on factoring and discrete logarithm problems, are directly vulnerable to Shor's algorithm.",
        },
        {
            category: "MYTH",
            question:
                'A vendor claims their product uses "quantum encryption" and is therefore unhackable. What should you think?',
            context: "Quantum Key Distribution (QKD) is a real technology.",
            options: [
                "They are probably referring to QKD, which provides information-theoretic security for key exchange but has practical limitations",
                "Their product is definitely a scam",
                "Accept the claim — quantum encryption is proven secure",
            ],
            correctIndex: 0,
            explanation:
                'QKD is real and provides provably secure key exchange. However, it requires specialised hardware, is distance-limited, and only secures the key exchange — not the data itself. "Unhackable" is always an overstatement in security.',
        },
    ];

    const TIMER_SECS = 45;

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
    let qIndex = $state(0);
    let selected = $state<number | null>(null);
    let revealed = $state(false);
    let score = $state(0);
    let sessionDone = $state(false);
    let timer = $state(TIMER_SECS);
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    function startTimer() {
        timer = TIMER_SECS;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer--;
            if (timer <= 0) {
                clearInterval(timerInterval!);
                timerInterval = null;
                if (!revealed) {
                    revealed = true;
                } // Time's up — reveal answer
            }
        }, 1000);
    }

    function handleAnswer(idx: number) {
        if (revealed) return;
        selected = idx;
        revealed = true;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        if (idx === scenarios[qIndex].correctIndex) score++;
    }

    function handleNext() {
        if (qIndex < scenarios.length - 1) {
            qIndex++;
            selected = null;
            revealed = false;
            startTimer();
        } else {
            sessionDone = true;
            const r: SessionResult = {
                date: new Date().toISOString(),
                score,
                total: scenarios.length,
            };
            results = [r, ...results];
            saveResults(results);
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }
    }

    function restart() {
        qIndex = 0;
        selected = null;
        revealed = false;
        score = 0;
        sessionDone = false;
        startTimer();
    }

    // Start timer on mount
    import { onMount } from "svelte";
    onMount(() => {
        startTimer();
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    });
</script>

<svelte:head>
    <title>Quantum Question — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Scenario-based questions correcting myths about quantum computing. Timed, scored, and tracked."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">QUANTUM</span>
        <h1 class="game-title">Quantum Question</h1>
        <p class="game-sub">
            Quantum computing does not break everything. It breaks specific
            things. Know which ones.
        </p>
    </header>

    {#if !sessionDone}
        <div class="q-progress">
            <span class="q-counter">{qIndex + 1}/{scenarios.length}</span>
            <span class="q-category">{scenarios[qIndex].category}</span>
            <span class="q-timer" class:urgent={timer <= 10}>{timer}s</span>
        </div>

        <section class="q-card">
            <p class="q-context">{scenarios[qIndex].context}</p>
            <h2 class="q-text">{scenarios[qIndex].question}</h2>

            <div class="q-options">
                {#each scenarios[qIndex].options as opt, i}
                    <button
                        class="q-opt"
                        class:selected={selected === i}
                        class:correct={revealed &&
                            i === scenarios[qIndex].correctIndex}
                        class:wrong={revealed &&
                            selected === i &&
                            i !== scenarios[qIndex].correctIndex}
                        disabled={revealed}
                        onclick={() => handleAnswer(i)}
                    >
                        <span class="opt-letter">{["A", "B", "C"][i]}</span>
                        <span class="opt-text">{opt}</span>
                    </button>
                {/each}
            </div>

            {#if revealed}
                <div class="q-explain">
                    <span class="explain-label"
                        >{selected === scenarios[qIndex].correctIndex
                            ? "✓ CORRECT"
                            : selected === null
                              ? "⏱ TIME UP"
                              : "✗ INCORRECT"}</span
                    >
                    <p class="explain-text">{scenarios[qIndex].explanation}</p>
                </div>
                <button class="next-btn" onclick={handleNext}
                    >{qIndex < scenarios.length - 1
                        ? "NEXT →"
                        : "SEE RESULTS →"}</button
                >
            {/if}
        </section>
    {:else}
        <section class="results-sec">
            <h2 class="results-score">{score}/{scenarios.length}</h2>
            <p class="results-sub">scenarios assessed correctly.</p>
            <button class="next-btn" onclick={restart}>PLAY AGAIN →</button>
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
        margin-bottom: 24px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #a78fff;
        border: 1px solid #a78fff;
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

    .q-progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid #0f1220;
    }
    .q-counter,
    .q-category {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .q-timer {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        font-weight: 700;
        color: #edf0ff;
    }
    .q-timer.urgent {
        color: #e05c20;
    }

    .q-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(20px, 3vw, 32px);
    }
    .q-context {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        margin: 0 0 12px 0;
    }
    .q-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #edf0ff;
        line-height: 1.5;
        margin: 0 0 20px 0;
    }

    .q-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .q-opt {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        background: #03040a;
        border: 1px solid #0f1220;
        padding: 12px 14px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s;
    }
    .q-opt:not(:disabled):hover {
        border-color: #424870;
    }
    .q-opt:disabled {
        cursor: default;
    }
    .q-opt.correct {
        border-color: #18c96a;
        background: rgba(24, 201, 106, 0.05);
    }
    .q-opt.wrong {
        border-color: #e05c20;
        background: rgba(224, 92, 32, 0.05);
    }
    .q-opt.selected {
        border-color: #a78fff;
    }
    .opt-letter {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        font-weight: 700;
        color: #424870;
        min-width: 14px;
        margin-top: 1px;
    }
    .opt-text {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.5;
    }

    .q-explain {
        margin-top: 16px;
        padding: 14px 16px;
        border-left: 2px solid #a78fff;
        background: #07090f;
    }
    .explain-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #a78fff;
        display: block;
        margin-bottom: 4px;
    }
    .explain-text {
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
        border: 1px solid #a78fff;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .next-btn:hover {
        background: rgba(167, 143, 255, 0.08);
    }

    .results-sec {
        text-align: center;
        padding: 60px 0;
    }
    .results-score {
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
</style>
