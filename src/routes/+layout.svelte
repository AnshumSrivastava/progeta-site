<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/ui/components/Navbar.svelte';
  import Footer from '$lib/ui/components/Footer.svelte';
  import PageLoader from '$lib/ui/components/PageLoader.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation'; // Import afterNavigate

  // Mouse tracking for spotlight effect in cinematic mode
  function handleMouseMove(e: MouseEvent) {
      const cards = document.querySelectorAll('.bento-card');
      cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
          (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
  }

  onMount(() => {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  // FIX: Force scroll unlock after navigation
  afterNavigate(() => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
  });
</script>

<svelte:head>
    <title>Progeta Technologies</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="app-wrapper">
    <PageLoader />
    <Navbar />

    <main>
        <slot />
    </main>

    <Footer />
</div>

<style>
    main {
        min-height: 100vh;
    }
</style>
