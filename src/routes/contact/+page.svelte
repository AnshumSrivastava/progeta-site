<script lang="ts">
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';

  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
  }
</script>

<svelte:head>
  <title>Contact — Progeta Technologies</title>
  <meta name="description" content="Get in touch with Progeta Technologies." />
</svelte:head>

<section class="contact">
  <div class="contact__inner container">
    <div class="contact__info">
      <ScrollReveal>
        <Tag label="CONTACT" variant="active" />
        <h1 class="contact__heading">Let's talk.</h1>
        <p class="contact__body">
          Whether you are a college looking to bring LaunchPad to your campus,
          an individual exploring initiatives, or someone who wants to collaborate
          — we would like to hear from you.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div class="contact__details">
          <div class="contact__row">
            <span class="contact__label">Email</span>
            <a href="mailto:operations@progeta.tech" class="contact__value">operations@progeta.tech</a>
          </div>
          <div class="contact__row">
            <span class="contact__label">For campuses</span>
            <span class="contact__value">Include "Campus" in your subject line</span>
          </div>
          <div class="contact__row">
            <span class="contact__label">InnerCircle</span>
            <a href="/innercircle" class="contact__value">Apply through the InnerCircle page</a>
          </div>
        </div>
      </ScrollReveal>
    </div>

    <div class="contact__form-wrap">
      {#if submitted}
        <ScrollReveal>
          <div class="contact__success">
            <p>Message sent. We will get back to you soon.</p>
          </div>
        </ScrollReveal>
      {:else}
        <form onsubmit={handleSubmit}>
          <ScrollReveal delay={100}>
            <Input label="Name" name="name" bind:value={name} required />
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <Input label="Email" name="email" type="email" bind:value={email} required />
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <Input label="Subject" name="subject" bind:value={subject} required />
          </ScrollReveal>
          <ScrollReveal delay={280}>
            <Input label="Message" name="message" type="textarea" bind:value={message} required rows={5} />
          </ScrollReveal>
          <ScrollReveal delay={340}>
            <Button variant="primary" type="submit">Send Message</Button>
          </ScrollReveal>
        </form>
      {/if}
    </div>
  </div>
</section>

<style>
  .contact {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding-top: 72px;
    padding-bottom: var(--section-pad);
  }
  .contact__inner {
    display: flex;
    gap: var(--sp-9);
  }
  .contact__info { flex: 1; }
  .contact__form-wrap { flex: 1; max-width: 480px; }
  .contact__heading {
    margin-top: var(--sp-5);
    margin-bottom: var(--sp-5);
  }
  .contact__body {
    margin-bottom: var(--sp-7);
    line-height: var(--leading-relaxed);
  }
  .contact__details {
    display: flex;
    flex-direction: column;
    gap: var(--sp-5);
  }
  .contact__row {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1);
  }
  .contact__label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }
  .contact__value {
    font-size: var(--text-sm);
    color: var(--ink-2);
  }
  .contact__value:hover { color: var(--ink-1); }
  .contact__success {
    padding: var(--sp-7);
    border: 1px solid var(--border-3);
    text-align: center;
  }
  .contact__success p { color: var(--ink-1); max-width: none; }

  @media (max-width: 768px) {
    .contact__inner { flex-direction: column; }
    .contact__form-wrap { max-width: none; }
  }
</style>
