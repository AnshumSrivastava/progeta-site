<script lang="ts">
  import "../app.css";
  import SiteNav from "$lib/components/site/SiteNav.svelte";
  import SiteFooter from "$lib/components/site/SiteFooter.svelte";
  import LoadingScreen from "$lib/components/site/LoadingScreen.svelte";
  import CursorGlow from "$lib/components/site/CursorGlow.svelte";
  import Universe from "$lib/components/animations/Universe.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { page } from "$app/stores";

  let { children } = $props();

  const siteTitle = "Progeta Technologies | Engineering & Security";
  const siteDesc =
    "Technical education, digital sovereignty operations, and immersive tactical engineering simulations.";
  const siteUrl = "https://progeta.tech";
  let canonicalUrl = $derived(`${siteUrl}${$page.url.pathname}`);

  let loading = $state(true);
  let contentVisible = $state(false);
  let transitioning = $state(false);

  // Check if we're inside the SelfOS app (which has its own layout)
  let isSelfOSApp = $derived($page.url.pathname.startsWith("/selfos/app"));

  function handleLoadComplete() {
    loading = false;
    // Small delay before showing content — the breath after the loading screen
    setTimeout(() => {
      contentVisible = true;
    }, 50);
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
  <title>{siteTitle}</title>
  <meta name="description" content={siteDesc} />

  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={siteDesc} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Progeta Technologies" />
  <meta property="og:image" content="{siteUrl}/og-image.jpg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={siteTitle} />
  <meta name="twitter:description" content={siteDesc} />

  {@html `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Progeta Technologies",
      "url": "https://progeta.tech",
      "logo": "https://progeta.tech/favicon.png",
      "sameAs": [
        "https://linkedin.com/company/progeta",
        "https://instagram.com/progeta.tech",
        "https://github.com/progeta"
      ],
      "description": "True technical education and digital sovereignty operations."
    }
    </script>
  `}
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
    transform: none;
  }

  .page-content--exiting {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 180ms var(--ease-exit, cubic-bezier(0.4, 0, 1, 1)),
      transform 180ms var(--ease-exit, cubic-bezier(0.4, 0, 1, 1));
  }
</style>
