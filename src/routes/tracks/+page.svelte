<script>
    import { careerTracks } from '$lib/content/jobs';
    import { tilt, reveal } from '$lib/ui/actions'; 
    import { onMount } from 'svelte';

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<svelte:head>
    <title>Progeta Technologies | Operational Tracks</title>
</svelte:head>

<!-- BACKGROUND: Cyber Grid (Consistent with Homepage) -->
<div class="cyber-grid-container">
    <div class="cyber-grid"></div>
</div>

<!-- HEADER -->
<section style="padding: 160px 0 60px; position: relative; z-index: 2;">
    <div class="container" style="text-align: center;">
        <div use:reveal>
            <div class="status-badge">
                <span class="status-dot"></span>
                <span>SYSTEM ACTIVE</span>
            </div>
            <h1 class="page-title">Career Tracks</h1>
            <p class="page-subtitle">
                Select a specialized diploma program to view the full deployment curriculum. Each track simulates a real-world cybersecurity role.
            </p>
        </div>
    </div>
</section>

<!-- TRACKS GRID -->
<section style="padding-bottom: 120px; position: relative; z-index: 2;">
    <div class="container">
        
        <div class="tracks-grid">
            {#each careerTracks as track}
                <a href="/tracks/{track.id}" class="tech-card" use:tilt use:reveal={{ delay: track.id * 50 }}>
                    <!-- Top Border Accent -->
                    <div class="card-accent"></div>

                    <!-- Card Header -->
                    <div class="card-header">
                        <span class="track-id">TRACK // 0{track.id}</span>
                        <h3>{track.title}</h3>
                    </div>

                    <!-- Role Description -->
                    <div class="card-body">
                        <span class="label">ROLE INTELLIGENCE</span>
                        <p>{track.description}</p>
                    </div>

                    <!-- Tech Specs (Skills) -->
                    <div class="card-specs">
                        <span class="label">TECHNICAL SPECS</span>
                        <div class="specs-grid">
                            {#each (track.skills || []).slice(0, 4) as skill}
                                <span class="spec-tag">{skill}</span>
                            {/each}
                        </div>
                    </div>

                    <!-- Footer Action -->
                    <div class="card-footer">
                        <div class="action-btn">
                            <span>INITIALIZE</span>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                    </div>
                </a>
            {/each}
        </div>

    </div>
</section>

<style>
    /* 1. BACKGROUND ENGINE (Synced) */
    .cyber-grid-container {
        position: absolute; width: 100%; height: 100vh; overflow: hidden; top: 0; left: 0; z-index: 0;
        mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 80%);
        pointer-events: none;
    }
    .cyber-grid {
        position: absolute; width: 200%; height: 200%; top: -50%; left: -50%;
        background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        transform: perspective(500px) rotateX(60deg);
        animation: gridMove 20s linear infinite;
    }
    @keyframes gridMove {
        0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
        100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
    }

    /* 2. HEADER TYPOGRAPHY */
    .page-title {
        font-size: 4rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 1.5rem;
        background: linear-gradient(180deg, #fff 0%, #aaa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .page-subtitle { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.6; }

    .status-badge {
        display: inline-flex; align-items: center; gap: 0.5rem;
        padding: 4px 12px; margin-bottom: 2rem;
        background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 100px; font-size: 0.75rem; font-weight: 600; color: var(--accent-blue);
        letter-spacing: 0.1em;
    }
    .status-dot { width: 6px; height: 6px; background: var(--accent-blue); border-radius: 50%; box-shadow: 0 0 8px var(--accent-blue); }

    /* 3. GRID SYSTEM */
    .tracks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 2rem;
    }

    /* 4. HIGH-TECH CARD DESIGN */
    .tech-card {
        background: rgba(13, 13, 18, 0.6);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 0; /* Interior padding handled by sections */
        display: flex; flex-direction: column;
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        text-decoration: none; color: inherit;
        position: relative; overflow: hidden;
        min-height: 420px;
    }

    .tech-card:hover {
        transform: translateY(-6px);
        border-color: rgba(59, 130, 246, 0.4);
        box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
    }

    .card-accent {
        height: 2px; width: 0%; background: var(--accent-blue);
        transition: width 0.4s ease;
        box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
    }
    .tech-card:hover .card-accent { width: 100%; }

    .card-header { padding: 2rem 2rem 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .track-id { font-family: monospace; font-size: 0.75rem; color: var(--accent-blue); opacity: 0.9; letter-spacing: 0.1em; display: block; margin-bottom: 0.5rem; }
    .card-header h3 { font-size: 1.5rem; color: #fff; margin: 0; line-height: 1.2; font-weight: 700; }

    .card-body { padding: 1.5rem 2rem; flex-grow: 1; }
    .label {
        display: block; font-size: 0.7rem; color: var(--text-tertiary);
        font-weight: 700; letter-spacing: 0.1em; margin-bottom: 0.75rem;
    }
    .card-body p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

    .card-specs { padding: 0 2rem 1.5rem; }
    .specs-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .spec-tag {
        font-family: monospace; font-size: 0.75rem; color: var(--text-secondary);
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 4px 8px; border-radius: 4px;
    }

    .card-footer {
        padding: 1.5rem 2rem;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        display: flex; justify-content: flex-end;
    }
    .action-btn {
        display: flex; align-items: center; gap: 0.5rem;
        font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em;
        color: #fff; opacity: 0.8; transition: all 0.2s;
    }
    .tech-card:hover .action-btn { opacity: 1; color: var(--accent-blue); gap: 0.75rem; }

    @media (max-width: 900px) {
        .tracks-grid { grid-template-columns: 1fr; }
        .page-title { font-size: 2.5rem; }
    }
</style>
