<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import Tag from "$lib/components/ui/Tag.svelte";
  import Button from "$lib/components/ui/Button.svelte";
</script>

<svelte:head>
  <title>Download SelfOS — Progeta Technologies</title>
</svelte:head>

<section class="download">
  <div class="download__container">
    <ScrollReveal>
      <div class="download__header">
        <Tag label="SELFOS · ONBOARDING" variant="active" />
        <h1 class="download__heading">Choose your environment.</h1>
        <p class="download__body">
          SelfOS is designed for true digital sovereignty. Run it on your own
          hardware, or leverage our web ecosystem with complete control over
          your data.
        </p>
      </div>
    </ScrollReveal>

    <div class="download__split">
      <!-- Option A: Host Locally -->
      <ScrollReveal delay={150}>
        <div class="split-card split-card--local">
          <div class="card-header">
            <h2>Host Locally</h2>
            <p>
              Full control. Air-gapped capable. Run the source code directly on
              your machine.
            </p>
          </div>
          <div class="download__steps">
            <div class="download__step">
              <span class="download__num">1</span>
              <code class="download__code"
                >git clone https://github.com/progeta/selfos.git</code
              >
            </div>
            <div class="download__step">
              <span class="download__num">2</span>
              <code class="download__code">cd selfos && npm install</code>
            </div>
            <div class="download__step">
              <span class="download__num">3</span>
              <code class="download__code">npm run dev</code>
            </div>
          </div>
          <Button
            variant="secondary"
            href="https://github.com/progeta-site/selfos"
            target="_blank">View Repository →</Button
          >
        </div>
      </ScrollReveal>

      <!-- Option B: Web Ecosystem -->
      <ScrollReveal delay={300}>
        <div class="split-card split-card--web">
          <div class="card-header">
            <h2>Launch Web Ecosystem</h2>
            <p>Instant access with flexible privacy models.</p>
          </div>
          <ul class="feature-list">
            <li>
              <strong>Guest Mode:</strong> Your data never leaves your browser. 100%
              local storage. We see nothing.
            </li>
            <li>
              <strong>Authenticated:</strong> Create a Progeta account for secure,
              synchronized cloud storage across your devices.
            </li>
          </ul>
          <Button
            variant="primary"
            href="/selfos/app"
            accent="var(--accent-blue)">Open Web Ecosystem →</Button
          >
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<style>
  .download {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding-top: 120px;
    padding-bottom: 80px;
  }
  .download__container {
    max-width: var(--w-site);
    margin: 0 auto;
    padding: 0 var(--sp-8);
  }
  .download__header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto var(--sp-12);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .download__heading {
    margin-top: var(--sp-5);
    margin-bottom: var(--sp-5);
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
  }
  .download__body {
    color: var(--ink-2);
    font-size: var(--text-lg);
  }

  .download__split {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-8);
    align-items: stretch;
  }

  .split-card {
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    padding: var(--sp-8);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition:
      transform 0.2s,
      border-color 0.2s;
  }
  .split-card:hover {
    border-color: var(--border-2);
    transform: translateY(-4px);
  }
  .split-card--local {
    background: linear-gradient(
      180deg,
      var(--surface-1) 0%,
      rgba(20, 20, 20, 0.8) 100%
    );
  }
  .split-card--web {
    background: linear-gradient(
      180deg,
      var(--surface-1) 0%,
      rgba(10, 25, 40, 0.4) 100%
    );
    border-color: rgba(56, 189, 248, 0.2);
  }
  .split-card--web:hover {
    border-color: rgba(56, 189, 248, 0.4);
  }

  .card-header {
    margin-bottom: var(--sp-8);
  }
  .card-header h2 {
    font-size: var(--text-2xl);
    margin-bottom: var(--sp-3);
  }
  .card-header p {
    color: var(--ink-3);
    line-height: 1.6;
  }

  .download__steps {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    margin-bottom: var(--sp-8);
    flex: 1;
  }
  .download__step {
    display: flex;
    gap: var(--sp-4);
    align-items: center;
  }
  .download__num {
    font-family: var(--font-mono);
    color: var(--ink-4);
    font-size: var(--text-sm);
  }
  .download__code {
    flex: 1;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--ink-1);
    background: rgba(0, 0, 0, 0.3);
    padding: var(--sp-3) var(--sp-4);
    border: 1px solid var(--border-1);
    overflow-x: auto;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--sp-8) 0;
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
    flex: 1;
  }
  .feature-list li {
    position: relative;
    padding-left: var(--sp-6);
    color: var(--ink-2);
    line-height: 1.6;
  }
  .feature-list li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--accent-blue);
    font-family: var(--font-mono);
  }
  .feature-list strong {
    color: var(--ink-1);
    display: block;
    margin-bottom: var(--sp-1);
  }

  @media (max-width: 900px) {
    .download__split {
      grid-template-columns: 1fr;
    }
  }
</style>
