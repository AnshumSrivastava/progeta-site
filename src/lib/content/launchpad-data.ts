/**
 * LAUNCHPAD — Extended Track Data
 * Supplements jobs.ts with taglines, descriptions, levels, competencies, prerequisites, who-for.
 */

export interface TrackMeta {
    id: number;
    num: string;
    level: 'entry' | 'mid' | 'specialised';
    status: 'enrolling' | 'coming-soon';
    tagline: string;
    description: string;
    tags: string[];
    competencies: { title: string; body: string }[];
    prerequisites: string[];
    whoFor: string[];
    credentialName: string;
    moduleCount: { tech: number; prof: number };
}

export const tracksMeta: TrackMeta[] = [
    {
        id: 1, num: 'T-01', level: 'mid', status: 'enrolling',
        tagline: 'Monitor adversary behaviour. Predict attacks before they happen.',
        description: 'You will collect intelligence from open-source and dark web environments, profile threat actor groups, map attack infrastructure, and produce written intelligence reports that allow security teams to act before a breach occurs. This track is built around OSINT methodology and threat modelling.',
        tags: ['Threat Intel', 'Dark Web', 'OSINT', 'Malware Analysis'],
        competencies: [
            { title: 'Open Source Intelligence', body: 'Systematic collection of intelligence from public sources including social media, technical databases, and dark web forums.' },
            { title: 'Dark Web Navigation', body: 'Safe operating procedures for monitoring threat actor forums, marketplaces, and communication channels.' },
            { title: 'Threat Actor Profiling', body: 'Building structured profiles of adversary groups: motivations, capabilities, tactics, and infrastructure.' },
            { title: 'Malware Analysis', body: 'Static and dynamic analysis of malicious code to understand its purpose, origin, and indicators.' },
            { title: 'Intelligence Reporting', body: 'Writing actionable intelligence reports for security teams and executive audiences.' },
            { title: 'IoC Development', body: 'Creating detection rules and signatures from real threat intelligence.' },
        ],
        prerequisites: ['Basic computer literacy.', 'No cybersecurity background required.', 'Curiosity about geopolitics and threat landscapes is an advantage.'],
        whoFor: ['Students interested in geopolitics, journalism, research, or intelligence analysis.', 'Students who want to work in government, consulting, or financial sector security.'],
        credentialName: 'Progeta Technologies Certified CTI Specialist',
        moduleCount: { tech: 8, prof: 4 },
    },
    {
        id: 2, num: 'T-02', level: 'entry', status: 'enrolling',
        tagline: 'Detect threats in real time. Contain them fast.',
        description: 'You will operate inside a simulated Security Operations Centre — monitoring alerts, triaging incidents, writing playbooks, and running the response procedures that real SOC teams use when systems are under attack. This is the most direct entry point into a cybersecurity career.',
        tags: ['Splunk', 'Wireshark', 'Incident Response', 'SIEM'],
        competencies: [
            { title: 'SIEM Deployment & Management', body: 'Setting up and managing security information and event management platforms.' },
            { title: 'Alert Triage', body: 'Systematic evaluation of security alerts to separate real threats from false positives.' },
            { title: 'Incident Response Lifecycle', body: 'The structured process from detection through containment, eradication, recovery, and lessons learned.' },
            { title: 'Playbook Design', body: 'Creating documented response procedures that allow a SOC team to respond consistently under pressure.' },
            { title: 'Log Analysis', body: 'Reading and interpreting system, network, and application logs for indicators of compromise.' },
            { title: 'Endpoint Detection', body: 'Behavioural monitoring of endpoints to detect threats that evade signature-based tools.' },
        ],
        prerequisites: ['Basic networking concepts (what a packet is).', 'Some exposure to Linux command line is helpful but not required.'],
        whoFor: ['Students who want the fastest path into a cybersecurity job.', 'Students from any background — SOC is one of the most accessible entry-level tracks.'],
        credentialName: 'Progeta Technologies Certified SOC Operator',
        moduleCount: { tech: 8, prof: 4 },
    },
    {
        id: 3, num: 'T-03', level: 'mid', status: 'enrolling',
        tagline: 'Build pipelines that cannot be broken into.',
        description: 'You will learn to integrate security into CI/CD workflows from the start — not as an afterthought. Cloud infrastructure hardening, container security, and secure coding practices are all covered. By the end, you treat security as a design constraint, not a compliance checkbox.',
        tags: ['CI/CD', 'Kubernetes', 'AWS Security', 'Python'],
        competencies: [
            { title: 'Secure CI/CD Pipeline Design', body: 'Integrating automated security checks into software delivery without slowing development.' },
            { title: 'Cloud Infrastructure Hardening', body: 'Identifying and fixing misconfigurations in AWS and Azure environments.' },
            { title: 'Container Security', body: 'Securing Docker containers and Kubernetes orchestration from build through runtime.' },
            { title: 'API Security Testing', body: 'Testing the security of APIs — the connective tissue of modern applications.' },
            { title: 'Secure Coding Practices', body: 'Writing code that resists common attack patterns from the first line.' },
            { title: 'Code Review for Security', body: 'Reading other people\'s code to find vulnerabilities before they reach production.' },
        ],
        prerequisites: ['Comfort with at least one programming language.', 'Understanding of what a server does.', 'Some cloud exposure preferred.'],
        whoFor: ['Computer science or IT students who already write code.', 'Students who want to work in development-heavy environments.'],
        credentialName: 'Progeta Technologies Certified DevSecOps Engineer',
        moduleCount: { tech: 8, prof: 4 },
    },
    {
        id: 4, num: 'T-04', level: 'entry', status: 'enrolling',
        tagline: 'Align security to the business. Then prove it.',
        description: 'You will learn risk management frameworks, compliance standards (ISO 27001, NIST, GDPR, HIPAA), and auditing methodology. This track is for students who want to work at the intersection of security and business strategy — translating technical risk into language boards actually act on.',
        tags: ['Risk Management', 'ISO 27001', 'Compliance', 'Auditing'],
        competencies: [
            { title: 'ISO 27001 Implementation', body: 'Understanding and applying the global standard for information security management systems.' },
            { title: 'NIST Cybersecurity Framework', body: 'Adopting the US federal standard for critical infrastructure protection.' },
            { title: 'Risk Quantification', body: 'Expressing security risk in financial terms that business decision-makers understand and act on.' },
            { title: 'Compliance Management', body: 'Navigating GDPR, HIPAA, and PCI-DSS requirements across an organisation.' },
            { title: 'Internal Audit Methodology', body: 'Verifying that security controls are actually functioning as designed.' },
            { title: 'Third-Party Risk Management', body: 'Assessing and monitoring the security posture of vendors and supply chain partners.' },
        ],
        prerequisites: ['No technical prerequisites.', 'Business or management background is an advantage.', 'Comfort reading formal documents.'],
        whoFor: ['Business, law, or management students who want to work in cybersecurity without becoming operators.'],
        credentialName: 'Progeta Technologies Certified GRC Analyst',
        moduleCount: { tech: 8, prof: 4 },
    },
    {
        id: 5, num: 'T-05', level: 'specialised', status: 'enrolling',
        tagline: 'Find the vulnerabilities before the attackers do.',
        description: 'You will conduct structured attacks on simulated environments using professional tooling — web application testing, network exploitation, Active Directory attacks, and full red team operations. This track requires a foundation in networking and Linux. It is the most operationally demanding track in LaunchPad.',
        tags: ['Burp Suite', 'Exploitation', 'Network Hacking', 'Red Teaming'],
        competencies: [
            { title: 'Web Application Exploitation', body: 'Systematic testing of web apps against the OWASP Top 10 using Burp Suite.' },
            { title: 'Network Penetration Testing', body: 'Identifying and exploiting vulnerabilities in network infrastructure.' },
            { title: 'System Hacking & Privilege Escalation', body: 'Gaining and expanding access on Linux and Windows systems.' },
            { title: 'Active Directory Attacks', body: 'Compromising Windows enterprise networks through credential attacks and lateral movement.' },
            { title: 'Red Team Operations', body: 'Conducting full-scope adversarial simulations against real organisational targets.' },
            { title: 'Report Writing', body: 'Documenting findings in professional penetration test reports that drive remediation.' },
        ],
        prerequisites: ['Modules 1–5 of the LaunchPad catalog (or equivalent knowledge): Cybersecurity Fundamentals, Linux, Networking, Virtualisation, Traffic Analysis.', 'This is a hard prerequisite — do not enrol without this foundation.'],
        whoFor: ['Students who already understand networking and Linux and want to move into offensive security professionally.'],
        credentialName: 'Progeta Technologies Certified Penetration Tester',
        moduleCount: { tech: 8, prof: 4 },
    },
    {
        id: 6, num: 'T-06', level: 'specialised', status: 'enrolling',
        tagline: 'Build the tools that defend the infrastructure.',
        description: 'You will write custom Python and Bash scripts that automate detection, response, and analysis tasks. By the end, you are not just using security tools — you are building them. This track requires comfort with coding. It produces the students that security teams fight to hire.',
        tags: ['Automation', 'Python', 'Bash', 'Tool Development'],
        competencies: [
            { title: 'Python for Security', body: 'Writing scripts that automate reconnaissance, analysis, alerting, and response tasks.' },
            { title: 'Bash Scripting', body: 'Leveraging the Linux shell for efficient security workflow automation.' },
            { title: 'Custom Tool Development', body: 'Building purpose-specific tools that solve real operational security problems.' },
            { title: 'API Integration', body: 'Connecting security tools programmatically to build automated pipelines.' },
            { title: 'Playbook Automation', body: 'Turning manual SOC procedures into code that runs without human intervention.' },
            { title: 'Secure Development Practices', body: 'Writing automation tools that are themselves secure — not introducing new vulnerabilities.' },
        ],
        prerequisites: ['Ability to write basic Python or Bash scripts.', 'Understand what a function is.', 'No advanced programming required.'],
        whoFor: ['Developers who want to move into security.', 'Students who want to work in security engineering rather than operations.'],
        credentialName: 'Progeta Technologies Certified Security Automation Engineer',
        moduleCount: { tech: 8, prof: 4 },
    },
];

export function getTrackMeta(id: number): TrackMeta | undefined {
    return tracksMeta.find(t => t.id === id);
}

export function getLevelLabel(level: string): string {
    const labels: Record<string, string> = { entry: 'Entry Level', mid: 'Mid Level', specialised: 'Specialised' };
    return labels[level] || level;
}
