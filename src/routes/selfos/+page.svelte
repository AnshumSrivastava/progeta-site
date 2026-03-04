<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import OrbitalSystem from "$lib/components/animations/OrbitalSystem.svelte";
</script>

<svelte:head>
  <title>SelfOS — Progeta Technologies</title>
  <meta
    name="description"
    content="A local-first personal operating system designed to help you run your life with complete intention and privacy."
  />
</svelte:head>

<!-- ═══ SECTION 1: HERO ═══ -->
<section class="selfos-hero">
  <div class="container hero-container">
    <ScrollReveal>
      <span class="selfos-eyebrow">SELFOS · INITIATIVE 02</span>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <h1 class="selfos-hero__heading">
        <span class="heading-part-1"
          >"You don't have a<br />productivity problem."</span
        >
        <span class="heading-part-2">"You have a system problem."</span>
      </h1>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <p class="selfos-hero__body">
        SelfOS is a personal operating system built around how you actually
        think and work — not how a product team imagined you do. Local-first,
        end-to-end encrypted, and completely yours. No subscription required to
        own your own data.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={300}>
      <div class="selfos-hero__ctas">
        <a href="/selfos/app" class="selfos-primary-cta">TRY SELFOS →</a>
        <a href="/download" class="selfos-ghost-cta">DOWNLOAD FOR LOCAL USE →</a
        >
      </div>
    </ScrollReveal>
    <ScrollReveal delay={400}>
      <div class="alpha-badge">
        <span class="alpha-dot"></span>
        <span class="alpha-text"
          >Public Alpha · v2.1 · Report issues at <a
            href="mailto:operations@progeta.tech">operations@progeta.tech</a
          ></span
        >
      </div>
    </ScrollReveal>

    <div class="hero-orbital">
      <div class="orbital-wrap">
        <OrbitalSystem />
      </div>
    </div>
  </div>

  <div class="scroll-ind">
    <div class="scroll-ind__line"></div>
    <span class="scroll-ind__text">SCROLL</span>
  </div>
</section>

<!-- ═══ SECTION 2: THE TWO MODES ═══ -->
<section class="selfos-modes">
  <div class="container">
    <ScrollReveal>
      <span class="selfos-eyebrow">HOW SELFOS WORKS</span>
      <h2 class="selfos-section-heading">"One system. Two ways to run it."</h2>
      <p class="selfos-section-subtext">
        Choose how SelfOS stores your data. You can switch modes at any time.
        Your data is always yours — the difference is only where it lives.
      </p>
    </ScrollReveal>

    <div class="mode-split">
      <ScrollReveal delay={100}>
        <div class="mode-panel mode-panel--cloud">
          <span class="mode-tag">WITH ACCOUNT</span>
          <h3 class="mode-heading">"Sync across your devices."</h3>
          <p class="mode-body">
            Create a free account. Your data is encrypted and synced to Progeta
            Technologies' servers. Access SelfOS from any device. Works offline
            — changes sync when you reconnect.
          </p>
          <ul class="mode-features">
            <li><span class="mf-arrow">→</span> Multi-device sync</li>
            <li><span class="mf-arrow">→</span> Encrypted cloud backup</li>
            <li>
              <span class="mf-arrow">→</span> Offline-first, syncs on reconnect
            </li>
            <li><span class="mf-arrow">→</span> Free account required</li>
          </ul>
          <a href="/selfos/app" class="mode-cta">Create a free account →</a>
        </div>
      </ScrollReveal>

      <div class="mode-divider">
        <span class="mode-or">or</span>
      </div>

      <ScrollReveal delay={200}>
        <div class="mode-panel mode-panel--local">
          <span class="mode-tag">NO ACCOUNT</span>
          <h3 class="mode-heading">"Your data stays on your device."</h3>
          <p class="mode-body">
            No account. No server. No network required. Everything lives in your
            browser's local storage or as an exported file. Complete privacy.
            Works permanently offline. Cannot be accessed by anyone else —
            including us.
          </p>
          <ul class="mode-features">
            <li><span class="mf-arrow">→</span> Zero server contact</li>
            <li><span class="mf-arrow">→</span> No account required</li>
            <li><span class="mf-arrow">→</span> Works fully offline</li>
            <li>
              <span class="mf-arrow">→</span> Export your data at any time
            </li>
          </ul>
          <p class="mode-note">
            Local mode data lives in your browser. Clearing browser data will
            delete it. Export regularly to keep a backup.
          </p>
          <a href="/download" class="mode-cta">Download for local use →</a>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ═══ SECTION 3: WHAT'S INSIDE ═══ -->
<section class="selfos-modules">
  <div class="container--wide">
    <ScrollReveal>
      <span class="selfos-eyebrow">WHAT'S INSIDE</span>
      <h2 class="selfos-section-heading">"Nine modules. One system."</h2>
      <p class="selfos-section-subtext">
        SelfOS is not a collection of disconnected apps. Every module connects
        to every other. A task in Tasks links to a goal in Goals. A focus
        session in Focus links to a task. The dashboard reads all nine and shows
        you what matters right now.
      </p>
    </ScrollReveal>

    <div class="modules-grid">
      {#each [{ num: "01", name: "Dashboard", status: "live", desc: "The operating system layer. Reads from all nine modules and surfaces what needs your attention right now. Your streak, your momentum score, your day at a glance.", icon: "dashboard" }, { num: "02", name: "Tasks", status: "live", desc: "A task manager that understands context. Today view, scheduled view, kanban, and project grouping. Natural language due dates. Recurring tasks. Batch actions.", icon: "tasks" }, { num: "03", name: "Habits", status: "live", desc: "Track streaks without obsessing over them. Daily checklist, calendar heatmap for the past 365 days, and a pause mode for when life intervenes. Streaks are meant to serve you, not punish you.", icon: "habits" }, { num: "04", name: "Goals", status: "live", desc: "A goal system with real hierarchy. Lifetime goals contain 3-year goals, which contain 1-year goals, which contain 90-day goals. Your tasks connect upward to the biggest thing you're working toward.", icon: "goals" }, { num: "05", name: "Focus", status: "live", desc: "A timer with intention. Pomodoro, deep work, or free. Links to a task so every session has a reason. Tracks your energy before and after. Shows you when you are sharpest.", icon: "focus" }, { num: "06", name: "Finance", status: "live", desc: "Track income and expenses without connecting to your bank. Manual entry, category budgets, multi-currency support, and a running picture of where your money goes and where it comes from.", icon: "finance" }, { num: "07", name: "Vitals", status: "alpha", desc: "Log workouts, meals, and body metrics. Food lookup via the USDA database. BMI, BMR, and TDEE calculated locally — no health API calls. Progress photos are local-only and never synced.", icon: "vitals" }, { num: "08", name: "Notes", status: "live", desc: "A markdown knowledge base with wiki-links between notes. [[note title]] syntax connects ideas. Full-text search. Templates for meetings, book summaries, and reflections. Exports as Obsidian-compatible markdown.", icon: "notes" }, { num: "09", name: "Journal", status: "live", desc: "One entry per day. A daily prompt based on your mood, goals, and recent patterns. Mood and energy tracking. A private flag that makes specific entries local-only even in cloud mode. No one reads this but you.", icon: "journal" }] as mod, i}
        <ScrollReveal delay={i * 60}>
          <div class="module-card">
            <div class="module-icon">
              {#if mod.icon === "dashboard"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><circle cx="8" cy="10" r="2" fill="#424870" /><circle
                    cx="14"
                    cy="10"
                    r="2"
                    fill="#1A8FE3"
                  /><circle cx="20" cy="10" r="2" fill="#424870" /><circle
                    cx="8"
                    cy="18"
                    r="2"
                    fill="#424870"
                  /><circle cx="14" cy="18" r="2" fill="#424870" /><circle
                    cx="20"
                    cy="18"
                    r="2"
                    fill="#424870"
                  /></svg
                >
              {:else if mod.icon === "tasks"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><line
                    x1="12"
                    y1="10"
                    x2="24"
                    y2="10"
                    stroke="#1A8FE3"
                    stroke-width="2"
                  /><circle cx="8" cy="10" r="2" fill="#1A8FE3" /><line
                    x1="8"
                    y1="14"
                    x2="20"
                    y2="14"
                    stroke="#424870"
                    stroke-width="2"
                  /><line
                    x1="8"
                    y1="18"
                    x2="16"
                    y2="18"
                    stroke="#424870"
                    stroke-width="2"
                  /></svg
                >
              {:else if mod.icon === "habits"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><path
                    d="M14 6 A 8 8 0 1 1 6 14"
                    stroke="#1A8FE3"
                    stroke-width="2"
                    stroke-linecap="round"
                  /><path
                    d="M14 6 A 8 8 0 0 0 6 14"
                    stroke="#424870"
                    stroke-width="2"
                    stroke-dasharray="2 4"
                    stroke-linecap="round"
                  /></svg
                >
              {:else if mod.icon === "goals"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><circle
                    cx="14"
                    cy="14"
                    r="8"
                    stroke="#424870"
                    stroke-width="1.5"
                  /><circle
                    cx="14"
                    cy="14"
                    r="5"
                    stroke="#1A8FE3"
                    stroke-width="1.5"
                  /><circle cx="14" cy="14" r="2" fill="#1A8FE3" /></svg
                >
              {:else if mod.icon === "focus"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><circle
                    cx="14"
                    cy="14"
                    r="9"
                    stroke="#424870"
                    stroke-width="1.5"
                  /><path
                    d="M14 5 A 9 9 0 0 1 23 14 L 14 14 Z"
                    fill="#1A8FE3"
                  /></svg
                >
              {:else if mod.icon === "finance"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><line
                    x1="4"
                    y1="18"
                    x2="24"
                    y2="18"
                    stroke="#424870"
                    stroke-width="2"
                  /><line
                    x1="18"
                    y1="18"
                    x2="24"
                    y2="10"
                    stroke="#1A8FE3"
                    stroke-width="2"
                  /></svg
                >
              {:else if mod.icon === "vitals"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><path
                    d="M4 16 L 8 10 L 12 18 L 18 6 L 24 16"
                    stroke="#1A8FE3"
                    stroke-width="2"
                    stroke-linejoin="round"
                    fill="none"
                  /></svg
                >
              {:else if mod.icon === "notes"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><rect
                    x="6"
                    y="5"
                    width="16"
                    height="18"
                    rx="1"
                    stroke="#424870"
                    stroke-width="1.5"
                  /><line
                    x1="9"
                    y1="10"
                    x2="19"
                    y2="10"
                    stroke="#1A8FE3"
                    stroke-width="1.5"
                  /><line
                    x1="9"
                    y1="14"
                    x2="15"
                    y2="14"
                    stroke="#1A8FE3"
                    stroke-width="1.5"
                  /><path d="M6 23 L 10 19 L 6 19 Z" fill="#424870" /></svg
                >
              {:else if mod.icon === "journal"}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                  ><path
                    d="M14 6 L 6 8 L 6 22 L 14 20 Z"
                    stroke="#424870"
                    stroke-width="1.5"
                  /><path
                    d="M14 6 L 22 8 L 22 22 L 14 20 Z"
                    stroke="#1A8FE3"
                    stroke-width="1.5"
                  /><line
                    x1="14"
                    y1="6"
                    x2="14"
                    y2="20"
                    stroke="#1A8FE3"
                    stroke-width="1.5"
                  /></svg
                >
              {/if}
            </div>
            <span class="module-num">{mod.num}</span>
            <h3 class="module-name">{mod.name}</h3>
            <p class="module-desc">{mod.desc}</p>
            <span
              class="module-status"
              class:live={mod.status === "live"}
              class:alpha={mod.status === "alpha"}
              >● {mod.status.toUpperCase()}</span
            >
          </div>
        </ScrollReveal>
      {/each}
    </div>

    <ScrollReveal>
      <p class="modules-note">
        The dashboard reads all nine modules. Every module feeds every other.
        Start with one — the others become useful as you do.
      </p>
    </ScrollReveal>

    <ScrollReveal>
      <div class="dashboard-callout">
        <div class="dashboard-callout-label">THE SYSTEM LAYER</div>
        <div class="dashboard-callout-content">
          <h3 class="dashboard-callout-heading">
            The Dashboard is not a module.
          </h3>
          <p class="dashboard-callout-body">
            It is the operating system. It reads from all nine modules — today's
            tasks, habits due, active focus timer, decisions that need making.
            Quick Capture accepts any text and routes it to the right module
            automatically. It is the first thing you see when you open SelfOS.
          </p>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══ SECTION 4: WHY LOCAL-FIRST MATTERS ═══ -->
<section class="selfos-manifesto">
  <div class="container--narrow">
    <ScrollReveal>
      <span class="selfos-eyebrow center">WHY LOCAL-FIRST</span>
      <h2 class="selfos-manifesto__heading">"Your data is not a product."</h2>
      <div class="selfos-manifesto__rule"></div>
      <p class="selfos-manifesto__body">
        The default assumption of most software is that your data belongs to the
        service. Your notes, your tasks, your habits, your finances — these are
        collected, analysed, and used to improve a product you pay for with your
        attention.
      </p>
      <p class="selfos-manifesto__body">
        SelfOS is built on the opposite assumption. Your data belongs to you. In
        local mode, it never leaves your device. In cloud mode, it is encrypted
        before it reaches our servers — we cannot read it. There is no
        advertising. There is no analytics pipeline built on your behaviour.
      </p>
      <p class="selfos-manifesto__body">
        This is not a privacy policy. It is a design decision made at the
        architecture level. Local-first is not a feature you toggle. It is how
        SelfOS was built.
      </p>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <div class="selfos-beliefs">
        <div class="selfos-belief">
          <div class="selfos-belief-rule"></div>
          <span class="selfos-belief-text">LOCAL · FIRST</span>
        </div>
        <div class="selfos-belief">
          <div class="selfos-belief-rule"></div>
          <span class="selfos-belief-text">ENCRYPTED · ALWAYS</span>
        </div>
        <div class="selfos-belief">
          <div class="selfos-belief-rule"></div>
          <span class="selfos-belief-text">YOURS · PERMANENTLY</span>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══ SECTION 5: CURRENT STATUS ═══ -->
<section class="selfos-status">
  <div class="container">
    <ScrollReveal>
      <span class="selfos-eyebrow">CURRENT STATUS</span>
      <h2 class="selfos-section-heading">"Public Alpha. What that means."</h2>
    </ScrollReveal>

    <div class="status-grid">
      <ScrollReveal delay={100}>
        <div class="status-cell">
          <div class="status-cell-label stable">● STABLE</div>
          <ul class="status-list stable-list">
            <li>
              <span class="sl-icon">✓</span> Tasks, Habits, Goals, Focus, Finance,
              Notes, Journal
            </li>
            <li>
              <span class="sl-icon">✓</span> Local mode — fully offline and private
            </li>
            <li>
              <span class="sl-icon">✓</span> Cloud mode with Supabase sync
            </li>
            <li>
              <span class="sl-icon">✓</span> Data export (full JSON + per-module
              CSV)
            </li>
            <li>
              <span class="sl-icon">✓</span> The dashboard with Quick Capture routing
            </li>
          </ul>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <div class="status-cell">
          <div class="status-cell-label progress">◌ IN PROGRESS</div>
          <ul class="status-list progress-list">
            <li>
              <span class="sl-icon">◌</span> Vitals module (food database integration)
            </li>
            <li>
              <span class="sl-icon">◌</span> Mobile layout (desktop-first for now)
            </li>
            <li>
              <span class="sl-icon">◌</span> AI integration for Quick Capture routing
            </li>
            <li>
              <span class="sl-icon">◌</span> Quantum encryption layer (research phase)
            </li>
            <li>
              <span class="sl-icon">◌</span> Cross-device sync speed improvements
            </li>
          </ul>
        </div>
      </ScrollReveal>
    </div>

    <ScrollReveal delay={300}>
      <p class="status-note">
        We ship updates regularly. v2.1 is the current release. If you find
        something broken, email <a href="mailto:operations@progeta.tech"
          >operations@progeta.tech</a
        > with the subject line 'SelfOS Bug' and we will respond. If something works
        well, we want to know that too.
      </p>
    </ScrollReveal>
  </div>
</section>

<!-- ═══ SECTION 6: THE CLOSING CTA ═══ -->
<section class="selfos-cta-section">
  <div class="container--narrow" style="position: relative; z-index: 2;">
    <ScrollReveal>
      <h2 class="selfos-manifesto__heading center">
        "Ready to run your life with intention?"
      </h2>
      <p class="selfos-hero__body center" style="margin: 16px auto 0;">
        SelfOS is free in public alpha. Choose the mode that fits how you think
        about your data. You can export everything and switch modes at any time.
      </p>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <div class="closing-ctas">
        <a href="/selfos/app" class="closing-cta closing-cta--primary">
          <span class="cta-label">WITH ACCOUNT</span>
          <span class="cta-action">TRY SELFOS →</span>
          <span class="cta-sub">Cloud sync · Free · Multi-device</span>
        </a>
        <a href="/download" class="closing-cta closing-cta--ghost">
          <span class="cta-label">NO ACCOUNT</span>
          <span class="cta-action">DOWNLOAD →</span>
          <span class="cta-sub">Local only · Fully private · Offline</span>
        </a>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <p class="roadmap-signal">
        AI integration and advanced encryption are on the roadmap for v3.0.
        Early users help shape what gets built next.
      </p>
    </ScrollReveal>
  </div>

  <div class="cta-orbital">
    <OrbitalSystem />
  </div>
</section>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 64px);
  }
  .container--wide {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 48px);
  }
  .container--narrow {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 64px);
  }

  .selfos-eyebrow {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #424870;
    display: block;
    margin-bottom: 24px;
  }
  .selfos-eyebrow.center {
    text-align: center;
  }
  .selfos-section-heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(30px, 4vw, 48px);
    color: #edf0ff;
    margin: 0 0 14px 0;
  }
  .selfos-section-subtext {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: #8890bb;
    max-width: 560px;
    margin: 0;
    line-height: 1.7;
  }

  /* ── 1. HERO ── */
  .selfos-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: flex-end;
    background: #020408;
    overflow: hidden;
    padding-bottom: clamp(60px, 8vw, 100px);
  }
  .hero-container {
    position: relative;
    z-index: 2;
    width: 100%;
  }
  .selfos-hero__heading {
    margin: 0 0 24px;
  }
  .heading-part-1 {
    display: block;
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(44px, 6vw, 72px);
    line-height: 0.93;
    color: #edf0ff;
    margin-bottom: clamp(16px, 2.5vw, 28px);
  }
  .heading-part-2 {
    display: block;
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(48px, 6.5vw, 78px);
    line-height: 0.93;
    color: #1a8fe3;
  }
  .selfos-hero__body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: clamp(15px, 1.5vw, 17px);
    color: #8890bb;
    max-width: 480px;
    margin: 0;
    line-height: 1.7;
  }

  .selfos-hero__ctas {
    display: flex;
    gap: 14px;
    margin-top: 36px;
    flex-wrap: wrap;
  }
  .selfos-primary-cta {
    display: inline-block;
    padding: 14px 28px;
    background: #1a8fe3;
    color: #020408;
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .selfos-primary-cta:hover {
    background: #1478c8;
  }
  .selfos-ghost-cta {
    display: inline-block;
    padding: 14px 28px;
    border: 1px solid #1a8fe3;
    color: #1a8fe3;
    background: transparent;
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  .selfos-ghost-cta:hover {
    background: rgba(26, 143, 227, 0.08);
  }

  .alpha-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
  }
  .alpha-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1a8fe3;
    animation: pulse-blue 2.4s ease-in-out infinite;
  }
  @keyframes pulse-blue {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
  .alpha-text {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #424870;
  }
  .alpha-text a {
    color: #1a8fe3;
    text-decoration: none;
  }
  .alpha-text a:hover {
    text-decoration: underline;
  }

  .scroll-ind {
    position: absolute;
    bottom: 0;
    left: clamp(20px, 4vw, 64px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .scroll-ind__line {
    width: 1px;
    height: 64px;
    background: linear-gradient(to bottom, transparent, #1a8fe3);
  }
  .scroll-ind__text {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.24em;
    color: #1a8fe3;
    margin-bottom: 24px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  .hero-orbital {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 300px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 1;
    transform: translate(10%, 10%);
    overflow: hidden;
  }
  .orbital-wrap {
    width: 200%;
    height: 200%;
    transform: translate(-25%, -25%);
  }

  /* ── 2. MODES ── */
  .selfos-modes {
    background: #07090f;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .mode-split {
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    gap: 0;
    margin-top: 48px;
    align-items: start;
  }
  @media (max-width: 640px) {
    .mode-split {
      grid-template-columns: 1fr;
    }
    .mode-divider {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px 0;
      flex-direction: row;
    }
    .mode-divider::before,
    .mode-divider::after {
      content: "";
      flex: 1;
      height: 1px;
      width: auto;
      background: #0f1220;
      margin: 0;
    }
  }
  .mode-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
  }
  .mode-divider::before {
    content: "";
    width: 1px;
    height: 48px;
    background: #0f1220;
  }
  .mode-divider::after {
    content: "";
    width: 1px;
    flex: 1;
    background: #0f1220;
    margin-top: 8px;
  }
  .mode-or {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    color: #1e2440;
    margin: 8px 0;
  }
  .mode-panel {
    padding: clamp(28px, 4vw, 44px);
  }

  .mode-tag {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    color: #1a8fe3;
    border: 1px solid #1a8fe3;
    padding: 2px 8px;
    border-radius: 2px;
    display: inline-block;
  }
  .mode-heading {
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: #edf0ff;
    margin: 14px 0 10px;
  }
  .mode-body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: #8890bb;
    line-height: 1.75;
    margin: 0;
  }
  .mode-features {
    list-style: none;
    padding: 0;
    margin: 20px 0 0 0;
  }
  .mode-features li {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    color: #424870;
    line-height: 2.2;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .mf-arrow {
    color: #1a8fe3;
    margin-right: 8px;
  }
  .mode-note {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #424870;
    font-style: italic;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #0f1220;
    line-height: 1.6;
  }
  .mode-cta {
    display: inline-block;
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #1a8fe3;
    margin-top: 20px;
    text-decoration: none;
    text-transform: uppercase;
  }
  .mode-cta:hover {
    text-decoration: underline;
  }

  /* ── 3. MODULES ── */
  .selfos-modules {
    background: #020408;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .modules-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #0f1220;
    margin-top: 48px;
  }
  @media (max-width: 900px) {
    .modules-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .modules-grid {
      grid-template-columns: 1fr;
    }
  }

  .module-card {
    background: #020408;
    padding: 28px 26px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    overflow: hidden;
    transition: background 0.2s ease;
  }
  .module-card:hover {
    background: #07090f;
  }
  .module-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #1a8fe3;
    transition: width 0.45s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .module-card:hover::before {
    width: 100%;
  }

  .module-icon {
    width: 28px;
    height: 28px;
    margin-bottom: 4px;
  }
  .module-num {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    color: #1e2440;
  }
  .module-name {
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #edf0ff;
    margin: 0;
  }
  .module-desc {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 13px;
    line-height: 1.65;
    color: #8890bb;
    flex: 1;
    margin: 0;
  }
  .module-status {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 4px;
  }
  .module-status.live {
    color: #18c96a;
  }
  .module-status.alpha {
    color: #1a8fe3;
  }

  .modules-note {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #424870;
    text-align: center;
    margin-top: 28px;
  }

  .dashboard-callout {
    margin-top: 48px;
    background: #07090f;
    border-left: 2px solid #1a8fe3;
    padding: 28px 32px;
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0 32px;
    align-items: start;
  }
  @media (max-width: 640px) {
    .dashboard-callout {
      grid-template-columns: 1fr;
      gap: 14px 0;
    }
  }
  .dashboard-callout-label {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1a8fe3;
    padding-top: 4px;
  }
  .dashboard-callout-heading {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700;
    font-size: clamp(20px, 2.4vw, 28px);
    color: #edf0ff;
    margin: 0 0 10px 0;
  }
  .dashboard-callout-body {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.75;
    color: #8890bb;
    margin: 0;
    max-width: 600px;
  }

  /* ── 4. MANIFESTO ── */
  .selfos-manifesto {
    background: #07090f;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .selfos-manifesto__heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(32px, 4.5vw, 52px);
    text-align: center;
    line-height: 0.95;
    color: #edf0ff;
    margin: 0;
  }
  .selfos-manifesto__heading.center {
    text-align: center;
  }
  .selfos-manifesto__rule {
    width: 40px;
    height: 2px;
    background: #1a8fe3;
    margin: 24px auto 32px;
  }
  .selfos-manifesto__body {
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-weight: 300;
    font-size: clamp(17px, 2vw, 22px);
    text-align: center;
    line-height: 1.85;
    color: #edf0ff;
    margin: 0 0 24px 0;
  }
  .selfos-manifesto__body:last-of-type {
    margin-bottom: 0;
  }

  .selfos-beliefs {
    display: flex;
    justify-content: center;
    gap: clamp(32px, 5vw, 64px);
    margin-top: 48px;
    flex-wrap: wrap;
  }
  .selfos-belief {
    text-align: center;
  }
  .selfos-belief-rule {
    width: 24px;
    height: 1px;
    background: #1a8fe3;
    margin: 0 auto 10px;
  }
  .selfos-belief-text {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #424870;
  }

  /* ── 5. STATUS ── */
  .selfos-status {
    background: #020408;
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .status-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #0f1220;
    margin-top: 40px;
  }
  @media (max-width: 600px) {
    .status-grid {
      grid-template-columns: 1fr;
    }
  }
  .status-cell {
    background: #020408;
    padding: 28px 30px;
  }
  .status-cell-label {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .status-cell-label.stable {
    color: #18c96a;
  }
  .status-cell-label.progress {
    color: #1a8fe3;
  }
  .status-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .status-list li {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: #8890bb;
    line-height: 2;
    display: flex;
    gap: 12px;
  }
  .sl-icon {
    font-family: monospace;
    font-size: 12px;
  }
  .stable-list .sl-icon {
    color: #18c96a;
  }
  .progress-list .sl-icon {
    color: #1a8fe3;
  }
  .status-note {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: #424870;
    max-width: 560px;
    margin-top: 28px;
    line-height: 1.6;
  }
  .status-note a {
    color: #1a8fe3;
    text-decoration: none;
  }
  .status-note a:hover {
    text-decoration: underline;
  }

  /* ── 6. CLOSING CTA ── */
  .selfos-cta-section {
    background: #0c0e18;
    padding: clamp(80px, 11vw, 144px) 0;
    position: relative;
    overflow: hidden;
  }
  .closing-ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 36px;
    flex-wrap: wrap;
  }
  .closing-cta {
    padding: 20px 28px;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    min-width: 200px;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .closing-cta--primary {
    background: #1a8fe3;
  }
  .closing-cta--primary:hover {
    background: #1478c8;
  }
  .closing-cta--ghost {
    border: 1px solid #1a8fe3;
    background: transparent;
  }
  .closing-cta--ghost:hover {
    background: rgba(26, 143, 227, 0.08);
  }

  .cta-label {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .closing-cta--primary .cta-label {
    color: rgba(2, 4, 8, 0.6);
  }
  .closing-cta--ghost .cta-label {
    color: #424870;
  }

  .cta-action {
    font-family: "DM Mono", monospace;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .closing-cta--primary .cta-action {
    color: #020408;
    font-weight: 600;
  }
  .closing-cta--ghost .cta-action {
    color: #1a8fe3;
    font-weight: 600;
  }

  .cta-sub {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 12px;
  }
  .closing-cta--primary .cta-sub {
    color: rgba(2, 4, 8, 0.55);
  }
  .closing-cta--ghost .cta-sub {
    color: #424870;
  }

  .roadmap-signal {
    font-family: "DM Sans", sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #424870;
    text-align: center;
    margin: 32px auto 0;
    max-width: 400px;
    line-height: 1.6;
  }

  .cta-orbital {
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    width: 280px;
    height: 280px;
    opacity: 0.7;
    pointer-events: none;
  }
  @media (max-width: 1100px) {
    .cta-orbital {
      display: none;
    }
  }
</style>
