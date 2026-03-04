<svelte:head>
    <title>Privacy Policy | Progeta Technologies</title>
    <meta
        name="description"
        content="How Progeta Technologies handles, processes, and protects your operational data."
    />
</svelte:head>

<div class="legal-header">
    <span class="legal-eyebrow">LEGAL & TRUST</span>
    <h1 class="legal-title">Privacy Policy</h1>
    <p class="legal-last-updated">Last Updated: March 5th, 2026</p>
</div>

<div class="legal-prose">
    <p>
        At Progeta Technologies ("we", "our", or "us"), digital sovereignty and
        privacy are core architectural tenets, not afterthought compliance
        checkboxes. This Privacy Policy details the exact mechanisms by which we
        process, store, and protect information when you engage with our
        websites, interactive simulations, and Local-First ecosystems (including
        SelfOS).
    </p>

    <h2>1. Data Minimization Doctrine</h2>
    <p>
        We operate strictly on a <strong>data minimization principle</strong>.
        We deliberately design our systems to structurally avoid handling
        Personal Identifiable Information (PII) wherever possible. If we do not
        need the data to execute the specific operation you requested, our code
        does not collect it.
    </p>

    <h2>2. Information We Collect</h2>

    <h3>2.1 Data Provided Directly By You</h3>
    <ul>
        <li>
            <strong>Program Enrollment:</strong> When applying for LaunchPad Tracks,
            Student Chapters, or College programs, we collect the exact payloads
            you provide in our secure lead-capture modals (Name, Email, Intent).
        </li>
        <li>
            <strong>Operational Interactions:</strong> Communications directed to
            our support or operations email addresses.
        </li>
    </ul>

    <h3>2.2 Telemetry & Machine Data</h3>
    <ul>
        <li>
            <strong>Simulation Context:</strong> While actively participating in
            our Training Labs or Scenarios, we temporarily track session state to
            facilitate the game loop. This data is ephemeral and flushed upon completion.
        </li>
        <li>
            <strong>Standard Web Server Logs:</strong> To ensure network security
            and prevent denial-of-service attacks, our edge relays log standard request
            artifacts (IP addresses, browser signatures, request timestamps). This
            data is isolated to security diagnostics and strictly TTL-rotated.
        </li>
    </ul>

    <h2>3. The SelfOS "Local-First" Guarantee</h2>
    <p>
        If you utilize <strong>SelfOS in Guest Mode</strong> or run the source
        code on your own hardware,
        <strong>we have zero visibility into your data</strong>.
    </p>
    <p>
        In Local-First mode, the application state is maintained exclusively
        within the boundaries of your local machine (via IndexedDB and
        LocalStorage). We do not deploy "shadow trackers" or background
        telemetry daemons into the unauthenticated SelfOS builds.
    </p>

    <h2>4. How We Use Information</h2>
    <p>We restrict data processing to the following operational mandates:</p>
    <ul>
        <li>Fulfilling direct requests for enrollment or correspondence.</li>
        <li>
            Vulnerability mitigation, abuse prevention, and network integrity
            diagnostics.
        </li>
        <li>
            Aggregated, anonymous statistical analysis of Simulation completion
            rates to balance difficulty curves.
        </li>
    </ul>

    <h2>5. Third-Party Intelligence Sharing</h2>
    <p>
        <strong>We do not sell data.</strong> We do not deploy third-party advertising
        trackers.
    </p>
    <p>
        We only share telemetry with necessary infrastructure providers (e.g.,
        edge hosting, DDoS protection, email gateways) solely for the purpose of
        keeping our services online and secure. We do not voluntarily surrender
        operational data to external agencies unless compelled by a verified,
        legally binding judicial order.
    </p>

    <h2>6. Your Sovereign Rights</h2>
    <p>
        Depending on your jurisdiction (e.g., GDPR, CCPA, IT Act), you retain
        sovereign control over your identity. You may contact us at any time to:
    </p>
    <ul>
        <li>
            Request a cryptographic export of any PII bound to your address.
        </li>
        <li>
            Demand the immediate purging of your records from our active
            databases.
        </li>
    </ul>

    <h2>7. Communications and Adjustments</h2>
    <p>
        We reserve the right to patch this policy as our infrastructure scales.
        Major architectural changes to our data handling pathways will be
        broadcast via our standard communication channels prior to enforcement.
    </p>

    <p>
        For all privacy inquiries, data deletion requests, or compliance audits,
        direct your transmissions to: <a href="mailto:privacy@progeta.tech"
            >privacy@progeta.tech</a
        >.
    </p>
</div>
