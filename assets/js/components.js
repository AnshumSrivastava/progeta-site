/* ═══════════════════════════════════════════════════════════════
   components.js — Shared Nav + Footer injected on every page
   ═══════════════════════════════════════════════════════════════ */

const NAV_HTML = `
<nav class="site-nav" id="site-navigation" role="navigation" aria-label="Main navigation">
    <div class="container nav-inner">
        <a class="nav-logo" href="/" aria-label="Progeta Technologies — Home">Progeta Technologies</a>

        <div class="nav-links" id="nav-links">
            <div class="nav-dropdown" id="initiatives-dropdown">
                <button class="nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                    Initiatives
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="dropdown-panel" role="menu" aria-label="Initiatives">
                    <span class="dropdown-label">Current Initiatives</span>
                    <div class="dropdown-grid">
                        <a href="/launchpad/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">LaunchPad</span>
                            <span class="dropdown-desc">Skills and education for students and campuses.</span>
                            <span class="dropdown-cta">Explore →</span>
                        </a>
                        <a href="/selfos/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">SelfOS</span>
                            <span class="dropdown-desc">A personal operating system.</span>
                            <span class="dropdown-cta">Explore →</span>
                        </a>
                        <a href="/innercircle/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">InnerCircle</span>
                            <span class="dropdown-desc">A vetted community for the driven.</span>
                            <span class="dropdown-cta">Apply →</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-dropdown" id="academy-dropdown">
                <button class="nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                    Academy
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="dropdown-panel" role="menu" aria-label="Academy">
                    <div class="dropdown-grid">
                        <a href="/modules/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Modules</span>
                            <span class="dropdown-desc">Core learning blocks for various domains.</span>
                        </a>
                        <a href="/tracks/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Tracks</span>
                            <span class="dropdown-desc">Guided learning paths for mastery.</span>
                        </a>
                        <a href="/workshops/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Workshops</span>
                            <span class="dropdown-desc">Live, interactive sessions with experts.</span>
                        </a>
                        <a href="/simulations/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Simulations</span>
                            <span class="dropdown-desc">Real-world scenarios to test your skills.</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-dropdown" id="community-dropdown">
                <button class="nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                    Community
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="dropdown-panel" role="menu" aria-label="Community">
                    <div class="dropdown-grid">
                        <a href="/community/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Forum</span>
                            <span class="dropdown-desc">Connect with others in our community.</span>
                        </a>
                        <a href="/events/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Events</span>
                            <span class="dropdown-desc">Upcoming meetups and web conferences.</span>
                        </a>
                        <a href="/intel/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Intel</span>
                            <span class="dropdown-desc">Latest news and insights from Progeta.</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-dropdown" id="resources-dropdown">
                <button class="nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                    Resources
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="dropdown-panel" role="menu" aria-label="Resources">
                    <div class="dropdown-grid">
                        <a href="/resources/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Library</span>
                            <span class="dropdown-desc">Documentation, assets, and tools.</span>
                        </a>
                        <a href="/verify/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Verify</span>
                            <span class="dropdown-desc">Check the authenticity of certificates.</span>
                        </a>
                        <a href="/games/" class="dropdown-item" role="menuitem">
                            <span class="dropdown-name">Games</span>
                            <span class="dropdown-desc">Interactive experiences and projects.</span>
                        </a>
                    </div>
                </div>
            </div>

            <a href="/about/" class="nav-link" data-path="/about">About</a>
            <a href="/pricing/" class="nav-link" data-path="/pricing">Pricing</a>
        </div>

        <a href="/contact/" class="nav-contact btn-secondary" style="padding:10px 20px;font-size:12px;">Contact</a>

        <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
    </div>
</nav>

<!-- Mobile Drawer -->
<div class="mobile-drawer" id="mobile-drawer" role="dialog" aria-label="Navigation menu" aria-hidden="true">
    <div class="drawer-backdrop" id="drawer-backdrop"></div>
    <div class="drawer-panel">
        <button class="drawer-close" id="drawer-close" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <div class="drawer-links">
            <div class="drawer-section">
                <span class="drawer-section-label">Initiatives</span>
                <a href="/launchpad/" class="drawer-link">LaunchPad</a>
                <a href="/selfos/" class="drawer-link">SelfOS</a>
                <a href="/innercircle/" class="drawer-link">InnerCircle</a>
            </div>
            <div class="drawer-section">
                <span class="drawer-section-label">Academy</span>
                <a href="/modules/" class="drawer-link">Modules</a>
                <a href="/tracks/" class="drawer-link">Tracks</a>
                <a href="/workshops/" class="drawer-link">Workshops</a>
                <a href="/simulations/" class="drawer-link">Simulations</a>
            </div>
            <div class="drawer-section">
                <span class="drawer-section-label">Community</span>
                <a href="/community/" class="drawer-link">Forum</a>
                <a href="/events/" class="drawer-link">Events</a>
                <a href="/intel/" class="drawer-link">Intel</a>
            </div>
            <div class="drawer-section">
                <span class="drawer-section-label">Resources</span>
                <a href="/resources/" class="drawer-link">Library</a>
                <a href="/verify/" class="drawer-link">Verify</a>
                <a href="/games/" class="drawer-link">Games</a>
            </div>
            <a href="/about/" class="drawer-link">About</a>
            <a href="/pricing/" class="drawer-link">Pricing</a>
        </div>
        <div class="drawer-bottom">
            <a href="/contact/" class="btn-primary" style="width:100%;text-align:center;justify-content:center;">Contact</a>
        </div>
    </div>
</div>
`;

const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col footer-brand-col">
                <span class="footer-brand">Progeta Technologies</span>
                <p class="footer-tagline">To make people realise and achieve their dreams and goals.</p>
                <div class="footer-socials">
                    <a href="https://linkedin.com/company/progetatechnologies" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
                    <span class="footer-dot">·</span>
                    <a href="https://instagram.com/progetatechnologies" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
                    <span class="footer-dot">·</span>
                    <a href="https://discord.gg/progetatechnologies" target="_blank" rel="noopener" aria-label="Discord">Discord</a>
                    <span class="footer-dot">·</span>
                    <a href="https://github.com/progetatechnologies" target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>
                </div>
            </div>
            <div class="footer-col">
                <h4 class="footer-heading">Initiatives</h4>
                <a href="/launchpad/">LaunchPad</a>
                <a href="/selfos/">SelfOS</a>
                <a href="/innercircle/">InnerCircle</a>
            </div>
            <div class="footer-col">
                <h4 class="footer-heading">Academy</h4>
                <a href="/modules/">Modules</a>
                <a href="/tracks/">Tracks</a>
                <a href="/workshops/">Workshops</a>
                <a href="/simulations/">Simulations</a>
            </div>
            <div class="footer-col">
                <h4 class="footer-heading">Community</h4>
                <a href="/community/">Forum</a>
                <a href="/events/">Events</a>
                <a href="/intel/">Intel</a>
            </div>
            <div class="footer-col">
                <h4 class="footer-heading">Company</h4>
                <a href="/about/">About</a>
                <a href="/pricing/">Pricing</a>
                <a href="/contact/">Contact</a>
                <a href="/verify/">Verify</a>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Progeta Technologies · All rights reserved</span>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    /* ── Inject Nav & Footer ─────────────────────────────── */
    const navTarget = document.getElementById('site-nav');
    const footerTarget = document.getElementById('site-footer');
    if (navTarget) navTarget.innerHTML = NAV_HTML;
    if (footerTarget) footerTarget.innerHTML = FOOTER_HTML;

    /* ── Active Nav State ────────────────────────────────── */
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link[data-path]').forEach(link => {
        const linkPath = link.getAttribute('data-path');
        if (linkPath && linkPath !== '/' && path.startsWith(linkPath)) {
            link.classList.add('active');
        }
    });

    /* ── Dropdowns ───────────────────────────────────────── */
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('is-open');
                        other.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', false);
                    }
                });

                const isOpen = dropdown.classList.toggle('is-open');
                trigger.setAttribute('aria-expanded', isOpen);
            });
        }
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('is-open');
            dropdown.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', false);
        });
    });

    /* ── Mobile Drawer ───────────────────────────────────── */
    const hamburger = document.getElementById('nav-hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const backdrop = document.getElementById('drawer-backdrop');

    function openDrawer() {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    /* ── Nav Scroll Behaviour ────────────────────────────── */
    const nav = document.querySelector('.site-nav');
    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 10) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }
            lastScroll = scrollY;
        }, { passive: true });
    }
});
