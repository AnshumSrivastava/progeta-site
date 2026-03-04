<script lang="ts">
    const STORAGE_KEY = "pt-signal-noise";

    interface FeedItem {
        text: string;
        type: "signal" | "noise";
        source: string;
        explanation: string;
    }

    interface DayResult {
        date: string;
        score: number;
        total: number;
    }

    // Pool of items — rotates daily
    const itemPool: FeedItem[][] = [
        [
            {
                text: "A widely shared LinkedIn post claims AI can now replace 90% of cybersecurity analysts.",
                type: "noise",
                source: "Social — LinkedIn",
                explanation:
                    "This overstates current AI capabilities. AI assists analysts with triage and detection but cannot replace human judgment for incident response, threat hunting, or business-context decisions.",
            },
            {
                text: "NIST publishes final versions of three post-quantum cryptography standards.",
                type: "signal",
                source: "NIST Press Release",
                explanation:
                    "This is real infrastructure-level news. Post-quantum standards directly affect how encryption is implemented going forward, impacting every organisation handling sensitive data.",
            },
            {
                text: "Breaking: Scientists use quantum computer to hack into bank accounts.",
                type: "noise",
                source: "Clickbait Headline",
                explanation:
                    "Current quantum computers cannot break modern encryption. This headline misrepresents a research paper about theoretical quantum attacks on simplified models — not real bank systems.",
            },
            {
                text: "Microsoft releases emergency patch for actively exploited Windows vulnerability.",
                type: "signal",
                source: "Microsoft Security Advisory",
                explanation:
                    "Active exploitation means real risk right now. Emergency patches for zero-days are among the highest-priority security signals — immediate action is required.",
            },
            {
                text: "A popular YouTuber claims VPNs make you completely anonymous online.",
                type: "noise",
                source: "YouTube",
                explanation:
                    "VPNs encrypt traffic and mask your IP, but they do not provide complete anonymity. Browser fingerprinting, cookies, DNS leaks, and the VPN provider itself can all identify you.",
            },
        ],
        [
            {
                text: "Google announces Gemini AI achieved a score of 90% on a graduate-level reasoning benchmark.",
                type: "signal",
                source: "Google AI Blog",
                explanation:
                    "Benchmark results from major labs are signal — they indicate capability trajectories. The score itself matters less than the trend and what tasks it enables.",
            },
            {
                text: 'An email from your "bank" asks you to click a link to verify your identity due to suspicious activity.',
                type: "noise",
                source: "Email — Unknown",
                explanation:
                    "Classic phishing pattern: urgency + authority + action. Banks rarely ask you to verify identity via email links. This is a social engineering attempt.",
            },
            {
                text: "A CVE with a CVSS score of 9.8 is published for a widely-used open-source library.",
                type: "signal",
                source: "NVD / CVE Database",
                explanation:
                    "CVSS 9.8 is critical. If the library is in your dependency chain, this requires immediate assessment. CVE publications from official databases are high-quality signals.",
            },
            {
                text: 'A tweet goes viral: "China has a quantum computer that can break all encryption right now."',
                type: "noise",
                source: "Twitter/X",
                explanation:
                    'No current quantum computer can break production encryption. The "right now" framing is always a red flag — quantum cryptanalysis is a future threat, not a present one.',
            },
            {
                text: "CISA adds three new vulnerabilities to the Known Exploited Vulnerabilities catalog.",
                type: "signal",
                source: "CISA KEV Catalog",
                explanation:
                    "The KEV catalog lists vulnerabilities with confirmed active exploitation. Federal agencies are required to patch them, and all organisations should treat KEV additions as urgent signals.",
            },
        ],
        [
            {
                text: "A Reddit post claims that if you disable JavaScript, hackers cannot access your computer.",
                type: "noise",
                source: "Reddit",
                explanation:
                    "Disabling JavaScript reduces some attack surface (like XSS) but does not prevent network-level attacks, malware from downloads, phishing, or exploitation of other browser components.",
            },
            {
                text: "OpenAI publishes a system card detailing safety evaluations for their latest model.",
                type: "signal",
                source: "OpenAI",
                explanation:
                    "System cards represent transparency about model capabilities and limitations. They contain concrete test results about harmful outputs, bias, and capability boundaries — primary source signal.",
            },
            {
                text: 'An "ethical hacker" on Instagram claims they can teach you to hack any WiFi in 5 minutes.',
                type: "noise",
                source: "Instagram",
                explanation:
                    'Modern WiFi (WPA3) is not trivially hackable. Claims of teaching hacking "any WiFi in 5 minutes" are misleading and typically promote credential stuffing tools or outdated WEP attacks.',
            },
            {
                text: "IBM releases a 1,121-qubit quantum processor, advancing their quantum hardware roadmap.",
                type: "signal",
                source: "IBM Research",
                explanation:
                    "Qubit count milestones from major hardware vendors track toward quantum utility. This is a concrete engineering milestone, not hype — it advances the timeline for practical quantum applications.",
            },
            {
                text: "A forwarded WhatsApp message warns that 5G towers are being used for surveillance.",
                type: "noise",
                source: "WhatsApp Forward",
                explanation:
                    "This is a debunked conspiracy theory. 5G towers provide cellular connectivity. Network surveillance occurs at the ISP/carrier level, not through the radio towers themselves.",
            },
        ],
        [
            {
                text: "The EU AI Act formally enters into force, requiring compliance within specific timelines.",
                type: "signal",
                source: "Official Journal of the EU",
                explanation:
                    "Regulatory enforcement is a signal with direct business impact. The EU AI Act creates legally binding obligations for AI systems deployed in the EU — organisations must prepare compliance strategies.",
            },
            {
                text: "A tech blog claims quantum computers will make all passwords obsolete within 2 years.",
                type: "noise",
                source: "Tech Blog",
                explanation:
                    "Quantum computers threaten specific cryptographic schemes (RSA, ECC), not passwords directly. Password hashing (bcrypt, Argon2) is not significantly vulnerable to known quantum algorithms.",
            },
            {
                text: "A new Android malware strain is found pre-installed on budget devices sold through unofficial channels.",
                type: "signal",
                source: "Kaspersky Research",
                explanation:
                    "Supply chain compromise of consumer devices is a concrete, actionable threat. Research from reputable security firms about pre-installed malware is a genuine signal.",
            },
            {
                text: 'A LinkedIn influencer posts: "Every company needs a Chief AI Officer immediately or they will fail."',
                type: "noise",
                source: "LinkedIn",
                explanation:
                    "Blanket declarations about organisational structure are opinion, not signal. Whether a CAIO role is needed depends entirely on the organisation type, size, and AI exposure.",
            },
            {
                text: "MITRE releases an updated version of the ATT&CK framework with new techniques.",
                type: "signal",
                source: "MITRE ATT&CK",
                explanation:
                    "ATT&CK updates reflect real-world adversary behaviour observed across global incident response. New techniques mean new threats that defensive teams should assess against their environments.",
            },
        ],
        [
            {
                text: "A phishing-as-a-service platform is taken down by international law enforcement.",
                type: "signal",
                source: "Europol Press Release",
                explanation:
                    "Law enforcement action against cybercrime infrastructure is signal — it disrupts specific threat actors and indicates the scale and professionalisation of the threat landscape.",
            },
            {
                text: "A viral TikTok video claims that Incognito Mode makes everything you do online invisible.",
                type: "noise",
                source: "TikTok",
                explanation:
                    "Incognito mode only prevents local storage of browsing history. Your ISP, employer, and websites you visit can still see your activity. It provides local privacy, not network anonymity.",
            },
            {
                text: "DeepMind publishes research showing their AI system discovered a novel mathematical proof.",
                type: "signal",
                source: "Nature (DeepMind)",
                explanation:
                    "Peer-reviewed research demonstrating AI capabilities in formal reasoning is significant signal. Novel mathematical proofs indicate expanding boundaries of what AI systems can contribute to fundamental research.",
            },
            {
                text: "An article claims that quantum entanglement could allow faster-than-light internet.",
                type: "noise",
                source: "Pop Science Article",
                explanation:
                    "Quantum entanglement cannot transmit information faster than light. This is a fundamental physics constraint (no-communication theorem). Entanglement enables quantum key distribution, not FTL communication.",
            },
            {
                text: "A Fortune 500 company discloses a data breach affecting 40 million customer records.",
                type: "signal",
                source: "SEC Filing",
                explanation:
                    "Breach disclosures in SEC filings are regulatory requirements — they are verified, material events. 40 million records indicates significant scale with potential downstream effects.",
            },
        ],
    ];

    function todayStr(): string {
        return new Date().toISOString().slice(0, 10);
    }

    function getTodayItems(): FeedItem[] {
        const now = new Date();
        const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
                86400000,
        );
        return itemPool[dayOfYear % itemPool.length];
    }

    function loadResults(): DayResult[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveResults(results: DayResult[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    }

    const items = getTodayItems();
    let results = $state(loadResults());
    let answers = $state<(string | null)[]>(new Array(items.length).fill(null));
    let revealed = $state(false);

    const todayResult = $derived(results.find((r) => r.date === todayStr()));
    const alreadyDone = $derived(!!todayResult);

    $effect(() => {
        if (alreadyDone && !revealed) {
            revealed = true;
        }
    });

    function handleAnswer(idx: number, ans: "signal" | "noise") {
        if (alreadyDone || revealed) return;
        answers[idx] = ans;
        answers = [...answers];
    }

    function handleSubmit() {
        if (answers.some((a) => a === null)) return;
        revealed = true;
        const score = items.reduce(
            (acc, item, i) => acc + (answers[i] === item.type ? 1 : 0),
            0,
        );
        const result: DayResult = {
            date: todayStr(),
            score,
            total: items.length,
        };
        results = [result, ...results.filter((r) => r.date !== todayStr())];
        saveResults(results);
    }

    const streak = $derived(() => {
        const sorted = [...results].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        let count = 0;
        const today = new Date();
        for (let i = 0; i < sorted.length; i++) {
            const expected = new Date(today);
            expected.setDate(expected.getDate() - i);
            if (sorted[i]?.date === expected.toISOString().slice(0, 10))
                count++;
            else break;
        }
        return count;
    });
</script>

<svelte:head>
    <title>Signal or Noise — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Five items a day. Determine which are real signals and which are noise. Covers phishing, AI-generated content, and statistical manipulation."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">AWARENESS</span>
        <h1 class="game-title">Signal or Noise</h1>
        <p class="game-sub">
            Every piece of information is trying to tell you something. Most of
            it is lying.
        </p>
    </header>

    <section class="stats-row">
        <div class="stat-box">
            <span class="stat-num">{streak()}</span><span class="stat-lbl"
                >STREAK</span
            >
        </div>
        <div class="stat-box">
            <span class="stat-num">{results.length}</span><span class="stat-lbl"
                >DAYS PLAYED</span
            >
        </div>
        <div class="stat-box">
            <span class="stat-num"
                >{results.reduce((a, r) => a + r.score, 0)}/{results.reduce(
                    (a, r) => a + r.total,
                    0,
                )}</span
            ><span class="stat-lbl">TOTAL CORRECT</span>
        </div>
    </section>

    <section class="feed-sec">
        <span class="sec-label">TODAY'S FEED — {todayStr()}</span>

        <div class="feed-list">
            {#each items as item, i}
                <div class="feed-item" class:revealed>
                    <div class="feed-source">{item.source}</div>
                    <p class="feed-text">{item.text}</p>

                    <div class="feed-choices">
                        <button
                            class="choice-btn"
                            class:selected={answers[i] === "signal"}
                            class:correct={revealed && item.type === "signal"}
                            class:wrong={revealed &&
                                answers[i] === "signal" &&
                                item.type !== "signal"}
                            disabled={revealed}
                            onclick={() => handleAnswer(i, "signal")}
                            >SIGNAL</button
                        >
                        <button
                            class="choice-btn"
                            class:selected={answers[i] === "noise"}
                            class:correct={revealed && item.type === "noise"}
                            class:wrong={revealed &&
                                answers[i] === "noise" &&
                                item.type !== "noise"}
                            disabled={revealed}
                            onclick={() => handleAnswer(i, "noise")}
                            >NOISE</button
                        >
                    </div>

                    {#if revealed}
                        <div class="feed-explain">
                            <span
                                class="explain-verdict"
                                class:is-signal={item.type === "signal"}
                                >{item.type === "signal"
                                    ? "✓ SIGNAL"
                                    : "✗ NOISE"}</span
                            >
                            <p class="explain-text">{item.explanation}</p>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        {#if !revealed && !alreadyDone}
            <button
                class="submit-btn"
                disabled={answers.some((a) => a === null)}
                onclick={handleSubmit}
            >
                SUBMIT ANALYSIS →
            </button>
        {/if}

        {#if revealed}
            <div class="score-box">
                <span class="score-num"
                    >{todayResult?.score ??
                        items.reduce(
                            (acc, item, i) =>
                                acc + (answers[i] === item.type ? 1 : 0),
                            0,
                        )}/{items.length}</span
                >
                <span class="score-label">CORRECT TODAY</span>
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

    .stats-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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

    .sec-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .feed-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .feed-item {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 18px 20px;
    }
    .feed-source {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        margin-bottom: 8px;
    }
    .feed-text {
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #8890bb;
        line-height: 1.6;
        margin: 0 0 14px 0;
    }

    .feed-choices {
        display: flex;
        gap: 8px;
    }
    .choice-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        padding: 8px 16px;
        border: 1px solid #0f1220;
        border-radius: 2px;
        background: transparent;
        color: #424870;
        cursor: pointer;
        transition:
            border-color 0.2s,
            color 0.2s,
            background 0.2s;
        flex: 1;
    }
    .choice-btn:not(:disabled):hover {
        border-color: #424870;
        color: #8890bb;
    }
    .choice-btn:disabled {
        cursor: default;
    }
    .choice-btn.selected {
        border-color: #edf0ff;
        color: #edf0ff;
        background: rgba(237, 240, 255, 0.04);
    }
    .choice-btn.correct {
        border-color: #18c96a;
        color: #18c96a;
        background: rgba(24, 201, 106, 0.06);
    }
    .choice-btn.wrong {
        border-color: #e05c20;
        color: #e05c20;
        background: rgba(224, 92, 32, 0.06);
    }

    .feed-explain {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid #0f1220;
    }
    .explain-verdict {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #e05c20;
        display: block;
        margin-bottom: 4px;
    }
    .explain-verdict.is-signal {
        color: #18c96a;
    }
    .explain-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        line-height: 1.65;
        margin: 0;
    }

    .submit-btn {
        margin-top: 20px;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid rgba(237, 240, 255, 0.2);
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
        transition:
            background 0.2s,
            border-color 0.2s;
    }
    .submit-btn:not(:disabled):hover {
        background: rgba(237, 240, 255, 0.04);
        border-color: #edf0ff;
    }
    .submit-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }

    .score-box {
        margin-top: 24px;
        text-align: center;
        padding: 20px;
        background: #07090f;
        border: 1px solid #0f1220;
    }
    .score-num {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 32px;
        color: #edf0ff;
        display: block;
    }
    .score-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        display: block;
        margin-top: 4px;
    }
</style>
