/**
 * Share card generation — Canvas API for 1200×630 LinkedIn/OG images.
 * Runs entirely in-browser, no server needed.
 */

import { BADGES, RARITY_COLORS, type Badge, type BadgeRarity } from './badges';

export interface ShareGameData {
    name: string;
    tags: string[];
    statLine: string; // e.g. "STREAK: 7 DAYS · SCORE: 4/5 · MARCH 5, 2026"
}

function hexToRgb(hex: string): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

/**
 * Draw a simple badge icon inside a circle.
 * Since we can't use SVG directly in Canvas, we draw geometric shapes.
 */
function drawBadgeIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, icon: string, color: string): void {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Simple geometric icon based on icon name
    const s = 20; // scale factor
    switch (icon) {
        case 'signal':
        case 'streak-3':
        case 'streak-7':
        case 'streak-30':
            // Diamond shape
            ctx.beginPath();
            ctx.moveTo(cx, cy - s);
            ctx.lineTo(cx + s * 0.7, cy);
            ctx.lineTo(cx, cy + s);
            ctx.lineTo(cx - s * 0.7, cy);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'perfect':
        case 'clean':
            // Checkmark
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.6, cy);
            ctx.lineTo(cx - s * 0.1, cy + s * 0.5);
            ctx.lineTo(cx + s * 0.7, cy - s * 0.5);
            ctx.stroke();
            break;
        case 'breach':
        case 'analyst':
            // Shield
            ctx.beginPath();
            ctx.moveTo(cx, cy - s);
            ctx.lineTo(cx + s * 0.7, cy - s * 0.5);
            ctx.lineTo(cx + s * 0.7, cy + s * 0.3);
            ctx.lineTo(cx, cy + s);
            ctx.lineTo(cx - s * 0.7, cy + s * 0.3);
            ctx.lineTo(cx - s * 0.7, cy - s * 0.5);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'mirror':
        case 'pattern':
        case 'eye':
            // Eye shape
            ctx.beginPath();
            ctx.ellipse(cx, cy, s, s * 0.5, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.3, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'speech':
        case 'orator-3':
        case 'voice':
            // Sound waves
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, s * 0.4 + i * s * 0.3, -Math.PI * 0.4, Math.PI * 0.4);
                ctx.stroke();
            }
            break;
        case 'qubit':
        case 'quantum50':
            // Atom / orbital
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cx, cy, s, s * 0.4, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(cx, cy, s, s * 0.4, Math.PI / 3, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 'tree':
        case 'all-paths':
            // Branch / Y shape
            ctx.beginPath();
            ctx.moveTo(cx, cy + s);
            ctx.lineTo(cx, cy);
            ctx.lineTo(cx - s * 0.6, cy - s * 0.8);
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + s * 0.6, cy - s * 0.8);
            ctx.stroke();
            break;
        case 'explorer':
        case 'level5':
        case 'level10':
            // Star
            for (let i = 0; i < 5; i++) {
                const angle = (i * 72 - 90) * Math.PI / 180;
                const angleInner = ((i * 72) + 36 - 90) * Math.PI / 180;
                const xo = cx + Math.cos(angle) * s;
                const yo = cy + Math.sin(angle) * s;
                const xi = cx + Math.cos(angleInner) * s * 0.4;
                const yi = cy + Math.sin(angleInner) * s * 0.4;
                if (i === 0) ctx.moveTo(xo, yo);
                else ctx.lineTo(xo, yo);
                ctx.lineTo(xi, yi);
            }
            ctx.closePath();
            ctx.stroke();
            break;
        default:
            // Hexagon default
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * 60 - 90) * Math.PI / 180;
                const x = cx + Math.cos(angle) * s * 0.8;
                const y = cy + Math.sin(angle) * s * 0.8;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            break;
    }
    ctx.restore();
}

/**
 * Generate a 1200×630 share card on the given canvas.
 */
export function generateShareCard(
    canvas: HTMLCanvasElement,
    badgeId: string,
    gameData: ShareGameData,
): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;

    const badge = BADGES[badgeId];
    if (!badge) return;

    const rarityColors: Record<BadgeRarity, string> = {
        common: '#1E2440',
        uncommon: '#1A8FE3',
        rare: '#A78FFF',
        legendary: '#E05C20',
    };
    const accent = rarityColors[badge.rarity];

    // Background
    ctx.fillStyle = '#020408';
    ctx.fillRect(0, 0, W, H);

    // Subtle grid lines (texture)
    ctx.strokeStyle = 'rgba(15, 18, 32, 0.8)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Top accent rule
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, W, 2);

    // Badge circle
    const cx = W / 2;
    const cy = H / 2 - 40;
    const r = 72;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = `rgba(${hexToRgb(accent)}, 0.06)`;
    ctx.fill();

    // Badge icon
    drawBadgeIcon(ctx, cx, cy, badge.icon, accent);

    // Badge name
    ctx.fillStyle = '#EDF0FF';
    ctx.font = 'bold 48px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(badge.name, cx, cy + r + 24);

    // Badge description
    ctx.fillStyle = '#8890BB';
    ctx.font = '300 20px Arial, sans-serif';
    ctx.fillText(badge.desc, cx, cy + r + 80);

    // Rarity label
    ctx.fillStyle = accent;
    ctx.font = '12px monospace';
    ctx.fillText(badge.rarity.toUpperCase(), cx, cy + r + 112);

    // Game name + tags (bottom centre)
    ctx.fillStyle = '#424870';
    ctx.font = '11px monospace';
    const gameLine = `${gameData.name.toUpperCase()} · ${gameData.tags.join(' · ')}`;
    ctx.fillText(gameLine, cx, H - 80);

    // Stat line
    ctx.fillStyle = '#1E2440';
    ctx.font = '11px monospace';
    ctx.fillText(gameData.statLine, cx, H - 58);

    // Wordmark (top left)
    ctx.fillStyle = '#1E2440';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('PROGETA TECHNOLOGIES', 48, 28);

    // URL (bottom right)
    ctx.fillStyle = '#1E2440';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('progeta.tech/games', W - 48, H - 44);
}

/**
 * Download the share card canvas as a PNG.
 */
export function downloadShareCard(canvas: HTMLCanvasElement, badgeName: string): void {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `progeta-${badgeName.toLowerCase().replace(/\s+/g, '-')}-badge.png`;
    a.click();
}

/**
 * Generate templated post text based on badge rarity.
 */
export function generatePostText(badge: Badge, gameData: ShareGameData): string {
    const templates: Record<BadgeRarity, string[]> = {
        common: [
            `Just earned the "${badge.name}" badge on Progeta Technologies.\n\n${badge.desc}\n\nBuilding real skills, one session at a time.\n\nprogeta.tech/games`,
            `"${badge.name}" — earned it today on Progeta Technologies.\n\n${gameData.name}: ${badge.desc}\n\n#Cybersecurity #Learning #ProgeTech`,
        ],
        uncommon: [
            `Earned "${badge.name}" on Progeta Technologies today.\n\n${badge.desc}\n\nIf you want to actually know this stuff — not just know about it — this is where I've been doing it.\n\nprogeta.tech/games`,
        ],
        rare: [
            `"${badge.name}" — a rare badge from Progeta Technologies.\n\n${badge.desc}\n\nThis one took consistent work. Worth it.\n\nprogeta.tech/games #${gameData.tags[0] || 'Tech'}`,
        ],
        legendary: [
            `"${badge.name}" — legendary tier on Progeta Technologies.\n\n${badge.desc}\n\nThis didn't happen in a day. But it happened.\n\nprogeta.tech/games`,
        ],
    };
    const pool = templates[badge.rarity] || templates.common;
    return pool[Math.floor(Math.random() * pool.length)];
}
