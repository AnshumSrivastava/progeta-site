<script>
    import { events } from "$lib/content/events";
    import { reveal, tilt } from "$lib/ui/actions";

    // Map events to include their original index for correct routing
    const mappedEvents = events.map((e, i) => ({ ...e, originalIndex: i }));

    const techEvents = mappedEvents.filter(
        (e) => e.type === "Technical Events",
    );
    const careerEvents = mappedEvents.filter(
        (e) => e.type !== "Technical Events",
    );
</script>

<svelte:head>
    <title>Events | Progeta Technologies</title>
</svelte:head>

<section class="page-header">
    <div class="container">
        <h1 use:reveal>Live Intelligence.</h1>
        <p use:reveal={{ delay: 200 }}>
            Engage with the collective. Real-time knowledge transfer events.
        </p>
    </div>
</section>

<div class="container main-content">
    <!-- TECH SECTION -->
    <section class="event-group" use:reveal={{ delay: 300 }}>
        <div class="group-header">
            <span class="icon">⚡</span>
            <h2>Technical Operations</h2>
        </div>
        <div class="events-grid">
            {#each techEvents as event, i}
                <a
                    href="/events/{event.originalIndex}"
                    class="event-card"
                    use:tilt
                >
                    <div class="card-meta">
                        <span class="type-badge dim">{event.description}</span>
                        <!-- Using desc as type flavor -->
                    </div>
                    <h3>{event.title}</h3>
                    <div class="card-footer">
                        <span class="status">SCHEDULED</span>
                        <span class="action">REGISTER &rarr;</span>
                    </div>
                </a>
            {/each}
        </div>
    </section>

    <!-- CAREER SECTION -->
    <section class="event-group" use:reveal={{ delay: 500 }}>
        <div class="group-header">
            <span class="icon">🧠</span>
            <h2>Career Intelligence</h2>
        </div>
        <div class="events-grid">
            {#each careerEvents as event, i}
                <a
                    href="/events/{event.originalIndex}"
                    class="event-card"
                    use:tilt
                >
                    <div class="card-meta">
                        <span class="type-badge">{event.description}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <div class="card-footer">
                        <span class="status">SCHEDULED</span>
                        <span class="action">REGISTER &rarr;</span>
                    </div>
                </a>
            {/each}
        </div>
    </section>
</div>

<style>
    .page-header {
        padding: 160px 0 60px;
        background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.05) 0%,
            transparent 100%
        );
        text-align: center;
    }
    .page-header h1 {
        margin-bottom: 1.5rem;
    }
    .page-header p {
        max-width: 600px;
        margin: 0 auto;
        font-size: 1.2rem;
        color: var(--text-secondary);
    }

    .main-content {
        padding-bottom: 120px;
    }

    .event-group {
        margin-bottom: 80px;
    }

    .group-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--glass-border);
        padding-bottom: 1rem;
    }
    .group-header h2 {
        font-size: 1.75rem;
        color: #fff;
        margin: 0;
    }
    .icon {
        font-size: 1.5rem;
    }

    .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1.5rem;
    }

    .event-card {
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 2rem;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
    }
    .event-card:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.05);
    }

    .card-meta {
        margin-bottom: 1rem;
    }
    .type-badge {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 4px 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .type-badge.dim {
        background: rgba(59, 130, 246, 0.1);
        color: var(--accent-blue);
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 2rem;
        flex-grow: 1;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding-top: 1rem;
    }
    .status {
        font-size: 0.75rem;
        color: var(--text-tertiary);
        font-weight: 600;
        letter-spacing: 0.1em;
    }
    .action {
        font-size: 0.8rem;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }
    .event-card:hover .action {
        color: var(--accent-blue);
    }

    @media (max-width: 768px) {
        .events-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
