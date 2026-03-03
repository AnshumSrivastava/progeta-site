<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="error-page">
  <div class="error-page__inner">
    <span class="error-page__status">ERROR // {$page.status}</span>
    <h1 class="error-page__title">
      {#if $page.status === 404}
        Signal Lost.
      {:else}
        System Fault.
      {/if}
    </h1>
    <p class="error-page__desc">
      {#if $page.status === 404}
        The requested coordinate does not exist within the current architecture.
      {:else}
        An unexpected structural fault occurred. The environment has been logged.
      {/if}
    </p>
    <a href="/" class="error-page__back">Return to Index <span class="arrow">→</span></a>
  </div>
</div>

<style>
  .error-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-8);
  }

  .error-page__inner {
    text-align: center;
    max-width: 520px;
  }

  .error-page__status {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    color: var(--accent-launchpad);
    margin-bottom: var(--sp-5);
    display: block;
  }

  .error-page__title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
    line-height: 1.1;
  }

  .error-page__desc {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-3);
    line-height: 1.6;
    margin-bottom: var(--sp-8);
    font-style: italic;
  }

  .error-page__back {
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

  .error-page__back .arrow {
    transition: transform 0.3s ease;
  }

  .error-page__back:hover .arrow {
    transform: translateX(4px);
  }
</style>
