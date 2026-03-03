/**
 * Formatting utilities.
 */

/**
 * Format a number with locale-appropriate separators.
 * e.g. 2500 → "2,500"
 */
export function formatNumber(n: number): string {
    return n.toLocaleString('en-IN');
}

/**
 * Format currency (INR by default).
 * e.g. 1500.50 → "₹1,500.50"
 */
export function formatCurrency(amount: number, currency = 'INR'): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Format minutes as hours and minutes.
 * e.g. 135 → "2h 15m"
 */
export function formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + '…';
}
