<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import { isSupabaseConfigured } from '$lib/supabase';
  import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
  import BrandMark from '$lib/components/site/BrandMark.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let mode = $state<'signin' | 'signup'>('signin');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let error = $state('');
  let loading = $state(false);
  let magicLinkSent = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';
    loading = true;

    if (!isSupabaseConfigured) {
      error = 'Supabase is not configured. Use local mode instead.';
      loading = false;
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      error = 'Passwords do not match.';
      loading = false;
      return;
    }

    if (mode === 'signin') {
      const result = await auth.signIn(email, password);
      if (result.error) {
        error = result.error.message ?? 'Sign in failed.';
      } else {
        window.location.href = '/selfos/app';
      }
    } else {
      const result = await auth.signUp(email, password);
      if (result.error) {
        error = result.error.message ?? 'Sign up failed.';
      } else {
        // Show success state
        error = '';
        magicLinkSent = true;
      }
    }
    loading = false;
  }

  async function handleMagicLink() {
    if (!email) { error = 'Enter your email first.'; return; }
    loading = true;
    const result = await auth.sendMagicLink(email);
    if (result?.error) {
      error = result.error.message ?? 'Failed to send link.';
    } else {
      magicLinkSent = true;
    }
    loading = false;
  }
</script>

<svelte:head>
  <title>Sign In — Progeta Technologies</title>
</svelte:head>

<section class="auth">
  <div class="auth__inner">
    <ScrollReveal>
      <div class="auth__brand">
        <BrandMark size="md" />
      </div>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <div class="auth__toggle">
        <button
          class="auth__tab"
          class:auth__tab--active={mode === 'signin'}
          onclick={() => { mode = 'signin'; error = ''; }}
        >Sign In</button>
        <button
          class="auth__tab"
          class:auth__tab--active={mode === 'signup'}
          onclick={() => { mode = 'signup'; error = ''; }}
        >Create Account</button>
        <span
          class="auth__indicator"
          style="transform: translateX({mode === 'signin' ? '0' : '100%'})"
        ></span>
      </div>
    </ScrollReveal>

    {#if magicLinkSent}
      <ScrollReveal>
        <div class="auth__success">
          <p>Check your email for a {mode === 'signup' ? 'confirmation' : 'sign-in'} link.</p>
        </div>
      </ScrollReveal>
    {:else}
      <form onsubmit={handleSubmit}>
        <ScrollReveal delay={180}>
          <Input label="Email" name="email" type="email" bind:value={email} required accent="var(--accent-blue)" />
        </ScrollReveal>
        <ScrollReveal delay={260}>
          <Input label="Password" name="password" type="password" bind:value={password} required accent="var(--accent-blue)" />
        </ScrollReveal>
        {#if mode === 'signup'}
          <ScrollReveal delay={340}>
            <Input label="Confirm Password" name="confirmPassword" type="password" bind:value={confirmPassword} required accent="var(--accent-blue)" />
          </ScrollReveal>
        {/if}

        {#if error}
          <p class="auth__error">{error}</p>
        {/if}

        <ScrollReveal delay={mode === 'signup' ? 420 : 340}>
          <Button variant="primary" type="submit" accent="var(--accent-blue)" disabled={loading}>
            {loading ? 'Loading...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
          </Button>
        </ScrollReveal>

        {#if mode === 'signin'}
          <ScrollReveal delay={420}>
            <button type="button" class="auth__link" onclick={handleMagicLink}>
              Send me a sign-in link instead
            </button>
          </ScrollReveal>
        {/if}
      </form>
    {/if}

    <ScrollReveal delay={500}>
      <p class="auth__footer">
        Signing in gives you multi-device sync via Supabase.
        Your data is encrypted. You can export or delete it any time.
      </p>
      <a href="/selfos/app" class="auth__local" onclick={() => auth.setLocalMode()}>
        Prefer local? Run SelfOS offline →
      </a>
    </ScrollReveal>
  </div>
</section>

<style>
  .auth {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-7);
  }
  .auth__inner {
    width: 100%;
    max-width: 400px;
  }
  .auth__brand {
    display: flex;
    justify-content: center;
    margin-bottom: var(--sp-8);
  }
  .auth__toggle {
    display: flex;
    position: relative;
    margin-bottom: var(--sp-7);
    border-bottom: 1px solid var(--border-2);
  }
  .auth__tab {
    flex: 1;
    background: none;
    border: none;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 400;
    color: var(--ink-3);
    padding: var(--sp-4) 0;
    cursor: pointer;
    transition: color 0.2s;
    text-align: center;
  }
  .auth__tab--active { color: var(--ink-1); }
  .auth__indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 50%;
    height: 1px;
    background: var(--ink-1);
    transition: transform 0.2s;
  }
  .auth__error {
    color: var(--accent-red);
    font-size: var(--text-sm);
    margin-bottom: var(--sp-5);
  }
  .auth__link {
    display: block;
    background: none;
    border: none;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--ink-3);
    cursor: pointer;
    margin-top: var(--sp-5);
    transition: color 0.15s;
    text-align: left;
    padding: 0;
  }
  .auth__link:hover { color: var(--ink-1); }
  .auth__footer {
    margin-top: var(--sp-8);
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--ink-4);
    letter-spacing: 0.02em;
    line-height: var(--leading-relaxed);
  }
  .auth__local {
    display: block;
    margin-top: var(--sp-3);
    font-size: var(--text-sm);
    color: var(--ink-3);
    transition: color 0.15s;
  }
  .auth__local:hover { color: var(--ink-1); }
  .auth__success {
    padding: var(--sp-7);
    border: 1px solid var(--accent-blue);
    text-align: center;
    margin-bottom: var(--sp-5);
  }
  .auth__success p { color: var(--ink-1); max-width: none; }
</style>
