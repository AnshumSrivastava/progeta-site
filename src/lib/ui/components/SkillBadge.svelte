<script lang="ts">
    export let skills: string[] = [];
    export let title: string = "Core Capabilities";
</script>

<div class="card-soft">
    <h3 class="card-title">{title}</h3>
    <div class="zen-tags">
        {#each skills as skill}
            <span class="z-tag">{skill}</span>
        {/each}
    </div>
</div>

<style>
    .card-soft {
        background: var(--z-card, #16181d);
        border: 1px solid var(--z-border, rgba(255, 255, 255, 0.06));
        border-radius: var(--radius, 16px);
        padding: 32px;
        margin-bottom: 24px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    .card-title {
        font-family: var(--font-head, "Manrope", sans-serif);
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: #fff;
    }
    .zen-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .z-tag {
        font-size: 0.8rem;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.015);
        border: 1px solid var(--z-border, rgba(255, 255, 255, 0.06));
        border-radius: 8px;
        color: var(--z-text-dim, #9ca3af);
    }
</style>
