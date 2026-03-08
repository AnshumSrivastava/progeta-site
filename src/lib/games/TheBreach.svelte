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

    const SLUG = "the-breach";
    interface Step {
        situation: string;
        options: { label: string; points: number; feedback: string }[];
    }
    interface Scenario {
        id: string;
        title: string;
        context: string;
        steps: Step[];
    }

    const scenarios: Scenario[] = [
        {
            id: "cred-compromise",
            title: "Compromised Credentials",
            context:
                "Your monitoring system alerts: multiple failed login attempts on a senior executive's account followed by a successful login from an unrecognised IP address in a different country.",
            steps: [
                {
                    situation: "What is your first action?",
                    options: [
                        {
                            label: "Immediately disable the account and force a password reset",
                            points: 3,
                            feedback:
                                "Correct priority. Containing the threat by disabling the compromised account prevents further access while you investigate.",
                        },
                        {
                            label: "Monitor the session to see what the attacker does",
                            points: 1,
                            feedback:
                                "Risky. While gathering intelligence has value, allowing an active attacker to operate in your environment exposes sensitive data.",
                        },
                        {
                            label: "Send an email to the executive asking if it was them",
                            points: 0,
                            feedback:
                                "If the email account is compromised, the attacker will see your message. Never alert through a potentially compromised channel.",
                        },
                    ],
                },
                {
                    situation:
                        "The account is disabled. What do you investigate next?",
                    options: [
                        {
                            label: "Check access logs for what the attacker viewed or downloaded",
                            points: 3,
                            feedback:
                                "Correct. Understanding the scope of access determines the severity of the breach and drives notification requirements.",
                        },
                        {
                            label: "Reset the password and re-enable the account",
                            points: 0,
                            feedback:
                                "Too early. Without understanding the scope of compromise, re-enabling the account could allow continued access if other persistence mechanisms exist.",
                        },
                        {
                            label: "Check if other accounts were also compromised",
                            points: 2,
                            feedback:
                                "Important but secondary. First understand the scope of the known compromise before expanding your investigation.",
                        },
                    ],
                },
                {
                    situation:
                        "Logs show the attacker accessed financial documents. What is the priority?",
                    options: [
                        {
                            label: "Begin formal incident response procedures and notify legal",
                            points: 3,
                            feedback:
                                "Financial data access likely triggers regulatory notification requirements. Legal must be involved early to manage compliance obligations.",
                        },
                        {
                            label: "Delete the attacker's session and move on",
                            points: 0,
                            feedback:
                                "Destroying evidence and failing to notify is both operationally dangerous and potentially illegal. Incident response procedures exist for this reason.",
                        },
                        {
                            label: "Interview the executive about their password practices",
                            points: 1,
                            feedback:
                                "Understanding the attack vector matters, but it is not the priority when you have active financial data exposure.",
                        },
                    ],
                },
                {
                    situation:
                        "The investigation reveals the credentials were obtained via a phishing email. What is the long-term action?",
                    options: [
                        {
                            label: "Implement MFA for all accounts and conduct phishing awareness training",
                            points: 3,
                            feedback:
                                "MFA would have prevented this breach even with compromised credentials. Combined with training, this addresses both the technical and human factors.",
                        },
                        {
                            label: "Block the phishing domain and mark the incident as resolved",
                            points: 1,
                            feedback:
                                "Blocking one domain is tactical. The attacker will use new domains. Without MFA and training, the same attack vector remains open.",
                        },
                        {
                            label: "Fire the executive for falling for phishing",
                            points: 0,
                            feedback:
                                "Punishing phishing victims creates a culture where people hide security incidents instead of reporting them. The system failed, not the person.",
                        },
                    ],
                },
            ],
        },
        {
            id: "ransomware",
            title: "Ransomware Attack",
            context:
                "Monday morning. Multiple employees report they cannot access their files. Screens display a ransom note demanding 5 Bitcoin. Your file servers show encrypted files with a .locked extension.",
            steps: [
                {
                    situation: "What is your first action?",
                    options: [
                        {
                            label: "Isolate affected systems from the network immediately",
                            points: 3,
                            feedback:
                                "Network isolation prevents the ransomware from spreading to unaffected systems. Every minute of network connectivity risks further encryption.",
                        },
                        {
                            label: "Pay the ransom to restore operations quickly",
                            points: 0,
                            feedback:
                                "Paying does not guarantee decryption. It funds criminal operations, marks you as a willing payer, and may violate sanctions laws.",
                        },
                        {
                            label: "Try to identify the ransomware variant",
                            points: 1,
                            feedback:
                                "Identification is valuable but secondary. If the ransomware is still spreading while you research, the damage grows.",
                        },
                    ],
                },
                {
                    situation: "Systems are isolated. What is next?",
                    options: [
                        {
                            label: "Assess the scope: which systems are affected, which are clean",
                            points: 3,
                            feedback:
                                "Scope assessment determines your response strategy. You need to know what is compromised versus what is safe before making recovery decisions.",
                        },
                        {
                            label: "Restore everything from backup immediately",
                            points: 1,
                            feedback:
                                "Restoring without understanding the scope risks re-infection. If the entry point is not identified, the attacker can strike again.",
                        },
                        {
                            label: "Call a press conference",
                            points: 0,
                            feedback:
                                "Public communication before understanding the scope causes panic and provides incomplete information. Internal assessment must come first.",
                        },
                    ],
                },
                {
                    situation:
                        "Assessment shows 60% of file servers encrypted. You have backups from 48 hours ago. What is the priority?",
                    options: [
                        {
                            label: "Verify backup integrity, identify the entry point, then begin staged recovery",
                            points: 3,
                            feedback:
                                "Correct order: verify backups are clean, find how the attacker got in so you can close that door, then restore from a known-good state.",
                        },
                        {
                            label: "Restore all systems simultaneously to minimise downtime",
                            points: 1,
                            feedback:
                                "Speed matters but if the entry point is still open, rapid restoration without securing the environment means the attack can recur immediately.",
                        },
                        {
                            label: "Negotiate with the attackers while restoring in parallel",
                            points: 0,
                            feedback:
                                "Negotiation signals willingness to pay and buys the attacker time. Focus resources on recovery, not on engaging with criminals.",
                        },
                    ],
                },
                {
                    situation:
                        "Recovery is underway. What structural changes prevent future attacks?",
                    options: [
                        {
                            label: "Implement network segmentation, offline backups, and endpoint detection",
                            points: 3,
                            feedback:
                                "Defense in depth: segmentation limits lateral movement, offline backups survive ransomware, and EDR detects threats before encryption begins.",
                        },
                        {
                            label: "Buy cyber insurance",
                            points: 1,
                            feedback:
                                "Insurance transfers financial risk but does not prevent attacks. It is a complement to security controls, not a replacement.",
                        },
                        {
                            label: "Ban all USB drives and external connections",
                            points: 0,
                            feedback:
                                "Most ransomware enters via email or web, not USB. This draconian measure disrupts operations without addressing the actual attack vector.",
                        },
                    ],
                },
            ],
        },
    ];

    let scenarioIdx = $state(0);
    let stepIdx = $state(0);
    let showFeedback = $state(false);
    let feedbackText = $state("");
    let totalScore = $state(0);
    let maxScore = $state(0);
    let selectedOpt = $state(-1);

    const scenario = $derived(scenarios[scenarioIdx]);

    function handleChoice(optIdx: number) {
        if (showFeedback) return;
        const opt = scenario.steps[stepIdx].options[optIdx];
        totalScore += opt.points;
        maxScore += 3;
        feedbackText = opt.feedback;
        selectedOpt = optIdx;
        showFeedback = true;
    }

    function handleContinue() {
        showFeedback = false;
        selectedOpt = -1;
        if (stepIdx < scenario.steps.length - 1) {
            stepIdx++;
        } else if (scenarioIdx < scenarios.length - 1) {
            scenarioIdx++;
            stepIdx = 0;
        } else {
            const data = Store.get(SLUG);
            const completed = data.completed || [];
            scenarios.forEach((s) => {
                if (!completed.includes(s.id)) completed.push(s.id);
            });
            Store.set(SLUG, {
                completed,
                highscore: Math.max(data.highscore || 0, totalScore),
                attempts: (data.attempts || 0) + 1,
            });

            let badge: string | null = null;
            if (Store.addBadge(SLUG, "breach-first")) badge = "breach-first";
            if (
                completed.length >= scenarios.length &&
                Store.addBadge(SLUG, "breach-all-scenarios")
            )
                badge = "breach-all-scenarios";

            onComplete({
                score: totalScore,
                total: maxScore,
                badgeId: badge,
                statLine: `SCORE: ${totalScore}/${maxScore} · ${scenarios.length} SCENARIOS`,
            });
        }
    }
</script>

<div class="screen-build">
    <span class="sq-eyebrow"
        >{scenario.title} · STEP {stepIdx + 1} OF {scenario.steps.length}</span
    >

    {#if stepIdx === 0 && !showFeedback}
        <div class="context-box">
            <span class="ctx-label">INCIDENT BRIEF</span>
            <p class="ctx-text">{scenario.context}</p>
        </div>
    {/if}

    <h2 class="sb-question">{scenario.steps[stepIdx].situation}</h2>

    <div class="sb-options">
        {#each scenario.steps[stepIdx].options as opt, i}
            <button
                class="sb-option"
                class:selected={selectedOpt === i}
                class:best={showFeedback && opt.points === 3}
                class:bad={showFeedback &&
                    selectedOpt === i &&
                    opt.points === 0}
                disabled={showFeedback}
                onclick={() => handleChoice(i)}>{opt.label}</button
            >
        {/each}
    </div>

    {#if showFeedback}
        <div class="sq-reveal visible">
            <p class="sq-reveal-text">{feedbackText}</p>
        </div>
        <button class="sq-continue visible" onclick={handleContinue}>
            {stepIdx < scenario.steps.length - 1
                ? "NEXT STEP →"
                : scenarioIdx < scenarios.length - 1
                  ? "NEXT SCENARIO →"
                  : "SEE RESULTS →"}
        </button>
    {/if}
</div>

<style>
    .screen-build {
        width: 100%;
        max-width: 680px;
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

    .context-box {
        background: #07090f;
        border: 1px solid #171b30;
        padding: 20px;
        margin-bottom: 24px;
        border-radius: 4px;
    }
    .ctx-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #e05c20;
        display: block;
        margin-bottom: 8px;
    }
    .ctx-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0;
    }

    .sb-question {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(20px, 3vw, 28px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 20px 0;
    }

    .sb-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .sb-option {
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
            color 0.15s;
    }
    .sb-option:hover:not(:disabled) {
        border-color: var(--game-accent, #e05c20);
        color: #edf0ff;
    }
    .sb-option:disabled {
        cursor: default;
    }
    .sb-option.selected {
        border-color: var(--game-accent, #e05c20);
        color: #edf0ff;
    }
    .sb-option.best {
        border-color: #18c96a;
        color: #18c96a;
    }
    .sb-option.bad {
        border-color: #e05c20;
        color: #e05c20;
    }

    .sq-reveal {
        margin-top: 20px;
        padding: 16px 18px;
        border-left: 2px solid var(--game-accent, #e05c20);
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
    .sq-continue {
        align-self: flex-end;
        margin-top: 20px;
        padding: 10px 24px;
        border: 1px solid var(--game-accent, #e05c20);
        border-radius: 3px;
        background: transparent;
        color: var(--game-accent, #e05c20);
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        cursor: pointer;
    }
</style>
