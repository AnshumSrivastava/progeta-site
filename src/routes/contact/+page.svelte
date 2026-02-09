<script>
    import { fly } from "svelte/transition";
    import ContactForm from "$lib/ui/components/ContactForm.svelte";
</script>

<svelte:head>
    <title>Contact Progeta | Let's Talk</title>
</svelte:head>

<div class="page-background">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>

    <div class="container">
        <!-- LEFT COLUMN: WELCOME & INFO -->
        <div class="info-column" in:fly={{ y: 20, duration: 800, delay: 200 }}>
            <div class="header-group">
                <span class="pill-label">Get in Touch</span>
                <h1>Let’s start a conversation.</h1>
                <p class="subtitle">
                    Whether you’re interested in a partnership, have a technical
                    question, or just want to explore what Progeta can do for
                    you, we’re ready to listen.
                </p>
            </div>

            <!-- Details (Hidden on phone as per previous step, but kept in DOM) -->
            <div class="contact-details">
                <div class="detail-item">
                    <div class="icon-box">✉️</div>
                    <div class="detail-text">
                        <span class="label">Email Us</span>
                        <a href="mailto:operations@progeta.tech" class="value"
                            >operations@progeta.tech</a
                        >
                    </div>
                </div>

                <div class="detail-item">
                    <div class="icon-box">💼</div>
                    <div class="detail-text">
                        <span class="label">Careers</span>
                        <span class="value">We are always hiring talent.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- RIGHT COLUMN: THE FORM -->
        <div class="form-column" in:fly={{ y: 20, duration: 800, delay: 400 }}>
            <h2 class="mobile-form-title">Send a message</h2>
            <ContactForm />
        </div>

        <!-- SOCIAL LINKS (Mobile Only - Moved to bottom) -->
        <div class="social-links-mobile">
            <h3 class="social-title">Connect with us</h3>
            <div class="social-icons-row">
                <a
                    href="https://www.linkedin.com/company/progetatechnologies/"
                    target="_blank"
                    class="social-btn-icon"
                >
                    <span class="icon">in</span>
                    <!-- LinkedIn SVG -->
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        class="social-svg"
                        ><path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        /></svg
                    >
                </a>
                <a
                    href="https://www.instagram.com/progetatechnologies/"
                    target="_blank"
                    class="social-btn-icon"
                >
                    <!-- Instagram SVG -->
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        class="social-svg"
                        ><path
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        /></svg
                    >
                </a>
            </div>
        </div>

        <!-- SOCIAL LINKS (Mobile Only - Moved to bottom) -->
        <div class="social-links-mobile">
            <h3 class="social-title">Connect with us</h3>
            <div class="social-icons-row">
                <a
                    href="https://www.linkedin.com/company/progetatechnologies/"
                    target="_blank"
                    class="social-btn-icon"
                >
                    <span class="icon">in</span>
                    <!-- Simple text for now or need SVG? Using text representation or emoji if font awesome not avail. Let's use SVG or text -->
                    <!-- LinkedIn SVG -->
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        class="social-svg"
                        ><path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        /></svg
                    >
                </a>
                <a
                    href="https://www.instagram.com/progetatechnologies/"
                    target="_blank"
                    class="social-btn-icon"
                >
                    <!-- Instagram SVG -->
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        class="social-svg"
                        ><path
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        /></svg
                    >
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    /* VARIABLES */
    :root {
        --bg-warm-dark: #0a0908; /* Warmer dark */
        --text-warm: #e5e5e0;
        --accent-gold: #c2a379; /* Professional Warmth */
        --border-subtle: rgba(255, 255, 255, 0.08);
    }

    /* Global scrollbar hide for this page context if needed or target container */
    .page-background::-webkit-scrollbar {
        display: none;
    }
    .page-background {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    /* LAYOUT */
    .page-background {
        min-height: 100vh;
        background-color: var(--bg-warm-dark);
        color: var(--text-warm);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        position: relative;
        overflow: hidden;
        font-family: "DM Sans", "Inter", sans-serif;
    }

    .glow-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.3;
        pointer-events: none;
    }
    .orb-1 {
        width: 500px;
        height: 500px;
        background: #6366f1;
        top: -100px;
        left: -100px;
    }
    .orb-2 {
        width: 400px;
        height: 400px;
        background: #10b981;
        bottom: 0;
        right: 0;
    }

    .container {
        width: 100%;
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        z-index: 10;
    }

    /* LEFT INFO */
    .info-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .pill-label {
        background: rgba(255, 255, 255, 0.1);
        color: var(--accent);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        display: inline-block;
    }

    h1 {
        font-size: 3.5rem;
        line-height: 1.1;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(to right, #fff, #94a3b8);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .subtitle {
        font-size: 1.15rem;
        color: var(--text-2);
        line-height: 1.6;
        max-width: 480px;
        margin-bottom: 3rem;
    }

    .social-links-mobile {
        display: none;
    }

    .contact-details {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .detail-item {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .icon-box {
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border);
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
    }

    .detail-text {
        display: flex;
        flex-direction: column;
    }
    .label {
        font-size: 0.85rem;
        color: var(--text-2);
        font-weight: 500;
    }
    .value {
        font-size: 1rem;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
    }
    .value:hover {
        color: var(--accent);
    }

    /* RIGHT FORM */
    .form-column {
        display: flex;
        flex-direction: column; /* Allow title stacking */
        justify-content: center;
    }

    .mobile-form-title {
        display: none;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
        /* No Gradient / Clean Bg */
        .glow-orb {
            display: none;
        }

        .page-background {
            padding: 80px 1.5rem 120px;
            align-items: flex-start;
            overflow-y: auto;
            height: 100dvh;
            display: block;
            background: #000; /* Pure black or deep gray */
        }

        .container {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            max-width: 100%;
        }

        /* HEADER ADJUSTMENTS */
        .info-column {
            display: flex; /* Show info again */
            text-align: left;
            padding-left: 0;
            margin-bottom: 2rem;
        }

        .pill-label {
            display: none; /* Hide pill for simplicity */
        }

        h1 {
            font-size: 3rem; /* Bigger font */
            margin-bottom: 1rem;
            color: #fff;
            background: none; /* No gradient */
            -webkit-text-fill-color: #fff;
            letter-spacing: -0.03em;
        }

        .subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
            max-width: 100%;
        }

        /* SOCIAL LINKS */
        .social-links-mobile {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 3rem;
            width: 100%;
        }

        .social-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            font-size: 1.25rem;
            font-weight: 500;
        }

        .social-btn .icon {
            opacity: 0.5;
            font-size: 0.9rem;
        }

        .contact-details {
            display: none; /* Hide old details in favor of social links? Or keep? User said social links. I'll hide standard details to reduce clutter if socials are main focus. or maybe minimal email link */
        }

        /* FORM ADJUSTMENTS */
        .form-column {
            width: 100%;
            padding: 0;
        }

        .mobile-form-title {
            display: block;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: #fff;
            font-weight: 600;
        }

        .form-column :global(input),
        .form-column :global(textarea) {
            background: transparent;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            border-top: none;
            border-left: none;
            border-right: none;
            border-radius: 0;
            padding: 1.25rem 0;
            color: #fff;
            font-size: 1.1rem; /* Bigger font for inputs */
        }

        .form-column :global(input:focus),
        .form-column :global(textarea:focus) {
            border-bottom-color: #fff;
            outline: none;
        }

        /* Spacing for form groups */
        .form-column :global(.form-group) {
            margin-bottom: 1.5rem;
        }
    }
</style>
