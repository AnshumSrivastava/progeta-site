<script lang="ts">
    const STORAGE_KEY = "pt-threat-profile";

    interface ProfileScenario {
        title: string;
        indicators: string[];
        profiles: { label: string; description: string }[];
        correctIndex: number;
        explanation: string;
    }

    const scenarioSets: ProfileScenario[] = [
        {
            title: "The Targeted Intrusion",
            indicators: [
                "Phishing emails sent to 3 specific executives using personal information",
                "Custom malware not detected by any antivirus engine",
                "Command-and-control traffic disguised as HTTPS to a legitimate-looking domain",
                "Data exfiltration occurred over 6 months without triggering alerts",
                "The target was a defence contractor",
            ],
            profiles: [
                {
                    label: "Script Kiddie",
                    description: "Low-skill attacker using pre-made tools",
                },
                {
                    label: "Advanced Persistent Threat (APT)",
                    description: "State-sponsored, well-resourced, persistent",
                },
                {
                    label: "Hacktivist",
                    description: "Ideologically motivated, public disruption",
                },
            ],
            correctIndex: 1,
            explanation:
                "Spear phishing with personal info, custom malware, 6-month persistence, and a defence contractor target are hallmarks of an APT — likely state-sponsored espionage. Script kiddies lack this sophistication, and hacktivists seek publicity, not stealth.",
        },
        {
            title: "The Defacement",
            indicators: [
                "Company website replaced with a political message",
                "Attack timed to coincide with a global summit",
                "No data was stolen or encrypted",
                "Attack method was SQL injection on an unpatched CMS",
                "The group publicly claimed responsibility on social media",
            ],
            profiles: [
                {
                    label: "Insider Threat",
                    description: "Current or former employee with access",
                },
                {
                    label: "Ransomware Group",
                    description:
                        "Financially motivated, encrypts data for payment",
                },
                {
                    label: "Hacktivist",
                    description: "Ideologically motivated, public disruption",
                },
            ],
            correctIndex: 2,
            explanation:
                "Public defacement with a political message, timed to a global event, with the group claiming responsibility publicly — this is textbook hacktivism. No financial motive rules out ransomware, and the external attack method rules out insider threat.",
        },
        {
            title: "The Financial Heist",
            indicators: [
                "Attackers compromised the SWIFT terminal at a bank",
                "Fraudulent transfer orders sent during off-hours",
                "The attack was preceded by months of reconnaissance",
                "Malware was customised for the specific banking software",
                "Similar attacks attributed to a known nation-state group",
            ],
            profiles: [
                {
                    label: "Cybercriminal Gang",
                    description: "Organised crime, financially motivated",
                },
                {
                    label: "State-Sponsored APT",
                    description: "Nation-state backed with specific objectives",
                },
                {
                    label: "Disgruntled Employee",
                    description: "Insider with grievance and access",
                },
            ],
            correctIndex: 1,
            explanation:
                "SWIFT compromise, custom malware for specific banking software, months-long reconnaissance, and attribution to a known nation-state group point to state-sponsored activity. This pattern matches the Lazarus Group's operations against financial institutions.",
        },
        {
            title: "The Data Broker",
            indicators: [
                "Millions of user records appear for sale on a dark web marketplace",
                "The records include usernames, hashed passwords, and email addresses",
                "The breach was discovered by a third-party researcher, not the company",
                "The attacker exploited a known vulnerability that had a patch available",
                "No ransom demand was made",
            ],
            profiles: [
                {
                    label: "Opportunistic Cybercriminal",
                    description: "Exploits known vulnerabilities for profit",
                },
                {
                    label: "APT Group",
                    description: "State-sponsored, targeting specific data",
                },
                {
                    label: "Hacktivist",
                    description: "Ideologically motivated, public disruption",
                },
            ],
            correctIndex: 0,
            explanation:
                "Exploiting a known, patchable vulnerability to steal bulk user data for dark web sale is classic opportunistic cybercrime. APTs target specific data with custom tools, and hacktivists publicise breaches rather than selling data quietly.",
        },
    ];

    let currentScenario = $state(0);
    let selected = $state<number | null>(null);
    let revealed = $state(false);
    let score = $state(0);
    let done = $state(false);

    function handleSelect(idx: number) {
        if (!revealed) {
            selected = idx;
        }
    }
    function handleReveal() {
        if (selected === null) return;
        revealed = true;
        if (selected === scenarioSets[currentScenario].correctIndex) score++;
    }
    function handleNext() {
        if (currentScenario < scenarioSets.length - 1) {
            currentScenario++;
            selected = null;
            revealed = false;
        } else {
            done = true;
        }
    }
    function restart() {
        currentScenario = 0;
        selected = null;
        revealed = false;
        score = 0;
        done = false;
    }
</script>

<svelte:head>
    <title>Threat Profile — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Analyse indicators of compromise and determine the type of threat actor behind each attack scenario."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>
    <header class="game-header">
        <span class="domain-badge">CYBERSECURITY</span>
        <h1 class="game-title">Threat Profile</h1>
        <p class="game-sub">
            The evidence tells a story. Your job is to read it.
        </p>
    </header>

    {#if !done}
        <div class="progress-bar">
            <span class="progress-text"
                >{currentScenario + 1}/{scenarioSets.length}</span
            >
        </div>
        <section class="scenario-card">
            <h2 class="scenario-title">
                {scenarioSets[currentScenario].title}
            </h2>
            <div class="indicators">
                <span class="ind-label">INDICATORS</span>
                <ul class="ind-list">
                    {#each scenarioSets[currentScenario].indicators as ind}<li>
                            {ind}
                        </li>{/each}
                </ul>
            </div>
            <div class="profiles">
                <span class="prof-label">WHO IS BEHIND THIS?</span>
                {#each scenarioSets[currentScenario].profiles as prof, i}
                    <button
                        class="prof-btn"
                        class:selected={selected === i}
                        class:correct={revealed &&
                            i === scenarioSets[currentScenario].correctIndex}
                        class:wrong={revealed &&
                            selected === i &&
                            i !== scenarioSets[currentScenario].correctIndex}
                        onclick={() => handleSelect(i)}
                        disabled={revealed}
                    >
                        <strong>{prof.label}</strong> — {prof.description}
                    </button>
                {/each}
            </div>
            {#if !revealed}<button
                    class="action-btn"
                    disabled={selected === null}
                    onclick={handleReveal}>PROFILE →</button
                >{/if}
            {#if revealed}
                <div class="explain-box">
                    <span class="explain-label"
                        >{selected ===
                        scenarioSets[currentScenario].correctIndex
                            ? "✓ CORRECT"
                            : "✗ INCORRECT"}</span
                    >
                    <p>{scenarioSets[currentScenario].explanation}</p>
                </div>
                <button class="action-btn" onclick={handleNext}
                    >{currentScenario < scenarioSets.length - 1
                        ? "NEXT SCENARIO →"
                        : "RESULTS →"}</button
                >
            {/if}
        </section>
    {:else}
        <section class="results-sec">
            <h2 class="results-score">{score}/{scenarioSets.length}</h2>
            <p class="results-sub">threat actors correctly profiled.</p>
            <button class="action-btn" onclick={restart}>PLAY AGAIN →</button>
        </section>
    {/if}
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
    .progress-bar {
        margin-bottom: 16px;
    }
    .progress-text {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .scenario-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: clamp(20px, 3vw, 32px);
    }
    .scenario-title {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 18px;
        color: #edf0ff;
        margin: 0 0 16px 0;
    }
    .ind-label,
    .prof-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .ind-list {
        list-style: none;
        padding: 0;
        margin: 0 0 20px 0;
    }
    .ind-list li {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        padding: 6px 0;
        border-bottom: 1px solid #0f1220;
        line-height: 1.5;
    }
    .ind-list li::before {
        content: "→ ";
        color: #424870;
    }
    .profiles {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
    }
    .prof-btn {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        background: #03040a;
        border: 1px solid #0f1220;
        padding: 12px 16px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s;
    }
    .prof-btn:not(:disabled):hover {
        border-color: #424870;
    }
    .prof-btn.selected {
        border-color: #e05c20;
        color: #edf0ff;
    }
    .prof-btn.correct {
        border-color: #18c96a;
    }
    .prof-btn.wrong {
        border-color: #e05c20;
    }
    .prof-btn:disabled {
        cursor: default;
    }
    .action-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #e05c20;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
    }
    .action-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }
    .explain-box {
        margin: 16px 0;
        padding: 14px 16px;
        border-left: 2px solid #424870;
    }
    .explain-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #18c96a;
        display: block;
        margin-bottom: 4px;
    }
    .explain-box p {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.6;
        margin: 0;
    }
    .results-sec {
        text-align: center;
        padding: 60px 0;
    }
    .results-score {
        font-family: "DM Mono", monospace;
        font-weight: 700;
        font-size: 48px;
        color: #edf0ff;
        margin: 0 0 8px 0;
    }
    .results-sub {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #424870;
        margin: 0 0 24px 0;
    }
</style>
