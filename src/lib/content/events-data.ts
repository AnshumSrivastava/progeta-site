export interface LaunchpadEvent {
    date: string;
    name: string;
    type: 'workshop' | 'campus-drive' | 'chapter-event' | 'mixer' | 'online';
    typeLabel: string;
    location: string;
    status: 'open' | 'confirmed' | 'soon' | 'invite-only' | 'announcing';
    statusLabel: string;
    action: string;
    actionLink: string;
    description?: string;
}

export const launchpadEvents: LaunchpadEvent[] = [
    {
        date: 'MAR 15', name: 'Dark Web Intelligence Workshop',
        type: 'workshop', typeLabel: 'WORKSHOP', location: 'Online',
        status: 'open', statusLabel: '● OPEN', action: 'Register →',
        actionLink: 'mailto:operations@progeta.tech?subject=Register - Dark Web Intelligence',
        description: 'A half-day intensive on OSINT and dark web navigation. No prerequisites.',
    },
    {
        date: 'MAR 19', name: 'Campus Drive: Amity University Noida',
        type: 'campus-drive', typeLabel: 'CAMPUS DRIVE', location: 'Delhi NCR',
        status: 'confirmed', statusLabel: '● CONFIRMED', action: 'View Details →',
        actionLink: 'mailto:operations@progeta.tech?subject=Campus Drive - Amity Noida',
        description: 'Full-day awareness session and track introduction for 2nd and 3rd year students.',
    },
    {
        date: 'MAR 22', name: 'Network Analysis Full-Day Lab',
        type: 'workshop', typeLabel: 'WORKSHOP', location: 'Online',
        status: 'open', statusLabel: '● OPEN', action: 'Register →',
        actionLink: 'mailto:operations@progeta.tech?subject=Register - Network Analysis Lab',
        description: 'Hands-on Wireshark and packet analysis. Bring your laptop.',
    },
    {
        date: 'APR 5', name: 'Incident Response Simulation',
        type: 'workshop', typeLabel: 'WORKSHOP', location: 'Online',
        status: 'soon', statusLabel: '● REGISTERING SOON', action: 'Notify me →',
        actionLink: 'mailto:operations@progeta.tech?subject=Notify - IR Simulation',
        description: 'A 5-hour simulated SOC exercise. Intermediate level.',
    },
    {
        date: 'APR 12', name: 'Chapter Founders Meetup',
        type: 'chapter-event', typeLabel: 'CHAPTER EVENT', location: 'Mumbai',
        status: 'invite-only', statusLabel: '● INVITE ONLY', action: 'Apply →',
        actionLink: 'mailto:operations@progeta.tech?subject=Chapter Founders Meetup - Apply',
        description: 'Quarterly meeting for Student Chapter leaders. In-person only.',
    },
    {
        date: 'MAY 10', name: 'InnerCircle × LaunchPad Founders Mixer',
        type: 'mixer', typeLabel: 'MIXER', location: 'Delhi',
        status: 'announcing', statusLabel: '● ANNOUNCING SOON', action: 'Follow →',
        actionLink: 'mailto:operations@progeta.tech?subject=Interest - Founders Mixer',
        description: 'Annual networking event. Details to be announced.',
    },
];
