<script lang="ts">
  import { onMount } from 'svelte';
  
  export let title = "Being built.";
  export let message = "This section is currently in production. Access will be granted upon completion.";
</script>

<div class="coming-soon">
  <div class="coming-soon__inner">
    <span class="coming-soon__label">SYSTEM STATUS</span>
    <h1 class="coming-soon__title">{title}</h1>
    <p class="coming-soon__text">{message}</p>
    <a href="/" class="coming-soon__back">Return to Index <span class="arrow">→</span></a>
  </div>
</div>

<style>
  .coming-soon {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-8);
  }

  .coming-soon__inner {
    text-align: center;
    max-width: 480px;
  }

  .coming-soon__label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    color: var(--ink-4);
    margin-bottom: var(--sp-5);
    display: block;
  }

  .coming-soon__title {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 48px);
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
  }

  .coming-soon__text {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-3);
    line-height: 1.6;
    margin-bottom: var(--sp-8);
  }

  .coming-soon__back {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--ink-1);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
  }

  .coming-soon__back .arrow {
    transition: transform 0.3s ease;
  }

  .coming-soon__back:hover .arrow {
    transform: translateX(4px);
  }
</style>
