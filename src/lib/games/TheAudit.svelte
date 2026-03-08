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

    const SLUG = "the-audit";
    interface Question {
        text: string;
        explanation: string;
    }
    interface Domain {
        name: string;
        questions: Question[];
    }

    const domains: Domain[] = [
        {
            name: "PASSWORDS",
            questions: [
                {
                    text: "Do you use a unique password for every account?",
                    explanation:
                        "Reusing passwords means one breach compromises all your accounts.",
                },
                {
                    text: "Do you use a password manager?",
                    explanation:
                        "Password managers generate and store strong, unique passwords — removing the need to remember them.",
                },
            ],
        },
        {
            name: "UPDATES",
            questions: [
                {
                    text: "Do you install software updates within a week of release?",
                    explanation:
                        "Updates often patch security vulnerabilities. Delaying updates leaves known holes open.",
                },
                {
                    text: "Is automatic updating enabled on your primary device?",
                    explanation:
                        "Automatic updates ensure critical patches are applied without relying on manual action.",
                },
            ],
        },
        {
            name: "NETWORK",
            questions: [
                {
                    text: "Do you avoid using public WiFi for sensitive activities?",
                    explanation:
                        "Public WiFi can be intercepted. Use a VPN or mobile data for banking, email, and logins.",
                },
                {
                    text: "Have you changed the default password on your home router?",
                    explanation:
                        "Default router passwords are well-known and searchable. Changing them prevents trivial access.",
                },
            ],
        },
        {
            name: "AWARENESS",
            questions: [
                {
                    text: "Can you identify at least three signs of a phishing email?",
                    explanation:
                        "Urgency, misspellings, unfamiliar senders, suspicious links, and requests for credentials are common signs.",
                },
                {
                    text: "Do you verify unexpected requests for information, even from known contacts?",
                    explanation:
                        "Business email compromise uses real accounts. Always verify through a separate channel.",
                },
            ],
        },
        {
            name: "DATA",
            questions: [
                {
                    text: "Do you have a backup system for important files?",
                    explanation:
                        "Backups protect against ransomware, hardware failure, and accidental deletion.",
                },
                {
                    text: "Do you encrypt sensitive files stored on your devices?",
                    explanation:
                        "Encryption at rest ensures that physical access to a device does not equal data access.",
                },
            ],
        },
        {
            name: "PRIVACY",
            questions: [
                {
                    text: "Do you review app permissions and remove unnecessary access?",
                    explanation:
                        "Many apps request more permissions than needed. Regular review reduces your exposure.",
                },
                {
                    text: "Do you use multi-factor authentication on all critical accounts?",
                    explanation:
                        "MFA adds a second verification layer — even if your password is compromised, the account remains protected.",
                },
            ],
        },
    ];

    let currentDomain = $state(0);
    let answers = $state<boolean[]>(new Array(12).fill(false));

    function toggleAnswer(globalIdx: number) {
        answers[globalIdx] = !answers[globalIdx];
        answers = [...answers];
    }

    function handleComplete() {
        const scores: Record<string, number> = {};
        let totalScore = 0;
        let qIdx = 0;
        for (const d of domains) {
            let domainScore = 0;
            for (let i = 0; i < d.questions.length; i++) {
                if (answers[qIdx]) domainScore++;
                qIdx++;
            }
            scores[d.name.toLowerCase()] = domainScore;
            totalScore += domainScore;
        }

        const data = Store.get(SLUG);
        const history = data.history || [];
        history.unshift({
            date: new Date().toISOString().slice(0, 10),
            scores,
            totalScore,
        });
        Store.set(SLUG, { history: history.slice(0, 5) });

        let badge: string | null = null;
        if (Store.addBadge(SLUG, "audit-first")) badge = "audit-first";
        if (totalScore >= 10 && Store.addBadge(SLUG, "audit-perfect"))
            badge = "audit-perfect";
        if (history.length >= 2) {
            const first = history[history.length - 1];
            const daysBetween =
                (new Date().getTime() - new Date(first.date).getTime()) /
                86400000;
            if (daysBetween >= 90 && Store.addBadge(SLUG, "audit-return"))
                badge = "audit-return";
        }

        onComplete({
            score: totalScore,
            total: 12,
            badgeId: badge,
            statLine: `SCORE: ${totalScore}/12 · ${Object.entries(scores)
                .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
                .join(" · ")}`,
        });
    }
</script>

<div class="screen-input">
    <span class="sq-eyebrow"
        >{domains[currentDomain].name} · DOMAIN {currentDomain + 1} OF {domains.length}</span
    >
    <h2 class="si-prompt">
        Security Assessment: {domains[currentDomain].name}
    </h2>

    {#each domains[currentDomain].questions as q, i}
        {@const globalIdx =
            domains
                .slice(0, currentDomain)
                .reduce((a, d) => a + d.questions.length, 0) + i}
        <div class="audit-q">
            <button
                class="audit-toggle"
                class:yes={answers[globalIdx]}
                onclick={() => toggleAnswer(globalIdx)}
            >
                <span class="audit-check">{answers[globalIdx] ? "✓" : "○"}</span
                >
                <span class="audit-text">{q.text}</span>
            </button>
            <p class="audit-explain">{q.explanation}</p>
        </div>
    {/each}

    <div class="si-nav">
        {#if currentDomain > 0}
            <button class="si-btn" onclick={() => currentDomain--}
                >← BACK</button
            >
        {/if}
        {#if currentDomain < domains.length - 1}
            <button class="si-btn primary" onclick={() => currentDomain++}
                >NEXT DOMAIN →</button
            >
        {:else}
            <button class="si-btn primary" onclick={handleComplete}
                >COMPLETE AUDIT →</button
            >
        {/if}
    </div>
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

    .audit-q {
        margin-bottom: 16px;
    }
    .audit-toggle {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        width: 100%;
        background: #07090f;
        border: 1px solid #171b30;
        border-radius: 4px;
        padding: 14px 16px;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.15s;
    }
    .audit-toggle:hover {
        border-color: #424870;
    }
    .audit-toggle.yes {
        border-color: #18c96a;
    }
    .audit-check {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        color: #424870;
        flex-shrink: 0;
        width: 20px;
    }
    .audit-toggle.yes .audit-check {
        color: #18c96a;
    }
    .audit-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.5;
    }
    .audit-explain {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 12px;
        color: #424870;
        line-height: 1.5;
        margin: 6px 0 0 32px;
        font-style: italic;
    }

    .si-nav {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    .si-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        padding: 10px 20px;
        border-radius: 3px;
        background: transparent;
        cursor: pointer;
        color: #424870;
        border: 1px solid #171b30;
    }
    .si-btn.primary {
        color: var(--game-accent, #18c96a);
        border-color: var(--game-accent, #18c96a);
    }
    .si-btn:hover {
        background: rgba(255, 255, 255, 0.02);
    }
</style>
