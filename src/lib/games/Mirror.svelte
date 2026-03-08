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

    const SLUG = "mirror";
    interface Pair {
        textA: string;
        textB: string;
        humanIs: "A" | "B";
        topic: string;
        explanation: string;
    }

    const pairs: Pair[] = [
        {
            topic: "PURPOSE OF EDUCATION",
            textA: "Education exists to create citizens who question, not workers who comply. The factory model of schooling — bells, rows, standardised testing — was designed for an industrial economy. We do not live in that economy anymore. What we need is an education system that teaches people to think critically, adapt to change, and find meaning in their work.",
            textB: "Education serves multiple purposes in modern society. It provides foundational knowledge, develops critical thinking skills, and prepares individuals for professional careers. The current system, while imperfect, balances the need for standardised assessment with personalised learning approaches. Reforms should focus on integrating technology and fostering creativity alongside traditional academic skills.",
            humanIs: "A",
            explanation:
                "Text A has a clear voice and takes a specific position with conviction. Text B is balanced to the point of saying nothing controversial — a hallmark of AI-generated content that tries to cover all angles without committing to any.",
        },
        {
            topic: "REMOTE WORK",
            textA: "Remote work offers significant advantages including flexibility, reduced commute times, improved work-life balance, and access to a global talent pool. However, it also presents challenges such as isolation, communication difficulties, and the blurring of work-life boundaries. Organizations should adopt hybrid models that balance the benefits of remote work with the advantages of in-person collaboration.",
            textB: "I have been remote for three years and I am never going back. Not because my couch is more comfortable than an office chair — it is not — but because I get six hours of deep work done before lunch. In an office I got maybe two. The trade-off is real though. I have to be deliberate about social connection in a way I never had to before. Nobody warns you about that part.",
            humanIs: "B",
            explanation:
                'Text B contains specific personal details ("three years," "six hours before lunch"), admits a trade-off without immediately resolving it, and has a conversational tone with asides. Text A is a list of pros and cons — thorough but impersonal.',
        },
        {
            topic: "CYBERSECURITY CAREERS",
            textA: "A career in cybersecurity offers numerous opportunities for growth and impact. The field encompasses various specializations including penetration testing, security architecture, incident response, and governance. Professionals in this field benefit from high demand, competitive salaries, and the satisfaction of protecting organizations from evolving cyber threats.",
            textB: "Everyone says cybersecurity has a talent shortage. What it actually has is a certification obsession. I have watched people with no real-world experience stack five certifications and still struggle in their first incident response. Meanwhile, the person who spent two years running a home lab and breaking things understands more about attack surfaces than most CISSP holders. The industry needs to fix how it evaluates people.",
            humanIs: "B",
            explanation:
                "Text B expresses frustration, makes specific claims based on observation, and challenges an industry norm. Text A reads like a career brochure — accurate but generic, with no personal perspective or controversial opinion.",
        },
        {
            topic: "ARTIFICIAL INTELLIGENCE RISK",
            textA: "The thing about AI risk that frustrates me is how the conversation splits into two camps that refuse to talk to each other. One side says AI will kill us all, the other says it is just autocomplete. The truth — which is boring and therefore gets no attention — is that AI creates real, specific, mundane risks right now. Bias in hiring algorithms. Misinformation at scale. Dependency on systems we do not understand. These are not existential risks. They are engineering problems. And we are not treating them that way.",
            textB: "Artificial intelligence presents both significant opportunities and notable risks to society. While AI systems can enhance productivity and solve complex problems, they also raise concerns about bias, privacy, transparency, and potential misuse. Effective AI governance requires collaboration between technologists, policymakers, and civil society to develop frameworks that maximize benefits while mitigating risks.",
            humanIs: "A",
            explanation:
                "Text A is frustrated and specific — it identifies a real pattern (the polarised debate), names concrete risks, and calls them engineering problems. Text B covers the topic thoroughly but reads like a policy document written by committee.",
        },
        {
            topic: "LEARNING TO CODE",
            textA: "Learning to code is like learning a musical instrument. The first month is terrible. You cannot make anything that works. Every tutorial lies to you by making it look easy. Around month three, something clicks — not because you suddenly understand everything, but because you stop expecting to. You learn to sit with confusion. That is the actual skill. The syntax is just the medium.",
            textB: "Learning to code has become increasingly accessible through online platforms, coding bootcamps, and free educational resources. Popular programming languages for beginners include Python, JavaScript, and HTML/CSS. The key to success is consistent practice, building projects, and engaging with coding communities. Many professionals have successfully transitioned to tech careers through self-directed learning.",
            humanIs: "A",
            explanation:
                'Text A uses a specific analogy (musical instrument), includes emotional texture ("terrible," "lies to you"), and builds to an insight. Text B is a helpful overview but has no personality — it could have been written by any system trained on coding education content.',
        },
    ];

    let currentPair = $state(0);
    let selected = $state<"A" | "B" | null>(null);
    let revealed = $state(false);
    let score = $state(0);
    let sessionTotal = $state(0);

    function handleSelect(choice: "A" | "B") {
        if (revealed) return;
        selected = choice;
        revealed = true;
        sessionTotal++;
        if (choice === pairs[currentPair].humanIs) score++;
    }

    function handleContinue() {
        if (currentPair < pairs.length - 1) {
            currentPair++;
            selected = null;
            revealed = false;
        } else {
            const data = Store.get(SLUG);
            const sessions = (data.sessionsPlayed || 0) + 1;
            const lifeCorrect = (data.lifetimeCorrect || 0) + score;
            const lifeTotal = (data.lifetimeTotal || 0) + sessionTotal;
            Store.set(SLUG, {
                sessionsPlayed: sessions,
                lifetimeCorrect: lifeCorrect,
                lifetimeTotal: lifeTotal,
                lifetimeAccuracy: lifeTotal > 0 ? lifeCorrect / lifeTotal : 0,
            });

            let badge: string | null = null;
            if (Store.addBadge(SLUG, "mirror-first")) badge = "mirror-first";
            if (sessions >= 10 && Store.addBadge(SLUG, "mirror-ten"))
                badge = "mirror-ten";
            if (
                lifeTotal >= 10 &&
                lifeCorrect / lifeTotal >= 0.7 &&
                Store.addBadge(SLUG, "mirror-70pct")
            )
                badge = "mirror-70pct";

            onComplete({
                score,
                total: pairs.length,
                badgeId: badge,
                statLine: `SCORE: ${score}/${pairs.length} · SESSION ${sessions} · LIFETIME: ${Math.round((lifeCorrect / lifeTotal) * 100)}%`,
            });
        }
    }
</script>

<div class="screen-question">
    <span class="sq-eyebrow"
        >PAIR {currentPair + 1} OF {pairs.length} · {pairs[currentPair]
            .topic}</span
    >
    <h2 class="sq-question">Which was written by a human?</h2>

    <div class="mirror-texts">
        <div
            class="mirror-col"
            class:selected={selected === "A"}
            class:correct={revealed && pairs[currentPair].humanIs === "A"}
            class:wrong={revealed &&
                selected === "A" &&
                pairs[currentPair].humanIs !== "A"}
        >
            <span class="mirror-label">A</span>
            <p class="mirror-text">{pairs[currentPair].textA}</p>
        </div>
        <div
            class="mirror-col"
            class:selected={selected === "B"}
            class:correct={revealed && pairs[currentPair].humanIs === "B"}
            class:wrong={revealed &&
                selected === "B" &&
                pairs[currentPair].humanIs !== "B"}
        >
            <span class="mirror-label">B</span>
            <p class="mirror-text">{pairs[currentPair].textB}</p>
        </div>
    </div>

    {#if !revealed}
        <div class="sq-options sq-options--row">
            <button
                class="sq-option sq-option--half"
                onclick={() => handleSelect("A")}>A IS HUMAN</button
            >
            <button
                class="sq-option sq-option--half"
                onclick={() => handleSelect("B")}>B IS HUMAN</button
            >
        </div>
    {:else}
        <div class="sq-reveal visible">
            <p class="sq-reveal-text">
                <strong
                    >{selected === pairs[currentPair].humanIs
                        ? "✓ Correct"
                        : "✗ Incorrect"} — {pairs[currentPair].humanIs} was human.</strong
                >
                {pairs[currentPair].explanation}
            </p>
        </div>
        <button class="sq-continue visible" onclick={handleContinue}
            >{currentPair < pairs.length - 1
                ? "NEXT PAIR →"
                : "SEE RESULTS →"}</button
        >
    {/if}
</div>

<style>
    .screen-question {
        width: 100%;
        max-width: 680px;
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

    .mirror-texts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 24px;
    }
    @media (max-width: 640px) {
        .mirror-texts {
            grid-template-columns: 1fr;
        }
    }
    .mirror-col {
        padding: 20px;
        background: #07090f;
        border: 1px solid #171b30;
        border-radius: 4px;
        transition: border-color 0.15s;
    }
    .mirror-col.correct {
        border-color: #18c96a;
    }
    .mirror-col.wrong {
        border-color: #e05c20;
    }
    .mirror-label {
        font-family: "DM Mono", monospace;
        font-size: 12px;
        font-weight: 700;
        color: #424870;
        display: block;
        margin-bottom: 10px;
    }
    .mirror-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
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
        font-size: 12px;
        letter-spacing: 0.1em;
        cursor: pointer;
        text-align: center;
        transition:
            border-color 0.15s,
            color 0.15s;
    }
    .sq-option--half {
        flex: 1;
    }
    .sq-option:hover {
        border-color: var(--game-accent, #edf0ff);
        color: #edf0ff;
    }

    .sq-reveal {
        margin-top: 20px;
        padding: 16px 18px;
        border-left: 2px solid var(--game-accent, #1a8fe3);
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
        cursor: pointer;
    }
    .sq-continue:hover {
        background: rgba(237, 240, 255, 0.04);
    }
</style>
