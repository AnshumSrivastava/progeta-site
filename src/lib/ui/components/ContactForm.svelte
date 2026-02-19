<script lang="ts">
    import { fade } from "svelte/transition";

    let name = "";
    let email = "";
    let subject = "Book Cybersecurity Awareness Session";
    let role = "";
    let college = "";
    let city = "";
    let message = "";
    let isSending = false;
    let showSuccess = false;
    let errorMessage = "";

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxqh1zkmUbgAB_GGkj3M2xxMfCMnJ_qaFGXe_WveQe3_rpH_08bh2BaqEuorXfVNLOp/exec";

    // Show qualification fields for institutional/chapter intents
    $: showQualificationFields = [
        "Book Cybersecurity Awareness Session",
        "Start Student Chapter",
        "Request Partnership",
    ].includes(subject);

    // Show role field for student-facing intents too
    $: showRoleField = subject !== "Media / Speaking";

    const inquiryTypes = [
        "Book Cybersecurity Awareness Session",
        "Start Student Chapter",
        "Join Community",
        "Enroll in Skill Track",
        "Request Partnership",
        "Media / Speaking",
    ];

    const roles = [
        "Student",
        "Faculty",
        "Training & Placement Officer",
        "Club Lead",
        "Other",
    ];

    async function handleSubmit() {
        isSending = true;
        errorMessage = "";

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("subject", subject);
            if (showRoleField && role) formData.append("role", role);
            if (showQualificationFields) {
                formData.append("college", college);
                formData.append("city", city);
            }
            formData.append("message", message);

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: formData,
            });

            isSending = false;
            showSuccess = true;
            name = "";
            email = "";
            message = "";
            role = "";
            college = "";
            city = "";
            setTimeout(() => {
                showSuccess = false;
            }, 5000);
        } catch (error) {
            console.error(error);
            errorMessage =
                "Connection failed. Please check your internet or try again.";
            isSending = false;
        }
    }
</script>

<div class="glass-card">
    {#if showSuccess}
        <div class="success-message" in:fade>
            <div class="check-icon">✓</div>
            <h3>Message Sent</h3>
            <p>We will be in touch shortly.</p>
        </div>
    {:else}
        <form on:submit|preventDefault={handleSubmit}>
            <div class="row">
                <div class="field-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        bind:value={name}
                        placeholder="Your full name"
                        required
                    />
                </div>
                <div class="field-group">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        placeholder="you@example.com"
                        required
                    />
                </div>
            </div>

            <div class="field-group">
                <label for="subject">I want to...</label>
                <div class="select-wrapper">
                    <select id="subject" bind:value={subject}>
                        {#each inquiryTypes as type}
                            <option>{type}</option>
                        {/each}
                    </select>
                </div>
            </div>

            {#if showRoleField}
                <div class="field-group" in:fade={{ duration: 200 }}>
                    <label for="role">Your Role</label>
                    <div class="select-wrapper">
                        <select id="role" bind:value={role}>
                            <option value="" disabled selected
                                >Select your role</option
                            >
                            {#each roles as r}
                                <option>{r}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            {/if}

            {#if showQualificationFields}
                <div class="row" in:fade={{ duration: 200 }}>
                    <div class="field-group">
                        <label for="college">College / Institution</label>
                        <input
                            id="college"
                            type="text"
                            bind:value={college}
                            placeholder="College name"
                        />
                    </div>
                    <div class="field-group">
                        <label for="city">City</label>
                        <input
                            id="city"
                            type="text"
                            bind:value={city}
                            placeholder="Your city"
                        />
                    </div>
                </div>
            {/if}

            <div class="field-group">
                <label for="message">Message</label>
                <textarea
                    id="message"
                    bind:value={message}
                    placeholder="Tell us what you're looking for..."
                    rows="4"
                    required
                ></textarea>
            </div>

            <button type="submit" class="submit-btn" disabled={isSending}>
                {#if isSending}
                    <span class="spinner"></span> Sending...
                {:else}
                    Send Message →
                {/if}
            </button>

            {#if errorMessage}
                <p class="error-msg" in:fade>{errorMessage}</p>
            {/if}
        </form>
    {/if}
</div>

<style>
    :root {
        --border: rgba(255, 255, 255, 0.08);
        --accent: #3b82f6;
    }

    .glass-card {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 3rem;
        width: 100%;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }
    .field-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: left;
    }
    label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #e2e8f0;
        margin-left: 4px;
    }

    input,
    textarea,
    select {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1rem;
        font-size: 1rem;
        color: #fff;
        font-family: inherit;
        outline: none;
        transition: all 0.2s;
        width: 100%;
        box-sizing: border-box;
    }

    input:focus,
    textarea:focus,
    select:focus {
        border-color: var(--accent);
        background: rgba(0, 0, 0, 0.5);
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }
    .select-wrapper {
        position: relative;
    }

    .submit-btn {
        background: #fff;
        color: #000;
        border: none;
        padding: 1rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    .submit-btn:hover {
        background: #f1f5f9;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
    }
    .submit-btn:disabled {
        opacity: 0.7;
        transform: none;
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #000;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .success-message {
        text-align: center;
        padding: 2rem;
    }
    .check-icon {
        font-size: 3rem;
        color: #4ade80;
        margin-bottom: 1rem;
    }

    .error-msg {
        color: #ef4444;
        font-size: 0.9rem;
        margin-top: 1rem;
        text-align: center;
    }

    @media (max-width: 600px) {
        .row {
            grid-template-columns: 1fr;
        }
        .glass-card {
            padding: 2rem;
        }
    }
</style>
