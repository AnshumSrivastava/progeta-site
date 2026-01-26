<script>
    import { careerTracks } from '$lib/content/jobs';
    import { tilt } from '$lib/ui/actions';
</script>

<div class="track-grid-container">
    {#each careerTracks as track, index}
        <!-- Simplified Card for Home Page -->
        <a href="/tracks/{track.id}" class="simple-track-card" use:tilt>
            <div class="card-bg-pattern"></div>
            <div class="scan-line"></div>
            
            <div class="card-top">
                <span class="id-badge">TRACK {track.id.toString().padStart(2, '0')}</span>
                <div class="arrow-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
            </div>
            <h3>{track.title}</h3>
            <p class="desc">{track.description || 'Specialized career track.'}</p>
            <div class="meta-row">
                <span class="meta">6 Months</span>
                <span class="meta">Diploma</span>
                <span class="active-tag">ACTIVE</span>
            </div>
        </a>
    {/each}
</div>

<style>
    .track-grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }

    .simple-track-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        text-decoration: none;
        position: relative;
        overflow: hidden;
    }

    .simple-track-card:hover {
        border-color: var(--accent-blue);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    /* Background Pattern */
    .card-bg-pattern {
        position: absolute; top:0; left:0; width:100%; height:100%;
        background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 20px 20px;
        opacity: 0; transition: opacity 0.4s; pointer-events: none;
    }
    .simple-track-card:hover .card-bg-pattern { opacity: 1; }

    /* Scan Line */
    .scan-line {
        position: absolute; top: 0; left: 0; width: 100%; height: 2px;
        background: var(--accent-blue);
        box-shadow: 0 0 10px var(--accent-blue);
        opacity: 0;
        pointer-events: none;
    }
    .simple-track-card:hover .scan-line {
        opacity: 0.5;
        animation: scanDown 2s linear infinite;
    }
    @keyframes scanDown { 0% { top: -10%; } 100% { top: 110%; } }


    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        position: relative; z-index: 2;
    }

    .id-badge {
        font-family: var(--font-display);
        font-size: 0.75rem;
        color: var(--text-tertiary);
        letter-spacing: 0.1em;
    }

    .arrow-icon {
        color: var(--text-secondary);
        width: 18px;
        height: 18px;
        transition: transform 0.3s;
    }
    
    .simple-track-card:hover .arrow-icon {
        transform: translateX(4px);
        color: var(--accent-blue);
    }

    h3 {
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
        color: var(--text-primary);
        line-height: 1.3;
        position: relative; z-index: 2;
    }

    .desc {
        font-size: 0.95rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.6;
        opacity: 0.8;
        position: relative; z-index: 2;
    }

    .meta-row {
        margin-top: auto;
        display: flex;
        gap: 1rem;
        border-top: 1px solid var(--glass-border);
        padding-top: 1rem;
        position: relative; z-index: 2;
        align-items: center;
    }

    .meta {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-tertiary);
        font-weight: 500;
    }
    
    .active-tag {
        font-size: 0.65rem; background: rgba(59, 130, 246, 0.1); color: var(--accent-blue);
        padding: 2px 6px; border-radius: 4px; letter-spacing: 0.05em;
        margin-left: auto;
    }

    @media (max-width: 768px) {
        .track-grid-container { grid-template-columns: 1fr; }
    }
</style>
