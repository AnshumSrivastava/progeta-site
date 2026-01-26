import { games } from '$lib/content/games';

export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
    return games.map((game) => ({ id: game.id }));
}
