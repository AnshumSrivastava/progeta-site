/**
 * Unified game data store — all game progress under single `pt-games` key.
 * Handles reads, writes, badge awards, streak tracking, and data export.
 */

import { BADGES, BADGE_XP, getLevelForXp } from './badges';

const STORAGE_KEY = 'pt-games';
const VERSION = '1.0';

// Old per-game keys to migrate from
const LEGACY_KEYS = [
    'pt-signal-noise',
    'pt-the-breach',
    'pt-mirror',
    'pt-speech-of-day',
    'pt-quantum-q',
    'pt-threat-profile',
    'pt-decision-tree',
    'pt-cipher',
    'pt-the-audit',
    'pt-one-concept',
    'pt-threat-model',
    'pt-reflection-log',
    'pt-the-board',
    'pt-system-check',
];

const LEGACY_TO_SLUG: Record<string, string> = {
    'pt-signal-noise': 'signal-or-noise',
    'pt-the-breach': 'the-breach',
    'pt-mirror': 'mirror',
    'pt-speech-of-day': 'speech-of-the-day',
    'pt-quantum-q': 'quantum-question',
    'pt-threat-profile': 'threat-profile',
    'pt-decision-tree': 'decision-tree',
    'pt-cipher': 'cipher',
    'pt-the-audit': 'the-audit',
    'pt-one-concept': 'one-concept-a-day',
    'pt-threat-model': 'build-threat-model',
    'pt-reflection-log': 'reflection-log',
    'pt-the-board': 'the-board',
    'pt-system-check': 'system-check',
};

export interface GameData {
    streak?: number;
    lastDate?: string;
    history?: any[];
    totalPlayed?: number;
    bestScore?: number;
    badges?: string[];
    [key: string]: any;
}

export interface AggregateData {
    totalGamesPlayed: number;
    uniqueGamesPlayed: string[];
    totalBadgesEarned: number;
    allBadges: string[];
    xp: number;
    level: number;
}

export interface StoreData {
    version: string;
    lastSaved: string;
    _aggregate: AggregateData;
    [gameSlug: string]: any;
}

function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function defaultAggregate(): AggregateData {
    return {
        totalGamesPlayed: 0,
        uniqueGamesPlayed: [],
        totalBadgesEarned: 0,
        allBadges: [],
        xp: 0,
        level: 1,
    };
}

function migrateIfNeeded(data: StoreData): StoreData {
    if (!isBrowser()) return data;
    let migrated = false;

    for (const legacyKey of LEGACY_KEYS) {
        const raw = localStorage.getItem(legacyKey);
        if (!raw) continue;

        try {
            const legacyData = JSON.parse(raw);
            const slug = LEGACY_TO_SLUG[legacyKey];
            if (slug && !data[slug]) {
                // Preserve legacy data under the new slug,
                // wrapping arrays in a history field
                if (Array.isArray(legacyData)) {
                    data[slug] = { history: legacyData, badges: [] };
                } else {
                    data[slug] = { ...legacyData, badges: legacyData.badges || [] };
                }
                migrated = true;
            }
            // Remove old key after migration
            localStorage.removeItem(legacyKey);
        } catch {
            // Skip corrupt legacy data
        }
    }

    if (migrated) {
        data.lastSaved = new Date().toISOString();
    }
    return data;
}

export const Store = {
    _read(): StoreData {
        if (!isBrowser()) {
            return { version: VERSION, lastSaved: '', _aggregate: defaultAggregate() };
        }
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            let data: StoreData = raw
                ? JSON.parse(raw)
                : { version: VERSION, lastSaved: '', _aggregate: defaultAggregate() };

            if (!data._aggregate) data._aggregate = defaultAggregate();
            if (!data.version) data.version = VERSION;

            // Migrate from old per-game keys on first load
            data = migrateIfNeeded(data);
            return data;
        } catch {
            return { version: VERSION, lastSaved: '', _aggregate: defaultAggregate() };
        }
    },

    _write(data: StoreData): void {
        if (!isBrowser()) return;
        data.lastSaved = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    /** Get all data for a specific game. */
    get(gameSlug: string): GameData {
        const all = this._read();
        return all[gameSlug] || { badges: [] };
    },

    /** Merge data into a specific game's store. */
    set(gameSlug: string, data: Partial<GameData>): void {
        const all = this._read();
        all[gameSlug] = { ...(all[gameSlug] || { badges: [] }), ...data };

        // Update aggregate — track unique games
        if (!all._aggregate.uniqueGamesPlayed.includes(gameSlug)) {
            all._aggregate.uniqueGamesPlayed.push(gameSlug);
        }
        all._aggregate.totalGamesPlayed = (all._aggregate.totalGamesPlayed || 0) + 1;

        this._write(all);
    },

    /**
     * Award a badge. Returns `true` if the badge is new (triggers reveal animation).
     * Returns `false` if already earned.
     */
    addBadge(gameSlug: string, badgeId: string): boolean {
        const all = this._read();
        if (!all[gameSlug]) all[gameSlug] = { badges: [] };
        if (!all[gameSlug].badges) all[gameSlug].badges = [];

        if (all[gameSlug].badges.includes(badgeId)) return false;

        // Add to game-level badges
        all[gameSlug].badges.push(badgeId);

        // Add to aggregate
        if (!all._aggregate.allBadges.includes(badgeId)) {
            all._aggregate.allBadges.push(badgeId);
            all._aggregate.totalBadgesEarned = all._aggregate.allBadges.length;
            all._aggregate.xp = (all._aggregate.xp || 0) + (BADGE_XP[badgeId] || 10);
            all._aggregate.level = getLevelForXp(all._aggregate.xp);
        }

        this._write(all);
        return true;
    },

    /**
     * Update streak for a daily game. Returns the new streak value.
     * - Same day: no change
     * - Yesterday: increment
     * - Earlier: reset to 1
     */
    updateStreak(gameSlug: string): number {
        const data = this.get(gameSlug);
        const today = new Date().toISOString().slice(0, 10);
        const last = data.lastDate;
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

        let streak = data.streak || 0;

        if (last === today) {
            // Already played today, no streak change
        } else if (last === yesterday) {
            streak++;
        } else {
            streak = 1;
        }

        this.set(gameSlug, { streak, lastDate: today });
        return streak;
    },

    /** Get the aggregate cross-game data. */
    getAggregate(): AggregateData {
        return this._read()._aggregate;
    },

    /** Get all badges earned across all games. */
    getAllBadges(): string[] {
        return this._read()._aggregate.allBadges || [];
    },

    /** Export all game data as a JSON download. */
    exportAll(): void {
        if (!isBrowser()) return;
        const data = this._read();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `progeta-games-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },
};
