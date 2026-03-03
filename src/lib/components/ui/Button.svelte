<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'text';
  type Size = 'sm' | 'md' | 'lg';
  let {
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled = false,
    accent,
    children,
    onclick,
  }: {
    variant?: Variant;
    size?: Size;
    href?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    accent?: string;
    children?: Snippet;
    onclick?: (e: Event) => void;
  } = $props();
</script>

{#if href}
  <a {href} class="btn btn--{variant} btn--{size}" class:disabled style={accent ? `--btn-accent: ${accent}` : ''}>
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} class="btn btn--{variant} btn--{size}" {onclick} style={accent ? `--btn-accent: ${accent}` : ''}>
    {@render children?.()}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    font-family: var(--font-body);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    border: none;
    outline: none;
  }
  
  .btn:hover {
    transform: scale(1.02);
  }

  .btn--sm { font-size: var(--text-xs); padding: 10px 18px; }
  .btn--md { font-size: 12px;           padding: 13px 24px; }
  .btn--lg { font-size: var(--text-sm); padding: 16px 32px; }

  .btn--primary {
    background: var(--btn-accent, var(--ink-1));
    color: var(--ground);
  }
  .btn--primary:hover {
    filter: brightness(0.85);
  }

  .btn--secondary {
    background: transparent;
    color: var(--ink-1);
    border: 1px solid var(--border-3);
  }
  .btn--secondary:hover {
    border-color: var(--ink-2);
  }

  .btn--ghost {
    background: transparent;
    color: var(--ink-2);
    border: 1px solid var(--border-2);
  }
  .btn--ghost:hover {
    color: var(--ink-1);
    border-color: var(--border-3);
  }

  .btn--text {
    background: transparent;
    color: var(--ink-2);
    padding: 0;
    font-size: var(--text-sm);
    text-transform: none;
    letter-spacing: var(--tracking-normal);
  }
  .btn--text:hover { color: var(--ink-1); }
  .btn--text::after { content: ' →'; transition: transform 0.15s; display: inline-block; }
  .btn--text:hover::after { transform: translateX(3px); }

  .disabled {
    opacity: 0.4;
    pointer-events: none;
  }
</style>
