<script lang="ts">
  import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
  import Tag from "$lib/components/ui/Tag.svelte";
  import Button from "$lib/components/ui/Button.svelte";
</script>

<svelte:head>
  <title>Simulations — Progeta Technologies</title>
  <meta
    name="description"
    content="Free simulations built to teach real technical skills through experience. Part of the LaunchPad initiative."
  />
</svelte:head>

<section class="hero">
  <div class="container">
    <ScrollReveal>
      <Tag label="SIMULATIONS · LAUNCHPAD INITIATIVE" variant="active" />
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <h1>Learn through simulation.</h1>
    </ScrollReveal>
    <ScrollReveal delay={350}>
      <p class="hero__body">
        Simulations built to teach real technical skills through experience, not
        instruction. All free. All open. Part of the LaunchPad initiative.
      </p>
    </ScrollReveal>
  </div>
</section>

<section class="simulations section">
  <div class="container">
    <div class="simulations__grid">
      <ScrollReveal>
        <a href="/simulations/cmd_hero" class="simulation simulation--live">
          <span class="simulation__status">
            <span class="simulation__dot"></span>
            ACTIVE SCENARIO
          </span>
          <h3 class="simulation__name">CMD Hero</h3>
          <p class="simulation__desc">
            Master the Linux terminal through interactive scenarios. Learn
            commands by using them. No installations.
          </p>
          <div class="simulation__tags">
            <Tag label="LINUX" variant="category" />
            <Tag label="SCENARIO" variant="category" />
            <Tag label="BEGINNER" variant="category" />
          </div>
          <span class="simulation__play">Launch Scenario →</span>
        </a>
      </ScrollReveal>

      {#each [{ name: "SOC Simulator", desc: "Step into a Security Operations Centre. Triage alerts, investigate incidents, and make decisions under pressure.", tags: ["SECURITY", "SIMULATION", "INTERMEDIATE"] }, { name: "Phishing Detector", desc: "Can you spot the phishing email? Test your awareness against increasingly sophisticated attacks.", tags: ["SECURITY", "AWARENESS", "BEGINNER"] }, { name: "GRC Scenario", desc: "Navigate governance, risk, and compliance scenarios. Make decisions that impact an entire organisation.", tags: ["GRC", "STRATEGY", "ADVANCED"] }] as sim, i}
        <ScrollReveal delay={(i + 1) * 150}>
          <div class="simulation simulation--coming">
            <span class="simulation__status simulation__status--soon"
              >COMING SOON</span
            >
            <h3 class="simulation__name">{sim.name}</h3>
            <p class="simulation__desc">{sim.desc}</p>
            <div class="simulation__tags">
              {#each sim.tags as tag}
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
  .hero__body {
    max-width: 520px;
  }
  .simulations__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-7);
  }
  .simulation {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    padding: var(--sp-7);
    border: 1px solid var(--border-1);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s;
  }
  .simulation--live:hover {
    border-color: var(--accent-red);
  }
  .simulation--coming {
    opacity: 0.5;
  }
  .simulation__status {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--accent-red);
    letter-spacing: var(--tracking-widest);
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }
  .simulation__status--soon {
    color: var(--ink-4);
  }
  .simulation__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent-red);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
  .simulation__name {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--text-lg);
  }
  .simulation__desc {
    font-weight: 400;
    line-height: var(--leading-normal);
  }
  .simulation__tags {
    display: flex;
    gap: var(--sp-3);
    flex-wrap: wrap;
  }
  .simulation__play {
    font-size: var(--text-sm);
    color: var(--ink-2);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    margin-top: var(--sp-2);
  }

  @media (max-width: 768px) {
    .simulations__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
