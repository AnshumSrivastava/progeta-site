import { events } from '$lib/content/events';

export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
    return events.map((_, i) => ({ id: i.toString() }));
}
