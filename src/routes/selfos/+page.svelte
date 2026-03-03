<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import OrbitalSystem from '$lib/components/animations/OrbitalSystem.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>SelfOS — Progeta Technologies</title>
  <meta name="description" content="A local-first personal operating system. Tasks, habits, goals, finance, fitness, notes, journal — unified in one place." />
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="hero__content container">
    <div class="hero__text">
      <ScrollReveal>
        <Tag label="SELFOS · PRODUCT BY PROGETA TECHNOLOGIES" variant="active" />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <h1 class="hero__headline">
          <span>You don't have</span>
          <span>a productivity problem.</span>
          <span>You have a</span>
          <span class="hero__accent">system problem.</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={400}>
        <p class="hero__body">
          SelfOS is a personal operating system that lives in your browser or
          your device. Tasks, habits, goals, finance, fitness, notes, journal — unified
          in one place. Your data stays on your device.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={500}>
        <div class="hero__ctas">
          <Button variant="primary" href="/selfos/app" accent="var(--accent-blue)">Try SelfOS</Button>
          <Button variant="ghost" href="/download">Download for local use</Button>
        </div>
      </ScrollReveal>
    </div>
    <div class="hero__visual">
      <OrbitalSystem />
    </div>
  </div>
</section>

<!-- AUTH ENTRY -->
<section class="auth-entry section">
  <div class="container">
    <div class="auth-entry__grid">
      <ScrollReveal>
        <div class="auth-entry__panel">
          <Tag label="CLOUD · MULTI-DEVICE" variant="category" />
          <h3 class="auth-entry__title">Sign in with Supabase</h3>
          <p class="auth-entry__body">
            Access SelfOS from any device. Your data syncs securely.
            Create a free account in under a minute.
          </p>
          <Button variant="primary" href="/auth" accent="var(--accent-blue)">Create Account</Button>
        </div>
      </ScrollReveal>

      <div class="auth-entry__divider">
        <span class="auth-entry__or">or</span>
      </div>

      <ScrollReveal delay={200}>
        <div class="auth-entry__panel">
          <Tag label="LOCAL · PRIVATE" variant="category" />
          <h3 class="auth-entry__title">Download &amp; Run Locally</h3>
          <p class="auth-entry__body">
            SelfOS runs entirely on your device. No account needed.
            Your data never leaves your machine.
          </p>
          <Button variant="ghost" href="/download">Download Guide</Button>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features section">
  <div class="container">
    {#each [
      { title: 'Tasks & Goals', copy: 'Plan what matters. Execute with clarity.', visual: 'checklist' },
      { title: 'Habits', copy: 'Daily rituals that compound over time.', visual: 'streak' },
      { title: 'Finance', copy: 'Finally see your numbers.', visual: 'bars' },
      { title: 'Notes & Journal', copy: 'Your knowledge base and your private voice.', visual: 'cursor' },
      { title: 'Vitals', copy: 'Track what you put in and how you move.', visual: 'wave' },
    ] as feature, i}
      <div class="feature" class:feature--reversed={i % 2 !== 0}>
        <ScrollReveal delay={100}>
          <div class="feature__text">
            <h3 class="feature__title">{feature.title}</h3>
            <p class="feature__copy">{feature.copy}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={250}>
          <div class="feature__visual">
            {#if feature.visual === 'checklist'}
              <div class="fv-checklist">
                {#each ['Design system review', 'Backend integration', 'Launch prep'] as item, j}
                  <div class="fv-check" style="animation-delay: {j * 0.8}s">
                    <span class="fv-check__box"></span>
                    <span class="fv-check__text">{item}</span>
                  </div>
                {/each}
              </div>
            {:else if feature.visual === 'streak'}
              <div class="fv-streak">
                {#each Array(35) as _, j}
                  <span class="fv-streak__dot" class:fv-streak__dot--filled={j < 28} style="animation-delay: {j * 0.03}s"></span>
                {/each}
              </div>
            {:else if feature.visual === 'bars'}
              <div class="fv-bars">
                {#each [60, 85, 45, 70, 90, 55] as h, j}
                  <span class="fv-bar" style="--h: {h}%; animation-delay: {j * 0.1}s"></span>
                {/each}
              </div>
            {:else if feature.visual === 'cursor'}
              <div class="fv-cursor">
                <span class="fv-cursor__line"></span>
              </div>
            {:else if feature.visual === 'wave'}
              <svg class="fv-wave" viewBox="0 0 200 60">
                <path d="M0,30 Q25,10 50,30 Q75,50 100,30 Q125,10 150,30 Q175,50 200,30" fill="none" stroke="var(--ink-3)" stroke-width="1.5" class="fv-wave__path"/>
              </svg>
            {/if}
          </div>
        </ScrollReveal>
      </div>
    {/each}
  </div>
</section>

<!-- PRIVACY -->
<section class="privacy section">
  <div class="container--text">
    <ScrollReveal>
      <span class="privacy__line" aria-hidden="true"></span>
      <h2 class="privacy__heading">Your data stays yours.</h2>
      <p class="privacy__body">
        SelfOS is built local-first. Your data lives on your device by default.
        If you choose cloud sync, your data is encrypted and stored securely
        with Supabase. You can export or delete everything at any time.
        We do not sell data. We do not track behaviour. We do not run ads.
      </p>
    </ScrollReveal>
  </div>
</section>

<style>
  .hero {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
  }
  .hero__content {
    display: flex;
    align-items: center;
    gap: var(--sp-9);
  }
  .hero__text { flex: 1; }
  .hero__visual { width: 45%; min-height: 400px; position: relative; }
  .hero__headline {
    display: flex;
    flex-direction: column;
    margin-top: var(--sp-5);
    margin-bottom: var(--sp-5);
  }
  .hero__headline span { display: block; }
  .hero__accent { color: var(--accent-blue); }
  .hero__body { max-width: 480px; margin-bottom: var(--sp-7); }
  .hero__ctas { display: flex; gap: var(--sp-4); flex-wrap: wrap; }

  /* AUTH ENTRY */
  .auth-entry { background: var(--surface-1); }
  .auth-entry__grid {
    display: flex;
    align-items: stretch;
    gap: var(--sp-8);
  }
  .auth-entry__panel { flex: 1; }
  .auth-entry__title {
    font-family: var(--font-body);
    font-weight: 500;
    font-size: var(--text-lg);
    margin: var(--sp-5) 0;
  }
  .auth-entry__body { margin-bottom: var(--sp-6); }
  .auth-entry__divider {
    width: 1px;
    background: var(--border-2);
    position: relative;
    flex-shrink: 0;
  }
  .auth-entry__or {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--surface-1);
    padding: var(--sp-3) var(--sp-2);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--ink-3);
  }

  /* FEATURES */
  .feature {
    display: flex;
    align-items: center;
    gap: var(--sp-9);
    padding: var(--sp-9) 0;
  }
  .feature--reversed { flex-direction: row-reverse; }
  .feature__text { flex: 1; }
  .feature__title {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--text-lg);
    margin-bottom: var(--sp-4);
  }
  .feature__copy {
    font-weight: 300;
    color: var(--ink-2);
    line-height: var(--leading-normal);
  }
  .feature__visual {
    width: 280px;
    height: 160px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Feature visuals */
  .fv-checklist { display: flex; flex-direction: column; gap: var(--sp-3); width: 100%; }
  .fv-check {
    display: flex; align-items: center; gap: var(--sp-3);
    animation: checkIn 0.4s ease-out both;
  }
  @keyframes checkIn {
    from { opacity: 0; transform: translateX(-8px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .fv-check__box {
    width: 14px; height: 14px; border: 1px solid var(--border-3);
    position: relative;
  }
  .fv-check__box::after {
    content: '✓'; position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: var(--accent-blue);
    animation: checkMark 0.3s 0.5s ease-out both;
  }
  @keyframes checkMark {
    from { opacity: 0; transform: scale(0); }
    to { opacity: 1; transform: scale(1); }
  }
  .fv-check__text { font-size: var(--text-sm); color: var(--ink-2); }

  .fv-streak {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; width: 100%;
  }
  .fv-streak__dot {
    width: 100%; aspect-ratio: 1; border: 1px solid var(--border-2);
    animation: dotFill 0.3s ease-out both;
  }
  .fv-streak__dot--filled { background: var(--accent-blue); border-color: var(--accent-blue); opacity: 0.6; }

  @keyframes dotFill {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }

  .fv-bars {
    display: flex; align-items: flex-end; gap: 8px; height: 100%; width: 100%;
  }
  .fv-bar {
    flex: 1; background: var(--accent-blue); opacity: 0.5;
    height: var(--h); animation: barGrow 0.6s ease-out both;
  }
  @keyframes barGrow {
    from { height: 0; }
    to { height: var(--h); }
  }

  .fv-cursor {
    width: 100%; padding: var(--sp-5); border: 1px solid var(--border-2);
  }
  .fv-cursor__line {
    display: inline-block; width: 2px; height: 18px;
    background: var(--ink-2); animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .fv-wave { width: 100%; height: 60px; }
  .fv-wave__path {
    stroke-dasharray: 320;
    stroke-dashoffset: 320;
    animation: drawWave 2s ease-out forwards;
  }
  @keyframes drawWave {
    to { stroke-dashoffset: 0; }
  }

  /* PRIVACY */
  .privacy {
    background: var(--surface-2);
    text-align: center;
  }
  .privacy__line {
    display: block;
    width: 60px; height: 2px;
    background: var(--accent-blue);
    margin: 0 auto var(--sp-7);
  }
  .privacy__heading {
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-xl);
    margin-bottom: var(--sp-5);
  }
  .privacy__body {
    max-width: none;
    margin-inline: auto;
    line-height: var(--leading-relaxed);
  }

  @media (max-width: 1024px) {
    .hero__content { flex-direction: column; }
    .hero__visual { width: 100%; min-height: 300px; }
    .auth-entry__grid { flex-direction: column; }
    .auth-entry__divider { width: 100%; height: 1px; }
    .auth-entry__or { top: 50%; left: 50%; }
    .feature, .feature--reversed { flex-direction: column; }
    .feature__visual { width: 100%; }
  }
</style>
