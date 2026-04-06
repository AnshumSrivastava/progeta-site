/**
 * PROGETA TECHNOLOGIES — Homepage Configuration
 * This file drives the dynamic highlights, status, and rotating facts.
 */

export interface HighlightItem {
    type: string;
    title: string;
    href: string;
    label?: string;
    accent?: string;
}

export const highlights: HighlightItem[] = [
    { type: 'EVENT', title: 'Hire Ready — 12 April 2026', href: '/events/hireready', label: 'Register Now', accent: 'var(--accent-launchpad)' },
    { type: 'TRACK', title: 'CTI Specialisation', href: '/launchpad/tracks/cti', label: 'Enrolling Now', accent: 'var(--accent-launchpad)' },
    { type: 'SYSTEMS', title: 'SelfOS v2.1 Public Alpha', href: '/selfos', label: 'Update Available', accent: 'var(--accent-selfos)' }
];

export const systemStatus = {
    status: 'OPERATIONAL',
    lastUpdate: '14m ago',
    location: 'Global Edge'
};

export const rotatingFacts = [
    "Privacy is not a feature; it is a human right.",
    "Great things are built by those who show up every day.",
    "Digital sovereignty starts with owning your tools.",
    "Knowledge without execution is just noise."
];

export const statistics = [
    { value: '25k+', label: 'Students Reached' },
    { value: '42', label: 'Active Chapters' },
    { value: '98%', label: 'Placement Rate' },
    { value: '1M+', label: 'Lines of Open Code' }
];

export const testimonials = [
    {
        quote: "Progeta didn't just teach me to code; they taught me how to think like an engineer and act like a leader.",
        author: "Anshum S.",
        role: "SOC Analyst @ GlobalTech"
    }
];
