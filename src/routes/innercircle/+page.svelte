<script lang="ts">
  import { onMount } from 'svelte';
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';

  // Overlay state
  let overlayOpen = $state(false);
  let stage = $state(0);
  let stageReady = $state(false);

  // Form data
  let q1 = $state('');
  let q2 = $state('');
  let q3 = $state('');
  let applicantName = $state('');
  let applicantEmail = $state('');
  let submitting = $state(false);
  let submitError = $state('');

  // Stage 0 timed reveals
  let s0_label = $state(false);
  let s0_heading = $state(false);
  let s0_body = $state(false);
  let s0_btn = $state(false);

  // Stage 4 timed reveals
  let s4_line = $state(false);
  let s4_label = $state(false);
  let s4_heading = $state(false);
  let s4_email = $state(false);
  let s4_close = $state(false);

  function openOverlay() {
    overlayOpen = true;
    stage = 0;
    stageReady = false;
    // Timed reveals for Stage 0
    setTimeout(() => { s0_label = true; }, 0);
    setTimeout(() => { s0_heading = true; }, 600);
    setTimeout(() => { s0_body = true; }, 1400);
    setTimeout(() => { s0_btn = true; stageReady = true; }, 2600);
  }

  function closeOverlay() {
    overlayOpen = false;
    // Reset everything
    stage = 0;
    stageReady = false;
    s0_label = false; s0_heading = false; s0_body = false; s0_btn = false;
    s4_line = false; s4_label = false; s4_heading = false; s4_email = false; s4_close = false;
    q1 = ''; q2 = ''; q3 = '';
    applicantName = ''; applicantEmail = '';
    submitting = false; submitError = '';
  }

  function goToStage(n: number) {
    stageReady = false;
    stage = n;
    if (n === 4) {
      // Confirmation stage timed reveals
      setTimeout(() => { s4_line = true; }, 300);
      setTimeout(() => { s4_label = true; }, 1100);
      setTimeout(() => { s4_heading = true; }, 1700);
      setTimeout(() => { s4_email = true; }, 2500);
      setTimeout(() => { s4_close = true; stageReady = true; }, 3600);
    } else {
      setTimeout(() => { stageReady = true; }, 300);
    }
  }

  async function submitApplication() {
    submitting = true;
    submitError = '';
    try {
      const resp = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: applicantName,
          email: applicantEmail,
          q1_building: q1,
          q2_why: q2,
          q3_give: q3
        })
      });
      if (resp.ok) {
        goToStage(4);
      } else {
        submitError = 'Something went wrong. Email us at operations@progeta.tech';
        submitting = false;
      }
    } catch {
      submitError = 'Something went wrong. Email us at operations@progeta.tech';
      submitting = false;
    }
  }

  // IntersectionObserver for step circle animations
  onMount(() => {
    const steps = document.querySelectorAll('.ic-step');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    steps.forEach(step => observer.observe(step));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>InnerCircle — Progeta Technologies</title>
  <meta name="description" content="A vetted network for people who are building something real and want to be surrounded by others doing the same." />
</svelte:head>

<!-- SECTION 1 — THE OPENING -->
<section class="ic-hero">
  <div class="ic-hero__content container">
    <ScrollReveal>
      <span class="eyebrow">INNERCIRCLE · INITIATIVE 03</span>
    </ScrollReveal>
    <ScrollReveal delay={300}>
      <h1 class="ic-hero__h1-a">
        Some communities<br>let anyone in.
      </h1>
    </ScrollReveal>
    <div class="ic-hero__gap"></div>
    <ScrollReveal delay={800}>
      <span class="ic-hero__h1-b">We don't.</span>
    </ScrollReveal>
    <ScrollReveal delay={1000}>
      <p class="ic-hero__body">
        InnerCircle is a vetted network for people actively building something real. Not thinking about it. Not planning to start. Actively building, right now.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={1100}>
      <button class="ic-apply-btn" onclick={openOverlay}>APPLY FOR ACCESS</button>
    </ScrollReveal>
  </div>
</section>

<!-- SECTION 2 — WHAT IT IS -->
<section class="ic-what">
  <div class="container">
    <div class="ic-what__grid">
      <div class="ic-what__left">
        <ScrollReveal>
          <span class="eyebrow">WHAT IT IS</span>
          <h2 class="section-heading">What being in InnerCircle means.</h2>
          <div class="ic-what__rule"></div>
        </ScrollReveal>
      </div>
      <div class="ic-what__right">
        <ScrollReveal delay={150}>
          <p>InnerCircle is not a forum. It is not a Slack workspace with hundreds of people you will never meet. It is a small group of people — carefully selected — who meet regularly, share what they are working on honestly, and hold each other to the standard of real progress.</p>
          <p>Membership is free. What it costs is your genuine participation. Members are expected to show up, engage honestly with what others are building, and bring the same seriousness they would want from the people around them.</p>
          <p>Events include the Founders Mixer (in-person, quarterly), weekly virtual check-ins, and occasional workshops run by members for members. The quality of InnerCircle is entirely determined by the quality of the people in it.</p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 3 — HOW YOU GET IN -->
<section class="ic-process">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">THE PROCESS</span>
      <h2 class="section-heading">Three honest steps.</h2>
    </ScrollReveal>

    {#each [
      { num: '01', title: 'You apply.', body: 'The application is three questions. What are you building, why does it matter to you, and what do you want to give to the people around you. There is no right answer. There is only an honest one.' },
      { num: '02', title: 'We review.', body: 'Every application is read by a person, not processed by an algorithm. We respond within 72 hours. Some applications are accepted immediately. Some are not, and we say why, briefly.' },
      { num: '03', title: 'You are in — or you are not.', body: 'If you are accepted, you receive an invitation. If you are not, the door is not permanently closed. Reapply in six months with something new to show. We remember the people who tried honestly.' },
    ] as step, i}
      <div class="ic-step" class:ic-step--alt={i % 2 !== 0}>
        <div class="ic-step__left">
          <svg width="52" height="52" viewBox="0 0 52 52" class="step-circle">
            <circle cx="26" cy="26" r="20" fill="none" stroke="#18C96A" stroke-width="1"/>
            <text x="26" y="31" text-anchor="middle"
                  font-family="DM Mono, monospace" font-size="12" fill="#18C96A"
                  letter-spacing="0.08em">{step.num}</text>
          </svg>
        </div>
        <div class="ic-step__right">
          <h3 class="ic-step__title">{step.title}</h3>
          <p class="ic-step__body">{step.body}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- SECTION 4 — FINAL CTA -->
<section class="ic-final">
  <div class="container">
    <ScrollReveal>
      <div class="ic-final__inner">
        <h2 class="section-heading" style="text-align: center;">Ready to apply?</h2>
        <p class="ic-final__body">The application takes about five minutes. We read every one. You will hear back within 72 hours.</p>
        <button class="ic-apply-btn" onclick={openOverlay}>APPLY FOR ACCESS</button>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════
     INVITATION ANIMATION OVERLAY
     ═══════════════════════════════════════════════════ -->
<div id="ic-overlay" class:open={overlayOpen}>
  <!-- Progress bar -->
  <div class="ic-progress">
    <div class="ic-progress-seg" class:done={stage > 1} class:active={stage === 1}></div>
    <div class="ic-progress-seg" class:done={stage > 2} class:active={stage === 2}></div>
    <div class="ic-progress-seg" class:done={stage > 3} class:active={stage === 3}></div>
  </div>

  <!-- Close button -->
  <button class="ic-overlay-close" onclick={closeOverlay}>CLOSE ×</button>

  <!-- Stage content -->
  <div class="ic-stage">
    {#if stage === 0}
      <!-- STAGE 0 — Acknowledgement -->
      <div class="ic-stage-content">
        {#if s0_label}
          <span class="ic-appear ic-stage-label">INNERCIRCLE · APPLICATION</span>
        {/if}
        {#if s0_heading}
          <h2 class="ic-appear ic-stage-heading">Before you apply, be sure you mean it.</h2>
        {/if}
        {#if s0_body}
          <p class="ic-appear ic-stage-body">This is not a form submission. Every application is read by a real person. That takes time and care. Apply only if you have something real to show.</p>
        {/if}
        {#if s0_btn}
          <button class="ic-appear ic-continue" onclick={() => goToStage(1)}>I understand — continue →</button>
        {/if}
      </div>

    {:else if stage === 1}
      <!-- STAGE 1 — Q1 -->
      <div class="ic-stage-content ic-appear">
        <span class="ic-stage-label">QUESTION 01 OF 03</span>
        <h2 class="ic-stage-heading">What are you building right now?</h2>
        <p class="ic-stage-subtext">Be specific. Not what you want to build. What you are building today.</p>
        <textarea class="ic-textarea" bind:value={q1} placeholder="Describe your current project..." maxlength="400"></textarea>
        <div class="ic-charcount">{q1.length} / 400</div>
        {#if q1.length >= 20}
          <button class="ic-continue ic-appear" onclick={() => goToStage(2)}>Continue →</button>
        {/if}
      </div>

    {:else if stage === 2}
      <!-- STAGE 2 — Q2 -->
      <div class="ic-stage-content ic-appear">
        <span class="ic-stage-label">QUESTION 02 OF 03</span>
        <h2 class="ic-stage-heading">Why does it matter to you?</h2>
        <p class="ic-stage-subtext">Not to the market. Not to investors. To you, personally.</p>
        <textarea class="ic-textarea" bind:value={q2} placeholder="Tell us why this matters..." maxlength="400"></textarea>
        <div class="ic-charcount">{q2.length} / 400</div>
        {#if q2.length >= 20}
          <button class="ic-continue ic-appear" onclick={() => goToStage(3)}>Continue →</button>
        {/if}
      </div>

    {:else if stage === 3}
      <!-- STAGE 3 — Q3 + Contact -->
      <div class="ic-stage-content ic-appear">
        <span class="ic-stage-label">QUESTION 03 OF 03</span>
        <h2 class="ic-stage-heading">What do you want to give to the people around you?</h2>
        <p class="ic-stage-subtext">InnerCircle is an exchange. What do you bring?</p>
        <textarea class="ic-textarea" bind:value={q3} placeholder="What do you bring to the table..." maxlength="400"></textarea>
        <div class="ic-charcount">{q3.length} / 400</div>
        {#if q3.length >= 20}
          <div class="ic-appear">
            <input class="ic-input" type="text" placeholder="YOUR NAME" bind:value={applicantName} />
            <input class="ic-input" type="email" placeholder="YOUR EMAIL" bind:value={applicantEmail} />
            {#if applicantName.length > 0 && applicantEmail.length > 0}
              <button class="ic-submit" onclick={submitApplication} disabled={submitting}>
                {submitting ? 'SENDING...' : 'SUBMIT APPLICATION'}
              </button>
            {/if}
            {#if submitError}
              <p class="ic-error">{submitError}</p>
            {/if}
          </div>
        {/if}
      </div>

    {:else if stage === 4}
      <!-- STAGE 4 — Confirmation -->
      <div class="ic-stage-content ic-confirm">
        {#if s4_label}
          <span class="ic-appear ic-confirm-label">APPLICATION RECEIVED</span>
        {/if}
        <div class="ic-confirm-line" class:drawn={s4_line}></div>
        {#if s4_heading}
          <p class="ic-appear ic-confirm-heading">We will read this.<br>You will hear from us within 72 hours.</p>
        {/if}
        {#if s4_email}
          <p class="ic-appear ic-confirm-email">Check your inbox at {applicantEmail}.</p>
        {/if}
        {#if s4_close}
          <button class="ic-appear ic-confirm-return" onclick={closeOverlay}>Return to InnerCircle →</button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  /* ═══════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════ */
  .ic-hero {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: clamp(60px, 8vw, 100px);
    position: relative;
  }
  .ic-hero__content {
    max-width: 680px;
  }
  .ic-hero__h1-a {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(44px, 6vw, 72px);
    line-height: 0.93;
    letter-spacing: -0.03em;
    color: #EDF0FF;
    margin-top: 20px;
  }
  .ic-hero__gap {
    height: clamp(20px, 3vw, 36px);
  }
  .ic-hero__h1-b {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(52px, 7.5vw, 84px);
    line-height: 0.93;
    color: #18C96A;
  }
  .ic-hero__body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: clamp(15px, 1.5vw, 17px);
    line-height: 1.75;
    color: #8890BB;
    max-width: 480px;
    margin-top: 28px;
    margin-bottom: 36px;
  }

  .ic-apply-btn {
    display: inline-block;
    padding: 15px 32px;
    border: 1px solid #18C96A;
    background: transparent;
    color: #18C96A;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.25s ease, color 0.25s ease;
  }
  .ic-apply-btn:hover {
    background: #18C96A;
    color: #020408;
  }

  /* ═══════════════════════════════════════════════════
     WHAT IT IS
     ═══════════════════════════════════════════════════ */
  .ic-what {
    background: #07090F;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .ic-what__grid {
    display: grid;
    grid-template-columns: 40% 60%;
    gap: 0 clamp(32px, 5vw, 72px);
    align-items: start;
  }
  .ic-what__rule {
    width: 32px;
    height: 2px;
    background: #18C96A;
    margin-top: 24px;
  }
  .ic-what__right p {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.8;
    color: #8890BB;
    margin-bottom: 1.5em;
  }
  .ic-what__right p:last-child { margin-bottom: 0; }

  /* ═══════════════════════════════════════════════════
     PROCESS / STEPS
     ═══════════════════════════════════════════════════ */
  .ic-process {
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .ic-step {
    padding: clamp(44px, 6vw, 72px) 0;
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 0 36px;
    align-items: start;
  }
  .ic-step--alt {
    background: #07090F;
    margin-inline: calc(-1 * var(--container-pad, 32px));
    padding-inline: var(--container-pad, 32px);
  }
  .step-circle circle {
    stroke-dasharray: 125.7;
    stroke-dashoffset: 125.7;
    transition: stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ic-step.is-visible .step-circle circle {
    stroke-dashoffset: 0;
  }
  .ic-step__title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: clamp(18px, 2vw, 22px);
    color: #EDF0FF;
    margin-bottom: 10px;
  }
  .ic-step__body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.75;
    color: #8890BB;
    max-width: 560px;
  }

  /* ═══════════════════════════════════════════════════
     FINAL CTA
     ═══════════════════════════════════════════════════ */
  .ic-final {
    background: #0C0E18;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .ic-final__inner {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
  }
  .ic-final__body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: #8890BB;
    margin-top: 16px;
    margin-bottom: 32px;
    line-height: 1.7;
  }

  /* ═══════════════════════════════════════════════════
     OVERLAY
     ═══════════════════════════════════════════════════ */
  #ic-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(2, 4, 8, 0.97);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: clamp(32px, 5vw, 72px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }
  #ic-overlay.open {
    opacity: 1;
    pointer-events: all;
  }

  .ic-overlay-close {
    position: absolute;
    top: 28px;
    right: 36px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: #424870;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .ic-overlay-close:hover { color: #8890BB; }

  .ic-progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    gap: 4px;
    height: 2px;
  }
  .ic-progress-seg {
    flex: 1;
    height: 2px;
    background: #171B30;
    transition: background 0.4s ease;
  }
  .ic-progress-seg.done { background: rgba(24, 201, 106, 0.4); }
  .ic-progress-seg.active { background: #18C96A; }

  .ic-stage {
    max-width: 560px;
    width: 100%;
    text-align: center;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ic-appear {
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .ic-stage-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #424870;
    margin-bottom: 24px;
  }
  .ic-stage-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(24px, 3.5vw, 40px);
    color: #EDF0FF;
    margin: 0 0 24px 0;
    line-height: 1.3;
  }
  .ic-stage-body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.7;
    color: #8890BB;
    max-width: 420px;
    margin: 0 auto 32px;
  }
  .ic-stage-subtext {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 12px;
    color: #1E2440;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .ic-continue {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #18C96A;
    background: none;
    border: none;
    cursor: pointer;
    letter-spacing: 0.1em;
    transition: opacity 0.2s ease;
    margin-top: 16px;
  }
  .ic-continue:hover { opacity: 0.75; }

  .ic-textarea {
    width: 100%;
    max-width: 520px;
    min-height: 120px;
    margin-top: 24px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #171B30;
    padding: 12px 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.7;
    color: #EDF0FF;
    resize: vertical;
    outline: none;
    transition: border-bottom-color 0.2s ease;
    display: block;
  }
  .ic-textarea:focus { border-bottom-color: #18C96A; }
  .ic-textarea::placeholder { color: #1E2440; }

  .ic-charcount {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #424870;
    text-align: right;
    margin-top: 6px;
  }

  .ic-input {
    width: 100%;
    max-width: 520px;
    margin-top: 20px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #171B30;
    padding: 12px 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: #EDF0FF;
    outline: none;
    display: block;
    transition: border-bottom-color 0.2s ease;
  }
  .ic-input:focus { border-bottom-color: #18C96A; }
  .ic-input::placeholder {
    color: #424870;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .ic-submit {
    margin-top: 28px;
    padding: 15px 40px;
    background: #18C96A;
    color: #020408;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .ic-submit:hover { background: #14A858; }
  .ic-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .ic-error {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #E05C20;
    margin-top: 12px;
  }

  /* Confirmation stage */
  .ic-confirm { display: flex; flex-direction: column; align-items: center; }
  .ic-confirm-line {
    height: 1px;
    background: rgba(24, 201, 106, 0.35);
    width: 0;
    max-width: 320px;
    margin: 24px auto;
    transition: width 0.7s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .ic-confirm-line.drawn { width: 320px; }

  .ic-confirm-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #18C96A;
    margin-bottom: 16px;
  }
  .ic-confirm-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(18px, 2.4vw, 26px);
    color: #EDF0FF;
    line-height: 1.5;
    margin: 0 0 16px 0;
  }
  .ic-confirm-email {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #424870;
    margin: 0 0 24px 0;
  }
  .ic-confirm-return {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #424870;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .ic-confirm-return:hover { color: #8890BB; }

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
    font-size: clamp(28px, 3.5vw, 42px);
    line-height: 0.94;
    letter-spacing: -0.025em;
    color: #EDF0FF;
    margin-top: 16px;
  }

  /* ═══════════════════════════════════════════════════
     RESPONSIVE
     ═══════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .ic-what__grid { grid-template-columns: 1fr; gap: 32px 0; }
    .ic-step { grid-template-columns: 52px 1fr; gap: 0 20px; }
    .ic-step--alt {
      margin-inline: -16px;
      padding-inline: 16px;
    }
  }
</style>
