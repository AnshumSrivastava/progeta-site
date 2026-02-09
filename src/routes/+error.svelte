<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";
</script>

<svelte:head>
    <title>Progeta Technologies | SYSTEM ERROR</title>
</svelte:head>

<div
    class="dashboard-container"
    style="padding:4rem; text-align:center; min-height:60vh; display:flex; flex-direction:column; justify-content:center; align-items:center;"
>
    <h1
        style="font-size: 5rem; color: var(--accent-primary); margin-bottom: 0;"
    >
        404
    </h1>
    <span
        class="sys-code"
        style="font-size:1.2rem; display:block; margin-bottom:2rem;"
        >DATA_FRAGMENT_MISSING // PATH: {$page.url.pathname}</span
    >

    <p
        style="max-width:500px; margin:0 auto 3rem; color:var(--text-secondary);"
    >
        The requested resource could not be located in the current sector. It
        may have been redacted, moved to a secure archive, or never existed.
    </p>

    <a href="{base}/" class="cta-btn">RETURN TO DASHBOARD</a>
</div>
