<script lang="ts">
    import { page } from "$app/stores";
    import { fly, fade } from "svelte/transition";
    import { base } from "$app/paths";

    let isMenuOpen = false;
    let ecosystemOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    function closeMenu() {
        isMenuOpen = false;
        document.body.style.overflow = "";
    }

    function toggleEcosystem(e: MouseEvent) {
        e.stopPropagation();
        ecosystemOpen = !ecosystemOpen;
    }

    function closeEcosystem() {
        ecosystemOpen = false;
    }

    $: currentPath = $page.url.pathname;
</script>

<svelte:window on:click={closeEcosystem} />

<!-- DESKTOP NAV -->
<nav class="nav-bar">
    <div class="nav-content">
        <!-- Brand -->
        <a href="{base}/" class="brand">
            <img src="{base}/logo_icon.svg" alt="Progeta Technologies" class="brand-logo" />
            <span class="brand-name">Progeta Technologies</span>
        </a>

        <!-- Desktop Links -->
        <div class="nav-links">
            <div class="dropdown-wrapper" on:click|stopPropagation on:keydown|stopPropagation role="menu" tabindex="0">
                <button
                    class="nav-link"
                    class:active={ecosystemOpen}
                    on:click={toggleEcosystem}
                >
                    ECOSYSTEM
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 4px;">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                {#if ecosystemOpen}
                    <div class="dropdown-panel" transition:fly={{ y: -8, duration: 150 }}>
                        <a href="{base}/launchpad" class="eco-card" on:click={closeEcosystem}>
                            <span class="eco-name">LAUNCHPAD</span>
                            <span class="eco-desc">Skills for students and campuses.</span>
                            <span class="eco-cta">Explore →</span>
                        </a>
                        <a href="{base}/selfos" class="eco-card" on:click={closeEcosystem}>
                            <span class="eco-name">SELFOS</span>
                            <span class="eco-desc">Your personal operating system.</span>
                            <span class="eco-cta">Explore →</span>
                        </a>
                        <a href="{base}/innercircle" class="eco-card" on:click={closeEcosystem}>
                            <span class="eco-name">INNERCIRCLE</span>
                            <span class="eco-desc">A vetted network for the driven.</span>
                            <span class="eco-cta">Apply →</span>
                        </a>
                    </div>
                {/if}
            </div>

            <a href="{base}/tracks" class="nav-link" class:active={currentPath.startsWith(base + '/tracks')}>TRACKS</a>
            <a href="{base}/games" class="nav-link" class:active={currentPath.startsWith(base + '/games')}>GAMES</a>
            <a href="{base}/about" class="nav-link" class:active={currentPath.startsWith(base + '/about')}>ABOUT</a>
        </div>

        <!-- Desktop CTA -->
        <a href="{base}/contact" class="nav-cta">Get in Touch</a>

        <!-- Mobile Menu Toggle -->
        <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle Menu">
            <div class="hamburger" class:open={isMenuOpen}>
                <span></span>
                <span></span>
            </div>
        </button>
    </div>
</nav>

<!-- MOBILE OVERLAY -->
{#if isMenuOpen}
    <div
        class="mobile-overlay"
        on:click={closeMenu}
        on:keydown={closeMenu}
        role="presentation"
        transition:fade={{ duration: 150 }}
    >
        <div
            class="mobile-menu"
            on:click|stopPropagation
            on:keydown|stopPropagation
            role="navigation"
            transition:fly={{ x: 0, y: -20, duration: 200 }}
        >
            <button class="close-btn" on:click={closeMenu} aria-label="Close">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div class="mobile-links">
                <!-- Ecosystem links first, visually separated -->
                <a href="{base}/launchpad" on:click={closeMenu} class="mobile-link mobile-link--eco">
                    <span>LAUNCHPAD</span>
                    <span class="mobile-arrow">→</span>
                </a>
                <a href="{base}/selfos" on:click={closeMenu} class="mobile-link mobile-link--eco">
                    <span>SELFOS</span>
                    <span class="mobile-arrow">→</span>
                </a>
                <a href="{base}/innercircle" on:click={closeMenu} class="mobile-link mobile-link--eco">
                    <span>INNERCIRCLE</span>
                    <span class="mobile-arrow">→</span>
                </a>

                <div class="mobile-divider"></div>

                <a href="{base}/tracks" on:click={closeMenu} class="mobile-link">
                    <span>TRACKS</span>
                    <span class="mobile-arrow">→</span>
                </a>
                <a href="{base}/games" on:click={closeMenu} class="mobile-link">
                    <span>GAMES</span>
                    <span class="mobile-arrow">→</span>
                </a>
                <a href="{base}/about" on:click={closeMenu} class="mobile-link">
                    <span>ABOUT</span>
                    <span class="mobile-arrow">→</span>
                </a>
            </div>

            <div class="mobile-bottom">
                <a href="{base}/contact" class="btn-primary mobile-cta" on:click={closeMenu}>
                    GET IN TOUCH
                </a>

                <div class="mobile-socials">
                    <a href="https://linkedin.com/company/progetatechnologies" target="_blank" rel="noopener">LI</a>
                    <span class="social-dot">·</span>
                    <a href="https://instagram.com/progetatechnologies" target="_blank" rel="noopener">IG</a>
                    <span class="social-dot">·</span>
                    <a href="https://discord.gg/progetatechnologies" target="_blank" rel="noopener">DC</a>
                    <span class="social-dot">·</span>
                    <a href="https://github.com/progetatechnologies" target="_blank" rel="noopener">GH</a>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* ─── NAV BAR ─────────────────────────────────────────── */
    .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        background: rgba(10, 10, 10, 0.9);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--color-border);
        z-index: 1000;
    }

    .nav-content {
        max-width: var(--container-width);
        margin: 0 auto;
        padding: 0 80px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Brand */
    .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
    }
    .brand-logo {
        height: 24px;
        width: auto;
    }
    .brand-name {
        font-family: var(--font-display);
        font-weight: 800;
        font-size: var(--text-sm);
        letter-spacing: 0.12em;
        color: var(--color-primary);
    }

    /* Nav Links */
    .nav-links {
        display: flex;
        align-items: center;
        gap: var(--space-4);
    }

    .nav-link {
        font: 500 var(--text-xs)/1 var(--font-mono);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-secondary);
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px 0;
        transition: color 0.15s ease;
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    .nav-link:hover,
    .nav-link.active {
        color: var(--color-primary);
    }

    /* Ecosystem Dropdown */
    .dropdown-wrapper {
        position: relative;
    }
    .dropdown-panel {
        position: absolute;
        top: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1px;
        background: var(--color-border);
        border: 1px solid var(--color-border);
        z-index: 100;
        min-width: 480px;
    }
    .eco-card {
        flex: 1;
        padding: var(--space-3);
        background: var(--color-surface);
        text-decoration: none;
        transition: background 0.15s ease;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .eco-card:hover {
        background: var(--color-muted);
    }
    .eco-name {
        font: 800 var(--text-sm)/1 var(--font-display);
        color: var(--color-primary);
        letter-spacing: 0.04em;
    }
    .eco-desc {
        font: 400 var(--text-xs)/1.4 var(--font-body);
        color: var(--color-secondary);
        margin-top: 4px;
    }
    .eco-cta {
        font: 500 var(--text-xs)/1 var(--font-mono);
        color: var(--color-signal);
        margin-top: 8px;
        letter-spacing: 0.04em;
    }

    /* CTA */
    .nav-cta {
        font: 600 var(--text-xs)/1 var(--font-mono);
        letter-spacing: 0.08em;
        color: var(--color-void);
        background: var(--color-signal);
        padding: 10px 20px;
        text-decoration: none;
        transition: all 0.15s ease;
    }
    .nav-cta:hover {
        background: var(--color-primary);
    }

    /* Menu Toggle (mobile only) */
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
    }
    .hamburger {
        width: 20px;
        height: 14px;
        position: relative;
    }
    .hamburger span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 1.5px;
        background: var(--color-primary);
        transition: all 0.2s ease;
    }
    .hamburger span:first-child { top: 0; }
    .hamburger span:last-child { bottom: 0; }
    .hamburger.open span:first-child {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
    }
    .hamburger.open span:last-child {
        bottom: 50%;
        transform: translateY(50%) rotate(-45deg);
    }

    /* ─── MOBILE OVERLAY ──────────────────────────────────── */
    .mobile-overlay {
        position: fixed;
        inset: 0;
        background: rgba(10, 10, 10, 0.98);
        z-index: 2000;
        display: flex;
        flex-direction: column;
    }
    .mobile-menu {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
    }
    .close-btn {
        align-self: flex-end;
        background: none;
        border: none;
        color: var(--color-primary);
        cursor: pointer;
        padding: 20px 0;
    }

    .mobile-links {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0;
    }
    .mobile-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        font: 600 var(--text-md)/1 var(--font-display);
        letter-spacing: 0.04em;
        color: var(--color-primary);
        text-decoration: none;
        border-bottom: 1px solid var(--color-border);
        transition: color 0.15s ease;
        min-height: 60px;
    }
    .mobile-link:hover {
        color: var(--color-signal);
    }
    .mobile-arrow {
        color: var(--color-tertiary);
        font-size: var(--text-md);
    }
    .mobile-divider {
        height: var(--space-3);
    }

    .mobile-bottom {
        padding: var(--space-5) 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }
    .mobile-cta {
        width: 100%;
        text-align: center;
        padding: 16px;
    }
    .mobile-socials {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        font: 600 var(--text-sm)/1 var(--font-mono);
    }
    .mobile-socials a {
        color: var(--color-secondary);
        text-decoration: none;
        letter-spacing: 0.06em;
        transition: color 0.15s ease;
    }
    .mobile-socials a:hover {
        color: var(--color-primary);
    }
    .social-dot {
        color: var(--color-tertiary);
    }

    /* ─── RESPONSIVE ──────────────────────────────────────── */
    @media (max-width: 1024px) {
        .nav-content {
            padding: 0 40px;
        }
    }

    @media (max-width: 900px) {
        .nav-links,
        .nav-cta {
            display: none;
        }
        .menu-toggle {
            display: block;
        }
        .nav-content {
            padding: 0 20px;
        }
    }
</style>
