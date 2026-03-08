<script>
    import ScrollReveal from "$lib/components/animations/ScrollReveal.svelte";
    import { verifyCertificate } from "$lib/content/certificates-data";

    const credentials = [
        { tag: "T-01", name: "Progeta Technologies Certified CTI Specialist" },
        { tag: "T-02", name: "Progeta Technologies Certified SOC Operator" },
        {
            tag: "T-03",
            name: "Progeta Technologies Certified DevSecOps Engineer",
        },
        { tag: "T-04", name: "Progeta Technologies Certified GRC Analyst" },
        {
            tag: "T-05",
            name: "Progeta Technologies Certified Penetration Tester",
        },
        {
            tag: "T-06",
            name: "Progeta Technologies Certified Security Automation Engineer",
        },
    ];

    let verifyInput = "";
    let verifyResult = null;
    let verifyState = ""; // '', 'valid', 'invalid'

    function handleVerify() {
        if (!verifyInput.trim()) return;
        const cert = verifyCertificate(verifyInput.trim());
        if (cert) {
            verifyResult = cert;
            verifyState = "valid";
        } else {
            verifyResult = null;
            verifyState = "invalid";
        }
    }
</script>

<svelte:head>
    <title>Certifications | LaunchPad — Progeta Technologies</title>
    <meta
        name="description"
        content="Progeta Technologies credentials that prove operational skill. Verifiable by any employer."
    />
</svelte:head>

<!-- ═══ HERO ═══ -->
<section class="cert-hero">
    <div class="container">
        <ScrollReveal
            ><span class="eyebrow">CERTIFICATIONS · LAUNCHPAD</span
            ></ScrollReveal
        >
        <ScrollReveal delay={100}
            ><h1 class="cert-hero__heading">
                Credentials that prove<br />operational skill.
            </h1></ScrollReveal
        >
        <ScrollReveal delay={200}
            ><p class="cert-hero__body">
                Every LaunchPad track ends with a Progeta Technologies
                certification. It is not a participation certificate. It is tied
                to demonstrated competencies in specific modules and is publicly
                verifiable by any employer.
            </p></ScrollReveal
        >
        <ScrollReveal delay={300}
            ><a href="#verify" class="btn-solid">Verify a credential →</a
            ></ScrollReveal
        >
    </div>
</section>

<!-- ═══ THE SIX CREDENTIALS ═══ -->
<section class="cert-cards-section">
    <div class="container--wide">
        <div class="cert-grid">
            {#each credentials as cred, i}
                <ScrollReveal delay={i * 60}>
                    <div class="cert-card">
                        <span class="cert-tag">{cred.tag}</span>
                        <h3 class="cert-name">{cred.name}</h3>
                        <span class="cert-req"
                            >All 8 track modules + 4 professional modules</span
                        >
                        <span class="cert-issuer"
                            >Progeta Technologies · Est. 2024</span
                        >
                        <a href="#verify" class="cert-verify-link"
                            >Verify format →</a
                        >
                    </div>
                </ScrollReveal>
            {/each}
        </div>
    </div>
</section>

<!-- ═══ WHAT IT PROVES ═══ -->
<section class="cert-proves">
    <div class="container--narrow">
        <ScrollReveal>
            <span class="eyebrow">WHAT THE CREDENTIAL PROVES</span>
            <p class="cert-prose">
                A LaunchPad credential is issued only on successful completion
                of all modules in a track. Each module includes practical
                exercises that must be completed, not just attended. You cannot
                receive a credential by attending without demonstrating the
                skill.
            </p>
            <p class="cert-prose">
                Every credential is publicly verifiable. Employers can visit
                progeta.tech/verify, enter the credential ID, and instantly see:
                the holder's name, the track completed, the modules covered, and
                the issue date. There is no expiry date. There is no renewal
                fee.
            </p>
            <p class="cert-prose">
                The credential does not claim that the holder is a senior
                cybersecurity professional. It claims that the holder has
                completed a structured, practical programme in a specific
                cybersecurity domain. That distinction matters — we do not
                inflate what we certify.
            </p>
        </ScrollReveal>
    </div>
</section>

<!-- ═══ VERIFY WIDGET ═══ -->
<section class="cert-verify" id="verify">
    <div class="container--narrow">
        <ScrollReveal>
            <span class="eyebrow">CREDENTIAL VERIFICATION</span>
            <h2 class="section-heading">Verify a credential.</h2>
            <p class="section-body" style="margin-bottom: 8px;">
                Enter the credential ID exactly as it appears on the
                certificate.
            </p>
            <p class="verify-format">Format: <code>PT-XXXX-XXXX</code></p>
        </ScrollReveal>

        <div class="verify-widget">
            <div class="verify-input-row">
                <input
                    type="text"
                    class="verify-input"
                    placeholder="PT-0001-CXTI"
                    bind:value={verifyInput}
                    on:keydown={(e) => e.key === "Enter" && handleVerify()}
                />
                <button class="verify-btn" on:click={handleVerify}
                    >VERIFY</button
                >
            </div>

            {#if verifyState === "valid" && verifyResult}
                <div class="verify-result valid">
                    <span class="vr-status">✓ VALID CREDENTIAL</span>
                    <div class="vr-row">
                        <span class="vr-label">HOLDER</span><span
                            class="vr-value">{verifyResult.holder}</span
                        >
                    </div>
                    <div class="vr-row">
                        <span class="vr-label">TRACK</span><span
                            class="vr-value">{verifyResult.track}</span
                        >
                    </div>
                    <div class="vr-row">
                        <span class="vr-label">ISSUED</span><span
                            class="vr-value">{verifyResult.issued}</span
                        >
                    </div>
                    <div class="vr-row">
                        <span class="vr-label">MODULES</span><span
                            class="vr-value"
                            >{verifyResult.modulesCompleted} completed</span
                        >
                    </div>
                </div>
            {/if}
            {#if verifyState === "invalid"}
                <div class="verify-result invalid">
                    <span class="vr-status">✗ CREDENTIAL NOT FOUND</span>
                    <p class="vr-note">
                        No credential matches the ID "{verifyInput}". Check the
                        format and try again.
                    </p>
                </div>
            {/if}
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
        max-width: 680px;
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
    .section-heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(28px, 3.5vw, 40px);
        color: #edf0ff;
        margin-bottom: 14px;
    }
    .section-body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: var(--ink-2);
        line-height: 1.7;
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
        margin-top: 28px;
        transition: opacity 0.2s;
    }
    .btn-solid:hover {
        opacity: 0.88;
    }

    .cert-hero {
        min-height: 52vh;
        display: flex;
        align-items: flex-end;
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0 clamp(48px, 6vw, 80px);
    }
    .cert-hero__heading {
        font-family: "Cormorant Garamond", serif;
        font-weight: 700;
        font-size: clamp(44px, 6vw, 68px);
        line-height: 0.93;
        color: #edf0ff;
        letter-spacing: -0.03em;
        margin-bottom: 16px;
    }
    .cert-hero__body {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        max-width: 520px;
        line-height: 1.75;
    }

    /* ── CREDENTIAL CARDS ── */
    .cert-cards-section {
        background: var(--ground);
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .cert-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: #0f1220;
    }
    @media (max-width: 768px) {
        .cert-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 480px) {
        .cert-grid {
            grid-template-columns: 1fr;
        }
    }
    .cert-card {
        background: var(--ground);
        padding: 28px 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: relative;
        overflow: hidden;
        transition: background 0.2s;
    }
    .cert-card:hover {
        background: #0c0e18;
    }
    .cert-card::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: #e05c20;
        transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .cert-card:hover::after {
        width: 100%;
    }
    .cert-tag {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #e05c20;
        letter-spacing: 0.12em;
    }
    .cert-name {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        font-size: 17px;
        color: #edf0ff;
        line-height: 1.3;
    }
    .cert-req {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: var(--ink-3);
        letter-spacing: 0.08em;
    }
    .cert-issuer {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: var(--ink-3);
        letter-spacing: 0.08em;
    }
    .cert-verify-link {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #e05c20;
        text-decoration: none;
        letter-spacing: 0.1em;
        margin-top: 4px;
    }
    .cert-verify-link:hover {
        text-decoration: underline;
    }

    /* ── PROSE ── */
    .cert-proves {
        background: #020408;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .cert-prose {
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: var(--ink-2);
        line-height: 1.8;
        margin-bottom: 24px;
    }
    .cert-prose:last-child {
        margin-bottom: 0;
    }

    /* ── VERIFY ── */
    .cert-verify {
        background: #0c0e18;
        padding: clamp(80px, 11vw, 144px) 0;
    }
    .verify-format {
        font-family: "DM Mono", monospace;
        font-size: 12px;
        color: var(--ink-3);
    }
    .verify-format code {
        color: var(--ink-2);
    }
    .verify-widget {
        max-width: 480px;
        margin: 36px auto 0;
    }
    .verify-input-row {
        display: flex;
        gap: 0;
    }
    .verify-input {
        flex: 1;
        padding: 14px 18px;
        background: var(--ground);
        border: 1px solid #171b30;
        border-right: none;
        font-family: "DM Mono", monospace;
        font-size: 13px;
        letter-spacing: 0.12em;
        color: #edf0ff;
        text-transform: uppercase;
        outline: none;
        border-radius: 4px 0 0 4px;
        transition: border-color 0.2s;
    }
    .verify-input:focus {
        border-color: #e05c20;
    }
    .verify-input::placeholder {
        color: #1e2440;
        text-transform: uppercase;
    }
    .verify-btn {
        padding: 14px 20px;
        background: #e05c20;
        border: none;
        color: #edf0ff;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 0 4px 4px 0;
        transition: background 0.2s;
    }
    .verify-btn:hover {
        background: #c44e14;
    }

    .verify-result {
        margin-top: 20px;
        padding: 20px 22px;
        border-radius: 4px;
    }
    .verify-result.valid {
        border-left: 3px solid #18c96a;
        background: rgba(24, 201, 106, 0.06);
    }
    .verify-result.invalid {
        border-left: 3px solid #e05c20;
        background: rgba(224, 92, 32, 0.06);
    }
    .vr-status {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        display: block;
        margin-bottom: 16px;
    }
    .valid .vr-status {
        color: #18c96a;
    }
    .invalid .vr-status {
        color: #e05c20;
    }
    .vr-row {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .vr-row:last-child {
        border-bottom: none;
    }
    .vr-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: var(--ink-3);
    }
    .vr-value {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: #edf0ff;
    }
    .vr-note {
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        color: var(--ink-2);
    }
</style>
