<script lang="ts">
  import { onMount } from 'svelte';
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import MorphingConstellation from '$lib/components/animations/MorphingConstellation.svelte';
  import { highlights, systemStatus, rotatingFacts } from '$lib/content/highlights';

  onMount(() => {
    // Intel feed: clone cards for infinite scroll
    const track = document.querySelector('.briefs-track');
    if (track && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Array.from(track.children).forEach(child => {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }
  });
</script>

<svelte:head>
  <title>Progeta Technologies — Realising Human Potential</title>
  <meta name="description" content="Progeta Technologies is a mission expressed as a company: helping people realise and achieve their dreams and goals." />
</svelte:head>

<!-- ═══════════════════════════════════════════════════
     SECTION 1 — HERO
     ═══════════════════════════════════════════════════ -->
<section class="hero">
  <div class="hero__inner">
    <div class="hero__left">
      <!-- System Status -->
      <ScrollReveal delay={100} distance={10}>
        <div class="hero__status">
          <span class="status-dot"></span>
          <span class="status-text">SYSTEM OPERATIONAL · EST. 2024 · GLOBAL</span>
        </div>
      </ScrollReveal>

      <!-- Headline -->
      <h1 class="hero__headline">
        <ScrollReveal delay={300} distance={20} stagger={0}>
          <span class="hero__line">We exist</span>
        </ScrollReveal>
        <ScrollReveal delay={450} distance={20} stagger={0}>
          <span class="hero__line">so you can <span class="hero__accent">build</span></span>
        </ScrollReveal>
        <ScrollReveal delay={600} distance={20} stagger={0}>
          <span class="hero__line">the life</span>
        </ScrollReveal>
        <ScrollReveal delay={750} distance={20} stagger={0}>
          <span class="hero__line">you mean to.</span>
        </ScrollReveal>
      </h1>

      <!-- What's Happening -->
      <ScrollReveal delay={1000} distance={15}>
        <p class="hero__subline">A mission expressed as a company — helping people realise and achieve their dreams and goals.</p>
      </ScrollReveal>

      <ScrollReveal delay={1100} distance={10}>
        <div class="hero__whats-new">
          {#each highlights as item}
            <a href={item.href} class="wn-pill">
              <span class="wn-pill__dot" style={item.accent ? `background: ${item.accent}` : ''}></span>
              <span class="wn-pill__text">{item.title}</span>
              {#if item.label}
                <span class="wn-pill__badge">{item.label}</span>
              {/if}
            </a>
          {/each}
        </div>
      </ScrollReveal>

      <!-- Primary CTAs -->
      <ScrollReveal delay={1200} distance={20}>
        <div class="hero__ctas">
          <Button variant="primary" href="/about">Explore the Mission</Button>
          <a href="#initiatives" class="hero__secondary-cta">View Initiatives <span class="arrow">→</span></a>
        </div>
      </ScrollReveal>

      <!-- Belief markers -->
      <ScrollReveal delay={1400} distance={10}>
        <div class="hero__belief-words">
          <span>EQUALITY</span>
          <span>·</span>
          <span>INTENTION</span>
          <span>·</span>
          <span>SOVEREIGNTY</span>
        </div>
      </ScrollReveal>
    </div>

    <div class="hero__right">
      <ScrollReveal delay={400} scale={0.95} duration={1400} distance={0}>
        <div class="hero__illustration">
          <MorphingConstellation />
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 2 — MANIFESTO
     ═══════════════════════════════════════════════════ -->
<section class="manifesto-section">
  <div class="manifesto-container">
    <ScrollReveal delay={200} distance={20}>
      <span class="manifesto-deco" aria-hidden="true">"</span>
      <blockquote class="manifesto-quote">
        <p>We believe every person carries something worth building.</p>
        <p>A dream unrealised is not a failure of the person —<br>
           it is a failure of the environment around them.</p>
        <p class="manifesto-close">
          Progeta Technologies is that environment, <strong>built differently.</strong>
        </p>
      </blockquote>
      <div style="width: 48px; height: 1px; background: #222840; margin: 32px auto 0;"></div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 2B — BELIEF MARKERS
     ═══════════════════════════════════════════════════ -->
<section class="vision">
  <div class="container--wide">
    <div class="vision__markers">
      <div class="vision__marker" style="--accent: var(--accent-launchpad)">
        <ScrollReveal delay={500} distance={10}>
          <span class="marker__number">01</span>
          <h3 class="marker__heading" style="color: var(--accent-launchpad)">Equality</h3>
          <p class="marker__text">The environment must be accessible to anyone with the drive to build — regardless of background, geography, or circumstance.</p>
        </ScrollReveal>
      </div>
      <div class="vision__marker" style="--accent: var(--accent-selfos)">
        <ScrollReveal delay={650} distance={10}>
          <span class="marker__number">02</span>
          <h3 class="marker__heading" style="color: var(--accent-selfos)">Intention</h3>
          <p class="marker__text">Nothing is accidental. Every pixel and every programme has a purpose aligned to the singular mission of human potential.</p>
        </ScrollReveal>
      </div>
      <div class="vision__marker" style="--accent: var(--accent-innercircle)">
        <ScrollReveal delay={800} distance={10}>
          <span class="marker__number">03</span>
          <h3 class="marker__heading" style="color: var(--accent-innercircle)">SOVEREIGNTY</h3>
          <p class="marker__text">The goal is individual duty. We help you own your future — not depend on us for it.</p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<section class="strips" id="initiatives">
  <div class="initiative-grid">
    <!-- LaunchPad -->
    <ScrollReveal delay={100} distance={20} class="init-card-wrapper">
      <a href="/launchpad" class="init-card" style="--accent: var(--accent-launchpad)">
        <span class="init-card__label">INITIATIVE // 01</span>
        <h3 class="init-card__title">LaunchPad</h3>
        <p class="init-card__desc">Closing the skill gap between education and readiness through immersive certification tracks and campus programmes.</p>
        <ul class="init-card__sublinks">
          <li>Cybersecurity Track</li>
          <li>Cloud Engineering</li>
          <li>AI Systems</li>
        </ul>
        <span class="init-card__link">Enter the LaunchPad <span class="arrow">→</span></span>
      </a>
    </ScrollReveal>

    <!-- SelfOS -->
    <ScrollReveal delay={200} distance={20} class="init-card-wrapper">
      <a href="/selfos" class="init-card" style="--accent: var(--accent-selfos)">
        <span class="init-card__label">INITIATIVE // 02</span>
        <h3 class="init-card__title">SelfOS</h3>
        <p class="init-card__desc">A local-first personal operating system designed to help you run your life with complete intention and privacy.</p>
        <ul class="init-card__sublinks">
          <li>Local-First Architecture</li>
          <li>End-to-End Encryption</li>
        </ul>
        <span class="init-card__link">Initialize SelfOS <span class="arrow">→</span></span>
      </a>
    </ScrollReveal>

    <!-- InnerCircle -->
    <ScrollReveal delay={300} distance={20} class="init-card-wrapper">
      <a href="/innercircle" class="init-card" style="--accent: var(--accent-innercircle)">
        <span class="init-card__label">INITIATIVE // 03</span>
        <h3 class="init-card__title">InnerCircle</h3>
        <p class="init-card__desc">A vetted network for builders who are actively creating something real and want to be surrounded by peers of similar drive.</p>
        <ul class="init-card__sublinks">
          <li>Builder Network</li>
          <li>Invite-Only Events</li>
        </ul>
        <span class="init-card__link">Apply for Access <span class="arrow">→</span></span>
      </a>
    </ScrollReveal>

    <!-- Ghost -->
    <ScrollReveal delay={400} distance={20} class="init-card-wrapper">
      <div class="init-card init-card--ghost">
        <span class="init-card__label">INITIATIVE // 04</span>
        <h3 class="init-card__title">Next Initiative</h3>
        <p class="init-card__desc">Currently in architectural planning. Focused on digital sovereignty and open knowledge networks.</p>
        <ul class="init-card__sublinks">
          <li>In Development</li>
          <li>Q4 2026 Target</li>
        </ul>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 4 — FROM THE COMPANY
     ═══════════════════════════════════════════════════ -->
<section class="company">
  <div class="container--wide">
    <div class="company__statement-block">
      <ScrollReveal delay={100} distance={20}>
        <span class="section-label">THE FOUNDER'S DIRECTIVE</span>
        <h2 class="company__heading">Build with intention,<br/>or not at all.</h2>
        <div class="company__body">
          <p>Progeta Technologies exists because we believe the current digital landscape is accidental. We build tools that require responsibility, because responsibility is the precursor to freedom.</p>
          <p>Our work is not for everyone. It is for the students in small towns who feel limited by their geography. It is for the builders who refuse to use tools that don't respect them.</p>
        </div>

      </ScrollReveal>
    </div>

    <!-- Rotating Truths — full-width row -->
    <div class="truths-row">
      <ScrollReveal delay={300} distance={15}>
        <span class="section-label">THINGS WE BELIEVE</span>
      </ScrollReveal>
      <div class="truths-grid">
        {#each rotatingFacts as fact, i}
          <ScrollReveal delay={400 + i * 120} distance={15}>
            <div class="truth-card">
              <span class="truth-number">{String(i + 1).padStart(2, '0')}</span>
              <p class="truth-text">{fact}</p>
            </div>
          </ScrollReveal>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 6 — GAMES
     ═══════════════════════════════════════════════════ -->
<section class="games-teaser">
  <div class="container--wide">
    <div class="games-teaser__grid">
      <div class="games-teaser__content">
        <ScrollReveal delay={100} distance={20}>
          <span class="section-label">INTERACTIVE LABS</span>
          <h2 class="games-teaser__title">The Training Ground.</h2>
          <p class="games-teaser__desc">Immersive simulations designed to bridge the gap between theory and tactical reality. From CTI scenarios to infrastructure defense.</p>
          <div class="games-teaser__stats">
            <div class="mini-stat">
              <span class="mini-stat__val">03</span>
              <span class="mini-stat__lab">Live Sims</span>
            </div>
            <div class="mini-stat">
              <span class="mini-stat__val">12</span>
              <span class="mini-stat__lab">Modules</span>
            </div>
          </div>
          <Button variant="primary" href="/games">Enter Games Lab</Button>
        </ScrollReveal>
      </div>
      <div class="games-teaser__visual">
        <!-- Abstract game visual placeholder -->
        <div class="game-orb-wrap">
          <div class="game-orb"></div>
          <div class="game-orb-ring"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 7 — INTELLIGENCE BRIEFS
     ═══════════════════════════════════════════════════ -->
<section class="briefs-teaser">
  <div class="briefs-header-wrap">
    <ScrollReveal delay={100}>
      <span class="section-label">INTEL FEED</span>
      <h2 class="briefs-title">Intelligence Briefs.</h2>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <a href="/resources/articles" class="view-all">View All Briefs <span class="arrow">→</span></a>
    </ScrollReveal>
  </div>

  <!-- Infinite scroll marquee -->
  <div class="briefs-marquee-wrap">
    <div class="briefs-fade briefs-fade--left"></div>
    <div class="briefs-fade briefs-fade--right"></div>
    <div class="briefs-marquee">
      <div class="briefs-track">
        <!-- First set -->
        <a href="/intel/local-first" class="brief-card brief-card--featured">
          <span class="brief-meta">MARCH 2026 // INTEL</span>
          <h3 class="brief-title">The State of Local-First Systems</h3>
          <p class="brief-excerpt">An analysis of why shared responsibility is shifting toward individual sovereignty in the next decade of computing.</p>
          <div class="brief-tags">
            <span class="brief-tag">SOVEREIGNTY</span>
            <span class="brief-tag">SYSTEMS</span>
          </div>
          <span class="brief-link">Read Brief <span class="arrow">→</span></span>
        </a>
        <a href="/intel/threat-actor-ecology" class="brief-card">
          <span class="brief-meta">FEB 2026 // CTI</span>
          <h3 class="brief-title">Threat Actor Ecology in EdTech</h3>
          <p class="brief-excerpt">Mapping the shift in tactical approaches toward educational infrastructure and the resulting skill gap.</p>
          <div class="brief-tags">
            <span class="brief-tag">CTI</span>
            <span class="brief-tag">THREAT INTEL</span>
          </div>
          <span class="brief-link">Read Brief <span class="arrow">→</span></span>
        </a>
        <a href="/intel/certifications-alone" class="brief-card">
          <span class="brief-meta">JAN 2026 // EDUCATION</span>
          <h3 class="brief-title">Why Certifications Alone Won't Save You</h3>
          <p class="brief-excerpt">Credential inflation is real. What actually signals competence versus compliance.</p>
          <div class="brief-tags">
            <span class="brief-tag">EDUCATION</span>
            <span class="brief-tag">CAREERS</span>
          </div>
          <span class="brief-link">Read Brief <span class="arrow">→</span></span>
        </a>
        <a href="/intel/digital-sovereignty" class="brief-card">
          <span class="brief-meta">DEC 2025 // PHILOSOPHY</span>
          <h3 class="brief-title">Digital Sovereignty Is Not Optional</h3>
          <p class="brief-excerpt">Why owning your data and your tools is not a luxury — it is a prerequisite for agency.</p>
          <div class="brief-tags">
            <span class="brief-tag">PRIVACY</span>
            <span class="brief-tag">SOVEREIGNTY</span>
          </div>
          <span class="brief-link">Read Brief <span class="arrow">→</span></span>
        </a>

      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 8 — FINAL CTA
     ═══════════════════════════════════════════════════ -->
<section class="final-cta">
  <div class="container--wide">
    <div class="final-cta__content">
      <ScrollReveal delay={100} distance={30}>
        <h2 class="final-cta__title">Ready to start building?</h2>
        <p class="final-cta__desc">Find where you fit. Every path leads to the same destination — becoming who you're meant to be.</p>
      </ScrollReveal>
    </div>

    <div class="pathway-grid">
      <ScrollReveal delay={200} distance={20}>
        <a href="/launchpad" class="pathway-card" style="--accent: var(--accent-launchpad)">
          <span class="pathway-label">FOR STUDENTS</span>
          <h3 class="pathway-title">Start a Track</h3>
          <p class="pathway-desc">Explore certification tracks in Cybersecurity, AI, Cloud, and more. Built for learners who mean it.</p>
          <span class="pathway-action">Explore Tracks <span class="arrow">→</span></span>
        </a>
      </ScrollReveal>

      <ScrollReveal delay={320} distance={20}>
        <a href="/launchpad/colleges" class="pathway-card" style="--accent: var(--accent-launchpad)">
          <span class="pathway-label">FOR COLLEGES</span>
          <h3 class="pathway-title">Partner with Us</h3>
          <p class="pathway-desc">Bring LaunchPad to your campus. Student chapters, sessions, full certification programmes.</p>
          <span class="pathway-action">Get in Touch <span class="arrow">→</span></span>
        </a>
      </ScrollReveal>

      <ScrollReveal delay={440} distance={20}>
        <a href="/innercircle" class="pathway-card" style="--accent: var(--accent-innercircle)">
          <span class="pathway-label">FOR BUILDERS</span>
          <h3 class="pathway-title">Join InnerCircle</h3>
          <p class="pathway-desc">A vetted community for those actively creating something real. Not for everyone — and that's the point.</p>
          <span class="pathway-action">Apply for Access <span class="arrow">→</span></span>
        </a>
      </ScrollReveal>

      <ScrollReveal delay={560} distance={20}>
        <a href="/contact" class="pathway-card" style="--accent: var(--accent-selfos)">
          <span class="pathway-label">FOR ORGANISATIONS</span>
          <h3 class="pathway-title">Work With Progeta</h3>
          <p class="pathway-desc">Custom training, consulting, or strategic partnerships. We work with institutions that share our values.</p>
          <span class="pathway-action">Inquire <span class="arrow">→</span></span>
        </a>
      </ScrollReveal>
    </div>
    
    <div class="truth-section-wrap">
      <ScrollReveal delay={700}>
        <div class="truth-container">
          <p class="truth-text-main">
            We are looking for those who seek the hard truth over the easy lie.
          </p>
          <div class="truth-rule"></div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<style>
  /* ═══════════════════════════════════════════════════
     GENERAL UTILS
     ═══════════════════════════════════════════════════ */


  /* ═══════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════ */
  .hero {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 130px;
    overflow: hidden;
  }

  .hero__inner {
    max-width: var(--w-full);
    margin: 0 auto;
    padding: 0 var(--sp-6);
    display: flex;
    align-items: center;
    width: 100%;
  }

  .hero__left {
    width: 60%;
    z-index: 2;
  }

  .hero__right {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    z-index: 1;
  }

  /* System Status */
  .hero__status {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    margin-bottom: var(--sp-7);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: #00ff88;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff88;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }

  .status-text {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #424870;
  }

  .status-sep {
    color: var(--ink-4);
    margin: 0 2px;
  }

  /* Headline */
  .hero__headline {
    margin-bottom: var(--sp-8);
  }

  .hero__line {
    display: block;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(48px, 8vw, 84px);
    line-height: 0.95;
    letter-spacing: var(--tracking-compressed);
    color: var(--ink-1);
  }

  .hero__accent {
    color: var(--accent-launchpad);
    background: linear-gradient(to right, var(--accent-launchpad), #ffaa44);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Subline */
  .hero__subline {
    font-family: var(--font-body);
    font-size: 18px;
    color: var(--ink-2);
    line-height: 1.6;
    max-width: 520px;
    margin-bottom: var(--sp-7);
    font-weight: 300;
  }

  /* What's New Pills */
  .hero__whats-new {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-3);
    margin-bottom: var(--sp-9);
  }

  .wn-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-2) var(--sp-5);
    border: 1px solid var(--border-2);
    border-radius: 100px;
    text-decoration: none;
    transition: border-color 0.2s, transform 0.2s;
    background: rgba(255,255,255,0.02);
  }

  .wn-pill:hover {
    border-color: var(--ink-4);
    transform: translateY(-1px);
  }

  .wn-pill__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ink-4);
    flex-shrink: 0;
  }

  .wn-pill__text {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--ink-1);
  }

  .wn-pill__badge {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--accent-launchpad);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* CTAs */
  .hero__ctas {
    display: flex;
    align-items: center;
    gap: var(--sp-7);
  }

  .hero__secondary-cta {
    font-family: var(--font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-2);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    transition: color 0.2s;
  }

  .hero__secondary-cta:hover {
    color: var(--ink-1);
  }

  .hero__secondary-cta .arrow {
    transition: transform 0.3s var(--ease-out-expo);
  }

  .hero__secondary-cta:hover .arrow {
    transform: translateX(4px);
  }

  /* Belief words */
  .hero__belief-words {
    margin-top: var(--sp-10);
    display: flex;
    gap: var(--sp-5);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-4);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  /* Illustration / Logo */
  .hero__illustration {
    width: 100%;
    max-width: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero__logo {
    width: 100%;
    max-width: 320px;
    height: auto;
    opacity: 0.15;
    filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.1));
  }

  /* ═══════════════════════════════════════════════════
     MANIFESTO SECTION
     ═══════════════════════════════════════════════════ */
  .manifesto-section {
    background: #07090F;
    padding: clamp(88px, 11vw, 148px) clamp(24px, 5vw, 72px);
  }
  .manifesto-container {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  .manifesto-deco {
    position: absolute;
    top: -20px;
    left: -8px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 200px;
    font-weight: 700;
    line-height: 1;
    color: #0C0E18;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }
  .manifesto-quote {
    position: relative;
    z-index: 1;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-weight: 300;
    font-size: clamp(19px, 2.3vw, 26px);
    line-height: 1.85;
    color: #EDF0FF;
    margin: 0;
    padding: 0;
    border: none;
  }
  .manifesto-quote p { margin-bottom: 1.3em; }
  .manifesto-quote p:last-child { margin-bottom: 0; }
  .manifesto-close { font-style: normal; }
  .manifesto-close strong { font-weight: 600; }

  /* ═══════════════════════════════════════════════════
     VISION (BELIEF MARKERS)
     ═══════════════════════════════════════════════════ */
  .vision {
    padding: var(--sp-12) 0;
    background: var(--surface-1);
  }

  .vision__markers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-10);
    margin-top: var(--sp-11);
  }

  .vision__marker {
    border-top: 2px solid var(--accent, var(--border-2));
    padding-top: var(--sp-7);
  }

  .marker__number {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--ink-4);
    display: block;
    margin-bottom: var(--sp-3);
  }

  .marker__heading {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 600;
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
  }

  .marker__text {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-2);
    line-height: var(--leading-relaxed);
  }

  /* ═══════════════════════════════════════════════════
     STRIPS (INITIATIVES) -> Full bleed 50/50 Grid
     ═══════════════════════════════════════════════════ */
  .strips {
    width: 100vw;
    margin-left: calc(-50vw + 50%); /* Full bleed trick */
    padding-bottom: var(--sp-12);
  }

  .initiative-grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 100vw;
    gap: 0;
  }

  /* Need this to pass height from ScrollReveal to card */
  :global(.init-card-wrapper) {
    display: block;
    width: 100%;
  }

  .init-card {
    background: var(--surface-1);
    border-top: 1px solid var(--border-2);
    border-bottom: 1px solid var(--border-2);
    margin: -1px 0 0 0;
    padding: var(--sp-8) max(24px, 10vw);
    display: grid;
    grid-template-columns: 180px 2fr 1fr auto;
    align-items: center;
    gap: var(--sp-6);
    text-decoration: none;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .init-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .init-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
  }

  .init-card:hover::before {
    opacity: 1;
  }

  .init-card__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.2em;
    display: block;
  }

  .init-card__title {
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 36px);
    font-weight: 700;
    color: var(--accent);
    margin: 0;
  }

  .init-card__desc {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-3);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  .init-card__sublinks {
    list-style: none;
    margin: 0 0 var(--sp-8) 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }

  .init-card__sublinks li {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: var(--sp-3);
  }

  .init-card__sublinks li::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    background: var(--ink-5);
    border-radius: 50%;
  }

  .init-card__link {
    font-family: var(--font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--ink-1);
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }

  .init-card__link .arrow {
    transition: transform 0.3s var(--ease-out-expo);
  }

  .init-card:hover .init-card__link .arrow {
    transform: translateX(5px);
  }

  /* Ghost card */
  .init-card--ghost {
    border-style: dashed;
    pointer-events: none;
  }

  .init-card--ghost .init-card__title {
    color: var(--ink-4);
    font-weight: 300;
  }

  .init-card--ghost .init-card__desc,
  .init-card--ghost .init-card__label {
    color: var(--ink-4);
  }

  /* ═══════════════════════════════════════════════════
     COMPANY (THE DIRECTIVE)
     ═══════════════════════════════════════════════════ */
  .company {
    padding: var(--sp-12) 0;
    background: var(--ground);
  }

  .company__statement-block {
    max-width: 800px;
    margin-bottom: var(--sp-12);
  }

  .company__heading {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    color: var(--ink-1);
    margin: var(--sp-5) 0 var(--sp-7);
    line-height: 1.1;
  }

  .company__body {
    font-family: var(--font-body);
    font-size: 18px;
    color: var(--ink-2);
    line-height: 1.7;
    max-width: 600px;
  }

  .company__body p {
    margin-bottom: var(--sp-6);
  }


  /* Truths Grid */
  .truths-row {
    border-top: 1px solid var(--border-2);
    padding-top: var(--sp-10);
  }

  .truths-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-6);
    margin-top: var(--sp-6);
  }

  .truth-card {
    padding: var(--sp-8);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    transition: border-color 0.3s;
  }

  .truth-card:hover {
    border-color: var(--ink-4);
  }

  .truth-number {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    display: block;
    margin-bottom: var(--sp-4);
  }

  .truth-text {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-2);
    line-height: 1.6;
    font-style: italic;
  }



  /* ═══════════════════════════════════════════════════
     GAMES TEASER
     ═══════════════════════════════════════════════════ */
  .games-teaser {
    padding: var(--sp-12) 0;
    background: #050505;
    overflow: hidden;
  }

  .games-teaser__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-11);
    align-items: center;
  }

  .games-teaser__title {
    font-family: var(--font-display);
    font-size: 56px;
    color: #fff;
    margin: var(--sp-5) 0 var(--sp-6);
  }

  .games-teaser__desc {
    font-family: var(--font-body);
    font-size: 18px;
    color: #888;
    line-height: 1.6;
    max-width: 480px;
    margin-bottom: var(--sp-8);
  }

  .games-teaser__stats {
    display: flex;
    gap: var(--sp-9);
    margin-bottom: var(--sp-9);
  }

  .mini-stat__val {
    display: block;
    font-family: var(--font-mono);
    font-size: 24px;
    color: #fff;
  }

  .mini-stat__lab {
    font-family: var(--font-mono);
    font-size: 10px;
    color: #555;
    text-transform: uppercase;
  }

  .games-teaser__visual {
    display: flex;
    justify-content: center;
  }

  .game-orb-wrap {
    position: relative;
    width: 300px;
    height: 300px;
  }

  .game-orb {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #333, #000);
    box-shadow: 0 0 50px rgba(255,100,0,0.2), inset 0 0 20px rgba(255,255,255,0.05);
  }

  .game-orb-ring {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    border: 1px solid rgba(255,100,0,0.3);
    border-radius: 50%;
    animation: ringRotate 10s linear infinite;
  }

  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* ═══════════════════════════════════════════════════
     BRIEFS (MARQUEE)
     ═══════════════════════════════════════════════════ */
  .briefs-teaser {
    padding: var(--sp-12) 0;
    overflow: hidden;
  }

  .briefs-header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--sp-10);
    padding: 0 var(--sp-8);
    max-width: var(--w-wide);
    margin-left: auto;
    margin-right: auto;
  }

  .briefs-title {
    font-family: var(--font-display);
    font-size: 40px;
    color: var(--ink-1);
    margin-top: var(--sp-4);
  }

  .view-all {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    color: var(--ink-2);
    text-decoration: none;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }

  .briefs-marquee-wrap {
    position: relative;
    width: 100%;
  }

  .briefs-fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 120px;
    z-index: 2;
    pointer-events: none;
  }

  .briefs-fade--left {
    left: 0;
    background: linear-gradient(to right, var(--ground), transparent);
  }

  .briefs-fade--right {
    right: 0;
    background: linear-gradient(to left, var(--ground), transparent);
  }

  .briefs-marquee {
    overflow: hidden;
    width: 100%;
  }

  .briefs-track {
    display: flex;
    gap: var(--sp-5);
    animation: marqueeScroll 40s linear infinite;
    width: max-content;
  }

  .briefs-track:hover {
    animation-play-state: paused;
  }

  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .brief-card {
    min-width: 340px;
    max-width: 380px;
    padding: var(--sp-8);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    transition: border-color 0.3s, transform 0.3s;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    text-decoration: none;
  }

  .brief-card:hover {
    border-color: var(--ink-4);
    transform: translateY(-4px);
  }

  .brief-card--featured {
    border-color: var(--accent-launchpad);
  }

  .brief-meta {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-4);
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: var(--sp-4);
  }

  .brief-title {
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--ink-1);
    margin-bottom: var(--sp-3);
    line-height: 1.3;
  }

  .brief-excerpt {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--ink-3);
    line-height: 1.6;
    margin-bottom: var(--sp-5);
    flex-grow: 1;
  }

  .brief-tags {
    display: flex;
    gap: var(--sp-2);
    margin-bottom: var(--sp-5);
  }

  .brief-tag {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--ink-4);
    border: 1px solid var(--border-2);
    padding: 2px 8px;
    letter-spacing: 0.08em;
  }

  .brief-link {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-launchpad);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }

  .brief-link .arrow {
    transition: transform 0.3s;
  }

  .brief-card:hover .brief-link .arrow {
    transform: translateX(4px);
  }

  /* ═══════════════════════════════════════════════════
     FINAL CTA
     ═══════════════════════════════════════════════════ */
  .final-cta {
    padding: var(--sp-12) 0;
    background: var(--surface-2);
  }

  .final-cta__content {
    text-align: center;
    margin-bottom: var(--sp-11);
    padding: 0 var(--sp-6);
  }

  .final-cta__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 700;
    color: var(--ink-1);
    margin-bottom: var(--sp-5);
    letter-spacing: var(--tracking-compressed);
  }

  .final-cta__desc {
    font-family: var(--font-body);
    font-size: 20px;
    color: var(--ink-2);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.5;
  }

  /* Pathway cards */
  .pathway-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-6);
    margin-bottom: var(--sp-12);
    padding: 0 var(--sp-6);
  }

  .pathway-card {
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    padding: var(--sp-8);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    transition: border-color 0.3s, transform 0.3s;
    position: relative;
  }

  .pathway-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
  }

  .pathway-card:hover {
    border-color: var(--accent);
    transform: translateY(-6px);
  }



  .pathway-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    margin-bottom: var(--sp-4);
    display: block;
  }

  .pathway-title {
    font-family: var(--font-display);
    font-size: 24px;
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
    letter-spacing: -0.01em;
  }

  .pathway-desc {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink-3);
    line-height: 1.6;
    margin-bottom: auto;
    padding-bottom: var(--sp-8);
  }

  .pathway-action {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-1);
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }

  .pathway-action .arrow {
    transition: transform 0.3s var(--ease-out-expo);
  }

  .pathway-card:hover .pathway-action .arrow {
    transform: translateX(4px);
  }

  .truth-section-wrap {
    text-align: center;
    padding: clamp(80px, 10vw, 120px) 0;
    margin: 60px 0;
  }
  .truth-container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  .truth-text-main {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(28px, 4.5vw, 58px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #EDF0FF;
    margin: 0;
  }
  .truth-rule {
    width: 40px;
    height: 2px;
    background: #222840;
    margin: 32px auto 0;
  }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .hero__inner { flex-direction: column; text-align: center; padding-top: 100px; }
    .hero__left, .hero__right { width: 100%; }
    .hero__right { justify-content: center; margin-top: var(--sp-9); }
    .hero__ctas { justify-content: center; }
    .hero__whats-new { justify-content: center; }
    .hero__belief-words { justify-content: center; }
    .hero__subline { margin-left: auto; margin-right: auto; text-align: center; }

    .vision__markers { grid-template-columns: 1fr; gap: var(--sp-10); }

    .init-card {
      grid-template-columns: 1fr;
      text-align: center;
      padding: var(--sp-8) var(--sp-6);
      gap: var(--sp-4);
    }
    .init-card__sublinks {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }
    .init-card__link {
      justify-content: center;
      margin-top: var(--sp-4);
    }
    .strips { margin-left: 0; width: 100%; }
    
    :global(.init-card-wrapper) .init-card,
    :global(.init-card-wrapper:nth-child(even)) .init-card {
      padding: var(--sp-10) var(--sp-6);
      width: 100%;
    }

    .company__heading { font-size: 36px; }
    .truths-grid { grid-template-columns: 1fr; }

    .games-teaser__grid { grid-template-columns: 1fr; text-align: center; }
    .games-teaser__stats { justify-content: center; }
    .games-teaser__visual { order: -1; margin-bottom: var(--sp-9); }

    .pathway-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .hero__ctas { flex-direction: column; gap: var(--sp-5); }
    .final-cta__title { font-size: 40px; }
  }
</style>
