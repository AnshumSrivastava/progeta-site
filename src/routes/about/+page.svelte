<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import { onMount } from "svelte";

  let heroLineDrawn = $state(false);
  let heroEyebrow = $state(false);
  let heroLine1 = $state(false);
  let heroLine2 = $state(false);
  let heroBody = $state(false);
  let heroScroll = $state(false);

  onMount(() => {
    // Staggered hero entrance
    setTimeout(() => (heroLineDrawn = true), 100);
    setTimeout(() => (heroEyebrow = true), 1200);
    setTimeout(() => (heroLine1 = true), 1500);
    setTimeout(() => (heroLine2 = true), 1650);
    setTimeout(() => (heroBody = true), 2100);
    setTimeout(() => (heroScroll = true), 2700);
  });
</script>

<svelte:head>
  <title>Mission — Progeta Technologies</title>
  <meta
    name="description"
    content="Progeta Technologies exists to help people realise and achieve their dreams and goals. The mission, the origin, the three initiatives, and what we believe."
  />
  <link rel="canonical" href="https://www.progeta.tech/about" />
</svelte:head>

<!-- ═══════ SECTION 1 — THE STATEMENT (Hero) ═══════ -->
<section class="hero">
  <div class="hero__ground-line" class:drawn={heroLineDrawn}></div>
  <div class="container hero__container">
    <span class="eyebrow hero__eyebrow" class:visible={heroEyebrow}
      >PROGETA TECHNOLOGIES · MISSION</span
    >
    <h1 class="hero__headline">
      <span class="hero__line-wrap"
        ><span class="hero__line" class:visible={heroLine1}>A company with</span
        ></span
      >
      <span class="hero__line-wrap"
        ><span class="hero__line" class:visible={heroLine2}>one mission.</span
        ></span
      >
    </h1>
    <p class="hero__body" class:visible={heroBody}>
      Progeta Technologies exists to help people realise and achieve their
      dreams and goals. That is not a tagline. It is the reason the company was
      founded, and the filter through which every decision is made.
    </p>
    <div class="hero__scroll-indicator" class:visible={heroScroll}>
      <span class="hero__scroll-line"></span>
      <span class="hero__scroll-text">SCROLL</span>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 2 — THE OBSERVATION ═══════ -->
<section class="observation">
  <div class="container">
    <div class="observation__grid">
      <div class="observation__left">
        <ScrollReveal>
          <span class="eyebrow">THE OBSERVATION</span>
          <h2 class="section-heading">The gap is not about talent.</h2>
          <div class="observation__rule"></div>
        </ScrollReveal>
      </div>
      <div class="observation__right">
        <ScrollReveal delay={150}>
          <p>
            The gap between where people are and where they could be is not
            about talent. It is about access, environment, and systems. The
            right people, in the wrong environment, with the wrong tools, at the
            wrong time — do not build the lives they are capable of.
          </p>
          <p>
            The people who build extraordinary lives are not necessarily more
            gifted. They had access to the right knowledge at the right time.
            They had community that held them to a standard. They had tools that
            respected their intelligence and their data. Progeta Technologies is
            being built to provide exactly that — <span class="highlight"
              >for everyone</span
            >.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 3 — THE ORIGIN ═══════ -->
<section class="origin">
  <div class="container">
    <div class="origin__inner">
      <span class="origin-year-watermark">2024</span>
      <div class="origin__content">
        <ScrollReveal>
          <span class="eyebrow">THE ORIGIN</span>
          <h2 class="section-heading">Founded in 2024.</h2>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <p>
            Progeta Technologies was founded in 2024 with a simple observation:
            the gap between where people are and where they could be is not
            about talent. It is about access, environment, and systems.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p>
            The founding came from watching students in cities and towns across
            India — motivated, capable people — limited not by their ability but
            by what was available to them. The best knowledge was locked behind
            expensive institutions. The best tools were designed for
            organisations, not individuals. The best communities required
            connections most people do not have.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={280}>
          <p>
            The answer was not another platform. It was a different kind of
            company — one built around a mission rather than a market. Three
            initiatives, each addressing a different dimension of the same
            problem. The mission comes first. Everything else is built to serve
            it.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 4 — THE FOUNDER'S DIRECTIVE ═══════ -->
<section class="directive">
  <div class="container">
    <div class="directive__inner">
      <div class="founders-directive">
        <ScrollReveal>
          <span class="eyebrow">THE FOUNDER'S DIRECTIVE</span>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2 class="directive__heading">
            <span class="directive__heading-l1">"Build with intention,</span>
            <span class="directive__heading-l2">or not at all."</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <p class="directive__body">
            Progeta Technologies exists because we believe the current digital
            landscape is accidental. We build products that require
            responsibility, because responsibility is the precursor to freedom.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={360}>
          <p class="directive__body">
            Our work is not for everyone. It is for the students in small towns
            who feel limited by their geography. It is for the builders who
            refuse to use tools that don't respect them. It is for the
            institutions that want to close the gap between what education
            promises and what it delivers.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={480}>
          <p class="directive__body">
            Every decision we make — every product we build, every person we
            admit to InnerCircle, every partnership we sign — is measured
            against the mission. Not against revenue, not against growth
            metrics, not against what the market wants this quarter. Against the
            mission. If it does not serve the mission, we do not build it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={680}>
          <div class="founders-attribution">
            <span class="founders-name">Anshum Srivastava</span>
            <span class="founders-title"
              >Founder, Progeta Technologies · Est. 2024</span
            >
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 5 — THE THREE INITIATIVES ═══════ -->
<section class="initiatives">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">HOW WE SHOW UP</span>
      <h2 class="section-heading">Three initiatives. One mission.</h2>
      <p class="initiatives__intro">
        Each initiative addresses a different dimension of the same problem.
        They are not separate products — they are three expressions of one
        answer.
      </p>
    </ScrollReveal>

    <div class="initiative-strips">
      <ScrollReveal delay={100}>
        <a href="/launchpad" class="i-strip i-strip--launchpad">
          <span class="i-strip-index">01</span>
          <div class="i-strip-body">
            <span class="i-strip-label">EDUCATION</span>
            <h3 class="i-strip-name">LaunchPad</h3>
            <p class="i-strip-desc">
              Campus programmes, certification tracks, workshops, and student
              chapters. Closing the skill gap between what education delivers
              and what industry requires.
            </p>
          </div>
          <span class="i-strip-arrow">→</span>
        </a>
      </ScrollReveal>
      <ScrollReveal delay={180}>
        <a href="/selfos" class="i-strip i-strip--selfos">
          <span class="i-strip-index">02</span>
          <div class="i-strip-body">
            <span class="i-strip-label">PRODUCT</span>
            <h3 class="i-strip-name">SelfOS</h3>
            <p class="i-strip-desc">
              A local-first personal operating system for people who want to run
              their life with complete intention and privacy. Your data. Your
              device. Your system.
            </p>
          </div>
          <span class="i-strip-arrow">→</span>
        </a>
      </ScrollReveal>
      <ScrollReveal delay={260}>
        <a href="/innercircle" class="i-strip i-strip--innercircle">
          <span class="i-strip-index">03</span>
          <div class="i-strip-body">
            <span class="i-strip-label">COMMUNITY</span>
            <h3 class="i-strip-name">InnerCircle</h3>
            <p class="i-strip-desc">
              A vetted network of people building something real, held to the
              standard of action and accountability. Not a forum — a circle.
            </p>
          </div>
          <span class="i-strip-arrow">→</span>
        </a>
      </ScrollReveal>
    </div>

    <!-- Fourth initiative — in planning -->
    <ScrollReveal delay={500}>
      <div class="initiative-future">
        <span class="initiative-future-index">04</span>
        <div>
          <span class="initiative-future-label">IN DEVELOPMENT</span>
          <h3 class="initiative-future-name">"Something new."</h3>
          <span class="initiative-future-status"
            >ARCHITECTURAL PLANNING · Q4 2026 TARGET</span
          >
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══════ SECTION 6 — WHAT WE BELIEVE ═══════ -->
<section class="beliefs">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">WHAT WE BELIEVE</span>
      <h2 class="section-heading">The things we will not compromise on.</h2>
    </ScrollReveal>

    <div class="beliefs-grid">
      {#each [{ num: "01", color: "#E05C20", text: "Every person carries something worth building.", support: "The circumstances of your birth do not determine the ceiling of your ambition. Access to the environment to build is a right, not a privilege." }, { num: "02", color: "#1A8FE3", text: "Access to growth should never be conditional.", support: "Geography, income, school quality — none of these should determine who receives the tools, knowledge, and community to grow." }, { num: "03", color: "#18C96A", text: "Safe environments are not optional — they are foundational.", support: "People cannot build with full capacity when they do not feel safe. We create the conditions before we expect the output." }, { num: "04", color: "#424870", text: "Individual growth without social responsibility is incomplete.", support: "We help people build for themselves. And we ask them to build for others, too. Individual duty is the counterweight to individual sovereignty." }] as belief, i}
        <ScrollReveal delay={100 + i * 80}>
          <div class="belief-cell">
            <span class="belief-num">{belief.num}</span>
            <div class="belief-rule" style="background: {belief.color}"></div>
            <p class="belief-statement">{belief.text}</p>
            <p class="belief-support">{belief.support}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════ SECTION 7 — THE FUTURE ═══════ -->
<section class="future">
  <div class="container">
    <ScrollReveal>
      <div class="future__inner">
        <h2 class="future__heading">This is the beginning.</h2>
        <div class="future__rule"></div>
        <p class="future__body">
          LaunchPad, SelfOS, and InnerCircle are the first three expressions of
          this mission. There will be more. We build what the mission needs, not
          what the market wants. As long as the gap exists between where people
          are and where they could be, we have work to do.
        </p>
        <div class="mission-contact">
          <span class="mission-contact-label">INQUIRIES</span>
          <a href="mailto:operations@progeta.tech" class="mission-contact-email"
            >operations@progeta.tech</a
          >
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
  /* ═══════════════════════════════════════════════════
     SHARED TOKENS
     ═══════════════════════════════════════════════════ */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 64px);
  }
  .eyebrow {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #424870;
    display: block;
  }
  .section-heading {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(28px, 3.5vw, 44px);
    line-height: 1;
    letter-spacing: -0.025em;
    color: #edf0ff;
    margin-top: 16px;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 1 — HERO
     ═══════════════════════════════════════════════════ */
  .hero {
    min-height: 65vh;
    display: flex;
    align-items: flex-end;
    padding-bottom: clamp(60px, 8vw, 100px);
    position: relative;
    overflow: hidden;
  }
  .hero__container {
    position: relative;
    z-index: 1;
  }

  /* Ground line animation */
  .hero__ground-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 0;
    background: #0f1220;
    transition: width 900ms cubic-bezier(0.76, 0, 0.24, 1);
  }
  .hero__ground-line.drawn {
    width: 100%;
  }

  /* Eyebrow fade */
  .hero__eyebrow {
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 600ms ease,
      transform 600ms ease;
  }
  .hero__eyebrow.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Headline slide-up */
  .hero__headline {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .hero__line-wrap {
    display: block;
    overflow: hidden;
  }
  .hero__line {
    display: block;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(52px, 8vw, 96px);
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: #edf0ff;
    transform: translateY(110%);
    transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hero__line.visible {
    transform: translateY(0);
  }

  /* Body fade */
  .hero__body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: clamp(15px, 1.5vw, 17px);
    line-height: 1.78;
    color: #8890bb;
    max-width: 520px;
    margin-top: 22px;
    opacity: 0;
    transition: opacity 600ms ease;
  }
  .hero__body.visible {
    opacity: 1;
  }

  /* Scroll indicator */
  .hero__scroll-indicator {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 400ms ease;
  }
  .hero__scroll-indicator.visible {
    opacity: 1;
  }
  .hero__scroll-line {
    width: 1px;
    height: 32px;
    background: #1e2440;
  }
  .hero__scroll-text {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    color: #1e2440;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 2 — OBSERVATION
     ═══════════════════════════════════════════════════ */
  .observation {
    background: #07090f;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .observation__grid {
    display: grid;
    grid-template-columns: 42% 58%;
    gap: 0 clamp(32px, 5vw, 72px);
    align-items: start;
  }
  .observation__rule {
    width: 32px;
    height: 2px;
    background: #424870;
    margin-top: 20px;
  }
  .observation__right p {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.82;
    color: #8890bb;
    margin-bottom: 1.6em;
  }
  .observation__right p:last-child {
    margin-bottom: 0;
  }
  .highlight {
    color: #edf0ff;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 3 — ORIGIN
     ═══════════════════════════════════════════════════ */
  .origin {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .origin__inner {
    position: relative;
    overflow: hidden;
    max-width: 720px;
  }
  .origin-year-watermark {
    position: absolute;
    top: clamp(-20px, -3vw, -40px);
    right: 0;
    font-family: "DM Mono", monospace;
    font-weight: 700;
    font-size: clamp(80px, 14vw, 160px);
    color: #07090f;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    z-index: 0;
    letter-spacing: -0.04em;
  }
  .origin__content {
    position: relative;
    z-index: 1;
  }
  .origin__content p {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.82;
    color: #8890bb;
    max-width: 640px;
    margin-top: 1.6em;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 4 — FOUNDER'S DIRECTIVE
     ═══════════════════════════════════════════════════ */
  .directive {
    background: #0c0e18;
    padding: clamp(80px, 12vw, 140px) 0;
  }
  .directive__inner {
    max-width: 680px;
    margin: 0 auto;
  }
  .founders-directive {
    position: relative;
    padding-left: clamp(28px, 4vw, 52px);
  }
  .founders-directive::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: rgba(237, 240, 255, 0.15);
  }
  .directive__heading {
    margin-top: 20px;
  }
  .directive__heading-l1 {
    display: block;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(32px, 4.5vw, 52px);
    line-height: 1.2;
    color: #edf0ff;
  }
  .directive__heading-l2 {
    display: block;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(28px, 4vw, 46px);
    line-height: 1.2;
    color: #edf0ff;
  }
  .directive__body {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(17px, 2vw, 22px);
    color: #8890bb;
    line-height: 1.85;
    max-width: 560px;
    margin-top: 28px;
  }
  .founders-attribution {
    margin-top: 36px;
    padding-top: 28px;
    border-top: 1px solid #0f1220;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .founders-name {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #edf0ff;
  }
  .founders-title {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #424870;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 5 — INITIATIVES
     ═══════════════════════════════════════════════════ */
  .initiatives {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .initiatives__intro {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: #8890bb;
    max-width: 540px;
    margin-top: 14px;
    line-height: 1.7;
  }
  .initiative-strips {
    margin-top: 48px;
  }

  .i-strip {
    display: grid;
    grid-template-columns: 64px 1fr 48px;
    align-items: center;
    gap: 0 32px;
    padding: clamp(28px, 4vw, 44px) 0;
    border-top: 1px solid #0f1220;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: background 0.25s ease;
  }
  .i-strip:last-of-type {
    border-bottom: 1px solid #0f1220;
  }
  .i-strip:hover {
    background: #07090f;
  }

  .i-strip::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    height: 2px;
    width: 0;
    transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .i-strip:hover::before {
    width: 100%;
  }
  .i-strip--launchpad::before {
    background: #e05c20;
  }
  .i-strip--selfos::before {
    background: #1a8fe3;
  }
  .i-strip--innercircle::before {
    background: #18c96a;
  }

  .i-strip-index {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #1e2440;
    align-self: start;
    padding-top: 5px;
  }
  .i-strip-label {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #424870;
    margin-bottom: 8px;
  }
  .i-strip-name {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(22px, 2.8vw, 34px);
    color: #edf0ff;
    margin: 0 0 10px 0;
    line-height: 1;
  }
  .i-strip-desc {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.72;
    color: #8890bb;
    max-width: 540px;
    margin: 0;
  }
  .i-strip-arrow {
    font-size: 18px;
    color: #424870;
    opacity: 0;
    transform: translateX(-8px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    justify-self: end;
  }
  .i-strip:hover .i-strip-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Fourth initiative (future) */
  .initiative-future {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 0 32px;
    padding: clamp(24px, 3.5vw, 36px) 0;
    border-top: 1px dashed #0f1220;
    opacity: 0.5;
    margin-top: 0;
  }
  .initiative-future-index {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #1e2440;
    padding-top: 5px;
    align-self: start;
  }
  .initiative-future-label {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1e2440;
    margin-bottom: 8px;
  }
  .initiative-future-name {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(18px, 2.2vw, 26px);
    color: #424870;
    margin: 0 0 8px 0;
    line-height: 1;
  }
  .initiative-future-status {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #1e2440;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 6 — BELIEFS
     ═══════════════════════════════════════════════════ */
  .beliefs {
    background: #07090f;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .beliefs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: #0f1220;
    margin-top: 48px;
  }
  .belief-cell {
    background: #07090f;
    padding: clamp(28px, 4vw, 44px);
    transition: background 0.2s ease;
  }
  .belief-cell:hover {
    background: #0c0e18;
  }
  .belief-num {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #1e2440;
    display: block;
  }
  .belief-rule {
    width: 24px;
    height: 2px;
    margin: 12px 0 18px 0;
  }
  .belief-statement {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: clamp(15px, 1.6vw, 17px);
    color: #edf0ff;
    line-height: 1.45;
    margin: 0 0 10px 0;
  }
  .belief-support {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #8890bb;
    line-height: 1.68;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════
     SECTION 7 — FUTURE
     ═══════════════════════════════════════════════════ */
  .future {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .future__inner {
    max-width: 580px;
    margin: 0 auto;
    text-align: center;
  }
  .future__heading {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(28px, 3.5vw, 44px);
    color: #edf0ff;
    line-height: 0.95;
  }
  .future__rule {
    width: 40px;
    height: 1px;
    background: #424870;
    margin: 22px auto 28px;
  }
  .future__body {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(17px, 2vw, 22px);
    color: #8890bb;
    line-height: 1.85;
    max-width: 520px;
    margin: 0 auto;
  }
  .mission-contact {
    margin-top: 36px;
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-align: center;
  }
  .mission-contact-label {
    color: #1e2440;
    display: block;
    margin-bottom: 6px;
    text-transform: uppercase;
  }
  .mission-contact-email {
    color: #424870;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .mission-contact-email:hover {
    color: #edf0ff;
  }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 640px) {
    .hero__line {
      font-size: clamp(40px, 9vw, 52px);
      line-height: 0.97;
    }
    .observation__grid {
      grid-template-columns: 1fr;
      gap: 24px 0;
    }
    .origin-year-watermark {
      font-size: clamp(60px, 18vw, 80px);
    }
    .directive__heading-l1 {
      font-size: clamp(26px, 6vw, 36px);
    }
    .directive__heading-l2 {
      font-size: clamp(22px, 5vw, 32px);
    }
    .directive__body {
      font-size: clamp(16px, 4vw, 19px);
    }
    .founders-directive {
      padding-left: 20px;
    }
    .i-strip {
      grid-template-columns: 1fr;
      gap: 12px 0;
    }
    .i-strip-index {
      display: block;
      margin-bottom: 4px;
    }
    .i-strip-arrow {
      display: none;
    }
    .i-strip {
      padding: 24px 0;
    }
    .initiative-future {
      grid-template-columns: 1fr;
    }
    .initiative-future-index {
      margin-bottom: 4px;
    }
    .beliefs-grid {
      grid-template-columns: 1fr;
    }
    .belief-cell {
      padding: 24px 20px;
    }
    .future__body {
      font-size: clamp(16px, 4vw, 18px);
    }
  }
</style>
