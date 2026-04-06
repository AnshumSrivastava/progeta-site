<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import Button from "$lib/components/ui/Button.svelte";
</script>

<svelte:head>
  <title>Hire Ready: Leverage AI to Stay Relevant and Get Hired | Progeta Technologies</title>
  <meta
    name="description"
    content="A practical session designed to help you navigate the tech job market using AI as an advantage. 12 April 2026 — Register now for ₹499."
  />
</svelte:head>

<!-- ═══════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════ -->
<section class="hr-hero">
  <div class="hr-hero__inner">
    <ScrollReveal delay={100} distance={10}>
      <img src="/launchpad.svg" alt="LaunchPad" class="hr-hero__event-logo" />
    </ScrollReveal>

    <ScrollReveal delay={300} distance={20}>
      <h1 class="hr-hero__title">
        <span class="hr-hero__line">Hire Ready</span>
        <span class="hr-hero__subtitle-line">Leverage AI to Stay Relevant</span>
        <span class="hr-hero__subtitle-line">and <span class="hr-hero__accent">Get Hired</span></span>
      </h1>
    </ScrollReveal>

    <ScrollReveal delay={500} distance={15}>
      <p class="hr-hero__desc">
        The job market is shifting faster than most people can keep up.
        AI isn't replacing you — but someone using AI will.
        This session gives you the clarity, tools, and direction to stay ahead.
      </p>
      <div class="hr-hero__badges">
        <span class="hr-hero__pill">Limited Seats</span>
        <span class="hr-hero__pill">Certificate on Completion</span>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={700} distance={10}>
      <div class="hr-hero__meta">
        <div class="hr-meta-item">
          <span class="hr-meta-label">DATE</span>
          <span class="hr-meta-value">12 April 2026</span>
        </div>
        <div class="hr-meta-divider"></div>
        <div class="hr-meta-item">
          <span class="hr-meta-label">TIME</span>
          <span class="hr-meta-value">1 PM Onwards</span>
        </div>
        <div class="hr-meta-divider"></div>
        <div class="hr-meta-item">
          <span class="hr-meta-label">FORMAT</span>
          <span class="hr-meta-value">Live Session</span>
        </div>
        <div class="hr-meta-divider"></div>
        <div class="hr-meta-item">
          <span class="hr-meta-label">INVESTMENT</span>
          <span class="hr-meta-value hr-meta-value--price">₹499</span>
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={900} distance={10}>
      <div class="hr-hero__cta">
        <Button variant="primary" href="https://payments.cashfree.com/forms/hireready" target="_blank" accent="#D35400">
          Register Now — ₹499
        </Button>
        <a href="/" class="hr-hero__powered">
          <span class="hr-hero__powered-text">Powered by</span>
          <img src="/logo_icon.svg" alt="Progeta" class="hr-hero__powered-logo" />
          <div class="hr-hero__powered-brand">
            <span class="hr-hero__powered-name">PROGETA</span>
            <span class="hr-hero__powered-sub">Technologies</span>
          </div>
        </a>
      </div>
    </ScrollReveal>
  </div>

  <!-- Ambient glow -->
  <div class="hr-hero__glow" aria-hidden="true"></div>
</section>

<!-- ═══════════════════════════════════════════════════
     WHAT YOU WILL GET
     ═══════════════════════════════════════════════════ -->
<section class="hr-section">
  <div class="hr-container">
    <ScrollReveal delay={100} distance={20}>
      <span class="section-label">WHAT YOU WILL GET</span>
      <h2 class="hr-section__title">Walk away with something real.</h2>
    </ScrollReveal>

    <div class="hr-benefits-grid">
      <ScrollReveal delay={200} distance={15}>
        <div class="hr-benefit-card">
          <span class="hr-benefit-number">01</span>
          <h3 class="hr-benefit-title">Hiring Clarity</h3>
          <p class="hr-benefit-desc">
            Clear understanding of what actually matters in hiring today — 
            beyond buzzwords and outdated advice.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={320} distance={15}>
        <div class="hr-benefit-card">
          <span class="hr-benefit-number">02</span>
          <h3 class="hr-benefit-title">AI as Your Edge</h3>
          <p class="hr-benefit-desc">
            How to use AI to improve your learning, output, and the quality 
            of work you produce — practically.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={440} distance={15}>
        <div class="hr-benefit-card">
          <span class="hr-benefit-number">03</span>
          <h3 class="hr-benefit-title">Direction & Portfolio</h3>
          <p class="hr-benefit-desc">
            Direction on building skills, projects, and a portfolio 
            that demonstrates real capability.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={560} distance={15}>
        <div class="hr-benefit-card">
          <span class="hr-benefit-number">04</span>
          <h3 class="hr-benefit-title">A Structured Path</h3>
          <p class="hr-benefit-desc">
            Move from confusion and anxiety to a clear, actionable roadmap 
            for getting job ready.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SESSION STRUCTURE
     ═══════════════════════════════════════════════════ -->
<section class="hr-section hr-section--alt">
  <div class="hr-container">
    <ScrollReveal delay={100} distance={20}>
      <span class="section-label">SESSION STRUCTURE</span>
      <h2 class="hr-section__title">Five segments. One transformation.</h2>
      <p class="hr-section__subtitle">
        Each segment is designed to build on the last — starting with mindset, 
        then equipping you with tools and action.
      </p>
    </ScrollReveal>

    <div class="hr-agenda">
      <ScrollReveal delay={200} distance={10}>
        <div class="hr-agenda-item">
          <div class="hr-agenda-marker">
            <span class="hr-agenda-marker__num">01</span>
            <div class="hr-agenda-marker__line"></div>
          </div>
          <div class="hr-agenda-content">
            <span class="hr-agenda-tag">FUNDAMENTALS · 15 MIN</span>
            <h3 class="hr-agenda-title">The Reality Check</h3>
            <p class="hr-agenda-desc">
              What the job market actually looks like right now, and what most people get wrong 
              about staying relevant.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300} distance={10}>
        <div class="hr-agenda-item">
          <div class="hr-agenda-marker">
            <span class="hr-agenda-marker__num">02</span>
            <div class="hr-agenda-marker__line"></div>
          </div>
          <div class="hr-agenda-content">
            <span class="hr-agenda-tag hr-agenda-tag--focus">FOCUS · DEEP DIVE</span>
            <h3 class="hr-agenda-title">Your Learning Roadmap</h3>
            <p class="hr-agenda-desc">
              Building a structured learning path that actually leads somewhere — 
              not random certifications, but intentional skill architecture.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={350} distance={10}>
        <div class="hr-agenda-break">
          <span class="hr-agenda-break__text">— SHORT BREAK —</span>
          <span class="hr-agenda-break__note">Placed here intentionally for cognitive processing</span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={400} distance={10}>
        <div class="hr-agenda-item">
          <div class="hr-agenda-marker">
            <span class="hr-agenda-marker__num">03</span>
            <div class="hr-agenda-marker__line"></div>
          </div>
          <div class="hr-agenda-content">
            <span class="hr-agenda-tag hr-agenda-tag--focus">FOCUS · LIVE DEMO</span>
            <h3 class="hr-agenda-title">AI Tools That Actually Matter</h3>
            <p class="hr-agenda-desc">
              Live demonstration of AI tools that improve how you learn, build, and present yourself — 
              not theory, but actual workflow integration.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={500} distance={10}>
        <div class="hr-agenda-item">
          <div class="hr-agenda-marker">
            <span class="hr-agenda-marker__num">04</span>
            <div class="hr-agenda-marker__line"></div>
          </div>
          <div class="hr-agenda-content">
            <span class="hr-agenda-tag">EXTENSION · 15 MIN</span>
            <h3 class="hr-agenda-title">Extension, Not Replacement</h3>
            <p class="hr-agenda-desc">
              The emotional pivot — stop worrying about AI replacing you, and start acting 
              on what it actually unlocks for your career.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={600} distance={10}>
        <div class="hr-agenda-item">
          <div class="hr-agenda-marker">
            <span class="hr-agenda-marker__num">05</span>
            <div class="hr-agenda-marker__line hr-agenda-marker__line--last"></div>
          </div>
          <div class="hr-agenda-content">
            <span class="hr-agenda-tag hr-agenda-tag--focus">FOCUS · HANDS-ON</span>
            <h3 class="hr-agenda-title">Resume & Portfolio Overhaul</h3>
            <p class="hr-agenda-desc">
              The most hands-on segment — rebuilding how you present yourself, 
              your projects, and your value proposition.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     HOW IT WORKS + PREPARATION
     ═══════════════════════════════════════════════════ -->
<section class="hr-section">
  <div class="hr-container">
    <div class="hr-two-col">
      <div class="hr-col">
        <ScrollReveal delay={100} distance={20}>
          <span class="section-label">HOW IT WORKS</span>
          <h2 class="hr-section__title">Simple. Direct. Live.</h2>
          <div class="hr-info-list">
            <div class="hr-info-item">
              <span class="hr-info-icon">◉</span>
              <p>Session will be conducted live — not pre-recorded.</p>
            </div>
            <div class="hr-info-item">
              <span class="hr-info-icon">◉</span>
              <p>Group link will be shared before the event.</p>
            </div>
            <div class="hr-info-item">
              <span class="hr-info-icon">◉</span>
              <p>Same link will be sent via email.</p>
            </div>
            <div class="hr-info-item">
              <span class="hr-info-icon">◉</span>
              <p>All updates and communication happen through the group.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div class="hr-col">
        <ScrollReveal delay={300} distance={20}>
          <span class="section-label">PREPARATION</span>
          <h2 class="hr-section__title">Come ready.</h2>
          <div class="hr-info-list">
            <div class="hr-info-item">
              <span class="hr-info-icon">◈</span>
              <p>Keep a notes app (or notebook and pen) ready.</p>
            </div>
            <div class="hr-info-item">
              <span class="hr-info-icon">◈</span>
              <p>Come with a role or direction in mind — even a broad one.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     IMPORTANT NOTES
     ═══════════════════════════════════════════════════ -->
<section class="hr-section hr-section--alt">
  <div class="hr-container">
    <ScrollReveal delay={100} distance={20}>
      <span class="section-label">IMPORTANT NOTES</span>
      <h2 class="hr-section__title">Before you register.</h2>
    </ScrollReveal>
    
    <div class="hr-notes-grid">
      <ScrollReveal delay={200} distance={10}>
        <div class="hr-note-card">
          <div class="hr-note-icon">?</div>
          <h3>Questions</h3>
          <p>All questions will be answered at the end of the session. Stay till the end.</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={320} distance={10}>
        <div class="hr-note-card">
          <div class="hr-note-icon">★</div>
          <h3>Certificate</h3>
          <p>Certificate will be given only to participants who attend the full session.</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={440} distance={10}>
        <div class="hr-note-card">
          <div class="hr-note-icon">₹</div>
          <h3>Investment</h3>
          <p>The event costs <strong>₹499</strong>. Registration secures your seat and enables all event access and certificate.</p>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     FINAL CTA
     ═══════════════════════════════════════════════════ -->
<section class="hr-final">
  <div class="hr-container">
    <ScrollReveal delay={100} distance={30}>
      <div class="hr-final__content">
        <h2 class="hr-final__title">Stop scrolling.<br/>Start building.</h2>
        <p class="hr-final__desc">
          The gap between where you are and where you want to be 
          isn't as wide as you think. You just need the right direction.
        </p>
        <div class="hr-final__cta">
          <Button variant="primary" href="https://payments.cashfree.com/forms/hireready" target="_blank" accent="#D35400" size="lg">
            Register for Hire Ready — ₹499
          </Button>
        </div>
        <div class="hr-final__details">
          <span>12 April 2026</span>
          <span class="hr-final__dot">·</span>
          <span>1 PM Onwards</span>
          <span class="hr-final__dot">·</span>
          <span>Live Session</span>
          <span class="hr-final__dot">·</span>
          <span>Certificate Included</span>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
  /* ═══════════════════════════════════════════════════
     HIRE READY — HERO
     ═══════════════════════════════════════════════════ */
  .hr-hero {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 140px var(--container-pad) 80px;
    overflow: hidden;
    text-align: center;
  }

  .hr-hero__inner {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .hr-hero__glow {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(211, 84, 0, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .hr-hero__event-logo {
    height: 22px;
    width: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto var(--sp-8);
    filter: brightness(0) invert(1) opacity(0.85);
  }

  .hr-hero__title {
    margin-bottom: var(--sp-7);
    line-height: 1;
  }

  .hr-hero__line {
    display: block;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(52px, 8vw, 88px);
    line-height: 0.95;
    letter-spacing: var(--tracking-compressed);
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
  }

  .hr-hero__subtitle-line {
    display: block;
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(22px, 3vw, 34px);
    line-height: 1.3;
    color: var(--ink-2);
    letter-spacing: -0.01em;
  }

  .hr-hero__accent {
    color: var(--accent-launchpad);
    background: linear-gradient(to right, var(--accent-launchpad), #ffaa44);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  .hr-hero__desc {
    font-family: var(--font-body);
    font-size: clamp(16px, 1.5vw, 18px);
    color: var(--ink-3);
    line-height: 1.7;
    max-width: 580px;
    margin: 0 auto var(--sp-4);
  }

  /* Meta strip */
  .hr-hero__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-6);
    margin-bottom: var(--sp-9);
    flex-wrap: wrap;
  }

  .hr-meta-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-1);
  }

  .hr-meta-label {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    color: var(--ink-4);
    text-transform: uppercase;
  }

  .hr-meta-value {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-1);
    font-weight: 500;
  }

  .hr-meta-value--price {
    color: var(--accent-launchpad);
    font-weight: 700;
    font-size: 20px;
  }

  .hr-meta-divider {
    width: 1px;
    height: 32px;
    background: var(--border-2);
  }

  /* CTA */
  .hr-hero__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-4);
  }

  .hr-hero__badges {
    display: flex;
    gap: var(--sp-3);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--sp-5);
  }

  .hr-hero__pill {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding: var(--sp-1) var(--sp-4);
    border: 1px solid var(--border-2);
    border-radius: 100px;
  }

  .hr-hero__powered {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    margin-top: var(--sp-2);
    transition: opacity 0.2s;
  }

  .hr-hero__powered:hover {
    opacity: 0.7;
  }

  .hr-hero__powered-text {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    letter-spacing: 0.08em;
    margin-right: 2px;
  }

  .hr-hero__powered-logo {
    height: 15px;
    width: auto;
    opacity: 0.8;
  }

  .hr-hero__powered-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    line-height: 1;
  }

  .hr-hero__powered-name {
    font-family: var(--font-roboto);
    font-size: 12px;
    font-weight: 700;
    color: var(--ink-2);
    letter-spacing: var(--tracking-compressed);
    line-height: 1;
  }

  .hr-hero__powered-sub {
    font-family: var(--font-body);
    font-size: 5px;
    font-weight: 300;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-4);
    text-transform: uppercase;
    line-height: 1;
  }

  /* ═══════════════════════════════════════════════════
     SECTIONS
     ═══════════════════════════════════════════════════ */
  .hr-section {
    padding: var(--section-pad) var(--container-pad);
    background: var(--ground);
  }

  .hr-section--alt {
    background: var(--surface-1);
  }

  .hr-container {
    max-width: var(--w-wide);
    margin: 0 auto;
  }

  .hr-section__title {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    color: var(--ink-1);
    margin: var(--sp-4) 0 var(--sp-6);
    letter-spacing: var(--tracking-compressed);
    line-height: 1.1;
  }

  .hr-section__subtitle {
    font-family: var(--font-body);
    font-size: clamp(16px, 1.5vw, 18px);
    color: var(--ink-3);
    line-height: 1.7;
    max-width: 580px;
    margin-bottom: var(--sp-10);
  }

  /* ═══════════════════════════════════════════════════
     BENEFITS GRID
     ═══════════════════════════════════════════════════ */
  .hr-benefits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-6);
    margin-top: var(--sp-8);
  }

  .hr-benefit-card {
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    padding: var(--sp-8);
    transition: border-color 0.3s, transform 0.3s;
    position: relative;
  }

  .hr-benefit-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--accent-launchpad), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .hr-benefit-card:hover {
    border-color: var(--accent-launchpad);
    transform: translateY(-4px);
  }

  .hr-benefit-card:hover::before {
    opacity: 1;
  }

  .hr-benefit-number {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    display: block;
    margin-bottom: var(--sp-4);
  }

  .hr-benefit-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--ink-1);
    margin-bottom: var(--sp-3);
  }

  .hr-benefit-desc {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink-3);
    line-height: 1.7;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════
     AGENDA TIMELINE
     ═══════════════════════════════════════════════════ */
  .hr-agenda {
    margin-top: var(--sp-10);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .hr-agenda-item {
    display: flex;
    gap: var(--sp-7);
    padding: var(--sp-7) 0;
  }

  .hr-agenda-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 40px;
  }

  .hr-agenda-marker__num {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent-launchpad);
    margin-bottom: var(--sp-3);
  }

  .hr-agenda-marker__line {
    flex: 1;
    width: 1px;
    background: var(--border-2);
    min-height: 40px;
  }

  .hr-agenda-marker__line--last {
    background: linear-gradient(to bottom, var(--border-2), transparent);
  }

  .hr-agenda-content {
    flex: 1;
    padding-bottom: var(--sp-4);
  }

  .hr-agenda-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-4);
    display: inline-block;
    padding: var(--sp-1) var(--sp-3);
    border: 1px solid var(--border-2);
    margin-bottom: var(--sp-3);
  }

  .hr-agenda-tag--focus {
    border-color: var(--accent-launchpad);
    color: var(--accent-launchpad);
    background: rgba(211, 84, 0, 0.06);
  }

  .hr-agenda-title {
    font-family: var(--font-display);
    font-size: clamp(20px, 2.5vw, 26px);
    font-weight: 600;
    color: var(--ink-1);
    margin-bottom: var(--sp-3);
    letter-spacing: -0.01em;
  }

  .hr-agenda-desc {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink-3);
    line-height: 1.7;
    max-width: 520px;
    margin: 0;
  }

  /* Break */
  .hr-agenda-break {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--sp-6) 0;
    gap: var(--sp-2);
  }

  .hr-agenda-break__text {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    letter-spacing: 0.2em;
  }

  .hr-agenda-break__note {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--ink-4);
    font-style: italic;
    opacity: 0.7;
  }

  /* ═══════════════════════════════════════════════════
     TWO COLUMN (HOW IT WORKS + PREP)
     ═══════════════════════════════════════════════════ */
  .hr-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-12);
  }

  .hr-info-list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-5);
    margin-top: var(--sp-6);
  }

  .hr-info-item {
    display: flex;
    align-items: flex-start;
    gap: var(--sp-4);
  }

  .hr-info-icon {
    color: var(--accent-launchpad);
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .hr-info-item p {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink-2);
    line-height: 1.6;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════
     NOTES GRID
     ═══════════════════════════════════════════════════ */
  .hr-notes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-6);
    margin-top: var(--sp-8);
  }

  .hr-note-card {
    background: var(--surface-2);
    border: 1px solid var(--border-2);
    padding: var(--sp-8);
    text-align: center;
    transition: border-color 0.3s;
  }

  .hr-note-card:hover {
    border-color: var(--ink-4);
  }

  .hr-note-icon {
    font-family: var(--font-display);
    font-size: 28px;
    color: var(--accent-launchpad);
    margin-bottom: var(--sp-4);
  }

  .hr-note-card h3 {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    color: var(--ink-1);
    margin-bottom: var(--sp-3);
  }

  .hr-note-card p {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--ink-3);
    line-height: 1.6;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════
     FINAL CTA
     ═══════════════════════════════════════════════════ */
  .hr-final {
    padding: var(--section-pad) var(--container-pad);
    background: var(--surface-2);
    text-align: center;
  }

  .hr-final__content {
    max-width: 700px;
    margin: 0 auto;
  }

  .hr-final__title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 700;
    color: var(--ink-1);
    margin-bottom: var(--sp-6);
    letter-spacing: var(--tracking-compressed);
    line-height: 1.05;
  }

  .hr-final__desc {
    font-family: var(--font-body);
    font-size: 18px;
    color: var(--ink-2);
    line-height: 1.6;
    margin-bottom: var(--sp-9);
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }

  .hr-final__cta {
    margin-bottom: var(--sp-7);
  }

  .hr-final__details {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-3);
    flex-wrap: wrap;
  }

  .hr-final__dot {
    opacity: 0.4;
  }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .hr-benefits-grid {
      grid-template-columns: 1fr;
    }

    .hr-two-col {
      grid-template-columns: 1fr;
      gap: var(--sp-10);
    }

    .hr-notes-grid {
      grid-template-columns: 1fr;
    }

    .hr-hero__meta {
      flex-direction: column;
      gap: var(--sp-4);
    }

    .hr-meta-divider {
      width: 40px;
      height: 1px;
    }

    .hr-agenda-item {
      gap: var(--sp-4);
    }

    .hr-agenda-marker {
      width: 30px;
    }
  }
</style>
