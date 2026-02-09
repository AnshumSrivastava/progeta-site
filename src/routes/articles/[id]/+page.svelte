<script>
    import { page } from "$app/stores";
    import { articles } from "$lib/content/articles";

    $: id = parseInt($page.params.id || "0");
    $: article = articles.find((a) => a.id === id);
</script>

<svelte:head>
    <title>Progeta Technologies | {article ? article.title : "Details"}</title>
</svelte:head>

{#if article}
    <div class="dashboard-container" style="padding-top:2rem;">
        <div class="section-header">
            <h1 style="margin:0; font-size:2.5rem;">{article.title}</h1>
            <span class="sys-code"
                >INTELLIGENCE BRIEFING <span style="color:var(--accent-primary)"
                    >//</span
                >
                {article.category}</span
            >
        </div>

        <div class="dashboard-panel">
            <div
                style="border-left:4px solid var(--accent-primary); padding-left:1.5rem; margin-bottom:2rem;"
            >
                <div
                    style="font-family:var(--font-mono); color:var(--text-tertiary); margin-bottom:0.5rem;"
                >
                    AUTHOR: {article.author} // DATE: {article.date}
                </div>
                <div
                    style="font-size:1.4rem; color:var(--text-secondary); font-style:italic;"
                >
                    "{article.summary}"
                </div>
            </div>

            <div
                style="font-size:1.1rem; line-height:1.8; color:var(--text-primary); max-width:800px;"
            >
                {@html article.content}
            </div>

            <div
                style="margin-top:3rem; padding-top:2rem; border-top:1px solid var(--border-color); text-align:center;"
            >
                <div
                    style="font-family:var(--font-mono); color:var(--accent-secondary);"
                >
                    Report End // Classification: PUBLIC
                </div>
            </div>
        </div>
    </div>

    <style>
        .dashboard-panel {
            padding: 3rem;
        }
        .section-header {
            margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
            .dashboard-panel {
                padding: 1.5rem;
            }
            .section-header h1 {
                font-size: 1.8rem !important;
            }
        }
    </style>
{:else}
    <div style="padding:4rem; text-align:center;">
        <h1>ARTICLE NOT FOUND</h1>
        <p>The requested intelligence report is missing.</p>
        <a href="/" class="cta-btn">RETURN TO DASHBOARD</a>
    </div>
{/if}
