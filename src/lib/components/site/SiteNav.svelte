<script lang="ts">
  import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";
  import BrandMark from "./BrandMark.svelte";
  import GlobalSearch from "./GlobalSearch.svelte";

  let scrolled = $state(false);
  let mobileOpen = $state(false);
  let searchOpen = $state(false);
  let activeDropdown = $state<string | null>(null);

  /* ── NAV STRUCTURE (v4.0: 5 groups) ──────── */
  const navGroups = [
    { label: "Mission", href: "/about" },
    {
      label: "LaunchPad",
      dropdown: "launchpad",
      description:
        "Bridging the skill gap between education and readiness through immersive programmes, tracks, and certifications.",
      columns: [
        {
          heading: "Programmes",
          links: [
            { label: "All Programmes", href: "/launchpad/programmes" },
            { label: "Student Chapters", href: "/launchpad/chapters" },
            { label: "Certifications", href: "/launchpad/certifications" },
          ],
        },
        {
          heading: "Tracks",
          links: [
            { label: "CTI Specialist", href: "/launchpad/tracks/cti" },
            { label: "SOC Analyst", href: "/launchpad/tracks/soc" },
            {
              label: "DevSecOps Engineer",
              href: "/launchpad/tracks/devsecops",
            },
            { label: "GRC Analyst", href: "/launchpad/tracks/grc" },
            { label: "Penetration Tester", href: "/launchpad/tracks/pentest" },
            {
              label: "Automation Engineer",
              href: "/launchpad/tracks/automation",
            },
          ],
        },
        {
          heading: "Pathways",
          links: [
            { label: "For Students", href: "/launchpad/students" },
            { label: "For Colleges", href: "/launchpad/colleges" },
          ],
        },
        {
          heading: "Learn",
          links: [
            { label: "Modules", href: "/modules" },
            { label: "Workshops", href: "/launchpad/workshops" },
            { label: "Events", href: "/launchpad/events" },
          ],
        },
      ],
    },
    {
      label: "Initiatives",
      dropdown: "products",
      items: [
        {
          name: "SelfOS",
          desc: "A local-first personal operating system for your life.",
          href: "/selfos",
          accent: "var(--accent-selfos)",
        },
      ],
    },
    {
      label: "Community",
      dropdown: "community",
      items: [
        {
          name: "InnerCircle",
          desc: "A vetted circle for people serious about their time.",
          href: "/innercircle",
          accent: "var(--accent-innercircle)",
        },
        {
          name: "Events",
          desc: "Live sessions, workshops, and gatherings.",
          href: "/launchpad/events",
          accent: "",
        },
      ],
    },
    {
      label: "Resources",
      dropdown: "resources",
      items: [
        {
          name: "Articles",
          desc: "Intelligence Briefs on tech, security, and leadership.",
          href: "/resources/articles",
          accent: "",
        },
        {
          name: "Simulations",
          desc: "Interactive security environments.",
          href: "/resources/simulations",
          accent: "",
        },
        {
          name: "Gallery",
          desc: "Sessions, events, and campus moments.",
          href: "/resources/gallery",
          accent: "",
        },
        {
          name: "Glossary",
          desc: "Technical terms explained clearly.",
          href: "/resources/glossary",
          accent: "",
        },
      ],
    },
  ];

  function handleScroll() {
    scrolled = window.scrollY > 80;
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  function toggleMobile() {
    mobileOpen = !mobileOpen;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }

  function closeMobile() {
    mobileOpen = false;
    document.body.style.overflow = "";
  }

  function isActive(href: string, pathname: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function isGroupActive(group: any, pathname: string): boolean {
    if (group.href) return isActive(group.href, pathname);
    if (group.dropdown === "launchpad")
      return pathname.startsWith("/launchpad");
    if (group.dropdown === "products") return pathname.startsWith("/selfos");
    if (group.dropdown === "community")
      return pathname.startsWith("/innercircle");
    if (group.dropdown === "resources")
      return pathname.startsWith("/resources");
    return false;
  }

  let mobileExpanded = $state<string | null>(null);
  function toggleMobileSection(key: string) {
    mobileExpanded = mobileExpanded === key ? null : key;
  }
</script>

<nav class="nav" class:nav--scrolled={scrolled}>
  <div class="nav__inner">
    <div class="nav__brand">
      <BrandMark size="sm" href="/" />
    </div>

    <div class="nav__links">
      {#each navGroups as group}
        {#if group.dropdown}
          <div
            class="nav__dropdown-wrap"
            role="group"
            onmouseenter={() => (activeDropdown = group.dropdown ?? null)}
            onmouseleave={() => (activeDropdown = null)}
          >
            <button
              class="nav__link"
              class:nav__link--active={isGroupActive(group, $page.url.pathname)}
              aria-expanded={activeDropdown === group.dropdown}
            >
              {group.label}
            </button>

            {#if activeDropdown === group.dropdown}
              <div class="mega">
                <div class="mega__inner">
                  {#if group.dropdown === "launchpad" && group.columns}
                    <!-- LaunchPad: description + columns layout -->
                    <div class="mega__launchpad">
                      <div class="mega__desc-col">
                        <p class="mega__desc-text">{group.description}</p>
                        <a
                          href="/launchpad"
                          class="mega__hub-link"
                          onclick={() => (activeDropdown = null)}
                        >
                          LaunchPad Hub →
                        </a>
                      </div>
                      {#each group.columns as col}
                        <div class="mega__col">
                          <span class="mega__col-heading">{col.heading}</span>
                          {#each col.links as link}
                            <a
                              href={link.href}
                              class="mega__col-link"
                              onclick={() => (activeDropdown = null)}
                            >
                              {link.label}
                            </a>
                          {/each}
                        </div>
                      {/each}
                    </div>
                  {:else if group.items}
                    <!-- Products / Community / Resources: item cards -->
                    <div
                      class="mega__items"
                      style="grid-template-columns: repeat({Math.min(
                        group.items.length,
                        4,
                      )}, 1fr);"
                    >
                      {#each group.items as item}
                        <a
                          href={item.href}
                          class="mega__item"
                          onclick={() => (activeDropdown = null)}
                        >
                          {#if item.accent}
                            <span
                              class="mega__accent"
                              style="background: {item.accent}"
                            ></span>
                          {/if}
                          <span class="mega__name">{item.name}</span>
                          <span class="mega__item-desc">{item.desc}</span>
                        </a>
                      {/each}
                      {#if group.dropdown === "products"}
                        <div class="mega__ghost">
                          <span class="mega__ghost-text">More coming.</span>
                        </div>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <a
            href={group.href}
            class="nav__link"
            class:nav__link--active={isActive(
              group.href ?? "",
              $page.url.pathname,
            )}
          >
            {group.label}
          </a>
        {/if}
      {/each}

      <!-- Search icon -->
      <button
        class="nav__search"
        aria-label="Search (Ctrl+K)"
        onclick={() => (searchOpen = true)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>

      <a href="/contact" class="nav__contact">Contact</a>
    </div>

    <button class="nav__hamburger" onclick={toggleMobile} aria-label="Menu">
      <div class="hamburger-icon" class:open={mobileOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </div>
</nav>

<GlobalSearch isOpen={searchOpen} onClose={() => (searchOpen = false)} />

<!-- Mobile drawer -->
{#if mobileOpen}
  <div class="overlay" onclick={closeMobile} aria-hidden="true"></div>
  <aside class="drawer">
    <div class="drawer__items">
      {#each navGroups as group}
        {#if group.dropdown}
          <div class="drawer__group">
            <button
              class="drawer__label"
              onclick={() => toggleMobileSection(group.dropdown ?? "")}
            >
              {group.label}
              <span
                class="drawer__chevron"
                class:drawer__chevron--open={mobileExpanded === group.dropdown}
                >▾</span
              >
            </button>
            {#if mobileExpanded === group.dropdown}
              <div class="drawer__sub">
                {#if group.dropdown === "launchpad" && group.columns}
                  <a
                    href="/launchpad"
                    class="drawer__item"
                    onclick={closeMobile}>Hub</a
                  >
                  {#each group.columns as col}
                    {#each col.links as link}
                      <a
                        href={link.href}
                        class="drawer__item"
                        onclick={closeMobile}>{link.label}</a
                      >
                    {/each}
                  {/each}
                {:else if group.items}
                  {#each group.items as item}
                    <a
                      href={item.href}
                      class="drawer__item"
                      onclick={closeMobile}>{item.name}</a
                    >
                  {/each}
                {/if}
              </div>
            {/if}
          </div>
        {:else}
          <a
            href={group.href}
            class="drawer__item drawer__item--top"
            onclick={closeMobile}>{group.label}</a
          >
        {/if}
      {/each}
    </div>
    <div class="drawer__bottom">
      <a href="/contact" class="drawer__cta" onclick={closeMobile}>Contact</a>
    </div>
  </aside>
{/if}

<style>
  /* ── NAV BAR ─────────────────────────────── */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 72px;
    transition: all 350ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
    background: transparent;
    border-bottom: 1px solid transparent;
  }

  .nav--scrolled {
    background: rgba(26, 29, 38, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-1);
  }

  .nav__inner {
    max-width: var(--w-full);
    margin: 0 auto;
    padding: 0 var(--sp-8);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__brand {
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav__links {
    display: flex;
    align-items: center;
    gap: var(--sp-7);
  }

  .nav__dropdown-wrap {
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
  }

  .nav__link {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-3);
    background: none;
    border: none;
    cursor: none;
    transition: color 0.3s ease;
    padding: 0;
    text-decoration: none;
    position: relative;
  }

  .nav__link:hover,
  .nav__link--active {
    color: #ffffff;
  }

  .nav__link::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--ink-1);
    transition: width 0.3s ease;
  }

  .nav__link:hover::after,
  .nav__link--active::after {
    width: 100%;
  }

  .nav__search {
    background: none;
    border: none;
    color: var(--ink-3);
    cursor: none;
    padding: 4px;
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }

  .nav__search:hover {
    color: var(--ink-1);
  }

  .nav__contact {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-2);
    padding: 8px 16px;
    border: 1px solid var(--border-2);
    transition: all 0.2s;
    text-decoration: none;
  }

  .nav__contact:hover {
    color: var(--ink-1);
    border-color: var(--ink-1);
    background: rgba(255, 255, 255, 0.05);
  }

  /* ── MEGA DROPDOWN ───────────────────────── */
  .mega {
    position: absolute;
    top: 72px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - var(--sp-8) * 2);
    max-width: var(--w-wide);
    background: var(--surface-1);
    border-bottom: 1px solid var(--border-1);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    z-index: 10;
    overflow: hidden;
    animation: megaIn 200ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
  }

  @keyframes megaIn {
    from {
      opacity: 0;
      transform: translate(-50%, -8px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  .mega__inner {
    padding: var(--sp-7);
  }

  /* LaunchPad mega layout */
  .mega__launchpad {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.5fr 1fr;
    gap: var(--sp-7);
  }

  .mega__desc-col {
    display: flex;
    flex-direction: column;
    gap: var(--sp-5);
  }

  .mega__desc-text {
    font-size: var(--text-sm);
    color: var(--ink-3);
    line-height: var(--leading-normal);
    max-width: none;
    margin: 0;
  }

  .mega__hub-link {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--accent-launchpad);
    text-decoration: none;
    transition: color 0.2s;
  }

  .mega__hub-link:hover {
    color: var(--accent-launchpad-h);
  }

  .mega__col {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }

  .mega__col-heading {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-4);
    margin-bottom: var(--sp-2);
  }

  .mega__col-link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--ink-2);
    text-decoration: none;
    padding: var(--sp-1) 0;
    transition: color 0.2s;
  }

  .mega__col-link:hover {
    color: var(--ink-1);
  }

  /* Products / Community / Resources mega */
  .mega__items {
    display: grid;
    gap: 1px;
    background: var(--border-1);
  }

  .mega__item {
    background: var(--surface-1);
    padding: var(--sp-6);
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    text-decoration: none;
    transition: background 0.3s;
  }

  .mega__item:hover {
    background: var(--surface-2);
  }

  .mega__accent {
    width: 32px;
    height: 1px;
    margin-bottom: var(--sp-1);
    transition: transform 0.3s;
  }

  .mega__item:hover .mega__accent {
    transform: scaleX(2);
    transform-origin: left;
  }

  .mega__name {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--ink-1);
    letter-spacing: var(--tracking-tight);
  }

  .mega__item-desc {
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--ink-3);
    line-height: var(--leading-normal);
  }

  .mega__ghost {
    background: var(--surface-1);
    padding: var(--sp-6);
    display: flex;
    align-items: center;
  }

  .mega__ghost-text {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
    font-style: italic;
  }

  /* ── HAMBURGER ───────────────────────────── */
  .nav__hamburger {
    display: none;
    background: none;
    border: none;
    cursor: none;
    padding: 10px;
    z-index: 2000;
  }

  .hamburger-icon {
    width: 24px;
    height: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hamburger-icon span {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--ink-1);
    transition:
      transform 0.3s,
      opacity 0.3s;
  }

  .hamburger-icon.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  .hamburger-icon.open span:nth-child(2) {
    opacity: 0;
  }
  .hamburger-icon.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* ── MOBILE DRAWER ───────────────────────── */
  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 85%;
    max-width: 360px;
    height: 100%;
    background: var(--surface-2);
    z-index: 1500;
    display: flex;
    flex-direction: column;
    padding: var(--sp-10) var(--sp-7);
    border-left: 1px solid var(--border-1);
    animation: drawerIn 0.4s var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
  }

  @keyframes drawerIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 1400;
  }

  .drawer__items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    overflow-y: auto;
  }

  .drawer__group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--sp-3);
  }

  .drawer__label {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    color: var(--ink-3);
    letter-spacing: var(--tracking-wide);
    background: none;
    border: none;
    cursor: none;
    text-align: left;
    padding: var(--sp-2) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .drawer__chevron {
    font-size: 10px;
    transition: transform 0.2s;
  }

  .drawer__chevron--open {
    transform: rotate(180deg);
  }

  .drawer__sub {
    display: flex;
    flex-direction: column;
    padding-left: var(--sp-4);
    gap: var(--sp-1);
    margin-top: var(--sp-2);
  }

  .drawer__item {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--ink-2);
    text-decoration: none;
    padding: var(--sp-2) 0;
    transition: color 0.2s;
  }

  .drawer__item:hover {
    color: var(--ink-1);
  }

  .drawer__item--top {
    font-size: 18px;
    color: var(--ink-1);
  }

  .drawer__bottom {
    margin-top: auto;
    padding-top: var(--sp-6);
  }

  .drawer__cta {
    display: block;
    width: 100%;
    background: var(--ink-1);
    color: var(--ground);
    text-align: center;
    padding: var(--sp-4);
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    text-decoration: none;
  }

  @media (max-width: 1024px) {
    .nav {
      height: 60px;
    }
    .nav__links {
      display: none;
    }
    .nav__hamburger {
      display: block;
    }
  }
</style>
