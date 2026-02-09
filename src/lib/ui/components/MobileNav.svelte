<script>
    import { page } from "$app/stores";
    import { fly, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { base } from "$app/paths";

    let isContentOpen = false;

    function toggleContent() {
        isContentOpen = !isContentOpen;
    }

    function closeContent() {
        isContentOpen = false;
    }

    // Helper to check active state
    $: isActive = (path) =>
        $page.url.pathname === base + path ||
        $page.url.pathname.startsWith(base + path + "/");
</script>

<!-- Content Drawer -->
{#if isContentOpen}
    <div
        class="backdrop"
        on:click={closeContent}
        transition:fade={{ duration: 200 }}
    ></div>
    <div
        class="content-drawer"
        transition:fly={{ y: 300, duration: 300, easing: cubicOut }}
    >
        <div class="drawer-header">
            <h3>Explore Content</h3>
            <button class="close-btn" on:click={closeContent}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="drawer-grid">
            <a
                href="{base}/workshops"
                on:click={closeContent}
                class="drawer-item"
            >
                <div class="icon-box">W</div>
                <span>Workshops</span>
            </a>
            <a
                href="{base}/modules"
                on:click={closeContent}
                class="drawer-item"
            >
                <div class="icon-box">M</div>
                <span>Modules</span>
            </a>
            <a href="{base}/tracks" on:click={closeContent} class="drawer-item">
                <div class="icon-box">T</div>
                <span>Tracks</span>
            </a>
            <a href="{base}/events" on:click={closeContent} class="drawer-item">
                <div class="icon-box">E</div>
                <span>Events</span>
            </a>
            <a
                href="{base}/about"
                on:click={closeContent}
                class="drawer-item secondary"
            >
                <span>About</span>
            </a>
            <a
                href="{base}/community"
                on:click={closeContent}
                class="drawer-item secondary"
            >
                <span>Community</span>
            </a>
            <a
                href="{base}/pricing"
                on:click={closeContent}
                class="drawer-item secondary"
            >
                <span>Pricing</span>
            </a>
        </div>
    </div>
{/if}

<nav class="mobile-nav">
    <a
        href="{base}/"
        class="nav-item"
        class:active={$page.url.pathname === base + "/"}
    >
        <div class="icon">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        </div>
        <span>Home</span>
    </a>

    <a
        href="{base}/articles"
        class="nav-item"
        class:active={isActive("/articles")}
    >
        <div class="icon">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                ></path>
            </svg>
        </div>
        <span>Knowledge</span>
    </a>

    <button
        class="nav-item center-btn"
        class:active={isContentOpen}
        on:click={toggleContent}
    >
        <div class="circle">
            <div class="icon-wrapper">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            </div>
            <span>Content</span>
        </div>
    </button>

    <a href="{base}/games" class="nav-item" class:active={isActive("/games")}>
        <div class="icon">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M6 12h4m-2-2v4"></path>
                <line x1="15" y1="11" x2="15.01" y2="11"></line>
                <line x1="18" y1="13" x2="18.01" y2="13"></line>
            </svg>
        </div>
        <span>Games</span>
    </a>

    <a
        href="{base}/contact"
        class="nav-item"
        class:active={isActive("/contact")}
    >
        <div class="icon">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        </div>
        <span>Contact</span>
    </a>
</nav>

<style>
    .mobile-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px; /* Increased height for breathiness */
        background: rgba(10, 10, 10, 0.85); /* Slightly more transparent */
        backdrop-filter: blur(16px);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 1000;
        padding-bottom: 20px; /* More safe area / whitespace */
        padding-left: 1rem;
        padding-right: 1rem;
        box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        text-decoration: none;
        border: none;
        background: none;
        transition: color 0.2s;
        width: 60px; /* Fixed width for touch target */
    }

    .nav-item span {
        display: none; /* Hide labels for minimalism */
    }

    .nav-item .icon {
        width: 24px;
        height: 24px;
        margin-bottom: 0;
    }

    .nav-item.active {
        color: var(--text-primary);
    }

    .nav-item.active .icon {
        filter: drop-shadow(0 0 8px rgba(var(--text-primary-rgb), 0.5));
    }

    /* Center Button (Content) */
    .center-btn {
        margin-bottom: 0; /* Remove push up */
    }

    .center-btn .circle {
        width: 100%;
        height: 100%;
        background: transparent;
        color: var(--text-secondary);
        border-radius: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        border: none;
        transition: color 0.2s;
        gap: 4px;
    }

    .center-btn.active .circle,
    .center-btn:active .circle {
        transform: none;
    }

    .center-btn .icon-wrapper {
        width: 24px;
        height: 24px;
    }

    .center-btn.active .circle {
        color: var(--text-primary);
    }

    .center-btn.active .icon-wrapper {
        filter: drop-shadow(0 0 8px rgba(var(--text-primary-rgb), 0.5));
    }

    /* Drawer */
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1001;
        backdrop-filter: blur(4px);
    }

    .content-drawer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #111;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        z-index: 1002;
        padding: 24px;
        padding-bottom: 100px; /* Space for nav bar */
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .drawer-header h3 {
        font-family: var(--font-display);
        font-size: 1.25rem;
        margin: 0;
    }

    .close-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        width: 32px;
        height: 32px;
    }

    .drawer-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .drawer-item {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: var(--text-primary);
        transition: background 0.2s;
    }

    .drawer-item:active {
        background: rgba(255, 255, 255, 0.08);
    }

    .drawer-item .icon-box {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-family: var(--font-display);
    }

    .drawer-item.secondary {
        flex-direction: row;
        padding: 12px 16px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .drawer-item.secondary span {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    /* Media query to hide on desktop */
    @media (min-width: 900px) {
        .mobile-nav {
            display: none;
        }
    }

    @media (max-width: 899px) {
        .mobile-nav {
            display: flex;
        }
    }
</style>
