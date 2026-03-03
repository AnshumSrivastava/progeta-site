<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>Download SelfOS — Progeta Technologies</title>
</svelte:head>

<section class="download">
  <div class="container--text">
    <ScrollReveal>
      <Tag label="SELFOS · LOCAL SETUP" variant="active" />
      <h1 class="download__heading">Run SelfOS on your machine.</h1>
      <p class="download__body">
        SelfOS runs entirely in your browser. To run it locally with full offline support,
        follow these steps:
      </p>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <div class="download__steps">
        <div class="download__step">
          <span class="download__num">1</span>
          <div class="download__content">
            <h3>Clone the repository</h3>
            <code class="download__code">git clone https://github.com/progeta/selfos.git</code>
          </div>
        </div>
        <div class="download__step">
          <span class="download__num">2</span>
          <div class="download__content">
            <h3>Install dependencies</h3>
            <code class="download__code">cd selfos && npm install</code>
          </div>
        </div>
        <div class="download__step">
          <span class="download__num">3</span>
          <div class="download__content">
            <h3>Run locally</h3>
            <code class="download__code">npm run dev</code>
          </div>
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={400}>
      <p class="download__alt">
        Or just use SelfOS in your browser — no installation needed.
      </p>
      <Button variant="primary" href="/selfos/app" accent="var(--accent-blue)">Open SelfOS in Browser</Button>
    </ScrollReveal>
  </div>
</section>

<style>
  .download {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
  }
  .download__heading {
    margin-top: var(--sp-5);
    margin-bottom: var(--sp-5);
  }
  .download__body { margin-bottom: var(--sp-7); }
  .download__steps {
    display: flex;
    flex-direction: column;
    gap: var(--sp-7);
    margin-bottom: var(--sp-8);
  }
  .download__step {
    display: flex;
    gap: var(--sp-5);
    align-items: flex-start;
  }
  .download__num {
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    color: var(--ink-4);
    margin-top: -2px;
  }
  .download__content h3 {
    font-size: var(--text-md);
    margin-bottom: var(--sp-3);
  }
  .download__code {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--ink-2);
    background: var(--surface-1);
    padding: var(--sp-3) var(--sp-4);
    border: 1px solid var(--border-2);
  }
  .download__alt {
    margin-bottom: var(--sp-5);
    color: var(--ink-3);
  }
</style>
