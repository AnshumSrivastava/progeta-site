<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    open = $bindable(false),
    children,
  }: {
    open?: boolean;
    children?: Snippet;
  } = $props();

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" onclick={close} onkeydown={handleKeydown}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <button class="modal__close" onclick={close} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      {@render children?.()}
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 500;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-5);
    animation: fadeIn 0.2s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .modal {
    background: var(--surface-2);
    border: 1px solid var(--border-2);
    max-width: 560px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: var(--sp-7);
    position: relative;
    animation: scaleIn 0.2s ease-out;
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  .modal__close {
    position: absolute;
    top: var(--sp-5);
    right: var(--sp-5);
    background: none;
    border: none;
    color: var(--ink-3);
    cursor: pointer;
    padding: var(--sp-2);
    transition: color 0.15s;
  }
  .modal__close:hover { color: var(--ink-1); }
</style>
