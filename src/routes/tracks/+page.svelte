<script>
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import { tracksMeta, getLevelLabel } from "$lib/content/launchpad-data";

  let activeFilter = "all";

  $: filtered =
    activeFilter === "all"
      ? tracksMeta
      : tracksMeta.filter((t) => t.level === activeFilter);

  function setFilter(f) {
    activeFilter = f;
  }
</script>

<svelte:head>
  <title>Operational Tracks | LaunchPad — Progeta Technologies</title>
  <meta
    name="description"
    content="Six specialised certification tracks in cybersecurity: CTI, SOC, DevSecOps, GRC, Pentesting, Security Automation."
  />
</svelte:head>

<!-- ═══ HERO ═══ -->
<section class="trk-hero">
  <div class="container">
    <ScrollReveal>
      <span class="eyebrow">TRACKS · LAUNCHPAD</span>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <h1 class="trk-hero__heading">Six paths.<br />One direction.</h1>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <p class="trk-hero__body">
        Six specialised certification tracks built around real cybersecurity
        roles. Each is six months. Each ends with a verifiable credential.
        Choose by role, not by reputation.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={300}>
      <div class="filter-bar">
        {#each [{ key: "all", label: "ALL" }, { key: "entry", label: "ENTRY LEVEL" }, { key: "mid", label: "MID LEVEL" }, { key: "specialised", label: "SPECIALISED" }] as btn}
          <button
            class="filter-btn"
            class:active={activeFilter === btn.key}
            on:click={() => setFilter(btn.key)}>{btn.label}</button
          >
        {/each}
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ═══ TRACK LIST ═══ -->
<section class="trk-list">
  <div class="container--wide">
    {#each filtered as track, i (track.id)}
      <ScrollReveal delay={i * 60}>
        <a href="/tracks/{track.id}" class="track-row">
          <div class="track-row__left">
            <span class="track-num">{track.num}</span>
            <span
              class="track-status"
              class:track-status--enrolling={track.status === "enrolling"}
              class:track-status--soon={track.status === "coming-soon"}
            >
              {track.status === "enrolling" ? "● ENROLLING" : "○ COMING SOON"}
            </span>
            <span class="track-level">{getLevelLabel(track.level)}</span>
          </div>
          <div class="track-row__body">
            <h3 class="track-title">
              {@html track.id === 1
                ? "Cyber Threat Intelligence (CTI) Specialist"
                : track.id === 2
                  ? "SOC Operations & Incident Response"
                  : track.id === 3
                    ? "DevSecOps & Cloud Security"
                    : track.id === 4
                      ? "Enterprise GRC & Security Auditing"
                      : track.id === 5
                        ? "Advanced Penetration Testing & Red Teaming"
                        : "Security Automation & Tool Development"}
            </h3>
            <p class="track-tagline">"{track.tagline}"</p>
            <p class="track-desc">{track.description}</p>
            <div class="track-tags">
              {#each track.tags as tag}
                <span class="track-tag">{tag}</span>
              {/each}
            </div>
          </div>
          <div class="track-row__cta">
            <span class="track-arrow">→</span>
          </div>
        </a>
      </ScrollReveal>
    {/each}
  </div>
</section>

<!-- ═══ NOT SURE ═══ -->
<section class="trk-notsure">
  <div class="container">
    <ScrollReveal>
      <h2 class="section-heading">Which track fits you?</h2>
      <p class="section-body">
        Answer two questions: what stage are you at right now (beginner / some
        experience / coding background), and what kind of work sounds
        interesting (intelligence / defence / attack / compliance / building).
        We will tell you which track makes the most sense.
      </p>
      <a
        href="mailto:operations@progeta.tech?subject=Track Recommendation"
        class="notsure-cta">Get a recommendation →</a
      >
    </ScrollReveal>
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
  .eyebrow {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: block;
    margin-bottom: 16px;
  }
  .section-heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(28px, 3.5vw, 40px);
    color: #edf0ff;
    margin-bottom: 14px;
  }
  .section-body {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: var(--ink-2);
    line-height: 1.75;
    max-width: 560px;
  }

  /* ── HERO ── */
  .trk-hero {
    min-height: 52vh;
    display: flex;
    align-items: flex-end;
    background: #020408;
    padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
  }
  .trk-hero__heading {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
    font-size: clamp(44px, 6.5vw, 72px);
    line-height: 0.93;
    color: #edf0ff;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
  }
  .trk-hero__body {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: var(--ink-2);
    max-width: 480px;
    line-height: 1.75;
    margin-bottom: 32px;
  }

  .filter-bar {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .filter-btn {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 8px 16px;
    border: 1px solid #171b30;
    border-radius: 3px;
    background: transparent;
    color: var(--ink-3);
    cursor: pointer;
    transition: all 0.18s;
  }
  .filter-btn:hover {
    border-color: #e05c20;
    color: #edf0ff;
  }
  .filter-btn.active {
    border-color: #e05c20;
    color: #edf0ff;
    background: rgba(224, 92, 32, 0.08);
  }

  /* ── TRACK LIST ── */
  .trk-list {
    background: #020408;
    padding: clamp(40px, 5vw, 64px) 0 clamp(80px, 11vw, 144px);
  }

  .track-row {
    display: grid;
    grid-template-columns: 160px 1fr 48px;
    gap: 0 32px;
    padding: 32px 0;
    border-top: 1px solid #0f1220;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
    align-items: start;
  }
  .track-row:last-child {
    border-bottom: 1px solid #0f1220;
  }
  .track-row::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #e05c20;
    transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .track-row:hover::before {
    width: 100%;
  }
  .track-row:hover {
    background: rgba(7, 9, 15, 0.4);
  }

  .track-row__left {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .track-num {
    font-family: "DM Mono", monospace;
    font-size: 18px;
    font-weight: 700;
    color: #1e2440;
  }
  .track-status {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
  }
  .track-status--enrolling {
    color: #18c96a;
  }
  .track-status--soon {
    color: var(--ink-3);
  }
  .track-level {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    color: var(--ink-3);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .track-title {
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #edf0ff;
    margin-bottom: 6px;
  }
  .track-tagline {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-style: italic;
    font-size: 14px;
    color: #e05c20;
    margin-bottom: 10px;
  }
  .track-desc {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--ink-2);
    line-height: 1.7;
    margin-bottom: 14px;
  }
  .track-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .track-tag {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border: 1px solid #171b30;
    border-radius: 3px;
    color: var(--ink-3);
  }

  .track-row__cta {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .track-arrow {
    font-size: 20px;
    color: var(--ink-3);
    transition:
      color 0.2s,
      transform 0.2s;
  }
  .track-row:hover .track-arrow {
    color: #e05c20;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .track-row {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .track-row__left {
      flex-direction: row;
      gap: 12px;
      align-items: center;
    }
    .track-row__cta {
      display: none;
    }
  }

  /* ── NOT SURE ── */
  .trk-notsure {
    background: var(--ground);
    padding: clamp(80px, 11vw, 144px) 0;
  }
  .notsure-cta {
    font-family: "DM Mono", monospace;
    font-size: 11px;
    color: #e05c20;
    text-decoration: none;
    display: inline-block;
    margin-top: 28px;
    letter-spacing: 0.1em;
  }
  .notsure-cta:hover {
    text-decoration: underline;
  }
</style>
