<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

    const games = [
        {
            status: "LIVE",
            category: "LINUX · OS",
            name: "Linux Terminal Labyrinth",
            desc: "Navigate a virtual filesystem using only command-line tools. Real commands, real structure. The labyrinth gets deeper the more you explore.",
            difficulty: 3,
            diffLabel: "INTERMEDIATE",
            tools: ["cd", "ls", "sudo", "chmod", "grep", "find"],
            cta: "LAUNCH LAB →",
            href: "/simulations/linux-labyrinth",
        },
        {
            status: "LIVE",
            category: "NETWORK · CTI",
            name: "Packet Hunter",
            desc: "A malicious actor is in the network. The evidence is in the traffic. Analyse packet captures and identify the attack vector before the simulation ends.",
            difficulty: 4,
            diffLabel: "ADVANCED",
            tools: ["Wireshark", "tcpdump", "PCAP analysis"],
            cta: "LAUNCH LAB →",
            href: "/simulations/packet-hunter",
        },
        {
            status: "LIVE",
            category: "SOC · INCIDENT RESPONSE",
            name: "Incident Zero",
            desc: "An alert fires at 03:00. Walk through the incident response lifecycle in real time — triage, containment, eradication, lessons learned. Time matters.",
            difficulty: 3,
            diffLabel: "INTERMEDIATE",
            tools: ["SIEM", "Playbooks", "Log analysis"],
            cta: "LAUNCH LAB →",
            href: "/simulations/incident-zero",
        },
        {
            status: "BETA",
            category: "OSINT · SOCIAL ENGINEERING",
            name: "Social Vector",
            desc: "Identify the phishing attempt hidden in a realistic email chain. Spot the social engineering indicators before the simulated employee clicks.",
            difficulty: 2,
            diffLabel: "BEGINNER",
            tools: ["Email analysis", "Header inspection", "OSINT"],
            cta: "LAUNCH BETA →",
            href: "/simulations/social-vector",
        },
        {
            status: "BETA",
            category: "CTI · THREAT INTEL",
            name: "Threat Map",
            desc: "Given a set of indicators of compromise, identify the threat actor group, map their known infrastructure, and produce a one-paragraph threat brief.",
            difficulty: 4,
            diffLabel: "ADVANCED",
            tools: ["IoC analysis", "MITRE ATT&CK", "Threat profiling"],
            cta: "LAUNCH BETA →",
            href: "/simulations/threat-map",
        },
        {
            status: "LIVE",
            category: "STRATEGY · GAME THEORY",
            name: "The Board",
            desc: "Variable-sum game scenarios drawn from real security decision-making. Attacker and defender make simultaneous decisions with incomplete information. Understand the structure of adversarial choice before you face it in practice.",
            difficulty: 3,
            diffLabel: "INTERMEDIATE",
            tools: ["Game theory", "Risk analysis", "Decision matrices"],
            cta: "SEE THE BOARD →",
            href: "/simulations/the-board",
        },
        {
            status: "COMING SOON",
            category: "PENTEST · RED TEAM",
            name: "Red Cell",
            desc: "A full-scope simulation. Target profile provided. Your task: initial access, lateral movement, flag capture. Built on actual red team methodology.",
            difficulty: 5,
            diffLabel: "EXPERT",
            tools: ["Nmap", "Burp Suite", "Metasploit", "AD attacks"],
            cta: "NOTIFYING SOON",
            href: null,
        },
    ];

    function getStatusClass(status: string) {
        if (status === "LIVE") return "live";
        if (status === "BETA") return "beta";
        return "soon";
    }
</script>

<svelte:head>
    <title>Training Labs | Resources | Progeta Technologies</title>
    <meta
        name="description"
        content="Six training simulations built around real tools. Linux terminal navigation, network packet analysis, social engineering detection, incident response triage."
    />
</svelte:head>

<!-- ═══════ HERO ═══════ -->
<section class="game-hero">
    <div class="game-container">
        <div class="game-hero-content">
            <span class="game-eyebrow">TRAINING LABS · RESOURCES</span>
            <h1 class="game-heading">No stakes.<br />Real skills.</h1>
            <p class="game-body">
                Seven training simulations built around real tools. Linux
                terminal navigation, network packet analysis, social engineering
                detection, incident response triage. Enter. Make mistakes.
                Learn. Leave better.
            </p>
            <div class="game-ctas">
                <button
                    class="ghost-btn ghost-btn--ember"
                    onclick={() =>
                        document
                            .getElementById("grid")
                            ?.scrollIntoView({ behavior: "smooth" })}
                >
                    VIEW ALL LABS →
                </button>
                <button
                    class="ghost-btn ghost-btn--tertiary"
                    onclick={() =>
                        document
                            .getElementById("about")
                            ?.scrollIntoView({ behavior: "smooth" })}
                >
                    What qualifies as a lab? →
                </button>
            </div>
        </div>
    </div>
</section>

<!-- ═══════ LAB STATS ═══════ -->
<section class="game-stats-sec">
    <div class="game-container">
        <ScrollReveal>
            <div class="lab-stats">
                <div class="lab-stat">
                    <span class="lab-stat-num">7</span>
                    <span class="lab-stat-label">ACTIVE LABS</span>
                </div>
                <div class="lab-stat">
                    <span class="lab-stat-num">4</span>
                    <span class="lab-stat-label">LIVE SIMS</span>
                </div>
                <div class="lab-stat">
                    <span class="lab-stat-num">12</span>
                    <span class="lab-stat-label">MODULES COVERED</span>
                </div>
                <div class="lab-stat">
                    <span class="lab-stat-num">0</span>
                    <span class="lab-stat-label">ACCOUNTS REQUIRED</span>
                </div>
            </div>
        </ScrollReveal>
    </div>
</section>

<!-- ═══════ GAME GRID ═══════ -->
<section class="game-grid-sec" id="grid">
    <div class="game-container">
        <ScrollReveal>
            <span class="grid-eyebrow">AVAILABLE NOW</span>
            <div class="game-grid">
                {#each games as game}
                    <svelte:element
                        this={game.href ? "a" : "div"}
                        href={game.href}
                        class="game-card"
                    >
                        <div class="game-card-header">
                            <span class="game-category">{game.category}</span>
                            <span
                                class="game-status {getStatusClass(
                                    game.status,
                                )}"
                            >
                                {game.status}
                            </span>
                        </div>

                        <h3 class="game-name">{game.name}</h3>
                        <p class="game-desc">{game.desc}</p>

                        <div class="game-difficulty">
                            {#each Array(5) as _, i}
                                <div
                                    class="diff-dot {i < game.difficulty
                                        ? 'filled'
                                        : 'empty'}"
                                ></div>
                            {/each}
                            <span class="diff-label">{game.diffLabel}</span>
                        </div>

                        <div class="game-tools">
                            {#each game.tools as tool}
                                <span class="tool-tag">{tool}</span>
                            {/each}
                        </div>

                        <span class="game-play">{game.cta}</span>
                    </svelte:element>
                {/each}
            </div>
        </ScrollReveal>
    </div>
</section>

<!-- ═══════ ABOUT LABS ═══════ -->
<section class="about-labs-sec" id="about">
    <div class="game-container">
        <ScrollReveal>
            <div class="about-labs-inner">
                <span class="about-eyebrow">ABOUT THE LABS</span>
                <h2 class="about-heading">
                    What these are and what they are not.
                </h2>
                <div class="about-body">
                    <p>
                        These labs are training simulations, not games in the
                        entertainment sense. They use real tools, real
                        methodologies, and real environments. The scenarios are
                        based on actual attack patterns and incident types. They
                        are built to make you better at your work — not to
                        entertain you.
                    </p>
                    <p>
                        No account required. No data collected. Nothing is
                        graded. You either complete the scenario or you don't —
                        and you know which one it was. The only consequence of
                        failure is learning.
                    </p>
                </div>
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .game-container {
        max-width: var(--w-site);
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }

    /* ── HERO ── */
    .game-hero {
        height: 52vh;
        min-height: 480px;
        display: flex;
        align-items: center;
        background: transparent;
        padding-top: var(--sp-20);
        position: relative;
        z-index: 10;
    }
    .game-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: var(--sp-4);
    }
    .game-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(44px, 6.5vw, 72px);
        line-height: 0.93;
        color: var(--ink-1);
        margin: 0;
    }
    .game-body {
        font-family: var(--font-body);
        font-weight: 300;
        font-size: 15px;
        line-height: 1.6;
        color: var(--ink-2);
        max-width: 460px;
        margin-top: 18px;
    }
    .game-ctas {
        margin-top: 32px;
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }
    .ghost-btn {
        background: transparent;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 10px 0;
        cursor: pointer;
        border: none;
        transition: opacity 0.2s ease;
    }
    .ghost-btn:hover {
        opacity: 0.7;
    }
    .ghost-btn--ember {
        color: var(--accent-launchpad);
    }
    .ghost-btn--tertiary {
        color: var(--ink-3);
    }

    /* ── LAB STATS ── */
    .game-stats-sec {
        position: relative;
        z-index: 10;
    }
    .lab-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        background: var(--border-1);
        padding: 0;
    }
    .lab-stat {
        background: var(--surface-1);
        padding: 20px 24px;
        text-align: center;
    }
    .lab-stat-num {
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 28px;
        color: var(--accent-launchpad);
        display: block;
    }
    .lab-stat-label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-top: 4px;
    }

    /* ── GAME GRID ── */
    .game-grid-sec {
        padding: clamp(60px, 8vw, 100px) 0;
        position: relative;
        z-index: 10;
    }
    .grid-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
    }
    .game-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--border-1);
        margin-top: 40px;
    }

    .game-card {
        background: var(--surface-0);
        padding: 28px 26px;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        overflow: hidden;
        transition: background 0.2s ease;
        text-decoration: none;
        color: inherit;
    }
    /* If it's an <a> tag, add pointer, otherwise default */
    a.game-card {
        cursor: pointer;
    }
    a.game-card:hover {
        background: var(--surface-1);
    }

    /* Terminal scanline texture */
    .game-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(255, 255, 255, 0.004) 3px,
            rgba(255, 255, 255, 0.004) 4px
        );
        pointer-events: none;
        z-index: 0;
    }

    /* Ember top sweep on hover for links */
    a.game-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--accent-launchpad);
        transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
        z-index: 2;
    }
    a.game-card:hover::before {
        width: 100%;
    }

    .game-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 14px;
        position: relative;
        z-index: 1;
    }
    .game-category {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-3);
    }
    .game-status {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
    .game-status.live {
        color: var(--accent-innercircle); /* Green */
    }
    .game-status.beta {
        color: var(--accent-selfos); /* Blue */
    }
    .game-status.soon {
        color: var(--ink-4); /* Dim */
    }

    .game-name {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 18px;
        color: var(--ink-1);
        line-height: 1.2;
        margin: 0 0 10px 0;
        position: relative;
        z-index: 1;
    }
    .game-desc {
        font-family: var(--font-body);
        font-weight: 300;
        font-size: 13px;
        line-height: 1.7;
        color: var(--ink-2);
        flex: 1;
        position: relative;
        z-index: 1;
        margin: 0 0 16px 0;
    }

    /* Difficulty dots */
    .game-difficulty {
        display: flex;
        gap: 4px;
        align-items: center;
        margin-bottom: 14px;
        position: relative;
        z-index: 1;
    }
    .diff-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .diff-dot.filled {
        background: var(--accent-launchpad);
    }
    .diff-dot.empty {
        background: var(--ink-4);
    }
    .diff-label {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        color: var(--ink-3);
        margin-left: 8px;
    }

    /* Tool tags */
    .game-tools {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 18px;
        position: relative;
        z-index: 1;
    }
    .tool-tag {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.08em;
        color: var(--ink-4);
        border: 1px solid var(--border-1);
        border-radius: 3px;
        padding: 2px 7px;
    }

    /* Play CTA */
    .game-play {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--accent-launchpad);
        transition: color 0.2s ease;
        position: relative;
        z-index: 1;
    }
    a.game-card:hover .game-play {
        color: #ff7a3d; /* Brighter ember */
    }
    .game-card:not(a) .game-play {
        color: var(--ink-4); /* Coming soon state */
    }

    /* ── ABOUT LABS ── */
    .about-labs-sec {
        padding-bottom: clamp(80px, 12vw, 160px);
        position: relative;
        z-index: 10;
    }
    .about-labs-inner {
        max-width: 680px;
        background: var(--surface-1);
        padding: clamp(32px, 5vw, 64px);
        border: 1px solid var(--border-1);
    }
    .about-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: var(--sp-4);
    }
    .about-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(24px, 3.5vw, 36px);
        line-height: 1.1;
        color: var(--ink-1);
        margin: 0 0 var(--sp-6) 0;
    }
    .about-body {
        font-family: var(--font-body);
        font-weight: 300;
        font-size: 15px;
        line-height: 1.7;
        color: var(--ink-2);
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .about-body p {
        margin: 0;
    }

    @media (max-width: 880px) {
        .game-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .lab-stats {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 520px) {
        .game-hero {
            height: auto;
            min-height: auto;
            padding-top: var(--sp-28);
            padding-bottom: var(--sp-12);
        }
        .game-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
