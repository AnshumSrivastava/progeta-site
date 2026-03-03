<script lang="ts">
    /** @type {string} */
    export let quote = "";
    /** @type {string} */
    export let name = "";
    /** @type {string} */
    export let role = "";
    /** @type {string} */
    export let campus = "";
</script>

<div class="testimonial-card">
    <div class="quote-mark">"</div>
    <p class="quote">{quote}</p>
    <div class="attribution">
        <div class="avatar">{name.charAt(0)}</div>
        <div class="details">
            <strong>{name}</strong>
            <span>{role}{campus ? `, ${campus}` : ""}</span>
        </div>
    </div>
</div>

<style>
    .testimonial-card {
        background: rgba(13, 13, 18, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        padding: 2.5rem 2rem;
        position: relative;
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .testimonial-card:hover {
        border-color: rgba(255, 255, 255, 0.15);
        transform: translateY(-3px);
    }

    .quote-mark {
        font-size: 3rem;
        line-height: 1;
        color: var(--accent-blue, #3b82f6);
        opacity: 0.4;
        font-family: Georgia, serif;
        margin-bottom: 0.5rem;
    }

    .quote {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .attribution {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--text-primary);
    }

    .details {
        display: flex;
        flex-direction: column;
    }

    .details strong {
        font-size: 0.85rem;
        color: var(--text-primary);
    }

    .details span {
        font-size: 0.75rem;
        color: var(--text-tertiary, rgba(255, 255, 255, 0.4));
    }
</style>
