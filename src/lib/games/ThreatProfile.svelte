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

    const SLUG = "threat-profile";
    interface Scenario {
        id: string;
        title: string;
        brief: string;
        indicators: string[];
        profiles: { label: string; correct: boolean; explanation: string }[];
    }

    const scenarios: Scenario[] = [
        {
            id: "apt-state",
            title: "Operation Midnight Aurora",
            brief: "A defence contractor discovers persistent access to classified project files. The intrusion used a zero-day in their VPN appliance, moved laterally through Active Directory, and exfiltrated data over DNS tunneling for 6 months.",
            indicators: [
                "Zero-day exploit in network appliance",
                "Six-month dwell time",
                "DNS tunneling for exfiltration",
                "Targeted classified defence data",
                "Sophisticated lateral movement via AD",
            ],
            profiles: [
                {
                    label: "Nation-State APT",
                    correct: true,
                    explanation:
                        "Zero-day development, extended dwell time, DNS exfiltration, and targeting of classified defence data all indicate a well-resourced nation-state advanced persistent threat.",
                },
                {
                    label: "Cybercriminal Gang",
                    correct: false,
                    explanation:
                        "Cybercriminals prioritise financial gain. They rarely invest in zero-days for defence contractors and do not typically maintain 6-month operations for non-financial data.",
                },
                {
                    label: "Hacktivist Group",
                    correct: false,
                    explanation:
                        "Hacktivists aim for public disruption and messaging. This operation was covert and targeted — the opposite of hacktivist behaviour.",
                },
            ],
        },
        {
            id: "fin-crime",
            title: "Project GoldRush",
            brief: "A retail chain experiences a breach where point-of-sale systems across 200 locations are infected with RAM-scraping malware. Customer card data is exfiltrated to drop servers and sold on dark web carding forums within days.",
            indicators: [
                "POS RAM-scraping malware",
                "Multi-location deployment",
                "Quick monetisation on carding forums",
                "Drop server infrastructure",
                "Card data targeting",
            ],
            profiles: [
                {
                    label: "Nation-State APT",
                    correct: false,
                    explanation:
                        "State actors do not typically target retail card data for dark web resale. The motivation and TTPs are financial, not intelligence-driven.",
                },
                {
                    label: "Organised Cybercrime (FIN group)",
                    correct: true,
                    explanation:
                        "The POS malware deployment, rapid monetisation, and dark web sale pattern matches organised FIN groups who specialise in payment card theft.",
                },
                {
                    label: "Insider Threat",
                    correct: false,
                    explanation:
                        "While insiders can facilitate POS compromises, the scale (200 locations) and sophistication of the malware infrastructure indicate external organised crime.",
                },
            ],
        },
        {
            id: "hacktivist",
            title: "Operation CleanSlate",
            brief: "A fossil fuel company's website is defaced with environmental messages. Internal emails between executives are leaked to journalists, revealing lobbying against climate regulations. A DDoS attack takes their services offline for 72 hours.",
            indicators: [
                "Website defacement with political messaging",
                "Selective leak of executive communications",
                "DDoS for disruption",
                "Environmental / climate motivation",
                "High public visibility",
            ],
            profiles: [
                {
                    label: "Hacktivist Collective",
                    correct: true,
                    explanation:
                        "The combination of defacement, strategic leaks, DDoS, and environmental messaging is textbook hacktivist behaviour — public disruption with ideological motivation.",
                },
                {
                    label: "Competing Corporation",
                    correct: false,
                    explanation:
                        "Corporate espionage is covert. Public defacement and media leaks serve no competitive advantage and would create legal liability.",
                },
                {
                    label: "Nation-State APT",
                    correct: false,
                    explanation:
                        "State actors operate covertly. Public defacement and DDoS are too noisy for state-sponsored operations, which prioritise stealth.",
                },
            ],
        },
        {
            id: "insider",
            title: "The Quiet Exit",
            brief: "A pharmaceutical company notices large data transfers to personal cloud storage from an employee who recently gave notice. The data includes drug trial results and proprietary formulations. Transfers occurred outside business hours over several weeks.",
            indicators: [
                "Personal cloud storage exfiltration",
                "Departing employee",
                "Proprietary R&D data",
                "After-hours activity",
                "Gradual exfiltration over weeks",
            ],
            profiles: [
                {
                    label: "External Hacker",
                    correct: false,
                    explanation:
                        "The activity originates from a legitimate employee account with normal access patterns. External attackers would not have this natural access to R&D data.",
                },
                {
                    label: "Malicious Insider",
                    correct: true,
                    explanation:
                        "A departing employee gradually exfiltrating proprietary data to personal storage is a classic insider threat pattern — using legitimate access for illegitimate purposes.",
                },
                {
                    label: "Cybercriminal Gang",
                    correct: false,
                    explanation:
                        "Cybercriminals would not have direct access to an employee's workstation and cloud storage. The access pattern indicates an insider, not an external threat.",
                },
            ],
        },
    ];

    let current = $state(0);
    let selected = $state(-1);
    let revealed = $state(false);
    let score = $state(0);

    function handleSelect(idx: number) {
        if (revealed) return;
        selected = idx;
        revealed = true;
        if (scenarios[current].profiles[idx].correct) score++;
    }

    function handleContinue() {
        if (current < scenarios.length - 1) {
            current++;
            selected = -1;
            revealed = false;
        } else {
            const data = Store.get(SLUG);
            const completed = data.scenariosCompleted || [];
            scenarios.forEach((s) => {
                if (!completed.includes(s.id)) completed.push(s.id);
            });
            Store.set(SLUG, {
                scenariosCompleted: completed,
                averageAccuracy: score / scenarios.length,
            });

            let badge: string | null = null;
            if (Store.addBadge(SLUG, "threat-first")) badge = "threat-first";
            if (
                score / scenarios.length >= 0.8 &&
                completed.length >= 3 &&
                Store.addBadge(SLUG, "threat-master")
            )
                badge = "threat-master";

            onComplete({
                score,
                total: scenarios.length,
                badgeId: badge,
                statLine: `SCORE: ${score}/${scenarios.length} · ${completed.length} SCENARIOS`,
            });
        }
    }
</script>

<div class="screen-question">
    <span class="sq-eyebrow"
        >SCENARIO {current + 1} OF {scenarios.length} · {scenarios[
            current
        ].title.toUpperCase()}</span
    >
    <div class="brief-box">
        <span class="brief-label">INCIDENT BRIEF</span>
        <p class="brief-text">{scenarios[current].brief}</p>
    </div>
    <div class="indicators">
        <span class="ind-label">INDICATORS</span>
        {#each scenarios[current].indicators as ind}
            <span class="ind-item">• {ind}</span>
        {/each}
    </div>

    <h2 class="sq-question">Who is behind this?</h2>

    <div class="sq-options">
        {#each scenarios[current].profiles as p, i}
            <button
                class="sq-option"
                class:correct={revealed && p.correct}
                class:wrong={revealed && i === selected && !p.correct}
                disabled={revealed}
                onclick={() => handleSelect(i)}>{p.label}</button
            >
        {/each}
    </div>

    {#if revealed}
        <div class="sq-reveal visible">
            <p class="sq-reveal-text">
                <strong
                    >{scenarios[current].profiles[selected]?.correct
                        ? "✓ Correct"
                        : "✗ Incorrect"}</strong
                >
                — {scenarios[current].profiles[selected]?.explanation}
            </p>
        </div>
        <button class="sq-continue visible" onclick={handleContinue}
            >{current < scenarios.length - 1
                ? "NEXT SCENARIO →"
                : "SEE RESULTS →"}</button
        >
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
    .brief-box {
        background: #07090f;
        border: 1px solid #171b30;
        padding: 20px;
        border-radius: 4px;
        margin-bottom: 16px;
    }
    .brief-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #e05c20;
        display: block;
        margin-bottom: 8px;
    }
    .brief-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.7;
        margin: 0;
    }
    .indicators {
        margin-bottom: 20px;
    }
    .ind-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .ind-item {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        display: block;
        margin-bottom: 4px;
    }
    .sq-question {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(22px, 3.5vw, 28px);
        color: #edf0ff;
        line-height: 1.15;
        margin: 0 0 20px 0;
    }
    .sq-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .sq-option {
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
        transition: border-color 0.15s;
    }
    .sq-option:hover:not(:disabled) {
        border-color: var(--game-accent, #e05c20);
        color: #edf0ff;
    }
    .sq-option.correct {
        border-color: #18c96a;
        color: #18c96a;
        background: rgba(24, 201, 106, 0.06);
    }
    .sq-option.wrong {
        border-color: #e05c20;
        color: #e05c20;
        background: rgba(224, 92, 32, 0.06);
    }
    .sq-option:disabled {
        cursor: default;
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
    .sq-reveal-text strong {
        color: #edf0ff;
        font-weight: 400;
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
