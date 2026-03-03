<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
</script>

<svelte:head>
  <title>Intel — Progeta Technologies</title>
  <meta name="description" content="Insights, articles, and resources from Progeta Technologies." />
</svelte:head>

<section class="hero">
  <div class="container">
    <ScrollReveal>
      <Tag label="INTEL · INSIGHTS" variant="active" />
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1>Intel</h1>
    </ScrollReveal>
    <ScrollReveal delay={350}>
      <p class="hero__body">
        Insights, articles, and resources from Progeta Technologies.
        No fluff. No clickbait. Just what we have learned and what we think
        is worth sharing.
      </p>
    </ScrollReveal>
  </div>
</section>

<section class="content section">
  <div class="container--text">
    <ScrollReveal>
      <div class="empty">
        <span class="empty__icon">◇</span>
        <p class="empty__text">
          Intel is being built. Articles, case studies, and resources
          from the Progeta Technologies team will appear here soon.
        </p>
        <span class="empty__note">Check back soon.</span>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
  .hero {
    min-height: 50dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
  }
  .hero__body { max-width: 520px; }
  .empty {
    text-align: center;
    padding: var(--sp-9) 0;
  }
  .empty__icon {
    display: block;
    font-size: 32px;
    color: var(--ink-4);
    margin-bottom: var(--sp-5);
  }
  .empty__text {
    max-width: none;
    margin: 0 auto var(--sp-4);
  }
  .empty__note {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
  }
</style>
