/**
 * Typed wrapper around localStorage with JSON serialisation.
 */
export function localStore<T>(key: string, defaultValue: T) {
    const storageKey = `selfos_${key}`;

    function get(): T {
        if (typeof window === 'undefined') return defaultValue;
        const raw = localStorage.getItem(storageKey);
        if (raw === null) return defaultValue;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return defaultValue;
        }
    }

    function set(value: T): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(storageKey, JSON.stringify(value));
    }

    function update(updater: (current: T) => T): void {
        set(updater(get()));
    }

    function clear(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(storageKey);
    }

    return { get, set, update, clear, key: storageKey };
}
