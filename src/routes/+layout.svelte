<script lang="ts">
  import '../app.css';
  import SiteNav from '$lib/components/site/SiteNav.svelte';
  import SiteFooter from '$lib/components/site/SiteFooter.svelte';
  import LoadingScreen from '$lib/components/site/LoadingScreen.svelte';
  import CursorGlow from '$lib/components/site/CursorGlow.svelte';
  import Universe from '$lib/components/animations/Universe.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  let { children } = $props();

  let loading = $state(true);
  let contentVisible = $state(false);
  let transitioning = $state(false);

  // Check if we're inside the SelfOS app (which has its own layout)
  let isSelfOSApp = $derived($page.url.pathname.startsWith('/selfos/app'));

  function handleLoadComplete() {
    loading = false;
    // Small delay before showing content — the breath after the loading screen
    setTimeout(() => { contentVisible = true; }, 50);
  }

  // Page transitions: out-then-in
  beforeNavigate(() => {
    if (!loading) {
      transitioning = true;
    }
  });

  afterNavigate(() => {
    window.scrollTo(0, 0);
    // After nav-out animation (180ms) + gap (50ms), trigger nav-in
    if (transitioning) {
      setTimeout(() => {
        transitioning = false;
      }, 50); // Gap between out and in
    }
  });
</script>

<svelte:head>
  <title>Progeta Technologies</title>
</svelte:head>

{#if loading}
  <LoadingScreen onComplete={handleLoadComplete} />
{/if}

<CursorGlow />
<Universe />

{#if !isSelfOSApp}
  <SiteNav />
{/if}

<main
  class="page-content"
  class:page-content--visible={contentVisible && !transitioning}
  class:page-content--exiting={transitioning}
>
  {@render children?.()}
</main>

{#if !isSelfOSApp}
  <SiteFooter />
{/if}

<style>
  .page-content {
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 280ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      transform 280ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
    min-height: 100vh;
  }

  .page-content--visible {
    opacity: 1;
    transform: translateY(0);
  }

  .page-content--exiting {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 180ms var(--ease-exit, cubic-bezier(0.4, 0, 1, 1)),
      transform 180ms var(--ease-exit, cubic-bezier(0.4, 0, 1, 1));
  }
</style>
