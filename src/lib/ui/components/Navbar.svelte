<script>
    import { page } from "$app/stores";
    import { fly, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let isMenuOpen = false;

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
</script>

<nav class="floating-nav">
    <div class="nav-content">
        <!-- Brand -->
        <a href="/" class="brand" on:click={closeMenu}>
            <img
                src="/logo_icon.svg"
                alt="Progeta Technologies"
                style="height:28px;"
            />
        </a>

        <!-- Desktop Links -->
        <div class="links desktop-only">
            <a
                href="/tracks"
                class:active={$page.url.pathname.startsWith("/tracks")}
                >Tracks</a
            >
            <a
                href="/modules"
                class:active={$page.url.pathname.startsWith("/modules")}
                >Modules</a
            >
            <a
                href="/workshops"
                class:active={$page.url.pathname.startsWith("/workshops")}
                >Workshops</a
            >
            <a
                href="/events"
                class:active={$page.url.pathname.startsWith("/events")}
                >Events</a
            >
            <a
                href="/games"
                class:active={$page.url.pathname.startsWith("/games")}>Games</a
            >
            <a
                href="/pricing"
                class:active={$page.url.pathname.startsWith("/pricing")}
                >Pricing</a
            >
            <a
                href="/community"
                class="nav-icon"
                class:active={$page.url.pathname.startsWith("/community")}>?</a
            >
        </div>

        <!-- Desktop CTA -->
        <div class="cta-wrapper desktop-only">
            <a href="/contact" class="nav-cta">Contact Us</a>
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
        transition:fade={{ duration: 200 }}
    ></div>

    <!-- Side Drawer -->
    <div
        class="mobile-drawer"
        transition:fly={{ x: 300, duration: 300, easing: cubicOut }}
    >
        <!-- Close Button (Inside Drawer) -->
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
                href="/"
                on:click={closeMenu}
                class:active={$page.url.pathname === "/"}>Home</a
            >
            <a
                href="/tracks"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/tracks")}
                >Tracks</a
            >
            <a
                href="/modules"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/modules")}
                >Modules</a
            >
            <a
                href="/workshops"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/workshops")}
                >Workshops</a
            >
            <a
                href="/events"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/events")}
                >Events</a
            >
            <a
                href="/games"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/games")}>Games</a
            >
            <a
                href="/pricing"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/pricing")}
                >Pricing</a
            >
            <a
                href="/community"
                on:click={closeMenu}
                class:active={$page.url.pathname.startsWith("/community")}
                >Community</a
            >
        </div>
        <!-- Removed CTA as requested -->
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
        border-radius: 100px; /* Full Pill */
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
        z-index: 1001; /* Above mobile menu overlay */
        position: relative;
    }

    .links {
        display: flex;
        gap: 1.75rem;
    }

    .links a {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: 500;
        transition: color 0.2s;
    }

    .links a:hover,
    .links a.active {
        color: var(--text-primary);
    }

    .nav-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        font-family: var(--font-mono);
        color: var(--text-secondary);
        font-weight: 700;
        transition: all 0.2s;
    }
    .nav-icon:hover,
    .nav-icon.active {
        background: var(--text-primary);
        color: #000 !important;
        transform: scale(1.1);
    }

    .nav-cta {
        background: var(--text-primary);
        color: #000;
        padding: 0.5rem 1.25rem;
        border-radius: 100px;
        font-size: 0.9rem;
        font-weight: 600;
        transition: transform 0.2s;
    }

    .nav-cta:hover {
        transform: scale(1.05);
    }

    /* Mobile Menu Styles */
    .mobile-only {
        display: none !important;
    }

    /* Hamburger Button */
    .menu-toggle {
        background: none;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        /* display: flex; REMOVED to let mobile-only handle it */
        align-items: center;
        justify-content: center;
        z-index: 1001; /* Keeping it above everything */
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

    /* Side Drawer Styles */
    .mobile-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 2000; /* Above floating nav (1000) */
    }

    .mobile-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 75%;
        max-width: 320px;
        background: #050505; /* Solid dark background */
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 2001; /* Above backdrop */
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem;
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
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
        align-items: flex-start; /* Left align looks cleaner in drawer */
        gap: 1.5rem; /* Reduced gap */
        width: 100%;
    }

    .mobile-links a {
        font-family: var(--font-display);
        font-size: 1.5rem; /* Smaller, cleaner font size */
        font-weight: 500;
        color: var(--text-secondary);
        transition:
            color 0.2s,
            transform 0.2s;
        letter-spacing: 0.02em;
        width: 100%;
    }

    .mobile-links a:hover,
    .mobile-links a.active {
        color: var(--text-primary);
        transform: translateX(5px); /* Slide right slightly on hover */
    }

    /* .btn-mobile-cta removed */

    @media (max-width: 900px) {
        .desktop-only {
            display: none;
        }

        .mobile-only {
            display: flex !important; /* Show hamburger */
        }

        .floating-nav {
            top: 16px;
            width: 95%;
        }
    }
</style>
