<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

    const filters = [
        "ALL",
        "THREAT INTEL",
        "PRIVACY · SOVEREIGNTY",
        "EDUCATION",
        "CAREERS",
        "GAME THEORY",
        "SELFOS · PRODUCTIVITY",
    ];
    let activeFilter = $state("ALL");

    const articles = [
        {
            date: "MARCH 2026",
            tag: "SOVEREIGNTY SYSTEMS",
            readTime: "8 MIN READ",
            title: "The State of Local-First Systems",
            excerpt:
                "Shared responsibility is shifting. The assumption that data should live on centralised servers — accessible, synced, owned by the platform — is being challenged by a growing number of systems built on the opposite premise. Here is what that shift means for the next decade of computing.",
            slug: "local-first",
        },
        {
            date: "FEB 2026",
            tag: "CTI THREAT INTEL",
            readTime: "12 MIN READ",
            title: "Threat Actor Ecology in EdTech",
            excerpt:
                "Educational infrastructure has become a soft target. Not because it is valuable in the traditional sense, but because it is underfunded, underprepared, and increasingly holds data that is. A mapping of how tactical approaches have shifted toward academic targets and what that means for defenders.",
            slug: "threat-actor-ecology",
        },
        {
            date: "JAN 2026",
            tag: "EDUCATION CAREERS",
            readTime: "6 MIN READ",
            title: "Why Certifications Alone Won't Save You",
            excerpt:
                "Credential inflation is real. A market that demanded certifications created a market that manufactures them. What actually signals competence to a security team in a technical hire — and how the signal-to-noise ratio has shifted in the last three years.",
            slug: "certifications-alone",
        },
        {
            date: "DEC 2025",
            tag: "PRIVACY SOVEREIGNTY",
            readTime: "9 MIN READ",
            title: "Digital Sovereignty Is Not Optional",
            excerpt:
                "The language of privacy has been so thoroughly co-opted by the products that violate it that it no longer carries meaning to most users. Digital sovereignty is a harder, more specific concept — and a necessary one. Why owning your tools is the prerequisite for owning your future.",
            slug: "digital-sovereignty",
        },
        {
            date: "NOV 2025",
            tag: "THREAT INTEL · NETWORK",
            readTime: "10 MIN READ",
            title: "Why Traditional Firewalls Are Failing",
            excerpt:
                "The perimeter is gone. Lateral movement tactics have evolved to exploit exactly the trust relationships that firewalls were built to protect — using legitimate credentials, built-in tools, and slow movement that evades signature-based detection. Here is why the architecture assumption has failed and what replaces it.",
            slug: "firewall-lateral-movement",
        },
    ];

    let filteredArticles = $derived(
        activeFilter === "ALL"
            ? articles
            : articles.filter((a) => {
                  // Naive matching for visual mock
                  const searchTag =
                      activeFilter === "THREAT INTEL"
                          ? "THREAT INTEL"
                          : activeFilter === "PRIVACY · SOVEREIGNTY"
                            ? "SOVEREIGNTY"
                            : activeFilter === "EDUCATION"
                              ? "EDUCATION"
                              : activeFilter === "CAREERS"
                                ? "CAREERS"
                                : activeFilter === "GAME THEORY"
                                  ? "STRATEGY"
                                  : "SELFOS";
                  return a.tag.includes(searchTag);
              }),
    );
</script>

<svelte:head>
    <title>Intel Briefs | Resources | Progeta Technologies</title>
    <meta
        name="description"
        content="Intelligence across domains — cybersecurity, digital sovereignty, game theory, education, and the systems that shape how people build their lives and careers. Written for practitioners in any field."
    />
</svelte:head>

<!-- ═══════ HERO ═══════ -->
<section class="art-hero">
    <div class="art-container">
        <div class="art-hero-content">
            <span class="art-eyebrow">INTEL BRIEFS · RESOURCES</span>
            <h1 class="art-heading">Intelligence<br />without noise.</h1>
            <p class="art-body">
                Intelligence across domains — cybersecurity, digital
                sovereignty, game theory, education, and the systems that shape
                how people build their lives and careers. Written for
                practitioners in any field.
            </p>

            <!-- Filter Bar -->
            <div class="art-filters">
                {#each filters as filter}
                    <button
                        class="art-filter-btn"
                        class:active={activeFilter === filter}
                        onclick={() => (activeFilter = filter)}
                    >
                        {filter}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- ═══════ ARTICLE LIST ═══════ -->
<section class="art-list">
    <div class="art-list-container">
        <ScrollReveal>
            {#each filteredArticles as article}
                <a href="/intel/{article.slug}" class="article-row">
                    <div class="article-meta">
                        <span class="article-date">{article.date}</span>
                        <span class="article-tag">{article.tag}</span>
                        <span class="article-read-time">{article.readTime}</span
                        >
                    </div>
                    <div class="article-body">
                        <h2 class="article-title">{article.title}</h2>
                        <p class="article-excerpt">{article.excerpt}</p>
                        <span class="article-cta">Read Brief →</span>
                    </div>
                </a>
            {/each}

            <div class="articles-coming">
                <a
                    href="mailto:operations@progeta.tech?subject=Subscribe to Intel Briefs"
                    class="coming-link"
                >
                    MORE BRIEFS BEING WRITTEN. SUBSCRIBE FOR UPDATES →
                </a>
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .art-container {
        max-width: var(--w-site);
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }

    /* ── HERO ── */
    .art-hero {
        height: 40vh;
        min-height: 380px;
        display: flex;
        align-items: center;
        background: transparent;
        padding-top: var(--sp-20);
        position: relative;
        z-index: 10;
    }
    .art-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: var(--sp-4);
    }
    .art-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(40px, 5.5vw, 64px);
        line-height: 0.93;
        color: var(--ink-1);
        margin: 0;
    }
    .art-body {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 14px;
        line-height: 1.6;
        color: var(--ink-2);
        max-width: 440px;
        margin-top: 16px;
    }

    .art-filters {
        margin-top: 32px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .art-filter-btn {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-2);
        border: 1px solid var(--border-2);
        background: transparent;
        padding: 6px 14px;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .art-filter-btn:hover,
    .art-filter-btn.active {
        border-color: var(--ink-1);
        color: var(--ink-1);
    }

    /* ── ARTICLE LIST ── */
    .art-list {
        padding-bottom: clamp(60px, 10vw, 120px);
        position: relative;
        z-index: 10;
    }
    .art-list-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }

    .article-row {
        padding: clamp(32px, 5vw, 52px) 0;
        border-top: 1px solid var(--border-1);
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: 0 48px;
        text-decoration: none;
        position: relative;
    }

    .article-row::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 0;
        width: 2px;
        background: var(--ink-1);
        transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .article-row:hover::after {
        height: 100%;
    }

    .article-meta {
        padding-top: 4px;
    }
    .article-date {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: 8px;
    }
    .article-tag {
        display: inline-block;
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ink-4);
        border: 1px solid var(--border-1);
        border-radius: 3px;
        padding: 2px 7px;
        margin-bottom: 6px;
    }
    .article-read-time {
        display: block;
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        color: var(--ink-4);
        margin-top: 16px;
    }

    .article-title {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(22px, 2.8vw, 34px);
        color: var(--ink-1);
        line-height: 1.05;
        margin: 0 0 14px 0;
        transition: color 0.2s ease;
    }
    .article-row:hover .article-title {
        color: #ffffff;
    }
    .article-excerpt {
        font-family: var(--font-body);
        font-weight: 400;
        font-size: 14px;
        line-height: 1.78;
        color: var(--ink-2);
        max-width: 560px;
        margin: 0 0 16px 0;
    }
    .article-cta {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ink-3);
        transition: color 0.2s ease;
    }
    .article-row:hover .article-cta {
        color: var(--ink-1);
    }

    .articles-coming {
        padding: 28px 0;
        border-top: 1px solid var(--border-1);
        margin-bottom: 80px;
    }
    .coming-link {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-4);
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .coming-link:hover {
        color: var(--ink-2);
    }

    @media (max-width: 640px) {
        .art-hero {
            height: auto;
            min-height: auto;
            padding-top: var(--sp-28);
            padding-bottom: var(--sp-12);
        }
        .article-row {
            grid-template-columns: 1fr;
            gap: 16px 0;
            padding: 32px 0 32px 16px; /* Space for the left border */
        }
        .article-meta {
            padding-top: 0;
        }
        .article-date,
        .article-tag {
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 0;
            margin-top: 0;
        }
        .article-read-time {
            display: inline-block;
            margin-top: 0;
        }
    }
</style>
