export interface Certificate {
    id: string;
    holder: string;
    track: string;
    trackId: string;
    issued: string;
    modulesCompleted: number;
    status: 'valid' | 'revoked';
}

export const issuedCertificates: Certificate[] = [
    { id: 'PT-0001-CXTI', holder: 'Ananya Sharma', track: 'Cyber Threat Intelligence Specialist', trackId: 'T-01', issued: '2026-01-15', modulesCompleted: 12, status: 'valid' },
    { id: 'PT-0002-SOCR', holder: 'Rahul Verma', track: 'SOC Operations & Incident Response', trackId: 'T-02', issued: '2026-02-01', modulesCompleted: 12, status: 'valid' },
    { id: 'PT-0003-DSOP', holder: 'Priya Patel', track: 'DevSecOps & Cloud Security', trackId: 'T-03', issued: '2026-02-18', modulesCompleted: 12, status: 'valid' },
];

export function verifyCertificate(certId: string): Certificate | null {
    return issuedCertificates.find(c => c.id.toUpperCase() === certId.toUpperCase()) || null;
}
