<script>
    import { page } from "$app/stores";
    import { fly, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { base } from "$app/paths";

    let isMenuOpen = false;
    let isResourcesOpen = false;

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

    function toggleResources() {
        isResourcesOpen = !isResourcesOpen;
    }

    function closeResources() {
        isResourcesOpen = false;
    }

    // Resource pages — secondary items behind dropdown
    const resourceLinks = [
        { href: "/tracks", label: "Tracks" },
        { href: "/modules", label: "Modules" },
        { href: "/workshops", label: "Workshops" },
        { href: "/events", label: "Events" },
        { href: "/games", label: "Games" },
        { href: "/articles", label: "Articles" },
        { href: "/pricing", label: "Pricing" },
    ];
</script>

<svelte:window on:click={closeResources} />

<nav class="floating-nav">
    <div class="nav-content">
        <!-- Brand -->
        <a href="{base}/" class="brand" on:click={closeMenu}>
            <img
                src="{base}/logo_icon.svg"
                alt="Progeta Technologies"
                style="height:28px;"
            />
        </a>

        <!-- Desktop Links -->
        <div class="links desktop-only">
            <a
                href="{base}/programmes"
                class:active={$page.url.pathname.startsWith(
                    base + "/programmes",
                )}>Programmes</a
            >
            <a
                href="{base}/students"
                class:active={$page.url.pathname.startsWith(base + "/students")}
                >Students</a
            >
            <a
                href="{base}/colleges"
                class:active={$page.url.pathname.startsWith(base + "/colleges")}
                >Colleges</a
            >
            <a
                href="{base}/chapters"
                class:active={$page.url.pathname.startsWith(base + "/chapters")}
                >Chapters</a
            >
            <a
                href="{base}/community"
                class:active={$page.url.pathname.startsWith(
                    base + "/community",
                )}>Community</a
            >

            <!-- Resources Dropdown -->
            <div
                class="resources-dropdown"
                on:click|stopPropagation
                on:keydown|stopPropagation
                role="menu"
                tabindex="0"
            >
                <button
                    class="resources-trigger"
                    class:active={isResourcesOpen}
                    on:click={toggleResources}
                >
                    Resources
                    <svg
                        class="chevron"
                        class:open={isResourcesOpen}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="14"
                        height="14"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>

                {#if isResourcesOpen}
                    <div
                        class="dropdown-panel"
                        transition:fly={{ y: -10, duration: 200 }}
                    >
                        {#each resourceLinks as link}
                            <a
                                href="{base}{link.href}"
                                class:active={$page.url.pathname.startsWith(
                                    base + link.href,
                                )}
                                on:click={closeResources}>{link.label}</a
                            >
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Desktop CTA -->
        <div class="cta-wrapper desktop-only">
            <a href="{base}/contact" class="nav-cta">Contact</a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
            class="menu-toggle mobile-only"
            on:click={toggleMenu}
            aria-label="Toggle Menu"
        >
            <div class="hamburger" class:open={isMenuOpen}>
                <span></span>
                <span></span>
            </div>
        </button>
    </div>
</nav>

<!-- Mobile Side Drawer & Backdrop -->
{#if isMenuOpen}
    <!-- Backdrop -->
    <div
        class="mobile-backdrop"
        on:click={closeMenu}
        on:keydown={closeMenu}
        role="presentation"
        transition:fade={{ duration: 200 }}
    ></div>

    <!-- Side Drawer -->
    <div
        class="mobile-drawer"
        transition:fly={{ x: 300, duration: 300, easing: cubicOut }}
    >
        <!-- Close Button -->
        <button class="close-btn" on:click={closeMenu} aria-label="Close Menu">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <div class="mobile-links">
            <a
                href="{base}/"
                on:click={closeMenu}
                class:active={$page.url.pathname === base + "/"}>Home</a
            >
            <a
                href="{base}/programmes"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith(
                    base + "/programmes",
                )}>Programmes</a
            >
            <a
                href="{base}/students"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith(base + "/students")}
                >Students</a
            >
            <a
                href="{base}/colleges"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith(base + "/colleges")}
                >Colleges</a
            >
            <a
                href="{base}/chapters"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith(base + "/chapters")}
                >Chapters</a
            >
            <a
                href="{base}/community"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith(
                    base + "/community",
                )}>Community</a
            >

            <div class="mobile-divider"></div>
            <span class="mobile-section-label">Resources</span>
            {#each resourceLinks as link}
                <a
                    href="{base}{link.href}"
                    on:click={closeMenu}
                    class="mobile-resource-link"
                    class:active={$page.url.pathname.startsWith(
                        base + link.href,
                    )}>{link.label}</a
                >
            {/each}

            <div class="mobile-divider"></div>
            <a
                href="{base}/contact"
                on:click={closeMenu}
                class="mobile-cta-link"
                class:active={$page.url.pathname.startsWith(base + "/contact")}
                >Contact Us</a
            >
        </div>
    </div>
{/if}

<style>
    .floating-nav {
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 950px;
        z-index: 1000;
        transition:
            transform 0.3s ease-in-out,
            opacity 0.3s;
    }

    .nav-content {
        background: rgba(10, 10, 10, 0.6);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 100px;
        padding: 0.75rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 700;
        font-family: var(--font-display);
        font-size: 1.1rem;
        z-index: 1001;
        position: relative;
    }

    .links {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }

    .links a {
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
        transition: color 0.2s;
    }

    .links a:hover,
    .links a.active {
        color: var(--text-primary);
    }

    /* RESOURCES DROPDOWN */
    .resources-dropdown {
        position: relative;
    }

    .resources-trigger {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        background: none;
        border: none;
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
        cursor: pointer;
        font-family: inherit;
        padding: 0;
        transition: color 0.2s;
    }

    .resources-trigger:hover,
    .resources-trigger.active {
        color: var(--text-primary);
    }

    .chevron {
        transition: transform 0.2s;
    }
    .chevron.open {
        transform: rotate(180deg);
    }

    .dropdown-panel {
        position: absolute;
        top: calc(100% + 16px);
        left: 50%;
        transform: translateX(-50%);
        min-width: 180px;
        background: rgba(15, 15, 20, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .dropdown-panel a {
        padding: 0.6rem 1rem;
        border-radius: 10px;
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
        transition: all 0.15s;
        text-decoration: none;
    }

    .dropdown-panel a:hover,
    .dropdown-panel a.active {
        background: rgba(255, 255, 255, 0.06);
        color: var(--text-primary);
    }

    .nav-cta {
        background: var(--text-primary);
        color: #000;
        padding: 0.5rem 1.25rem;
        border-radius: 100px;
        font-size: 0.85rem;
        font-weight: 600;
        transition: transform 0.2s;
        text-decoration: none;
    }
    .nav-cta:hover {
        transform: scale(1.05);
    }

    /* Mobile */
    .mobile-only {
        display: none !important;
    }

    .menu-toggle {
        background: none;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        z-index: 1001;
        position: relative;
    }

    .hamburger {
        width: 24px;
        height: 14px;
        position: relative;
    }
    .hamburger span {
        position: absolute;
        height: 2px;
        width: 100%;
        background: var(--text-primary);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .hamburger span:first-child {
        top: 0;
    }
    .hamburger span:last-child {
        bottom: 0;
    }
    .hamburger.open span:first-child {
        transform: rotate(45deg);
        top: 6px;
    }
    .hamburger.open span:last-child {
        transform: rotate(-45deg);
        bottom: 6px;
    }

    /* Mobile Drawer */
    .mobile-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 2000;
    }

    .mobile-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 75%;
        max-width: 320px;
        background: #050505;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 2001;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem;
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
        overflow-y: auto;
    }

    .close-btn {
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            color 0.2s,
            transform 0.2s;
    }
    .close-btn:hover {
        color: var(--text-primary);
        transform: rotate(90deg);
    }
    .close-btn svg {
        width: 32px;
        height: 32px;
    }

    .mobile-links {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
        width: 100%;
    }

    .mobile-links a {
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--text-secondary);
        transition:
            color 0.2s,
            transform 0.2s;
        letter-spacing: 0.02em;
        width: 100%;
        text-decoration: none;
    }

    .mobile-links a:hover,
    .mobile-links a.active {
        color: var(--text-primary);
        transform: translateX(5px);
    }

    .mobile-resource-link {
        font-size: 1.15rem !important;
        opacity: 0.8;
    }

    .mobile-divider {
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
        margin: 0.5rem 0;
    }

    .mobile-section-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-tertiary);
        font-weight: 600;
    }

    .mobile-cta-link {
        color: var(--text-primary) !important;
        font-weight: 600 !important;
    }

    @media (max-width: 900px) {
        .desktop-only {
            display: none;
        }
        .mobile-only {
            display: flex !important;
        }
        .floating-nav {
            top: 16px;
            width: 95%;
        }
    }
</style>
