<script>
    import { workshops } from "$lib/content/workshops";
    import { reveal, tilt } from "$lib/ui/actions";

    let searchTerm = "";

    $: filteredWorkshops = workshops.filter((workshop) => {
        const term = searchTerm.toLowerCase();
        // Create a string of all tech module titles to search against
        const techStack = workshop.tech_mods
            ? workshop.tech_mods.map((t) => t.title.toLowerCase()).join(" ")
            : "";

        return (
            workshop.title.toLowerCase().includes(term) ||
            workshop.role.toLowerCase().includes(term) ||
            workshop.mission.toLowerCase().includes(term) ||
            workshop.outcome.toLowerCase().includes(term) ||
            techStack.includes(term)
        );
    });
</script>

<svelte:head>
    <title>Workshops | Progeta Technologies</title>
</svelte:head>

<section class="page-header">
    <div class="container">
        <h1 use:reveal>Operational Workshops.</h1>
        <p use:reveal={{ delay: 200 }}>
            Live-fire simulation environments designed to test your capability
            under pressure. Theory ends here.
        </p>

        <div class="search-container" use:reveal={{ delay: 300 }}>
            <input
                type="text"
                placeholder="Search operations..."
                bind:value={searchTerm}
                class="search-input"
            />
        </div>
    </div>
</section>

<section class="content-section">
    <div class="container">
        <div class="workshops-grid">
            {#each filteredWorkshops as workshop, i (workshop.title)}
                <a
                    href="/workshops/{i}"
                    class="workshop-card"
                    use:tilt
                    use:reveal={{ delay: i * 50 }}
                >
                    <div class="card-role">{workshop.role}</div>
                    <h3>{workshop.title}</h3>

                    <div class="card-section">
                        <span class="label">MISSION PARAMETERS</span>
                        <p>{workshop.mission}</p>
                    </div>

                    <div class="card-section">
                        <span class="label">EXPECTED OUTCOME</span>
                        <p>{workshop.outcome}</p>
                    </div>

                    {#if workshop.tech_mods && workshop.tech_mods.length > 0}
                        <div class="tech-stack">
                            {#each workshop.tech_mods.slice(0, 3) as tech}
                                <span class="tech-pill">{tech.title}</span>
                            {/each}
                        </div>
                    {/if}
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    .page-header {
        padding: 160px 0 60px;
        background: radial-gradient(
            circle at 50% 0%,
            rgba(59, 130, 246, 0.1) 0%,
            transparent 70%
        );
        text-align: center;
    }

    @media (max-width: 900px) {
        .page-header {
            padding: 100px 0 40px;
        }
    }
    .page-header h1 {
        margin-bottom: 1.5rem;
    }
    .page-header p {
        max-width: 600px;
        margin: 0 auto;
        font-size: 1.2rem;
        color: var(--text-secondary);
        margin-bottom: 2.5rem;
    }

    .search-container {
        max-width: 500px;
        margin: 0 auto;
    }
    .search-input {
        width: 100%;
        padding: 1rem 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        border-radius: 50px;
        color: #fff;
        font-size: 1rem;
        transition: all 0.3s ease;
        text-align: center;
    }
    .search-input:focus {
        outline: none;
        border-color: var(--accent-blue);
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
    }
    .search-input::placeholder {
        color: var(--text-tertiary);
    }

    .content-section {
        padding-bottom: 120px;
    }

    .workshops-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
    }

    .workshop-card {
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: border-color 0.3s;
        text-decoration: none;
        color: inherit;
    }
    .workshop-card:hover {
        border-color: rgba(255, 255, 255, 0.2);
    }

    .card-role {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--accent-blue);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
        border: 1px solid rgba(59, 130, 246, 0.2);
        display: inline-block;
        padding: 4px 10px;
        border-radius: 4px;
        align-self: flex-start;
    }

    h3 {
        margin-bottom: 2rem;
        font-size: 1.5rem;
        line-height: 1.2;
    }

    .card-section {
        margin-bottom: 1.5rem;
    }
    .label {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--text-tertiary);
        margin-bottom: 0.5rem;
        font-weight: 700;
        letter-spacing: 0.1em;
    }
    p {
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--text-secondary);
        margin: 0;
    }

    .tech-stack {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: auto;
        padding-top: 1.5rem;
        border-top: 1px solid var(--glass-border);
    }
    .tech-pill {
        font-size: 0.7rem;
        color: var(--text-secondary);
        background: rgba(255, 255, 255, 0.03);
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid var(--glass-border);
    }

    @media (max-width: 768px) {
        .workshops-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
