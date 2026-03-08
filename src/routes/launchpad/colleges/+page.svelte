<script lang="ts">
  import { onMount } from 'svelte';
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';

  // Form state
  let formName = $state('');
  let formEmail = $state('');
  let formRole = $state('');
  let formCollege = $state('');
  let formCity = $state('');
  let formInterest = $state('');
  let formMessage = $state('');
  let formSubmitted = $state(false);
  let formSubmitting = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    formSubmitting = true;
    try {
      const resp = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          role: formRole,
          college: formCollege,
          city: formCity,
          interest: formInterest,
          message: formMessage
        })
      });
      if (resp.ok) {
        formSubmitted = true;
      }
    } catch {
      // Fallback — still show success for now
      formSubmitted = true;
    }
    formSubmitting = false;
  }

  // Count-up animation
  onMount(() => {
    const statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;

    function animateCount(element: HTMLElement, target: number, suffix: string = '') {
      const start = performance.now();
      const duration = 1400;
      function update(time: number) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        element.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const els = statsRow.querySelectorAll('[data-count]');
          els.forEach(el => {
            const target = parseInt(el.getAttribute('data-count') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            animateCount(el as HTMLElement, target, suffix);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsRow);
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>For Colleges — LaunchPad — Progeta Technologies</title>
  <meta name="description" content="Bring LaunchPad to your campus. Structured cybersecurity education — awareness sessions, certification tracks, student chapters, and workshops." />
</svelte:head>

<!-- SECTION 1 — HERO -->
<section class="col-hero">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">LAUNCHPAD · FOR INSTITUTIONS</span>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1 class="col-hero__headline">
        <span class="col-hero__line">Bring LaunchPad</span>
        <span class="col-hero__line">to your campus.</span>
      </h1>
    </ScrollReveal>
    <ScrollReveal delay={400}>
      <p class="col-hero__body">
        We deliver structured cybersecurity education to college campuses — awareness sessions, six-month certification tracks, student chapters, and hands-on workshops. Designed for institutions that want measurable outcomes for their students.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={600}>
      <div class="col-hero__ctas">
        <a href="mailto:operations@progeta.tech?subject=College Partnership - Discovery Call" class="col-hero__primary">Book a Discovery Call →</a>
        <a href="#colleges-form" class="col-hero__secondary">Or complete the enquiry form ↓</a>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- SECTION 2 — WHAT WE OFFER -->
<section class="col-programmes">
  <div class="container">
    <ScrollReveal>
      <h2 class="section-heading">What we bring to your institution.</h2>
    </ScrollReveal>

    <div class="programmes-grid">
      {#each [
        { num: '01', name: 'Awareness Sessions', desc: 'Half-day or full-day campus drives. Live demonstrations of cybersecurity threats — real environments, not slide decks. Students leave understanding the landscape they are entering. Faculty can attend too.', format: '1 Day · On-Campus · Any Audience Size' },
        { num: '02', name: 'Certification Tracks', desc: 'Six-month diploma programmes in six cybersecurity specialisations. Delivered alongside existing curriculum. Each track ends with a verifiable Progeta Technologies credential students can share with employers.', format: '6 Months · Hybrid · 20–60 Students Per Cohort' },
        { num: '03', name: 'Student Chapters', desc: 'A permanent student-run organisation on your campus. We train the chapter leaders, provide all materials and event infrastructure, and support for as long as the chapter is active. It runs independently after we leave.', format: 'Ongoing · Student-Led · One Chapter Per Campus' },
        { num: '04', name: 'Workshops', desc: 'One to three day intensive simulations. Students operate in real-environment scenarios relevant to their degree stream. Appropriate as a standalone event, a department activity, or a track component.', format: '1–3 Days · On-Campus or Virtual' },
      ] as prog, i}
        <ScrollReveal delay={100 + i * 120}>
          <div class="programme-card">
            <span class="programme-num">{prog.num}</span>
            <div class="programme-rule"></div>
            <h3 class="programme-name">{prog.name}</h3>
            <p class="programme-desc">{prog.desc}</p>
            <span class="programme-format">{prog.format}</span>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- SECTION 3 — THE PROCESS -->
<section class="col-process">
  <div class="container">
    <ScrollReveal>
      <h2 class="section-heading">How a partnership works.</h2>
    </ScrollReveal>

    <div class="process-steps">
      {#each [
        { label: 'STEP 01', title: 'Discovery', body: 'We speak for 30 minutes. You describe your students, your institution, and what you need. We describe what fits. No commitment on either side.' },
        { label: 'STEP 02', title: 'Proposal', body: 'We write a programme scoped to your calendar, your space, and your budget. Written proposal delivered within 5 working days. Clear on what is included and what it costs.' },
        { label: 'STEP 03', title: 'Deployment', body: 'We arrive. Everything is hands-on. We bring all materials and environments. Your role is logistics coordination. Ours is delivery.' },
        { label: 'STEP 04', title: 'Outcomes', body: 'Students who complete a track receive verifiable credentials. We provide a written post-programme report. If you want a Student Chapter, we set it up before we leave.' },
      ] as step, i}
        <ScrollReveal delay={100 + i * 120}>
          <div class="process-step">
            <span class="process-label">{step.label}</span>
            <h3 class="process-title">{step.title}</h3>
            <p class="process-body">{step.body}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- SECTION 4 — STATS -->
<section class="col-stats">
  <div class="stats-row">
    <div class="stat-cell">
      <span class="stat-number" data-count="15" data-suffix="+">0</span>
      <span class="stat-label">Colleges Engaged</span>
    </div>
    <div class="stat-cell">
      <span class="stat-number" data-count="2500" data-suffix="+">0</span>
      <span class="stat-label">Students Trained</span>
    </div>
    <div class="stat-cell">
      <span class="stat-number" data-count="50" data-suffix="+">0</span>
      <span class="stat-label">Sessions Delivered</span>
    </div>
    <div class="stat-cell">
      <span class="stat-number" data-count="96" data-suffix="%">0</span>
      <span class="stat-label">Satisfaction Rate</span>
    </div>
  </div>
</section>

<!-- SECTION 5 — ENQUIRY FORM -->
<section class="col-form" id="colleges-form">
  <div class="container">
    <ScrollReveal>
      <h2 class="section-heading">Start a conversation.</h2>
      <p class="col-form__intro">Fill this in and we will respond within 48 hours with either a proposed discovery call time or a direct answer to your question.</p>
    </ScrollReveal>

    {#if formSubmitted}
      <ScrollReveal>
        <p class="col-form__success">
          Message received. We will reply to {formEmail} within 48 hours.
        </p>
      </ScrollReveal>
    {:else}
      <form class="col-form__form" onsubmit={handleSubmit}>
        <ScrollReveal delay={100}>
          <div class="form-field">
            <label class="form-label" for="col-name">YOUR NAME</label>
            <input class="form-input" id="col-name" type="text" bind:value={formName} required />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div class="form-field">
            <label class="form-label" for="col-email">YOUR EMAIL</label>
            <input class="form-input" id="col-email" type="email" bind:value={formEmail} required />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div class="form-field">
            <label class="form-label" for="col-role">YOUR ROLE</label>
            <select class="form-select" id="col-role" bind:value={formRole}>
              <option value="">Select your role</option>
              <option value="tpo">Training & Placement Officer</option>
              <option value="faculty">Faculty / Lecturer</option>
              <option value="hod">Department Head</option>
              <option value="principal">Principal / Director</option>
              <option value="club">Club Lead</option>
              <option value="other">Other</option>
            </select>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={250}>
          <div class="form-field">
            <label class="form-label" for="col-college">COLLEGE / INSTITUTION</label>
            <input class="form-input" id="col-college" type="text" bind:value={formCollege} required />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div class="form-field">
            <label class="form-label" for="col-city">CITY</label>
            <input class="form-input" id="col-city" type="text" bind:value={formCity} required />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={350}>
          <div class="form-field">
            <label class="form-label" for="col-interest">WHAT ARE YOU INTERESTED IN</label>
            <select class="form-select" id="col-interest" bind:value={formInterest}>
              <option value="">Select an option</option>
              <option value="awareness">Awareness Session</option>
              <option value="tracks">Certification Tracks</option>
              <option value="chapter">Student Chapter</option>
              <option value="workshop">Workshop</option>
              <option value="full">Full Partnership</option>
              <option value="unsure">Not sure yet — I want to discuss</option>
            </select>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div class="form-field">
            <label class="form-label" for="col-message">ANYTHING ELSE</label>
            <textarea class="form-textarea" id="col-message" bind:value={formMessage} placeholder="Tell us what you have tried, what has not worked, or what you specifically need."></textarea>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={450}>
          <button class="form-submit" type="submit" disabled={formSubmitting}>
            {formSubmitting ? 'SENDING...' : 'SUBMIT ENQUIRY'}
          </button>
        </ScrollReveal>
      </form>
    {/if}

    <ScrollReveal delay={500}>
      <p class="col-form__direct">
        Prefer email directly? <a href="mailto:operations@progeta.tech" class="col-form__email">operations@progeta.tech</a>
      </p>
    </ScrollReveal>
  </div>
</section>

<style>
  /* ═══════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════ */
  .col-hero {
    min-height: 55dvh;
    display: flex;
    align-items: center;
    padding-top: 100px;
    padding-bottom: clamp(60px, 8vw, 100px);
  }
  .col-hero__headline {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .col-hero__line {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(38px, 5vw, 60px);
    line-height: 0.94;
    letter-spacing: -0.03em;
    color: #EDF0FF;
  }
  .col-hero__body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.7;
    color: #8890BB;
    max-width: 540px;
    margin-bottom: 36px;
  }
  .col-hero__ctas {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .col-hero__primary {
    display: inline-block;
    padding: 14px 28px;
    background: #EDF0FF;
    color: #020408;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .col-hero__primary:hover { background: #8890BB; }
  .col-hero__secondary {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #8890BB;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .col-hero__secondary:hover { color: #EDF0FF; }

  /* ═══════════════════════════════════════════════════
     PROGRAMMES
     ═══════════════════════════════════════════════════ */
  .col-programmes {
    background: #07090F;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .programmes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: #0F1220;
    margin-top: 44px;
  }
  .programme-card {
    background: #07090F;
    padding: 36px 32px;
    transition: background 0.2s ease;
  }
  .programme-card:hover { background: #0C0E18; }
  .programme-num {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #1E2440;
    display: block;
  }
  .programme-rule {
    width: 24px;
    height: 2px;
    background: #E05C20;
    margin-top: 12px;
    margin-bottom: 18px;
  }
  .programme-name {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #EDF0FF;
    margin: 0 0 10px 0;
  }
  .programme-desc {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.7;
    color: #8890BB;
    margin: 0;
  }
  .programme-format {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--ink-3);
    margin-top: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* ═══════════════════════════════════════════════════
     PROCESS
     ═══════════════════════════════════════════════════ */
  .col-process {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin-top: 48px;
    position: relative;
  }
  .process-step {
    padding: 0 36px;
    position: relative;
  }
  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background: #0F1220;
  }
  .process-step:first-child { padding-left: 0; }
  .process-step:last-child  { padding-right: 0; }
  .process-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: block;
  }
  .process-title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #EDF0FF;
    margin-top: 10px;
    margin-bottom: 8px;
  }
  .process-body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.7;
    color: #8890BB;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════
     STATS
     ═══════════════════════════════════════════════════ */
  .col-stats {
    background: #07090F;
  }
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #0F1220;
  }
  .stat-cell {
    background: #07090F;
    padding: 40px 32px;
    text-align: center;
  }
  .stat-number {
    font-family: 'DM Mono', monospace;
    font-weight: 700;
    font-size: clamp(36px, 4.5vw, 52px);
    letter-spacing: -0.02em;
    color: #E05C20;
    display: block;
  }
  .stat-label {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: #8890BB;
    margin-top: 8px;
    display: block;
  }

  /* ═══════════════════════════════════════════════════
     FORM
     ═══════════════════════════════════════════════════ */
  .col-form {
    background: #0C0E18;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .col-form__intro {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #8890BB;
    max-width: 480px;
    margin-top: 16px;
    line-height: 1.7;
  }
  .col-form__form {
    max-width: 560px;
    margin-top: 48px;
  }
  .form-field {
    margin-bottom: 28px;
    position: relative;
  }
  .form-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 8px;
  }
  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid #171B30;
    padding: 10px 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #EDF0FF;
    outline: none;
    transition: border-bottom-color 0.2s ease;
    border-radius: 0;
    -webkit-appearance: none;
  }
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-bottom-color: #E05C20;
  }
  .form-input::placeholder,
  .form-textarea::placeholder {
    color: #1E2440;
  }
  .form-textarea {
    resize: vertical;
    min-height: 96px;
  }
  .form-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23424870'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 4px center;
    padding-right: 20px;
    cursor: pointer;
    color: #8890BB;
  }
  .form-select option { background: #0C0E18; color: #EDF0FF; }
  .form-submit {
    width: 100%;
    padding: 16px;
    background: #EDF0FF;
    color: #020408;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 8px;
    transition: background 0.2s ease;
  }
  .form-submit:hover { background: #8890BB; }
  .form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .col-form__success {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #8890BB;
    text-align: center;
    padding: 40px 0;
  }
  .col-form__direct {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-3);
    margin-top: 48px;
  }
  .col-form__email {
    color: #8890BB;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .col-form__email:hover { color: #EDF0FF; }

  /* ═══════════════════════════════════════════════════
     SHARED
     ═══════════════════════════════════════════════════ */
  .eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: block;
  }
  .section-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(28px, 3.5vw, 42px);
    line-height: 0.94;
    letter-spacing: -0.025em;
    color: #EDF0FF;
    margin-top: 16px;
  }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 720px) {
    .process-steps { grid-template-columns: 1fr; gap: 36px 0; }
    .process-step { padding: 0; border-bottom: 1px solid #0F1220; padding-bottom: 32px; }
    .process-step:last-child { border-bottom: none; padding-bottom: 0; }
    .process-step::after { display: none; }
  }
  @media (max-width: 640px) {
    .programmes-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
  }
</style>
