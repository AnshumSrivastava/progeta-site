// ─── Centralized UX Copy System ─────────────────────────────────────
// Single source for all reusable microcopy across the site.
// Keeps UI text consistent and easy to update.

export const BUTTON_LABELS = {
    exploreTracks: 'Explore Tracks',
    viewDetails: 'View Details',
    applyNow: 'Apply Now',
    getStarted: 'Get Started',
    contactUs: 'Contact Us',
    scheduleConsultation: 'Schedule Consultation',
    startChapter: 'Start a Chapter',
    viewWorkshops: 'View Workshops',
    viewCertifications: 'View Certifications',
    register: 'Register',
    learnMore: 'Learn More',
    viewAll: 'View All',
    bookSession: 'Book a Session',
    verifyCredential: 'Verify',
    submitForm: 'Submit',
    goHome: 'Return Home',
} as const;

export const FORM_HELPERS = {
    email: 'Enter your institutional or personal email address.',
    name: 'Your full name as you would like it to appear.',
    message: 'Describe your interest, question, or request. We respond within 2 business days.',
    institution: 'The name of your college or organization.',
    certificateId: 'Enter your certificate ID (e.g., PGT-2026-XXXX).',
} as const;

export const EMPTY_STATES = {
    noEvents: 'No events are currently scheduled. Check back soon or join our community for early announcements.',
    noResults: 'No results match your search. Try broadening your filters or exploring a different category.',
    noArticles: 'New intelligence briefs are published regularly. Check back soon for the latest research.',
    noGames: 'More simulations are in development. Explore the existing library or check back for new releases.',
} as const;

export const SUCCESS_MESSAGES = {
    formSubmitted: 'Your message has been sent. Expect a response within 2 business days.',
    registered: 'Registration confirmed. Check your email for next steps.',
    certificateVerified: 'Certificate verified. View credential details below.',
} as const;

export const SEO_DEFAULTS = {
    siteName: 'Progeta Technologies',
    titleSuffix: ' | Progeta Technologies',
    defaultDescription: 'Progeta builds campus ecosystems that make students digitally aware, technically skilled, leadership-ready, and execution-driven.',
} as const;
