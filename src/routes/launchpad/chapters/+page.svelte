<script>
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
</script>

<svelte:head>
    <title>Student Chapters | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="Start a Student Chapter on your campus. Build something that outlasts you."
    />
</svelte:head>

<!-- ═══ HERO ═══ -->
<section class="ch-hero">
    <div class="container">
        <ScrollReveal
            ><span class="eyebrow">CHAPTERS · LAUNCHPAD</span></ScrollReveal
        >
        <ScrollReveal delay={100}
            ><h1 class="ch-hero__heading">
                Build something<br />that outlasts you.
            </h1></ScrollReveal
        >
        <ScrollReveal delay={200}
            ><p class="ch-hero__body">
                A Student Chapter is a permanent LaunchPad organisation on your
                campus. You start it. You run it. When you graduate, you hand it
                to the next person. Progeta Technologies gives you the
                infrastructure. You bring the initiative.
            </p></ScrollReveal
        >
        <ScrollReveal delay={300}
            ><a href="#chapter-form" class="btn-solid"
                >Start a chapter at your college →</a
            ></ScrollReveal
        >
    </div>
</section>

<!-- ═══ WHAT A CHAPTER IS ═══ -->
<section class="ch-about">
    <div class="container--narrow">
        <ScrollReveal>
            <p class="ch-prose">
                A Student Chapter is not a club. It is an organisation with a
                specific mandate: to bring LaunchPad's resources to every
                motivated student on your campus who wants them. It runs events,
                workshops, and study groups. It connects members to the broader
                LaunchPad network. It competes in national chapter competitions.
            </p>
            <p class="ch-prose">
                Chapter leaders receive direct training from Progeta
                Technologies — how to run an event, how to manage a team, how to
                grow membership, and how to maintain standards. This training is
                not theoretical. It is the same frameworks used to run the
                LaunchPad programme itself.
            </p>
            <p class="ch-prose">
                Most importantly: a chapter outlasts its founders. When you
                leave, the chapter continues. The work you do in your first
                semester becomes the infrastructure that serves students three
                years from now. That is the standard we hold chapter leaders to.
            </p>
        </ScrollReveal>
    </div>
</section>

<!-- ═══ PROVIDES / COMMITS ═══ -->
<section class="ch-exchange">
    <div class="container">
        <div class="ch-exchange__grid">
            <div class="ch-col">
                <ScrollReveal>
                    <span class="eyebrow"
                        >WHAT PROGETA TECHNOLOGIES PROVIDES</span
                    >
                    <ul class="dash-list">
                        <li>
                            <span class="dash">—</span> All event materials and module
                            content
                        </li>
                        <li>
                            <span class="dash">—</span> Chapter leader training (online,
                            3 sessions)
                        </li>
                        <li>
                            <span class="dash">—</span> Access to the national chapter
                            network
                        </li>
                        <li>
                            <span class="dash">—</span> Eligibility for national
                            competitions and events
                        </li>
                        <li>
                            <span class="dash">—</span> Direct support from the LaunchPad
                            team
                        </li>
                    </ul>
                </ScrollReveal>
            </div>
            <div class="ch-col">
                <ScrollReveal delay={100}>
                    <span class="eyebrow">WHAT A CHAPTER COMMITS TO</span>
                    <ul class="dash-list">
                        <li>
                            <span class="dash">—</span> At minimum, one event per
                            month
                        </li>
                        <li>
                            <span class="dash">—</span> A founding team of at least
                            3 student leaders
                        </li>
                        <li>
                            <span class="dash">—</span> A faculty advisor (for institutional
                            credibility)
                        </li>
                        <li>
                            <span class="dash">—</span> Honest reporting on activities
                            and attendance
                        </li>
                        <li>
                            <span class="dash">—</span> Maintaining LaunchPad's standards
                            of quality
                        </li>
                    </ul>
                </ScrollReveal>
            </div>
        </div>
    </div>
</section>

<!-- ═══ FORM ═══ -->
<section class="ch-form-section" id="chapter-form">
    <div class="container--narrow">
        <ScrollReveal>
            <h2 class="section-heading">Start a chapter at your college.</h2>
            <p class="section-body">
                Fill this in and we will reply within 48 hours with the next
                steps.
            </p>
        </ScrollReveal>

        <form
            class="ch-form"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
        >
            <div class="form-row">
                <div class="form-field">
                    <label for="chapter_name">Your name</label><input
                        id="chapter_name"
                        type="text"
                        name="name"
                        required
                    />
                </div>
                <div class="form-field">
                    <label for="chapter_email">Your email</label><input
                        id="chapter_email"
                        type="email"
                        name="email"
                        required
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-field">
                    <label for="chapter_college">College / Institution</label
                    ><input
                        id="chapter_college"
                        type="text"
                        name="college"
                        required
                    />
                </div>
                <div class="form-field">
                    <label for="chapter_city">City</label><input
                        id="chapter_city"
                        type="text"
                        name="city"
                        required
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-field">
                    <label for="chapter_role">Your role</label>
                    <select id="chapter_role" name="role" required>
                        <option value="" disabled selected>Select...</option>
                        <option value="Student">Student</option>
                        <option value="Faculty / Advisor"
                            >Faculty / Advisor</option
                        >
                        <option value="Student Club Lead"
                            >Student Club Lead</option
                        >
                        <option value="T&P Officer">T&P Officer</option>
                    </select>
                </div>
                <div class="form-field">
                    <label for="chapter_interest">Interested students</label>
                    <select
                        id="chapter_interest"
                        name="interest_level"
                        required
                    >
                        <option value="" disabled selected>Select...</option>
                        <option value="Just me">Just me so far</option>
                        <option value="2-5">2–5 students</option>
                        <option value="6-15">6–15 students</option>
                        <option value="15+"
                            >15+ students already organised</option
                        >
                    </select>
                </div>
            </div>
            <div class="form-field form-field--full">
                <label for="chapter_campus_info"
                    >Tell us about your campus (optional)</label
                >
                <textarea id="chapter_campus_info" name="campus_info" rows="4"
                ></textarea>
            </div>
            <button type="submit" class="form-submit"
                >SUBMIT CHAPTER APPLICATION →</button
            >
        </form>

        <p class="form-alt">
            Or email us directly: <a href="mailto:operations@progeta.tech"
                >operations@progeta.tech</a
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

    .ch-hero {
        min-height: 52vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
    }
    .ch-hero__heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(44px, 6vw, 68px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 16px;
    }
    .ch-hero__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        max-width: 520px;
        line-height: 1.75;
    }

    .ch-about {
        background: #07090f;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .ch-prose {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #8890bb;
        line-height: 1.8;
        margin-bottom: 24px;
    }
    .ch-prose:last-child {
        margin-bottom: 0;
    }

    .ch-exchange {
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .ch-exchange__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(32px, 4vw, 64px);
    }
    @media (max-width: 640px) {
        .ch-exchange__grid {
            grid-template-columns: 1fr;
        }
    }
    .dash-list {
        list-style: none;
        padding: 0;
    }
    .dash-list li {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #8890bb;
        line-height: 2;
    }
    .dash {
        color: #e05c20;
        margin-right: 8px;
    }

    .ch-form-section {
        background: #0c0e18;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .ch-form {
        margin-top: 40px;
    }
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-bottom: 24px;
    }
    @media (max-width: 480px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }
    .form-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .form-field--full {
        margin-bottom: 24px;
    }
    .form-field label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #424870;
    }
    .form-field input,
    .form-field select,
    .form-field textarea {
        background: transparent;
        border: none;
        border-bottom: 1px solid #171b30;
        padding: 12px 0;
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #edf0ff;
        outline: none;
        transition: border-color 0.2s;
        width: 100%;
        appearance: none;
        border-radius: 0;
    }
    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
        border-color: #e05c20;
    }
    .form-field textarea {
        resize: vertical;
        border: 1px solid #171b30;
        padding: 12px;
        margin-top: 4px;
    }
    .form-field select {
        cursor: pointer;
    }
    .form-field select option {
        background: #0c0e18;
    }

    .form-submit {
        width: 100%;
        padding: 16px;
        background: #e05c20;
        color: #edf0ff;
        border: none;
        font-family: "DM Mono", monospace;
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
    }
    .form-submit:hover {
        background: #c44e14;
    }

    .form-alt {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #424870;
        margin-top: 24px;
        text-align: center;
    }
    .form-alt a {
        color: #8890bb;
        text-decoration: none;
    }
    .form-alt a:hover {
        color: #e05c20;
    }
</style>
