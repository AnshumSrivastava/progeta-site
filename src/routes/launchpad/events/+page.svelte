<script>
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import { launchpadEvents } from "$lib/content/events-data";

    let activeFilter = "all";
    $: filtered =
        activeFilter === "all"
            ? launchpadEvents
            : launchpadEvents.filter((e) => e.type === activeFilter);
    let expandedEvent = -1;
    function toggleEvent(i) {
        expandedEvent = expandedEvent === i ? -1 : i;
    }
</script>

<svelte:head>
    <title>Events | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="Workshops, campus drives, chapter meetups. See what's happening in LaunchPad."
    />
</svelte:head>

<section class="ev-hero">
    <div class="container">
        <ScrollReveal
            ><span class="eyebrow">EVENTS · LAUNCHPAD</span></ScrollReveal
        >
        <ScrollReveal delay={100}
            ><h1 class="hero-h">What's happening.</h1></ScrollReveal
        >
        <ScrollReveal delay={200}
            ><p class="hero-body">
                Workshops, campus drives, chapter meetups, and the annual
                Founders Mixer. Filter by type or region.
            </p></ScrollReveal
        >
    </div>
</section>

<section class="ev-list">
    <div class="container--wide">
        <div class="filter-bar">
            {#each [{ key: "all", label: "ALL" }, { key: "workshop", label: "WORKSHOP" }, { key: "campus-drive", label: "CAMPUS DRIVE" }, { key: "chapter-event", label: "CHAPTER EVENT" }] as btn}
                <button
                    class="fbtn"
                    class:active={activeFilter === btn.key}
                    on:click={() => (activeFilter = btn.key)}
                    >{btn.label}</button
                >
            {/each}
        </div>

        {#each filtered as event, i (event.name)}
            <ScrollReveal delay={i * 40}>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="ev-row" on:click={() => toggleEvent(i)}>
                    <div class="ev-main">
                        <span class="ev-date">{event.date}</span>
                        <div class="ev-info">
                            <span class="ev-name">{event.name}</span>
                            <span class="ev-meta"
                                ><span class="ev-type">{event.typeLabel}</span>
                                · {event.location}</span
                            >
                        </div>
                        <div class="ev-action">
                            <span
                                class="ev-status"
                                class:s-open={event.status === "open" ||
                                    event.status === "confirmed"}
                                class:s-muted={event.status !== "open" &&
                                    event.status !== "confirmed"}
                                >{event.statusLabel}</span
                            >
                            <a
                                href={event.actionLink}
                                class="ev-link"
                                on:click|stopPropagation>{event.action}</a
                            >
                        </div>
                    </div>
                    {#if expandedEvent === i && event.description}
                        <p class="ev-desc">{event.description}</p>
                    {/if}
                </div>
            </ScrollReveal>
        {/each}
    </div>
</section>

<section class="ev-suggest">
    <div class="container">
        <ScrollReveal>
            <div class="center-block">
                <h2 class="sec-h">Want LaunchPad at your campus?</h2>
                <p class="sec-body">
                    We run campus drives at colleges across India. If you want
                    us at yours, fill in a quick form.
                </p>
                <a
                    href="mailto:operations@progeta.tech?subject=Campus Drive Request"
                    class="cta-link">Request a campus drive →</a
                >
            </div>
        </ScrollReveal>
    </div>
</section>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 64px);
    }
    .container--wide {
        max-width: 1320px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 48px);
    }
    .eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .sec-h {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(28px, 3.5vw, 40px);
        color: #edf0ff;
        margin-bottom: 14px;
    }
    .sec-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        line-height: 1.75;
        max-width: 480px;
    }
    .ev-hero {
        min-height: 36vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 64px);
    }
    .hero-h {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(40px, 5.5vw, 64px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 14px;
    }
    .hero-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        max-width: 480px;
        line-height: 1.65;
    }
    .ev-list {
        background: #020408;
        padding: clamp(40px, 5vw, 64px) 0 clamp(80px, 11vw, 144px);
    }
    .filter-bar {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 36px;
    }
    .fbtn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 7px 14px;
        border: 1px solid #171b30;
        border-radius: 3px;
        background: transparent;
        color: #424870;
        cursor: pointer;
        transition: all 0.18s;
    }
    .fbtn:hover {
        border-color: #e05c20;
        color: #edf0ff;
    }
    .fbtn.active {
        border-color: #e05c20;
        color: #edf0ff;
        background: rgba(224, 92, 32, 0.08);
    }
    .ev-row {
        border-top: 1px solid #0f1220;
        cursor: pointer;
        transition: background 0.2s;
    }
    .ev-row:last-child {
        border-bottom: 1px solid #0f1220;
    }
    .ev-row:hover {
        background: rgba(7, 9, 15, 0.4);
    }
    .ev-main {
        display: grid;
        grid-template-columns: 80px 1fr auto;
        gap: 0 24px;
        padding: 24px 0;
        align-items: center;
    }
    @media (max-width: 640px) {
        .ev-main {
            grid-template-columns: 1fr;
            gap: 8px;
        }
    }
    .ev-date {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
    }
    .ev-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: #edf0ff;
        display: block;
        margin-bottom: 4px;
    }
    .ev-meta {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
    }
    .ev-type {
        padding: 2px 7px;
        border: 1px solid #171b30;
        border-radius: 3px;
    }
    .ev-action {
        text-align: right;
    }
    .ev-status {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        display: block;
    }
    .s-open {
        color: #18c96a;
    }
    .s-muted {
        color: #424870;
    }
    .ev-link {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #e05c20;
        text-decoration: none;
        display: block;
        margin-top: 6px;
    }
    .ev-link:hover {
        text-decoration: underline;
    }
    .ev-desc {
        padding: 0 0 20px 104px;
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #8890bb;
        line-height: 1.65;
    }
    @media (max-width: 640px) {
        .ev-desc {
            padding: 0 0 16px 0;
        }
    }
    .ev-suggest {
        background: #07090f;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .center-block {
        text-align: center;
        max-width: 520px;
        margin: 0 auto;
    }
    .center-block .sec-body {
        max-width: 100%;
        margin: 0 auto;
    }
    .cta-link {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #e05c20;
        text-decoration: none;
        display: inline-block;
        margin-top: 28px;
        letter-spacing: 0.1em;
    }
    .cta-link:hover {
        text-decoration: underline;
    }
</style>
