<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth.svelte';
  import BrandMark from '$lib/components/site/BrandMark.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let { children } = $props();

  let showModeSelector = $state(false);
  let sidebarCollapsed = $state(false);

  const navItems = [
    { label: 'Dashboard', icon: 'grid', href: '/selfos/app' },
    { label: 'Tasks', icon: 'check-square', href: '/selfos/app/tasks' },
    { label: 'Habits', icon: 'repeat', href: '/selfos/app/habits' },
    { label: 'Goals', icon: 'target', href: '/selfos/app/goals' },
    { label: 'Focus', icon: 'clock', href: '/selfos/app/focus' },
    { label: 'Finance', icon: 'wallet', href: '/selfos/app/finance' },
    { label: 'Vitals', icon: 'heart', href: '/selfos/app/vitals' },
    { label: 'Notes', icon: 'file-text', href: '/selfos/app/notes' },
    { label: 'Journal', icon: 'book', href: '/selfos/app/journal' },
  ];

  function isActive(href: string): boolean {
    const pathname = $page.url.pathname;
    if (href === '/selfos/app') return pathname === '/selfos/app';
    return pathname.startsWith(href);
  }

  onMount(async () => {
    await auth.init();

    // Check if mode is set
    if (!auth.mode) {
      showModeSelector = true;
      return;
    }

    // If cloud mode but no session, redirect to auth
    if (auth.mode === 'cloud' && !auth.session) {
      goto('/auth?returnTo=/selfos/app');
    }
  });

  function selectLocal() {
    auth.setLocalMode();
    showModeSelector = false;
  }

  function selectCloud() {
    goto('/auth?returnTo=/selfos/app');
  }

  async function handleSignOut() {
    await auth.signOut();
    goto('/');
  }
</script>

{#if showModeSelector}
  <!-- MODE SELECTOR -->
  <div class="mode-selector">
    <div class="mode-selector__inner">
      <BrandMark size="md" />
      <h2 class="mode-selector__heading">How do you want to run SelfOS?</h2>
      <div class="mode-selector__cards">
        <button class="mode-card" onclick={selectLocal}>
          <h3 class="mode-card__title">Local Only</h3>
          <p class="mode-card__desc">
            No account. Your data stays on this device.
            Works offline. No sync.
          </p>
          <span class="mode-card__action">Start locally →</span>
        </button>
        <button class="mode-card" onclick={selectCloud}>
          <h3 class="mode-card__title">With an Account</h3>
          <p class="mode-card__desc">
            Sync across devices. Sign in with Supabase.
            Your data is encrypted and backed up.
          </p>
          <span class="mode-card__action">Sign in →</span>
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="app-shell">
    <!-- DESKTOP SIDEBAR -->
    <aside class="sidebar" class:sidebar--collapsed={sidebarCollapsed}>
      <div class="sidebar__top">
        {#if !sidebarCollapsed}
          <BrandMark size="sm" href="/selfos/app" />
        {/if}
        <button class="sidebar__toggle" onclick={() => sidebarCollapsed = !sidebarCollapsed} aria-label="Toggle sidebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            {#if sidebarCollapsed}
              <polyline points="9 18 15 12 9 6"/>
            {:else}
              <polyline points="15 18 9 12 15 6"/>
            {/if}
          </svg>
        </button>
      </div>

      <nav class="sidebar__nav">
        {#each navItems as item}
          <a
            href={item.href}
            class="sidebar__item"
            class:sidebar__item--active={isActive(item.href)}
            title={sidebarCollapsed ? item.label : undefined}
          >
            <span class="sidebar__icon">{item.icon.charAt(0).toUpperCase()}</span>
            {#if !sidebarCollapsed}
              <span class="sidebar__label">{item.label}</span>
            {/if}
          </a>
        {/each}
      </nav>

      <div class="sidebar__bottom">
        <button class="sidebar__item" onclick={handleSignOut}>
          <span class="sidebar__icon">×</span>
          {#if !sidebarCollapsed}
            <span class="sidebar__label">Sign Out</span>
          {/if}
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="app-main">
      {@render children?.()}
    </main>

    <!-- MOBILE BOTTOM NAV -->
    <nav class="bottom-nav">
      {#each navItems.slice(0, 4) as item}
        <a href={item.href} class="bottom-nav__item" class:bottom-nav__item--active={isActive(item.href)}>
          <span class="bottom-nav__icon">{item.icon.charAt(0).toUpperCase()}</span>
          <span class="bottom-nav__label">{item.label}</span>
        </a>
      {/each}
      <a href="/selfos/app" class="bottom-nav__item">
        <span class="bottom-nav__icon">⋯</span>
        <span class="bottom-nav__label">More</span>
      </a>
    </nav>
  </div>
{/if}

<style>
  /* MODE SELECTOR */
  .mode-selector {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-7);
  }
  .mode-selector__inner {
    text-align: center;
    max-width: 700px;
  }
  .mode-selector__heading {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    margin: var(--sp-7) 0;
  }
  .mode-selector__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-5);
  }
  .mode-card {
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    padding: var(--sp-7);
    text-align: left;
    cursor: pointer;
    transition: border-color 0.2s;
    font-family: inherit;
    color: inherit;
  }
  .mode-card:hover { border-color: var(--accent-blue); }
  .mode-card__title {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--text-md);
    color: var(--ink-1);
    margin-bottom: var(--sp-4);
  }
  .mode-card__desc {
    font-weight: 300;
    font-size: var(--text-sm);
    color: var(--ink-2);
    line-height: var(--leading-normal);
    margin-bottom: var(--sp-5);
  }
  .mode-card__action {
    font-size: var(--text-sm);
    color: var(--accent-blue);
  }

  /* APP SHELL */
  .app-shell {
    display: flex;
    min-height: 100dvh;
  }

  /* SIDEBAR */
  .sidebar {
    width: 220px;
    background: var(--surface-1);
    border-right: 1px solid var(--border-1);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.2s ease;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 50;
  }
  .sidebar--collapsed { width: 60px; }
  .sidebar__top {
    padding: var(--sp-5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    border-bottom: 1px solid var(--border-1);
  }
  .sidebar__toggle {
    background: none;
    border: none;
    color: var(--ink-3);
    cursor: pointer;
    padding: var(--sp-2);
    flex-shrink: 0;
  }
  .sidebar__nav {
    flex: 1;
    padding: var(--sp-3) 0;
    overflow-y: auto;
  }
  .sidebar__item {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    height: 44px;
    padding: 0 var(--sp-5);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 400;
    color: var(--ink-3);
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }
  .sidebar__item:hover {
    color: var(--ink-2);
    background: var(--surface-2);
  }
  .sidebar__item--active {
    color: var(--ink-1);
    border-left: 2px solid var(--accent-blue);
  }
  .sidebar__icon {
    width: 16px;
    text-align: center;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    flex-shrink: 0;
  }
  .sidebar__bottom {
    padding: var(--sp-3) 0;
    border-top: 1px solid var(--border-1);
  }

  /* MAIN */
  .app-main {
    flex: 1;
    margin-left: 220px;
    min-height: 100vh;
    padding: var(--sp-7);
    transition: margin-left 0.2s;
  }
  .sidebar--collapsed ~ .app-main {
    margin-left: 60px;
  }

  /* BOTTOM NAV */
  .bottom-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--surface-1);
    border-top: 1px solid var(--border-1);
    z-index: 50;
  }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .app-main {
      margin-left: 0;
      padding-bottom: 80px;
    }
    .bottom-nav {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .bottom-nav__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: var(--text-2xs);
      color: var(--ink-3);
      text-decoration: none;
      transition: color 0.15s;
    }
    .bottom-nav__item--active { color: var(--ink-1); }
    .bottom-nav__icon {
      font-family: var(--font-mono);
      font-size: var(--text-sm);
    }
    .bottom-nav__label {
      font-family: var(--font-body);
      font-size: 9px;
      letter-spacing: var(--tracking-wide);
    }
    .mode-selector__cards {
      grid-template-columns: 1fr;
    }
  }
</style>
