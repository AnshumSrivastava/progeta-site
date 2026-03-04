<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
</script>

<svelte:head>
  <title>About — Progeta Technologies</title>
  <meta name="description" content="Progeta Technologies exists to help people realise and achieve their dreams and goals." />
</svelte:head>

<!-- SECTION 1 — HERO -->
<section class="hero">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">ABOUT PROGETA TECHNOLOGIES</span>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1 class="hero__headline">
        <span class="hero__line">A company with</span>
        <span class="hero__line">one mission.</span>
      </h1>
    </ScrollReveal>
    <ScrollReveal delay={400}>
      <p class="hero__body">
        Progeta Technologies exists to help people realise and achieve their
        dreams and goals. That is not a tagline. It is the reason the company
        was founded, and the filter through which every decision is made.
      </p>
    </ScrollReveal>
  </div>
</section>

<!-- SECTION 2 — THE ORIGIN -->
<section class="origin">
  <div class="container">
    <div class="origin__grid">
      <div class="origin__left">
        <ScrollReveal>
          <span class="eyebrow">THE ORIGIN</span>
          <h2 class="section-heading">Where this began.</h2>
          <div class="origin__rule"></div>
        </ScrollReveal>
      </div>
      <div class="origin__right">
        <ScrollReveal delay={150}>
          <p>
            Progeta Technologies was founded in 2024 with a simple observation:
            the gap between where people are and where they could be is not about
            talent. It is about access, environment, and systems.
          </p>
          <p>
            The people who build extraordinary lives are not necessarily more gifted.
            They had access to the right knowledge, the right community, and the right
            tools at the right time. Progeta Technologies is being built to provide
            exactly that — for everyone.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 3 — THREE INITIATIVES -->
<section class="initiatives">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">HOW WE SHOW UP</span>
      <h2 class="section-heading">Three initiatives. One mission.</h2>
    </ScrollReveal>

    <div class="initiative-strips">
      <ScrollReveal delay={100}>
        <a href="/launchpad" class="i-strip i-strip--launchpad">
          <span class="i-strip-index">01</span>
          <div class="i-strip-body">
            <span class="i-strip-label">EDUCATION</span>
            <h3 class="i-strip-name">LaunchPad</h3>
            <p class="i-strip-desc">Campus programmes, certifications, and tracks that close the gap between education and industry readiness.</p>
          </div>
          <span class="i-strip-arrow">→</span>
        </a>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <a href="/selfos" class="i-strip i-strip--selfos">
          <span class="i-strip-index">02</span>
          <div class="i-strip-body">
            <span class="i-strip-label">PRODUCT</span>
            <h3 class="i-strip-name">SelfOS</h3>
            <p class="i-strip-desc">A personal operating system for people who want to run their life with intention — locally, privately, and with complete ownership.</p>
          </div>
          <span class="i-strip-arrow">→</span>
        </a>
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <a href="/innercircle" class="i-strip i-strip--innercircle">
          <span class="i-strip-index">03</span>
          <div class="i-strip-body">
            <span class="i-strip-label">COMMUNITY</span>
            <h3 class="i-strip-name">InnerCircle</h3>
            <p class="i-strip-desc">A vetted network of people building something real — held to the standard of action and accountability.</p>
          </div>
          <span class="i-strip-arrow">→</span>
        </a>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- SECTION 4 — WHAT WE BELIEVE -->
<section class="beliefs">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">WHAT WE BELIEVE</span>
      <h2 class="section-heading">The things we will not compromise on.</h2>
    </ScrollReveal>

    <div class="beliefs-grid">
      {#each [
        { num: '01', color: '#E05C20', text: 'Every person carries something worth building.', support: 'The circumstances of your birth do not determine the ceiling of your ambition.' },
        { num: '02', color: '#1A8FE3', text: 'Access to growth should never be conditional.', support: 'Geography, income, school quality — none of these should determine who gets the tools to grow.' },
        { num: '03', color: '#18C96A', text: 'Safe environments are not optional — they are foundational.', support: 'People cannot build well when they do not feel safe. We create the conditions for real growth.' },
        { num: '04', color: '#424870', text: 'Individual growth without social responsibility is incomplete.', support: 'We help people build for themselves, and we ask them to build for others too.' },
      ] as belief, i}
        <ScrollReveal delay={100 + i * 120}>
          <div class="belief-cell">
            <span class="belief-num">{belief.num}</span>
            <div class="belief-rule" style="background: {belief.color}"></div>
            <p class="belief-text">{belief.text}</p>
            <p class="belief-support">{belief.support}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- SECTION 5 — CLOSING CTA -->
<section class="about-cta">
  <div class="container">
    <ScrollReveal>
      <div class="about-cta__inner">
        <h2 class="section-heading" style="text-align: center;">This is the beginning.</h2>
        <p class="about-cta__body">
          LaunchPad, SelfOS, and InnerCircle are the first three expressions of this mission. More will follow. We build what the mission needs.
        </p>
        <p class="about-cta__contact">
          Inquiries: <a href="mailto:operations@progeta.tech" class="about-cta__email">operations@progeta.tech</a>
        </p>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
  /* ═══════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════ */
  .hero {
    min-height: 58dvh;
    display: flex;
    align-items: center;
    padding-top: 100px;
    padding-bottom: clamp(60px, 8vw, 100px);
  }
  .hero__headline {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .hero__line {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(48px, 7vw, 80px);
    line-height: 0.93;
    letter-spacing: -0.03em;
    color: #EDF0FF;
  }
  .hero__body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: clamp(15px, 1.5vw, 17px);
    line-height: 1.75;
    color: #8890BB;
    max-width: 520px;
    margin-top: 20px;
  }

  /* ═══════════════════════════════════════════════════
     ORIGIN
     ═══════════════════════════════════════════════════ */
  .origin {
    background: #07090F;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .origin__grid {
    display: grid;
    grid-template-columns: 44% 56%;
    gap: 0 clamp(32px, 5vw, 72px);
    align-items: start;
  }
  .origin__rule {
    width: 32px;
    height: 2px;
    background: #1A8FE3;
    margin-top: 24px;
  }
  .origin__right p {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.8;
    color: #8890BB;
    margin-bottom: 1.6em;
  }
  .origin__right p:last-child { margin-bottom: 0; }

  /* ═══════════════════════════════════════════════════
     INITIATIVES
     ═══════════════════════════════════════════════════ */
  .initiatives {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .initiative-strips { margin-top: 48px; }

  .i-strip {
    display: grid;
    grid-template-columns: 56px 1fr 40px;
    align-items: center;
    gap: 0 32px;
    padding: 36px 0;
    border-top: 1px solid #0F1220;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: background 0.25s ease;
  }
  .i-strip:last-of-type { border-bottom: 1px solid #0F1220; }
  .i-strip:hover { background: rgba(7, 9, 15, 0.7); }

  .i-strip::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    height: 1px;
    width: 0;
    transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .i-strip:hover::before { width: 100%; }
  .i-strip--launchpad::before { background: #E05C20; }
  .i-strip--selfos::before   { background: #1A8FE3; }
  .i-strip--innercircle::before { background: #18C96A; }

  .i-strip-index {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #1E2440;
    padding-top: 4px;
    align-self: start;
  }

  .i-strip-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #424870;
    margin-bottom: 10px;
  }

  .i-strip-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(22px, 2.5vw, 30px);
    color: #EDF0FF;
    margin: 0 0 10px 0;
    line-height: 1;
  }

  .i-strip-desc {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.7;
    color: #8890BB;
    max-width: 540px;
    margin: 0;
  }

  .i-strip-arrow {
    font-size: 18px;
    color: #424870;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    justify-self: end;
  }
  .i-strip:hover .i-strip-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ═══════════════════════════════════════════════════
     BELIEFS
     ═══════════════════════════════════════════════════ */
  .beliefs {
    background: #07090F;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .beliefs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: #0F1220;
    margin-top: 48px;
  }
  .belief-cell {
    background: #07090F;
    padding: 36px 40px;
  }
  .belief-num {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #1E2440;
    display: block;
  }
  .belief-rule {
    width: 24px;
    height: 2px;
    margin-top: 12px;
    margin-bottom: 18px;
  }
  .belief-text {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.7;
    color: #EDF0FF;
    margin: 0;
  }
  .belief-support {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 13px;
    line-height: 1.6;
    color: #8890BB;
    margin-top: 8px;
  }

  /* ═══════════════════════════════════════════════════
     CTA
     ═══════════════════════════════════════════════════ */
  .about-cta {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .about-cta__inner {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
  }
  .about-cta__body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: #8890BB;
    text-align: center;
    margin-top: 16px;
    line-height: 1.7;
  }
  .about-cta__contact {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #424870;
    text-align: center;
    margin-top: 32px;
  }
  .about-cta__email {
    color: #1A8FE3;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  .about-cta__email:hover { opacity: 0.75; }

  /* ═══════════════════════════════════════════════════
     SHARED
     ═══════════════════════════════════════════════════ */
  .eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #424870;
    display: block;
  }
  .section-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(30px, 4vw, 48px);
    line-height: 0.94;
    letter-spacing: -0.025em;
    color: #EDF0FF;
    margin-top: 16px;
  }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .origin__grid { grid-template-columns: 1fr; gap: 32px 0; }
    .beliefs-grid { grid-template-columns: 1fr; }
    .i-strip {
      grid-template-columns: 1fr;
      gap: 16px 0;
    }
    .i-strip-index { display: none; }
    .i-strip-arrow { display: none; }
  }
</style>
