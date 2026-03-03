<script>
    import { base } from "$app/paths";
</script>

<footer class="site-footer">
    <div class="container">
        <div class="footer-top">
            <!-- Column 1: Brand -->
            <div class="col col-brand">
                <div class="brand-name">Progeta Technologies</div>
                <p>Take back control to rise above.</p>
                <div class="social-links">
                    <a href="https://linkedin.com/company/progetatechnologies" target="_blank" rel="noopener">LinkedIn</a>
                    <a href="https://instagram.com/progetatechnologies" target="_blank" rel="noopener">Instagram</a>
                    <a href="https://discord.gg/progetatechnologies" target="_blank" rel="noopener">Discord</a>
                    <a href="https://github.com/progetatechnologies" target="_blank" rel="noopener">GitHub</a>
                </div>
            </div>

            <!-- Column 2: LaunchPad -->
            <div class="col">
                <h4>LAUNCHPAD</h4>
                <a href="{base}/launchpad">All Programmes</a>
                <a href="{base}/tracks">Tracks</a>
                <a href="{base}/workshops">Workshops</a>
                <a href="{base}/chapters">Student Chapters</a>
                <a href="{base}/certifications">Certifications</a>
            </div>

            <!-- Column 3: Products & Community -->
            <div class="col">
                <h4>PRODUCTS & COMMUNITY</h4>
                <a href="{base}/selfos">SelfOS</a>
                <a href="{base}/innercircle">InnerCircle</a>
                <a href="{base}/innercircle#apply">Apply to InnerCircle</a>
                <a href="{base}/verify">Verify Certificate</a>
            </div>

            <!-- Column 4: Company -->
            <div class="col">
                <h4>COMPANY</h4>
                <a href="{base}/about">About</a>
                <a href="{base}/pricing">Pricing</a>
                <a href="{base}/contact">Contact</a>
                <a href="{base}/privacy">Privacy</a>
                <a href="{base}/terms">Terms</a>
            </div>
        </div>

        <div class="footer-bottom">
            <span>&copy; 2026 Progeta Technologies &middot; All rights reserved</span>
        </div>
    </div>
</footer>

<style>
    .site-footer {
        border-top: 1px solid var(--color-border);
        padding: var(--space-7) 0 var(--space-5);
        margin-top: var(--space-8);
        background: var(--color-void);
    }

    .footer-top {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 1fr;
        gap: var(--space-6);
        margin-bottom: var(--space-6);
    }

    /* Brand column */
    .col-brand {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
    }

    .brand-name {
        font-family: var(--font-display);
        font-weight: 800;
        font-size: var(--text-md);
        color: var(--color-primary);
    }

    .col-brand p {
        font-size: var(--text-sm);
        color: var(--color-secondary);
        line-height: 1.5;
    }

    .social-links {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    .social-links a {
        font: 500 var(--text-xs)/1 var(--font-mono);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-secondary);
        transition: color 0.15s ease;
    }

    .social-links a:hover {
        color: var(--color-signal);
    }

    /* Link columns */
    .col {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .col h4 {
        font: 600 var(--text-xs)/1 var(--font-mono);
        letter-spacing: 0.12em;
        color: var(--color-primary);
        margin-bottom: var(--space-1);
    }

    .col a {
        font-size: var(--text-sm);
        color: var(--color-secondary);
        transition: color 0.15s ease;
    }

    .col a:hover {
        color: var(--color-primary);
    }

    /* Bottom */
    .footer-bottom {
        padding-top: var(--space-4);
        border-top: 1px solid var(--color-border);
        color: var(--color-tertiary);
        font-size: var(--text-xs);
    }

    @media (max-width: 768px) {
        .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-5);
        }

        .col-brand {
            grid-column: 1 / -1;
        }
    }

    @media (max-width: 480px) {
        .footer-top {
            grid-template-columns: 1fr;
        }
    }
</style>
