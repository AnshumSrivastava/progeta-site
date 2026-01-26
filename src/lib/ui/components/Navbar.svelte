<script>
    import { page } from "$app/stores";
</script>

<nav
    class="floating-nav"
    class:hidden={$page.url.pathname.startsWith("/games/")}
>
    <div class="nav-content">
        <!-- Brand -->
        <a href="/" class="brand">
            <img
                src="/logo_icon.svg"
                alt="Progeta Technologies"
                style="height:28px;"
            />
        </a>

        <!-- Links -->
        <div class="links">
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

        <!-- CTA -->
        <div class="cta-wrapper">
            <a href="/contact" class="nav-cta">Contact Us</a>
        </div>
    </div>
</nav>

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

    .floating-nav.hidden {
        transform: translate(-50%, -150%);
        opacity: 0;
        pointer-events: none;
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

    @media (max-width: 900px) {
        .links {
            display: none;
        }
        .floating-nav {
            top: 16px;
            width: 95%;
        }
    }
</style>
