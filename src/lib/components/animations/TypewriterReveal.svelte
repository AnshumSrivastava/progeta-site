<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let {
    text,
    speed = 50,
    delay = 0,
  }: {
    text: string;
    speed?: number;
    delay?: number;
  } = $props();

  let displayed = $state('');
  let timeout: ReturnType<typeof setTimeout>;

  onMount(() => {
    let index = 0;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          displayed = text.slice(0, index + 1);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<span class="typewriter">
  {displayed}<span class="typewriter__cursor" aria-hidden="true"></span>
</span>

<style>
  .typewriter {
    display: inline;
  }
  .typewriter__cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--ink-2);
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
</style>
