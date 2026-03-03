<script>
    export let title = "Coming Soon";
    export let description = "This page is under development.";
</script>

<section class="coming-soon">
    <div class="container">
        <span class="tag">IN DEVELOPMENT</span>
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
</section>

<style>
    .coming-soon {
        min-height: 60vh;
        display: flex;
        align-items: center;
        padding: var(--space-8) 0;
    }

    .coming-soon h1 {
        margin: var(--space-4) 0 var(--space-3);
    }

    .coming-soon p {
        max-width: 500px;
        line-height: 1.7;
    }
</style>
