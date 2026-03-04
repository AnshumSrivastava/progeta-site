<script lang="ts">
    const STORAGE_KEY = "pt-system-check";

    interface CheckEntry {
        date: string;
        learned: string;
        applied: string;
        avoided: string;
        confused: string;
        understand: string;
    }

    function todayStr(): string {
        return new Date().toISOString().slice(0, 10);
    }

    function loadEntries(): CheckEntry[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveEntries(entries: CheckEntry[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    let entries = $state(loadEntries());
    const todayEntry = $derived(entries.find((e) => e.date === todayStr()));
    const alreadyDone = $derived(!!todayEntry);

    let learned = $state("");
    let applied = $state("");
    let avoided = $state("");
    let confused = $state("");
    let understand = $state("");
    let showHistory = $state(false);

    $effect(() => {
        if (todayEntry) {
            learned = todayEntry.learned;
            applied = todayEntry.applied;
            avoided = todayEntry.avoided;
            confused = todayEntry.confused;
            understand = todayEntry.understand;
        }
    });

    const dimensions = [
        {
            key: "learned",
            label: "LEARNED",
            prompt: "What is one thing you learned today?",
            get: () => learned,
            set: (v: string) => (learned = v),
        },
        {
            key: "applied",
            label: "APPLIED",
            prompt: "What is one thing you applied — put into practice — today?",
            get: () => applied,
            set: (v: string) => (applied = v),
        },
        {
            key: "avoided",
            label: "AVOIDED",
            prompt: "What is one thing you should have done today but avoided?",
            get: () => avoided,
            set: (v: string) => (avoided = v),
        },
        {
            key: "confused",
            label: "CONFUSED BY",
            prompt: "What is one thing that confused you or felt unclear?",
            get: () => confused,
            set: (v: string) => (confused = v),
        },
        {
            key: "understand",
            label: "WANT TO UNDERSTAND",
            prompt: "What is one thing you want to understand better?",
            get: () => understand,
            set: (v: string) => (understand = v),
        },
    ];

    function handleSave() {
        const entry: CheckEntry = {
            date: todayStr(),
            learned,
            applied,
            avoided,
            confused,
            understand,
        };
        entries = [entry, ...entries.filter((e) => e.date !== todayStr())];
        saveEntries(entries);
    }

    // Patterns: find most repeated words across dimension over last 7 days
    const patterns = $derived(() => {
        const recent = entries.slice(0, 7);
        if (recent.length < 3) return null;
        const allText = recent
            .map(
                (e) =>
                    `${e.learned} ${e.applied} ${e.avoided} ${e.confused} ${e.understand}`,
            )
            .join(" ")
            .toLowerCase();
        const words = allText.split(/\s+/).filter((w) => w.length > 4);
        const counts: Record<string, number> = {};
        words.forEach((w) => {
            counts[w] = (counts[w] || 0) + 1;
        });
        const sorted = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        return sorted.filter((s) => s[1] >= 2).map((s) => s[0]);
    });
</script>

<svelte:head>
    <title>System Check — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Daily accountability check-in across five dimensions. Surfaces patterns in your responses over time."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">DAILY CHECK-IN</span>
        <h1 class="game-title">System Check</h1>
        <p class="game-sub">
            Not what you know. What you actually do. There is a difference.
        </p>
    </header>

    <section class="check-sec">
        <span class="sec-label">TODAY — {todayStr()}</span>
        <div class="dim-list">
            {#each dimensions as dim}
                <div class="dim-block">
                    <div class="dim-header">
                        <span class="dim-label">{dim.label}</span>
                    </div>
                    <label class="dim-prompt" for={dim.key}>{dim.prompt}</label>
                    <textarea
                        id={dim.key}
                        class="dim-input"
                        rows="2"
                        placeholder="..."
                        value={dim.get()}
                        oninput={(e) =>
                            dim.set((e.target as HTMLTextAreaElement).value)}
                        disabled={alreadyDone}
                    ></textarea>
                </div>
            {/each}
        </div>

        {#if !alreadyDone}
            <button class="save-btn" onclick={handleSave}>RUN CHECK →</button>
        {:else}
            <span class="saved-notice"
                >✓ CHECK COMPLETE — Run again tomorrow.</span
            >
        {/if}
    </section>

    {#if patterns() && patterns()!.length > 0}
        <section class="patterns-sec">
            <span class="sec-label">RECURRING TOPICS (LAST 7 DAYS)</span>
            <div class="pattern-pills">
                {#each patterns()! as word}
                    <span class="pattern-pill">{word}</span>
                {/each}
            </div>
        </section>
    {/if}

    <section class="history-sec">
        <button
            class="history-toggle"
            onclick={() => (showHistory = !showHistory)}
        >
            {showHistory ? "HIDE" : "SHOW"} PAST CHECKS ({entries.length})
        </button>
        {#if showHistory}
            <div class="history-list">
                {#each entries as entry}
                    <div class="history-entry">
                        <span class="entry-date">{entry.date}</span>
                        <div class="entry-grid">
                            <div>
                                <span class="entry-dim">LEARNED</span>
                                <p>{entry.learned || "—"}</p>
                            </div>
                            <div>
                                <span class="entry-dim">APPLIED</span>
                                <p>{entry.applied || "—"}</p>
                            </div>
                            <div>
                                <span class="entry-dim">AVOIDED</span>
                                <p>{entry.avoided || "—"}</p>
                            </div>
                            <div>
                                <span class="entry-dim">CONFUSED</span>
                                <p>{entry.confused || "—"}</p>
                            </div>
                            <div>
                                <span class="entry-dim">WANT TO UNDERSTAND</span
                                >
                                <p>{entry.understand || "—"}</p>
                            </div>
                        </div>
                    </div>
                {/each}
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
        line-height: 1.5;
    }
    .sec-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }

    .dim-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .dim-block {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 16px 18px;
    }
    .dim-header {
        margin-bottom: 6px;
    }
    .dim-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #18c96a;
    }
    .dim-prompt {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #edf0ff;
        display: block;
        margin-bottom: 8px;
        line-height: 1.4;
    }
    .dim-input {
        width: 100%;
        background: #03040a;
        border: 1px solid #0f1220;
        border-radius: 3px;
        padding: 10px 12px;
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.5;
        resize: vertical;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }
    .dim-input:focus {
        border-color: #424870;
    }
    .dim-input:disabled {
        opacity: 0.7;
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
        transition: background 0.2s;
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

    .patterns-sec {
        margin-top: 40px;
    }
    .pattern-pills {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
    .pattern-pill {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.08em;
        color: #8890bb;
        border: 1px solid #424870;
        padding: 4px 10px;
        border-radius: 2px;
    }

    .history-sec {
        margin-top: 40px;
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
    }
    .history-toggle:hover {
        color: #8890bb;
    }
    .history-list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .history-entry {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 16px;
    }
    .entry-date {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-bottom: 12px;
    }
    .entry-grid {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .entry-dim {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        display: block;
        margin-bottom: 2px;
    }
    .entry-grid p {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
        margin: 0;
        line-height: 1.5;
    }
</style>
