<script>
    import { page } from "$app/stores";
    import { events } from "$lib/content/events";
    import { reveal, tilt } from "$lib/ui/actions";

    $: id = parseInt($page.params.id);
    $: event = events[id];

    // Simulate flow logic from app.js
    $: isTech = event ? event.type === "Technical Events" : false;

    $: protocol = isTech
        ? [
              { time: "09:00", task: "System Check & Environment Setup" },
              { time: "09:30", task: "Mission Briefing" },
              { time: "10:00", task: "Live Execution Phase" },
              { time: "13:00", task: "Tactical De-brief & Analysis" },
          ]
        : [
              { time: "18:00", task: "Doors Open & Check-In" },
              { time: "18:30", task: "Keynote Session" },
              { time: "19:15", task: "Interactive Workshop / Mixer" },
              { time: "20:30", task: "Closing Remarks & Networking" },
          ];

    $: suggestions = isTech
        ? [
              "Bring a laptop with Kali Linux or generic VM installed.",
              "Ensure generic pen-testing tools are updated (Nmap, Wireshark).",
              "Review the Code of Conduct regarding active scanning.",
          ]
        : [
              "Bring business cards or digital contact info.",
              "Prepare a 30-second elevator pitch about your current projects.",
              "Open mind required; participate in group discussions.",
          ];
</script>

<svelte:head>
    <title>{event ? event.title : "Event Details"} | Progeta Technologies</title
    >
</svelte:head>

{#if event}
    <section class="page-header">
        <div class="container">
            <a href="/events" class="back-link" use:reveal={{ duration: 400 }}>
                &larr; RETURN TO INTELLIGENCE
            </a>

            <div class="header-content">
                <span class="type-badge" use:reveal={{ delay: 100 }}
                    >{event.type}</span
                >
                <h1 use:reveal={{ delay: 200 }}>{event.title}</h1>
                <div class="meta-row" use:reveal={{ delay: 300 }}>
                    <span class="meta-item">
                        <span class="status-indicator"></span>
                        SCHEDULED EVENT
                    </span>
                    <span class="divider"></span>
                    <span class="meta-item">SECTOR 7 HQ</span>
                </div>
            </div>
        </div>
    </section>

    <div class="container main-content">
        <div class="layout-grid">
            <!-- Left Column: Event Intel -->
            <div class="main-column">
                <div class="content-card" use:reveal={{ delay: 400 }}>
                    <div class="card-header">
                        <span class="icon">⚡</span>
                        <h2>Event Overview</h2>
                    </div>

                    <p class="description-text">
                        {event.description ||
                            "Join us for an immersive session designed to expand your operational capabilities. Experts from the field will guide you through practical scenarios and real-world applications."}
                    </p>
                </div>

                <div class="content-card" use:reveal={{ delay: 500 }}>
                    <div class="card-header">
                        <span class="icon">⏱️</span>
                        <h2>Operational Timeline</h2>
                    </div>

                    <div class="timeline">
                        {#each protocol as step}
                            <div class="timeline-step">
                                <span class="time">{step.time}</span>
                                <div class="step-content">
                                    <span class="task">{step.task}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Right Column: Directives -->
            <div class="sidebar-column">
                <div
                    class="content-card directives-card"
                    use:reveal={{ delay: 600 }}
                >
                    <div class="card-header">
                        <span class="icon">📋</span>
                        <h2>Pre-Requisites</h2>
                    </div>
                    <p class="subtitle">Mandatory preparation for attendees.</p>

                    <ul class="checklist">
                        {#each suggestions as s}
                            <li class="check-item">
                                <span class="check-icon">✓</span>
                                <span>{s}</span>
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="cta-card" use:reveal={{ delay: 700 }} use:tilt>
                    <h3>Secure Your Spot</h3>
                    <p>Capacity is limited. Confirm your attendance now.</p>
                    <button class="register-btn">REGISTER FOR EVENT</button>
                    <p class="terms">
                        By registering, you agree to the NDA and safety
                        protocols.
                    </p>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="not-found">
        <h1>EVENT NOT FOUND</h1>
        <p>The requested event is invalid.</p>
        <a href="/events" class="btn">RETURN TO CALENDAR</a>
    </div>
{/if}

<style>
    .page-header {
        padding: 160px 0 80px;
        background: linear-gradient(
            to bottom,
            rgba(16, 185, 129, 0.05) 0%,
            transparent 100%
        );
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .back-link {
        display: inline-block;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-tertiary);
        text-decoration: none;
        margin-bottom: 2rem;
        transition: color 0.3s;
        letter-spacing: 0.05em;
    }
    .back-link:hover {
        color: var(--accent-emerald);
    }

    .type-badge {
        display: inline-block;
        font-family: var(--font-mono);
        color: var(--accent-emerald);
        border: 1px solid rgba(16, 185, 129, 0.3);
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
        background: rgba(16, 185, 129, 0.05);
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        line-height: 1.1;
        background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.7));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .meta-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-secondary);
    }

    .status-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: var(--accent-emerald);
        border-radius: 50%;
        margin-right: 8px;
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }

    .divider {
        width: 1px;
        height: 16px;
        background: rgba(255, 255, 255, 0.1);
    }

    .main-content {
        padding-top: 60px;
        padding-bottom: 120px;
    }

    .layout-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }

    .content-card {
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 2.5rem;
        margin-bottom: 2rem;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding-bottom: 1rem;
    }

    .card-header h2 {
        font-size: 1.5rem;
        margin: 0;
        color: #fff;
    }

    .icon {
        font-size: 1.5rem;
    }

    .description-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--text-secondary);
    }

    /* Timeline */
    .timeline {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        padding-left: 2rem;
        margin-left: 1rem;
    }

    .timeline-step {
        position: relative;
    }

    .timeline-step::before {
        content: "";
        position: absolute;
        left: -2.35rem; /* Adjust based on padding/border */
        top: 6px;
        width: 10px;
        height: 10px;
        background: var(--bg-void);
        border: 2px solid var(--accent-emerald);
        border-radius: 50%;
    }

    .time {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-tertiary);
        margin-bottom: 0.25rem;
    }

    .task {
        font-size: 1rem;
        color: var(--text-primary);
        font-weight: 500;
    }

    /* Checklist */
    .subtitle {
        color: var(--text-tertiary);
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }

    .checklist {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .check-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--text-secondary);
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
    }
    .check-item:last-child {
        margin-bottom: 0;
    }

    .check-icon {
        color: var(--accent-emerald);
        font-weight: bold;
    }

    /* CTA Card */
    .cta-card {
        background: linear-gradient(
            135deg,
            rgba(16, 185, 129, 0.1) 0%,
            rgba(16, 185, 129, 0.05) 100%
        );
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
    }
    .cta-card h3 {
        color: #fff;
        margin-bottom: 0.5rem;
    }
    .cta-card p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }

    .register-btn {
        width: 100%;
        background: #fff;
        color: #000;
        border: none;
        padding: 1rem;
        font-weight: 700;
        font-size: 0.9rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 1rem;
    }
    .register-btn:hover {
        background: var(--accent-emerald);
        color: #fff;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
    }

    .terms {
        font-size: 0.7rem !important;
        color: var(--text-tertiary) !important;
        margin-bottom: 0 !important;
    }

    /* Not Found */
    .not-found {
        padding: 8rem 0;
        text-align: center;
    }
    .btn {
        display: inline-block;
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
    }

    @media (max-width: 900px) {
        .layout-grid {
            grid-template-columns: 1fr;
        }
        h1 {
            font-size: 2rem;
        }
        .header-content {
            text-align: center;
        }
        .meta-row {
            justify-content: center;
        }
        .page-header {
            padding: 120px 0 60px;
        }
    }
</style>
