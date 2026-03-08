<script lang="ts">
  import { onMount } from "svelte";
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

  /* ── State ── */
  let overlayOpen = $state(false);
  let stage = $state(0);
  let stageReady = $state(false);
  let gatePhase = $state(0); // 0=idle,1=grow,2=slide,3=fade,4=done

  let q1 = $state("");
  let q2 = $state("");
  let q3 = $state("");
  let applicantName = $state("");
  let applicantEmail = $state("");
  let submitting = $state(false);
  let submitError = $state("");

  // Stage 0 reveals
  let s0_mark = $state(false);
  let s0_label = $state(false);
  let s0_heading = $state(false);
  let s0_body = $state(false);
  let s0_btn = $state(false);

  // Stage 4 reveals
  let s4_line = $state(false);
  let s4_label = $state(false);
  let s4_heading = $state(false);
  let s4_email = $state(false);
  let s4_return = $state(false);

  // Hero entrance
  let heroLine = $state(false);
  let heroEyebrow = $state(false);
  let heroH1a = $state(false);
  let heroH1b = $state(false);
  let heroH1c = $state(false);
  let heroBody = $state(false);
  let heroCta = $state(false);

  // Aria live
  let ariaAnnouncement = $state("");

  // Network SVG
  let networkSvgEl: SVGSVGElement | undefined = $state(undefined);

  // Reduced motion
  let reducedMotion = $state(false);

  // Focus trap refs
  let triggerBtnRef: HTMLButtonElement | undefined = $state(undefined);
  let overlayRef: HTMLDivElement | undefined = $state(undefined);

  function charCountClass(len: number) {
    if (len >= 80) return "cc-green";
    if (len >= 20) return "cc-mid";
    return "";
  }

  function openGate() {
    overlayOpen = true;
    gatePhase = 0;
    stage = -1; // no stage yet
    stageReady = false;
    s0_mark = false;
    s0_label = false;
    s0_heading = false;
    s0_body = false;
    s0_btn = false;
    s4_line = false;
    s4_label = false;
    s4_heading = false;
    s4_email = false;
    s4_return = false;
    q1 = "";
    q2 = "";
    q3 = "";
    applicantName = "";
    applicantEmail = "";
    submitting = false;
    submitError = "";

    if (reducedMotion) {
      gatePhase = 4;
      stage = 0;
      showStage0();
      return;
    }
    // Phase 1: bars grow
    requestAnimationFrame(() => {
      gatePhase = 1;
      setTimeout(() => {
        gatePhase = 2;
      }, 620); // Phase 2: slide apart
      setTimeout(() => {
        gatePhase = 3;
      }, 1340); // Phase 3: fade
      setTimeout(() => {
        gatePhase = 4;
        stage = 0;
        showStage0();
      }, 1560);
    });
  }

  function showStage0() {
    ariaAnnouncement =
      "InnerCircle Application. Before you apply, be sure you mean it.";
    const d = reducedMotion ? 0 : 120;
    setTimeout(() => {
      s0_mark = true;
    }, d * 0);
    setTimeout(() => {
      s0_label = true;
    }, d * 1);
    setTimeout(() => {
      s0_heading = true;
    }, d * 2);
    setTimeout(() => {
      s0_body = true;
    }, d * 3);
    setTimeout(() => {
      s0_btn = true;
      stageReady = true;
    }, d * 4);
    // Focus trap
    setTimeout(() => {
      const el = overlayRef?.querySelector<HTMLElement>("button, [tabindex]");
      el?.focus();
    }, d * 5);
  }

  function closeGate() {
    overlayOpen = false;
    gatePhase = 0;
    stage = 0;
    triggerBtnRef?.focus();
  }

  function goToStage(n: number) {
    stageReady = false;
    stage = n;
    const labels: Record<number, string> = {
      1: "Question 1 of 3. What are you doing with your time right now that actually matters to you?",
      2: "Question 2 of 3. Why does this matter to you?",
      3: "Question 3 of 3. What do you bring to the people around you?",
    };
    if (labels[n]) ariaAnnouncement = labels[n];
    setTimeout(() => {
      stageReady = true;
    }, 300);
  }

  async function submitApplication() {
    submitting = true;
    submitError = "";
    try {
      const resp = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: applicantName,
          email: applicantEmail,
          q1: q1,
          q2: q2,
          q3: q3,
          _subject: `InnerCircle Application — ${applicantName}`,
          _replyto: applicantEmail,
        }),
      });
      if (resp.ok) {
        stage = 4;
        ariaAnnouncement =
          "Application received. We will read this. You will hear from us within 72 hours.";
        const d = reducedMotion ? 0 : 1;
        setTimeout(() => {
          s4_line = true;
        }, 300 * d);
        setTimeout(() => {
          s4_label = true;
        }, 1100 * d);
        setTimeout(() => {
          s4_heading = true;
        }, 1700 * d);
        setTimeout(() => {
          s4_email = true;
        }, 2300 * d);
        setTimeout(() => {
          s4_return = true;
          stageReady = true;
        }, 3000 * d);
      } else {
        submitError =
          "Something went wrong. Try again or email operations@progeta.tech.";
        submitting = false;
      }
    } catch {
      submitError =
        "Something went wrong. Try again or email operations@progeta.tech.";
      submitting = false;
    }
  }

  function handleOverlayKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeGate();
      return;
    }
    if (e.key !== "Tab" || !overlayRef) return;
    const focusable = overlayRef.querySelectorAll<HTMLElement>(
      'button, textarea, input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // Network SVG animation
  function initNetwork(svg: SVGSVGElement) {
    if (reducedMotion) return;
    const nodes = svg.querySelectorAll<SVGCircleElement>(".net-node");
    const lines = svg.querySelectorAll<SVGLineElement>(".net-line");
    // Pulse nodes independently
    nodes.forEach((n, i) => {
      const dur = 3000 + Math.random() * 4000;
      const delay = Math.random() * 2000;
      n.style.animation = `node-pulse ${dur}ms ${delay}ms infinite ease-in-out`;
    });
    // Periodically toggle line visibility
    function cycleLines() {
      lines.forEach((l) => {
        const visible = Math.random() > 0.3;
        l.style.opacity = visible ? String(0.1 + Math.random() * 0.2) : "0";
        l.style.transition = `opacity ${1 + Math.random() * 2}s ease`;
      });
    }
    cycleLines();
    const interval = setInterval(cycleLines, 4000);
    return () => clearInterval(interval);
  }

  let cleanupNetwork: (() => void) | undefined;

  onMount(() => {
    reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Hero entrance
    const d = reducedMotion ? 0 : 1;
    setTimeout(() => {
      heroLine = true;
    }, 100 * d);
    setTimeout(() => {
      heroEyebrow = true;
    }, 1100 * d);
    setTimeout(() => {
      heroH1a = true;
    }, 1500 * d);
    setTimeout(() => {
      heroH1b = true;
    }, 1650 * d);
    setTimeout(() => {
      heroH1c = true;
    }, 2100 * d);
    setTimeout(() => {
      heroBody = true;
    }, 2700 * d);
    setTimeout(() => {
      heroCta = true;
    }, 3200 * d);

    // Network
    if (networkSvgEl) {
      cleanupNetwork = initNetwork(networkSvgEl) as (() => void) | undefined;
    }

    return () => {
      cleanupNetwork?.();
    };
  });

  let q3Ready = $derived(q3.length >= 20);
  let canSubmit = $derived(
    q1.length >= 20 &&
      q2.length >= 20 &&
      q3.length >= 20 &&
      applicantName.length > 0 &&
      applicantEmail.length > 0,
  );
</script>

<svelte:head>
  <title>InnerCircle — Progeta Technologies</title>
  <meta
    name="description"
    content="A vetted circle of people who are serious about what they are doing with their time. Application-only membership reviewed within 72 hours."
  />
</svelte:head>

<!-- ═══════ SECTION 1 — THE OPENING ═══════ -->
<section class="ic-hero">
  <div class="ic-hero__ground" class:drawn={heroLine}></div>
  <div class="ic-hero__content">
    <span class="ic-eyebrow" class:vis={heroEyebrow}
      >INNERCIRCLE · INITIATIVE 03</span
    >
    <h1 class="ic-h1">
      <span class="ic-h1__line ic-h1__a" class:vis={heroH1a}
        >Some communities</span
      >
      <span class="ic-h1__line ic-h1__a" class:vis={heroH1b}
        >let anyone in.</span
      >
    </h1>
    <div class="ic-h1__gap"></div>
    <span class="ic-h1__c" class:vis={heroH1c}>We don't.</span>
    <p class="ic-hero__body" class:vis={heroBody}>
      InnerCircle is a vetted circle of people who are serious about what they
      are doing with their time. Not aspiring to start. Not planning to. Doing.
      If that is you, read what follows carefully. Then decide if you want to
      apply.
    </p>
    <button
      class="gate-trigger"
      class:vis={heroCta}
      bind:this={triggerBtnRef}
      onclick={openGate}
    >
      <span class="gate-icon"
        ><span class="gate-bar"></span><span class="gate-bar"></span></span
      >
      APPLY FOR ACCESS
    </button>
  </div>
  <div class="ic-scroll-hint" class:vis={heroCta}>
    <span class="ic-scroll-hint__line"></span>
  </div>
</section>

<!-- ═══════ SECTION 2 — WHAT IT IS ═══════ -->
<section class="ic-what">
  <div class="ic-container">
    <div class="ic-what__grid">
      <div class="ic-what__left">
        <ScrollReveal>
          <span class="ic-eyebrow ic-eyebrow--static">WHAT IT IS</span>
          <h2 class="ic-section-h">Not a community.<br />A circle.</h2>
          <div class="ic-rule"></div>
        </ScrollReveal>
      </div>
      <div class="ic-what__right">
        <ScrollReveal delay={150}>
          <p>
            InnerCircle is not a Discord server. It is not a LinkedIn group. It
            is not a cohort. It is a circle — a small, maintained network of
            people who are building something real and are held to that standard
            continuously.
          </p>
          <p>
            Membership is free. But it costs participation. You are expected to
            show up to the quarterly Founders Mixer, engage in the weekly
            virtual check-ins, and contribute to the member-run workshops. If
            you stop showing up, your membership is reviewed. We do not hold
            space for absent members.
          </p>
          <p>
            The circle is deliberately small. We grow slowly and deliberately.
            Every new member changes the dynamic of the circle — so every
            admission is made carefully. If you are not accepted this round, you
            can reapply in six months.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 3 — THREE EVENTS ═══════ -->
<section class="ic-events">
  <div class="ic-container">
    <ScrollReveal>
      <span class="ic-eyebrow ic-eyebrow--static"
        >WHAT MEMBERSHIP LOOKS LIKE</span
      >
      <h2 class="ic-section-h">Three ways we meet.</h2>
    </ScrollReveal>
    <div class="ic-events__list">
      <ScrollReveal delay={100}>
        <div class="event-strip">
          <span class="event-freq">QUARTERLY</span>
          <div class="event-body">
            <h3 class="event-name">Founders Mixer</h3>
            <p class="event-desc">
              An in-person gathering of InnerCircle members. Half structured,
              half open. The structured half is a challenge — a real problem
              presented by a real member, addressed by the group. The open half
              is what it sounds like. These are not networking events. They are
              working sessions with people you trust.
            </p>
          </div>
          <span class="event-format">IN PERSON · 4 HOURS</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <div class="event-strip">
          <span class="event-freq">WEEKLY</span>
          <div class="event-body">
            <h3 class="event-name">Virtual Check-in</h3>
            <p class="event-desc">
              Forty minutes. Every week. A structured check-in format: what you
              are building, where you are stuck, what you need from the circle.
              No presentations. No updates for the sake of updates. Real
              questions only.
            </p>
          </div>
          <span class="event-format">VIRTUAL · 40 MIN</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <div class="event-strip">
          <span class="event-freq">MEMBER-RUN</span>
          <div class="event-body">
            <h3 class="event-name">Workshops</h3>
            <p class="event-desc">
              Members teach what they know. If you have built something, run a
              workshop on one specific part of how you built it. Not a lecture —
              a working session. The only requirement is that it is specific,
              honest, and practitioner-level.
            </p>
          </div>
          <span class="event-format">VIRTUAL OR IN PERSON · VARIABLE</span>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 4 — THE STANDARD ═══════ -->
<section class="ic-standard">
  <div class="ic-container">
    <div class="ic-standard__inner">
      <ScrollReveal>
        <span class="ic-eyebrow ic-eyebrow--static ic-eyebrow--center"
          >THE STANDARD</span
        >
        <h2 class="ic-section-h ic-section-h--center">
          What we hold each other to.
        </h2>
        <div class="ic-rule ic-rule--center"></div>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <p>
          You are expected to be doing something. Not waiting to start. Not
          thinking about starting. Doing — even if you're not yet sure what it
          becomes. If you pause, say so. The circle does not penalise pauses —
          it penalises pretending.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <p>
          You are expected to show up. The Founders Mixer is quarterly. The
          check-in is weekly. Consistent absence without communication results
          in membership review. We do not hold space in a small circle for
          someone who is not present in it.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={240}>
        <p>
          You are expected to contribute, not just consume. If the weekly
          check-in is the only time you engage, you are not a member of the
          circle — you are an observer of it. The distinction matters.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={320}>
        <p>
          You are expected to be honest. About where your project is. About what
          is not working. The circle is not a performance. It is a working
          environment. The builders who benefit most from it are the ones who
          bring real problems, not polished updates.
        </p>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════ SECTION 5 — NETWORK SVG ═══════ -->
<section class="ic-network">
  <svg
    bind:this={networkSvgEl}
    class="ic-network__svg"
    viewBox="0 0 800 280"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <!-- Connections -->
    <line class="net-line" x1="400" y1="140" x2="160" y2="80" />
    <line class="net-line" x1="400" y1="140" x2="620" y2="70" />
    <line class="net-line" x1="400" y1="140" x2="200" y2="210" />
    <line class="net-line" x1="400" y1="140" x2="580" y2="220" />
    <line class="net-line" x1="400" y1="140" x2="100" y2="160" />
    <line class="net-line" x1="400" y1="140" x2="700" y2="140" />
    <line class="net-line" x1="160" y1="80" x2="100" y2="160" />
    <line class="net-line" x1="620" y1="70" x2="700" y2="140" />
    <line class="net-line" x1="200" y1="210" x2="100" y2="160" />
    <line class="net-line" x1="580" y1="220" x2="700" y2="140" />
    <line class="net-line" x1="160" y1="80" x2="200" y2="210" />
    <line class="net-line" x1="620" y1="70" x2="580" y2="220" />
    <!-- Nodes -->
    <circle class="net-node net-node--center" cx="400" cy="140" r="6" />
    <circle class="net-node" cx="160" cy="80" r="4" />
    <circle class="net-node" cx="620" cy="70" r="3.5" />
    <circle class="net-node" cx="200" cy="210" r="4" />
    <circle class="net-node" cx="580" cy="220" r="3.5" />
    <circle class="net-node" cx="100" cy="160" r="3" />
    <circle class="net-node" cx="700" cy="140" r="3" />
  </svg>
</section>

<!-- ═══════ SECTION 6 — CLOSING GATE ═══════ -->
<section class="ic-closing">
  <div class="ic-container">
    <div class="ic-closing__inner">
      <ScrollReveal>
        <h2 class="ic-section-h ic-section-h--center">
          This requires something specific from you.
        </h2>
        <p class="ic-closing__body">
          If you are serious about what you are doing with your time and you
          want to be surrounded by people of equal drive and equal honesty —
          apply. You will know if this is for you. The application is five
          minutes. The review is 72 hours. There are only two outcomes.
        </p>
        <button class="closing-gate-btn" onclick={openGate}>
          <span class="gate-icon"
            ><span class="gate-bar"></span><span class="gate-bar"></span></span
          >
          APPLY FOR ACCESS
        </button>
        <span class="ic-closing__note"
          >We respond to every application within 72 hours.</span
        >
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══════ GATE BARS (always in DOM, hidden) ═══════ -->
<div
  class="gate-bar-left"
  class:phase-1={gatePhase >= 1}
  class:phase-2={gatePhase >= 2}
  class:phase-3={gatePhase >= 3}
></div>
<div
  class="gate-bar-right"
  class:phase-1={gatePhase >= 1}
  class:phase-2={gatePhase >= 2}
  class:phase-3={gatePhase >= 3}
></div>

<!-- ═══════ GATE OVERLAY ═══════ -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  bind:this={overlayRef}
  id="gate-overlay"
  class="gate-overlay"
  class:active={overlayOpen && gatePhase >= 4}
  role="dialog"
  aria-modal="true"
  aria-label="InnerCircle application"
  tabindex="-1"
  onkeydown={handleOverlayKeydown}
>
  <div class="gate-progress-bar">
    <div class="gate-seg" class:active={stage >= 1}></div>
    <div class="gate-seg" class:active={stage >= 2}></div>
    <div class="gate-seg" class:active={stage >= 3}></div>
  </div>
  <button class="gate-close" aria-label="Close application" onclick={closeGate}
    >✕</button
  >

  <!-- Aria live region -->
  <div class="sr-only" aria-live="polite">{ariaAnnouncement}</div>

  <div class="gate-stage">
    <!-- STAGE 0 — Acknowledgement -->
    <div
      class="gate-stage-content"
      style:display={stage === 0 ? "flex" : "none"}
    >
      <div
        class="gate-mark"
        class:ic-appear={s0_mark}
        class:ic-hidden={!s0_mark}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <circle
            class="gate-mark-circle"
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="#18C96A"
            stroke-width="2"
          />
          <circle class="gate-mark-dot" cx="20" cy="20" r="2" fill="#18C96A" />
        </svg>
      </div>
      <span
        class="gate-label"
        class:ic-appear={s0_label}
        class:ic-hidden={!s0_label}>INNERCIRCLE · APPLICATION</span
      >
      <h2
        class="gate-heading"
        class:ic-appear={s0_heading}
        class:ic-hidden={!s0_heading}
      >
        Before you apply, be sure you mean it.
      </h2>
      <p class="gate-body" class:ic-appear={s0_body} class:ic-hidden={!s0_body}>
        This application is read by a person, not filtered by a keyword. Three
        questions. No word limits. We are looking for people who are serious
        about their time — people who are doing something right now, not people
        who plan to.<br /><br />If you are accepted, you receive an invitation
        within 72 hours. If you are not accepted this round, you will be told
        why and when to reapply. There is no automatic rejection — just timing
        and fit.
      </p>
      <button
        class="gate-continue"
        class:ic-appear={s0_btn}
        class:ic-hidden={!s0_btn}
        onclick={() => goToStage(1)}>I UNDERSTAND. CONTINUE →</button
      >
    </div>

    <!-- STAGE 1 — Q1 -->
    <div
      class="gate-stage-content"
      class:ic-appear={stage === 1}
      style:display={stage === 1 ? "flex" : "none"}
    >
      <span class="gate-label">QUESTION 01 OF 03</span>
      <h2 class="gate-q-heading">
        What are you doing with your time right now that actually matters to
        you?
      </h2>
      <p class="gate-subtext">
        Not what you're supposed to be doing. What you're actually working on,
        pursuing, or figuring out.
      </p>
      <textarea
        class="gate-textarea"
        bind:value={q1}
        placeholder="Be specific."
        maxlength="400"
      ></textarea>
      <div class="gate-charcount {charCountClass(q1.length)}">
        {q1.length} / 400
      </div>
      {#if q1.length >= 20}
        <button class="gate-continue ic-appear" onclick={() => goToStage(2)}
          >CONTINUE →</button
        >
      {/if}
    </div>

    <!-- STAGE 2 — Q2 -->
    <div
      class="gate-stage-content"
      class:ic-appear={stage === 2}
      style:display={stage === 2 ? "flex" : "none"}
    >
      <span class="gate-label">QUESTION 02 OF 03</span>
      <h2 class="gate-q-heading">Why does this matter to you?</h2>
      <p class="gate-subtext">Not the impressive version. The real one.</p>
      <textarea
        class="gate-textarea"
        bind:value={q2}
        placeholder="No performance necessary."
        maxlength="400"
      ></textarea>
      <div class="gate-charcount {charCountClass(q2.length)}">
        {q2.length} / 400
      </div>
      {#if q2.length >= 20}
        <button class="gate-continue ic-appear" onclick={() => goToStage(3)}
          >CONTINUE →</button
        >
      {/if}
    </div>

    <!-- STAGE 3 — Q3 + Contact -->
    <div
      class="gate-stage-content"
      class:ic-appear={stage === 3}
      style:display={stage === 3 ? "flex" : "none"}
    >
      <span class="gate-label">QUESTION 03 OF 03</span>
      <h2 class="gate-q-heading">
        What do you bring to the people around you?
      </h2>
      <p class="gate-subtext">
        InnerCircle is an exchange, not a resource. What do you give to a circle
        like this?
      </p>
      <textarea
        class="gate-textarea"
        bind:value={q3}
        placeholder="Think honestly before you answer."
        maxlength="400"
      ></textarea>
      <div class="gate-charcount {charCountClass(q3.length)}">
        {q3.length} / 400
      </div>
      {#if q3Ready}
        <div class="gate-field-row ic-appear">
          <div>
            <label class="gate-field-label" for="ic-name">YOUR NAME</label>
            <input
              id="ic-name"
              class="gate-input"
              type="text"
              bind:value={applicantName}
              required
            />
          </div>
          <div>
            <label class="gate-field-label" for="ic-email">YOUR EMAIL</label>
            <input
              id="ic-email"
              class="gate-input"
              type="email"
              bind:value={applicantEmail}
              required
            />
          </div>
        </div>
        {#if canSubmit}
          <button
            class="gate-submit ic-appear"
            onclick={submitApplication}
            disabled={submitting}
          >
            {submitting ? "SENDING..." : "SUBMIT APPLICATION →"}
          </button>
        {/if}
        {#if submitError}
          <p class="gate-error">{submitError}</p>
        {/if}
      {/if}
    </div>

    <!-- STAGE 4 — Confirmation -->
    <div
      class="gate-stage-content gate-confirm"
      style:display={stage === 4 ? "flex" : "none"}
    >
      <div class="gate-confirm-line" class:drawn={s4_line}></div>
      <span
        class="gate-confirm-label"
        class:ic-appear={s4_label}
        class:ic-hidden={!s4_label}>APPLICATION RECEIVED</span
      >
      <p
        class="gate-confirm-text"
        class:ic-appear={s4_heading}
        class:ic-hidden={!s4_heading}
      >
        We will read this. You will hear from us within 72 hours.
      </p>
      <p
        class="gate-confirm-email"
        class:ic-appear={s4_email}
        class:ic-hidden={!s4_email}
      >
        Check your inbox at {applicantEmail}.
      </p>
      <button
        class="gate-confirm-return"
        class:ic-appear={s4_return}
        class:ic-hidden={!s4_return}
        onclick={() => {
          closeGate();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>Return to InnerCircle ↗</button
      >
    </div>
  </div>
</div>

<style>
  /* ── SHARED ── */
  .ic-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 clamp(16px, 4vw, 64px);
  }
  .ic-eyebrow {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: block;
  }
  .ic-eyebrow--static {
    opacity: 1;
  }
  .ic-eyebrow--center {
    text-align: center;
  }
  .ic-section-h {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(28px, 3.5vw, 42px);
    line-height: 0.95;
    color: #edf0ff;
    margin-top: 16px;
  }
  .ic-section-h--center {
    text-align: center;
  }
  .ic-rule {
    width: 32px;
    height: 2px;
    background: #18c96a;
    margin-top: 20px;
  }
  .ic-rule--center {
    margin-left: auto;
    margin-right: auto;
    width: 40px;
    margin-top: 20px;
    margin-bottom: 32px;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  @keyframes ic-fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .ic-appear {
    animation: ic-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .ic-hidden {
    opacity: 0 !important;
  }

  /* ── HERO ── */
  .ic-hero {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: clamp(60px, 8vw, 100px);
    position: relative;
    background: #020408;
  }
  .ic-hero__ground {
    position: absolute;
    bottom: 40%;
    left: 0;
    height: 1px;
    background: #0f1220;
    width: 0;
    transition: width 0.8s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .ic-hero__ground.drawn {
    width: 100%;
  }
  .ic-hero__content {
    max-width: 680px;
    padding: 0 clamp(16px, 4vw, 64px);
    position: relative;
    z-index: 1;
  }

  .ic-hero .ic-eyebrow {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }
  .ic-hero .ic-eyebrow.vis {
    opacity: 1;
    transform: translateY(0);
  }

  .ic-h1 {
    margin-top: 20px;
    overflow: hidden;
  }
  .ic-h1__line {
    display: block;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(44px, 6vw, 72px);
    line-height: 0.93;
    color: #edf0ff;
    opacity: 0;
    transform: translateY(100%);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
  }
  .ic-h1__line.vis {
    opacity: 1;
    transform: translateY(0);
  }
  .ic-h1__gap {
    height: clamp(20px, 3vw, 36px);
  }
  .ic-h1__c {
    display: block;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(52px, 7.5vw, 84px);
    line-height: 0.93;
    color: #18c96a;
    opacity: 0;
    transform: translateY(100%);
    transition:
      opacity 0.7s ease,
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ic-h1__c.vis {
    opacity: 1;
    transform: translateY(0);
  }

  .ic-hero__body {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: clamp(15px, 1.5vw, 17px);
    color: var(--ink-2);
    max-width: 460px;
    margin-top: 22px;
    line-height: 1.78;
    opacity: 0;
    transition: opacity 0.6s ease;
    transform: none;
  }
  .ic-hero__body.vis {
    opacity: 1;
  }

  /* Gate trigger button */
  .gate-trigger {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 15px 30px;
    border: 1px solid #18c96a;
    background: transparent;
    color: #18c96a;
    font-family: "DM Mono", monospace;
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition:
      background 0.25s ease,
      opacity 0.5s ease,
      transform 0.5s ease;
    margin-top: 36px;
    opacity: 0;
    transform: scale(0.96);
  }
  .gate-trigger.vis {
    opacity: 1;
    transform: scale(1);
  }
  .gate-trigger:hover {
    background: rgba(24, 201, 106, 0.07);
  }
  .gate-icon {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .gate-bar {
    width: 2px;
    height: 14px;
    background: #18c96a;
    border-radius: 1px;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .gate-trigger:hover .gate-bar:first-child {
    transform: translateX(-3px);
  }
  .gate-trigger:hover .gate-bar:last-child {
    transform: translateX(3px);
  }

  /* Scroll indicator */
  .ic-scroll-hint {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 1s ease 0.5s;
  }
  .ic-scroll-hint.vis {
    opacity: 1;
  }
  .ic-scroll-hint__line {
    display: block;
    width: 1px;
    height: 32px;
    background: #1e2440;
    animation: scroll-pulse 2s ease-in-out infinite;
  }
  @keyframes scroll-pulse {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* ── SECTION 2 — WHAT ── */
  .ic-what {
    background: var(--ground);
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .ic-what__grid {
    display: grid;
    grid-template-columns: 40% 60%;
    gap: 0 clamp(32px, 5vw, 72px);
    align-items: start;
  }
  .ic-what__right p {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.8;
    color: var(--ink-2);
    margin-bottom: 1.5em;
  }
  .ic-what__right p:last-child {
    margin-bottom: 0;
  }

  /* ── SECTION 3 — EVENTS ── */
  .ic-events {
    padding: clamp(80px, 11vw, 144px) 0;
    background: #020408;
  }
  .ic-events__list {
    margin-top: clamp(32px, 5vw, 56px);
  }
  .event-strip {
    display: grid;
    grid-template-columns: 80px 1fr 120px;
    gap: 0 32px;
    padding: 32px 0;
    border-top: 1px solid #0f1220;
    align-items: start;
    position: relative;
    overflow: hidden;
  }
  .event-strip:last-child {
    border-bottom: 1px solid #0f1220;
  }
  .event-strip::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #18c96a;
    transition: width 0.55s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .event-strip:hover::before {
    width: 100%;
  }
  .event-freq {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding-top: 3px;
  }
  .event-name {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(20px, 2.5vw, 28px);
    color: #edf0ff;
    line-height: 1;
    margin-bottom: 10px;
  }
  .event-desc {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.72;
    color: var(--ink-2);
    max-width: 560px;
  }
  .event-format {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    text-align: right;
    padding-top: 3px;
  }

  /* ── SECTION 4 — STANDARD ── */
  .ic-standard {
    background: var(--ground);
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .ic-standard__inner {
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
  }
  .ic-standard__inner p {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.8;
    color: var(--ink-2);
    text-align: center;
    margin-bottom: 1.8em;
  }
  .ic-standard__inner p:last-child {
    margin-bottom: 0;
  }

  /* ── SECTION 5 — NETWORK ── */
  .ic-network {
    padding: clamp(48px, 7vw, 96px) 0;
    background: #020408;
  }
  .ic-network__svg {
    width: 100%;
    height: 280px;
    display: block;
  }
  .net-line {
    stroke: #18c96a;
    stroke-width: 0.5;
    opacity: 0.15;
  }
  .net-node {
    fill: #18c96a;
    opacity: 0.4;
  }
  .net-node--center {
    opacity: 0.8;
  }
  @keyframes node-pulse {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
  }

  /* ── SECTION 6 — CLOSING ── */
  .ic-closing {
    background: #0c0e18;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .ic-closing__inner {
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
  }
  .ic-closing__body {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 400;
    font-style: italic;
    font-size: clamp(17px, 2vw, 22px);
    color: var(--ink-2);
    line-height: 1.85;
    margin-top: 18px;
  }
  .closing-gate-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 18px 40px;
    border: 1px solid #18c96a;
    background: transparent;
    color: #18c96a;
    font-family: "DM Mono", monospace;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.25s ease;
    width: 100%;
    max-width: 400px;
    margin-top: 36px;
  }
  .closing-gate-btn:hover {
    background: rgba(24, 201, 106, 0.07);
  }
  .ic-closing__note {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 10px;
    color: #1e2440;
    margin-top: 16px;
  }

  /* ── GATE BARS ── */
  .gate-bar-left,
  .gate-bar-right {
    position: fixed;
    top: 0;
    width: 1px;
    height: 100vh;
    background: #18c96a;
    z-index: 2100;
    pointer-events: none;
    left: 50%;
    transform: scaleY(0);
    transform-origin: center center;
    opacity: 0;
  }
  .gate-bar-left.phase-1,
  .gate-bar-right.phase-1 {
    opacity: 1;
    transform: scaleY(1);
    transition:
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.1s;
  }
  .gate-bar-left.phase-2 {
    left: -2px;
    transition: left 0.7s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .gate-bar-right.phase-2 {
    left: calc(100% + 2px);
    transition: left 0.7s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .gate-bar-left.phase-3,
  .gate-bar-right.phase-3 {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* ── GATE OVERLAY ── */
  .gate-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 4, 8, 0);
    z-index: 2050;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity 0.4s ease,
      background 0.6s ease;
    padding: clamp(32px, 5vw, 72px);
  }
  .gate-overlay.active {
    pointer-events: all;
    opacity: 1;
    background: rgba(2, 4, 8, 0.97);
  }

  .gate-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    display: flex;
    gap: 2px;
    background: var(--ground);
  }
  .gate-seg {
    flex: 1;
    height: 100%;
    background: #1e2440;
    transition: background 0.4s ease;
  }
  .gate-seg.active {
    background: #18c96a;
  }

  .gate-close {
    position: absolute;
    top: 28px;
    right: 28px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid #171b30;
    border-radius: 50%;
    color: var(--ink-3);
    font-size: 14px;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      color 0.2s ease;
    z-index: 2060;
  }
  .gate-close:hover {
    border-color: var(--ink-3);
    color: #edf0ff;
  }

  .gate-stage {
    max-width: 560px;
    width: 100%;
    text-align: center;
  }
  .gate-stage-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gate-mark {
    margin-bottom: 16px;
  }
  @keyframes circle-draw {
    from {
      stroke-dashoffset: 113;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  :global(.gate-mark-circle) {
    stroke-dasharray: 113;
    stroke-dashoffset: 113;
    animation: circle-draw 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  :global(.gate-mark-dot) {
    opacity: 0;
    animation: ic-fade-up 0.4s 1s forwards;
  }

  .gate-label {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 16px;
  }
  .gate-heading {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-style: italic;
    font-size: clamp(26px, 3.5vw, 38px);
    color: #edf0ff;
    margin: 0 0 18px 0;
    line-height: 1.1;
  }
  .gate-body {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.8;
    color: var(--ink-2);
    max-width: 440px;
    margin: 0 auto 32px;
  }
  .gate-continue {
    padding: 13px 32px;
    background: transparent;
    border: 1px solid #18c96a;
    color: #18c96a;
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .gate-continue:hover {
    background: rgba(24, 201, 106, 0.07);
  }

  .gate-q-heading {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(28px, 3.5vw, 44px);
    color: #edf0ff;
    line-height: 1.05;
    margin: 14px 0 0 0;
  }
  .gate-subtext {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--ink-3);
    font-style: italic;
    margin-top: 10px;
  }
  .gate-textarea {
    width: 100%;
    min-height: 140px;
    margin-top: 24px;
    padding: 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid #171b30;
    color: #edf0ff;
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.75;
    resize: none;
    outline: none;
    transition: border-color 0.2s ease;
  }
  .gate-textarea:focus {
    border-bottom-color: #18c96a;
  }
  .gate-textarea::placeholder {
    color: #1e2440;
    font-style: italic;
  }

  .gate-charcount {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    color: #1e2440;
    text-align: right;
    margin-top: 8px;
    transition: color 0.2s ease;
  }
  .gate-charcount.cc-mid {
    color: var(--ink-3);
  }
  .gate-charcount.cc-green {
    color: #18c96a;
  }

  .gate-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 24px;
    width: 100%;
  }
  .gate-field-label {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 8px;
    text-align: left;
  }
  .gate-input {
    width: 100%;
    padding: 0 0 10px 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid #171b30;
    color: #edf0ff;
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;
  }
  .gate-input:focus {
    border-bottom-color: #18c96a;
  }

  .gate-submit {
    width: 100%;
    margin-top: 24px;
    padding: 16px;
    background: #18c96a;
    border: none;
    color: #020408;
    font-family: "DM Mono", monospace;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .gate-submit:hover {
    background: #14b05c;
  }
  .gate-submit:disabled {
    background: #1e2440;
    color: var(--ink-3);
    cursor: not-allowed;
  }
  .gate-error {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    color: #e05c20;
    margin-top: 12px;
  }

  /* Confirmation */
  .gate-confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gate-confirm-line {
    height: 1px;
    background: rgba(24, 201, 106, 0.25);
    width: 0;
    max-width: 100%;
    margin: 24px 0;
    transition: width 0.7s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .gate-confirm-line.drawn {
    width: 100%;
  }
  .gate-confirm-label {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #18c96a;
    margin-bottom: 16px;
  }
  .gate-confirm-text {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 400;
    font-style: italic;
    font-size: clamp(20px, 2.5vw, 28px);
    color: #edf0ff;
    line-height: 1.6;
    max-width: 440px;
    margin: 0 0 16px 0;
  }
  .gate-confirm-email {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--ink-2);
    margin: 0 0 48px 0;
  }
  .gate-confirm-return {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    color: var(--ink-3);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .gate-confirm-return:hover {
    color: var(--ink-2);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .ic-what__grid {
      grid-template-columns: 1fr;
      gap: 32px 0;
    }
    .event-strip {
      grid-template-columns: 1fr;
      gap: 12px 0;
    }
    .event-format {
      text-align: left;
    }
    .ic-network__svg {
      height: 160px;
    }
    .ic-h1__c {
      font-size: clamp(44px, 8vw, 64px);
    }
    .gate-field-row {
      grid-template-columns: 1fr;
    }
  }

  /* ── REDUCED MOTION ── */
  @media (prefers-reduced-motion: reduce) {
    .ic-h1__line,
    .ic-h1__c,
    .ic-hero__body,
    .gate-trigger,
    .ic-hero .ic-eyebrow {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .ic-hero__ground {
      transition: none !important;
      width: 100% !important;
    }
    .ic-appear {
      animation: none !important;
      opacity: 1 !important;
    }
    .net-node {
      animation: none !important;
    }
    .gate-bar-left,
    .gate-bar-right {
      display: none !important;
    }
  }
</style>
