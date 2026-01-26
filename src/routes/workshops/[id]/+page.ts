import { workshops } from '$lib/content/workshops';

export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
    return workshops.map((_, i) => ({ id: i.toString() }));
}
