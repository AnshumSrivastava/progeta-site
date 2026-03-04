<script lang="ts">
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import CountUp from "$lib/components/animations/CountUp.svelte";

    const filters = [
        "ALL",
        "CAMPUS DRIVE",
        "WORKSHOP",
        "CHAPTER EVENT",
        "FOUNDERS MIXER",
    ];
    let activeFilter = $state("ALL");

    const events = [
        {
            type: "CAMPUS DRIVE",
            name: "LaunchPad Awareness Session — Amity University",
            location: "NOIDA, DELHI NCR · MARCH 2026",
            impact: "340 STUDENTS ATTENDED",
            imageUrl: null, // "https://example.com/image.jpg" when ready
        },
        {
            type: "CHAPTER EVENT",
            name: "Chapter Founding — Chandigarh University",
            location: "CHANDIGARH · FEB 2026",
            impact: "28 FOUNDING MEMBERS",
            imageUrl: null,
        },
        {
            type: "FOUNDERS MIXER",
            name: "InnerCircle Founders Mixer Q1 2026",
            location: "NEW DELHI · MARCH 12, 2026",
            impact: "InnerCircle members only",
            imageUrl: null,
        },
        {
            type: "WORKSHOP",
            name: "Full-Day Network Lab — Vellore Institute",
            location: "VELLORE, TAMIL NADU · JAN 2026",
            impact: "112 STUDENTS",
            imageUrl: null,
        },
        {
            type: "CAMPUS DRIVE",
            name: "LaunchPad + SelfOS Demo — Thapar Institute",
            location: "PATIALA, PUNJAB · DEC 2025",
            impact: "220 STUDENTS ATTENDED",
            imageUrl: null,
        },
        {
            type: "WORKSHOP",
            name: "Dark Web Intelligence — Online",
            location: "VIRTUAL · NOV 2025",
            impact: "84 REGISTERED",
            imageUrl: null,
        },
    ];

    let filteredEvents = $derived(
        activeFilter === "ALL"
            ? events
            : events.filter((e) => e.type === activeFilter),
    );
</script>

<svelte:head>
    <title>Visual Record | Resources | Progeta Technologies</title>
    <meta
        name="description"
        content="A record of every campus drive, workshop, chapter event, and gathering."
    />
</svelte:head>

<!-- ═══════ HERO ═══════ -->
<section class="gal-hero">
    <div class="gal-container">
        <div class="gal-hero-content">
            <span class="gal-eyebrow">VISUAL RECORD · RESOURCES</span>
            <h1 class="gal-heading">
                Where we have been.<br />What we built there.
            </h1>
            <p class="gal-body">
                A record of every campus drive, workshop, chapter event, and
                gathering. Currently documented as data — images will populate
                these entries as third-party integration rolls out.
            </p>

            <!-- Filter Bar -->
            <div class="gal-filters">
                {#each filters as filter}
                    <button
                        class="gal-filter-btn"
                        class:active={activeFilter === filter}
                        onclick={() => (activeFilter = filter)}
                    >
                        {filter}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- ═══════ GALLERY GRID ═══════ -->
<section class="gal-grid-sec">
    <div class="gal-container">
        <ScrollReveal>
            <div class="gallery-grid">
                {#each filteredEvents as entry}
                    <div class="gallery-entry">
                        <!-- IMAGE ZONE -->
                        <div class="gallery-img-zone">
                            {#if entry.imageUrl}
                                <img
                                    src={entry.imageUrl}
                                    alt="{entry.type} — {entry.location}"
                                    loading="lazy"
                                />
                            {/if}

                            <!-- Fallback Coded Graphic (hidden if img exists via CSS :has) -->
                            <div class="gallery-img-zone-inner">
                                <div class="gallery-img-zone-line"></div>
                                <span class="gallery-img-zone-text"
                                    >IMAGE PENDING</span
                                >
                            </div>
                            <div
                                class="gallery-corner gallery-corner--tl"
                            ></div>
                            <div
                                class="gallery-corner gallery-corner--tr"
                            ></div>
                            <div
                                class="gallery-corner gallery-corner--bl"
                            ></div>
                            <div
                                class="gallery-corner gallery-corner--br"
                            ></div>
                        </div>

                        <!-- METADATA -->
                        <div class="gallery-entry-data">
                            <span class="gallery-entry-type">{entry.type}</span>
                            <h3 class="gallery-entry-name">{entry.name}</h3>
                            <span class="gallery-entry-location"
                                >{entry.location}</span
                            >
                            <span class="gallery-entry-impact"
                                >{entry.impact}</span
                            >
                        </div>
                    </div>
                {/each}
            </div>
        </ScrollReveal>
    </div>
</section>

<!-- ═══════ RUNNING TOTALS ═══════ -->
<section class="gal-running-totals">
    <div class="gal-container">
        <ScrollReveal>
            <div class="running-totals-grid">
                <div class="rt-stat">
                    <span class="rt-num"
                        ><CountUp target={15} suffix="+" /></span
                    >
                    <span class="rt-label">Colleges</span>
                </div>
                <div class="rt-stat">
                    <span class="rt-num"
                        ><CountUp target={2500} suffix="+" />
                        end={2500}
                        suffix="+" format={true}
                        /></span
                    >
                    <span class="rt-label">Students</span>
                </div>
                <div class="rt-stat">
                    <span class="rt-num"
                        ><CountUp target={50} suffix="+" /></span
                    >
                    <span class="rt-label">Events</span>
                </div>
                <div class="rt-stat">
                    <span class="rt-num"><CountUp target={12} /></span>
                    <span class="rt-label">Chapters</span>
                </div>
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .gal-container {
        max-width: var(--w-site);
        margin: 0 auto;
        padding: 0 var(--sp-8);
    }

    /* ── HERO ── */
    .gal-hero {
        height: 44vh;
        min-height: 400px;
        display: flex;
        align-items: center;
        background: transparent;
        padding-top: var(--sp-20);
        position: relative;
        z-index: 10;
    }
    .gal-eyebrow {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
        display: block;
        margin-bottom: var(--sp-4);
    }
    .gal-heading {
        font-family: var(--font-serif);
        font-weight: 700;
        font-size: clamp(40px, 5.5vw, 64px);
        line-height: 0.93;
        color: var(--ink-1);
        margin: 0;
    }
    .gal-body {
        font-family: var(--font-body);
        font-weight: 300;
        font-size: 14px;
        line-height: 1.6;
        color: var(--ink-2);
        max-width: 460px;
        margin-top: 16px;
    }

    .gal-filters {
        margin-top: 32px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .gal-filter-btn {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-2);
        border: 1px solid var(--border-2);
        background: transparent;
        padding: 6px 14px;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .gal-filter-btn:hover,
    .gal-filter-btn.active {
        border-color: var(--accent-selfos); /* Blue accent for gallery */
        color: var(--accent-selfos);
    }

    /* ── GALLERY GRID ── */
    .gal-grid-sec {
        padding-bottom: clamp(60px, 8vw, 100px);
        position: relative;
        z-index: 10;
    }
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--border-1);
        margin-top: 40px;
    }

    .gallery-entry {
        background: var(--surface-0);
        display: flex;
        flex-direction: column;
        text-decoration: none;
        transition: background 0.2s ease;
        position: relative;
        overflow: hidden;
    }
    .gallery-entry:hover {
        background: var(--surface-1);
    }
    .gallery-entry::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--accent-selfos); /* Blue */
        transition: width 0.45s cubic-bezier(0.76, 0, 0.24, 1);
        z-index: 2;
    }
    .gallery-entry:hover::before {
        width: 100%;
    }

    /* IMAGE ZONE (Placeholder styling) */
    .gallery-img-zone {
        width: 100%;
        aspect-ratio: 4/3;
        background: var(--surface-1);
        border-bottom: 1px solid var(--border-1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .gallery-img-zone-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        opacity: 0.3;
    }
    .gallery-img-zone-line {
        width: 40px;
        height: 1px;
        background: var(--accent-selfos);
    }
    .gallery-img-zone-text {
        font-family: var(--font-mono);
        font-size: 8px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--accent-selfos);
    }

    /* Corner brackets */
    .gallery-corner {
        position: absolute;
        width: 12px;
        height: 12px;
    }
    .gallery-corner--tl {
        top: 8px;
        left: 8px;
        border-top: 1px solid var(--accent-selfos);
        border-left: 1px solid var(--accent-selfos);
        opacity: 0.4;
    }
    .gallery-corner--tr {
        top: 8px;
        right: 8px;
        border-top: 1px solid var(--accent-selfos);
        border-right: 1px solid var(--accent-selfos);
        opacity: 0.4;
    }
    .gallery-corner--bl {
        bottom: 8px;
        left: 8px;
        border-bottom: 1px solid var(--accent-selfos);
        border-left: 1px solid var(--accent-selfos);
        opacity: 0.4;
    }
    .gallery-corner--br {
        bottom: 8px;
        right: 8px;
        border-bottom: 1px solid var(--accent-selfos);
        border-right: 1px solid var(--accent-selfos);
        opacity: 0.4;
    }

    /* When image exists, hide the fallback UI */
    .gallery-img-zone img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .gallery-img-zone:has(img) .gallery-img-zone-inner {
        display: none;
    }
    .gallery-img-zone:has(img) .gallery-corner {
        display: none;
    }

    /* METADATA */
    .gallery-entry-data {
        padding: 18px 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .gallery-entry-type {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--accent-selfos);
    }
    .gallery-entry-name {
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 15px;
        color: var(--ink-1);
        line-height: 1.25;
        margin: 0 0 2px 0;
    }
    .gallery-entry-location {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        color: var(--ink-3);
    }
    .gallery-entry-impact {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.1em;
        color: var(--accent-innercircle); /* Green indicator of impact */
        margin-top: 4px;
    }

    /* ── RUNNING TOTALS ── */
    .gal-running-totals {
        padding-bottom: clamp(100px, 15vw, 200px);
        position: relative;
        z-index: 10;
    }
    .running-totals-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        background: var(--border-1);
    }
    .rt-stat {
        background: var(--surface-1);
        padding: 32px 24px;
        text-align: center;
    }
    .rt-num {
        display: block;
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: clamp(32px, 4vw, 56px);
        color: var(--ink-1);
        line-height: 1;
    }
    .rt-label {
        display: block;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-top: 12px;
    }

    @media (max-width: 840px) {
        .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 680px) {
        .running-totals-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 520px) {
        .gal-hero {
            height: auto;
            min-height: auto;
            padding-top: var(--sp-28);
            padding-bottom: var(--sp-12);
        }
        .gallery-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
