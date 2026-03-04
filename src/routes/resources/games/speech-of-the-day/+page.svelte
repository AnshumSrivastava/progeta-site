<script lang="ts">
    const STORAGE_KEY = "pt-speech-of-day";

    interface Script {
        domain: "CYBERSECURITY" | "AI" | "QUANTUM";
        title: string;
        body: string;
        wordCount: number;
    }

    interface DayRecord {
        date: string;
        scriptTitle: string;
        completed: boolean;
    }

    const scripts: Script[] = [
        {
            domain: "CYBERSECURITY",
            title: "What is a Zero-Day, and Why Should You Care?",
            body: 'A zero-day is a vulnerability that exists in software before the developer knows about it. The name comes from the fact that the developer has had zero days to create a fix. When attackers find these first, they can exploit them with no defence available. The window between discovery and patch is when damage happens. Every system running that software is exposed. This is why security teams monitor vulnerability disclosures obsessively, why emergency patches exist, and why "patch Tuesday" is a real event in organisational life. Zero-days are rare compared to known vulnerabilities, but they are disproportionately dangerous. The defence is layered security, rapid patching, and the assumption that your software is never perfectly safe.',
            wordCount: 120,
        },
        {
            domain: "AI",
            title: "Why AI Hallucinates",
            body: "When a large language model generates text that sounds confident but is factually wrong, we call it a hallucination. The model is not lying. It has no concept of truth. It generates the most probable next words based on patterns learned during training. If those patterns produce a plausible-sounding false statement, the model cannot distinguish it from a true one. There is no internal fact-checker. The training process optimises for coherent, convincing language — not for accuracy. This is why verification is essential when using AI-generated content. The output can be eloquent, structured, and completely wrong. Understanding this distinction — between fluency and truth — is the single most important thing to know about working with language models.",
            wordCount: 122,
        },
        {
            domain: "QUANTUM",
            title: "What a Qubit Actually Is",
            body: "A classical computer bit is either zero or one. A quantum bit, or qubit, can be both simultaneously — a state called superposition. When you measure a qubit, it collapses to one state. But before measurement, it exists in a probability distribution of both. This is not a metaphor. It is a physical property of quantum systems. Entanglement adds another layer: two qubits can be correlated such that measuring one instantly determines the other, regardless of distance. These two properties — superposition and entanglement — are what give quantum computers their potential advantage for specific problems. Not all problems. Specific ones. Factoring large numbers. Simulating molecules. Optimising complex systems. For everyday computing, classical machines remain superior.",
            wordCount: 126,
        },
        {
            domain: "CYBERSECURITY",
            title: "The Real Reason Phishing Works",
            body: "Phishing is not a technical attack. It is a psychological one. It works because it exploits trust, urgency, and authority — three things humans are wired to respond to. A message from your bank saying your account will be locked in twenty-four hours triggers urgency. The bank logo triggers trust. The formal language triggers authority. Combine all three and most people click before thinking. Spear phishing goes further: the attacker researches you personally. They reference your company, your role, your recent projects. The message feels real because parts of it are real. The defence is not technology alone. It is training people to pause, verify the sender, and never act on urgency without confirmation through a second channel.",
            wordCount: 124,
        },
        {
            domain: "AI",
            title: "What Transfer Learning Changed",
            body: "Before transfer learning, every machine learning project started from zero. You needed massive labelled datasets and enormous compute to train a model for each specific task. Transfer learning changed this. The idea is simple: train a large model on a general task — reading text, recognising images — and then fine-tune it for a specific purpose with much smaller datasets. A model that learned the structure of language by reading the entire internet can be adapted to classify medical records, moderate content, or answer customer questions. The general knowledge transfers. This is why AI capabilities accelerated so rapidly after models like BERT and GPT appeared. The general-purpose foundation made specific applications dramatically cheaper and faster to build.",
            wordCount: 123,
        },
        {
            domain: "QUANTUM",
            title: "Why Quantum Computers Are Not Faster Classical Computers",
            body: "Quantum computers are not faster versions of your laptop. They are fundamentally different machines that solve fundamentally different problems. A classical computer processes bits sequentially and in parallel. A quantum computer exploits superposition and entanglement to explore solution spaces in ways classical machines cannot. But this advantage only exists for certain problem types: integer factoring, unstructured search, quantum simulation. For browsing the web, writing a document, or running a database, a quantum computer offers no advantage. It would actually be worse — quantum states are fragile, error-prone, and expensive to maintain. The power of quantum computing is narrow but deep. Understanding what it can and cannot do is more important than understanding how it works.",
            wordCount: 127,
        },
        {
            domain: "CYBERSECURITY",
            title: "Why Multi-Factor Authentication Exists",
            body: "Passwords fail because humans are predictable. We reuse them. We make them short. We base them on birthdays, pets, and patterns. An attacker with a leaked database can crack most human-chosen passwords in minutes. Multi-factor authentication exists because it adds a layer the attacker cannot easily obtain. Something you have — a phone, a hardware key — must be presented alongside something you know. Even if your password is compromised, the second factor blocks access. Hardware security keys are the strongest option because they cannot be phished remotely. Authenticator apps are next. SMS codes are weakest because SIM swapping attacks can intercept them. The principle is simple: one factor is never enough. Make the attacker need two things they cannot both steal.",
            wordCount: 130,
        },
        {
            domain: "AI",
            title: "What an AI Agent Is",
            body: "A chatbot responds to what you say. An AI agent decides what to do next. The difference is autonomy. An agent receives a goal, decomposes it into steps, uses tools — web browsers, code interpreters, file systems, APIs — executes those steps, evaluates the results, and adjusts its approach. It does not wait for your next instruction. It plans. This shift from reactive to proactive AI is significant because it means AI systems can now handle multi-step tasks with branching logic and uncertainty. They can research, write, test, and revise. They can encounter errors and recover. The limitation is reliability: agents sometimes take wrong turns. But the direction is clear — AI is moving from answering questions to completing missions.",
            wordCount: 128,
        },
        {
            domain: "QUANTUM",
            title: "The Harvest Now, Decrypt Later Threat",
            body: "Imagine an adversary recording every encrypted communication you send today. They cannot read it — yet. But they store it. They wait. When a sufficiently powerful quantum computer exists, they will decrypt everything they have collected. This is the harvest now, decrypt later threat, and it is not theoretical. Intelligence agencies are assumed to be collecting encrypted data at scale. The encrypted data you transmit today — personally and professionally — may become readable in ten to fifteen years. This is why post-quantum cryptography is being standardised now, before the threat materialises. The transition takes years. Organisations that wait until quantum computers arrive will find their historical communications already compromised. The time to prepare is before you need to.",
            wordCount: 129,
        },
        {
            domain: "CYBERSECURITY",
            title: "What the CIA Triad Really Means",
            body: "Every security decision maps back to three principles: confidentiality, integrity, and availability. Confidentiality means only authorised people can access data. Integrity means data has not been altered without authorisation. Availability means systems work when they are needed. A website defacement violates integrity. A data breach violates confidentiality. A DDoS attack violates availability. These are not abstract categories — they are the framework that determines which controls you implement, which risks you accept, and which incidents you prioritise. A hospital prioritises availability — systems must work at three in the morning. A law firm prioritises confidentiality — client data must stay private. Understanding your organisation's priority across these three axes is the starting point of all security strategy.",
            wordCount: 130,
        },
    ];

    function todayStr(): string {
        return new Date().toISOString().slice(0, 10);
    }

    function getTodayScript(): Script {
        const now = new Date();
        const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
                86400000,
        );
        return scripts[dayOfYear % scripts.length];
    }

    function loadHistory(): DayRecord[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveHistory(h: DayRecord[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
    }

    const script = getTodayScript();
    let history = $state(loadHistory());
    const todayDone = $derived(history.some((r) => r.date === todayStr()));

    let recording = $state(false);
    let audioUrl = $state<string | null>(null);
    let mediaRecorder: MediaRecorder | null = null;
    let chunks: Blob[] = [];

    function getDomainColor(d: string): string {
        if (d === "CYBERSECURITY") return "#E05C20";
        if (d === "AI") return "#1A8FE3";
        return "#A78FFF";
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            mediaRecorder = new MediaRecorder(stream);
            chunks = [];
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                audioUrl = URL.createObjectURL(blob);
                stream.getTracks().forEach((t) => t.stop());
            };
            mediaRecorder.start();
            recording = true;
        } catch {
            alert("Microphone access is needed for this exercise.");
        }
    }

    function stopRecording() {
        if (mediaRecorder && recording) {
            mediaRecorder.stop();
            recording = false;
        }
    }

    function markComplete() {
        if (todayDone) return;
        const record: DayRecord = {
            date: todayStr(),
            scriptTitle: script.title,
            completed: true,
        };
        history = [record, ...history.filter((r) => r.date !== todayStr())];
        saveHistory(history);
    }
</script>

<svelte:head>
    <title>Speech of the Day — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Read it. Understand it. Say it out loud. A daily speaking practice for cybersecurity, AI, and quantum concepts."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span
            class="domain-badge"
            style="--dc: {getDomainColor(script.domain)};">{script.domain}</span
        >
        <h1 class="game-title">Speech of the Day</h1>
        <p class="game-sub">
            Read it. Understand it. Say it out loud. Then it is yours.
        </p>
    </header>

    <section class="stats-row">
        <div class="stat-box">
            <span class="stat-num">{history.length}</span><span class="stat-lbl"
                >SPEECHES DONE</span
            >
        </div>
        <div class="stat-box">
            <span class="stat-num">~{script.wordCount}</span><span
                class="stat-lbl">WORDS TODAY</span
            >
        </div>
    </section>

    <!-- Script -->
    <article class="script-card">
        <div class="script-header">
            <span class="script-date">{todayStr()}</span>
        </div>
        <h2 class="script-title">{script.title}</h2>
        <p class="script-body">{script.body}</p>
    </article>

    <!-- Recording -->
    <section class="record-sec">
        <span class="sec-label">YOUR RECORDING — STAYS ON THIS DEVICE</span>

        <div class="record-controls">
            {#if !recording}
                <button class="rec-btn" onclick={startRecording}>
                    <span class="rec-dot"></span> START RECORDING
                </button>
            {:else}
                <button class="rec-btn rec-btn--stop" onclick={stopRecording}>
                    ■ STOP RECORDING
                </button>
            {/if}
        </div>

        {#if audioUrl}
            <div class="playback">
                <audio controls src={audioUrl}></audio>
            </div>
        {/if}

        {#if !todayDone}
            <button class="complete-btn" onclick={markComplete}
                >MARK AS COMPLETE →</button
            >
        {:else}
            <span class="done-notice"
                >✓ DONE — Come back tomorrow for a new script.</span
            >
        {/if}
    </section>

    <footer class="privacy-footer">
        <p class="privacy-text">
            Audio is recorded using the Web Audio API and stays entirely in your
            browser. Nothing is uploaded.
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
        margin-bottom: 24px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--dc);
        border: 1px solid var(--dc);
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
        margin-bottom: 32px;
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

    .script-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(24px, 4vw, 40px);
        margin-bottom: 32px;
    }
    .script-header {
        margin-bottom: 12px;
    }
    .script-date {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .script-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(22px, 3vw, 28px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 16px 0;
    }
    .script-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.8;
        color: #8890bb;
        margin: 0;
    }

    .sec-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 12px;
    }

    .record-controls {
        margin-bottom: 16px;
    }
    .rec-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #0f1220;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: border-color 0.2s;
    }
    .rec-btn:hover {
        border-color: #424870;
    }
    .rec-btn--stop {
        border-color: #e05c20;
        color: #e05c20;
    }
    .rec-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e05c20;
        animation: pulse-dot 1.5s ease-in-out infinite;
    }
    @keyframes pulse-dot {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
    }

    .playback {
        margin-bottom: 16px;
    }
    .playback audio {
        width: 100%;
        filter: invert(1) hue-rotate(180deg);
        opacity: 0.7;
    }

    .complete-btn {
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
    .complete-btn:hover {
        background: rgba(24, 201, 106, 0.08);
    }
    .done-notice {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        color: #18c96a;
        display: block;
    }

    .privacy-footer {
        margin-top: 40px;
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
