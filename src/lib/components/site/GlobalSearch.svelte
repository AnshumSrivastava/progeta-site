<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  interface SearchResult {
    title: string;
    type: string;
    href: string;
    description?: string;
  }

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }
  let { isOpen, onClose }: Props = $props();

  let query = $state("");
  let results = $state<SearchResult[]>([]);
  let selectedIndex = $state(0);
  let inputEl = $state<HTMLInputElement>();

  // Expanded index incorporating all LaunchPad directives and site features
  const mockIndex: SearchResult[] = [
    // Products & Core
    {
      title: "SelfOS",
      type: "Product",
      href: "/selfos",
      description: "Local-first personal operating system.",
    },
    {
      title: "InnerCircle",
      type: "Community",
      href: "/innercircle",
      description: "Vetted network for builders.",
    },
    {
      title: "LaunchPad",
      type: "Initiative",
      href: "/launchpad",
      description: "Cybersecurity training and operations hub.",
    },
    {
      title: "Progeta Mission",
      type: "Company",
      href: "/about",
      description: "To help people realise and achieve their dreams and goals.",
    },
    {
      title: "Contact",
      type: "Support",
      href: "/contact",
      description: "Get in touch with Progeta Technologies.",
    },
    {
      title: "Certificate Verification",
      type: "Tool",
      href: "/verify",
      description: "Verify credential authenticity.",
    },

    // LaunchPad Track Detail Pages
    {
      title: "CTI Specialist",
      type: "Track",
      href: "/launchpad/tracks/cti",
      description:
        "Master Cyber Threat Intelligence. Analyze adversaries and TTPs.",
    },
    {
      title: "SOC Analyst",
      type: "Track",
      href: "/launchpad/tracks/soc",
      description:
        "Be the first line of defense. Detect and respond to live threats.",
    },
    {
      title: "DevSecOps Engineer",
      type: "Track",
      href: "/launchpad/tracks/devsecops",
      description: "Build secure pipelines. Automate security in CI/CD.",
    },
    {
      title: "GRC Analyst",
      type: "Track",
      href: "/launchpad/tracks/grc",
      description:
        "Govern, risk, and compliance. Ensure organizational resilience.",
    },
    {
      title: "Penetration Tester",
      type: "Track",
      href: "/launchpad/tracks/pentest",
      description: "Break things to fix them. Offensive security operations.",
    },
    {
      title: "Automation Engineer",
      type: "Track",
      href: "/launchpad/tracks/automation",
      description: "Automate response capability and build scalable defenses.",
    },

    // LaunchPad Hub Pages
    {
      title: "All Programmes",
      type: "LaunchPad",
      href: "/launchpad/programmes",
      description: "Explore all operational programmes and stages.",
    },
    {
      title: "Student Chapters",
      type: "LaunchPad",
      href: "/launchpad/chapters",
      description: "Start a Progeta chapter at your institution.",
    },
    {
      title: "Certifications",
      type: "LaunchPad",
      href: "/launchpad/certifications",
      description: "Verifiable credentials for operational competence.",
    },
    {
      title: "All Tracks",
      type: "LaunchPad",
      href: "/tracks",
      description: "Explore the six operational cybersecurity tracks.",
    },
    {
      title: "Training Modules",
      type: "LaunchPad",
      href: "/modules",
      description: "Individual technical and operational training units.",
    },
    {
      title: "Workshops",
      type: "Learn",
      href: "/launchpad/workshops",
      description: "Deep-dive tactical sessions and hands-on operational labs.",
    },
    {
      title: "Events",
      type: "Community",
      href: "/launchpad/events",
      description: "Meetups, captured flags, and live ops.",
    },
    {
      title: "For Students",
      type: "Audience",
      href: "/launchpad/students",
      description: "Your pathway into the cybersecurity industry.",
    },
    {
      title: "For Colleges",
      type: "Audience",
      href: "/launchpad/colleges",
      description: "Bring Progeta operational training to your campus.",
    },

    // Resources
    {
      title: "Intelligence Briefs",
      type: "Articles",
      href: "/resources/articles",
      description: "Deep tech analysis and operations briefings.",
    },
    {
      title: "Cyber Games",
      type: "Resources",
      href: "/resources/games",
      description: "Interactive operational learning experiences.",
    },
    {
      title: "Event Gallery",
      type: "Resources",
      href: "/resources/gallery",
      description: "Sessions, events, and campus moments.",
    },
    {
      title: "Glossary",
      type: "Resources",
      href: "/resources/glossary",
      description: "Technical and operational terms explained clearly.",
    },
  ];

  const featuredItem = {
    title: "LaunchPad Programmes",
    type: "Live",
    href: "/launchpad/programmes",
    description: "Bridge the education-readiness gap today.",
  };
  const hotItems = [
    { title: "SelfOS v2.1 Alpha", type: "Product", href: "/selfos" },
    { title: "Training Modules", type: "LaunchPad", href: "/modules" },
  ];

  $effect(() => {
    if (isOpen && inputEl) {
      inputEl.focus();
    }
  });

  function handleSearch() {
    if (!query.trim()) {
      results = [];
      return;
    }
    const q = query.toLowerCase();
    results = mockIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)),
    );
    selectedIndex = 0;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % (results.length || 1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex =
        (selectedIndex - 1 + (results.length || 1)) % (results.length || 1);
    }
    if (e.key === "Enter") {
      if (results[selectedIndex]) {
        navigate(results[selectedIndex].href);
      }
    }
  }

  function navigate(href: string) {
    goto(href);
    onClose();
    query = "";
  }

  function handleGlobalKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (isOpen) onClose();
      else {
        // We'll let the parent handle the actual open state toggle if needed,
        // but here we can at least detect it if this component is always mounted
      }
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
  });

  onDestroy(() => {
    if (browser) window.removeEventListener("keydown", handleGlobalKeydown);
  });
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="search-overlay"
    transition:fade={{ duration: 200 }}
    onclick={onClose}
  >
    <div
      class="search-panel"
      transition:fly={{
        y: -20,
        duration: 300,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 4)),
      }}
      onclick={(e) => e.stopPropagation()}
    >
      <div class="search-input-wrap">
        <svg
          class="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          bind:this={inputEl}
          bind:value={query}
          oninput={handleSearch}
          onkeydown={handleKeydown}
          placeholder="Search mission, tracks, resources..."
          type="text"
          class="search-input"
        />
        <div class="search-kbd">ESC</div>
      </div>

      <div class="search-body">
        {#if !query}
          <div class="search-pre">
            <div class="search-section-label">Featured Right Now</div>
            <a
              href={featuredItem.href}
              class="featured-card"
              onclick={() => navigate(featuredItem.href)}
            >
              <div class="result-type result-type--featured">
                {featuredItem.type}
              </div>
              <div class="result-title">{featuredItem.title}</div>
              <div class="result-desc">{featuredItem.description}</div>
            </a>

            <div class="search-section-label">Current Highlights</div>
            <div class="hot-grid">
              {#each hotItems as item}
                <a
                  href={item.href}
                  class="hot-card"
                  onclick={() => navigate(item.href)}
                >
                  <div class="result-type">{item.type}</div>
                  <div class="result-title">{item.title}</div>
                </a>
              {/each}
            </div>
          </div>
        {:else if results.length > 0}
          <div class="search-results">
            {#each results as result, i}
              <a
                href={result.href}
                class="result-item"
                class:active={i === selectedIndex}
                onclick={() => navigate(result.href)}
                onmouseenter={() => (selectedIndex = i)}
              >
                <div class="result-meta">
                  <span class="result-title">{result.title}</span>
                  <span class="result-type">{result.type}</span>
                </div>
                {#if result.description}
                  <div class="result-desc">{result.description}</div>
                {/if}
              </a>
            {/each}
          </div>
        {:else}
          <div class="search-empty">
            No results for "{query}"
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .search-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    justify-content: center;
    padding-top: 80px;
  }

  .search-panel {
    width: 100%;
    max-width: var(--w-wide);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    overflow: hidden;
  }

  .search-input-wrap {
    display: flex;
    align-items: center;
    padding: var(--sp-6) var(--sp-7);
    border-bottom: 1px solid var(--border-1);
    gap: var(--sp-4);
  }

  .search-icon {
    color: var(--ink-3);
  }

  .search-input {
    flex: 1;
    background: none;
    border: none;
    color: var(--ink-1);
    font-family: var(--font-body);
    font-size: 18px;
    outline: none;
  }

  .search-kbd {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-4);
    padding: 2px 6px;
    border: 1px solid var(--border-2);
    border-radius: 2px;
  }

  .search-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--sp-7);
  }

  .search-section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-4);
    margin: var(--sp-6) 0 var(--sp-4);
  }

  .search-section-label:first-child {
    margin-top: 0;
  }

  /* Cards */
  .featured-card {
    display: block;
    background: var(--surface-2);
    padding: var(--sp-6);
    text-decoration: none;
    border: 1px solid var(--border-1);
    transition: border-color 0.2s;
  }

  .featured-card:hover {
    border-color: var(--border-2);
  }

  .hot-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-4);
  }

  .hot-card {
    display: block;
    background: var(--surface-2);
    padding: var(--sp-5);
    text-decoration: none;
    border: 1px solid var(--border-1);
    transition: border-color 0.2s;
  }

  .hot-card:hover {
    border-color: var(--border-2);
  }

  /* Results */
  .result-item {
    display: block;
    padding: var(--sp-5);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: all 0.2s;
  }

  .result-item.active {
    background: var(--surface-2);
    border-left-color: var(--accent-launchpad);
  }

  .result-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .result-title {
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--ink-1);
  }

  .result-type {
    font-family: var(--font-mono);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-3);
    padding: 2px 6px;
    border: 1px solid var(--border-2);
  }

  .result-type--featured {
    color: var(--accent-launchpad);
    border-color: var(--accent-launchpad);
    margin-bottom: var(--sp-2);
    display: inline-block;
  }

  .result-desc {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--ink-3);
    line-height: var(--leading-normal);
  }

  .search-empty {
    padding: var(--sp-10) 0;
    text-align: center;
    color: var(--ink-4);
    font-family: var(--font-mono);
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .search-overlay {
      padding-top: 0;
    }
    .search-panel {
      height: 100vh;
      max-height: 100vh;
      border: none;
    }
    .hot-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
