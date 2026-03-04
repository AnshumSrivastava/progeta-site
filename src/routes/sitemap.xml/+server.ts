import { careerTracks } from '$lib/content/jobs';
import { games } from '$lib/content/simulations';
import { technicalModules, softSkillsModules } from '$lib/content/modules';

export const prerender = true;

const siteUrl = 'https://progeta.tech';

export async function GET() {
    const pages = [
        '',
        '/about',
        '/download',
        '/innercircle',
        '/tracks',
        '/modules',
        '/calendar',
        '/resources',
        '/resources/articles',
        '/resources/simulations',
        '/resources/gallery',
        '/resources/glossary',
        '/launchpad/students',
        '/launchpad/colleges',
        '/launchpad/chapters',
        '/legal/privacy-policy',
        '/legal/terms-of-service',
        '/legal/cookie-policy',
        '/legal/disclaimer'
    ];

    // Dynamic routes
    const trackUrls = careerTracks.map((t: any) => `/tracks/${t.id}`);
    const gameUrls = [
        '/simulations/cmd_hero',
        '/simulations/linux-labyrinth',
        '/simulations/packet-hunter',
        '/simulations/incident-zero',
        '/simulations/social-vector',
        '/simulations/threat-map',
        '/simulations/the-board'
    ]; // Assuming these are the valid hardcoded simulation routes based on previous inspection

    const techModuleUrls = technicalModules.map((m: any) => `/modules/technical/${m.id}`);
    const profModuleUrls = softSkillsModules.map((m: any) => `/modules/soft_skills/${m.id}`);

    const allPages = [
        ...pages,
        ...trackUrls,
        ...gameUrls,
        ...techModuleUrls,
        ...profModuleUrls
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
            .map(
                (page) => `
  <url>
    <loc>${siteUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
            )
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}
