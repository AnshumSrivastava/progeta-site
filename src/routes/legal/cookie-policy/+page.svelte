<svelte:head>
    <title>Cookie Policy | Progeta Technologies</title>
    <meta
        name="description"
        content="Technical details regarding persistent storage, Web Storage API, and cookies."
    />
</svelte:head>

<div class="legal-header">
    <span class="legal-eyebrow">LEGAL & TRUST</span>
    <h1 class="legal-title">Cookie Policy</h1>
    <p class="legal-last-updated">Last Updated: March 5th, 2026</p>
</div>

<div class="legal-prose">
    <h2>1. What Are Cookies?</h2>
    <p>
        Cookies are small cryptographic state files cached by your browser
        locally. Across Progeta Technologies, we prioritize the modern HTML5 Web
        Storage API (LocalStorage and IndexedDB) over traditional legacy cookies
        whenever technically feasible, leaning into our Local-First philosophy.
    </p>

    <h2>2. How We Utilize State Storage</h2>

    <h3>Strictly Necessary Logistics</h3>
    <p>
        We deploy critical local states strictly to power essential app
        behaviors.
    </p>
    <ul>
        <li>
            <strong>Simulation Anchors:</strong> Storing `lastPlayed` timestamps
            or scenario completion hashes so you do not lose progress if you drop
            a connection.
        </li>
        <li>
            <strong>Authentication Tokens:</strong> Securely caching your JWTs if
            you choose to bypass Local-First mode and authenticate to our Edge network
            (for cross-device synchronization).
        </li>
        <li>
            <strong>UI Preferences:</strong> Maintaining your dark mode toggles or
            sidebar collapsed states.
        </li>
    </ul>

    <h3>No Third-Party Advertising Beacons</h3>
    <p>
        Unlike traditional tech platforms, we do not inject external advertising
        networks (e.g., Google Ads, Meta Pixel) into our domains. We use
        absolutely zero behavioral-tracking cookies intended for cross-site
        surveillance or monetization.
    </p>

    <h2>3. SelfOS Local-First Mechanism</h2>
    <p>
        If you utilize SelfOS in the unauthenticated "Guest Mode", <strong
            >100% of your operational state is cached locally</strong
        >.
    </p>
    <p>
        This utilizes IndexedDB. We have no remote capability to inspect,
        intercept, or modify this persistent data. It exists entirely on your
        physical hardware.
    </p>

    <h2>4. Taking Control</h2>
    <p>
        You hold ultimate authority over your machine's state. You can clear our
        application caches at any time natively via your browser's Developer
        Tools (F12 > Application > Local Storage / IndexedDB).
    </p>
    <p>
        <em>Warning:</em> Purging these caches while operating exclusively in Local-First
        Guest Mode will result in the permanent, irrecoverable loss of your simulation
        progress and SelfOS data.
    </p>
</div>
