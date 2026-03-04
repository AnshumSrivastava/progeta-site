<script lang="ts">
    const STORAGE_KEY = "pt-the-breach";

    interface IncidentStep {
        situation: string;
        options: { label: string; feedback: string; points: number }[];
    }

    interface Scenario {
        title: string;
        context: string;
        steps: IncidentStep[];
    }

    interface SessionResult {
        date: string;
        scenarioTitle: string;
        score: number;
        maxScore: number;
    }

    const scenarios: Scenario[] = [
        {
            title: "Compromised Employee Credentials",
            context:
                "Monday 9:14am. Your SIEM alerts show 47 failed login attempts against the admin portal from an IP in a country where you have no employees. At 9:21am, a successful login occurs using a valid employee account. The employee is on holiday.",
            steps: [
                {
                    situation:
                        "A valid employee account has been used from a suspicious location while the employee is on holiday. What is your first action?",
                    options: [
                        {
                            label: "Immediately disable the compromised account",
                            feedback:
                                "Correct. Disabling the account stops the attacker's access immediately. This is containment — the first priority in incident response.",
                            points: 3,
                        },
                        {
                            label: "Email the employee to ask if they logged in",
                            feedback:
                                "Too slow. While verification matters, the attacker has active access right now. Containment comes before investigation.",
                            points: 1,
                        },
                        {
                            label: "Monitor the session to see what the attacker does",
                            feedback:
                                "Risky. While intelligence gathering has value, allowing continued access risks data exfiltration. Contain first, investigate second.",
                            points: 0,
                        },
                    ],
                },
                {
                    situation:
                        "Account disabled. Logs show the attacker accessed three shared drives and downloaded 200MB of files in 7 minutes. What do you investigate next?",
                    options: [
                        {
                            label: "Determine exactly which files were accessed and their sensitivity",
                            feedback:
                                "Correct. Understanding what was taken determines the severity of the breach and whether regulatory notification is required.",
                            points: 3,
                        },
                        {
                            label: "Search for malware on the employee's devices",
                            feedback:
                                "Worth doing eventually, but the employee is on holiday and wasn't the source. The attacker used stolen credentials, not the employee's device.",
                            points: 1,
                        },
                        {
                            label: "Block the attacker's IP address",
                            feedback:
                                "Low value. Attackers rotate IPs. The account is already disabled. Focus on understanding the impact.",
                            points: 0,
                        },
                    ],
                },
                {
                    situation:
                        "The files include customer names, emails, and billing records for 12,000 users. This is personal data. What is the regulatory implication?",
                    options: [
                        {
                            label: "Notify the relevant data protection authority within 72 hours as required by GDPR/equivalent",
                            feedback:
                                "Correct. Personal data breaches involving this volume typically trigger mandatory notification under GDPR (72h), CCPA, or equivalent local law.",
                            points: 3,
                        },
                        {
                            label: "Wait to see if the data surfaces publicly before reporting",
                            feedback:
                                "Dangerous. Regulatory deadlines run from discovery, not from public impact. Waiting risks non-compliance penalties.",
                            points: 0,
                        },
                        {
                            label: "Only notify if customers complain",
                            feedback:
                                "Incorrect. Breach notification obligations are triggered by the breach itself, not by complaints. Proactive reporting is legally required.",
                            points: 0,
                        },
                    ],
                },
                {
                    situation:
                        "The employee's password was found in a credential dump from a third-party breach. The employee used the same password for multiple services. What systemic fix do you implement?",
                    options: [
                        {
                            label: "Enforce MFA on all accounts and reset all employee passwords",
                            feedback:
                                "Correct. MFA prevents credential-stuffing attacks even when passwords are compromised. A forced password reset addresses immediate exposure.",
                            points: 3,
                        },
                        {
                            label: "Send an awareness email reminding staff not to reuse passwords",
                            feedback:
                                "Awareness helps long-term but does not solve the immediate problem. Without MFA, the next leaked password causes the same incident.",
                            points: 1,
                        },
                        {
                            label: "Block the specific IP range from the attack",
                            feedback:
                                "IP blocking is trivially bypassed. The root cause is credential reuse without MFA. Address the root cause.",
                            points: 0,
                        },
                    ],
                },
            ],
        },
        {
            title: "Ransomware on Internal Network",
            context:
                "Wednesday 2:30am. Your overnight monitoring team reports that file shares across three departments are being encrypted. Filenames are changing to .locked extensions. A ransom note appears demanding 50 BTC.",
            steps: [
                {
                    situation:
                        "Active ransomware is encrypting files across multiple departments. What is your immediate priority?",
                    options: [
                        {
                            label: "Isolate affected systems from the network to prevent spread",
                            feedback:
                                "Correct. Network isolation (disconnecting infected machines, segmenting VLANs) stops lateral movement. Every minute of delay means more encrypted files.",
                            points: 3,
                        },
                        {
                            label: "Start paying the ransom to minimise damage",
                            feedback:
                                "Paying immediately is not recommended. There is no guarantee the attacker will provide decryption keys, and it funds future attacks.",
                            points: 0,
                        },
                        {
                            label: "Begin investigating how the ransomware entered the network",
                            feedback:
                                "Investigation matters, but not while encryption is actively spreading. Contain first, then investigate.",
                            points: 1,
                        },
                    ],
                },
                {
                    situation:
                        "Systems isolated. Three departments affected. Executive team asks: should we pay the ransom?",
                    options: [
                        {
                            label: "No — check backup integrity first and assess restoration capability",
                            feedback:
                                "Correct. The decision to pay should only happen after confirming backups cannot restore systems. If backups are intact, recovery without payment is possible.",
                            points: 3,
                        },
                        {
                            label: "Yes — business continuity is more important than principle",
                            feedback:
                                "Pragmatic but premature. Without assessing backups first, you may pay unnecessarily. Payment also offers no guarantee of recovery.",
                            points: 1,
                        },
                        {
                            label: "Report to law enforcement and wait for their guidance",
                            feedback:
                                "Reporting is correct, but waiting passively is not. Begin parallel assessment of backups and restoration while law enforcement is engaged.",
                            points: 1,
                        },
                    ],
                },
                {
                    situation:
                        "Backups exist but the most recent is 48 hours old. Some departments will lose two days of work. How do you proceed?",
                    options: [
                        {
                            label: "Restore from backups, accept 48-hour data loss, and document lessons learned",
                            feedback:
                                "Correct. 48 hours of data loss is significant but recoverable. Restoration from known-good backups is safer and faster than trusting attacker-provided decryption.",
                            points: 3,
                        },
                        {
                            label: "Pay the ransom to recover the last 48 hours of data",
                            feedback:
                                "Paying for 48 hours of data is a disproportionate risk. The ransom cost, reputational damage, and lack of guarantee make this a poor trade.",
                            points: 0,
                        },
                        {
                            label: "Attempt to decrypt the files using online decryption tools",
                            feedback:
                                "Worth trying — some ransomware strains have known decryptors. But this should not delay restoration from backups. Try in parallel.",
                            points: 2,
                        },
                    ],
                },
                {
                    situation:
                        "Post-incident: your team finds the ransomware entered via a phishing email to an account without MFA. What structural change do you implement?",
                    options: [
                        {
                            label: "Mandatory MFA, improved email filtering, and regular backup verification drills",
                            feedback:
                                "Comprehensive and correct. MFA prevents credential compromise, email filtering reduces phishing success, and backup verification ensures recovery capability.",
                            points: 3,
                        },
                        {
                            label: "Fire the employee who clicked the phishing link",
                            feedback:
                                "Punishing individuals does not fix systemic failures. The absence of MFA and email filtering were organisational failures, not personal ones.",
                            points: 0,
                        },
                        {
                            label: "Purchase cyber insurance",
                            feedback:
                                "Insurance transfers financial risk but does not reduce technical risk. It should supplement, not replace, security controls.",
                            points: 1,
                        },
                    ],
                },
            ],
        },
    ];

    function loadResults(): SessionResult[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveResults(r: SessionResult[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
    }

    let results = $state(loadResults());
    let scenarioIndex = $state(0);
    let stepIndex = $state(0);
    let score = $state(0);
    let choices = $state<number[]>([]);
    let showFeedback = $state(false);
    let sessionDone = $state(false);

    const scenario = $derived(scenarios[scenarioIndex]);
    const currentStep = $derived(scenario.steps[stepIndex]);
    const maxScore = $derived(scenario.steps.length * 3);

    function handleChoice(idx: number) {
        if (showFeedback) return;
        choices = [...choices, idx];
        score += currentStep.options[idx].points;
        showFeedback = true;
    }

    function handleNext() {
        if (stepIndex < scenario.steps.length - 1) {
            stepIndex++;
            showFeedback = false;
        } else {
            sessionDone = true;
            const r: SessionResult = {
                date: new Date().toISOString().slice(0, 10),
                scenarioTitle: scenario.title,
                score,
                maxScore,
            };
            results = [r, ...results];
            saveResults(results);
        }
    }

    function startScenario(idx: number) {
        scenarioIndex = idx;
        stepIndex = 0;
        score = 0;
        choices = [];
        showFeedback = false;
        sessionDone = false;
    }
</script>

<svelte:head>
    <title>The Breach — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Incident response scenarios where every decision counts. Handle real-world breaches step by step."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>

    <header class="game-header">
        <span class="domain-badge">CYBERSECURITY</span>
        <h1 class="game-title">The Breach</h1>
        <p class="game-sub">
            The alarm has gone off. What you do in the next sixty minutes
            defines everything.
        </p>
    </header>

    {#if !sessionDone}
        <!-- Scenario selector -->
        <div class="scenario-nav">
            {#each scenarios as s, i}
                <button
                    class="scenario-btn"
                    class:active={scenarioIndex === i}
                    onclick={() => startScenario(i)}>{s.title}</button
                >
            {/each}
        </div>

        <section class="scenario-card">
            <span class="scenario-label">SCENARIO BRIEFING</span>
            <p class="scenario-context">{scenario.context}</p>
        </section>

        <section class="step-sec">
            <div class="step-progress">
                <span class="step-counter"
                    >STEP {stepIndex + 1}/{scenario.steps.length}</span
                >
                <span class="step-score">SCORE {score}/{maxScore}</span>
            </div>

            <p class="step-situation">{currentStep.situation}</p>

            <div class="step-options">
                {#each currentStep.options as opt, i}
                    <button
                        class="step-opt"
                        class:selected={choices[stepIndex] === i}
                        disabled={showFeedback}
                        onclick={() => handleChoice(i)}>{opt.label}</button
                    >
                {/each}
            </div>

            {#if showFeedback}
                <div class="feedback-box">
                    <span class="feedback-points"
                        >+{currentStep.options[choices[stepIndex]].points} POINTS</span
                    >
                    <p class="feedback-text">
                        {currentStep.options[choices[stepIndex]].feedback}
                    </p>
                </div>
                <button class="next-btn" onclick={handleNext}
                    >{stepIndex < scenario.steps.length - 1
                        ? "NEXT STEP →"
                        : "SEE RESULTS →"}</button
                >
            {/if}
        </section>
    {:else}
        <section class="results-sec">
            <h2 class="results-score">{score}/{maxScore}</h2>
            <p class="results-sub">
                incident response score for "{scenario.title}"
            </p>
            <div class="scenario-btns">
                {#each scenarios as s, i}
                    <button class="retry-btn" onclick={() => startScenario(i)}
                        >PLAY: {s.title.toUpperCase()}</button
                    >
                {/each}
            </div>
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

    .scenario-nav {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    .scenario-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 8px 14px;
        border-radius: 2px;
        cursor: pointer;
    }
    .scenario-btn.active {
        border-color: #e05c20;
        color: #edf0ff;
    }

    .scenario-card {
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 16px 20px;
        margin-bottom: 20px;
    }
    .scenario-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e05c20;
        display: block;
        margin-bottom: 8px;
    }
    .scenario-context {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.65;
        margin: 0;
    }

    .step-progress {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    .step-counter,
    .step-score {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .step-situation {
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #edf0ff;
        line-height: 1.5;
        margin: 0 0 16px 0;
    }

    .step-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .step-opt {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 12px 16px;
        border-radius: 3px;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s;
    }
    .step-opt:not(:disabled):hover {
        border-color: #424870;
    }
    .step-opt.selected {
        border-color: #e05c20;
        color: #edf0ff;
    }
    .step-opt:disabled {
        cursor: default;
    }

    .feedback-box {
        margin-top: 16px;
        padding: 14px 16px;
        border-left: 2px solid #e05c20;
        background: #07090f;
    }
    .feedback-points {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #e05c20;
        display: block;
        margin-bottom: 4px;
    }
    .feedback-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.6;
        margin: 0;
    }

    .next-btn {
        margin-top: 16px;
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
    .scenario-btns {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }
    .retry-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        background: transparent;
        border: 1px solid #424870;
        padding: 10px 20px;
        border-radius: 2px;
        cursor: pointer;
    }
</style>
