import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Initial state, defaults to dark
let initialTheme: Theme = 'dark';

if (browser) {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        initialTheme = 'light';
    }
}

export const theme = writable<Theme>(initialTheme);

if (browser) {
    theme.subscribe((value) => {
        localStorage.setItem('theme', value);
        document.documentElement.setAttribute('data-theme', value);
    });
}
