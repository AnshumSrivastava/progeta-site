<script>
    import { page } from '$app/stores';
    import { workshops } from '$lib/content/workshops';

    $: id = parseInt($page.params.id);
    $: workshop = workshops[id];
</script>

<svelte:head>
    <title>Progeta Technologies | {workshop ? workshop.title : 'Simulation Details'}</title>
</svelte:head>

{#if workshop}
    <div class="dashboard-container" style="padding-top:2rem;">
        <div class="section-header">
            <h1 style="margin:0; font-size:2.5rem;">{workshop.title}</h1>
            <span class="sys-code">LIVE FIRE SIMULATION <span style="color:var(--accent-primary)">//</span> {workshop.role ? workshop.role.toUpperCase() : 'OPERATIVE'}</span>
        </div>

        <!-- Mission Header -->
        <div class="dashboard-panel" style="margin-bottom:2rem; background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(20,20,20,0.5) 100%);">
             <div class="panel-title"><span>MISSION DOSSIER</span> <span>[CLASSIFIED]</span></div>
             <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:2rem; margin-top:1rem;">
                <div>
                     <label style="font-family:var(--font-mono); color:var(--text-tertiary); font-size:0.8rem;">OPERATIVE ROLE</label>
                     <div style="font-size:1.5rem; color:var(--accent-primary); margin-top:0.25rem;">{workshop.role}</div>
                </div>
                 <div>
                     <label style="font-family:var(--font-mono); color:var(--text-tertiary); font-size:0.8rem;">EXPECTED OUTCOME</label>
                     <div style="font-size:1.1rem; color:var(--text-primary); margin-top:0.25rem;">{workshop.outcome}</div>
                </div>
             </div>
        </div>

        <div class="module-dashboard">
            <!-- Left: Mission Profile -->
             <div class="dashboard-panel">
                <div class="panel-title"><span>MISSION OBJECTIVES</span></div>
                <p style="font-size:1.2rem; line-height:1.7;">{workshop.mission}</p>
                
                <div class="panel-title" style="margin-top:2rem;"><span>SOFT SKILL REQUIREMENTS</span></div>
                <div class="tool-grid">
                    {#if workshop.soft_mods && workshop.soft_mods.length > 0}
                        {#each workshop.soft_mods as m}
                            <a href="/modules/soft_skills/{m.id}" class="tool-chip" style="border-color:var(--accent-secondary); color:var(--accent-secondary); text-decoration:none; cursor:pointer;">SP.{m.id} {m.title}</a>
                        {/each}
                    {:else}
                        <span class="text-muted">None specified.</span>
                    {/if}
                </div>
            </div>

            <!-- Right: Technical Loadout -->
            <div class="dashboard-panel">
                <div class="panel-title"><span>REQUIRED TECHNICAL LOADOUT</span></div>
                <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">Operatives must be proficient in the following technical modules to succeed in this simulation.</p>
                <div class="tool-grid" style="flex-direction:column; align-items:flex-start;">
                    {#if workshop.tech_mods && workshop.tech_mods.length > 0}
                        {#each workshop.tech_mods as m}
                            <a href="/modules/technical/{m.id}" class="tool-chip" style="text-decoration:none; cursor:pointer;">TP.{m.id} {m.title}</a>
                        {/each}
                    {:else}
                        <span>No technical modules required.</span>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{:else}
    <div style="padding:4rem; text-align:center;">
        <h1>SIMULATION NOT FOUND</h1>
        <p>Target simulation does not exist.</p>
        <a href="/workshops" class="cta-btn">RETURN TO BASE</a>
    </div>
{/if}
