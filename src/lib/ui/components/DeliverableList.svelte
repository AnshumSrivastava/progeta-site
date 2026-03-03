<script lang="ts">
    export let deliverables: { title: string; desc: string }[] = [];
    export let title: string = "What You'll Deliver";
</script>

<div class="card-soft">
    <h3 class="card-title">{title}</h3>
    <ul class="zen-list">
        {#each deliverables as item}
            <li>
                <div class="icon-box">✓</div>
                <div class="li-content">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                </div>
            </li>
        {/each}
    </ul>
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
    .zen-list {
        list-style: none;
        padding: 0;
    }
    .zen-list li {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;
        align-items: flex-start;
    }
    .icon-box {
        min-width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        color: #fff;
    }
    .li-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .li-content strong {
        font-size: 0.95rem;
        color: #fff;
    }
    .li-content span {
        font-size: 0.85rem;
        color: var(--z-text-dim, #9ca3af);
        line-height: 1.4;
    }
</style>
