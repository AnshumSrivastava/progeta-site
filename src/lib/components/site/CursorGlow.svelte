<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let ring = $state<HTMLElement>();
  let dot = $state<HTMLElement>();
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let rafId: number;
  let isTouch = $state(false);
  let isHoveringLink = $state(false);
  let isMouseDown = $state(false);
  let accentColor = $state("");

  let currentTarget: EventTarget | null = null;

  function handleMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (e.target !== currentTarget) {
      currentTarget = e.target;
      const target = e.target as HTMLElement;

      if (target && target.closest) {
        // Only run .closest() when the actual DOM node under the cursor changes
        isHoveringLink =
          target.closest(
            'a, button, [role="button"], [tabindex], input, textarea, select',
          ) !== null;

        // Detect accent section context
        const accentEl = target.closest("[data-accent]") as HTMLElement | null;
        accentColor = accentEl?.dataset.accent || "";
      }
    }
  }

  function handleDown() {
    isMouseDown = true;
  }
  function handleUp() {
    isMouseDown = false;
  }

  let lastDotX = -1;
  let lastDotY = -1;

  function animate() {
    // Only update dot transform if coordinates changed
    if (dot && (mouseX !== lastDotX || mouseY !== lastDotY)) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      lastDotX = mouseX;
      lastDotY = mouseY;
    }

    const dx = mouseX - ringX;
    const dy = mouseY - ringY;

    // Only update ring if distance is visually significant (>0.05px)
    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      ringX += dx * 0.15; // Sped up lerp from 0.12 to 0.15 for better responsiveness
      ringY += dy * 0.15;

      if (ring) {
        // Round to 2 decimal places to prevent minute sub-pixel repaints
        const rx = Math.round(ringX * 100) / 100;
        const ry = Math.round(ringY * 100) / 100;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
    } else if (
      Math.abs(dx) <= 0.05 &&
      Math.abs(dy) <= 0.05 &&
      ringX !== mouseX
    ) {
      // Snap exactly to target to settle completely
      ringX = mouseX;
      ringY = mouseY;
      if (ring) {
        ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  onMount(() => {
    isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    rafId = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    }
  });
</script>

{#if !isTouch}
  <div
    class="cursor-ring"
    class:hover={isHoveringLink}
    class:pressing={isMouseDown}
    style={accentColor
      ? `border-color: color-mix(in srgb, var(--ink-1) 75%, ${accentColor} 25%)`
      : ""}
    bind:this={ring}
  ></div>
  <div class="cursor-dot" class:hover={isHoveringLink} bind:this={dot}></div>
{/if}

<style>
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border: 1px solid var(--ink-1);
    border-radius: 50%;
    opacity: 0.4;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    margin-top: -16px;
    margin-left: -16px;
    transition:
      width 250ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      height 250ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      opacity 250ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      margin 250ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      border-color 350ms ease;
  }

  .cursor-ring.hover {
    width: 56px;
    height: 56px;
    margin-top: -28px;
    margin-left: -28px;
    opacity: 0.8;
  }

  .cursor-ring.pressing {
    width: 24px;
    height: 24px;
    margin-top: -12px;
    margin-left: -12px;
    transition:
      width 80ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      height 80ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)),
      margin 80ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
  }

  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background: var(--ink-1);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    margin-top: -2px;
    margin-left: -2px;
    transition:
      width 200ms ease,
      height 200ms ease,
      margin 200ms ease;
  }

  .cursor-dot.hover {
    width: 3px;
    height: 3px;
    margin-top: -1.5px;
    margin-left: -1.5px;
  }

  /* Hide default cursor on interactive elements */
  :global(a, button, [role="button"], [tabindex]) {
    cursor: none !important;
  }
</style>
