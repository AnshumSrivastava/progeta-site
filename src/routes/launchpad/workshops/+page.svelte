<script>
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import { upcomingWorkshops } from "$lib/content/workshops-data";
</script>

<svelte:head>
    <title>Workshops | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="Hands-on cybersecurity workshops. Half-day or full-day. Real environments. No prerequisites."
    />
</svelte:head>

<!-- ═══ HERO ═══ -->
<section class="ws-hero">
    <div class="container">
        <ScrollReveal
            ><span class="eyebrow">WORKSHOPS · LAUNCHPAD</span></ScrollReveal
        >
        <ScrollReveal delay={100}
            ><h1 class="ws-hero__heading">
                Get your hands dirty<br />in a day.
            </h1></ScrollReveal
        >
        <ScrollReveal delay={200}
            ><p class="ws-hero__body">
                Workshops are single-day events. Real environments. No
                prerequisites beyond curiosity. You leave with experience, not a
                certificate. Good for testing your interest before committing to
                a full track.
            </p></ScrollReveal
        >
        <ScrollReveal delay={300}>
            <div class="ws-hero__ctas">
                <a href="#upcoming" class="btn-solid"
                    >View upcoming workshops →</a
                >
                <a
                    href="mailto:operations@progeta.tech?subject=Workshop Request"
                    class="btn-ghost">Request for your campus →</a
                >
            </div>
        </ScrollReveal>
    </div>
</section>

<!-- ═══ FORMATS ═══ -->
<section class="ws-formats">
    <div class="container">
        <div class="ws-formats__grid">
            <div class="ws-formats__left">
                <ScrollReveal>
                    <span class="eyebrow">FORMATS</span>
                    <h2 class="section-heading">
                        Three ways to run a workshop.
                    </h2>
                    <p class="section-body">
                        Every workshop is hands-on. The format depends on the
                        depth of material and your available time.
                    </p>
                </ScrollReveal>
            </div>
            <div class="ws-formats__right">
                <div class="format-cards">
                    {#each [{ name: "Half-Day Intensive", meta: "3–4 hours · 1 module · On-campus or virtual", desc: "A focused deep-dive into one module. Best for awareness sessions, club events, or first exposure to a topic." }, { name: "Full-Day Lab", meta: "6–7 hours · 2–3 modules · On-campus preferred", desc: "A structured day of linked modules building toward a single outcome. Closest to a real-day-in-the-life of the role." }, { name: "Custom Workshop", meta: "Duration flexible · Modules chosen with you · Any format", desc: "For institutions or groups with a specific learning objective. We design the module combination around your needs." }] as card, i}
                        <ScrollReveal delay={i * 80}>
                            <div class="format-card">
                                <h3 class="format-name">{card.name}</h3>
                                <span class="format-meta">{card.meta}</span>
                                <p class="format-desc">{card.desc}</p>
                            </div>
                        </ScrollReveal>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ═══ UPCOMING ═══ -->
<section class="ws-upcoming" id="upcoming">
    <div class="container--wide">
        <ScrollReveal>
            <span class="eyebrow">UPCOMING</span>
            <h2 class="section-heading">What's running now.</h2>
        </ScrollReveal>

        {#each upcomingWorkshops as ws, i}
            <ScrollReveal delay={i * 60}>
                <div class="workshop-row">
                    <span class="workshop-date">{ws.date}</span>
                    <div class="workshop-info">
                        <span class="workshop-name"
                            >{ws.name} — {ws.format}</span
                        >
                        <span class="workshop-meta"
                            >{ws.location} · {ws.duration}</span
                        >
                    </div>
                    <div class="workshop-action">
                        <span
                            class="workshop-status"
                            class:open={ws.status === "open"}
                            class:soon={ws.status === "soon"}
                            >{ws.status === "open"
                                ? "● OPEN"
                                : "● REGISTERING SOON"}</span
                        >
                        <a href={ws.registrationLink} class="workshop-register"
                            >{ws.status === "open"
                                ? "Register →"
                                : "Notify me →"}</a
                        >
                    </div>
                </div>
            </ScrollReveal>
        {/each}

        <p class="ws-noshow">
            No workshops showing for your area? <a
                href="mailto:operations@progeta.tech?subject=Workshop Request"
                >Request one. →</a
            >
        </p>
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
    .section-heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(28px, 3.5vw, 40px);
        color: #edf0ff;
        margin-bottom: 14px;
    }
    .section-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        line-height: 1.75;
        max-width: 480px;
    }

    .ws-hero {
        min-height: 52vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
    }
    .ws-hero__heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(44px, 6vw, 68px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 16px;
    }
    .ws-hero__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        max-width: 480px;
        line-height: 1.75;
    }
    .ws-hero__ctas {
        display: flex;
        gap: 12px;
        margin-top: 36px;
        flex-wrap: wrap;
    }
    .btn-solid {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        background: #edf0ff;
        color: #020408;
        padding: 14px 28px;
        border-radius: 4px;
        text-decoration: none;
        transition: opacity 0.2s;
    }
    .btn-solid:hover {
        opacity: 0.88;
    }
    .btn-ghost {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        border: 1px solid #e05c20;
        color: #e05c20;
        padding: 14px 28px;
        border-radius: 4px;
        text-decoration: none;
        background: transparent;
        transition: background 0.2s;
    }
    .btn-ghost:hover {
        background: rgba(224, 92, 32, 0.08);
    }

    /* ── FORMATS ── */
    .ws-formats {
        background: #07090f;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .ws-formats__grid {
        display: grid;
        grid-template-columns: 40% 60%;
        gap: clamp(32px, 4vw, 64px);
    }
    @media (max-width: 768px) {
        .ws-formats__grid {
            grid-template-columns: 1fr;
        }
    }
    .format-cards {
        display: grid;
        gap: 1px;
        background: #0f1220;
    }
    .format-card {
        background: #07090f;
        padding: 28px 24px;
    }
    .format-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 17px;
        color: #edf0ff;
        margin-bottom: 6px;
    }
    .format-meta {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #424870;
        letter-spacing: 0.1em;
        display: block;
        margin-bottom: 10px;
    }
    .format-desc {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        line-height: 1.65;
    }

    /* ── UPCOMING ── */
    .ws-upcoming {
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .workshop-row {
        display: grid;
        grid-template-columns: 140px 1fr auto;
        gap: 0 32px;
        padding: 28px 0;
        border-top: 1px solid #0f1220;
        align-items: center;
    }
    .workshop-row:last-of-type {
        border-bottom: 1px solid #0f1220;
    }
    @media (max-width: 640px) {
        .workshop-row {
            grid-template-columns: 1fr;
            gap: 8px;
        }
    }
    .workshop-date {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #424870;
    }
    .workshop-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: #edf0ff;
        display: block;
        margin-bottom: 6px;
    }
    .workshop-meta {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
    }
    .workshop-action {
        text-align: right;
    }
    .workshop-status {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        display: block;
    }
    .workshop-status.open {
        color: #18c96a;
    }
    .workshop-status.soon {
        color: #424870;
    }
    .workshop-register {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #e05c20;
        text-decoration: none;
        display: block;
        margin-top: 6px;
    }
    .workshop-register:hover {
        text-decoration: underline;
    }
    .ws-noshow {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #8890bb;
        margin-top: 32px;
    }
    .ws-noshow a {
        color: #e05c20;
        text-decoration: none;
    }
    .ws-noshow a:hover {
        text-decoration: underline;
    }
</style>
