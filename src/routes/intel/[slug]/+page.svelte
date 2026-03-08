<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

    // In a real app, we'd fetch article data based on $page.params.slug
    // Here we use a placeholder that matches the design token requirements.
    const article = {
        title: "Article Title Placeholder",
        tag: "SOVEREIGNTY SYSTEMS",
        date: "MARCH 2026",
        readTime: "8 MIN READ",
        author: "Progeta Technologies",
    };

    let scrollProgress = $state(0);

    function handleScroll() {
        // Calculate percentage based on body height vs viewport
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        if (height > 0) {
            scrollProgress = (winScroll / height) * 100;
        } else {
            scrollProgress = 0;
        }
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<svelte:head>
    <title>{article.title} | Intel Briefs | Progeta Technologies</title>
</svelte:head>

<!-- Reading Progress Line (sits above nav) -->
<div class="reading-progress" style="width: {scrollProgress}%;"></div>

<article class="intel-article">
    <div class="intel-container">
        <ScrollReveal>
            <div class="intel-header">
                <div class="intel-breadcrumbs">
                    <a href="/resources">RESOURCES</a>
                    <span class="breadcrumb-sep">→</span>
                    <a href="/resources/articles">INTEL BRIEFS</a>
                </div>

                <span class="intel-tag">{article.tag}</span>
                <h1 class="intel-title">{article.title}</h1>

                <div class="intel-meta">
                    <span class="intel-date">{article.date}</span>
                    <span class="intel-dot">·</span>
                    <span class="intel-read">{article.readTime}</span>
                </div>

                <hr class="intel-rule" />
            </div>

            <div class="intel-content">
                <p>
                    This is a placeholder for the article body content. The
                    actual brief would be rendered here, potentially using
                    markdown or a CMS integration. The typography for this
                    section is intentionally large and airy.
                </p>
                <p>
                    Shared responsibility is shifting. The assumption that data
                    should live on centralised servers — accessible, synced,
                    owned by the platform — is being challenged by a growing
                    number of systems built on the opposite premise.
                </p>

                <h2>The Architecture Assumption</h2>
                <p>
                    When you do not own the infrastructure, you do not own the
                    data. Renting compute implies renting sovereignty.
                    Local-first software inverts this relationship by placing
                    the primary data store directly on the device the user
                    controls.
                </p>

                <!-- More placeholder paragraphs would exist here to allow scrolling -->
                {#each Array(8) as _}
                    <p>
                        The language of privacy has been so thoroughly co-opted
                        by the products that violate it that it no longer
                        carries meaning to most users. Digital sovereignty is a
                        harder, more specific concept — and a necessary one. Why
                        owning your tools is the prerequisite for owning your
                        future.
                    </p>
                {/each}
            </div>

            <div class="intel-footer">
                <hr class="intel-rule" />
                <div class="intel-author-block">
                    PUBLISHED BY: {article.author} · {article.date}
                </div>

                <div class="intel-footer-nav">
                    <a href="/resources/articles" class="intel-back">
                        ← Back to Intel Briefs
                    </a>
                    <!-- Next article link could go here on the right -->
                </div>
            </div>
        </ScrollReveal>
    </div>
</article>

<style>
    /* ── PROGRESS BAR ── */
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 1px;
        background: rgba(237, 240, 255, 0.4);
        z-index: 9999;
        transition: width 0.1s linear;
    }

    /* ── LAYOUT ── */
    .intel-article {
        padding-top: clamp(80px, 10vw, 120px);
        padding-bottom: clamp(80px, 10vw, 120px);
        background: transparent;
        position: relative;
        z-index: 10;
    }

    .intel-container {
        max-width: 720px;
        margin: 0 auto;
        padding: 0 var(--sp-6);
    }

    /* ── HEADER ── */
    .intel-breadcrumbs {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-bottom: var(--sp-8);
        display: flex;
        align-items: center;
        gap: var(--sp-2);
    }
    .intel-breadcrumbs a {
        color: var(--ink-3);
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .intel-breadcrumbs a:hover {
        color: var(--ink-1);
    }
    .breadcrumb-sep {
        opacity: 0.5;
    }

    .intel-tag {
        display: inline-block;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-2);
        border: 1px solid var(--border-2);
        border-radius: 3px;
        padding: 3px 8px;
        margin-bottom: var(--sp-4);
    }

    .intel-title {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(36px, 5vw, 60px);
        line-height: 1.05;
        color: var(--ink-1);
        margin: 0 0 var(--sp-6) 0;
    }

    .intel-meta {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: flex;
        align-items: center;
        gap: var(--sp-2);
    }

    .intel-rule {
        border: 0;
        border-top: 1px solid var(--border-1);
        margin: var(--sp-8) 0;
    }

    /* ── CONTENT (The Article Body) ── */
    .intel-content {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: clamp(16px, 1.6vw, 18px);
        line-height: 1.85;
        color: var(--ink-2);
    }

    /* Target elements inside intel-content as if from markdown */
    .intel-content :global(p) {
        margin-bottom: 2em;
    }
    .intel-content :global(h2) {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(20px, 2.5vw, 28px);
        line-height: 1.2;
        color: var(--ink-1);
        margin: 3em 0 1em;
    }

    /* ── FOOTER ── */
    .intel-footer {
        margin-top: calc(var(--sp-12) * 2);
    }
    .intel-author-block {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-bottom: var(--sp-8);
    }
    .intel-footer-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .intel-back {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ink-2);
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .intel-back:hover {
        color: var(--ink-1);
    }
</style>
