<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import Button from "$lib/components/ui/Button.svelte";
</script>

<svelte:head>
  <title>Registration Confirmed | Progeta Technologies</title>
  <meta name="description" content="You are successfully registered for Hire Ready." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="success-page">
  <div class="success-inner">
    <!-- Animated checkmark -->
    <ScrollReveal delay={200} distance={20}>
      <div class="success-check">
        <svg class="check-svg" viewBox="0 0 80 80" fill="none">
          <circle class="check-circle" cx="40" cy="40" r="36" stroke-width="3" />
          <path class="check-path" d="M24 42 L34 52 L56 30" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={400} distance={15}>
      <h1 class="success-title">You're in.</h1>
      <p class="success-subtitle">
        You are successfully registered for <strong>Hire Ready</strong>.
      </p>
      <a href="https://chat.whatsapp.com/LJZXPI07EowLMzy5XfpPsY" target="_blank" rel="noopener" class="whatsapp-btn">
        <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Join WhatsApp Group
      </a>
    </ScrollReveal>

    <!-- Event details card -->
    <ScrollReveal delay={600} distance={10}>
      <div class="success-card">
        <span class="success-card__label">EVENT DETAILS</span>
        <div class="success-card__grid">
          <div class="success-detail">
            <span class="success-detail__key">Event</span>
            <span class="success-detail__val">Hire Ready: Leverage AI to Stay Relevant and Get Hired</span>
          </div>
          <div class="success-detail">
            <span class="success-detail__key">Date</span>
            <span class="success-detail__val">12 April 2026</span>
          </div>
          <div class="success-detail">
            <span class="success-detail__key">Time</span>
            <span class="success-detail__val">1 PM Onwards</span>
          </div>
          <div class="success-detail">
            <span class="success-detail__key">Format</span>
            <span class="success-detail__val">Live Session</span>
          </div>
        </div>
      </div>
    </ScrollReveal>

    <!-- Next steps -->
    <ScrollReveal delay={800} distance={10}>
      <div class="success-steps">
        <span class="success-steps__label">NEXT STEPS</span>
        <div class="success-step">
          <span class="success-step__num">01</span>
          <p>Join the <strong>WhatsApp group</strong> — this is your primary channel for all event updates.</p>
        </div>
        <div class="success-step">
          <span class="success-step__num">02</span>
          <p>The same link will also be <strong>shared on your email</strong>.</p>
        </div>
        <div class="success-step">
          <span class="success-step__num">03</span>
          <p>Stay tuned for session details before 12 April.</p>
        </div>
      </div>
    </ScrollReveal>
    <!-- Certificate note -->
    <ScrollReveal delay={1050} distance={10}>
      <div class="success-note">
        <div class="success-note__icon">★</div>
        <p>
          <strong>Attend the full session</strong> to receive your certificate. 
          Partial attendance will not qualify.
        </p>
      </div>
    </ScrollReveal>

    <!-- Return CTA -->
    <ScrollReveal delay={1200} distance={10}>
      <div class="success-cta">
        <Button variant="secondary" href="/">Return to Home</Button>
        <Button variant="ghost" href="/events/hireready">View Event Details</Button>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
  .success-page {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 140px var(--container-pad) 80px;
    text-align: center;
  }

  .success-inner {
    max-width: 620px;
    margin: 0 auto;
  }

  /* ── CHECKMARK ── */
  .success-check {
    display: flex;
    justify-content: center;
    margin-bottom: var(--sp-8);
  }

  .check-svg {
    width: 80px;
    height: 80px;
  }

  .check-circle {
    stroke: var(--accent-launchpad);
    fill: none;
    stroke-dasharray: 226;
    stroke-dashoffset: 226;
    animation: circleIn 0.8s 0.3s ease forwards;
  }

  .check-path {
    stroke: var(--accent-launchpad);
    fill: none;
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: checkIn 0.5s 0.9s ease forwards;
  }

  @keyframes circleIn {
    to { stroke-dashoffset: 0; }
  }

  @keyframes checkIn {
    to { stroke-dashoffset: 0; }
  }

  /* ── TITLE ── */
  .success-title {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 64px);
    font-weight: 700;
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
    letter-spacing: var(--tracking-compressed);
    line-height: 1;
  }

  .success-subtitle {
    font-family: var(--font-body);
    font-size: 18px;
    color: var(--ink-2);
    line-height: 1.6;
    margin-bottom: var(--sp-10);
  }

  .success-subtitle strong {
    color: var(--accent-launchpad);
  }

  /* ── EVENT CARD ── */
  .success-card {
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    padding: var(--sp-8);
    text-align: left;
    margin-bottom: var(--sp-8);
  }

  .success-card__label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-4);
    display: block;
    margin-bottom: var(--sp-6);
    padding-bottom: var(--sp-3);
    border-bottom: 1px solid var(--border-1);
  }

  .success-card__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-5);
  }

  .success-detail {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1);
  }

  .success-detail__key {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-4);
  }

  .success-detail__val {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink-1);
    font-weight: 500;
  }

  /* ── NEXT STEPS ── */
  .success-steps {
    text-align: left;
    margin-bottom: var(--sp-8);
  }

  .success-steps__label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-4);
    display: block;
    margin-bottom: var(--sp-6);
  }

  .success-step {
    display: flex;
    gap: var(--sp-5);
    padding: var(--sp-5) 0;
    border-bottom: 1px solid var(--border-1);
    align-items: flex-start;
  }

  .success-step:last-child {
    border-bottom: none;
  }

  .success-step__num {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent-launchpad);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .success-step p {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink-2);
    line-height: 1.6;
    margin: 0;
  }

  /* ── NOTE ── */
  .success-note {
    background: rgba(211, 84, 0, 0.06);
    border: 1px solid rgba(211, 84, 0, 0.15);
    padding: var(--sp-6);
    display: flex;
    align-items: flex-start;
    gap: var(--sp-4);
    margin-bottom: var(--sp-10);
    text-align: left;
  }

  .success-note__icon {
    color: var(--accent-launchpad);
    font-size: 18px;
    flex-shrink: 0;
    margin-top: -1px;
  }

  .success-note p {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--ink-2);
    line-height: 1.6;
    margin: 0;
  }

  /* ── WHATSAPP BUTTON ── */
  .whatsapp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-3);
    padding: 14px 28px;
    background: #25D366;
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    border-radius: 0;
    transition: all 0.25s ease;
    margin-bottom: var(--sp-8);
  }

  .whatsapp-btn:hover {
    background: #1ebe57;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.25);
  }

  .whatsapp-icon {
    flex-shrink: 0;
  }

  /* ── CTA ── */
  .success-cta {
    display: flex;
    gap: var(--sp-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .success-card__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
