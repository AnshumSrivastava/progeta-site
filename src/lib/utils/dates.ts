/**
 * Date utilities for SelfOS.
 */

/**
 * Returns today's date as YYYY-MM-DD string.
 */
export function today(): string {
    return new Date().toISOString().slice(0, 10);
}

/**
 * Returns current ISO timestamp.
 */
export function now(): string {
    return new Date().toISOString();
}

/**
 * Format a date string as a readable date.
 * e.g. "2024-03-15" → "15 Mar 2024"
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Format a date string as relative time.
 * e.g. "2 hours ago", "3 days ago"
 */
export function relativeTime(dateStr: string): string {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = now - then;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
}

/**
 * Check if a date is today.
 */
export function isToday(dateStr: string): boolean {
    return dateStr.slice(0, 10) === today();
}
