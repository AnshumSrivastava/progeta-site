<script>
    import { fly } from 'svelte/transition';
    import ContactForm from '$lib/ui/components/ContactForm.svelte';
</script>

<svelte:head>
    <title>Contact Progeta | Let's Talk</title>
</svelte:head>

<div class="page-background">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>

    <div class="container">
        
        <!-- LEFT COLUMN: WELCOME & INFO -->
        <div class="info-column" in:fly={{y: 20, duration: 800, delay: 200}}>
            <div class="header-group">
                <span class="pill-label">Get in Touch</span>
                <h1>Let’s start a conversation.</h1>
                <p class="subtitle">
                    Whether you’re interested in a partnership, have a technical question, 
                    or just want to explore what Progeta can do for you, we’re ready to listen.
                </p>
            </div>

            <div class="contact-details">
                <div class="detail-item">
                    <div class="icon-box">✉️</div>
                    <div class="detail-text">
                        <span class="label">Email Us</span>
                        <a href="mailto:operations@progeta.tech" class="value">operations@progeta.tech</a>
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
        <div class="form-column" in:fly={{y: 20, duration: 800, delay: 400}}>
            <ContactForm />
        </div>

    </div>
</div>

<style>
    /* VARIABLES */
    :root {
        --bg-deep: #050507;
        --accent: #3b82f6;
        --text-1: #fff;
        --text-2: #94a3b8;
        --border: rgba(255, 255, 255, 0.08);

    }

    /* LAYOUT */
    .page-background {
        min-height: 100vh;
        background-color: var(--bg-deep);
        color: var(--text-1);
        display: flex; align-items: center; justify-content: center;
        padding: 4rem 2rem;
        position: relative; overflow: hidden;
        font-family: 'DM Sans', 'Inter', sans-serif;
    }
    
    .glow-orb {
        position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.3; pointer-events: none;
    }
    .orb-1 { width: 500px; height: 500px; background: #6366f1; top: -100px; left: -100px; }
    .orb-2 { width: 400px; height: 400px; background: #10b981; bottom: 0; right: 0; }

    .container {
        width: 100%; max-width: 1200px;
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 4rem; z-index: 10;
    }

    /* LEFT INFO */
    .info-column { display: flex; flex-direction: column; justify-content: center; }
    
    .pill-label {
        background: rgba(255,255,255,0.1); color: var(--accent);
        padding: 6px 14px; border-radius: 20px; font-size: 0.8rem;
        font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
        margin-bottom: 1.5rem; display: inline-block;
    }

    h1 {
        font-size: 3.5rem; line-height: 1.1; font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(to right, #fff, #94a3b8);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    .subtitle {
        font-size: 1.15rem; color: var(--text-2); line-height: 1.6;
        max-width: 480px; margin-bottom: 3rem;
    }

    .contact-details { display: flex; flex-direction: column; gap: 2rem; }
    
    .detail-item { display: flex; gap: 1rem; align-items: center; }
    
    .icon-box {
        width: 48px; height: 48px;
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--border);
        border-radius: 12px;
        display: flex; justify-content: center; align-items: center;
        font-size: 1.2rem;
    }

    .detail-text { display: flex; flex-direction: column; }
    .label { font-size: 0.85rem; color: var(--text-2); font-weight: 500; }
    .value { font-size: 1rem; color: #fff; font-weight: 600; text-decoration: none; }
    .value:hover { color: var(--accent); }

    /* RIGHT FORM */
    .form-column { display: flex; align-items: center; }

    /* RESPONSIVE */
    @media (max-width: 900px) {
        .container { grid-template-columns: 1fr; gap: 3rem; }
        h1 { font-size: 2.5rem; }
        .page-background { padding: 2rem 1rem; }
    }
</style>
