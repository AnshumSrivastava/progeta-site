<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
</script>

<svelte:head>
  <title>About — Progeta Technologies</title>
  <meta name="description" content="Progeta Technologies exists to help people realise and achieve their dreams and goals." />
</svelte:head>

<section class="hero">
  <div class="container">
    <ScrollReveal>
      <Tag label="ABOUT PROGETA TECHNOLOGIES" variant="active" />
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1 class="hero__headline">
        A company with<br/>one mission.
      </h1>
    </ScrollReveal>
    <ScrollReveal delay={400}>
      <p class="hero__body">
        Progeta Technologies exists to help people realise and achieve their
        dreams and goals. That is not a tagline. It is the reason the company
        was founded, and the filter through which every decision is made.
      </p>
    </ScrollReveal>
  </div>
</section>

<section class="story section">
  <div class="container--text">
    <ScrollReveal>
      <h2>The Origin</h2>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <p>
        Progeta Technologies was founded in 2024 with a simple observation:
        the gap between where people are and where they could be is not about
        talent. It is about access, environment, and systems.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <p class="story__p">
        The people who build extraordinary lives are not necessarily more gifted.
        They had access to the right knowledge, the right community, and the right
        tools at the right time. Progeta Technologies is being built to provide
        exactly that — for everyone.
      </p>
    </ScrollReveal>
  </div>
</section>

<section class="how section">
  <div class="container">
    <ScrollReveal>
      <Tag label="HOW WE SHOW UP" variant="category" />
      <h2 class="how__heading">Three initiatives. One mission.</h2>
    </ScrollReveal>

    <div class="how__grid">
      {#each [
        { name: 'LaunchPad', tag: 'Education', body: 'Campus programmes, certifications, and tracks that close the gap between education and industry readiness.', accent: 'var(--accent-red)', href: '/launchpad' },
        { name: 'SelfOS', tag: 'Product', body: 'A personal operating system for people who want to run their life with intention — locally or in the cloud.', accent: 'var(--accent-blue)', href: '/selfos' },
        { name: 'InnerCircle', tag: 'Community', body: 'A vetted network of people building something real — held to the standard of action and accountability.', accent: 'var(--accent-green)', href: '/innercircle' },
      ] as init, i}
        <ScrollReveal delay={i * 150}>
          <a href={init.href} class="how__item">
            <span class="how__bar" style="background: {init.accent}"></span>
            <span class="how__tag">{init.tag}</span>
            <h3 class="how__name">{init.name}</h3>
            <p class="how__body">{init.body}</p>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<section class="values section">
  <div class="container--text">
    <ScrollReveal>
      <h2 class="values__heading">What we believe</h2>
    </ScrollReveal>
    {#each [
      'Every person carries something worth building.',
      'Access to growth should never be conditional.',
      'Safe environments are not optional — they are foundational.',
      'Individual growth without social responsibility is incomplete.',
    ] as value, i}
      <ScrollReveal delay={i * 120}>
        <p class="values__item">{value}</p>
      </ScrollReveal>
    {/each}
  </div>
</section>

<style>
  .hero {
    min-height: 70dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
  }
  .hero__headline {
    margin-top: var(--sp-5);
    margin-bottom: var(--sp-5);
  }
  .hero__body {
    max-width: 560px;
    line-height: var(--leading-relaxed);
  }

  .story p {
    margin-bottom: var(--sp-5);
    line-height: var(--leading-relaxed);
  }

  .how { background: var(--surface-1); }
  .how__heading { margin-top: var(--sp-5); margin-bottom: var(--sp-8); }
  .how__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-7);
  }
  .how__item {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    text-decoration: none;
    color: inherit;
  }
  .how__bar {
    width: 3px;
    height: 32px;
    margin-bottom: var(--sp-2);
  }
  .how__tag {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }
  .how__name {
    font-size: var(--text-lg);
  }
  .how__body {
    font-weight: 300;
    line-height: var(--leading-normal);
  }

  .values { text-align: center; }
  .values__heading { margin-bottom: var(--sp-8); }
  .values__item {
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-md);
    color: var(--ink-1);
    max-width: none;
    margin: 0 auto var(--sp-6);
    line-height: var(--leading-normal);
  }

  @media (max-width: 768px) {
    .how__grid { grid-template-columns: 1fr; }
  }
</style>
