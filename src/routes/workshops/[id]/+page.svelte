<script>
    import { page } from "$app/stores";
    import { workshops } from "$lib/content/workshops";
    import { reveal, tilt } from "$lib/ui/actions";

    $: id = parseInt($page.params.id);
    $: workshop = workshops[id];
</script>

<svelte:head>
    <title
        >{workshop ? workshop.title : "Simulation Details"} | Progeta Technologies</title
    >
</svelte:head>

{#if workshop}
    <section class="page-header">
        <div class="container">
            <a
                href="/workshops"
                class="back-link"
                use:reveal={{ duration: 400 }}
            >
                &larr; RETURN TO OPERATIONS
            </a>

            <div class="header-content">
                <span class="role-badge" use:reveal={{ delay: 100 }}
                    >{workshop.role}</span
                >
                <h1 use:reveal={{ delay: 200 }}>{workshop.title}</h1>
                <div class="meta-row" use:reveal={{ delay: 300 }}>
                    <span class="meta-item">
                        <span class="status-indicator"></span>
                        LIVE FIRE SIMULATION
                    </span>
                    <span class="divider"></span>
                    <span class="meta-item">CLASSIFIED CLEARANCE</span>
                </div>
            </div>
        </div>
    </section>

    <div class="container main-content">
        <div class="layout-grid">
            <!-- Left Column: Mission Intel -->
            <div class="main-column">
                <div class="content-card" use:reveal={{ delay: 400 }}>
                    <div class="card-header">
                        <span class="icon">📂</span>
                        <h2>Mission Dossier</h2>
                    </div>

                    <div class="section">
                        <span class="label">OBJECTIVE</span>
                        <p class="mission-text">{workshop.mission}</p>
                    </div>

                    <div class="section">
                        <span class="label">EXPECTED OUTCOME</span>
                        <p class="outcome-text">{workshop.outcome}</p>
                    </div>
                </div>

                <div class="content-card" use:reveal={{ delay: 500 }}>
                    <div class="card-header">
                        <span class="icon">🧠</span>
                        <h2>Soft Skill Requirements</h2>
                    </div>

                    <div class="skills-grid">
                        {#if workshop.soft_mods && workshop.soft_mods.length > 0}
                            {#each workshop.soft_mods as m}
                                <a
                                    href="/modules/soft_skills/{m.id}"
                                    class="skill-chip"
                                    use:tilt
                                >
                                    <span class="code">SP.{m.id}</span>
                                    <span class="name">{m.title}</span>
                                </a>
                            {/each}
                        {:else}
                            <p class="empty-text">
                                No specific soft skills required.
                            </p>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Right Column: Technical Loadout -->
            <div class="sidebar-column">
                <div class="content-card tech-card" use:reveal={{ delay: 600 }}>
                    <div class="card-header">
                        <span class="icon">⚡</span>
                        <h2>Technical Loadout</h2>
                    </div>
                    <p class="subtitle">
                        Required proficiency for mission success.
                    </p>

                    <div class="tech-list">
                        {#if workshop.tech_mods && workshop.tech_mods.length > 0}
                            {#each workshop.tech_mods as m}
                                <a
                                    href="/modules/technical/{m.id}"
                                    class="tech-item"
                                >
                                    <div class="tech-info">
                                        <span class="code">TP.{m.id}</span>
                                        <span class="name">{m.title}</span>
                                    </div>
                                    <span class="arrow">&rarr;</span>
                                </a>
                            {/each}
                        {:else}
                            <p class="empty-text">
                                No technical modules required.
                            </p>
                        {/if}
                    </div>
                </div>

                <div class="cta-card" use:reveal={{ delay: 700 }} use:tilt>
                    <h3>Ready to Deploy?</h3>
                    <p>
                        Initialize simulation environment and begin the
                        operation.
                    </p>
                    <button class="deploy-btn">INITIATE SIMULATION</button>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="not-found">
        <h1>SIMULATION NOT FOUND</h1>
        <p>Target simulation does not exist.</p>
        <a href="/workshops" class="btn">RETURN TO BASE</a>
    </div>
{/if}

<style>
    .page-header {
        padding: 160px 0 80px;
        background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.05) 0%,
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
        color: var(--accent-blue);
    }

    .role-badge {
        display: inline-block;
        font-family: var(--font-mono);
        color: var(--accent-blue);
        border: 1px solid rgba(59, 130, 246, 0.3);
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
        background: rgba(59, 130, 246, 0.05);
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
        background-color: #22c55e;
        border-radius: 50%;
        margin-right: 8px;
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
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

    .section {
        margin-bottom: 2.5rem;
    }
    .section:last-child {
        margin-bottom: 0;
    }

    .label {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-tertiary);
        margin-bottom: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
    }

    .mission-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--text-primary);
    }

    .outcome-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--text-secondary);
    }

    /* Skills Grid */
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }

    .skill-chip {
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--glass-border);
        padding: 1rem;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.3s;
    }
    .skill-chip:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    .skill-chip .code {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--text-tertiary);
        margin-bottom: 0.5rem;
    }
    .skill-chip .name {
        color: var(--text-primary);
        font-size: 0.9rem;
        font-weight: 500;
    }

    /* Technical Loadout */
    .subtitle {
        color: var(--text-tertiary);
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }

    .tech-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tech-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
        text-decoration: none;
        border: 1px solid transparent; /* Reserve space for border */
        transition: all 0.2s;
    }
    .tech-item:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .tech-info {
        display: flex;
        flex-direction: column;
    }

    .tech-info .code {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--accent-blue);
        margin-bottom: 0.25rem;
    }
    .tech-info .name {
        font-size: 0.9rem;
        color: #fff;
        font-weight: 500;
    }

    .arrow {
        color: var(--text-tertiary);
        margin-left: 1rem;
        transition: transform 0.2s;
    }
    .tech-item:hover .arrow {
        transform: translateX(4px);
        color: #fff;
    }

    /* CTA Card */
    .cta-card {
        background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(59, 130, 246, 0.05) 100%
        );
        border: 1px solid rgba(59, 130, 246, 0.2);
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

    .deploy-btn {
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
    }
    .deploy-btn:hover {
        background: var(--accent-blue);
        color: #fff;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }

    .empty-text {
        color: var(--text-tertiary);
        font-style: italic;
        font-size: 0.9rem;
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
