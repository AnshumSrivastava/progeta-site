export interface WorkshopEvent {
    date: string;
    name: string;
    format: string;
    duration: string;
    location: string;
    status: 'open' | 'soon' | 'full';
    registrationLink: string;
}

export const upcomingWorkshops: WorkshopEvent[] = [
    {
        date: 'MARCH 15, 2026',
        name: 'Dark Web Intelligence',
        format: 'Half-Day',
        duration: '4 hours',
        location: 'Online',
        status: 'open',
        registrationLink: 'mailto:operations@progeta.tech?subject=Workshop Registration - Dark Web Intelligence',
    },
    {
        date: 'MARCH 22, 2026',
        name: 'Network Packet Analysis with Wireshark',
        format: 'Full-Day',
        duration: '7 hours',
        location: 'On-campus · Delhi NCR',
        status: 'open',
        registrationLink: 'mailto:operations@progeta.tech?subject=Workshop Registration - Wireshark',
    },
    {
        date: 'APRIL 5, 2026',
        name: 'Incident Response Simulation',
        format: 'Half-Day',
        duration: '5 hours',
        location: 'Online',
        status: 'soon',
        registrationLink: 'mailto:operations@progeta.tech?subject=Workshop Interest - IR Simulation',
    },
];
