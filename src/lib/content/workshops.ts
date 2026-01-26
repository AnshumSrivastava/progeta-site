import type { Workshop } from './types';

export const workshops: Workshop[] = [
    {
        "title": "The Bug Bounty Hunter",
        "role": "Freelance Security Researcher",
        "mission": "Find and report valid vulnerabilities in a practice banking application.",
        "outcome": "A submitted vulnerability report and a \"Hall of Fame\" entry.",
        "tech_mods": [
            {
                "id": "20",
                "title": "Web Application Security (OWASP Top 10)"
            },
            {
                "id": "21",
                "title": "Burp Suite Professional"
            },
            {
                "id": "19",
                "title": "Vulnerability Assessment"
            }
        ],
        "soft_mods": [
            {
                "id": "10",
                "title": "Technical Writing (Writing professional bug reports)"
            },
            {
                "id": "36",
                "title": "Workplace Ethics & Integrity (Rules of Engagement)"
            }
        ]
    },
    {
        "title": "The SOC War Room",
        "role": "Tier 1 SOC Analyst",
        "mission": "Survive a \"Hell Week\" simulation of continuous alerts, separating false positives from real attacks.",
        "outcome": "Handing over a shift report and successfully blocking an active intrusion.",
        "tech_mods": [
            {
                "id": "7",
                "title": "SIEM Architecture & Deployment"
            },
            {
                "id": "8",
                "title": "Log Analysis & Management"
            },
            {
                "id": "5",
                "title": "Network Traffic Analysis"
            }
        ],
        "soft_mods": [
            {
                "id": "33",
                "title": "Stress Management & Resilience"
            },
            {
                "id": "16",
                "title": "Critical Thinking (Triage decision making)"
            }
        ]
    },
    {
        "title": "Cloud Sentinel Bootcamp",
        "role": "Cloud Security Engineer",
        "mission": "Secure a leaky AWS/Azure environment that has been misconfigured.",
        "outcome": "A hardened cloud architecture with automated security alerts.",
        "tech_mods": [
            {
                "id": "34",
                "title": "Cloud Infrastructure Security"
            },
            {
                "id": "35",
                "title": "Container Security (Docker)"
            },
            {
                "id": "39",
                "title": "ISO 27001 (Applying standards to cloud)"
            }
        ],
        "soft_mods": [
            {
                "id": "20",
                "title": "Systems Thinking"
            },
            {
                "id": "23",
                "title": "Agile Methodologies (Working in Sprints)"
            }
        ]
    },
    {
        "title": "The OSINT Detective",
        "role": "Intelligence Analyst / Private Investigator",
        "mission": "Track a \"missing person\" (fictional target) across the clear and dark web.",
        "outcome": "A comprehensive Intelligence Dossier on the target.",
        "tech_mods": [
            {
                "id": "14",
                "title": "OSINT (Open Source Intelligence)"
            },
            {
                "id": "15",
                "title": "Digital Footprinting & Reconnaissance"
            },
            {
                "id": "16",
                "title": "Dark Web Operations"
            }
        ],
        "soft_mods": [
            {
                "id": "17",
                "title": "Analytical Problem Solving"
            },
            {
                "id": "19",
                "title": "Cognitive Biases (Avoiding rabbit holes)"
            }
        ]
    },
    {
        "title": "Python for Cyber Automation",
        "role": "Security Automation Engineer",
        "mission": "\"Stop doing it manually.\" Write scripts to automate boring reconnaissance tasks.",
        "outcome": "A custom-built, working Port Scanner or Brute-force tool hosted on GitHub.",
        "tech_mods": [
            {
                "id": "29",
                "title": "Python for Cybersecurity"
            },
            {
                "id": "30",
                "title": "Bash Scripting"
            },
            {
                "id": "18",
                "title": "Developing Custom Security Tools"
            }
        ],
        "soft_mods": [
            {
                "id": "21",
                "title": "Creative Innovation"
            },
            {
                "id": "22",
                "title": "Time Management (ROI of automation)"
            }
        ]
    },
    {
        "title": "GRC & Audit Masterclass",
        "role": "Junior IT Auditor",
        "mission": "Audit a fictional company that is failing compliance and fix their mess.",
        "outcome": "An Audit Finding Report and a Remediation Roadmap.",
        "tech_mods": [
            {
                "id": "41",
                "title": "Risk Management Strategies"
            },
            {
                "id": "42",
                "title": "Compliance Frameworks (GDPR/PCI-DSS)"
            },
            {
                "id": "43",
                "title": "Internal Auditing Procedures"
            }
        ],
        "soft_mods": [
            {
                "id": "25",
                "title": "Business Acumen for Tech Pros"
            },
            {
                "id": "14",
                "title": "Negotiation Skills (Convincing management to spend money)"
            }
        ]
    },
    {
        "title": "Red Team Operator",
        "role": "Adversary Simulator",
        "mission": "Breach a corporate network starting from a phishing email to Domain Admin.",
        "outcome": "A complete \"Kill Chain\" execution and debrief presentation.",
        "tech_mods": [
            {
                "id": "26",
                "title": "Social Engineering Tactics"
            },
            {
                "id": "25",
                "title": "Active Directory Attacks"
            },
            {
                "id": "24",
                "title": "Lateral Movement Techniques"
            }
        ],
        "soft_mods": [
            {
                "id": "18",
                "title": "Strategic Decision Making"
            },
            {
                "id": "15",
                "title": "Persuasion & Influence"
            }
        ]
    },
    {
        "title": "The Career Launchpad",
        "role": "Job Candidate",
        "mission": "Get hired. (This is a non-technical, pure career-focused workshop).",
        "outcome": "A finalized Resume, Cover Letter, LinkedIn Profile, and Mock Interview recording.",
        "tech_mods": [],
        "soft_mods": [
            {
                "id": "1",
                "title": "Resume Building & Optimization"
            },
            {
                "id": "2",
                "title": "Interview Preparation & Mock Sessions"
            },
            {
                "id": "4",
                "title": "LinkedIn Growth & Optimization"
            },
            {
                "id": "6",
                "title": "Professional Networking Strategies"
            }
        ]
    },
    {
        "title": "Digital Forensics Investigator",
        "role": "Cyber Crime Investigator",
        "mission": "Analyze a seized hard drive to find evidence of corporate espionage.",
        "outcome": "A Forensic Investigation Report admissible in \"court.\"",
        "tech_mods": [
            {
                "id": "12",
                "title": "Digital Forensics"
            },
            {
                "id": "13",
                "title": "Evidence Handling & Chain of Custody"
            },
            {
                "id": "27",
                "title": "Malware Analysis Fundamentals"
            }
        ],
        "soft_mods": [
            {
                "id": "36",
                "title": "Workplace Ethics (Legal admissibility)"
            },
            {
                "id": "11",
                "title": "Report Writing for Executives"
            }
        ]
    },
    {
        "title": "AI-Powered Security",
        "role": "AI Security Specialist",
        "mission": "Build a defense system using AI and then try to trick it.",
        "outcome": "A functioning \"AI Defense Agent\" and a report on its blind spots.",
        "tech_mods": [
            {
                "id": "47",
                "title": "AI for Defense (SOC Automation)"
            },
            {
                "id": "48",
                "title": "Adversarial AI (Attacking Models)"
            },
            {
                "id": "49",
                "title": "LLM Security"
            }
        ],
        "soft_mods": [
            {
                "id": "27",
                "title": "Change Management (Adapting to AI)"
            },
            {
                "id": "16",
                "title": "Critical Thinking"
            }
        ]
    },
    {
        "title": "API & AppSec Defender",
        "role": "Application Security Engineer",
        "mission": "Take a broken, vulnerable API and rewrite the code to make it secure.",
        "outcome": "A \"Before & After\" code review showing fixed vulnerabilities.",
        "tech_mods": [
            {
                "id": "38",
                "title": "API Security Testing"
            },
            {
                "id": "31",
                "title": "Secure Coding Practices"
            },
            {
                "id": "32",
                "title": "Code Review"
            }
        ],
        "soft_mods": [
            {
                "id": "32",
                "title": "Team Collaboration Dynamics (Dev vs. Sec)"
            },
            {
                "id": "31",
                "title": "Conflict Resolution"
            }
        ]
    },
    {
        "title": "The CISO Simulation",
        "role": "Chief Information Security Officer (CISO)",
        "mission": "Manage a massive cyber crisis while handling the Board of Directors and budget cuts.",
        "outcome": "A Strategic Crisis Response Plan and a Board Presentation.",
        "tech_mods": [
            {
                "id": "45",
                "title": "Cyber Warfare Tactics"
            },
            {
                "id": "44",
                "title": "Third-Party Risk Management"
            }
        ],
        "soft_mods": [
            {
                "id": "34",
                "title": "Leadership Fundamentals"
            },
            {
                "id": "28",
                "title": "Crisis Management"
            },
            {
                "id": "26",
                "title": "Financial Literacy (Budgeting)"
            }
        ]
    }
];
