<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import ParticleField from '$lib/components/animations/ParticleField.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';

  let name = $state('');
  let email = $state('');
  let building = $state('');
  let videoLink = $state('');
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    // In production, this would submit to Supabase or an API
    submitted = true;
  }
</script>

<svelte:head>
  <title>InnerCircle — Progeta Technologies</title>
  <meta name="description" content="A vetted network for people who are building something real and want to be surrounded by others doing the same." />
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="hero__particles">
    <ParticleField count={45} connectionDistance={90} maxConnectionOpacity={0.3} interactive={false} />
  </div>
  <div class="hero__content container">
    <div class="hero__text-wrap">
      <ScrollReveal>
        <Tag label="INNERCIRCLE · COMMUNITY" variant="active" />
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <h1 class="hero__headline">
          Some communities<br/>let anyone in.
        </h1>
      </ScrollReveal>
      <div class="hero__gap"></div>
      <ScrollReveal delay={800}>
        <span class="hero__punchline">We don't.</span>
      </ScrollReveal>
      <ScrollReveal delay={1000}>
        <p class="hero__body">
          InnerCircle is a vetted network of people who are building
          something real — and held to it.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={1100}>
        <Button variant="primary" href="#apply" accent="var(--accent-green)">Apply Now</Button>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- HOW YOU GET IN -->
<section class="steps section">
  <div class="container">
    <ScrollReveal>
      <Tag label="HOW YOU GET IN" variant="category" />
    </ScrollReveal>

    <div class="steps__list">
      {#each [
        { num: '1', title: 'Apply', body: 'Tell us who you are and what you are building. We read every application. A short video is not required, but it helps us understand you faster than text.' },
        { num: '2', title: 'Review', body: 'Applications are reviewed by the founding team. We are not looking for credentials or followers. We are looking for direction, honesty, and action.' },
        { num: '3', title: 'Enter', body: 'If accepted, you receive access to the InnerCircle space, events, and network. Membership is not permanent — it is held by continued engagement.' },
      ] as step, i}
        <div class="step" class:step--alt={i % 2 !== 0}>
          <ScrollReveal delay={i * 150}>
            <div class="step__circle">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="var(--accent-green)" stroke-width="1" opacity="0.5"/>
              </svg>
              <span class="step__num">{step.num}</span>
            </div>
            <div class="step__content">
              <h3 class="step__title">{step.title}</h3>
              <p class="step__body">{step.body}</p>
            </div>
          </ScrollReveal>
        </div>
        {#if i < 2}
          <div class="step__connector"></div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<!-- WHAT MEMBERS GET -->
<section class="benefits section">
  <div class="container--text">
    <ScrollReveal>
      <h2 class="benefits__heading">What members carry.</h2>
    </ScrollReveal>
    {#each [
      'Access to a private community of builders who hold each other accountable.',
      'Priority invitations to Progeta Technologies events, workshops, and launches.',
      'Direct access to the founding team for feedback, advice, and collaboration.',
      'The knowledge that you earned your place, and the responsibility that comes with it.',
    ] as benefit, i}
      <ScrollReveal delay={i * 150}>
        <p class="benefits__item">{benefit}</p>
      </ScrollReveal>
    {/each}
  </div>
</section>

<!-- APPLICATION FORM -->
<section class="apply section" id="apply">
  <div class="container--text">
    <ScrollReveal>
      <h2 class="apply__heading">Apply to InnerCircle</h2>
    </ScrollReveal>

    {#if submitted}
      <ScrollReveal>
        <div class="apply__success">
          <p>Your application has been received. We respond to every application within 72 hours.</p>
        </div>
      </ScrollReveal>
    {:else}
      <form onsubmit={handleSubmit}>
        <ScrollReveal delay={100}>
          <Input label="Name" name="name" bind:value={name} required accent="var(--accent-green)" />
        </ScrollReveal>
        <ScrollReveal delay={180}>
          <Input label="Email" name="email" type="email" bind:value={email} required accent="var(--accent-green)" />
        </ScrollReveal>
        <ScrollReveal delay={260}>
          <Input label="What are you building?" name="building" type="textarea" bind:value={building} required rows={4} accent="var(--accent-green)" />
        </ScrollReveal>
        <ScrollReveal delay={340}>
          <Input label="Video link (optional)" name="video" type="url" bind:value={videoLink} accent="var(--accent-green)" />
          <span class="apply__note">Or send to operations@progeta.tech — Subject: InnerCircle</span>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <Button variant="primary" type="submit" accent="var(--accent-green)">Apply to InnerCircle</Button>
          <span class="apply__response">We respond to every application within 72 hours.</span>
        </ScrollReveal>
      </form>
    {/if}
  </div>
</section>

<style>
  .hero {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 72px;
  }
  .hero__particles {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero__content {
    position: relative;
    z-index: 2;
  }
  .hero__text-wrap {
    max-width: 600px;
    background: rgba(8, 8, 8, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: var(--sp-7);
  }
  .hero__headline {
    margin-top: var(--sp-5);
  }
  .hero__gap {
    height: var(--sp-7);
  }
  .hero__punchline {
    display: block;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-2xl);
    color: var(--accent-green);
    line-height: var(--leading-tight);
    margin-bottom: var(--sp-5);
  }
  .hero__body {
    margin-bottom: var(--sp-7);
  }

  /* STEPS */
  .steps__list {
    margin-top: var(--sp-8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .step {
    display: flex;
    gap: var(--sp-7);
    align-items: flex-start;
    padding: var(--sp-7) 0;
  }
  .step--alt {
    background: var(--surface-1);
    margin-inline: calc(-1 * var(--sp-8));
    padding-inline: var(--sp-8);
    width: calc(100% + var(--sp-8) * 2);
  }
  .step__circle {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .step__circle svg {
    position: absolute;
    inset: 0;
  }
  .step__num {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-md);
    color: var(--ink-1);
    z-index: 1;
  }
  .step__connector {
    width: 1px;
    height: 40px;
    background: var(--accent-green);
    opacity: 0.3;
    margin-left: 24px;
  }
  .step__title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-xl);
    margin-bottom: var(--sp-4);
  }
  .step__body {
    line-height: var(--leading-relaxed);
    max-width: 560px;
  }

  /* BENEFITS */
  .benefits {
    text-align: center;
  }
  .benefits__heading {
    margin-bottom: var(--sp-8);
  }
  .benefits__item {
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-md);
    color: var(--ink-1);
    max-width: 500px;
    margin: 0 auto var(--sp-7);
    line-height: var(--leading-normal);
  }

  /* APPLY */
  .apply__heading {
    margin-bottom: var(--sp-7);
  }
  .apply__note {
    display: block;
    font-size: var(--text-xs);
    color: var(--ink-4);
    margin-top: calc(-1 * var(--sp-3));
    margin-bottom: var(--sp-5);
  }
  .apply__response {
    display: block;
    margin-top: var(--sp-5);
    font-size: var(--text-sm);
    color: var(--ink-3);
  }
  .apply__success {
    padding: var(--sp-7);
    border: 1px solid var(--accent-green);
    text-align: center;
  }
  .apply__success p {
    color: var(--ink-1);
    max-width: none;
  }

  @media (max-width: 1024px) {
    .step--alt {
      margin-inline: calc(-1 * var(--sp-5));
      padding-inline: var(--sp-5);
      width: calc(100% + var(--sp-5) * 2);
    }
  }
</style>
