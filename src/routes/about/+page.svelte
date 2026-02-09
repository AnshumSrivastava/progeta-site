<svelte:head>
    <title>Progeta Technologies | Our Mission</title>
</svelte:head>

<!-- HERO -->
<section class="hero-section">
    <div class="container text-center">
        <span class="cat-pill">Mission Brief</span>
        <h1 style="margin-top:1rem;">Forging the Cyber Vanguard.</h1>
        <p style="margin: 0 auto;">
            Progeta Technologies exists to solve the cybersecurity talent
            deficit by training operators, not just students.
        </p>
    </div>
</section>

<!-- STORY -->
<section class="section-padding">
    <div class="container">
        <div class="grid-2">
            <div>
                <h2>The Gap</h2>
                <p>
                    The world faces a shortage of 3.5 million cybersecurity
                    professionals. Yet, graduates struggle to find jobs because
                    they lack operational experience.
                    <br /><br />
                    Theory is not enough when the enemy is real.
                </p>
            </div>
            <div>
                <h2>The Solution</h2>
                <p>
                    Progeta Technologies was founded to bridge this gap. We
                    removed the textbook and replaced it with the terminal.
                    <br /><br />
                    Our "Live Fire" methodology ensures that every graduate has faced—and
                    defeated—real-world scenarios before they ever step into an interview.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- VALUES -->
<section class="section-padding" style="background: rgba(255,255,255,0.02);">
    <div class="container">
        <h2 class="text-center" style="margin-bottom:4rem;">Core Directives</h2>
        <div class="grid-3">
            <div class="agency-card">
                <h3 style="color:var(--accent-blue);">01. Integrity</h3>
                <p>
                    We teach dangerous skills. We demand absolute ethical
                    standards from our operators. White hat only.
                </p>
            </div>
            <div class="agency-card">
                <h3 style="color:var(--accent-blue);">02. Mastery</h3>
                <p>
                    Good enough gets you hacked. We push for excellence in every
                    keystroke and packet.
                </p>
            </div>
            <div class="agency-card">
                <h3 style="color:var(--accent-blue);">03. Resilience</h3>
                <p>
                    In cyber, you will fail. It's how you recover and patch the
                    hole that defines you.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- TEAM -->
<section class="section-padding" style="padding-bottom: 120px;">
    <div class="container text-center">
        <h2 style="margin-bottom:4rem;">Command Staff</h2>
        <div class="grid-3">
            <div class="agency-card" style="text-align:center;">
                <div class="avatar"></div>
                <h3>Anshum S.</h3>
                <div class="role">Founder & Lead Operator</div>
                <p style="font-size:0.9rem;">
                    Ex-Red Team Lead with a decade of experience securing
                    critical infrastructure.
                </p>
            </div>

            <div class="agency-card" style="text-align:center;">
                <div class="avatar"></div>
                <h3>Operations Lead</h3>
                <div class="role">Head of Curriculum</div>
                <p style="font-size:0.9rem;">
                    Specialist in Blue Team operations and SOC architecture.
                </p>
            </div>

            <div class="agency-card" style="text-align:center;">
                <div class="avatar"></div>
                <h3>Technical Mentor</h3>
                <div class="role">Student Success</div>
                <p style="font-size:0.9rem;">
                    Guiding cadets through the trenches of the OSCP and CISSP.
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    .hero-section {
        padding-top: 160px;
        padding-bottom: 60px;
    }

    .text-center {
        text-align: center;
    }

    /* GRIDS */
    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }

    .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    /* CARDS */
    .agency-card {
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 2rem;
        transition: transform 0.2s;
    }

    .agency-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.05);
    }

    .agency-card h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    .avatar {
        width: 100px;
        height: 100px;
        background: var(--text-tertiary);
        border-radius: 50%;
        margin: 0 auto 1.5rem;
    }

    .role {
        color: var(--accent-blue);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
        .hero-section {
            padding-top: 100px;
        }

        .grid-2,
        .grid-3 {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        h1 {
            font-size: 2.5rem;
        }
    }
</style>
