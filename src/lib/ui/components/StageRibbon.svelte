<script lang="ts">
    import { base } from "$app/paths";

    /** @type {string[]} */
    export let stages = ["Awareness", "Skill", "Leadership", "Execution"];

    /** @type {number} */
    export let activeIndex = -1;

    /** @type {Record<string, string>} */
    export let links = {};
</script>

<div class="stage-ribbon">
    {#each stages as stage, i}
        {#if i > 0}
            <div class="ribbon-connector"></div>
        {/if}
        {#if links[stage]}
            <a
                href="{base}{links[stage]}"
                class="ribbon-stage"
                class:active={i === activeIndex}
                class:completed={i < activeIndex}
            >
                <span class="ribbon-num">{String(i + 1).padStart(2, "0")}</span>
                <span class="ribbon-label">{stage}</span>
            </a>
        {:else}
            <div
                class="ribbon-stage"
                class:active={i === activeIndex}
                class:completed={i < activeIndex}
            >
                <span class="ribbon-num">{String(i + 1).padStart(2, "0")}</span>
                <span class="ribbon-label">{stage}</span>
            </div>
        {/if}
    {/each}
</div>

<style>
    .stage-ribbon {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        padding: 1.5rem 0;
    }

    .ribbon-stage {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s;
        cursor: default;
    }

    a.ribbon-stage {
        cursor: pointer;
    }

    a.ribbon-stage:hover {
        background: rgba(255, 255, 255, 0.04);
    }

    .ribbon-num {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--text-tertiary, rgba(255, 255, 255, 0.3));
    }

    .ribbon-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-tertiary, rgba(255, 255, 255, 0.3));
        transition: color 0.2s;
    }

    .ribbon-stage.active .ribbon-num,
    .ribbon-stage.active .ribbon-label {
        color: var(--text-primary);
    }

    .ribbon-stage.completed .ribbon-num {
        color: var(--accent-blue, #3b82f6);
    }

    .ribbon-stage.completed .ribbon-label {
        color: var(--text-secondary);
    }

    .ribbon-connector {
        width: 32px;
        height: 2px;
        background: rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
    }

    .ribbon-stage.completed + .ribbon-connector,
    .ribbon-stage.active + .ribbon-connector {
        background: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 600px) {
        .ribbon-stage {
            padding: 0.5rem 0.75rem;
        }
        .ribbon-label {
            font-size: 0.7rem;
        }
        .ribbon-connector {
            width: 16px;
        }
    }
</style>
