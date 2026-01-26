import type { Track } from './types';

export const careerTracks: Track[] = [
    {
        "id": 1,
        "title": "Cyber Threat Intelligence (CTI) Specialist",
        "description": "Monitor the dark web and analyze hacker trends to predict attacks.",
        "skills": ["Threat Intel", "Dark Web", "OSINT", "Malware Analysis"],
        "roleSummary": "As a CTI Specialist, you are the radar of the organization. You monitor the dark web, analyze hacker forums, and track APT groups to predict attacks before they happen. Your job is not to fix firewalls, but to tell the SOC what to block.",
        "dayInLife": [
            { "time": "08:00", "activity": "Scan threat feeds for new zero-day exploits." },
            { "time": "10:00", "activity": "Investigate a suspicious actor on a Russian dark web forum." },
            { "time": "13:00", "activity": "Correlate IOCs (Indicators of Compromise) with internal logs." },
            { "time": "15:00", "activity": "Draft a threat landscape report for the CISO." }
        ],
        "deliverables": [
            { "title": "Threat Landscape Report", "desc": "Comprehensive Deep Web investigation on a specific threat actor." },
            { "title": "Intelligence Dossier", "desc": "Complete target profile generated from OSINT & Recon workshop." },
            { "title": "Progeta Specialist Diploma", "desc": "Certified CTI Specialist credential." }
        ],
        "phases": [
            {
                "name": "Phase 1: The Foundation (Month 1)",
                "modules": [
                    {
                        "id": "1",
                        "title": "Cybersecurity Fundamentals (CIA Triad, Risk)",
                        "type": "Technical"
                    },
                    {
                        "id": "2",
                        "title": "Linux Operations & Command Line (The OS of the web)",
                        "type": "Technical"
                    },
                    {
                        "id": "3",
                        "title": "Computer Networking & TCP/IP (How data moves)",
                        "type": "Technical"
                    },
                    {
                        "id": "16",
                        "title": "Critical Thinking (Analyzing data without bias)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 2: Intelligence Tradecraft (Months 2-3)",
                "modules": [
                    {
                        "id": "14",
                        "title": "OSINT (Open Source Intelligence)",
                        "type": "Technical"
                    },
                    {
                        "id": "15",
                        "title": "Digital Footprinting & Reconnaissance",
                        "type": "Technical"
                    },
                    {
                        "id": "16",
                        "title": "Dark Web Operations (Tor, I2P)",
                        "type": "Technical"
                    },
                    {
                        "id": "17",
                        "title": "Operational Security (OpSec) & Anonymity",
                        "type": "Technical"
                    },
                    {
                        "id": "11",
                        "title": "Report Writing for Executives (Turning intel into value)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 3: Advanced Analysis (Months 4-5)",
                "modules": [
                    {
                        "id": "28",
                        "title": "Indicators of Compromise (IoC) Discovery",
                        "type": "Technical"
                    },
                    {
                        "id": "27",
                        "title": "Malware Analysis Fundamentals (Knowing the enemy)",
                        "type": "Technical"
                    },
                    {
                        "id": "46",
                        "title": "Geopolitical Risk Analysis (Nation-state actors)",
                        "type": "Technical"
                    },
                    {
                        "id": "17",
                        "title": "Analytical Problem Solving (Connecting the dots)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 4: Career Launch (Month 6)",
                "modules": [
                    {
                        "id": "45",
                        "title": "Cyber Warfare Tactics (Strategic view)",
                        "type": "Technical"
                    },
                    {
                        "id": "1",
                        "title": "Resume Building & Optimization",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "2",
                        "title": "Interview Preparation & Mock Sessions",
                        "type": "Soft Skills"
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "SOC Operations & Incident Response",
        "description": "Detect, analyze, and respond to cyber incidents in real-time.",
        "skills": ["Splunk", "Wireshark", "Incident Response", "SIEM"],
        "deliverables": [
            { "title": "Incident Response Playbook", "desc": "Custom SOP & Live Fire Report for ransomware mitigation." },
            { "title": "Intrusion Block Report", "desc": "Successful shift report from the 'SOC War Room' simulation." },
            { "title": "Progeta SOC Diploma", "desc": "Certified SOC Operations credential." }
        ],
        "phases": [
            {
                "name": "Phase 1: The Foundation (Month 1)",
                "modules": [
                    {
                        "id": "1",
                        "title": "Cybersecurity Fundamentals",
                        "type": "Technical"
                    },
                    {
                        "id": "3",
                        "title": "Computer Networking & TCP/IP",
                        "type": "Technical"
                    },
                    {
                        "id": "4",
                        "title": "Virtualization & Lab Setup",
                        "type": "Technical"
                    },
                    {
                        "id": "33",
                        "title": "Stress Management & Resilience (Essential for SOC burnout)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 2: Detection & Analysis (Months 2-3)",
                "modules": [
                    {
                        "id": "5",
                        "title": "Network Traffic Analysis",
                        "type": "Technical"
                    },
                    {
                        "id": "6",
                        "title": "Packet Sniffing & Wireshark Mastery",
                        "type": "Technical"
                    },
                    {
                        "id": "7",
                        "title": "SIEM Architecture & Deployment (Splunk/Wazuh)",
                        "type": "Technical"
                    },
                    {
                        "id": "8",
                        "title": "Log Analysis & Management",
                        "type": "Technical"
                    },
                    {
                        "id": "22",
                        "title": "Time Management & Productivity (Handling alerts)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 3: Incident Response (Months 4-5)",
                "modules": [
                    {
                        "id": "9",
                        "title": "Incident Response Lifecycle",
                        "type": "Technical"
                    },
                    {
                        "id": "10",
                        "title": "Playbook Design & Automation",
                        "type": "Technical"
                    },
                    {
                        "id": "11",
                        "title": "Endpoint Detection & Response (EDR)",
                        "type": "Technical"
                    },
                    {
                        "id": "47",
                        "title": "AI for Defense (SOC Automation)",
                        "type": "Technical"
                    },
                    {
                        "id": "8",
                        "title": "Crisis Communication & Stakeholder Management",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 4: Career Launch (Month 6)",
                "modules": [
                    {
                        "id": "12",
                        "title": "Digital Forensics (Post-mortem analysis)",
                        "type": "Technical"
                    },
                    {
                        "id": "1",
                        "title": "Resume Building & Optimization",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "2",
                        "title": "Interview Preparation & Mock Sessions",
                        "type": "Soft Skills"
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "title": "DevSecOps & Cloud Security",
        "description": "Integrate security into the CI/CD pipeline and secure cloud infrastructure.",
        "skills": ["CI/CD", "Kubernetes", "AWS Security", "Python"],
        "deliverables": [
            { "title": "Secure DevOps Pipeline", "desc": "Live automated scanning & hardening implementation on GitHub." },
            { "title": "Hardened Cloud Arch", "desc": "Secured AWS/Azure environment alert system." },
            { "title": "Progeta Cloud Diploma", "desc": "Certified Cloud Security & DevSecOps credential." }
        ],
        "phases": [
            {
                "name": "Phase 1: The Foundation (Month 1)",
                "modules": [
                    {
                        "id": "2",
                        "title": "Linux Operations & Command Line",
                        "type": "Technical"
                    },
                    {
                        "id": "30",
                        "title": "Bash Scripting",
                        "type": "Technical"
                    },
                    {
                        "id": "29",
                        "title": "Python for Cybersecurity (Basics)",
                        "type": "Technical"
                    },
                    {
                        "id": "20",
                        "title": "Systems Thinking (Understanding the whole stack)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 2: Cloud & Infrastructure (Months 2-3)",
                "modules": [
                    {
                        "id": "33",
                        "title": "Cloud Computing Fundamentals",
                        "type": "Technical"
                    },
                    {
                        "id": "34",
                        "title": "Cloud Infrastructure Security (AWS/Azure)",
                        "type": "Technical"
                    },
                    {
                        "id": "35",
                        "title": "Container Security (Docker)",
                        "type": "Technical"
                    },
                    {
                        "id": "36",
                        "title": "Kubernetes Security & Orchestration",
                        "type": "Technical"
                    },
                    {
                        "id": "32",
                        "title": "Team Collaboration Dynamics (Working with Devs)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 3: Pipeline & Code Security (Months 4-5)",
                "modules": [
                    {
                        "id": "37",
                        "title": "CI/CD Pipeline Security",
                        "type": "Technical"
                    },
                    {
                        "id": "31",
                        "title": "Secure Coding Practices",
                        "type": "Technical"
                    },
                    {
                        "id": "32",
                        "title": "Code Review & Static Analysis (SAST)",
                        "type": "Technical"
                    },
                    {
                        "id": "38",
                        "title": "API Security Testing",
                        "type": "Technical"
                    },
                    {
                        "id": "23",
                        "title": "Agile Methodologies (Scrum/Kanban)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 4: Career Launch (Month 6)",
                "modules": [
                    {
                        "id": "49",
                        "title": "LLM Security (Securing AI apps)",
                        "type": "Technical"
                    },
                    {
                        "id": "5",
                        "title": "Portfolio Development (GitHub focus)",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "2",
                        "title": "Interview Preparation & Mock Sessions",
                        "type": "Soft Skills"
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "title": "Enterprise GRC & Security Auditing",
        "description": "Align IT strategy with business goals, ensuring compliance and managing risk.",
        "skills": ["Risk Management", "ISO 27001", "Compliance", "Auditing"],
        "deliverables": [
            { "title": "Risk Assessment Report", "desc": "Corporate Audit Findings against ISO/NIST standards." },
            { "title": "Remediation Roadmap", "desc": "Strategic plan to fix compliance gaps from Audit Masterclass." },
            { "title": "Progeta GRC Diploma", "desc": "Certified GRC & Strategy credential." }
        ],
        "phases": [
            {
                "name": "Phase 1: The Foundation (Month 1)",
                "modules": [
                    {
                        "id": "1",
                        "title": "Cybersecurity Fundamentals",
                        "type": "Technical"
                    },
                    {
                        "id": "40",
                        "title": "NIST Cybersecurity Framework",
                        "type": "Technical"
                    },
                    {
                        "id": "3",
                        "title": "Computer Networking (Concept level)",
                        "type": "Technical"
                    },
                    {
                        "id": "36",
                        "title": "Workplace Ethics & Integrity",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 2: Risk & Compliance (Months 2-3)",
                "modules": [
                    {
                        "id": "39",
                        "title": "ISO 27001 Standards & Implementation",
                        "type": "Technical"
                    },
                    {
                        "id": "41",
                        "title": "Risk Management Strategies",
                        "type": "Technical"
                    },
                    {
                        "id": "42",
                        "title": "Compliance Frameworks (GDPR/HIPAA/PCI)",
                        "type": "Technical"
                    },
                    {
                        "id": "43",
                        "title": "Internal Auditing Procedures",
                        "type": "Technical"
                    },
                    {
                        "id": "10",
                        "title": "Technical Writing (SOPs & Policies)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 3: Strategy & Vendors (Months 4-5)",
                "modules": [
                    {
                        "id": "44",
                        "title": "Third-Party Risk Management (TPRM)",
                        "type": "Technical"
                    },
                    {
                        "id": "25",
                        "title": "Business Acumen for Tech Pros",
                        "type": "Technical"
                    },
                    {
                        "id": "46",
                        "title": "Geopolitical Risk Analysis",
                        "type": "Technical"
                    },
                    {
                        "id": "14",
                        "title": "Negotiation Skills (Pushing back on stakeholders)",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "7",
                        "title": "Public Speaking (Presenting audit results)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 4: Career Launch (Month 6)",
                "modules": [
                    {
                        "id": "24",
                        "title": "Project Management Basics",
                        "type": "Technical"
                    },
                    {
                        "id": "4",
                        "title": "LinkedIn Growth & Optimization",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "2",
                        "title": "Interview Preparation & Mock Sessions",
                        "type": "Soft Skills"
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "title": "Advanced Penetration Testing & Red Teaming",
        "description": "Simulate cyberattacks to identify vulnerabilities before the bad guys do.",
        "skills": ["Burp Suite", "Exploitation", "Network Hacking", "Red Teaming"],
        "deliverables": [
            { "title": "Pentest Execution Report", "desc": "Professional report: Findings, Tech Details, & Remediation." },
            { "title": "Kill Chain Debrief", "desc": "Execution proof from 'Red Team Operator' simulation." },
            { "title": "Progeta Offensive Diploma", "desc": "Certified Offensive Security credential." }
        ],
        "phases": [
            {
                "name": "Phase 1: The Foundation (Month 1)",
                "modules": [
                    {
                        "id": "1",
                        "title": "Cybersecurity Fundamentals",
                        "type": "Technical"
                    },
                    {
                        "id": "2",
                        "title": "Linux Operations & Command Line",
                        "type": "Technical"
                    },
                    {
                        "id": "3",
                        "title": "Computer Networking & TCP/IP",
                        "type": "Technical"
                    },
                    {
                        "id": "19",
                        "title": "Cognitive Biases (Thinking like an attacker)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 2: Network & Web Attacks (Months 2-3)",
                "modules": [
                    {
                        "id": "18",
                        "title": "Network Scanning (Nmap)",
                        "type": "Technical"
                    },
                    {
                        "id": "19",
                        "title": "Vulnerability Assessment",
                        "type": "Technical"
                    },
                    {
                        "id": "20",
                        "title": "Web Application Security (OWASP Top 10)",
                        "type": "Technical"
                    },
                    {
                        "id": "21",
                        "title": "Burp Suite Professional",
                        "type": "Technical"
                    },
                    {
                        "id": "11",
                        "title": "Report Writing for Executives (The most important pentest skill)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 3: Advanced Exploitation (Months 4-5)",
                "modules": [
                    {
                        "id": "22",
                        "title": "System Hacking & Exploitation",
                        "type": "Technical"
                    },
                    {
                        "id": "23",
                        "title": "Privilege Escalation (Linux/Windows)",
                        "type": "Technical"
                    },
                    {
                        "id": "25",
                        "title": "Active Directory Attacks",
                        "type": "Technical"
                    },
                    {
                        "id": "24",
                        "title": "Lateral Movement Techniques",
                        "type": "Technical"
                    },
                    {
                        "id": "21",
                        "title": "Creative Innovation (Bypassing controls)",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 4: Career Launch (Month 6)",
                "modules": [
                    {
                        "id": "26",
                        "title": "Social Engineering Tactics",
                        "type": "Technical"
                    },
                    {
                        "id": "3",
                        "title": "Personal Branding Strategy",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "2",
                        "title": "Interview Preparation & Mock Sessions",
                        "type": "Soft Skills"
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "title": "Security Automation & Tool Development",
        "description": "Build custom tools and scripts to automate security workflows and defenses.",
        "skills": ["Automation", "Bash/Python", "Tool Dev", "API Security"],
        "deliverables": [
            { "title": "Custom Security Tool", "desc": "Open-source repo (e.g. Vuln Scanner) published on GitHub." },
            { "title": "Port Scanner / Bot", "desc": "Working automated reconnaissance tool from workshop." },
            { "title": "Progeta Engineering Diploma", "desc": "Certified Security Engineering credential." }
        ],
        "phases": [
            {
                "name": "Phase 1: The Foundation (Month 1)",
                "modules": [
                    {
                        "id": "2",
                        "title": "Linux Operations & Command Line",
                        "type": "Technical"
                    },
                    {
                        "id": "29",
                        "title": "Python for Cybersecurity (Core Syntax)",
                        "type": "Technical"
                    },
                    {
                        "id": "1",
                        "title": "Cybersecurity Fundamentals",
                        "type": "Technical"
                    },
                    {
                        "id": "17",
                        "title": "Analytical Problem Solving",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 2: Scripting & Automation (Months 2-3)",
                "modules": [
                    {
                        "id": "30",
                        "title": "Bash Scripting",
                        "type": "Technical"
                    },
                    {
                        "id": "18",
                        "title": "Network Scanning (Understanding what to automate)",
                        "type": "Technical"
                    },
                    {
                        "id": "47",
                        "title": "AI for Defense (Using AI APIs)",
                        "type": "Technical"
                    },
                    {
                        "id": "10",
                        "title": "Playbook Design & Automation",
                        "type": "Technical"
                    },
                    {
                        "id": "22",
                        "title": "Time Management & Productivity",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 3: Development & Integration (Months 4-5)",
                "modules": [
                    {
                        "id": "15",
                        "title": "Developing Custom Security Tools",
                        "type": "Technical"
                    },
                    {
                        "id": "38",
                        "title": "API Security Testing (Building & Breaking)",
                        "type": "Technical"
                    },
                    {
                        "id": "31",
                        "title": "Secure Coding Practices",
                        "type": "Technical"
                    },
                    {
                        "id": "32",
                        "title": "Code Review & Static Analysis",
                        "type": "Technical"
                    },
                    {
                        "id": "32",
                        "title": "Team Collaboration Dynamics",
                        "type": "Soft Skills"
                    }
                ]
            },
            {
                "name": "Phase 4: Career Launch (Month 6)",
                "modules": [
                    {
                        "id": "49",
                        "title": "LLM Security (Building secure AI agents)",
                        "type": "Technical"
                    },
                    {
                        "id": "5",
                        "title": "Portfolio Development (GitHub)",
                        "type": "Soft Skills"
                    },
                    {
                        "id": "2",
                        "title": "Interview Preparation & Mock Sessions",
                        "type": "Soft Skills"
                    }
                ]
            }
        ]
    }
];
