<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function enterSite() {
        dispatch('enter');
    }
</script>

<div id="loader-overlay" class="loader-overlay">
    <div class="loader-invitation">
        <div class="invitation-card">
            <div class="invitation-header"
                style="color:var(--accent-primary); font-size:0.8rem; letter-spacing:2px; margin-bottom:1rem; font-family:var(--font-mono);">
                EST. 2026</div>
            <h1
                style="margin: 0; font-size: 3.5rem; color: #fff; line-height:1; letter-spacing:-2px; text-transform: uppercase;">
                PROGETA<br><span style="font-size: 2rem; letter-spacing: 0.5rem;">TECHNOLOGIES</span></h1>
            <p
                style="color: var(--text-tertiary); margin: 1.5rem 0 3rem; font-family:var(--font-mono); font-size:0.9rem; text-transform: uppercase; letter-spacing: 1px;">
                TAKE BACK CONTROL AND RISE ABOVE
            </p>
            <button id="enter-btn" class="invitation-action-btn" on:click={enterSite}
                style="background:transparent; border:1px solid #333; color:#fff; padding:1rem 3rem; font-size:0.8rem; letter-spacing:2px; cursor:pointer;">ENTER</button>
        </div>
    </div>
</div>

<style>
    .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
