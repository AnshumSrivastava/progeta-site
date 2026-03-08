/**
 * Badge definitions, XP values, rarity tiers, and level thresholds.
 * 40 badges across 14 games + 3 cross-game badges.
 */

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface Badge {
    name: string;
    desc: string;
    xp: number;
    icon: string;
    rarity: BadgeRarity;
    gameSlug: string; // which game this belongs to, '_cross' for cross-game
}

export const BADGES: Record<string, Badge> = {
    // ── SIGNAL OR NOISE ──
    'sns-first-complete': { name: 'First Signal', desc: 'Completed Signal or Noise for the first time.', xp: 10, icon: 'signal', rarity: 'common', gameSlug: 'signal-or-noise' },
    'sns-streak-3': { name: '3-Day Reader', desc: '3-day streak on Signal or Noise.', xp: 20, icon: 'streak-3', rarity: 'common', gameSlug: 'signal-or-noise' },
    'sns-streak-7': { name: 'Week of Clarity', desc: '7-day streak on Signal or Noise.', xp: 50, icon: 'streak-7', rarity: 'uncommon', gameSlug: 'signal-or-noise' },
    'sns-streak-30': { name: 'Signal Master', desc: '30-day streak on Signal or Noise.', xp: 150, icon: 'streak-30', rarity: 'rare', gameSlug: 'signal-or-noise' },
    'sns-perfect': { name: 'No Noise', desc: 'Perfect score (5/5) on Signal or Noise.', xp: 30, icon: 'perfect', rarity: 'uncommon', gameSlug: 'signal-or-noise' },

    // ── THE BREACH ──
    'breach-first': { name: 'First Responder', desc: 'Completed The Breach for the first time.', xp: 15, icon: 'breach', rarity: 'common', gameSlug: 'the-breach' },
    'breach-all-scenarios': { name: 'Incident Analyst', desc: 'Completed all available Breach scenarios.', xp: 80, icon: 'analyst', rarity: 'uncommon', gameSlug: 'the-breach' },

    // ── MIRROR ──
    'mirror-first': { name: 'First Reflection', desc: 'Completed Mirror for the first time.', xp: 10, icon: 'mirror', rarity: 'common', gameSlug: 'mirror' },
    'mirror-ten': { name: 'Pattern Reader', desc: '10 completed Mirror sessions.', xp: 60, icon: 'pattern', rarity: 'uncommon', gameSlug: 'mirror' },
    'mirror-70pct': { name: 'Sharp Eye', desc: 'Lifetime accuracy above 70% in Mirror.', xp: 100, icon: 'eye', rarity: 'rare', gameSlug: 'mirror' },

    // ── SPEECH OF THE DAY ──
    'speech-first': { name: 'First Delivery', desc: 'Delivered your first Speech of the Day.', xp: 20, icon: 'speech', rarity: 'common', gameSlug: 'speech-of-the-day' },
    'speech-streak-3': { name: '3-Day Orator', desc: '3-day delivery streak.', xp: 30, icon: 'orator-3', rarity: 'common', gameSlug: 'speech-of-the-day' },
    'speech-streak-14': { name: 'The Voice', desc: '14-day delivery streak.', xp: 100, icon: 'voice', rarity: 'rare', gameSlug: 'speech-of-the-day' },

    // ── QUANTUM QUESTION ──
    'quantum-first': { name: 'Q-Curious', desc: 'Completed Quantum Question for the first time.', xp: 10, icon: 'qubit', rarity: 'common', gameSlug: 'quantum-question' },
    'quantum-50pts': { name: 'Post-Quantum Ready', desc: 'Scored 50/60 or above in Quantum Question.', xp: 80, icon: 'quantum50', rarity: 'uncommon', gameSlug: 'quantum-question' },

    // ── THREAT PROFILE ──
    'threat-first': { name: 'First Attribution', desc: 'Submitted your first Threat Profile.', xp: 20, icon: 'profile', rarity: 'common', gameSlug: 'threat-profile' },
    'threat-master': { name: 'CTI Analyst', desc: 'Averaged 80%+ agreement across 3+ profiles.', xp: 120, icon: 'cti', rarity: 'rare', gameSlug: 'threat-profile' },

    // ── DECISION TREE ──
    'decision-first': { name: 'First Branch', desc: 'Completed Decision Tree for the first time.', xp: 15, icon: 'tree', rarity: 'common', gameSlug: 'decision-tree' },
    'decision-all': { name: 'Every Path', desc: 'Completed all available Decision Tree scenarios.', xp: 90, icon: 'all-paths', rarity: 'uncommon', gameSlug: 'decision-tree' },

    // ── CIPHER ──
    'cipher-level1': { name: "Caesar's Code", desc: 'Completed Cipher Level 1.', xp: 15, icon: 'caesar', rarity: 'common', gameSlug: 'cipher' },
    'cipher-level4': { name: 'Quantum-Aware', desc: 'Completed Cipher Level 4: Why Quantum Breaks RSA.', xp: 80, icon: 'cipher4', rarity: 'uncommon', gameSlug: 'cipher' },
    'cipher-no-hints': { name: 'Cold Solution', desc: 'Completed Cipher Level 1 without using hints.', xp: 40, icon: 'cold', rarity: 'uncommon', gameSlug: 'cipher' },

    // ── THE AUDIT ──
    'audit-first': { name: 'Self-Assessed', desc: 'Completed your first Digital Audit.', xp: 30, icon: 'audit', rarity: 'common', gameSlug: 'the-audit' },
    'audit-return': { name: 'Six Months On', desc: 'Completed a second audit 90+ days after the first.', xp: 80, icon: 'return', rarity: 'uncommon', gameSlug: 'the-audit' },
    'audit-perfect': { name: 'Clean State', desc: 'Scored 30/36 or above on the Digital Audit.', xp: 120, icon: 'clean', rarity: 'rare', gameSlug: 'the-audit' },

    // ── ONE CONCEPT A DAY ──
    'concept-streak-7': { name: 'Weekly Learner', desc: '7-day streak on One Concept a Day.', xp: 40, icon: 'concept-7', rarity: 'common', gameSlug: 'one-concept-a-day' },
    'concept-streak-30': { name: 'Monthly Learner', desc: '30-day streak on One Concept a Day.', xp: 150, icon: 'concept-30', rarity: 'rare', gameSlug: 'one-concept-a-day' },
    'concept-streak-90': { name: 'Consistent Mind', desc: '90-day streak on One Concept a Day.', xp: 400, icon: 'mind', rarity: 'legendary', gameSlug: 'one-concept-a-day' },

    // ── BUILD A THREAT MODEL ──
    'model-first': { name: 'Modeller', desc: 'Built your first Threat Model.', xp: 25, icon: 'model', rarity: 'common', gameSlug: 'build-threat-model' },
    'model-three': { name: 'Systems Thinker', desc: 'Built three different Threat Models.', xp: 80, icon: 'systems', rarity: 'uncommon', gameSlug: 'build-threat-model' },

    // ── REFLECTION LOG ──
    'reflection-streak-7': { name: '7 Days of Honesty', desc: '7-day streak on Reflection Log.', xp: 50, icon: 'reflect-7', rarity: 'common', gameSlug: 'reflection-log' },
    'reflection-streak-30': { name: 'The Practice', desc: '30-day streak on Reflection Log.', xp: 180, icon: 'practice', rarity: 'rare', gameSlug: 'reflection-log' },

    // ── THE BOARD ──
    'board-first': { name: 'On The Board', desc: 'Completed The Board for the first time.', xp: 20, icon: 'board', rarity: 'common', gameSlug: 'the-board' },
    'board-defender': { name: 'Asymmetric Defender', desc: 'Blocked all attacker moves in a game of The Board.', xp: 100, icon: 'defender', rarity: 'rare', gameSlug: 'the-board' },

    // ── SYSTEM CHECK ──
    'systemcheck-streak-7': { name: 'Week of Awareness', desc: '7-day streak on System Check.', xp: 50, icon: 'sys-7', rarity: 'common', gameSlug: 'system-check' },
    'systemcheck-streak-30': { name: 'Operating System', desc: '30-day streak on System Check.', xp: 180, icon: 'sys-30', rarity: 'rare', gameSlug: 'system-check' },

    // ── CROSS-GAME ──
    'all-games-tried': { name: 'Explorer', desc: 'Tried every game at least once.', xp: 200, icon: 'explorer', rarity: 'rare', gameSlug: '_cross' },
    'level-5': { name: 'Level 5', desc: 'Reached Level 5 across all games.', xp: 0, icon: 'level5', rarity: 'legendary', gameSlug: '_cross' },
    'level-10': { name: 'Level 10', desc: 'Reached Level 10 across all games.', xp: 0, icon: 'level10', rarity: 'legendary', gameSlug: '_cross' },
};

/** XP cost for each badge — quick lookup. */
export const BADGE_XP: Record<string, number> = Object.fromEntries(
    Object.entries(BADGES).map(([k, v]) => [k, v.xp]),
);

/** Level thresholds — index = level, value = XP required. */
export const LEVEL_THRESHOLDS = [
    0,    // Level 1
    100,  // Level 2
    250,  // Level 3
    450,  // Level 4
    700,  // Level 5
    1000, // Level 6
    1350, // Level 7
    1750, // Level 8
    2200, // Level 9
    2700, // Level 10
];

/** Get level for a given XP total. */
export function getLevelForXp(xp: number): number {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
}

/** Get XP required for a given level. */
export function getXpForLevel(level: number): number {
    return LEVEL_THRESHOLDS[Math.min(level - 1, LEVEL_THRESHOLDS.length - 1)] || 0;
}

/** Get XP required for the NEXT level. */
export function getXpForNextLevel(level: number): number {
    if (level >= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    return LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
}

/** Get all badges for a specific game. */
export function getBadgesForGame(gameSlug: string): [string, Badge][] {
    return Object.entries(BADGES).filter(([, b]) => b.gameSlug === gameSlug);
}

/** Rarity colour mapping. */
export const RARITY_COLORS: Record<BadgeRarity, { border: string; bg: string; text: string }> = {
    common: { border: '#1E2440', bg: '#07090F', text: '#424870' },
    uncommon: { border: '#1A8FE3', bg: 'rgba(26,143,227,0.06)', text: '#1A8FE3' },
    rare: { border: '#A78FFF', bg: 'rgba(167,143,255,0.06)', text: '#A78FFF' },
    legendary: { border: '#E05C20', bg: 'rgba(224,92,32,0.06)', text: '#E05C20' },
};
