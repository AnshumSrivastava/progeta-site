<script>
    import { page } from "$app/stores";
    import { events } from "$lib/content/events";

    $: id = parseInt($page.params.id || "0");
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
    <title>Progeta Technologies | {event ? event.title : "Event Details"}</title
    >
</svelte:head>

{#if event}
    <div class="dashboard-container" style="padding-top:2rem;">
        <div class="section-header">
            <h1 style="margin:0; font-size:2.5rem;">{event.title}</h1>
            <span class="sys-code"
                >COMMUNITY EVENT <span style="color:var(--accent-primary)"
                    >//</span
                >
                {event.type.toUpperCase()}</span
            >
        </div>

        <div class="dashboard-panel" style="margin-bottom: 2rem;">
            <div class="panel-title"><span>EVENT OVERVIEW</span></div>
            <p
                style="font-size:1.3rem; line-height:1.6; color:var(--text-primary);"
            >
                {event.description || "No description available."}
            </p>
        </div>

        <div class="module-dashboard">
            <!-- Left: Protocol Flow -->
            <div class="dashboard-panel">
                <div class="panel-title">
                    <span>OPERATIONAL TIMELINE</span> <span>[FLOW]</span>
                </div>
                <div class="event-protocol">
                    {#each protocol as step}
                        <div class="protocol-step">
                            <span class="step-time">{step.time} HOURS</span>
                            <h4 class="step-title">{step.task}</h4>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Right: Directives -->
            <div class="dashboard-panel">
                <div class="panel-title">
                    <span>MISSION DIRECTIVES</span> <span>[PRE-REQS]</span>
                </div>
                <div class="directive-panel">
                    <ul class="suggestion-list">
                        {#each suggestions as s}
                            <li>{s}</li>
                        {/each}
                    </ul>
                </div>

                <div class="panel-title" style="margin-top:2rem;">
                    <span>LOGISTICS</span>
                </div>
                <div class="meta-item">
                    <span
                        style="font-family:var(--font-mono); color:var(--text-tertiary); font-size:0.8rem; margin-right: 1rem;"
                        >LOCATION</span
                    ><span>Main HQ, Sector 7</span>
                </div>
                <div class="meta-item">
                    <span
                        style="font-family:var(--font-mono); color:var(--text-tertiary); font-size:0.8rem; margin-right: 1rem;"
                        >ACCESS LEVEL</span
                    ><span>Public / Student</span>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div style="padding:4rem; text-align:center;">
        <h1>EVENT NOT FOUND</h1>
        <p>The requested event is invalid.</p>
        <a href="/events" class="cta-btn">RETURN TO CALENDAR</a>
    </div>
{/if}
