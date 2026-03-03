<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  interface Props {
    onComplete?: () => void;
  }
  let { onComplete }: Props = $props();

  let container: HTMLElement;
  let lineEl: HTMLElement;
  let lettersEl: HTMLElement;
  let subVisible = $state(false);
  let counterVisible = $state(false);
  let counterEl: HTMLElement;
  let overlayEl: HTMLElement;

  const LETTERS = ['P', 'R', 'O', 'G', 'E', 'T', 'A'];
  // Centre-outward reveal order: G(3) -> R(1)+E(4) -> P(0)+T(5) -> O(2)+A(6)
  const REVEAL_GROUPS = [[3], [1, 4], [0, 5], [2, 6]];
  let letterEls: HTMLElement[] = [];

  function bindLetter(el: HTMLElement, idx: number) {
    if (el) letterEls[idx] = el;
  }

  onMount(() => {
    if (!browser) return;

    const isReturn = sessionStorage.getItem('pt_loaded') === '1';

    if (isReturn) {
      // Abbreviated: 500ms black → fade out
      setTimeout(() => {
        if (overlayEl) {
          overlayEl.style.transition = 'opacity 300ms ease-out';
          overlayEl.style.opacity = '0';
        }
        setTimeout(() => onComplete?.(), 350);
      }, 500);
      return;
    }

    sessionStorage.setItem('pt_loaded', '1');
    runFullSequence();
  });

  function runFullSequence() {
    // 0ms: Pure black

    // 200ms: Horizon line draws centre-outward
    setTimeout(() => {
      if (lineEl) lineEl.classList.add('drawing');
    }, 200);

    // 750ms: Letters materialise centre-outward
    let delay = 750;
    for (const group of REVEAL_GROUPS) {
      const d = delay;
      setTimeout(() => {
        for (const idx of group) {
          if (letterEls[idx]) {
            letterEls[idx].style.opacity = '1';
          }
        }
      }, d);
      delay += 150; // ~150ms between pairs
    }

    // 1300ms: "Technologies" fades in
    setTimeout(() => {
      subVisible = true;
    }, 1300);

    // 1700ms: Counter 000 → 100
    setTimeout(() => {
      counterVisible = true;
      animateCounter();
    }, 1700);

    // 2300ms: Exit sequence
    setTimeout(() => {
      // Fade all text
      if (lettersEl) lettersEl.style.opacity = '0';
      subVisible = false;
      counterVisible = false;

      // Contract horizon line
      setTimeout(() => {
        if (lineEl) lineEl.classList.add('contracting');
      }, 50);

      // Fade overlay to transparent
      setTimeout(() => {
        if (overlayEl) {
          overlayEl.style.transition = 'opacity 300ms ease-out';
          overlayEl.style.opacity = '0';
        }
        setTimeout(() => onComplete?.(), 350);
      }, 330);
    }, 2300);
  }

  function animateCounter() {
    if (!counterEl) {
      console.warn('counterEl not bound, skipping animation');
      return;
    }
    let value = 0;
    const start = performance.now();
    const duration = 400;

    function tick() {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Decelerate toward end
      const eased = 1 - Math.pow(1 - progress, 2.5);
      value = Math.floor(eased * 100);
      counterEl.textContent = String(value).padStart(3, '0');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
</script>

<div class="loading-screen" bind:this={overlayEl}>
  <!-- Horizon line -->
  <div class="horizon-line" bind:this={lineEl}></div>

  <!-- PROGETA letters -->
  <div class="letters-wrap" bind:this={lettersEl}>
    {#each LETTERS as letter, i}
      <span
        class="letter"
        style="opacity: 0; transition: opacity 80ms ease-out;"
        use:bindLetter={i}
      >{letter}</span>
    {/each}
  </div>

  <!-- Technologies sub-text -->
  <div class="sub-text" class:visible={subVisible}>Technologies</div>

  <!-- Counter -->
  <div class="counter" class:visible={counterVisible} bind:this={counterEl}>000</div>
</div>

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  /* ── HORIZON LINE ─────────────────────────── */
  .horizon-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 1px;
    width: 0;
    background: var(--border-2, #2C3242);
  }

  .horizon-line.drawing {
    animation: lineExpand 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .horizon-line.contracting {
    animation: lineContract 280ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes lineExpand {
    from { width: 0; }
    to { width: 100vw; }
  }

  @keyframes lineContract {
    from { width: 100vw; }
    to { width: 0; }
  }

  /* ── LETTERS ──────────────────────────────── */
  .letters-wrap {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 0;
    transition: opacity 200ms ease-out;
  }

  .letter {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: clamp(48px, 10vw, 115px);
    letter-spacing: -0.04em;
    color: var(--ink-1, #F5F7FA);
    line-height: 1;
    display: inline-block;
  }

  /* ── SUB-TEXT ─────────────────────────────── */
  .sub-text {
    position: relative;
    z-index: 2;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-weight: 300;
    font-size: clamp(14px, 3.8vw, 42px);
    letter-spacing: 0.14em;
    color: var(--ink-3, #4A5568);
    text-transform: uppercase;
    margin-top: var(--sp-3, 12px);
    align-self: flex-start;
    margin-left: calc(50% - clamp(24px, 5vw, 57.5px) * 7 / 2 + clamp(24px, 5vw, 57.5px) * 0.04);
    opacity: 0;
    transition: opacity 400ms ease-out;
  }

  .sub-text.visible {
    opacity: 1;
  }

  /* ── COUNTER ─────────────────────────────── */
  .counter {
    position: fixed;
    bottom: 40px;
    right: 48px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-3, #4A5568);
    letter-spacing: 0.05em;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

  .counter.visible {
    opacity: 1;
  }
</style>
