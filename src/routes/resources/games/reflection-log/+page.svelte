<script lang="ts">
    const STORAGE_KEY = "pt-reflection-log";

    interface Entry {
        date: string;
        prompts: string[];
        answers: string[];
    }

    // 90 prompts — rotating bank
    const promptBank: string[] = [
        "What did you learn today that surprised you?",
        "What is one thing you would do differently if you could redo today?",
        "What felt difficult today, and why?",
        "What felt easy today that used to feel difficult?",
        "Who did you help today, and how?",
        "What assumption did you challenge today?",
        "What question are you carrying into tomorrow?",
        "What is one thing you are grateful for right now?",
        "What did you avoid today that you know you should face?",
        "What was the most meaningful conversation you had today?",
        "What would your future self thank you for doing today?",
        "What would your future self wish you had done today?",
        "What is one belief you hold that you have never questioned?",
        "If you could teach one thing from today to someone else, what would it be?",
        "What pattern are you noticing in your recent behaviour?",
        "What are you pretending not to know?",
        "What would you do if you could not fail?",
        "What is the hardest decision you are currently avoiding?",
        "What is something you used to believe that you no longer do?",
        "What gives you energy, and what drains it?",
        "What did you read, watch, or listen to today that changed your thinking?",
        "What skill are you actively trying to build right now?",
        "How did you push yourself outside your comfort zone today?",
        "What is one thing you did today purely for yourself?",
        "What would you say to yourself one year ago?",
        "What is one relationship you want to strengthen?",
        "What is the difference between who you are and who you want to be?",
        "What is the most important thing on your mind right now?",
        "Did you make progress today on what matters most to you?",
        "What is something you need to let go of?",
        "What emotions dominated your day, and are they useful?",
        "What do you keep postponing?",
        "What is one thing you accomplished today that you are proud of?",
        "How did you respond to stress today?",
        "What is one thing you are curious about right now?",
        "If today were your last day, would you have spent it this way?",
        "What is the biggest risk you are currently taking?",
        "What did you create today?",
        "What boundaries did you set or fail to set today?",
        "What would a person you admire do differently in your position?",
        "What are you building that no one else can see yet?",
        "What truth did you speak today that was difficult?",
        "What truth did you avoid speaking today?",
        "What habit is serving you well right now?",
        "What habit is holding you back?",
        "What would you do with an extra hour today?",
        "How did you show discipline today?",
        "What is the most productive thing you did today?",
        "What is the least productive thing you did today?",
        "Where did your attention go today — was it intentional?",
        "What is one thing you can improve about your morning routine?",
        "What is one thing you can improve about your evening routine?",
        "Did you move closer to or further from your goals today?",
        "What feedback did you receive today, and how did you respond?",
        "What feedback should you have given today but did not?",
        "What do you need more of in your life right now?",
        "What do you need less of in your life right now?",
        "What is one uncomfortable truth about your current direction?",
        "What would you start today if you had unlimited resources?",
        "What is one thing you did today out of obligation rather than intention?",
        "How clear are you on what you want? More or less clear than last week?",
        "What did you consume today that made you think?",
        "What did you consume today that was purely noise?",
        "Who inspired you today, and why?",
        "What mistake did you make today, and what did it teach you?",
        "What is the connection between today and where you want to be in five years?",
        "What is something you once feared that no longer scares you?",
        "What is something that still scares you?",
        "Did you prioritise correctly today?",
        "What would you tell someone who is in the same position you were six months ago?",
        "What is your biggest strength, and did you use it today?",
        "What is your biggest blind spot?",
        "What systems are working in your life, and which ones are failing?",
        "If you could change one thing about today, what would it be?",
        "What did you give your best effort to today?",
        "What did you give less than your best effort to, and why?",
        "What is one small change you can make tomorrow that would improve your day?",
        "What is the narrative you are telling yourself about your life right now?",
        "Is that narrative helping or hurting you?",
        "What was the moment today when you felt most alive?",
        "What was the moment today when you felt most drained?",
        "Did you take care of your body today?",
        "Did you take care of your mind today?",
        'What would "enough" look like for you?',
        "Are you chasing something or running from something?",
        "What is one thing you know you should stop doing?",
        "What is one thing you know you should start doing?",
        "What is the gap between what you say matters and how you spend your time?",
        "Write three words that describe how you feel right now.",
        "What would make tomorrow a great day?",
    ];

    function todayStr(): string {
        return new Date().toISOString().slice(0, 10);
    }

    function getTodayPrompts(): string[] {
        const now = new Date();
        const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
                86400000,
        );
        const start = (dayOfYear * 3) % promptBank.length;
        return [
            promptBank[start % promptBank.length],
            promptBank[(start + 1) % promptBank.length],
            promptBank[(start + 2) % promptBank.length],
        ];
    }

    function loadEntries(): Entry[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }

    function saveEntries(entries: Entry[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    const prompts = getTodayPrompts();
    let entries = $state(loadEntries());
    let answers = $state(["", "", ""]);
    let showHistory = $state(false);

    const todayEntry = $derived(entries.find((e) => e.date === todayStr()));
    const alreadyWritten = $derived(!!todayEntry);

    $effect(() => {
        if (todayEntry) {
            answers = [...todayEntry.answers];
        }
    });

    function handleSave() {
        if (answers.every((a) => a.trim().length === 0)) return;
        const entry: Entry = {
            date: todayStr(),
            prompts,
            answers: [...answers],
        };
        entries = [entry, ...entries.filter((e) => e.date !== todayStr())];
        saveEntries(entries);
    }

    function deleteEntry(date: string) {
        entries = entries.filter((e) => e.date !== date);
        saveEntries(entries);
    }
</script>

<svelte:head>
    <title>Reflection Log — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Three questions. No wrong answers. Just honesty. A daily journaling practice stored entirely on your device."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">SELF-GROWTH</span>
        <h1 class="game-title">Reflection Log</h1>
        <p class="game-sub">Three questions. No wrong answers. Just honesty.</p>
    </header>

    <!-- Today's Prompts -->
    <section class="prompts-sec">
        <span class="sec-label">TODAY — {todayStr()}</span>
        <div class="prompt-list">
            {#each prompts as prompt, i}
                <div class="prompt-block">
                    <label class="prompt-label" for="p{i}">{prompt}</label>
                    <textarea
                        id="p{i}"
                        class="prompt-input"
                        rows="4"
                        placeholder="Write here..."
                        bind:value={answers[i]}
                        disabled={alreadyWritten}
                    ></textarea>
                </div>
            {/each}
        </div>

        {#if !alreadyWritten}
            <button class="save-btn" onclick={handleSave}
                >SAVE TODAY'S LOG →</button
            >
        {:else}
            <span class="saved-notice"
                >✓ SAVED — Come back tomorrow for new prompts.</span
            >
        {/if}
    </section>

    <!-- History -->
    <section class="history-sec">
        <button
            class="history-toggle"
            onclick={() => (showHistory = !showHistory)}
        >
            {showHistory ? "HIDE" : "SHOW"} PAST ENTRIES ({entries.length})
        </button>

        {#if showHistory}
            <div class="history-list">
                {#each entries as entry}
                    <div class="history-entry">
                        <div class="entry-header">
                            <span class="entry-date">{entry.date}</span>
                            <button
                                class="entry-delete"
                                onclick={() => deleteEntry(entry.date)}
                                >DELETE</button
                            >
                        </div>
                        {#each entry.prompts as prompt, i}
                            <div class="entry-qa">
                                <span class="entry-q">{prompt}</span>
                                <p class="entry-a">{entry.answers[i] || "—"}</p>
                            </div>
                        {/each}
                    </div>
                {/each}
                {#if entries.length === 0}
                    <p class="no-entries">
                        No entries yet. Your first one starts today.
                    </p>
                {/if}
            </div>
        {/if}
    </section>

    <footer class="privacy-footer">
        <p class="privacy-text">
            Everything stays on this device. Nothing is uploaded. Delete any
            entry at any time.
        </p>
    </footer>
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
        color: #18c96a;
        border: 1px solid #18c96a;
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
    }

    .sec-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }

    .prompt-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .prompt-label {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: #edf0ff;
        display: block;
        margin-bottom: 8px;
        line-height: 1.4;
    }
    .prompt-input {
        width: 100%;
        background: #07090f;
        border: 1px solid #0f1220;
        border-radius: 3px;
        padding: 12px 14px;
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.6;
        resize: vertical;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }
    .prompt-input:focus {
        border-color: #424870;
    }
    .prompt-input:disabled {
        opacity: 0.7;
        cursor: default;
    }

    .save-btn {
        margin-top: 20px;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #18c96a;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
        transition:
            background 0.2s,
            color 0.2s;
    }
    .save-btn:hover {
        background: rgba(24, 201, 106, 0.08);
    }
    .saved-notice {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        color: #18c96a;
        display: block;
        margin-top: 20px;
    }

    .history-sec {
        margin-top: 48px;
    }
    .history-toggle {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: color 0.2s;
    }
    .history-toggle:hover {
        color: #8890bb;
    }

    .history-list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .history-entry {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 20px;
    }
    .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .entry-date {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .entry-delete {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #e05c20;
        background: none;
        border: none;
        cursor: pointer;
        transition: opacity 0.2s;
    }
    .entry-delete:hover {
        opacity: 0.7;
    }
    .entry-qa {
        margin-bottom: 14px;
    }
    .entry-q {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #edf0ff;
        display: block;
        margin-bottom: 4px;
    }
    .entry-a {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.6;
        margin: 0;
    }
    .no-entries {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #424870;
    }

    .privacy-footer {
        margin-top: 48px;
        padding-top: 20px;
        border-top: 1px solid #0f1220;
    }
    .privacy-text {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.08em;
        color: #424870;
        margin: 0;
    }
</style>
