<script>
    import { articles } from "$lib/content/articles";
    import { reveal } from "$lib/ui/actions";
    import PageLoader from "$lib/ui/components/PageLoader.svelte";
    import { base } from "$app/paths";
</script>

<svelte:head>
    <title>Knowledge | Progeta</title>
</svelte:head>

<section class="page-container">
    <div class="header" use:reveal>
        <span class="pill">INTELLIGENCE</span>
        <h1>Knowledge Base</h1>
        <p>Strategic insights and technical research.</p>
    </div>

    <div class="articles-grid">
        {#each articles as article, i}
            <a
                href="{base}/articles/{article.id}"
                class="article-card"
                use:reveal={{ delay: i * 100 }}
            >
                <div class="card-top">
                    <span class="category">{article.category}</span>
                    <span class="date">{article.date}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div class="card-footer">
                    <span class="author">By {article.author}</span>
                    <span class="read-more">Read Intel &rarr;</span>
                </div>
            </a>
        {/each}
    </div>
</section>

<style>
    .page-container {
        padding: 120px 24px 100px; /* Top padding for potential top bar, bottom for nav */
        max-width: 800px;
        margin: 0 auto;
        min-height: 100vh;
    }

    .header {
        margin-bottom: 3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .pill {
        font-size: 0.75rem;
        font-family: var(--font-mono);
        color: var(--text-primary);
        border: 1px solid var(--text-primary);
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
    }

    h1 {
        font-size: 2.5rem;
        line-height: 1.1;
        margin: 0;
        font-family: var(--font-display);
    }

    p {
        color: var(--text-secondary);
        font-size: 1.1rem;
        margin: 0;
    }

    .articles-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .article-card {
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        padding: 1.5rem;
        border-radius: 16px;
        text-decoration: none;
        transition:
            transform 0.2s,
            background 0.2s;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .article-card:active {
        transform: scale(0.98);
        background: rgba(255, 255, 255, 0.08);
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-tertiary);
    }

    .category {
        color: var(--text-primary);
    }

    h3 {
        font-size: 1.25rem;
        margin: 0;
        line-height: 1.3;
        color: #fff;
    }

    .article-card p {
        font-size: 0.95rem;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        font-size: 0.85rem;
    }

    .author {
        color: var(--text-tertiary);
    }

    .read-more {
        color: var(--text-primary);
        font-weight: 500;
    }
</style>
