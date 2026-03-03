<script lang="ts">
  let {
    message = '',
    type = 'info',
    visible = $bindable(false),
    duration = 3000,
  }: {
    message?: string;
    type?: 'info' | 'success' | 'error';
    visible?: boolean;
    duration?: number;
  } = $props();

  $effect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => { visible = false; }, duration);
      return () => clearTimeout(timer);
    }
  });
</script>

{#if visible}
  <div class="toast toast--{type}" role="alert">
    <span class="toast__message">{message}</span>
    <button class="toast__close" onclick={() => visible = false} aria-label="Close">×</button>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: var(--sp-7);
    right: var(--sp-7);
    z-index: 600;
    display: flex;
    align-items: center;
    gap: var(--sp-4);
    background: var(--surface-2);
    border: 1px solid var(--border-2);
    padding: var(--sp-4) var(--sp-5);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--ink-1);
    animation: toastIn 0.3s ease-out;
    max-width: 400px;
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .toast--success { border-left: 3px solid var(--accent-green); }
  .toast--error   { border-left: 3px solid var(--accent-red); }
  .toast--info    { border-left: 3px solid var(--accent-blue); }
  .toast__message { flex: 1; }
  .toast__close {
    background: none;
    border: none;
    color: var(--ink-3);
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 0;
  }
</style>
