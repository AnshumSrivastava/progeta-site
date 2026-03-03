<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { careerTracks } from '$lib/content/jobs';
</script>

<svelte:head>
  <title>Tracks — Progeta Technologies</title>
  <meta name="description" content="Explore LaunchPad tracks — structured learning paths in cybersecurity, cloud, full-stack, and more." />
</svelte:head>

<section class="hero">
  <div class="container">
    <ScrollReveal>
      <Tag label="TRACKS · LAUNCHPAD" variant="active" />
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1>Pick your track.</h1>
    </ScrollReveal>
    <ScrollReveal delay={350}>
      <p class="hero__body">
        Structured learning paths designed in collaboration with industry.
        Each track builds towards real capability, not just knowledge.
      </p>
    </ScrollReveal>
  </div>
</section>

<section class="tracks section">
  <div class="container">
    <div class="tracks__grid">
      {#each careerTracks as track, i (track.id)}
        <ScrollReveal delay={i * 100}>
          <div class="track">
            <div class="track__header">
              <span class="track__num">T-0{track.id}</span>
              <div class="track__meta">
                <span class="track__meta-item">6 Months</span>
                <span class="track__meta-item">Professional</span>
              </div>
            </div>
            <h3 class="track__name">{track.title}</h3>
            <p class="track__desc">{track.description}</p>
            <div class="track__skills">
              {#each track.skills as skill}
                <span class="track__skill">{skill}</span>
              {/each}
            </div>
            <Button variant="text" href="/tracks/{track.id}">View Track Detail <span class="arrow">→</span></Button>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 50dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
  }
  .hero__body { max-width: 520px; }
  .tracks__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-8);
  }
  .track {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    padding-bottom: var(--sp-7);
    border-bottom: 1px solid var(--border-1);
  }
  .track__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .track__num {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
  }
  .track__meta {
    display: flex;
    gap: var(--sp-4);
  }
  .track__meta-item {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
    letter-spacing: var(--tracking-widest);
  }
  .track__name {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--text-md);
  }
  .track__desc {
    font-weight: 300;
    line-height: var(--leading-normal);
  }
  .track__skills {
    display: flex;
    gap: var(--sp-3);
    flex-wrap: wrap;
  }
  .track__skill {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-3);
    padding: 2px 8px;
    border: 1px solid var(--border-1);
  }

  @media (max-width: 768px) {
    .tracks__grid { grid-template-columns: 1fr; }
  }
</style>
