<script lang="ts">
    import { page } from "$app/stores";
    import { reveal } from "$lib/ui/actions";
    import MagneticButton from "$lib/ui/components/MagneticButton.svelte";
    import { base } from "$app/paths";
</script>

<svelte:head>
    <title>Error {$page.status} | Progeta</title>
</svelte:head>

<div class="error-container">
    <div class="content" use:reveal={{ delay: 100 }}>
        <div class="status-code">{$page.status}</div>

        <h1 class="title">
            {#if $page.status === 404}
                Page Not Found
            {:else}
                System Exception
            {/if}
        </h1>

        <p class="description">
            {#if $page.error?.message}
                {$page.error.message}
            {:else if $page.status === 404}
                The resource you are looking for has been moved, deleted, or
                does not exist.
            {:else}
                An unexpected error occurred during processing. Our team has
                been notified.
            {/if}
        </p>

        <div class="action">
            <MagneticButton href="{base}/" variant="primary"
                >Return Home</MagneticButton
            >
        </div>
    </div>
</div>

<style>
    .error-container {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        text-align: center;
        position: relative;
    }

    .content {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .status-code {
        font-family: var(--font-mono, monospace);
        font-size: clamp(4rem, 10vw, 8rem);
        font-weight: 800;
        line-height: 1;
        color: var(--glass-border);
        text-transform: uppercase;
        letter-spacing: -0.05em;
        margin-bottom: -1rem;
        z-index: -1;
    }

    .title {
        font-family: var(--font-display);
        font-size: 2.5rem;
        color: var(--text-primary);
        letter-spacing: -0.02em;
        font-weight: 700;
    }

    .description {
        color: var(--text-secondary);
        font-size: 1.15rem;
        line-height: 1.7;
        max-width: 450px;
    }

    .action {
        margin-top: 2rem;
    }
</style>
