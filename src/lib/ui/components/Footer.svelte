<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";
</script>

{#if !$page.url.pathname.startsWith(base + "/community")}
    <footer class="site-footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand">
                    <div
                        style="font-size:1.5rem; font-weight:700; margin-bottom:1rem; font-family:var(--font-heading);"
                    >
                        Progeta Technologies.
                    </div>
                    <p style="font-size:0.9rem;">
                        Take back control to rise above.
                    </p>
                </div>

                <div class="footer-links">
                    <div class="col">
                        <h4>Platform</h4>
                        <a href="{base}/tracks">Tracks</a>
                        <a href="{base}/modules">Modules</a>
                        <a href="{base}/workshops">Workshops</a>
                        <a href="{base}/games">Games</a>
                    </div>
                    <div class="col">
                        <h4>Company</h4>
                        <a href="{base}/about">Mission</a>
                        <a href="{base}/pricing">Pricing</a>
                        <a href="{base}/contact">Contact</a>
                    </div>
                    <div class="col">
                        <h4>Resources</h4>
                        <a href="{base}/events">Events</a>
                        <a href="#">Blog</a>
                        <a href="#">Support</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <span>&copy; 2026 Progeta Technologies Inc.</span>
                <div class="legal-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </div>
    </footer>
{/if}

<style>
    .site-footer {
        border-top: 1px solid var(--border-light);
        padding: 80px 0 40px;
        margin-top: 120px;
        background: var(--bg-secondary);
    }

    .footer-top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 4rem;
        margin-bottom: 60px;
    }

    .footer-brand {
        max-width: 300px;
    }

    .footer-links {
        display: flex;
        gap: 4rem;
        flex-wrap: wrap;
    }

    .col {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .col h4 {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-primary);
    }

    .col a {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .col a:hover {
        color: var(--accent-primary);
    }

    .footer-bottom {
        border-top: 1px solid var(--border-light);
        padding-top: 2rem;
        display: flex;
        justify-content: space-between;
        color: var(--text-tertiary);
        font-size: 0.85rem;
    }

    .legal-links {
        display: flex;
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        .footer-top {
            flex-direction: column;
            gap: 4rem; /* Spacier */
            text-align: center;
        }

        .footer-brand,
        .col {
            align-items: center; /* Center flex items */
            width: 100%;
            max-width: none;
        }

        /* Add more space for brand on mobile */
        .footer-brand {
            margin-bottom: 2rem;
        }

        .footer-links {
            justify-content: center;
            gap: 3.5rem; /* More space between link columns */
            width: 100%;
            flex-direction: column; /* Stack link columns too for cleaner look? Or keep row? Let's keep flex-wrap but wide gap */
        }

        .footer-bottom {
            flex-direction: column;
            gap: 2rem;
            align-items: center;
            text-align: center;
            margin-top: 2rem;
        }
    }
</style>
