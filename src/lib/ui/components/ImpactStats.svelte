<script lang="ts">
    import { onMount } from "svelte";
    import { reveal } from "$lib/ui/actions";

    interface Stat {
        value: string;
        label: string;
    }

    const stats: Stat[] = [
        { value: "15+", label: "Colleges Engaged" },
        { value: "2,500+", label: "Students Trained" },
        { value: "50+", label: "Sessions Delivered" },
        { value: "96%", label: "Satisfaction Rate" },
    ];

    let visible = false;
    onMount(() => {
        visible = true;
    });
</script>

<div class="impact-strip" use:reveal>
    {#each stats as stat, i}
        <div class="stat-item" style="--delay: {i * 100}ms">
            <span class="stat-value">{stat.value}</span>
            <span class="stat-label">{stat.label}</span>
        </div>
    {/each}
</div>

<style>
    .impact-strip {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        padding: 3rem 0;
        border-top: 1px solid var(--glass-border);
        border-bottom: 1px solid var(--glass-border);
        text-align: center;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .stat-value {
        font-size: 2.5rem;
        font-weight: 800;
        font-family: var(--font-heading);
        background: linear-gradient(
            180deg,
            #fff 0%,
            rgba(255, 255, 255, 0.6) 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.02em;
    }

    .stat-label {
        font-size: 0.85rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .impact-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1rem;
            padding: 2rem 0;
        }

        .stat-value {
            font-size: 2rem;
        }
    }
</style>
