<script>
    import { reveal } from '$lib/ui/actions';
</script>

<svelte:head>
    <title>Progeta Technologies | Investment</title>
</svelte:head>

<section style="padding: 160px 0 80px; text-align: center;">
    <div class="container">
        <div use:reveal>
            <span class="cat-pill">Investment Protocol</span>
            <h1 style="margin-top: 1rem; margin-bottom: 2rem;">Transparent Offerings.</h1>
            <p style="max-width: 600px; margin: 0 auto; font-size: 1.25rem;">
                Choose your path. Whether you are a solo operator or leading a battalion.
            </p>
        </div>
    </div>
</section>

<!-- INDIVIDUAL -->
<section class="section-padding" style="padding-top: 0;">
    <div class="container">
        <h2 style="margin-bottom: 3rem;" use:reveal>Individual Designations</h2>
        
        <div class="grid-3">
            <!-- EVENTS -->
            <div class="bento-card" use:reveal={{ delay: 0 }}>
                <span class="cat-pill" style="align-self: flex-start; margin-bottom: 1rem;">Access</span>
                <h3>Community Events</h3>
                <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0; color: var(--text-primary);">₹2,000</div>
                <p>Networking summits and basic workshops.</p>
                <ul class="feature-list">
                    <li>Keynote Sessions</li>
                    <li>Networking Access</li>
                    <li>Digital Badge</li>
                </ul>
                <a href="/events" class="btn btn-outline" style="margin-top: auto;">View Calendar</a>
            </div>

            <!-- WORKSHOPS -->
            <div class="bento-card" style="border-color: var(--accent-emerald);" use:reveal={{ delay: 100 }}>
                <span class="cat-pill" style="align-self: flex-start; margin-bottom: 1rem; background: var(--accent-emerald); color: #000;">Recommended</span>
                <h3>Live Fire Workshops</h3>
                <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0; color: var(--text-primary);">₹10,000</div>
                <p>2-3 Day intensive tactical simulations.</p>
                <ul class="feature-list">
                    <li>Real-world Targets</li>
                    <li>Red/Blue Team Ops</li>
                    <li>Post-Mortem Analysis</li>
                </ul>
                <a href="/workshops" class="btn btn-primary" style="margin-top: auto;">Deploy Now</a>
            </div>

            <!-- TRACKS -->
            <div class="bento-card" use:reveal={{ delay: 200 }}>
                <span class="cat-pill" style="align-self: flex-start; margin-bottom: 1rem;">Diploma</span>
                <h3>Career Tracks</h3>
                <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0; color: var(--text-primary);">₹30,000</div>
                <p>6-Month comprehensive specialized programs.</p>
                <ul class="feature-list">
                    <li>Full Curriculum</li>
                    <li>Personal Mentor</li>
                    <li>Career Placement</li>
                </ul>
                <a href="/tracks" class="btn btn-outline" style="margin-top: auto;">Explore Tracks</a>
            </div>
        </div>
    </div>
</section>

<!-- INSTITUTIONAL -->
<section class="section-padding" style="background: var(--bg-surface); border-top: 1px solid var(--glass-border);">
    <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;" use:reveal>
            <div>
                <h2>Institutional Partnerships</h2>
                <p>Scale your workforce or curriculum.</p>
            </div>
        </div>

        <div class="grid-3" style="grid-template-columns: 1fr 1fr;">
            <!-- COLLEGES -->
            <div class="bento-card" use:reveal={{ delay: 0 }}>
                <h3>For Colleges & Universities</h3>
                <p style="margin-bottom: 2rem;">
                    Integrate our "Live Fire" labs directly into your curriculum. Give your students operational experience before they graduate.
                </p>
                <a href="/contact?type=college" class="btn btn-outline">Request Syllabus Integration</a>
            </div>

            <!-- CORPORATE -->
            <div class="bento-card" use:reveal={{ delay: 100 }}>
                <h3>For Enterprise Teams</h3>
                <p style="margin-bottom: 2rem;">
                    Upskill your SOC analysts or developers with custom attack/defense scenarios tailored to your stack.
                </p>
                <a href="/contact?type=corporate" class="btn btn-outline">Request Corporate Briefing</a>
            </div>
        </div>
    </div>
</section>

<style>
    .feature-list {
        list-style: none;
        margin-bottom: 2rem;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .feature-list li {
        font-size: 0.9rem;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .feature-list li::before {
        content: '•';
        color: var(--accent-blue);
    }
    
    .grid-3 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
</style>
