<script lang="ts">
    import { reveal } from "$lib/ui/actions";
    import MagneticButton from "$lib/ui/components/MagneticButton.svelte";
    import { base } from "$app/paths";
    export let title: string = "Coming Soon";
    export let description: string =
        "We're currently building this feature. Check back soon for updates.";
    export let isWaitlist: boolean = true;

    let email = "";
    let submitted = false;

    function handleWaitlistSubmit(e: Event) {
        e.preventDefault();
        if (email) {
            // Placeholder: Wire up to actual backend endpoint later
            console.log("Waitlist joining:", email);
            submitted = true;
            email = "";
        }
    }
</script>

<div class="coming-soon-container">
    <div class="content" use:reveal={{ delay: 100 }}>
        <!-- Minimal geometric placeholder graphic -->
        <svg
            class="placeholder-icon"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
        </svg>

        <h1 class="title">{title}</h1>
        <p class="description">{description}</p>

        {#if isWaitlist}
            <div class="waitlist-card mt-6">
                {#if submitted}
                    <div class="success-msg">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                            ></path><polyline points="22 4 12 14.01 9 11.01"
                            ></polyline></svg
                        >
                        <span>You're on the list. We'll be in touch.</span>
                    </div>
                {:else}
                    <form
                        on:submit={handleWaitlistSubmit}
                        class="waitlist-form"
                    >
                        <input
                            type="email"
                            bind:value={email}
                            placeholder="Enter your email address..."
                            required
                            class="zen-input"
                        />
                        <button type="submit" class="btn btn-primary"
                            >Join Waitlist</button
                        >
                    </form>
                {/if}
            </div>
        {/if}

        <div class="action-wrap mt-8">
            <MagneticButton href="{base}/" variant="outline"
                >Return Home</MagneticButton
            >
        </div>
    </div>
</div>

<style>
    .coming-soon-container {
        min-height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        text-align: center;
    }

    .content {
        max-width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
    }

    .placeholder-icon {
        color: var(--text-secondary);
        opacity: 0.5;
        margin-bottom: 1rem;
    }

    .title {
        font-family: var(--font-display);
        font-size: 2.5rem;
        color: var(--text-primary);
        letter-spacing: -0.02em;
    }

    .description {
        color: var(--text-secondary);
        font-size: 1.1rem;
        line-height: 1.6;
    }

    /* Waitlist Styling */
    .waitlist-card {
        width: 100%;
        background: var(--glass-surface);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 1.5rem;
    }

    .waitlist-form {
        display: flex;
        gap: 0.75rem;
        align-items: stretch;
    }

    .zen-input {
        flex: 1;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 0.75rem 1.25rem;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.3s;
    }

    .zen-input:focus {
        outline: none;
        border-color: var(--text-secondary);
        background: rgba(0, 0, 0, 0.3);
    }

    .btn {
        padding: 0 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
    }

    .success-msg {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        color: #10b981; /* Emerald */
        font-weight: 500;
        padding: 0.5rem 0;
    }

    .action-wrap {
        margin-top: 1rem;
    }

    .mt-6 {
        margin-top: 1.5rem;
    }

    .mt-8 {
        margin-top: 2rem;
    }

    @media (max-width: 600px) {
        .waitlist-form {
            flex-direction: column;
        }
        .btn {
            padding: 1rem;
        }
    }
</style>
