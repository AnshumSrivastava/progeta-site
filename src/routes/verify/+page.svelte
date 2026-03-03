<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';

  let certId = $state('');
  let result = $state<{ found: boolean; holder?: string; programme?: string; issued?: string; status?: string } | null>(null);
  let searching = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    searching = true;
    // In production, this queries Supabase certificates table
    setTimeout(() => {
      result = { found: false };
      searching = false;
    }, 1000);
  }
</script>

<svelte:head>
  <title>Verify Certificate — Progeta Technologies</title>
  <meta name="description" content="Verify a Progeta Technologies certificate by its unique ID." />
</svelte:head>

<section class="verify">
  <div class="container--text">
    <ScrollReveal>
      <Tag label="CERTIFICATE VERIFICATION" variant="active" />
      <h1 class="verify__heading">Verify a certificate.</h1>
      <p class="verify__body">
        Enter the certificate ID printed on any Progeta Technologies certificate
        to verify its authenticity and status.
      </p>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <form onsubmit={handleSubmit} class="verify__form">
        <Input label="Certificate ID" name="certId" bind:value={certId} placeholder="PGT-2026-CTI-0042" required />
        <Button variant="primary" type="submit" disabled={searching}>
          {searching ? 'Searching...' : 'Verify'}
        </Button>
      </form>
    </ScrollReveal>

    {#if result}
      <ScrollReveal>
        <div class="verify__result" class:verify__result--found={result.found}>
          {#if result.found}
            <span class="verify__status verify__status--active">VERIFIED</span>
            <div class="verify__detail">
              <span class="verify__label">Holder</span>
              <span class="verify__value">{result.holder}</span>
            </div>
            <div class="verify__detail">
              <span class="verify__label">Programme</span>
              <span class="verify__value">{result.programme}</span>
            </div>
            <div class="verify__detail">
              <span class="verify__label">Issued</span>
              <span class="verify__value">{result.issued}</span>
            </div>
          {:else}
            <span class="verify__status verify__status--notfound">NOT FOUND</span>
            <p class="verify__notfound-text">
              No certificate found with this ID. Please check the ID and try again.
              If you believe this is an error, contact operations@progeta.tech.
            </p>
          {/if}
        </div>
      </ScrollReveal>
    {/if}
  </div>
</section>

<style>
  .verify {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
    padding-bottom: var(--section-pad);
  }
  .verify__heading {
    margin-top: var(--sp-5);
    margin-bottom: var(--sp-5);
  }
  .verify__body {
    margin-bottom: var(--sp-7);
  }
  .verify__form {
    margin-bottom: var(--sp-7);
  }
  .verify__result {
    padding: var(--sp-7);
    border: 1px solid var(--border-2);
  }
  .verify__result--found { border-color: var(--accent-green); }
  .verify__status {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-widest);
    margin-bottom: var(--sp-5);
  }
  .verify__status--active { color: var(--accent-green); }
  .verify__status--notfound { color: var(--accent-red); }
  .verify__detail {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1);
    margin-bottom: var(--sp-4);
  }
  .verify__label {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }
  .verify__value {
    font-size: var(--text-base);
    color: var(--ink-1);
  }
  .verify__notfound-text {
    max-width: none;
  }
</style>
