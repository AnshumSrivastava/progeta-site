<script>
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import GridMorph from "$lib/components/animations/GridMorph.svelte";
  import { onMount } from "svelte";

  /* ── Count-up animation ── */
  let statsEl;
  let statsCounted = false;
  const stats = [
    { value: 15, suffix: "+", label: "Colleges Engaged" },
    { value: 2500, suffix: "+", label: "Students Trained" },
    { value: 54, suffix: "", label: "Technical Modules" },
    { value: 6, suffix: "", label: "Active Tracks" },
  ];
  let displayed = stats.map(() => 0);

  function countUp() {
    if (statsCounted) return;
    statsCounted = true;
    stats.forEach((s, i) => {
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        displayed[i] = Math.round(eased * s.value);
        displayed = [...displayed];
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  onMount(() => {
    if (!statsEl) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          countUp();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(statsEl);
    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>LaunchPad | Progeta Technologies</title>
  <meta
    name="description"
    content="LaunchPad is Progeta Technologies' education initiative — cybersecurity tracks, workshops, student chapters, and verifiable credentials."
  />
</svelte:head>

<!-- ═══ SECTION 1 — HERO ═══ -->
<section class="lp-hero">
  <div class="lp-hero__canvas"><GridMorph /></div>
  <div class="lp-hero__inner container">
    <ScrollReveal>
      <span class="eyebrow">LAUNCHPAD · INITIATIVE 01</span>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <h1 class="lp-hero__heading">
        Your education prepared you<br />for a path. What if you want<br />to
        <span class="ember">make your own</span>?
      </h1>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <p class="lp-hero__body">
        LaunchPad is Progeta Technologies' education initiative. Real skills
        through live-fire cybersecurity tracks, hands-on workshops, student
        chapters, and verifiable credentials — for people who want capability,
        not just credentials.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={300}>
      <div class="lp-hero__ctas">
        <a href="/tracks" class="btn-solid">Explore Tracks →</a>
        <a href="/launchpad/colleges" class="btn-ghost">For Colleges →</a>
      </div>
    </ScrollReveal>
    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-line"></div>
      <span class="scroll-label">SCROLL</span>
    </div>
  </div>
</section>

<!-- ═══ SECTION 2 — THE FOUR STAGES ═══ -->
<section class="lp-stages">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">HOW LAUNCHPAD WORKS</span>
      <h2 class="section-heading">One ecosystem. Four stages.</h2>
      <p class="section-body">
        Every student moves through LaunchPad at their own pace. The four stages
        build on each other — but you can enter at any point.
      </p>
    </ScrollReveal>

    <div class="stages-row">
      {#each [{ num: "01", name: "Tracks", desc: "Six-month certification programmes in cybersecurity specialisations. Built around real operational roles. Ends with a verifiable credential.", link: "/tracks", cta: "Explore Tracks →" }, { num: "02", name: "Workshops", desc: "Half-day to full-day live simulations. No slides — real environments. Individual modules or as part of a track. Open to all students.", link: "/launchpad/workshops", cta: "View Workshops →" }, { num: "03", name: "Chapters", desc: "A student-led organisation on your campus. Progeta Technologies trains the leaders and provides infrastructure. You run it.", link: "/launchpad/chapters", cta: "Start a Chapter →" }, { num: "04", name: "Certifications", desc: "Verifiable credentials issued at the end of each track. Shareable on LinkedIn. Verifiable at progeta.tech/verify by any employer.", link: "/launchpad/certifications", cta: "View Credentials →" }] as stage, i}
        <ScrollReveal delay={i * 80}>
          <a href={stage.link} class="stage-card">
            <span class="stage-num">STAGE {stage.num}</span>
            <div class="stage-rule"></div>
            <span class="stage-name">{stage.name}</span>
            <p class="stage-desc">{stage.desc}</p>
            <span class="stage-cta">{stage.cta}</span>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ SECTION 3 — AUDIENCE SPLIT ═══ -->
<section class="lp-audience">
  <div class="audience-split">
    <ScrollReveal>
      <div class="audience-panel">
        <span class="audience-tag">FOR STUDENTS</span>
        <h3 class="audience-heading">Your track to real capability.</h3>
        <p class="audience-body">
          Start with a track in your area of interest. Each track is six months
          and ends with a credential that signals real capability to employers —
          not just attendance.
        </p>
        <a href="/tracks" class="audience-cta">See all tracks →</a>
      </div>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <div class="audience-panel">
        <span class="audience-tag">FOR INSTITUTIONS</span>
        <h3 class="audience-heading">Bring LaunchPad to your campus.</h3>
        <p class="audience-body">
          Awareness sessions, certification tracks, student chapters, and
          workshops. Designed to run alongside existing curriculum. Verifiable
          outcomes for placement.
        </p>
        <a href="/launchpad/colleges" class="audience-cta"
          >Partnership details →</a
        >
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══ SECTION 4 — STATS ═══ -->
<section class="lp-stats" bind:this={statsEl}>
  <div class="container">
    <div class="stats-row">
      {#each stats as stat, i}
        <ScrollReveal delay={i * 80}>
          <div class="stat-cell">
            <span class="stat-number"
              >{displayed[i].toLocaleString()}{stat.suffix}</span
            >
            <span class="stat-label">{stat.label}</span>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ SECTION 5 — CLOSING CTA ═══ -->
<section class="lp-close">
  <div class="container">
    <ScrollReveal>
      <div class="lp-close__inner">
        <h2 class="section-heading">Not sure where to start?</h2>
        <p class="section-body">
          Tell us where you are and what kind of work you want to do. We'll
          point you to the right track or the right event.
        </p>
        <a
          href="mailto:operations@progeta.tech?subject=LaunchPad Guidance"
          class="lp-close__cta">Talk to us →</a
        >
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
  /* ── TOKENS ── */
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
    margin-bottom: 16px;
  }
  .section-heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.05;
    color: #edf0ff;
    margin-bottom: 14px;
  }
  .section-body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: #8890bb;
    line-height: 1.75;
    max-width: 560px;
  }
  .ember {
    color: #e05c20;
  }

  /* ── HERO ── */
  .lp-hero {
    position: relative;
    min-height: 50vh;
    display: flex;
    align-items: flex-end;
    background: #020408;
    overflow: hidden;
    padding-bottom: clamp(60px, 8vw, 100px);
    padding-top: clamp(100px, 14vw, 160px);
  }
  .lp-hero__canvas {
    position: absolute;
    inset: 0;
    opacity: 0.25;
    pointer-events: none;
  }
  .lp-hero__inner {
    position: relative;
    z-index: 1;
  }
  .lp-hero__heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(48px, 7vw, 80px);
    line-height: 0.93;
    letter-spacing: -0.03em;
    color: #edf0ff;
    margin-bottom: 20px;
  }
  .lp-hero__body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: clamp(15px, 1.5vw, 17px);
    color: #8890bb;
    max-width: 480px;
    line-height: 1.75;
  }
  .lp-hero__ctas {
    display: flex;
    gap: 12px;
    margin-top: 36px;
    flex-wrap: wrap;
  }
  .btn-solid {
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: #edf0ff;
    color: #020408;
    padding: 14px 28px;
    border-radius: 4px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .btn-solid:hover {
    opacity: 0.88;
  }
  .btn-ghost {
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: transparent;
    border: 1px solid #e05c20;
    color: #e05c20;
    padding: 14px 28px;
    border-radius: 4px;
    text-decoration: none;
    transition: background 0.2s;
  }
  .btn-ghost:hover {
    background: rgba(224, 92, 32, 0.08);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .scroll-line {
    width: 1px;
    height: 48px;
    background: #1e2440;
    animation: floatLine 2.4s ease-in-out infinite;
  }
  .scroll-label {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    color: #1e2440;
    letter-spacing: 0.14em;
  }
  @keyframes floatLine {
    0%,
    100% {
      opacity: 0.4;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(6px);
    }
  }

  /* ── STAGES ── */
  .lp-stages {
    background: #07090f;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .stages-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #0f1220;
    margin-top: 48px;
  }
  @media (max-width: 720px) {
    .stages-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 460px) {
    .stages-row {
      grid-template-columns: 1fr;
    }
  }

  .stage-card {
    background: #07090f;
    padding: 32px 28px;
    display: block;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
  }
  .stage-card:hover {
    background: #0c0e18;
  }
  .stage-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #e05c20;
    transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .stage-card:hover::before {
    width: 100%;
  }
  .stage-num {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    color: #1e2440;
    letter-spacing: 0.14em;
  }
  .stage-rule {
    width: 24px;
    height: 2px;
    background: #e05c20;
    margin: 12px 0 16px;
  }
  .stage-name {
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    font-size: 17px;
    color: #edf0ff;
    display: block;
  }
  .stage-desc {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #8890bb;
    line-height: 1.65;
    margin-top: 8px;
  }
  .stage-cta {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    color: #e05c20;
    letter-spacing: 0.1em;
    display: block;
    margin-top: 20px;
  }

  /* ── AUDIENCE ── */
  .lp-audience {
    background: #020408;
  }
  .audience-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #0f1220;
  }
  @media (max-width: 640px) {
    .audience-split {
      grid-template-columns: 1fr;
    }
  }
  .audience-panel {
    background: #020408;
    padding: clamp(48px, 7vw, 80px) clamp(28px, 5vw, 64px);
    transition: background 0.2s;
  }
  .audience-panel:hover {
    background: #07090f;
  }
  .audience-tag {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #e05c20;
    border: 1px solid #e05c20;
    padding: 2px 8px;
    border-radius: 2px;
  }
  .audience-heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(26px, 3vw, 36px);
    color: #edf0ff;
    line-height: 1.1;
    margin-top: 16px;
  }
  .audience-body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: #8890bb;
    line-height: 1.75;
    margin-top: 12px;
  }
  .audience-cta {
    font-family: "DM Mono", monospace;
    font-size: 11px;
    color: #e05c20;
    text-decoration: none;
    display: inline-block;
    margin-top: 24px;
    letter-spacing: 0.1em;
  }
  .audience-cta:hover {
    text-decoration: underline;
  }

  /* ── STATS ── */
  .lp-stats {
    background: #07090f;
    padding: clamp(64px, 8vw, 104px) 0;
  }
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #0f1220;
    text-align: center;
  }
  @media (max-width: 640px) {
    .stats-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .stat-cell {
    background: #07090f;
    padding: 40px 20px;
  }
  .stat-number {
    font-family: "DM Mono", monospace;
    font-weight: 700;
    font-size: clamp(40px, 5vw, 56px);
    color: #e05c20;
    display: block;
  }
  .stat-label {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 12px;
    color: #8890bb;
    display: block;
    margin-top: 8px;
    letter-spacing: 0.06em;
  }

  /* ── CLOSING CTA ── */
  .lp-close {
    background: #020408;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .lp-close__inner {
    text-align: center;
    max-width: 520px;
    margin: 0 auto;
  }
  .lp-close__inner .section-body {
    max-width: 100%;
    margin: 0 auto;
  }
  .lp-close__cta {
    font-family: "DM Mono", monospace;
    font-size: 11px;
    color: #e05c20;
    text-decoration: none;
    display: inline-block;
    margin-top: 28px;
    letter-spacing: 0.1em;
  }
  .lp-close__cta:hover {
    text-decoration: underline;
  }
</style>
