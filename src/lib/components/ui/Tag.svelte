<script lang="ts">
  let {
    label,
    variant = 'default',
    live = false,
  }: { label: string; variant?: 'default' | 'active' | 'category'; live?: boolean } = $props();
</script>

<span class="tag tag--{variant}">
  {#if live}<span class="tag__dot" aria-hidden="true"></span>{/if}
  {label}
</span>

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    padding: 4px 10px;
    color: var(--ink-3);
    border: 1px solid var(--border-2);
  }
  .tag--active {
    color: var(--ink-2);
    border-color: var(--border-3);
  }
  .tag--category {
    border: none;
    padding: 0;
    color: var(--ink-4);
  }
  .tag__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
</style>
