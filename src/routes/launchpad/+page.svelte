<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import GridMorph from '$lib/components/animations/GridMorph.svelte';
  import { careerTracks } from '$lib/content/jobs';
</script>

<svelte:head>
  <title>LaunchPad — Progeta Technologies</title>
  <meta name="description" content="Skills, certifications, and campus programmes that close the gap between education and readiness." />
</svelte:head>

<!-- Secondary Navigation Band -->
<nav class="sub-nav">
  <div class="sub-nav__container">
    <div class="sub-nav__brand">LaunchPad</div>
    <ul class="sub-nav__links">
      <li><a href="#overview">Overview</a></li>
      <li><a href="#blueprint">The Blueprint</a></li>
      <li><a href="#ecosystem">The Ecosystem</a></li>
      <li><a href="#events">Live Events</a></li>
    </ul>
    <div class="sub-nav__actions">
      <Button href="#campuses" variant="primary" size="small" accent="var(--accent-red)">For Campuses</Button>
    </div>
  </div>
</nav>

<!-- ═══════════════════════════════════════════════════
     SECTION 1 — HERO
     ═══════════════════════════════════════════════════ -->
<section class="hero" id="overview">
  <div class="hero__inner">
    <div class="hero__left">
      <ScrollReveal>
        <Tag label="LAUNCHPAD · EDUCATION INITIATIVE" variant="active" />
      </ScrollReveal>
      
      <h1 class="hero__headline">
        <ScrollReveal delay={200} distance={20} stagger={0}>
          <span class="hero__line">Engineer</span>
        </ScrollReveal>
        <ScrollReveal delay={350} distance={20} stagger={0}>
          <span class="hero__line">Your Own</span>
        </ScrollReveal>
        <ScrollReveal delay={500} distance={20} stagger={0}>
          <span class="hero__line"><span class="hero__accent">Trajectory.</span></span>
        </ScrollReveal>
      </h1>

      <ScrollReveal delay={700} distance={15}>
        <p class="hero__subline">
          The gap between academic theory and industry reality is massive. LaunchPad is our immersive ecosystem designed to close that gap through intense, real-world engineering tracks and campus chapters.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={800} distance={20}>
        <div class="hero__ctas">
          <Button variant="primary" href="#campuses" accent="var(--accent-red)">Bring to Campus</Button>
          <a href="#ecosystem" class="hero__secondary-cta">Explore Tracks <span class="arrow">→</span></a>
        </div>
      </ScrollReveal>
    </div>

    <div class="hero__right">
      <ScrollReveal delay={400} scale={0.95} duration={1400} distance={0} class="hero__right-anim">
        <div class="hero__animation">
          <GridMorph />
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 2 — THE BLUEPRINT
     ═══════════════════════════════════════════════════ -->
<section class="how section" id="blueprint">
  <div class="container">
    <ScrollReveal>
      <Tag label="THE BLUEPRINT" variant="category" />
      <h2 class="section-title">How LaunchPad integrates.</h2>
    </ScrollReveal>
    
    <div class="steps-container">
      {#each [
        { num: '01', title: 'Assess the Landscape', body: 'We begin by understanding where your students are — their current skill levels, the gaps between their academics and industry demands, and the specific needs of your institution. No assumptions. Just honest data.' },
        { num: '02', title: 'Design the Track', body: 'Based on assessment, we design a bespoke track that fits your academic calendar. This is not a generic course — it is tailored content, delivered by practitioners, built around real-world scenarios and outcomes.' },
        { num: '03', title: 'Deliver with Intensity', body: 'Sessions are delivered on campus or virtually with a focus on hands-on learning. Students do not just listen — they build, break, and rebuild. Every session ends with something tangible.' },
        { num: '04', title: 'Certify and Connect', body: 'Students who complete tracks earn verified certificates with a unique ID traceable through our verification system. Top performers are connected to opportunities through our network.' },
      ] as step, i}
        <div class="step" class:step--alt={i % 2 !== 0}>
          <span class="step__watermark" aria-hidden="true">{step.num}</span>
          <div class="step__content">
            <ScrollReveal delay={i * 100}>
              <h3 class="step__title">{step.title}</h3>
              <p class="step__body">{step.body}</p>
            </ScrollReveal>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 3 — THE ECOSYSTEM (Tracks)
     ═══════════════════════════════════════════════════ -->
<section class="tracks section" id="ecosystem">
  <div class="container--wide">
    <ScrollReveal>
      <div class="section-header--split">
        <div>
          <Tag label="THE ECOSYSTEM" variant="category" />
          <h2 class="section-title">Pick your path.</h2>
          <p class="section-desc">Each track is a 6-month diploma programme with live-fire simulation and a verifiable credential on completion.</p>
        </div>
      </div>
    </ScrollReveal>

    <div class="tracks__grid">
      {#each careerTracks as track, i}
        <ScrollReveal delay={i * 80} class="track-wrapper">
          <a href="/launchpad/tracks/{track.id}" class="track-card">
            <span class="track__num">TRACK 0{track.id}</span>
            <h4 class="track__name">{track.title}</h4>
            <p class="track__desc">{track.description}</p>
            
            <div class="track__skills">
              {#each track.skills.slice(0, 3) as skill}
                <span class="track__skill">{skill}</span>
              {/each}
            </div>
            
            <span class="track__status track__status--live">
              <span class="track__dot"></span>
              ENROLLING
            </span>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 4 — LIVE EVENTS
     ═══════════════════════════════════════════════════ -->
<section class="events section" id="events">
  <div class="container--wide">
    <ScrollReveal>
      <Tag label="UPCOMING ACTIONS" variant="category" />
      <div class="section-header--split">
        <h2 class="section-title">Live Sessions.</h2>
        <Button href="/launchpad/events" variant="ghost">View Calendar <span class="arrow" style="margin-left: 4px;">→</span></Button>
      </div>
    </ScrollReveal>

    <div class="events-list">
      {#each [1, 2, 3] as i}
        <ScrollReveal delay={i * 100}>
          <a href="/launchpad/events" class="event-row">
            <div class="event-row__date">
              <span class="date__month">NOV</span>
              <span class="date__day">{10 + i}</span>
            </div>
            <div class="event-row__details">
              <span class="event__type">VIRTUAL SIMULATION</span>
              <h4 class="event__title">Incident Response Challenge 0{i}</h4>
              <p class="event__meta">18:00 IST • Online • 2 Hours</p>
            </div>
            <div class="event-row__action">
              <span class="event__link">Register <span class="arrow">→</span></span>
            </div>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     SECTION 5 — SPLIT CTA
     ═══════════════════════════════════════════════════ -->
<section class="final-cta section" id="campuses">
  <div class="container--wide">
    <div class="final-cta__content">
      <ScrollReveal delay={100} distance={30}>
        <h2 class="final-cta__title">Start Building.</h2>
        <p class="final-cta__desc">Find where you fit. Whether you are an institution looking to upgrade its curriculum or a student looking to forge a career.</p>
      </ScrollReveal>
    </div>

    <!-- The 2-Column Split -->
    <div class="pathway-grid" style="grid-template-columns: repeat(2, 1fr);">
      <ScrollReveal delay={200} distance={20}>
        <a href="/launchpad/students" class="pathway-card" style="--accent: var(--accent-red)">
          <span class="pathway-label">FOR STUDENTS</span>
          <h3 class="pathway-title">Find your track.</h3>
          <p class="pathway-desc">LaunchPad is available to individual students, not just campuses. Find the track that matches where you want to go, and begin.</p>
          <span class="pathway-action">Explore Programs <span class="arrow">→</span></span>
        </a>
      </ScrollReveal>

      <ScrollReveal delay={320} distance={20}>
        <a href="/contact" class="pathway-card pathway-card--primary" style="--accent: var(--accent-red)">
          <span class="pathway-label" style="color: var(--ground)">FOR CAMPUSES</span>
          <h3 class="pathway-title" style="color: var(--ground)">Partner with Us</h3>
          <p class="pathway-desc" style="color: rgba(0,0,0,0.8)">Bring LaunchPad to your campus. We will work with you to design a programme that fits your needs.</p>
          <span class="pathway-action" style="color: var(--ground)">Contact Partnerships <span class="arrow">→</span></span>
        </a>
      </ScrollReveal>
    </div>
  </div>
</section>

<style>
  /* ═══════════════════════════════════════════════════
     GENERAL UTILS & SUB-NAV
     ═══════════════════════════════════════════════════ */
  .section {
    padding: var(--sp-16) 0;
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-4);
    text-transform: uppercase;
    display: block;
    margin-bottom: var(--sp-4);
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    color: var(--ink-1);
    line-height: 1.1;
    margin-top: var(--sp-4);
    margin-bottom: var(--sp-8);
  }
  .section-desc {
    font-size: var(--text-lg);
    color: var(--ink-2);
    max-width: 600px;
    margin-bottom: var(--sp-10);
  }
  .section-header--split {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--sp-8);
  }

  .sub-nav {
    position: sticky;
    top: 60px; /* Offset for main SiteNav */
    z-index: 40;
    background: rgba(10, 11, 14, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-1);
  }
  .sub-nav__container {
    max-width: var(--w-full);
    margin: 0 auto;
    padding: 0 var(--sp-8);
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sub-nav__brand {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--accent-red);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .sub-nav__links {
    display: flex;
    gap: var(--sp-8);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .sub-nav__links a {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--ink-3);
    text-decoration: none;
    transition: color 0.2s;
  }
  .sub-nav__links a:hover {
    color: var(--ink-1);
  }

  /* ═══════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════ */
  .hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 50px;
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
    position: relative;
  }
  :global(.hero__right-anim) {
    width: 100%;
    height: 600px;
  }
  .hero__animation {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Headline */
  .hero__headline {
    margin-top: var(--sp-6);
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
    color: var(--accent-red);
    background: linear-gradient(to right, var(--accent-red), #ffaa44);
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
  .hero__secondary-cta:hover { color: var(--ink-1); }
  .hero__secondary-cta .arrow { transition: transform 0.3s var(--ease-out-expo); }
  .hero__secondary-cta:hover .arrow { transform: translateX(4px); }


  /* ═══════════════════════════════════════════════════
     THE BLUEPRINT (Alternating Steps)
     ═══════════════════════════════════════════════════ */
  .steps-container {
    margin-top: var(--sp-10);
  }
  .step {
    position: relative;
    padding: var(--sp-9) 0;
  }
  .step--alt {
    background: var(--surface-1);
    margin-inline: calc(-1 * var(--sp-8));
    padding-inline: var(--sp-8);
  }
  .step__watermark {
    position: absolute;
    top: var(--sp-7);
    left: 0;
    font-family: var(--font-mono);
    font-size: 140px;
    font-weight: 400;
    color: var(--ink-4);
    opacity: 0.4;
    line-height: 1;
    z-index: 0;
    user-select: none;
  }
  .step__content {
    position: relative;
    z-index: 1;
    max-width: var(--w-text);
    margin-left: 120px;
  }
  .step__title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-xl);
    margin-bottom: var(--sp-4);
    color: var(--ink-1);
  }
  .step__body {
    line-height: var(--leading-relaxed);
    color: var(--ink-2);
  }


  /* ═══════════════════════════════════════════════════
     THE ECOSYSTEM (3-Column Track Grid)
     ═══════════════════════════════════════════════════ */
  .tracks__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-7);
    margin-top: var(--sp-8);
  }
  
  :global(.track-wrapper) {
    display: flex;
    height: 100%;
  }

  .track-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    background: var(--surface-1);
    padding: var(--sp-8);
    border: 1px solid var(--border-2);
    transition: transform 0.3s, border-color 0.3s;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .track-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-red);
    transition: width 0.4s ease;
  }

  .track-card:hover {
    transform: translateY(-6px);
    border-color: var(--border-3);
  }

  .track-card:hover::before {
    width: 100%;
  }

  .track__num {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
    margin-bottom: var(--sp-3);
  }
  .track__name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 24px;
    color: var(--ink-1);
    line-height: var(--leading-snug);
    margin-bottom: var(--sp-4);
  }
  .track__desc {
    font-weight: 400;
    color: var(--ink-3);
    line-height: var(--leading-relaxed);
    font-size: var(--text-sm);
    flex-grow: 1;
    margin-bottom: var(--sp-6);
  }
  .track__skills {
    display: flex;
    gap: var(--sp-3);
    flex-wrap: wrap;
    margin-bottom: var(--sp-5);
  }
  .track__skill {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-3);
    background: var(--ground);
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid var(--border-2);
    letter-spacing: 0.05em;
  }
  .track__status {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    margin-top: auto;
    border-top: 1px solid var(--border-1);
    padding-top: var(--sp-4);
  }
  .track__status--live {
    color: var(--accent-red);
  }
  .track__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-red);
    animation: pulse 2s ease-in-out infinite;
  }


  /* ═══════════════════════════════════════════════════
     EVENTS LIST (Horizontal Rows)
     ═══════════════════════════════════════════════════ */
  .events-list {
    display: flex;
    flex-direction: column;
    margin-top: var(--sp-8);
  }
  .event-row {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: var(--sp-6);
    align-items: center;
    padding: var(--sp-6) 0;
    border-top: 1px solid var(--border-2);
    text-decoration: none;
    transition: background 0.2s;
  }
  .event-row:hover {
    background: var(--surface-1);
    padding-inline: var(--sp-4);
    margin-inline: calc(-1 * var(--sp-4));
  }
  .event-row__date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--surface-2);
    padding: var(--sp-3);
    height: 80px;
    border-radius: 4px;
  }
  .date__month {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
  }
  .date__day {
    font-family: var(--font-display);
    font-size: 28px;
    color: var(--ink-1);
    font-weight: 600;
  }
  .event__type {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
    display: block;
    margin-bottom: var(--sp-1);
  }
  .event__title {
    font-size: var(--text-lg);
    color: var(--ink-1);
    font-weight: 500;
    margin-bottom: var(--sp-1);
  }
  .event__meta {
    font-size: var(--text-sm);
    color: var(--ink-3);
  }
  .event__link {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-2);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    transition: color 0.2s;
  }
  .event-row:hover .event__link {
    color: var(--accent-red);
  }


  /* ═══════════════════════════════════════════════════
     FINAL CTA (Matches Homepage 2-Col Format)
     ═══════════════════════════════════════════════════ */
  .final-cta {
    background: var(--surface-2);
    margin-top: var(--sp-12);
  }
  .final-cta__content { text-align: center; margin-bottom: var(--sp-11); padding: 0 var(--sp-6); }
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

  .pathway-grid {
    display: grid;
    gap: var(--sp-6);
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
    border-radius: 4px;
  }

  .pathway-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px;
    background: var(--accent); transition: width 0.4s ease;
    border-radius: 4px 4px 0 0;
  }
  .pathway-card:hover { border-color: var(--accent); transform: translateY(-6px); }
  .pathway-card--primary:hover { border-color: transparent; }
  .pathway-card:hover::before { width: 100%; }

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
  .pathway-action .arrow { transition: transform 0.3s var(--ease-out-expo); }
  .pathway-card:hover .pathway-action .arrow { transform: translateX(4px); }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .sub-nav__links { display: none; }
    .hero__inner { flex-direction: column; text-align: center; padding-top: 80px; }
    .hero__left, .hero__right { width: 100%; }
    .hero__right { justify-content: center; margin-top: var(--sp-9); }
    .hero__ctas { justify-content: center; }
    .hero__subline { margin-left: auto; margin-right: auto; text-align: center; }

    .step__content { margin-left: 0; }
    .step__watermark { font-size: 80px; opacity: 0.2; }
    .step--alt { margin-inline: calc(-1 * var(--sp-5)); padding-inline: var(--sp-5); }
    
    .tracks__grid { grid-template-columns: repeat(2, 1fr); }
    .pathway-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .section-header--split { flex-direction: column; align-items: flex-start; gap: var(--sp-4); }
    .hero__ctas { flex-direction: column; gap: var(--sp-5); }
    .tracks__grid { grid-template-columns: 1fr; }
    .event-row { grid-template-columns: 1fr; }
    .event-row__date { height: auto; padding: var(--sp-4); flex-direction: row; gap: var(--sp-3); justify-content: flex-start; }
    .event-row__action { display: none; }
    .final-cta__title { font-size: 40px; }
  }
</style>
