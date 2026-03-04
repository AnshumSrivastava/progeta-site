<script lang="ts">
    import { fade, scale } from "svelte/transition";

    export let isOpen = false;
    export let trackName = "";

    let name = "";
    let email = "";
    let whyJoin = "";

    let status: "idle" | "submitting" | "success" | "error" = "idle";

    function closeModal() {
        if (status !== "submitting") {
            isOpen = false;
            setTimeout(() => {
                status = "idle";
                name = "";
                email = "";
                whyJoin = "";
            }, 300);
        }
    }

    async function handleSubmit() {
        status = "submitting";

        // Google Apps Script Web App endpoint - See Walkthrough.md to configure
        const scriptURL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

        const formData = new FormData();
        formData.append("Track", trackName);
        formData.append("Name", name);
        formData.append("Email", email);
        formData.append("Intent", whyJoin);
        formData.append("Timestamp", new Date().toISOString());

        try {
            // In a real environment with the actual Script URL, we'd fire the fetch:
            /*
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Network response was not ok');
      */

            // Simulate network request for UI demonstration until backend is deployed
            await new Promise((resolve) => setTimeout(resolve, 1500));
            status = "success";
        } catch (error) {
            console.error("Error submitting form", error);
            status = "error";
        }
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="modal-backdrop"
        transition:fade={{ duration: 200 }}
        on:click={closeModal}
    >
        <div
            class="modal-content"
            transition:scale={{ duration: 200, start: 0.95 }}
            on:click|stopPropagation
        >
            <button class="modal-close" on:click={closeModal}>✕</button>

            {#if status === "success"}
                <div class="modal-success">
                    <div class="success-icon">✓</div>
                    <h2>Application Received</h2>
                    <p>
                        We've received your application for the <strong
                            >{trackName}</strong
                        > track. Our operations team will reach out with the next
                        steps soon.
                    </p>
                    <button
                        type="button"
                        class="btn-primary"
                        on:click={closeModal}>Close Window</button
                    >
                </div>
            {:else}
                <div class="modal-header">
                    <h2>Track Enrollment</h2>
                    <p>Apply for a spot in: <strong>{trackName}</strong></p>
                </div>

                <form
                    class="modal-form"
                    on:submit|preventDefault={handleSubmit}
                >
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            bind:value={name}
                            required
                            placeholder="Jane Doe"
                            disabled={status === "submitting"}
                        />
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            required
                            placeholder="jane@example.com"
                            disabled={status === "submitting"}
                        />
                    </div>

                    <div class="form-group">
                        <label for="intent"
                            >Why do you want to join this track?</label
                        >
                        <textarea
                            id="intent"
                            bind:value={whyJoin}
                            required
                            rows="3"
                            placeholder="I am looking to pivot into InfoSec..."
                            disabled={status === "submitting"}
                        ></textarea>
                    </div>

                    {#if status === "error"}
                        <div class="error-msg">
                            Failed to submit application. Please try again or
                            contact operations directly via email.
                        </div>
                    {/if}

                    <div class="form-actions">
                        <button
                            type="button"
                            class="btn-secondary"
                            on:click={closeModal}
                            disabled={status === "submitting"}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="btn-primary"
                            disabled={status === "submitting"}
                        >
                            {status === "submitting"
                                ? "Submitting..."
                                : "Submit Application →"}
                        </button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(2, 4, 8, 0.85);
        backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--sp-4);
    }

    .modal-content {
        background: #07090f;
        border: 1px solid #1f2335;
        border-radius: 8px;
        width: 100%;
        max-width: 500px;
        padding: var(--sp-8);
        position: relative;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }

    .modal-close {
        position: absolute;
        top: var(--sp-4);
        right: var(--sp-4);
        background: transparent;
        border: none;
        color: #424870;
        font-size: 20px;
        cursor: pointer;
        transition: color 0.2s;
    }
    .modal-close:hover {
        color: #edf0ff;
    }

    .modal-header {
        margin-bottom: var(--sp-6);
    }
    .modal-header h2 {
        font-family: var(--font-serif);
        font-size: 28px;
        color: #edf0ff;
        margin-bottom: var(--sp-2);
    }
    .modal-header p {
        font-family: var(--font-body);
        font-size: 14px;
        color: #8890bb;
    }
    .modal-header strong {
        color: var(--accent-orange);
        font-weight: 500;
    }

    .modal-form {
        display: flex;
        flex-direction: column;
        gap: var(--sp-5);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--sp-2);
    }
    .form-group label {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        color: #424870;
        text-transform: uppercase;
    }
    .form-group input,
    .form-group textarea {
        background: #020408;
        border: 1px solid #1f2335;
        padding: 12px 16px;
        color: #edf0ff;
        font-family: var(--font-body);
        font-size: 14px;
        border-radius: 4px;
        transition: border-color 0.2s;
    }
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--accent-orange);
    }
    .form-group input:disabled,
    .form-group textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--sp-3);
        margin-top: var(--sp-2);
    }

    .btn-primary,
    .btn-secondary {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-primary {
        background: var(--accent-orange);
        color: #fff;
        border: none;
    }
    .btn-primary:hover:not(:disabled) {
        background: #c44e14;
    }
    .btn-primary:disabled {
        opacity: 0.7;
        cursor: wait;
    }

    .btn-secondary {
        background: transparent;
        border: 1px solid #1f2335;
        color: #8890bb;
    }
    .btn-secondary:hover:not(:disabled) {
        background: #171b30;
        color: #edf0ff;
    }

    .error-msg {
        color: #ff4a4a;
        font-size: 13px;
        font-family: var(--font-body);
        padding: var(--sp-3);
        background: rgba(255, 74, 74, 0.1);
        border: 1px solid rgba(255, 74, 74, 0.2);
        border-radius: 4px;
    }

    .modal-success {
        text-align: center;
        padding: var(--sp-6) 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--sp-4);
    }
    .success-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(24, 201, 106, 0.1);
        color: #18c96a;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        margin-bottom: var(--sp-2);
    }
    .modal-success h2 {
        font-family: var(--font-serif);
        font-size: 24px;
        color: #edf0ff;
    }
    .modal-success p {
        font-family: var(--font-body);
        font-size: 15px;
        color: #8890bb;
        line-height: 1.6;
        max-width: 320px;
        margin: 0 auto;
    }
    .modal-success strong {
        color: var(--accent-orange);
    }
    .modal-success .btn-primary {
        margin-top: var(--sp-4);
    }
</style>
