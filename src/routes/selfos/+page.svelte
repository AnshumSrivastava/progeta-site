<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import OrbitalSystem from "$lib/components/animations/OrbitalSystem.svelte";
</script>

<svelte:head>
  <title>SelfOS — Launching Soon | Progeta Technologies</title>
  <meta
    name="description"
    content="A local-first personal operating system designed to help you run your life with complete intention and privacy. Launching Soon."
  />
</svelte:head>

<section class="selfos-launching">
  <div class="container launch-container">
    <div class="content-left">
      <ScrollReveal>
        <span class="selfos-eyebrow">SELFOS · INITIATIVE 02</span>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h1 class="launch-heading">
          The personal<br />operating system<br />for your life.<br />
          <span class="text-accent">Launching Soon.</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <p class="launch-body">
          SelfOS is currently in private development. We're building a local-first, 
          end-to-end encrypted system that puts you back in control of your data, 
          your focus, and your intention.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <div class="launch-ctas">
          <a href="/contact" class="btn-primary">GET NOTIFIED →</a>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={400}>
        <div class="mission-pills">
          <div class="pill">
            <span class="pill-dot"></span>
            LOCAL-FIRST
          </div>
          <div class="pill">
            <span class="pill-dot"></span>
            ENCRYPTED
          </div>
          <div class="pill">
            <span class="pill-dot"></span>
            YOURS
          </div>
        </div>
      </ScrollReveal>
    </div>

    <div class="visual-right">
      <div class="orbital-sphere">
        <OrbitalSystem />
      </div>
    </div>
  </div>

  <div class="bg-blur"></div>
</section>

<style>
  .selfos-launching {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: #020408;
    overflow: hidden;
    padding: 120px 0;
  }

  .launch-container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 64px;
    align-items: center;
    position: relative;
    z-index: 5;
  }

  .selfos-eyebrow {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #424870;
    display: block;
    margin-bottom: 24px;
  }

  .launch-heading {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(40px, 6vw, 72px);
    line-height: 1.05;
    color: #edf0ff;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  .text-accent {
    color: var(--accent-selfos, #1a8fe3);
  }

  .launch-body {
    font-family: var(--font-body);
    font-weight: 300;
    font-size: 17px;
    color: #8890bb;
    max-width: 520px;
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .btn-primary {
    display: inline-block;
    padding: 16px 32px;
    background: var(--accent-selfos, #1a8fe3);
    color: #020408;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background: #1478c8;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(26, 143, 227, 0.2);
  }

  .mission-pills {
    display: flex;
    gap: 20px;
    margin-top: 48px;
  }

  .pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: #424870;
    letter-spacing: 0.1em;
  }

  .pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1a8fe3;
    opacity: 0.6;
  }

  .visual-right {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .orbital-sphere {
    width: 600px;
    height: 600px;
    opacity: 0.7;
    filter: drop-shadow(0 0 32px rgba(26, 143, 227, 0.1));
  }

  .bg-blur {
    position: absolute;
    top: 50%;
    right: 0;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(26, 143, 227, 0.08) 0%, transparent 70%);
    filter: blur(80px);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .launch-container {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .launch-body {
      margin-left: auto;
      margin-right: auto;
    }
    .mission-pills {
      justify-content: center;
    }
    .orbital-sphere {
      width: 400px;
      height: 400px;
      margin-top: 40px;
    }
  }
</style>
