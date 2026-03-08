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

    const SLUG = "cipher";
    interface Level {
        id: number;
        name: string;
        method: string;
        ciphertext: string;
        hint: string;
        answer: string;
        explanation: string;
    }

    const levels: Level[] = [
        {
            id: 1,
            name: "Caesar Cipher",
            method: "Each letter is shifted by a fixed number of positions in the alphabet.",
            ciphertext: "WKLV LV D WHVW PHVVDJH",
            hint: "The shift is 3. A→D, B→E, C→F. Reverse it.",
            answer: "THIS IS A TEST MESSAGE",
            explanation:
                "Caesar cipher shifts each letter by a fixed amount. Julius Caesar used a shift of 3. It is trivially breakable — there are only 25 possible shifts to try.",
        },
        {
            id: 2,
            name: "Reverse Cipher",
            method: "The message is written backwards, character by character.",
            ciphertext: "NOITPYRCNE SI REWOP",
            hint: "Read it from right to left.",
            answer: "POWER IS ENCRYPTION",
            explanation:
                'Reverse cipher is the simplest substitution — the "key" is just the direction of reading. It provides zero security but demonstrates the concept of transformation.',
        },
        {
            id: 3,
            name: "Atbash Cipher",
            method: "Each letter is replaced by its mirror in the alphabet: A↔Z, B↔Y, C↔X, etc.",
            ciphertext: "HXZOV WLVH MLG VDXIFKGRLM",
            hint: "A=Z, B=Y, C=X, D=W, E=V... Mirror the alphabet.",
            answer: "SCALE DOES NOT ENCRYPTION",
            explanation:
                "Atbash is a fixed substitution cipher with no key — the transformation is always the same. Like Caesar, it is easily broken by frequency analysis.",
        },
        {
            id: 4,
            name: "Vigenère Cipher",
            method: "A polyalphabetic cipher using a keyword. Each letter of the keyword determines a different shift.",
            ciphertext: "DPWBR AK UIHIE",
            hint: "The keyword is KEY. K=10, E=4, Y=24. Each letter of the plaintext is shifted by the corresponding keyword letter.",
            answer: "TODAY IS GREAT",
            explanation:
                "Vigenère was considered unbreakable for centuries. The key innovation is using multiple shift values. It was eventually broken by Kasiski examination and frequency analysis on repeating key patterns.",
        },
    ];

    let currentLevel = $state(0);
    let userAnswer = $state("");
    let showHint = $state(false);
    let showMethod = $state(false);
    let answered = $state(false);
    let correct = $state(false);
    let completedLevels = $state<number[]>(
        Store.get(SLUG).completedLevels || [],
    );
    let hintsUsed = $state(Store.get(SLUG).hintsUsed || 0);

    function checkAnswer() {
        const normalized = userAnswer.trim().toUpperCase().replace(/\s+/g, " ");
        correct = normalized === levels[currentLevel].answer;
        answered = true;
        if (correct && !completedLevels.includes(levels[currentLevel].id)) {
            completedLevels = [...completedLevels, levels[currentLevel].id];
        }
    }

    function handleContinue() {
        if (currentLevel < levels.length - 1 && correct) {
            currentLevel++;
            userAnswer = "";
            showHint = false;
            showMethod = false;
            answered = false;
            correct = false;
        } else {
            Store.set(SLUG, {
                completedLevels,
                hintsUsed,
                progress: {
                    level: currentLevel + 1,
                    completed: completedLevels,
                },
            });

            let badge: string | null = null;
            if (
                completedLevels.includes(1) &&
                Store.addBadge(SLUG, "cipher-level1")
            )
                badge = "cipher-level1";
            if (
                completedLevels.includes(4) &&
                Store.addBadge(SLUG, "cipher-level4")
            )
                badge = "cipher-level4";
            if (
                completedLevels.includes(1) &&
                hintsUsed === 0 &&
                Store.addBadge(SLUG, "cipher-no-hints")
            )
                badge = "cipher-no-hints";

            onComplete({
                score: completedLevels.length,
                total: levels.length,
                badgeId: badge,
                statLine: `LEVELS: ${completedLevels.length}/${levels.length} · HINTS: ${hintsUsed}`,
            });
        }
    }

    function useHint() {
        showHint = true;
        hintsUsed++;
    }
</script>

<div class="screen-input">
    <span class="sq-eyebrow"
        >LEVEL {levels[currentLevel].id} · {levels[currentLevel].name}</span
    >
    <h2 class="si-prompt">Decode the message</h2>

    <div class="cipher-block">
        <span class="cipher-label">CIPHERTEXT</span>
        <p class="cipher-text">{levels[currentLevel].ciphertext}</p>
    </div>

    <div class="cipher-tools">
        <button class="tool-btn" onclick={() => (showMethod = !showMethod)}>
            {showMethod ? "HIDE METHOD" : "SHOW METHOD"}
        </button>
        <button class="tool-btn" onclick={useHint} disabled={showHint}>
            {showHint ? "HINT SHOWN" : "USE HINT"}
        </button>
    </div>

    {#if showMethod}
        <div class="info-box">
            <span class="info-label">METHOD</span>
            <p class="info-text">{levels[currentLevel].method}</p>
        </div>
    {/if}
    {#if showHint}
        <div class="info-box hint">
            <span class="info-label">HINT</span>
            <p class="info-text">{levels[currentLevel].hint}</p>
        </div>
    {/if}

    {#if !answered}
        <input
            class="cipher-input"
            type="text"
            placeholder="Type your decoded message..."
            bind:value={userAnswer}
            onkeydown={(e) => {
                if (e.key === "Enter" && userAnswer.length > 0) checkAnswer();
            }}
        />
        <button
            class="si-btn primary"
            onclick={checkAnswer}
            disabled={userAnswer.length === 0}>CHECK →</button
        >
    {:else}
        <div class="sq-reveal visible">
            <p class="sq-reveal-text">
                <strong>{correct ? "✓ Correct!" : "✗ Incorrect"}</strong>
                {#if !correct}
                    — The answer was: {levels[currentLevel].answer}{/if}
            </p>
            <p class="sq-reveal-text" style="margin-top: 8px;">
                {levels[currentLevel].explanation}
            </p>
        </div>
        <button class="sq-continue visible" onclick={handleContinue}
            >{currentLevel < levels.length - 1 && correct
                ? "NEXT LEVEL →"
                : "SEE RESULTS →"}</button
        >
    {/if}
</div>

<style>
    .screen-input {
        width: 100%;
        max-width: 640px;
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
    .si-prompt {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(20px, 3vw, 28px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 24px 0;
    }

    .cipher-block {
        padding: 24px;
        background: #07090f;
        border: 1px solid #171b30;
        border-radius: 4px;
        margin-bottom: 16px;
        text-align: center;
    }
    .cipher-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.16em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .cipher-text {
        font-family: "DM Mono", monospace;
        font-size: clamp(16px, 2.5vw, 22px);
        color: #edf0ff;
        letter-spacing: 0.1em;
        margin: 0;
        word-break: break-all;
    }

    .cipher-tools {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
    }
    .tool-btn {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        padding: 6px 12px;
        border: 1px solid #171b30;
        border-radius: 3px;
        background: transparent;
        color: #424870;
        cursor: pointer;
    }
    .tool-btn:hover:not(:disabled) {
        border-color: #424870;
        color: #8890bb;
    }
    .tool-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }

    .info-box {
        padding: 12px 16px;
        border-left: 2px solid #424870;
        background: rgba(255, 255, 255, 0.02);
        margin-bottom: 12px;
    }
    .info-box.hint {
        border-color: #e0a820;
    }
    .info-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 4px;
    }
    .info-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        line-height: 1.6;
        margin: 0;
    }

    .cipher-input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid #171b30;
        color: #edf0ff;
        font-family: "DM Mono", monospace;
        font-size: 15px;
        padding: 10px 0;
        outline: none;
        margin-bottom: 12px;
        box-sizing: border-box;
    }
    .cipher-input:focus {
        border-bottom-color: var(--game-accent, #a78fff);
    }

    .si-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        padding: 10px 20px;
        border-radius: 3px;
        background: transparent;
        cursor: pointer;
    }
    .si-btn.primary {
        color: var(--game-accent, #a78fff);
        border: 1px solid var(--game-accent, #a78fff);
    }
    .si-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }

    .sq-reveal {
        margin-top: 16px;
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
        margin-top: 16px;
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
</style>
