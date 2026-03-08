<script>
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";

    let openFaq = -1;
    function toggleFaq(i) {
        openFaq = openFaq === i ? -1 : i;
    }

    const faqs = [
        {
            q: "Do I need prior cybersecurity knowledge to start?",
            a: "For most tracks, no. SOC Operations and GRC are both designed for students with no cybersecurity background. Penetration Testing and Security Automation require some technical foundation — we specify this clearly on each track page.",
        },
        {
            q: "How much time does a track require each week?",
            a: "Most students spend 8–12 hours per week on their track. It is designed to run alongside your college schedule, not replace it.",
        },
        {
            q: "Is the credential recognised by employers?",
            a: "It is a Progeta Technologies credential — not affiliated with ISACA, CompTIA, or ISC2. What it signals is demonstrated operational skill in a specific domain. It is verifiable by any employer at progeta.tech/verify. Several of our graduates have used it to secure interviews at security firms. We will not make guarantees we cannot keep.",
        },
        {
            q: "What is the cost?",
            a: "Track pricing is shared when you get in touch. Some scholarships are available for students demonstrating financial need. We don't post pricing publicly because the arrangement depends on your institution's involvement.",
        },
        {
            q: "Can I do a workshop before committing to a full track?",
            a: "Yes. Workshops are standalone. They are specifically designed for students who want to test their interest before committing six months.",
        },
        {
            q: "What happens after I complete a track?",
            a: "You receive your verifiable credential, a post-completion career guidance session, and an invitation to apply to InnerCircle if you want to stay connected to the network.",
        },
    ];
</script>

<svelte:head>
    <title>For Students | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="Your path to becoming a cybersecurity operator. Start with a workshop or commit to a track."
    />
</svelte:head>

<section class="st-hero">
    <div class="container">
        <ScrollReveal
            ><span class="eyebrow">FOR STUDENTS · LAUNCHPAD</span></ScrollReveal
        >
        <ScrollReveal delay={100}
            ><h1 class="hero-h">
                You don't need permission<br />to become
                <span class="ember">dangerous</span> at this.
            </h1></ScrollReveal
        >
        <ScrollReveal delay={200}
            ><p class="hero-body">
                LaunchPad is for students who want to be ready when they
                graduate — not surprised. Whether you start with a single
                workshop or commit to a full track, the path is yours to build.
            </p></ScrollReveal
        >
        <ScrollReveal delay={300}
            ><a href="/tracks" class="btn-solid">See all tracks →</a
            ></ScrollReveal
        >
    </div>
</section>

<section class="st-entry">
    <div class="container--wide">
        {#each [{ label: "NOT SURE YET", body: "Start with a workshop. A single day. No commitment. See if this is the kind of work you want to do.", cta: "View upcoming workshops →", link: "/launchpad/workshops" }, { label: "READY TO COMMIT", body: "Pick a track. Six months. A specific role in cybersecurity. A credential at the end that employers can verify.", cta: "Choose a track →", link: "/tracks" }, { label: "ALREADY EXPERIENCED", body: "Go straight to the module catalog. Find the modules you haven't covered. See what tracks you're already partway through.", cta: "Browse modules →", link: "/modules" }] as strip, i}
            <ScrollReveal delay={i * 60}>
                <a href={strip.link} class="entry-strip">
                    <span class="entry-label">{strip.label}</span>
                    <p class="entry-body">{strip.body}</p>
                    <span class="entry-cta">{strip.cta}</span>
                </a>
            </ScrollReveal>
        {/each}
    </div>
</section>

<section class="st-faq">
    <div class="container--narrow">
        <ScrollReveal>
            <span class="eyebrow">FREQUENTLY ASKED</span>
            <h2 class="sec-h">Common questions.</h2>
        </ScrollReveal>
        <div class="faq-list">
            {#each faqs as faq, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="faq-item" class:open={openFaq === i}>
                    <div class="faq-q" on:click={() => toggleFaq(i)}>
                        <span class="faq-text">{faq.q}</span>
                        <span class="faq-icon" class:rotated={openFaq === i}>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"><path d="M6 9l6 6 6-6" /></svg
                            >
                        </span>
                    </div>
                    {#if openFaq === i}
                        <p class="faq-a">{faq.a}</p>
                    {/if}
                </div>
            {/each}
        </div>
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
    .container--narrow {
        max-width: 720px;
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 64px);
    }
    .eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-3);
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
    .ember {
        color: #e05c20;
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
        display: inline-block;
        margin-top: 36px;
        transition: opacity 0.2s;
    }
    .btn-solid:hover {
        opacity: 0.88;
    }

    .st-hero {
        min-height: 52vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
    }
    .hero-h {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(40px, 5.5vw, 64px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 16px;
    }
    .hero-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        max-width: 520px;
        line-height: 1.75;
    }

    .st-entry {
        background: var(--ground);
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .entry-strip {
        display: grid;
        grid-template-columns: 160px 1fr auto;
        gap: 0 32px;
        padding: 32px 0;
        border-top: 1px solid #0f1220;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        transition: background 0.2s;
        align-items: center;
    }
    .entry-strip:last-child {
        border-bottom: 1px solid #0f1220;
    }
    .entry-strip::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: #e05c20;
        transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .entry-strip:hover::before {
        width: 100%;
    }
    .entry-strip:hover {
        background: rgba(12, 14, 24, 0.4);
    }
    @media (max-width: 768px) {
        .entry-strip {
            grid-template-columns: 1fr;
            gap: 8px;
        }
    }
    .entry-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e05c20;
    }
    .entry-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: var(--ink-2);
        line-height: 1.7;
    }
    .entry-cta {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #e05c20;
        letter-spacing: 0.1em;
    }

    .st-faq {
        background: var(--ground);
        padding: 0 0 clamp(80px, 11vw, 144px);
    }
    .faq-list {
        margin-top: 32px;
        border-top: 1px solid #0f1220;
    }
    .faq-item {
        border-bottom: 1px solid #0f1220;
    }
    .faq-q {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        cursor: pointer;
    }
    .faq-text {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 15px;
        color: #edf0ff;
    }
    .faq-icon {
        color: var(--ink-3);
        transition: transform 0.2s;
        display: flex;
        align-items: center;
    }
    .faq-icon.rotated {
        transform: rotate(180deg);
    }
    .faq-a {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: var(--ink-2);
        line-height: 1.75;
        padding: 0 0 20px;
        max-width: 600px;
    }
</style>
