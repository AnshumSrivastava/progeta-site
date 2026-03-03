<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  interface Props {
    onComplete?: () => void;
  }
  let { onComplete }: Props = $props();

  let loadingScreen: HTMLElement;
  let lineEl: HTMLElement;
  let subTextEl: HTMLElement;
  let counterEl: HTMLElement;
  
  const LETTERS = ['P', 'R', 'O', 'G', 'E', 'T', 'A'];
  let letterEls: HTMLElement[] = [];
  
  let intervalId: ReturnType<typeof setInterval>;
  let timeouts: ReturnType<typeof setTimeout>[] = [];

  function bindLetter(el: HTMLElement, idx: number) {
    if (el) letterEls[idx] = el;
  }

  onMount(() => {
    if (!browser) return;

    const alreadyLoaded = sessionStorage.getItem('progeta_loaded');

    if (alreadyLoaded) {
      // Skip full sequence — just briefly show the screen then hide it
      timeouts.push(setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.transition = 'opacity 0.3s ease';
          loadingScreen.style.opacity = '0';
          timeouts.push(setTimeout(() => {
            if (loadingScreen) loadingScreen.style.display = 'none';
            onComplete?.();
          }, 300));
        } else {
          onComplete?.();
        }
      }, 500));
      return;
    }

    sessionStorage.setItem('progeta_loaded', 'true');
    runFullSequence();
  });
  
  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    timeouts.forEach(clearTimeout);
  });

  function runFullSequence() {
    // Phase 1: 0ms: Pure black (default)

    // Phase 2: 200ms: Horizon line draws centre-outward
    timeouts.push(setTimeout(() => {
      if (lineEl) lineEl.style.width = '100%';
    }, 200));

    // Phase 3: 900ms: Letters materialise centre-outward
    timeouts.push(setTimeout(() => { if (letterEls[3]) letterEls[3].style.opacity = '1'; }, 900));
    timeouts.push(setTimeout(() => { 
      if (letterEls[2]) letterEls[2].style.opacity = '1'; 
      if (letterEls[4]) letterEls[4].style.opacity = '1'; 
    }, 960));
    timeouts.push(setTimeout(() => { 
      if (letterEls[1]) letterEls[1].style.opacity = '1'; 
      if (letterEls[5]) letterEls[5].style.opacity = '1'; 
    }, 1020));
    timeouts.push(setTimeout(() => { 
      if (letterEls[0]) letterEls[0].style.opacity = '1'; 
      if (letterEls[6]) letterEls[6].style.opacity = '1'; 
    }, 1080));

    // Phase 4: 1300ms: "Technologies" appears
    timeouts.push(setTimeout(() => {
      if (subTextEl) subTextEl.style.opacity = '1';
    }, 1300));

    // Phase 5: 1800ms: Counter runs
    timeouts.push(setTimeout(() => {
      if (counterEl) {
        counterEl.style.opacity = '1';
        let value = 0;
        intervalId = setInterval(() => {
          value += 3;
          if (value >= 100) {
            value = 100;
            clearInterval(intervalId);
          }
          if (counterEl) {
            counterEl.textContent = String(value).padStart(3, '0');
          }
        }, 12);
      }
    }, 1800));

    // Phase 6: Exit sequence
    // Step A (2200ms)
    timeouts.push(setTimeout(() => {
      letterEls.forEach(el => {
        if (el) el.style.opacity = '0';
      });
      if (subTextEl) subTextEl.style.opacity = '0';
    }, 2200));

    // Step B (2300ms)
    timeouts.push(setTimeout(() => {
      if (lineEl) lineEl.style.width = '0%';
    }, 2300));

    // Step C (2600ms)
    timeouts.push(setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.transition = 'opacity 0.3s ease';
        loadingScreen.style.opacity = '0';
      }
    }, 2600));

    // Step D (2900ms)
    timeouts.push(setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
      onComplete?.();
    }, 2900));
  }
</script>

<div class="loading-screen" bind:this={loadingScreen}>
  <!-- Horizon line wrapped for centre-outward contraction -->
  <div class="horizon-wrapper">
    <div class="horizon-line" bind:this={lineEl}></div>
  </div>

  <!-- PROGETA letters -->
  <div class="letters-wrap">
    {#each LETTERS as letter, i}
      <span class="letter" use:bindLetter={i}>{letter}</span>
    {/each}
  </div>

  <!-- Technologies sub-text -->
  <div class="sub-text" bind:this={subTextEl}>Technologies</div>

  <!-- Counter -->
  <div class="counter" bind:this={counterEl}>000</div>
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #020408;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .horizon-wrapper {
    position: absolute;
    top: calc(50% + 52px);
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 1px;
  }

  .horizon-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    width: 0%;
    background-color: #222840;
    transition: width 0.6s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .letters-wrap {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 0;
  }

  .letter {
    opacity: 0;
    transition: opacity 0.3s ease;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(56px, 8vw, 96px);
    letter-spacing: -0.04em;
    color: #EDF0FF;
    line-height: 1;
    display: inline-block;
  }

  .sub-text {
    opacity: 0;
    transition: opacity 0.4s ease;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-weight: 300;
    font-size: clamp(16px, 2.2vw, 28px);
    letter-spacing: 0.14em;
    color: #424870;
    text-transform: uppercase;
    position: absolute;
    top: calc(50% + 64px); /* Positioned below the horizon line */
    left: 50%;
    transform: translateX(calc(-50% + 4px)); /* offset by letter-spacing to center visually */
  }

  .counter {
    opacity: 0;
    position: absolute;
    bottom: 44px;
    right: 52px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #424870;
  }
</style>
