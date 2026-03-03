<script lang="ts">
  import type { Snippet } from 'svelte';
  import { reveal } from '$lib/actions/reveal';

  let {
    delay = 0,
    distance = 20,
    duration = 600,
    stagger = 0,
    children,
    ...rest
  }: {
    delay?: number;
    distance?: number;
    duration?: number;
    stagger?: number;
    children?: Snippet;
    [key: string]: any;
  } = $props();
</script>

<div use:reveal={{ delay, distance, duration, stagger }} {...rest}>
  {@render children?.()}
</div>
