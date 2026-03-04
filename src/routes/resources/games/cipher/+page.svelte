<script lang="ts">
    const STORAGE_KEY = "pt-cipher";

    interface Level {
        id: number;
        name: string;
        description: string;
        cipherType: string;
        plaintext: string;
        ciphertext: string;
        hint: string;
        method: string;
    }

    interface Progress {
        levelsCompleted: number[];
    }

    const levels: Level[] = [
        {
            id: 1,
            name: "LEVEL 1 — CAESAR SHIFT",
            cipherType: "Caesar Cipher (shift of 3)",
            description:
                "Julius Caesar encrypted his military messages by shifting each letter three positions forward in the alphabet. A becomes D, B becomes E, and so on.",
            plaintext: "SECURITY IS A PROCESS NOT A PRODUCT",
            ciphertext: "VHFXULWB LV D SURFHVV QRW D SURGXFW",
            hint: "Each letter is shifted forward by 3 positions. Z wraps to C.",
            method: "To decode: shift each letter BACK by 3. V→S, H→E, F→C...",
        },
        {
            id: 2,
            name: "LEVEL 2 — REVERSE + RAIL FENCE",
            cipherType: "Reversed words",
            description:
                "A slightly more complex substitution: each word in the message has been reversed individually.",
            plaintext: "THE BEST WAY TO PREDICT THE FUTURE IS TO CREATE IT",
            ciphertext: "EHT TSEB YAW OT TCIDERP EHT ERUTUF SI OT ETAERC TI",
            hint: "Each word is written backwards independently.",
            method: "Reverse each word: EHT→THE, TSEB→BEST...",
        },
        {
            id: 3,
            name: "LEVEL 3 — ATBASH",
            cipherType: "Atbash Cipher",
            description:
                "Atbash is a Hebrew substitution cipher. A maps to Z, B maps to Y, C maps to X — the alphabet is mirrored.",
            plaintext: "KNOWLEDGE IS POWER WHEN APPLIED",
            ciphertext: "PMLDOVWTV RH KLDVI DSVM ZKKORVW",
            hint: "A=Z, B=Y, C=X, D=W ... The alphabet is mirrored.",
            method: "Mirror each letter: P→K, M→N, L→O, W→D...",
        },
        {
            id: 4,
            name: "LEVEL 4 — VIGENÈRE",
            cipherType: "Vigenère Cipher (key: PROGETA)",
            description:
                'The Vigenère cipher uses a keyword to shift each letter by a different amount. The key repeats across the message. With key "PROGETA": P=15, R=17, O=14, G=6, E=4, T=19, A=0.',
            plaintext: "LEARNING NEVER STOPS",
            ciphertext: "AVVICXZG CIRVE HIKUH",
            hint: "Key is PROGETA. First letter L shifted by P(15)=A. Second letter E shifted by R(17)=V...",
            method: "Subtract each key letter's position from the ciphertext letter's position (mod 26) to recover the plaintext.",
        },
    ];

    function loadProgress(): Progress {
        if (typeof localStorage === "undefined") return { levelsCompleted: [] };
        try {
            return JSON.parse(
                localStorage.getItem(STORAGE_KEY) || '{"levelsCompleted":[]}',
            );
        } catch {
            return { levelsCompleted: [] };
        }
    }
    function saveProgress(p: Progress) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    }

    let progress = $state(loadProgress());
    let currentLevel = $state(0);
    let userAnswer = $state("");
    let showHint = $state(false);
    let showMethod = $state(false);
    let result = $state<"correct" | "wrong" | null>(null);

    function checkAnswer() {
        const clean = userAnswer
            .trim()
            .toUpperCase()
            .replace(/[^A-Z ]/g, "");
        const target = levels[currentLevel].plaintext;
        if (clean === target) {
            result = "correct";
            if (!progress.levelsCompleted.includes(levels[currentLevel].id)) {
                progress.levelsCompleted = [
                    ...progress.levelsCompleted,
                    levels[currentLevel].id,
                ];
                saveProgress(progress);
            }
        } else {
            result = "wrong";
        }
    }

    function nextLevel() {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            userAnswer = "";
            showHint = false;
            showMethod = false;
            result = null;
        }
    }

    function goToLevel(i: number) {
        currentLevel = i;
        userAnswer = "";
        showHint = false;
        showMethod = false;
        result = null;
    }
</script>

<svelte:head>
    <title>Cipher — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Decode encrypted messages across 4 levels of increasingly complex ciphers. Learn encryption fundamentals hands-on."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">CYBERSECURITY</span>
        <h1 class="game-title">Cipher</h1>
        <p class="game-sub">Every message hides something. Learn to find it.</p>
    </header>

    <!-- Level nav -->
    <div class="level-nav">
        {#each levels as level, i}
            <button
                class="level-btn"
                class:active={currentLevel === i}
                class:completed={progress.levelsCompleted.includes(level.id)}
                onclick={() => goToLevel(i)}>{i + 1}</button
            >
        {/each}
        <span class="level-progress"
            >{progress.levelsCompleted.length}/{levels.length} COMPLETED</span
        >
    </div>

    <!-- Current level -->
    <section class="level-card">
        <span class="level-name">{levels[currentLevel].name}</span>
        <p class="level-desc">{levels[currentLevel].description}</p>

        <div class="cipher-box">
            <span class="cipher-label">ENCRYPTED MESSAGE</span>
            <p class="cipher-text">{levels[currentLevel].ciphertext}</p>
        </div>

        <div class="answer-row">
            <label class="answer-label" for="answer">YOUR DECRYPTION</label>
            <input
                id="answer"
                class="answer-input"
                type="text"
                placeholder="Type the decrypted message..."
                bind:value={userAnswer}
                autocomplete="off"
            />
            <button class="check-btn" onclick={checkAnswer}>CHECK →</button>
        </div>

        {#if result === "correct"}
            <div class="result-box correct">
                <span class="result-label">✓ DECRYPTED</span>
                <p class="result-text">
                    Plaintext: {levels[currentLevel].plaintext}
                </p>
                {#if currentLevel < levels.length - 1}
                    <button class="next-btn" onclick={nextLevel}
                        >NEXT LEVEL →</button
                    >
                {:else}
                    <p class="result-text">
                        All levels complete. You understand the foundations of
                        classical cryptography.
                    </p>
                {/if}
            </div>
        {:else if result === "wrong"}
            <div class="result-box wrong">
                <span class="result-label">✗ INCORRECT — Try again</span>
            </div>
        {/if}

        <div class="help-row">
            <button class="help-btn" onclick={() => (showHint = !showHint)}
                >{showHint ? "HIDE" : "SHOW"} HINT</button
            >
            <button class="help-btn" onclick={() => (showMethod = !showMethod)}
                >{showMethod ? "HIDE" : "SHOW"} METHOD</button
            >
        </div>

        {#if showHint}
            <div class="help-box">
                <span class="help-label">HINT</span>
                <p>{levels[currentLevel].hint}</p>
            </div>
        {/if}
        {#if showMethod}
            <div class="help-box">
                <span class="help-label">METHOD</span>
                <p>{levels[currentLevel].method}</p>
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

    .level-nav {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
    }
    .level-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-family: "DM Mono", monospace;
        font-size: 12px;
        font-weight: 700;
        border: 1px solid #0f1220;
        background: #07090f;
        color: #424870;
        cursor: pointer;
        transition: border-color 0.2s;
    }
    .level-btn.active {
        border-color: #e05c20;
        color: #edf0ff;
    }
    .level-btn.completed {
        border-color: #18c96a;
        color: #18c96a;
    }
    .level-progress {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        margin-left: auto;
    }

    .level-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(20px, 3vw, 32px);
    }
    .level-name {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e05c20;
        display: block;
        margin-bottom: 8px;
    }
    .level-desc {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.65;
        margin: 0 0 20px 0;
    }

    .cipher-box {
        background: #03040a;
        border: 1px solid #0f1220;
        padding: 16px 18px;
        margin-bottom: 20px;
    }
    .cipher-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .cipher-text {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        letter-spacing: 0.06em;
        color: #edf0ff;
        margin: 0;
        word-break: break-all;
        line-height: 1.6;
    }

    .answer-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
    }
    .answer-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .answer-input {
        width: 100%;
        background: #03040a;
        border: 1px solid #0f1220;
        border-radius: 3px;
        padding: 10px 12px;
        font-family: "DM Mono", monospace;
        font-size: 13px;
        color: #edf0ff;
        outline: none;
        box-sizing: border-box;
        letter-spacing: 0.04em;
    }
    .answer-input:focus {
        border-color: #424870;
    }
    .check-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #e05c20;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
        align-self: flex-start;
    }

    .result-box {
        margin-bottom: 16px;
        padding: 14px 16px;
        border-left: 2px solid #424870;
    }
    .result-box.correct {
        border-left-color: #18c96a;
    }
    .result-box.wrong {
        border-left-color: #e05c20;
    }
    .result-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #18c96a;
        display: block;
        margin-bottom: 4px;
    }
    .result-box.wrong .result-label {
        color: #e05c20;
    }
    .result-text {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
        margin: 4px 0 0 0;
    }
    .next-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #18c96a;
        padding: 8px 16px;
        border-radius: 2px;
        cursor: pointer;
        margin-top: 10px;
    }

    .help-row {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }
    .help-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
    .help-btn:hover {
        color: #8890bb;
    }
    .help-box {
        margin-top: 10px;
        padding: 12px 14px;
        background: #03040a;
        border: 1px solid #0f1220;
    }
    .help-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-bottom: 4px;
    }
    .help-box p {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
        margin: 0;
        line-height: 1.5;
    }
</style>
