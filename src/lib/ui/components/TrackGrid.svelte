<script>
    import { careerTracks } from "$lib/content/jobs";
    import { tilt } from "$lib/ui/actions";
    import { base } from "$app/paths";
</script>

<div class="track-grid-container">
    {#each careerTracks as track}
        <a href="{base}/tracks/{track.id}" class="modular-track-card" use:tilt>
            <div class="card-bg-pattern"></div>

            <div class="card-header">
                <div>
                    <span class="track-badge"
                        >TRACK {track.id.toString().padStart(2, "0")}</span
                    >
                    <h3 class="track-title">{track.title}</h3>
                </div>
            </div>

            <p class="track-desc">
                {track.description || "Specialized career track."}
            </p>

            <!-- PROGRESSION LADDER -->
            <div class="progression-ladder">
                <span class="ladder-label">PROGRESSION STRATEGY</span>
                <div class="ladder-steps">
                    <div class="ladder-step">
                        <div class="step-dot"></div>
                        <span class="step-text">Foundation</span>
                    </div>
                    <div class="ladder-step">
                        <div class="step-dot"></div>
                        <span class="step-text">Applied Skills</span>
                    </div>
                    <div class="ladder-step">
                        <div class="step-dot"></div>
                        <span class="step-text">Specialization</span>
                    </div>
                </div>
            </div>

            <!-- OUTCOME BLOCKS: SKILLS -->
            {#if track.skills && track.skills.length > 0}
                <div class="outcome-blocks">
                    <span class="outcome-label">SKILLS GAINED</span>
                    <div class="skills-flex">
                        {#each track.skills.slice(0, 3) as skill}
                            <span class="skill-tag">{skill}</span>
                        {/each}
                        {#if track.skills.length > 3}
                            <span class="skill-tag">+</span>
                        {/if}
                    </div>
                </div>
            {/if}

            <div class="card-footer">
                <div class="meta-data">
                    <span class="meta-item">6 Months</span>
                    <span class="meta-item">Diploma</span>
                </div>
                <span class="view-details">View Details &rarr;</span>
            </div>
        </a>
    {/each}
</div>

<style>
    .track-grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 2rem;
    }

    .modular-track-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: rgba(13, 13, 18, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 2rem;
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        text-decoration: none;
        position: relative;
        overflow: hidden;
    }

    .modular-track-card:hover {
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        transform: translateY(-4px);
    }

    /* Background Pattern */
    .card-bg-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        );
        background-size: 20px 20px;
        opacity: 0;
        transition: opacity 0.4s;
        pointer-events: none;
    }
    .modular-track-card:hover .card-bg-pattern {
        opacity: 1;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
        position: relative;
        z-index: 2;
    }

    .track-badge {
        font-family: var(--font-display);
        font-size: 0.7rem;
        color: var(--accent-blue, #3b82f6);
        letter-spacing: 0.1em;
        display: block;
        margin-bottom: 0.5rem;
    }

    .track-title {
        font-size: 1.3rem;
        color: var(--text-primary);
        line-height: 1.25;
        margin: 0;
    }

    .track-desc {
        font-size: 0.95rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.6;
        opacity: 0.85;
        position: relative;
        z-index: 2;
    }

    /* PROGRESSION LADDER */
    .progression-ladder {
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 2;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 12px;
    }
    .ladder-label,
    .outcome-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-tertiary);
        margin-bottom: 0.75rem;
        display: block;
        font-weight: 600;
    }
    .ladder-steps {
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .ladder-steps::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 10px;
        right: 10px;
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 0;
    }
    .ladder-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        z-index: 1;
    }
    .step-dot {
        width: 10px;
        height: 10px;
        background: var(--bg-surface);
        border: 2px solid var(--text-secondary);
        border-radius: 50%;
        transition: border-color 0.3s;
    }
    .modular-track-card:hover .step-dot {
        border-color: var(--accent-blue, #3b82f6);
    }
    .step-text {
        font-size: 0.75rem;
        color: var(--text-secondary);
        font-weight: 500;
    }

    /* OUTCOMES */
    .outcome-blocks {
        margin-bottom: 2rem;
        position: relative;
        z-index: 2;
    }
    .skills-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .skill-tag {
        font-size: 0.75rem;
        padding: 4px 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: var(--text-secondary);
        transition: all 0.2s;
    }
    .modular-track-card:hover .skill-tag {
        color: var(--text-primary);
        border-color: rgba(255, 255, 255, 0.2);
    }

    .card-footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 1.25rem;
        position: relative;
        z-index: 2;
    }

    .meta-data {
        display: flex;
        gap: 1rem;
    }

    .meta-item {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-tertiary);
        font-weight: 600;
    }

    .view-details {
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 600;
        transition:
            color 0.2s,
            transform 0.2s;
    }
    .modular-track-card:hover .view-details {
        color: var(--accent-blue, #3b82f6);
        transform: translateX(4px);
    }

    @media (max-width: 768px) {
        .track-grid-container {
            grid-template-columns: 1fr;
        }
    }
</style>
