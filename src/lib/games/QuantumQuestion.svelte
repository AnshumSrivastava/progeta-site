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

    const SLUG = "quantum-question";
    interface Scenario {
        category: string;
        question: string;
        options: string[];
        correct: number;
        explanation: string;
    }

    const scenarios: Scenario[] = [
        {
            category: "TIMELINE",
            question:
                "When will quantum computers be able to break RSA-2048 encryption?",
            options: [
                "They already can",
                "Within 2-3 years",
                "Likely 10-20+ years, if ever",
                "Never — it is mathematically impossible",
            ],
            correct: 2,
            explanation:
                "Current estimates suggest cryptographically relevant quantum computers are 10-20+ years away. Current quantum computers have too few stable qubits and too high error rates to run Shor's algorithm at the scale needed for RSA-2048.",
        },
        {
            category: "ALGORITHMS",
            question:
                "Grover's algorithm gives quantum computers what kind of advantage for searching unsorted databases?",
            options: [
                "Exponential speedup",
                "Quadratic speedup",
                "Constant-time lookup",
                "No advantage over classical",
            ],
            correct: 1,
            explanation:
                "Grover's algorithm provides a quadratic speedup — reducing search time from O(N) to O(√N). This is significant but not the exponential advantage people often assume. For AES-256, it effectively halves the key strength to AES-128 equivalent, which is still secure.",
        },
        {
            category: "CONCEPTS",
            question: 'What does "quantum supremacy" actually mean?',
            options: [
                "Quantum computers are better than classical for all tasks",
                "A quantum computer solved one specific problem faster than any classical computer could",
                "Quantum computers have replaced classical computers in data centres",
                "Quantum encryption cannot be broken by any means",
            ],
            correct: 1,
            explanation:
                "Quantum supremacy means a quantum computer performed one specific, carefully chosen calculation faster than any classical computer could. It does not mean quantum computers are generally faster — for most tasks, classical computers remain superior.",
        },
        {
            category: "TIMELINE",
            question:
                "Which of these is a real, commercially available quantum computing service today?",
            options: [
                "A 10,000-qubit universal quantum computer",
                "Cloud access to noisy 100-1000+ qubit processors",
                "A quantum laptop for personal use",
                "Quantum processors in smartphones",
            ],
            correct: 1,
            explanation:
                "Companies like IBM, Google, and IonQ offer cloud access to quantum processors with roughly 100-1000+ qubits. These are noisy and limited, suitable for research and specific algorithms, not general-purpose computing.",
        },
        {
            category: "ALGORITHMS",
            question:
                "Which cryptographic method is NOT significantly threatened by quantum computers?",
            options: [
                "RSA encryption",
                "Elliptic curve cryptography",
                "AES-256 symmetric encryption",
                "Diffie-Hellman key exchange",
            ],
            correct: 2,
            explanation:
                "AES-256 is a symmetric cipher. Grover's algorithm halves its effective strength to ~128 bits, which is still secure. RSA, ECC, and Diffie-Hellman are all based on mathematical problems (factoring, discrete logarithm) that Shor's algorithm can solve efficiently.",
        },
        {
            category: "CONCEPTS",
            question:
                "Can quantum entanglement be used to send information faster than light?",
            options: [
                "Yes — that is its primary application",
                "Yes, but only small amounts of data",
                "No — entanglement correlates measurements but cannot transmit information",
                "Only in a vacuum",
            ],
            correct: 2,
            explanation:
                "Quantum entanglement creates correlations between particles, but the no-communication theorem proves it cannot be used to transmit information faster than light. Measuring one entangled particle gives a random result — the correlation only becomes apparent when both measurements are compared classically.",
        },
    ];

    let current = $state(0);
    let selected = $state(-1);
    let answered = $state(false);
    let score = $state(0);
    let timer = $state(45);
    let timerActive = $state(true);
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    function startTimer() {
        timer = 45;
        timerActive = true;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timer > 0 && timerActive) {
                timer--;
            } else if (timer === 0 && timerActive) {
                timerActive = false;
                handleAnswer(-1);
            }
        }, 1000);
    }

    function handleAnswer(idx: number) {
        if (answered) return;
        selected = idx;
        answered = true;
        timerActive = false;
        if (timerInterval) clearInterval(timerInterval);
        if (idx === scenarios[current].correct) score++;
    }

    function handleContinue() {
        if (current < scenarios.length - 1) {
            current++;
            selected = -1;
            answered = false;
            startTimer();
        } else {
            const data = Store.get(SLUG);
            const sessions = (data.sessions || 0) + 1;
            Store.set(SLUG, {
                sessions,
                highscore: Math.max(data.highscore || 0, score),
            });

            let badge: string | null = null;
            if (Store.addBadge(SLUG, "quantum-first")) badge = "quantum-first";
            if (score >= 5 && Store.addBadge(SLUG, "quantum-50pts"))
                badge = "quantum-50pts";

            if (timerInterval) clearInterval(timerInterval);
            onComplete({
                score,
                total: scenarios.length,
                badgeId: badge,
                statLine: `SCORE: ${score}/${scenarios.length} · SESSION ${sessions}`,
            });
        }
    }

    // Start timer on mount
    $effect(() => {
        startTimer();
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    });
</script>

<div class="screen-question">
    <div class="qq-top">
        <span class="sq-eyebrow"
            >{scenarios[current].category} · QUESTION {current + 1} OF {scenarios.length}</span
        >
        <span class="qq-timer" class:urgent={timer <= 10}>{timer}s</span>
    </div>

    <h2 class="sq-question">{scenarios[current].question}</h2>

    <div class="sq-options">
        {#each scenarios[current].options as opt, i}
            <button
                class="sq-option"
                class:correct={answered && i === scenarios[current].correct}
                class:wrong={answered &&
                    i === selected &&
                    i !== scenarios[current].correct}
                disabled={answered}
                onclick={() => handleAnswer(i)}>{opt}</button
            >
        {/each}
    </div>

    {#if answered}
        <div class="sq-reveal visible">
            <p class="sq-reveal-text">
                <strong
                    >{selected === scenarios[current].correct
                        ? "✓ Correct"
                        : selected === -1
                          ? "⏱ Time's up"
                          : "✗ Incorrect"}</strong
                >
                — {scenarios[current].explanation}
            </p>
        </div>
        <button class="sq-continue visible" onclick={handleContinue}
            >{current < scenarios.length - 1
                ? "NEXT QUESTION →"
                : "SEE RESULTS →"}</button
        >
    {/if}
</div>

<style>
    .screen-question {
        width: 100%;
        max-width: 640px;
        display: flex;
        flex-direction: column;
    }
    .qq-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .sq-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
    }
    .qq-timer {
        font-family: "DM Mono", monospace;
        font-size: 16px;
        font-weight: 700;
        color: #8890bb;
        transition: color 0.3s;
    }
    .qq-timer.urgent {
        color: #e05c20;
    }
    .sq-question {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(22px, 3.5vw, 32px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 28px 0;
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
        border-color: var(--game-accent, #a78fff);
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
        border-left: 2px solid var(--game-accent, #a78fff);
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
        border: 1px solid var(--game-accent, #a78fff);
        border-radius: 3px;
        background: transparent;
        color: var(--game-accent, #a78fff);
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        cursor: pointer;
    }
    .sq-continue:hover {
        background: rgba(167, 143, 255, 0.04);
    }
</style>
