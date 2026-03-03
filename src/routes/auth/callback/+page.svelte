<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  onMount(async () => {
    if (supabase) {
      // Supabase handles the callback via the URL hash
      const { error } = await supabase.auth.getSession();
      if (!error) {
        goto('/selfos/app');
      } else {
        goto('/auth');
      }
    } else {
      goto('/auth');
    }
  });
</script>

<div class="callback">
  <p>Verifying your sign-in...</p>
</div>

<style>
  .callback {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .callback p {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--ink-3);
  }
</style>
