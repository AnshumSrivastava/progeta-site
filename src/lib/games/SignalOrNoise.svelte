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

    const SLUG = "signal-or-noise";

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

    const items = getTodayItems();
    let gameData = $state(Store.get(SLUG));
    let history: DayResult[] = $state(gameData.history || []);
    let answers = $state<(string | null)[]>(new Array(items.length).fill(null));
    let currentItem = $state(0);
    let showReveal = $state(false);

    const todayDone = $derived(history.some((r) => r.date === todayStr()));

    function handleAnswer(ans: "signal" | "noise") {
        if (showReveal || todayDone) return;
        answers[currentItem] = ans;
        answers = [...answers];
        showReveal = true;
    }

    function handleContinue() {
        showReveal = false;
        if (currentItem < items.length - 1) {
            currentItem++;
        } else {
            // All items answered — submit
            const score = items.reduce(
                (acc, item, i) => acc + (answers[i] === item.type ? 1 : 0),
                0,
            );
            const result: DayResult = {
                date: todayStr(),
                score,
                total: items.length,
            };
            history = [
                result,
                ...history.filter((r) => r.date !== todayStr()),
            ].slice(0, 30);

            const streak = Store.updateStreak(SLUG);
            Store.set(SLUG, {
                history,
                totalPlayed: (gameData.totalPlayed || 0) + 1,
                bestScore: Math.max(gameData.bestScore || 0, score),
            });

            // Check badges
            let badge: string | null = null;
            if (Store.addBadge(SLUG, "sns-first-complete"))
                badge = "sns-first-complete";
            if (streak >= 3 && Store.addBadge(SLUG, "sns-streak-3"))
                badge = "sns-streak-3";
            if (streak >= 7 && Store.addBadge(SLUG, "sns-streak-7"))
                badge = "sns-streak-7";
            if (streak >= 30 && Store.addBadge(SLUG, "sns-streak-30"))
                badge = "sns-streak-30";
            if (score === items.length && Store.addBadge(SLUG, "sns-perfect"))
                badge = "sns-perfect";

            onComplete({
                score,
                total: items.length,
                badgeId: badge,
                statLine: `STREAK: ${streak} DAYS · SCORE: ${score}/${items.length} · ${todayStr()}`,
            });
        }
    }
</script>

<div class="screen-question">
    <span class="sq-eyebrow">ITEM {currentItem + 1} OF {items.length}</span>
    <h2 class="sq-question">Is this signal or noise?</h2>

    <!-- The item -->
    <div class="sq-content">
        <div
            class="feed-card"
            class:email={items[currentItem].source.startsWith("Email")}
            class:social={items[currentItem].source.includes("LinkedIn") ||
                items[currentItem].source.includes("Twitter") ||
                items[currentItem].source.includes("TikTok") ||
                items[currentItem].source.includes("Instagram") ||
                items[currentItem].source.includes("Reddit") ||
                items[currentItem].source.includes("YouTube") ||
                items[currentItem].source.includes("WhatsApp")}
        >
            <span class="feed-source">{items[currentItem].source}</span>
            <p class="feed-text">{items[currentItem].text}</p>
        </div>
    </div>

    {#if !showReveal}
        <div class="sq-options sq-options--row">
            <button
                class="sq-option sq-option--half"
                onclick={() => handleAnswer("signal")}>SIGNAL</button
            >
            <button
                class="sq-option sq-option--half"
                onclick={() => handleAnswer("noise")}>NOISE</button
            >
        </div>
    {:else}
        <!-- Reveal -->
        <div class="sq-options sq-options--row">
            <button
                class="sq-option sq-option--half"
                class:correct={items[currentItem].type === "signal"}
                class:wrong={answers[currentItem] === "signal" &&
                    items[currentItem].type !== "signal"}
                class:selected-wrong={answers[currentItem] === "signal" &&
                    items[currentItem].type !== "signal"}
                disabled>SIGNAL</button
            >
            <button
                class="sq-option sq-option--half"
                class:correct={items[currentItem].type === "noise"}
                class:wrong={answers[currentItem] === "noise" &&
                    items[currentItem].type !== "noise"}
                class:selected-wrong={answers[currentItem] === "noise" &&
                    items[currentItem].type !== "noise"}
                disabled>NOISE</button
            >
        </div>

        <div class="sq-reveal visible">
            <p class="sq-reveal-text">
                <strong
                    >{items[currentItem].type === "signal"
                        ? "✓ SIGNAL"
                        : "✗ NOISE"}</strong
                >
                — {items[currentItem].explanation}
            </p>
        </div>

        <button class="sq-continue visible" onclick={handleContinue}>
            {currentItem < items.length - 1 ? "CONTINUE →" : "SEE RESULTS →"}
        </button>
    {/if}
</div>

<style>
    .screen-question {
        width: 100%;
        max-width: 640px;
        display: flex;
        flex-direction: column;
    }
    .sq-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        margin-bottom: 16px;
    }
    .sq-question {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(22px, 3.5vw, 32px);
        color: #edf0ff;
        line-height: 1.1;
        margin: 0 0 28px 0;
    }
    .sq-content {
        margin-bottom: 28px;
    }
    .feed-card {
        padding: 20px;
        background: #07090f;
        border: 1px solid #171b30;
        border-radius: 4px;
    }
    .feed-card.email {
        border-left: 3px solid #e05c20;
    }
    .feed-card.social {
        border-left: 3px solid #1a8fe3;
    }
    .feed-source {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #424870;
        margin-bottom: 10px;
        display: block;
    }
    .feed-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0;
    }
    .sq-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .sq-options--row {
        flex-direction: row;
    }
    .sq-option {
        padding: 14px 18px;
        border: 1px solid #171b30;
        border-radius: 4px;
        background: #07090f;
        color: #8890bb;
        font-family: "DM Mono", monospace;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.14em;
        cursor: pointer;
        text-align: center;
        transition:
            border-color 0.15s,
            background 0.15s,
            color 0.15s;
    }
    .sq-option--half {
        flex: 1;
    }
    .sq-option:hover:not(:disabled) {
        border-color: var(--game-accent, #edf0ff);
        background: #0c0e18;
        color: #edf0ff;
    }
    .sq-option.correct {
        border-color: #18c96a;
        background: rgba(24, 201, 106, 0.06);
        color: #18c96a;
    }
    .sq-option.wrong,
    .sq-option.selected-wrong {
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
        border-left: 2px solid var(--game-accent, #edf0ff);
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
        border: 1px solid var(--game-accent, #edf0ff);
        border-radius: 3px;
        background: transparent;
        color: var(--game-accent, #edf0ff);
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.15s;
    }
    .sq-continue:hover {
        background: rgba(237, 240, 255, 0.04);
    }
</style>
