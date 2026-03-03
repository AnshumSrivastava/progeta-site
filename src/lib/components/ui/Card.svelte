<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    href,
    children,
  }: {
    href?: string;
    children?: Snippet;
  } = $props();
</script>

{#if href}
  <a {href} class="card">
    {@render children?.()}
  </a>
{:else}
  <div class="card">
    {@render children?.()}
  </div>
{/if}

<style>
  .card {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s;
  }
</style>
