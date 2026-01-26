import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Type: Set of completed Module IDs
// We use a Set for O(1) lookups, but serialize to Array for JSON.
let saved = ['1']; // Default valid state (strings)
if (browser) {
    try {
        const item = localStorage.getItem('progeta_progress');
        if (item) {
            saved = JSON.parse(item).map(String); // Ensure strings
        }
    } catch (e) {
        console.error('Failed to load progress', e);
        // Reset if corrupt
        localStorage.removeItem('progeta_progress');
    }
}

export const completedModules = writable<string[]>(saved);

// Subscribe and save to localStorage
if (browser) {
    completedModules.subscribe((value) => {
        try {
            localStorage.setItem('progeta_progress', JSON.stringify(value));
        } catch (e) { console.error('Failed to save progress', e); }
    });
}

export function markAsComplete(moduleId: string | number) {
    completedModules.update(list => {
        const id = String(moduleId);
        if (!list.includes(id)) {
            return [...list, id];
        }
        return list;
    });
}

export function isComplete(list: string[], moduleId: string | number): boolean {
    return list.includes(String(moduleId));
}
