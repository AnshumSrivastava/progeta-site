import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Creates a writable store that persists to localStorage
 * @param key The localStorage key
 * @param initialValue The initial value if no data exists
 */
export function persistentStore<T>(key: string, initialValue: T) {
    // Get stored value from localStorage if available
    const storedValue = browser ? localStorage.getItem(key) : null;
    const data = storedValue ? JSON.parse(storedValue) : initialValue;

    const store = writable<T>(data);
    const { subscribe, set, update } = store;

    return {
        subscribe,
        set: (value: T) => {
            if (browser) {
                localStorage.setItem(key, JSON.stringify(value));
            }
            set(value);
        },
        update: (updater: (value: T) => T) => {
            update((currentValue) => {
                const newValue = updater(currentValue);
                if (browser) {
                    localStorage.setItem(key, JSON.stringify(newValue));
                }
                return newValue;
            });
        }
    };
}

// --- Global Stores ---

// User Progression (Streaks, XP, etc.)
export const userProgress = persistentStore('progeta_user_progress', {
    xp: 0,
    streak: 0,
    lastActive: new Date().toISOString(),
    completedModules: [] as string[], // IDs of completed modules
    gamesPlayed: 0
});

// Game States (Specific game data)
export const cmdCrossState = persistentStore('progeta_game_cmdcross', {
    highScore: 0,
    unlockedLevels: [1]
});

// Preferences
export const userPreferences = persistentStore('progeta_preferences', {
    reducedMotion: false,
    soundEnabled: true
});
