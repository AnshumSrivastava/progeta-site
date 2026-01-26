<script lang="ts">
    export let href: string = '#';
    export let category: string = '';
    export let title: string = '';
    export let description: string = '';
    export let footerText: string = '';
    export let tags: string[] = []; 
</script>

<a {href} class="agency-card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%; text-decoration:none;">
    <div>
        {#if category}
            <span class="cat-pill">{category}</span>
        {/if}
        <h3 style="margin: 1rem 0 0.5rem; font-size:1.5rem;">{title}</h3>
        {#if description}
            <p style="font-size:1rem; line-height:1.5; color:var(--text-secondary);">{description}</p>
        {/if}
        
        {#if tags.length > 0}
            <div style="margin-top:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                {#each tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </div>
        {/if}
    </div>

    {#if footerText}
        <div style="margin-top:2rem; font-weight:600; color:var(--text-primary); font-size:0.9rem;">
            {footerText}
        </div>
    {/if}
</a>

<style>
    .cat-pill {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--accent-primary);
    }

    .tag {
        font-size: 0.85rem;
        padding: 4px 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 4px;
        color: var(--text-secondary);
    }
</style>
