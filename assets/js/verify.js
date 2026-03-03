/* ═══════════════════════════════════════════════════════════════
   verify.js — Client-side certificate verification
   Fetches from /assets/data/certificates.json
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cert-id');
    const btn = document.getElementById('verify-btn');
    const validPanel = document.getElementById('result-valid');
    const invalidPanel = document.getElementById('result-invalid');

    if (!btn || !input) return;

    async function verifyCertificate() {
        const certId = input.value.trim();
        if (!certId) return;

        // Hide previous results
        validPanel.classList.remove('show');
        invalidPanel.classList.remove('show');
        btn.textContent = 'Verifying...';
        btn.disabled = true;

        try {
            const response = await fetch('/assets/data/certificates.json');
            const certs = await response.json();
            const match = certs.find(c => c.id.toUpperCase() === certId.toUpperCase());

            if (match) {
                document.getElementById('result-name').textContent = match.name;
                document.getElementById('result-programme').textContent = match.programme;
                document.getElementById('result-issued').textContent = formatDate(match.issued);
                document.getElementById('result-status-val').textContent = match.status === 'active' ? 'Active' : 'Inactive';
                validPanel.classList.add('show');
            } else {
                invalidPanel.classList.add('show');
            }
        } catch (err) {
            invalidPanel.classList.add('show');
        }

        btn.textContent = 'Verify';
        btn.disabled = false;
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    btn.addEventListener('click', verifyCertificate);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') verifyCertificate();
    });
});
