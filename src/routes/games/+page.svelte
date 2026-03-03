<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>Games — Progeta Technologies</title>
  <meta name="description" content="Free games built to teach real technical skills through experience. Part of the LaunchPad initiative." />
</svelte:head>

<section class="hero">
  <div class="container">
    <ScrollReveal>
      <Tag label="GAMES · LAUNCHPAD INITIATIVE" variant="active" />
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1>Learn by playing.</h1>
    </ScrollReveal>
    <ScrollReveal delay={350}>
      <p class="hero__body">
        Games built to teach real technical skills through experience,
        not instruction. All free. All open. Part of the LaunchPad initiative.
      </p>
    </ScrollReveal>
  </div>
</section>

<section class="games section">
  <div class="container">
    <div class="games__grid">
      <ScrollReveal>
        <a href="/games" class="game game--live">
          <span class="game__status">
            <span class="game__dot"></span>
            PLAYABLE
          </span>
          <h3 class="game__name">CMD Hero</h3>
          <p class="game__desc">
            Master the Linux terminal through interactive puzzles.
            Learn commands by using them. No installations.
          </p>
          <div class="game__tags">
            <Tag label="LINUX" variant="category" />
            <Tag label="PUZZLE" variant="category" />
            <Tag label="BEGINNER" variant="category" />
          </div>
          <span class="game__play">Play now →</span>
        </a>
      </ScrollReveal>

      {#each [
        { name: 'SOC Simulator', desc: 'Step into a Security Operations Centre. Triage alerts, investigate incidents, and make decisions under pressure.', tags: ['SECURITY', 'SIMULATION', 'INTERMEDIATE'] },
        { name: 'Phishing Detector', desc: 'Can you spot the phishing email? Test your awareness against increasingly sophisticated attacks.', tags: ['SECURITY', 'AWARENESS', 'BEGINNER'] },
        { name: 'GRC Scenario', desc: 'Navigate governance, risk, and compliance scenarios. Make decisions that impact an entire organisation.', tags: ['GRC', 'STRATEGY', 'ADVANCED'] },
      ] as game, i}
        <ScrollReveal delay={(i + 1) * 150}>
          <div class="game game--coming">
            <span class="game__status game__status--soon">COMING SOON</span>
            <h3 class="game__name">{game.name}</h3>
            <p class="game__desc">{game.desc}</p>
            <div class="game__tags">
              {#each game.tags as tag}
                <Tag label={tag} variant="category" />
              {/each}
            </div>
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
  .games__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-7);
  }
  .game {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    padding: var(--sp-7);
    border: 1px solid var(--border-1);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s;
  }
  .game--live:hover { border-color: var(--accent-red); }
  .game--coming { opacity: 0.5; }
  .game__status {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--accent-red);
    letter-spacing: var(--tracking-widest);
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }
  .game__status--soon { color: var(--ink-4); }
  .game__dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--accent-red);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .game__name {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--text-lg);
  }
  .game__desc {
    font-weight: 300;
    line-height: var(--leading-normal);
  }
  .game__tags { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
  .game__play {
    font-size: var(--text-sm);
    color: var(--ink-2);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    margin-top: var(--sp-2);
  }

  @media (max-width: 768px) {
    .games__grid { grid-template-columns: 1fr; }
  }
</style>
