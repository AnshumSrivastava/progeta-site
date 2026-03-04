<script lang="ts">
    import SiteNav from "$lib/components/site/SiteNav.svelte";
    import SiteFooter from "$lib/components/site/SiteFooter.svelte";
    import BrandEngine from "$lib/components/decor/BrandEngine.svelte";
</script>

<div class="legal-layout">
    <BrandEngine opacity={0.03} />

    <header class="legal-nav">
        <SiteNav />
    </header>

    <main class="legal-content">
        <div class="container--legal">
            <slot />
        </div>
    </main>

    <SiteFooter />
</div>

<style>
    .legal-layout {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        background: #020408;
        position: relative;
        z-index: 1;
    }

    .legal-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background: rgba(2, 4, 8, 0.9);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(31, 35, 53, 0.5);
    }

    .legal-content {
        flex: 1;
        padding-top: 140px; /* Offset fixed header */
        padding-bottom: 120px;
    }

    /* Global text styles for legal branch */
    :global(.container--legal) {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 var(--sp-6);
    }

    :global(.legal-header) {
        margin-bottom: var(--sp-12);
        border-bottom: 1px solid var(--border-2);
        padding-bottom: var(--sp-6);
    }

    :global(.legal-eyebrow) {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: var(--tracking-widest);
        color: var(--ink-3);
        text-transform: uppercase;
        display: block;
        margin-bottom: var(--sp-3);
    }

    :global(.legal-title) {
        font-family: var(--font-serif);
        font-size: clamp(32px, 5vw, 48px);
        font-weight: 700;
        color: var(--ink-1);
        line-height: 1.1;
        margin-bottom: var(--sp-2);
    }

    :global(.legal-last-updated) {
        font-family: var(--font-body);
        font-size: var(--text-sm);
        color: var(--ink-4);
    }

    :global(.legal-prose) {
        font-family: var(--font-body);
        font-size: 16px;
        line-height: 1.8;
        color: var(--ink-2);
    }

    :global(.legal-prose h2) {
        font-family: var(--font-serif);
        font-size: 24px;
        color: var(--ink-1);
        margin: var(--sp-10) 0 var(--sp-4);
        font-weight: 600;
    }

    :global(.legal-prose h3) {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 18px;
        color: var(--ink-1);
        margin: var(--sp-8) 0 var(--sp-3);
    }

    :global(.legal-prose p) {
        margin-bottom: var(--sp-4);
    }

    :global(.legal-prose ul) {
        margin-bottom: var(--sp-6);
        padding-left: var(--sp-6);
    }

    :global(.legal-prose li) {
        margin-bottom: var(--sp-2);
    }

    :global(.legal-prose a) {
        color: var(--accent-blue);
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-color: rgba(56, 189, 248, 0.4);
        transition: all 0.2s;
    }
    :global(.legal-prose a:hover) {
        color: var(--ground);
        background: var(--accent-blue);
        text-decoration: none;
    }
</style>
