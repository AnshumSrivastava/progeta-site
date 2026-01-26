import type { Module } from './types';

export const technicalModules: Module[] = [
    {
        "id": 1,
        "title": "Cybersecurity Fundamentals",
        "category": "Offensive Security",
        "goal": "Establish the foundational \"Security Mindset\" and understand the physics of data.",
        "tools": "VMware Workstation/VirtualBox (Labs), HashCalc (Integrity), VeraCrypt (Encryption), KeePassXC (Identity).",
        "skills": "Ability to set up a safe virtual lab. Understanding how to secure files via encryption/hashing. Articulating Risk vs. Threat.",
        "type": "Technical",
        "syllabus": [
            { "title": "The CIA Triad", "desc": "Understanding Confidentiality, Integrity, and Availability as the pillars of security." },
            { "title": "Risk Management 101", "desc": "Differentiating between Threats, Vulnerabilities, and Risks." },
            { "title": "Virtualization Basics", "desc": "Setting up Type-2 Hypervisors for safe experimentation." },
            { "title": "Cryptography Primer", "desc": "Symmetric vs Asymmetric encryption and Hashing fundamentals." }
        ],
        "toolDetails": [
            { "name": "VMware Workstation", "desc": "Industry-standard Virtual Machine monitor for running isolated labs." },
            { "name": "VeraCrypt", "desc": "Open-source disk encryption software for securing sensitive data." },
            { "name": "KeePassXC", "desc": "Offline password manager for secure identity handling." }
        ]
    },
    {
        "id": 14,
        "title": "OSINT (Open Source Intelligence)",
        "category": "Offensive Security",
        "goal": "Gather intelligence from public sources before touching the target.",
        "tools": "Maltego, Shodan, Google Dorks, theHarvester, Wayback Machine.",
        "skills": "Building a profile on a target organization or individual. finding exposed assets.",
        "type": "Technical"
    },
    {
        "id": 2,
        "title": "Linux Operations & Command Line",
        "category": "Offensive Security",
        "goal": "Master the OS of the internet (Linux) and move from GUI to CLI.",
        "tools": "Kali Linux & Ubuntu. Bash & Zsh (Shells). Vim/Nano (Editors). Core commands (grep, ssh, systemctl).",
        "skills": "Navigation via CLI. User and permission management. Secure remote server connection via SSH.",
        "type": "Technical",
        "syllabus": [
            { "title": "File System Hierarchy", "desc": "Understanding /etc, /var, /bin and the Linux structure." },
            { "title": "User Permissions (chmod/chown)", "desc": "Managing user rights and sudo privileges securely." },
            { "title": "Process Management", "desc": "Using ps, top, and kill to control system resources." },
            { "title": "Bash Scripting Basics", "desc": "Automating simple tasks with shell scripts." }
        ],
        "toolDetails": [
            { "name": "Kali Linux", "desc": "Debian-based distribution designed for digital forensics and penetration testing." },
            { "name": "Vim", "desc": "Highly configurable text editor built to make creating and changing any kind of text very efficient." },
            { "name": "SSH", "desc": "Secure Shell protocol for operating network services securely over an unsecured network." }
        ]
    },
    {
        "id": 15,
        "title": "Digital Footprinting & Reconnaissance",
        "category": "Offensive Security",
        "goal": "Map the technical attack surface of an organization.",
        "tools": "Recon-ng, SpiderFoot, BuiltWith, DNSRecon, Amass.",
        "skills": "Mapping network ranges. Identifying used technologies (CMS/Frameworks).",
        "type": "Technical"
    },
    {
        "id": 3,
        "title": "Computer Networking & TCP/IP",
        "category": "Offensive Security",
        "goal": "Understand how data moves across the internet to identify anomalies.",
        "tools": "Packet Tracer (Simulation), Ping, Traceroute, Netstat, Ncat.",
        "skills": "Troubleshooting connectivity issues. Reading network maps. Understanding how protocols handshake.",
        "type": "Technical",
        "syllabus": [
            { "title": "OSI vs TCP/IP Model", "desc": "The 7-layer framework vs the real-world protocol stack." },
            { "title": "IP Addressing & Subnetting", "desc": "IPv4/IPv6 structures, CIDR notation, and masks." },
            { "title": "Transport Protocols", "desc": "Deep dive into TCP (Reliable) vs UDP (Fast/Lossy)." },
            { "title": "Common Ports", "desc": "Memorizing standard ports (80, 443, 22, 53) and their services." }
        ],
        "toolDetails": [
            { "name": "Wireshark", "desc": "The world's most widely-used network protocol analyzer." },
            { "name": "Ncat", "desc": "Networking utility which reads and writes data across networks from the command line." },
            { "name": "Traceroute", "desc": "Network diagnostic tool for displaying the route (path) and measuring transit delays." }
        ]
    },

    {
        "id": 16,
        "title": "Dark Web Operations",
        "category": "Offensive Security",
        "goal": "Navigate the hidden web safely for intelligence gathering.",
        "tools": "Tor Browser, Tails OS, Kleopatra (PGP).",
        "skills": "Accessing .onion sites safely. Communicating via PGP encryption. Monitoring leak sites.",
        "type": "Technical",
        "syllabus": [
            { "title": "Tor Network Architecture", "desc": "How Onion Routing works (Entry, Relay, Exit nodes)." },
            { "title": "Safe Browsing Practices", "desc": "Configuring Tor Browser for maximum privacy (NoScript, HTTPS)." },
            { "title": "Hidden Services (.onion)", "desc": "Navigating the dark web directories and marketplaces." },
            { "title": "PGP Communication", "desc": "Encrypting messages and verifying signatures for trust." }
        ],
        "toolDetails": [
            { "name": "Tor Browser", "desc": "The official browser for accessing the Tor network anonymously." },
            { "name": "Tails OS", "desc": "The Amnesic Incognito Live System - leaves no trace on the computer." },
            { "name": "Kleopatra", "desc": "Certificate manager and universal crypto GUI for OpenPGP." }
        ]
    },
    {
        "id": 4,
        "title": "Virtualization & Lab Setup",
        "category": "Offensive Security",
        "goal": "Build the infrastructure required to hack safely.",
        "tools": "VMware Workstation, Oracle VirtualBox, Vagrant (Basics).",
        "skills": "Deploying Windows/Linux VMs. Configuring isolated virtual networks. Managing machine snapshots for recovery.",
        "type": "Technical",
        "syllabus": [
            { "title": "Hypervisor Fundamentals", "desc": "Type 1 (Bare Metal) vs Type 2 (Hosted) virtualization." },
            { "title": "Lab Network Architecture", "desc": "NAT, Bridged, and Host-Only networking modes." },
            { "title": "Snapshots & Cloning", "desc": "Creating save states for malware analysis and risky testing." },
            { "title": "Vagrant Automation", "desc": "Spinning up reproducible environments with code." }
        ],
        "toolDetails": [
            { "name": "VMware Workstation", "desc": "Industry-standard desktop hypervisor for running VMs." },
            { "name": "VirtualBox", "desc": "Free and open-source hypervisor from Oracle." },
            { "name": "Vagrant", "desc": "Tool for building and managing virtual machine environments in a single workflow." }
        ]
    },
    {
        "id": 17,
        "title": "Operational Security (OpSec) & Anonymity",
        "category": "Offensive Security",
        "goal": "Protect the researcher's identity during operations.",
        "tools": "ProtonVPN, Proxychains, User-Agent Switcher, Virtual Machines.",
        "skills": "Masking digital identity. Safe browsing habits. Preventing IP leaks.",
        "type": "Technical"
    },
    {
        "id": 5,
        "title": "Network Traffic Analysis",
        "category": "Offensive Security",
        "goal": "Develop the \"Blue Team eye\" to spot malicious patterns on the wire.",
        "tools": "Wireshark, TCPDump, Zeek (Bro), Brim.",
        "skills": "Capturing live traffic. Filtering noise from data. Identifying clear-text credential leaks.",
        "type": "Technical"
    },
    {
        "id": 18,
        "title": "Network Scanning (Nmap/Masscan)",
        "category": "Offensive Security",
        "goal": "Active discovery of hosts and services.",
        "tools": "Nmap (The Standard), Masscan (High speed), Zenmap.",
        "skills": "Identifying live hosts. Mapping open ports and running services. Scripted scanning (NSE).",
        "type": "Technical"
    },
    {
        "id": 6,
        "title": "Packet Sniffing & Wireshark Mastery",
        "category": "Offensive Security",
        "goal": "Advanced usage of the world's primary network analysis tool.",
        "tools": "Wireshark (Advanced), TShark (CLI), NetworkMiner.",
        "skills": "Reconstructing files from captured traffic. Decrypting SSL traffic (with keys). Debugging complex network latency.",
        "type": "Technical",
        "syllabus": [
            { "title": "Capture Filters", "desc": "Writing BPF syntax to capture only relevant traffic." },
            { "title": "Stream Reassembly", "desc": "Reconstructing TCP streams to read full conversations." },
            { "title": "SSL Decryption", "desc": "Using session keys to decrypt HTTPS traffic for analysis." },
            { "title": "Network Forensics", "desc": "Extracting artifacts (images, executables) from PCAP files." }
        ],
        "toolDetails": [
            { "name": "Wireshark", "desc": "Advanced protocol analyzer for deep inspection." },
            { "name": "TShark", "desc": "Command-line version of Wireshark for scripting and automation." },
            { "name": "NetworkMiner", "desc": "Network forensic analysis tool (NFAT) for Windows." }
        ]
    },
    {
        "id": 19,
        "title": "Vulnerability Assessment (Nessus/OpenVAS)",
        "category": "Offensive Security",
        "goal": "Identify known security flaws using automated tools.",
        "tools": "Nessus Essentials, OpenVAS, Greenbone.",
        "skills": "Configuring scan policies. Interpreting vulnerability reports. Prioritizing remediation.",
        "type": "Technical",
        "syllabus": [
            { "title": "Scan Policies", "desc": "Configuring safe checks vs aggressive exploitation." },
            { "title": "Credentialed Scanning", "desc": "Scanning with authentication for deeper insight." },
            { "title": "Risk Scoring", "desc": "Calculating CVSS scores to prioritize fixing." },
            { "title": "Reporting", "desc": "Generating executive and technical remediation reports." }
        ],
        "toolDetails": [
            { "name": "Nessus", "desc": "The industry standard for vulnerability assessment." },
            { "name": "OpenVAS", "desc": "Full-featured open source vulnerability scanner." },
            { "name": "Greenbone", "desc": "Security Manager used for managing OpenVAS scans." }
        ]
    },
    {
        "id": 7,
        "title": "SIEM Architecture & Deployment",
        "category": "Offensive Security",
        "goal": "Centralize security monitoring and visualize enterprise threats.",
        "tools": "Splunk (Free/Enterprise), Wazuh (Open Source), ELK Stack (Elasticsearch, Logstash, Kibana).",
        "skills": "Ingesting logs from various sources. Writing basic correlation queries. Creating threat dashboards.",
        "type": "Technical",
        "syllabus": [
            { "title": "Log Ingestion", "desc": "Shipping logs from endpoints to the central server (Forwarders)." },
            { "title": "Normalization", "desc": "Parsing different log formats into a common schema (CIM/ECS)." },
            { "title": "Correlation Rules", "desc": "Detecting sequences of events (e.g., Brute Force -> Success)." },
            { "title": "Dashboards", "desc": "Visualizing attack data for SOC walls." }
        ],
        "toolDetails": [
            { "name": "Splunk", "desc": "Leading platform for operational intelligence and SIEM." },
            { "name": "Wazuh", "desc": "Open-source security monitoring and EDR solution." },
            { "name": "ELK Stack", "desc": "Elasticsearch, Logstash, and Kibana for log management." }
        ]
    },
    {
        "id": 20,
        "title": "Web Application Security (OWASP Top 10)",
        "category": "Offensive Security",
        "goal": "Understand the most common flaws in modern web apps.",
        "tools": "OWASP Juice Shop (Target), DVWA, Browser DevTools.",
        "skills": "Identifying injection points. Understanding client-side vs. server-side attacks.",
        "type": "Technical",
        "syllabus": [
            { "title": "SQL Injection (SQLi)", "desc": "Manipulating database queries to steal data." },
            { "title": "Cross-Site Scripting (XSS)", "desc": "Injecting malicious scripts into web pages." },
            { "title": "Broken Auth", "desc": "Exploiting weak session management and passwords." },
            { "title": "Insecure Deserialization", "desc": "Executing code by modifying serialized objects." }
        ],
        "toolDetails": [
            { "name": "OWASP Juice Shop", "desc": "Intentionally insecure web application for training." },
            { "name": "DVWA", "desc": "Damn Vulnerable Web App - PHP/MySQL target." },
            { "name": "DevTools", "desc": "Browser integrated tools for inspecting DOM and network." }
        ]
    },
    {
        "id": 8,
        "title": "Log Analysis & Management",
        "category": "Offensive Security",
        "goal": "The art of reading the \"Black Box\" of systems.",
        "tools": "Splunk SPL, Grep/Awk (Manual analysis), Sysmon.",
        "skills": "Identifying Brute Force attacks in text logs. Tracking user activity across systems. Spotting persistence mechanisms.",
        "type": "Technical",
        "syllabus": [
            { "title": "Windows Event Logs", "desc": "Understanding Security, System, and Application channels." },
            { "title": "Linux Syslog", "desc": "Reading /var/log/auth.log and journalctl." },
            { "title": "Regex for Hunters", "desc": "Writing regular expressions to find evil patterns." },
            { "title": "Persistence Hunting", "desc": "Finding scheduled tasks and registry run keys in logs." }
        ],
        "toolDetails": [
            { "name": "Splunk SPL", "desc": "Search Processing Language for querying big data." },
            { "name": "Grep/Awk", "desc": "Linux command line tools for text processing." },
            { "name": "Sysmon", "desc": "Windows System Monitor for granular event logging." }
        ]
    },
    {
        "id": 21,
        "title": "Burp Suite Professional",
        "category": "Offensive Security",
        "goal": "Mastery of the industry-standard web hacking tool.",
        "tools": "Burp Suite (Proxy, Repeater, Intruder, Decoder), FoxyProxy.",
        "skills": "Man-in-the-Middle of web traffic. Brute-forcing login forms. Automating payloads.",
        "type": "Technical",
        "syllabus": [
            { "title": "Interception Proxy", "desc": "Modifying HTTP requests in flight." },
            { "title": "Repeater", "desc": "Manually replaying requests to test for flaws." },
            { "title": "Intruder", "desc": "Automating attacks with payload positions (Fuzzing)." },
            { "title": "Decoder", "desc": "Decoding Base64, URL, and HTML entities." }
        ],
        "toolDetails": [
            { "name": "Burp Suite", "desc": "Integrated platform for performing security testing of web applications." },
            { "name": "FoxyProxy", "desc": "Browser extension to easily switch proxy settings." },
            { "name": "Burp Collaborator", "desc": "Detecting out-of-band interactions." }
        ]
    },
    {
        "id": 9,
        "title": "Incident Response Lifecycle",
        "category": "Offensive Security",
        "goal": "Structure the chaos of a cyberattack into a repeatable process.",
        "tools": "TheHive (Case Management), Cortex XSOAR (Concepts), Ticket Systems (Jira).",
        "skills": "Managing a security incident from start to finish. Documentation during crisis. Post-incident reporting.",
        "type": "Technical",
        "syllabus": [
            { "title": "Preparation", "desc": "Setting up the IR team and tools before the breach." },
            { "title": "Identification", "desc": "Detecting the incident and determining scope." },
            { "title": "Containment", "desc": "Stopping the bleeding (Isolation vs Shutdown)." },
            { "title": "Eradication & Recovery", "desc": "Removing the threat and restoring operations." }
        ],
        "toolDetails": [
            { "name": "TheHive", "desc": "Scalable, open source and free Security Incident Response Platform." },
            { "name": "Cortex XSOAR", "desc": "Security orchestration, automation, and response platform." },
            { "name": "Jira", "desc": "Issue tracking product for bug tracking and agile project management." }
        ]
    },
    {
        "id": 22,
        "title": "System Hacking & Exploitation",
        "category": "Offensive Security",
        "goal": "Gaining access to a system using exploits.",
        "tools": "Metasploit Framework, Netcat, Exploit-DB, Searchsploit.",
        "skills": "Exploiting unpatched services. Generating payloads. Catching reverse shells.",
        "type": "Technical",
        "syllabus": [
            { "title": "Reconnaissance Phase", "desc": "Finding the target info needed for an exploit." },
            { "title": "Exploit Selection", "desc": "Choosing the right exploit for the version." },
            { "title": "Payload Delivery", "desc": "Staged vs Non-staged payloads (Meterpreter)." },
            { "title": "Post-Exploitation", "desc": " Looting data and traversing the system." }
        ],
        "toolDetails": [
            { "name": "Metasploit", "desc": "Penetration testing framework for developing and executing exploit code." },
            { "name": "Exploit-DB", "desc": "Archive of exploits and vulnerable software." },
            { "name": "Netcat", "desc": "Utility for reading from and writing to network connections using TCP or UDP." }
        ]
    },
    {
        "id": 10,
        "title": "Playbook Design & Automation",
        "category": "Offensive Security",
        "goal": "Automate repetitive SOC tasks to focus on complex threats.",
        "tools": "Shuffle (Open Source SOAR), Draw.io (Flowcharts), Ansible (Basics).",
        "skills": "Designing workflows for Phishing/Malware triage. Reducing Mean Time to Respond (MTTR).",
        "type": "Technical",
        "syllabus": [
            { "title": "Workflow Mapping", "desc": "Visualizing the decision tree for incident triage." },
            { "title": "API Integration", "desc": "Connecting disparate tools (EDR, Firewall, Ticket System)." },
            { "title": "False Positive Tuning", "desc": "Logic to ignore safe alerts automatically." },
            { "title": "Metric Tracking", "desc": "Measuring MTTR and MTTD improvements." }
        ],
        "toolDetails": [
            { "name": "Shuffle", "desc": "Open Source SOAR platform for automation." },
            { "name": "Ansible", "desc": "IT automation tool for configuration management." },
            { "name": "Draw.io", "desc": "Diagramming tool for mapping process flows." }
        ]
    },
    {
        "id": 23,
        "title": "Privilege Escalation (Linux/Windows)",
        "category": "Offensive Security",
        "goal": "Moving from low-level user to Admin/Root.",
        "tools": "LinPEAS, WinPEAS, GTFOBins, Mimikatz.",
        "skills": "Enumerating local system weakness. Elevating privileges to gain full control.",
        "type": "Technical",
        "syllabus": [
            { "title": "Kernel Exploits", "desc": "DirtyCow and other kernel-level vulnerabilities." },
            { "title": "Misconfigurations", "desc": "Weak file permissions (SUID/GUID) and sudo rights." },
            { "title": "Credential Hunting", "desc": "Finding passwords in config files and history." },
            { "title": "Service Abuse", "desc": "Hijacking unquoted service paths in Windows." }
        ],
        "toolDetails": [
            { "name": "LinPEAS", "desc": "Linux Privilege Escalation Awesome Script." },
            { "name": "WinPEAS", "desc": "Windows Privilege Escalation Awesome Script." },
            { "name": "GTFOBins", "desc": "List of Unix binaries that can be used to bypass system restrictions." }
        ]
    },
    {
        "id": 11,
        "title": "Endpoint Detection & Response (EDR)",
        "category": "Offensive Security",
        "goal": "Move beyond Antivirus to behavioral monitoring.",
        "tools": "CrowdStrike Falcon (Concepts), Wazuh Agent, Sysmon, Velociraptor.",
        "skills": "Deploying agents. Querying endpoint data for IOCs. Remotely isolating infected machines.",
        "type": "Technical",
        "syllabus": [
            { "title": "Telemetry Collection", "desc": "What EDR sees: Process creation, File mods, Net conns." },
            { "title": "Behavioral Analysis", "desc": "Detecting 'Living off the Land' attacks (PowerShell usage)." },
            { "title": "Threat Hunting", "desc": "Proactively searching for undetected threats." },
            { "title": "Response Actions", "desc": "Killing processes and isolating hosts remotely." }
        ],
        "toolDetails": [
            { "name": "CrowdStrike Falcon", "desc": "Leader in cloud-delivered endpoint protection." },
            { "name": "Wazuh Agent", "desc": "Open source agent for threat detection and compliance." },
            { "name": "Velociraptor", "desc": "Advanced digital forensic and incident response tool." }
        ]
    },
    {
        "id": 24,
        "title": "Lateral Movement Techniques",
        "category": "Offensive Security",
        "goal": "Moving through a network after initial compromise.",
        "tools": "Proxychains, PsExec, Impacket, Sshuttle.",
        "skills": "Routing traffic through compromised hosts. Accessing internal subnets.",
        "type": "Technical",
        "syllabus": [
            { "title": "Pivoting", "desc": "Using a compromised host to attack others in the network." },
            { "title": "Port Forwarding", "desc": "SSH tunneling and local/remote forwarding." },
            { "title": "Pass-the-Hash", "desc": "Authenticating without cracking the password." },
            { "title": "SOCKS Proxies", "desc": "Tunneling tool traffic through dynamic proxies." }
        ],
        "toolDetails": [
            { "name": "Proxychains", "desc": "Redirects connections through proxy servers." },
            { "name": "Impacket", "desc": "Collection of Python classes for working with network protocols." },
            { "name": "Sshuttle", "desc": "Transparent proxy server that works as a poor man's VPN." }
        ]
    },
    {
        "id": 12,
        "title": "Digital Forensics",
        "category": "Offensive Security",
        "goal": "Post-mortem analysis of systems to solve digital crimes.",
        "tools": "Autopsy, FTK Imager, Volatility (RAM Analysis), Registry Viewer.",
        "skills": "Creating forensic images. Recovering deleted files. Analyzing Windows Registry for evidence.",
        "type": "Technical",
        "syllabus": [
            { "title": "Disk Imaging", "desc": "Creating bit-for-bit copies (E01) without altering data." },
            { "title": "File Systems", "desc": "FAT32, NTFS, EXT4 structures and deleted file recovery." },
            { "title": "Artifact Analysis", "desc": "Prefetch, Shimcache, and Amcache analysis." },
            { "title": "Timeline Creation", "desc": "Reconstructing the sequence of events." }
        ],
        "toolDetails": [
            { "name": "Autopsy", "desc": "Digital forensics platform and GUI for The Sleuth Kit." },
            { "name": "FTK Imager", "desc": "Data preview and imaging tool." },
            { "name": "Volatility", "desc": "Memory forensics framework." }
        ]
    },
    {
        "id": 25,
        "title": "Active Directory Attacks",
        "category": "Offensive Security",
        "goal": "Compromising Windows Enterprise Networks.",
        "tools": "BloodHound, PowerView, Rubeus, Responder.",
        "skills": "Mapping trust relationships. Kerberoasting. LLMNR Poisoning. Domain Admin compromise.",
        "type": "Technical",
        "syllabus": [
            { "title": "Domain Enumeration", "desc": "Mapping Users, Groups, Computers, and Trusts." },
            { "title": "Kerberoasting", "desc": "Requesting service tickets to crack offline." },
            { "title": "AS-REP Roasting", "desc": "Attacking users without pre-auth requirements." },
            { "title": "Golden Ticket", "desc": "Forging tickets to gain unlimited persistence." }
        ],
        "toolDetails": [
            { "name": "BloodHound", "desc": "Visualizes Active Directory trust relationships." },
            { "name": "Rubeus", "desc": "C# toolset for raw Kerberos interaction and abuses." },
            { "name": "PowerView", "desc": "PowerShell tool to gain network situational awareness." }
        ]
    },
    {
        "id": 13,
        "title": "Evidence Handling & Chain of Custody",
        "category": "Offensive Security",
        "goal": "Ensure forensic findings hold up in a court of law.",
        "tools": "Hardware Write Blockers (Concepts), CoC Forms, Hashing Tools.",
        "skills": "Proper seizure of digital devices. Maintaining a tamper-proof evidence log.",
        "type": "Technical",
        "syllabus": [
            { "title": "Seizure Procedures", "desc": "Bagging and tagging devices (Faraday bags)." },
            { "title": "Hashing", "desc": "Using MD5/SHA256 to prove data integrity." },
            { "title": "Chain of Custody Forms", "desc": "Documenting every person who handled the evidence." },
            { "title": "Legal Admissibility", "desc": "Ensuring evidence holds up in court." }
        ],
        "toolDetails": [
            { "name": "Write Blockers", "desc": "Hardware that prevents computer from writing to a disk." },
            { "name": "CoC Forms", "desc": "Legal documents tracking evidence possession." },
            { "name": "HashCalc", "desc": "Tool for calculating checksums." }
        ]
    },
    {
        "id": 26,
        "title": "Social Engineering Tactics",
        "category": "Offensive Security",
        "goal": "Hacking the human element.",
        "tools": "GoPhish, Social Engineering Toolkit (SET), SpoofCard.",
        "skills": "Crafting convincing phishing campaigns. Cloning login pages. Awareness training.",
        "type": "Technical",
        "syllabus": [
            { "title": "Pretexting", "desc": "Creating a believable scenario (The Scenario)." },
            { "title": "Phishing", "desc": "Email-based attacks (Spear Phishing vs Whaling)." },
            { "title": "Vishing/Smishing", "desc": "Voice and SMS solicitation." },
            { "title": "Physical Entry", "desc": "Tailgating and badge cloning." }
        ],
        "toolDetails": [
            { "name": "GoPhish", "desc": "Open-Source Phishing Toolkit." },
            { "name": "SET", "desc": "Social-Engineer Toolkit for advanced attacks." },
            { "name": "SpoofCard", "desc": "App for caller ID spoofing." }
        ]
    },
    {
        "id": 27,
        "title": "Malware Analysis Fundamentals",
        "category": "Offensive Security",
        "goal": "Safely dissecting malicious software to understand its behavior.",
        "tools": "Cuckoo Sandbox, VirusTotal, PEStudio, Ghidra (Basics).",
        "skills": "Identifying malicious signatures. Running malware in safe environments. Extracting C2 domains.",
        "type": "Technical",
        "syllabus": [
            { "title": "Static Analysis", "desc": "Examining code without executing it (Strings, PE Headers)." },
            { "title": "Dynamic Analysis", "desc": "Running the sample in a sandbox to observe behavior." },
            { "title": "Reverse Engineering", "desc": "Disassembling binaries to understand logic." },
            { "title": "Packing & Obfuscation", "desc": "Dealing with encrypted or compressed malware." }
        ],
        "toolDetails": [
            { "name": "Ghidra", "desc": "Software reverse engineering (SRE) suite of tools by NSA." },
            { "name": "Cuckoo Sandbox", "desc": "Automated dynamic malware analysis system." },
            { "name": "PEStudio", "desc": "Tool to spot suspicious artifacts in executable files." }
        ]
    },
    {
        "id": 28,
        "title": "Indicators of Compromise (IoC) Discovery",
        "category": "Offensive Security",
        "goal": "Creating detection rules based on attack evidence.",
        "tools": "YARA, Loki, IOC Editor.",
        "skills": "Writing YARA rules. Scanning systems for specific threat signatures.",
        "type": "Technical",
        "syllabus": [
            { "title": "The Pyramid of Pain", "desc": "Hash values vs TTPs (Tactics, Techniques, Procedures)." },
            { "title": "YARA Rules", "desc": "Writing pattern matching rules for malware classification." },
            { "title": "Sigma Rules", "desc": "Generic signature format for SIEM systems." },
            { "title": "Threat Feeds", "desc": "Consuming STIX/TAXII data." }
        ],
        "toolDetails": [
            { "name": "YARA", "desc": "The pattern matching swiss army knife for malware researchers." },
            { "name": "Loki", "desc": "Simple IOC scanner/finder." },
            { "name": "MISP", "desc": "Open Source Threat Intelligence Platform." }
        ]
    },
    {
        "id": 29,
        "title": "Python for Cybersecurity",
        "category": "GRC & Strategy",
        "goal": "Automating security tasks with custom code.",
        "tools": "Python 3, Scapy, Requests, BeautifulSoup.",
        "skills": "Writing port scanners. Automating web requests. Parsing log files programmatically.",
        "type": "Technical",
        "syllabus": [
            { "title": "Scripting Basics", "desc": "Variables, Loops, and Functions in Python." },
            { "title": "Network Sockets", "desc": "Writing a custom port scanner and netcat clone." },
            { "title": "Scapy Packet Crafting", "desc": "Building custom TCP/IP packets for testing." },
            { "title": "Web Automation", "desc": "Brute-forcing forms using Requests and BeautifulSoup." }
        ],
        "toolDetails": [
            { "name": "Python 3", "desc": "The primary language of the security industry." },
            { "name": "Scapy", "desc": "Packet manipulation program." },
            { "name": "Requests", "desc": "Elegant HTTP library for Python." }
        ]
    },
    {
        "id": 39,
        "title": "ISO 27001 Standards & Implementation",
        "category": "GRC & Strategy",
        "goal": "Understanding the global gold standard for InfoSec.",
        "tools": "Documentation Templates, Compliance Tools.",
        "skills": "Drafting security policies. Preparing for external certification audits.",
        "type": "Technical",
        "syllabus": [
            { "title": "ISMS Fundamentals", "desc": "Information Security Management System (Plan-Do-Check-Act)." },
            { "title": "Risk Assessment", "desc": "Asset valuation and threat modeling." },
            { "title": "Annex A Controls", "desc": "The 114 security controls of ISO 27001." },
            { "title": "Internal Audit", "desc": "Verifying compliance before the external auditor arrives." }
        ],
        "toolDetails": [
            { "name": "Gap Analysis Tool", "desc": "Spreadsheet to track compliance status." },
            { "name": "Policy Templates", "desc": "Standardized documents for Access Control, HR Security, etc." },
            { "name": "Drata", "desc": "Compliance automation platform (Concept)." }
        ]
    },
    {
        "id": 30,
        "title": "Bash Scripting",
        "category": "GRC & Strategy",
        "goal": "Leveraging the shell for speed and efficiency.",
        "tools": "Bash, Cron, Grep/Sed/Awk.",
        "skills": "Writing wrapper scripts. Automating recon tasks. Scheduling system audits.",
        "type": "Technical",
        "syllabus": [
            { "title": "Shell Expansion", "desc": "Globbing and Brace expansion for batch processing." },
            { "title": "Piping & Redirection", "desc": "Chaining commands (grep, awk, sed, cut)." },
            { "title": "Loops & Logic", "desc": "Automating repetitive tasks (for i in $(cat hosts); do...)." },
            { "title": "Cron Jobs", "desc": "Scheduling persistent surveillance scripts." }
        ],
        "toolDetails": [
            { "name": "Bash", "desc": "Born Again SHell - default on most Linux systems." },
            { "name": "Cron", "desc": "Time-based job scheduler." },
            { "name": "Awk", "desc": "Pattern scanning and processing language." }
        ]
    },
    {
        "id": 40,
        "title": "NIST Cybersecurity Framework",
        "category": "GRC & Strategy",
        "goal": "Adopting the US standard for critical infrastructure protection.",
        "tools": "NIST CSF Excel Tool, DHS CSET.",
        "skills": "Mapping controls to risks. Performing a gap analysis against NIST.",
        "type": "Technical",
        "syllabus": [
            { "title": "Core Functions", "desc": "Identify, Protect, Detect, Respond, Recover." },
            { "title": "Implementation Tiers", "desc": "Measuring maturity from Partial to Adaptive." },
            { "title": "Profiles", "desc": "Aligning the framework to specific business needs." },
            { "title": "Supply Chain Risks", "desc": "Managing third-party exposure using NIST." }
        ],
        "toolDetails": [
            { "name": "NIST CSF Tool", "desc": "Excel-based assessment tool." },
            { "name": "CSET", "desc": "Cyber Security Evaluation Tool by DHS." },
            { "name": "Archer", "desc": "GRC Platform for managing frameworks." }
        ]
    },
    {
        "id": 31,
        "title": "Secure Coding Practices",
        "category": "GRC & Strategy",
        "goal": "Writing code that is resistant to attack.",
        "tools": "OWASP Secure Coding Guidelines, SonarQube (Concepts).",
        "skills": "Fixing SQLi and XSS in code. Implementing secure authentication logic.",
        "type": "Technical",
        "syllabus": [
            { "title": "Input Validation", "desc": "Never trust user input (Sanitization/Encoding)." },
            { "title": "Output Encoding", "desc": "Preventing XSS by neutralizing special characters." },
            { "title": "Parameterized Queries", "desc": "Stopping SQL Injection at the database driver level." },
            { "title": "Secrets Management", "desc": "Keeping API keys out of git repositories." }
        ],
        "toolDetails": [
            { "name": "OWASP SAMM", "desc": "Software Assurance Maturity Model." },
            { "name": "SonarQube", "desc": "Continuous code quality and security inspection." },
            { "name": "Snyk", "desc": "Developer-first security platform." }
        ]
    },
    {
        "id": 41,
        "title": "Risk Management Strategies",
        "category": "GRC & Strategy",
        "goal": "Quantifying uncertainty and loss.",
        "tools": "Risk Heat Maps, Excel.",
        "skills": "Calculating financial risk. Prioritizing security investments based on ROI.",
        "type": "Technical",
        "syllabus": [
            { "title": "Qualitative vs Quantitative", "desc": "Heatmaps vs Dollar values (SLE/ALE)." },
            { "title": "Risk Response", "desc": "Accept, Avoid, Mitigate, Transfer." },
            { "title": "Business Impact Analysis", "desc": "Identifying critical processes and RTO/RPO." },
            { "title": "Risk Register", "desc": "Maintaining a living document of organizational risks." }
        ],
        "toolDetails": [
            { "name": "FAIR Model", "desc": "Factor Analysis of Information Risk." },
            { "name": "Risk Register Template", "desc": "Excel/Database for tracking risks." },
            { "name": "ServiceNow GRC", "desc": "Enterprise risk management platform." }
        ]
    },
    {
        "id": 32,
        "title": "Code Review & Static Analysis (SAST)",
        "category": "GRC & Strategy",
        "goal": "Finding bugs in code before it compiles.",
        "tools": "SonarQube, Snyk, Bandit, TruffleHog.",
        "skills": "Auditing codebases. Configuring automated scanning rules. Identifying logic bombs.",
        "type": "Technical",
        "syllabus": [
            { "title": "Manual Code Review", "desc": "Reading code line-by-line to find logic flaws." },
            { "title": "Automated Scans", "desc": "Integrating SAST tools into the CI/CD pipeline." },
            { "title": "False Positive Triage", "desc": "Distinguishing between real bugs and scanner noise." },
            { "title": "Secret Detection", "desc": "Scanning git history for committed passwords." }
        ],
        "toolDetails": [
            { "name": "SonarQube", "desc": "Code quality and security analysis tool." },
            { "name": "Bandit", "desc": "Security linter for Python code." },
            { "name": "TruffleHog", "desc": "Searches through git repositories for high entropy strings and secrets." }
        ]
    },
    {
        "id": 42,
        "title": "Compliance Frameworks (GDPR/HIPAA/PCI)",
        "category": "GRC & Strategy",
        "goal": "Navigating the legal landscape of data protection.",
        "tools": "OneTrust (Concepts), Audit Checklists.",
        "skills": "Identifying regulated data. Ensuring systems meet legal privacy standards.",
        "type": "Technical",
        "syllabus": [
            { "title": "Data Mapping", "desc": "Identifying where PII/PHI lives in the network." },
            { "title": "GDPR Rights", "desc": "Implementing 'Right to be Forgotten' workflows." },
            { "title": "PCI-DSS Scoping", "desc": "Reducing the cardholder data environment (CDE)." },
            { "title": "Audit Prep", "desc": "Gathering evidence for QSA/OCR auditors." }
        ],
        "toolDetails": [
            { "name": "OneTrust", "desc": "Privacy management and compliance software." },
            { "name": "Vanta", "desc": "Automated security compliance platform." },
            { "name": "AuditBoard", "desc": "Risk and audit management software." }
        ]
    },
    {
        "id": 33,
        "title": "Cloud Computing Fundamentals",
        "category": "GRC & Strategy",
        "goal": "Understanding the environment of modern infrastructure.",
        "tools": "AWS Console (Free Tier), Azure Portal.",
        "skills": "Navigating cloud dashboards. Understanding cloud billing and resource management.",
        "type": "Technical",
        "syllabus": [
            { "title": "Shared Responsibility", "desc": "Understanding what YOU secure vs what AWS secures." },
            { "title": "IAM Basics", "desc": "Users, Groups, Roles, and Policies." },
            { "title": "S3 Buckets", "desc": "Configuring public/private storage securely." },
            { "title": "VPC Networking", "desc": "Subnets, Route Tables, and Security Groups." }
        ],
        "toolDetails": [
            { "name": "AWS Console", "desc": "Web-based interface for managing AWS resources." },
            { "name": "Azure Portal", "desc": "Web-based application for building, managing, and monitoring Azure services." },
            { "name": "Terraform", "desc": "Infrastructure as Code tool for building cloud resources." }
        ]
    },
    {
        "id": 43,
        "title": "Internal Auditing Procedures",
        "category": "GRC & Strategy",
        "goal": "Verifying that controls are actually working.",
        "tools": "AuditScripts, Evidence Repositories.",
        "skills": "Conducting stakeholder interviews. verifying technical controls. Writing audit reports.",
        "type": "Technical",
        "syllabus": [
            { "title": "Audit Charter", "desc": "Defining the authority and scope of the internal audit." },
            { "title": "Fieldwork", "desc": "Gathering evidence through observation and inquiry." },
            { "title": "Sampling", "desc": "Selecting a representative subset of data to test." },
            { "title": "Reporting", "desc": "Drafting findings, root causes, and management action plans." }
        ],
        "toolDetails": [
            { "name": "AuditScripts", "desc": "Resources for information systems auditors." },
            { "name": "Teammate+", "desc": "Audit management software system." },
            { "name": "Snipe-IT", "desc": "Open source IT asset management system." }
        ]
    },
    {
        "id": 34,
        "title": "Cloud Infrastructure Security (AWS/Azure)",
        "category": "GRC & Strategy",
        "goal": "Hardening cloud environments against misconfiguration.",
        "tools": "AWS IAM, AWS Inspector, ScoutSuite, Prowler.",
        "skills": "Auditing cloud accounts. Locking down public storage. Managing cloud identities.",
        "type": "Technical",
        "syllabus": [
            { "title": "CSPM", "desc": "Cloud Security Posture Management fundamentals." },
            { "title": "IAM Privilege Escalation", "desc": "Abusing permission boundaries to gain admin." },
            { "title": "Metadata Service Abuse", "desc": "Stealing temporary credentials from EC2 (SSRF)." },
            { "title": "CloudTrail Analysis", "desc": "Investigating unauthorized API calls." }
        ],
        "toolDetails": [
            { "name": "Prowler", "desc": "AWS security assessment tool based on best practices." },
            { "name": "ScoutSuite", "desc": "Multi-cloud security-auditing tool." },
            { "name": "AWS Inspector", "desc": "Automated security assessment service." }
        ]
    },
    {
        "id": 44,
        "title": "Third-Party Risk Management (TPRM)",
        "category": "GRC & Strategy",
        "goal": "Managing the risk of vendors and supply chains.",
        "tools": "Vendor Assessment Templates.",
        "skills": "Evaluating vendor security posture. Negotiating security clauses in contracts.",
        "type": "Technical",
        "syllabus": [
            { "title": "Vendor Categorization", "desc": "Grouping vendors by risk (Critical vs Low Risk)." },
            { "title": "Due Diligence", "desc": "Reviewing SOC2 reports and SIG questionnaires." },
            { "title": "Continuous Monitoring", "desc": "Watching for vendor breaches using threat intel." },
            { "title": "Offboarding", "desc": "Ensuring data is destroyed when contracts end." }
        ],
        "toolDetails": [
            { "name": "SIG Questionnaire", "desc": "Standard Information Gathering assessment tool." },
            { "name": "BitSight", "desc": "Security Rating Platform for third-party risk." },
            { "name": "Prevalent", "desc": "Third-party risk management platform." }
        ]
    },
    {
        "id": 35,
        "title": "Container Security (Docker)",
        "category": "GRC & Strategy",
        "goal": "Securing microservices and containerized apps.",
        "tools": "Docker, Docker Bench, Trivy, Clair.",
        "skills": "Scanning images for vulnerabilities. Writing secure Dockerfiles. Limiting container privileges.",
        "type": "Technical",
        "syllabus": [
            { "title": "Dockerfile Security", "desc": "Using trusted base images and non-root users." },
            { "title": "Container Breakout", "desc": "Escaping the container to access the host." },
            { "title": "Image Scanning", "desc": "Finding CVEs in libraries before deployment." },
            { "title": "Runtime Security", "desc": "Detecting anomalous shell execution in pods." }
        ],
        "toolDetails": [
            { "name": "Docker Bench", "desc": "Script that checks for dozens of common best-practices." },
            { "name": "Trivy", "desc": "Comprehensive security scanner for containers and FS." },
            { "name": "Clair", "desc": "Vulnerability Static Analysis for Containers." }
        ]
    },
    {
        "id": 45,
        "title": "Cyber Warfare Tactics",
        "category": "GRC & Strategy",
        "goal": "Understanding the strategic landscape of nation-state conflict.",
        "tools": "MITRE ATT&CK Framework.",
        "skills": "Profiling nation-state actors. Understanding strategic cyber capabilities.",
        "type": "Technical",
        "syllabus": [
            { "title": "APT Groups", "desc": "Study of Advanced Persistent Threats (China, Russia, NK, Iran)." },
            { "title": "Cyber Kill Chain", "desc": "Lockheed Martin's framework for intrusion analysis." },
            { "title": "Information Warfare", "desc": "Disinformation campaigns and psychological ops." },
            { "title": "Critical Infrastructure", "desc": "Targeting power grids and financial systems." }
        ],
        "toolDetails": [
            { "name": "MITRE ATT&CK", "desc": "Knowledge base of adversary tactics and techniques." },
            { "name": "Atomic Red Team", "desc": "Tests for mapping to MITRE ATT&CK." },
            { "name": "Navigator", "desc": "Tool for annotating and visualizing ATT&CK matrices." }
        ]
    },
    {
        "id": 36,
        "title": "Kubernetes Security & Orchestration",
        "category": "GRC & Strategy",
        "goal": "Securing container orchestration at scale.",
        "tools": "Kubernetes (Minikube), Kube-hunter, OPA (Open Policy Agent).",
        "skills": "Auditing K8s clusters. Implementing network segmentation between pods.",
        "type": "Technical",
        "syllabus": [
            { "title": "Cluster Architecture", "desc": "Master Node, Worker Nodes, Etcd, and API Server." },
            { "title": "Pod Security Standards", "desc": "Enforcing baseline, restricted, and privileged policies." },
            { "title": "RBAC", "desc": "Role-Based Access Control for K8s resources." },
            { "title": "Network Policies", "desc": "Firewall rules for east-west traffic." }
        ],
        "toolDetails": [
            { "name": "Kube-hunter", "desc": "Hunt for security weaknesses in Kubernetes clusters." },
            { "name": "OPA Gatekeeper", "desc": "Policy existence for Kubernetes." },
            { "name": "Polaris", "desc": "Validates K8s configuration against best practices." }
        ]
    },
    {
        "id": 46,
        "title": "Geopolitical Risk Analysis",
        "category": "GRC & Strategy",
        "goal": "analyzing how global events impact cyber threat levels.",
        "tools": "Feedly (Intel Aggregation), Recorded Future (Concepts).",
        "skills": "Producing strategic threat briefings. Anticipating attacks based on world news.",
        "type": "Technical",
        "syllabus": [
            { "title": "Intelligence Cycle", "desc": "Planning, Collection, Processing, Analysis, Dissemination." },
            { "title": "Source Evaluation", "desc": "Admiralty Code (Grading reliability of intel)." },
            { "title": "Attribution", "desc": "The difficulty of knowing 'who did it'." },
            { "title": "Briefing Execs", "desc": "Turning technical threats into business decisions." }
        ],
        "toolDetails": [
            { "name": "Feedly", "desc": "AI-powered news aggregator for threat intel." },
            { "name": "Recorded Future", "desc": "Real-time threat intelligence platform." },
            { "name": "Maltego", "desc": "Link analysis tool for investigating relationships." }
        ]
    },
    {
        "id": 37,
        "title": "CI/CD Pipeline Security",
        "category": "GRC & Strategy",
        "goal": "Integrating security into the DevOps lifecycle (Shift Left).",
        "tools": "Jenkins, GitLab CI, OWASP Dependency Check.",
        "skills": "Building secure pipelines. Automating vulnerability scans on commit.",
        "type": "Technical",
        "syllabus": [
            { "title": "Pipeline Hardening", "desc": "Securing the build server itself from compromise." },
            { "title": "SCA", "desc": "Software Composition Analysis (Checking dependencies)." },
            { "title": "Policy as Code", "desc": "Enforcing security gates before deployment." },
            { "title": "Artifact Signing", "desc": "Ensuring code hasn't been tampered with (Sigstore)." }
        ],
        "toolDetails": [
            { "name": "Jenkins", "desc": "Open source automation server." },
            { "name": "GitLab CI", "desc": "Integrated CI/CD pipelines." },
            { "name": "Dependency Check", "desc": "OWASP tool to detect publicly disclosed vulnerabilities in dependencies." }
        ]
    },
    {
        "id": 38,
        "title": "API Security Testing",
        "category": "GRC & Strategy",
        "goal": "Securing the connective tissue of modern apps.",
        "tools": "Postman, Burp Suite, KiteRunner.",
        "skills": "Testing API endpoints. Manipulating JSON tokens. Identifying logic flaws in APIs.",
        "type": "Technical",
        "syllabus": [
            { "title": "REST vs GraphQL", "desc": "Understanding API architectures." },
            { "title": "BOLA/IDOR", "desc": "Broken Object Level Authorization (The #1 API flaw)." },
            { "title": "Rate Limiting", "desc": "Testing for DoS and brute force vulnerabilities." },
            { "title": "JWT Attacks", "desc": "Forging and cracking JSON Web Tokens." }
        ],
        "toolDetails": [
            { "name": "Postman", "desc": "Platform for API development and testing." },
            { "name": "KiteRunner", "desc": "Context-aware API scanner." },
            { "name": "Wsdler", "desc": "Burp extension for WSDL parsing." }
        ]
    },
    {
        "id": 47,
        "title": "AI for Defense (SOC Automation)",
        "category": "Future Tech & AI",
        "goal": "Leveraging AI to fight scale with scale.",
        "tools": "Darktrace (Concepts), Splunk ML Toolkit.",
        "skills": "Configuring AI-driven alerts. Reducing false positives using ML.",
        "type": "Technical",
        "syllabus": [
            { "title": "UEBA", "desc": "User and Entity Behavior Analytics." },
            { "title": "Supervised Learning", "desc": "Training models on known bad traffic." },
            { "title": "Anomaly Detection", "desc": "Spotting deviations from the baseline." },
            { "title": "SOAR Automation", "desc": "AI deciding when to block an IP." }
        ],
        "toolDetails": [
            { "name": "Darktrace", "desc": "Self-learning AI for cyber defense." },
            { "name": "Splunk MLTK", "desc": "Machine Learning Toolkit for Splunk." },
            { "name": "Vectra", "desc": "AI-driven threat detection and response." }
        ]
    },
    {
        "id": 51,
        "title": "Blockchain Security",
        "category": "Future Tech & AI",
        "goal": "Securing Web3 and distributed ledgers.",
        "tools": "MetaMask, Etherscan, Geth.",
        "skills": "analyzing blockchain transactions. Securing digital wallets.",
        "type": "Technical",
        "syllabus": [
            { "title": "Consensus Mechanisms", "desc": "PoW vs PoS security implications." },
            { "title": "51% Attacks", "desc": "Overpowering the network hashrate." },
            { "title": "Wallet Security", "desc": "Hot vs Cold storage and seed phrase protection." },
            { "title": "DeFi Exploits", "desc": "Flash loans and liquidity pool hacks." }
        ],
        "toolDetails": [
            { "name": "Etherscan", "desc": "Ethereum Blockchain Explorer." },
            { "name": "MetaMask", "desc": "Crypto wallet & gateway to blockchain apps." },
            { "name": "MythX", "desc": "Security verification for smart contracts." }
        ]
    },
    {
        "id": 48,
        "title": "Adversarial AI (Attacking Models)",
        "category": "Future Tech & AI",
        "goal": "Understanding how to trick Artificial Intelligence.",
        "tools": "Adversarial Robustness Toolbox (ART), Counterfit.",
        "skills": "Testing AI models for robustness. Understanding model vulnerabilities.",
        "type": "Technical",
        "syllabus": [
            { "title": "Model Inversion", "desc": "Reconstructing private training data from the model." },
            { "title": "Poisoning Attacks", "desc": "Corrupting the training data to backlash the AI." },
            { "title": "Evasion Attacks", "desc": "Creating adversarial examples (pixel changes) to fool vision models." },
            { "title": "Model Stealing", "desc": "Querying a black-box model to replicate it." }
        ],
        "toolDetails": [
            { "name": "ART", "desc": "Adversarial Robustness Toolbox by IBM." },
            { "name": "Counterfit", "desc": "Command line tool for assessing the security of ML models." },
            { "name": "PyRit", "desc": "Python Risk Identification Tool for GenAI." }
        ]
    },
    {
        "id": 52,
        "title": "Smart Contract Auditing",
        "category": "Future Tech & AI",
        "goal": "Finding money-losing bugs in decentralized code.",
        "tools": "Remix IDE, Slither, MythX.",
        "skills": "Auditing Solidity code. Identifying logic flaws in contracts.",
        "type": "Technical",
        "syllabus": [
            { "title": "Reentrancy", "desc": "The vulnerability that killed the DAO." },
            { "title": "Integer Overflow", "desc": "Preventing math errors in older Solidity versions." },
            { "title": "Access Control", "desc": "Ensuring only the owner can withdraw funds." },
            { "title": "Gas Optimization", "desc": "Writing efficient code to save money." }
        ],
        "toolDetails": [
            { "name": "Remix IDE", "desc": "Web-based IDE for Solidity." },
            { "name": "Slither", "desc": "Static analysis framework for Solidity." },
            { "name": "Hardhat", "desc": "Ethereum development environment." }
        ]
    },
    {
        "id": 49,
        "title": "LLM Security (Prompt Injection Defense)",
        "category": "Future Tech & AI",
        "goal": "Securing the new wave of Generative AI applications.",
        "tools": "Garak, LangChain Security.",
        "skills": "Auditing LLM prompts. Preventing sensitive data exfiltration via AI.",
        "type": "Technical",
        "syllabus": [
            { "title": "Prompt Injection", "desc": "Tricking the LLM into ignoring instructions (DAN mode)." },
            { "title": "Jailbreaking", "desc": "Bypassing safety filters to generate harmful content." },
            { "title": "Data Leakage", "desc": "Ensuring PII doesn't end up in training data." },
            { "title": "Indirect Injection", "desc": "Attacking LLMs via web pages they read." }
        ],
        "toolDetails": [
            { "name": "Garak", "desc": "LLM vulnerability scanner." },
            { "name": "Langfuse", "desc": "Open source observability & analytics for LLM apps." },
            { "name": "OWASP LLM Top 10", "desc": "Standard awareness document for AI security." }
        ]
    },
    {
        "id": 53,
        "title": "IoT Security Fundamentals",
        "category": "Future Tech & AI",
        "goal": "Securing the Internet of Things.",
        "tools": "Binwalk, Shodan, Wireshark.",
        "skills": "Extracting firmware. analyzing IoT network traffic.",
        "type": "Technical",
        "syllabus": [
            { "title": "Firmware Analysis", "desc": "Extracting filesystems from binary blobs (Binwalk)." },
            { "title": "UART/JTAG", "desc": "Communicating with hardware via physical debugging ports." },
            { "title": "Radio Hacking", "desc": "Intercepting weak protocols (Zigbee, Bluetooth LE)." },
            { "title": "Hardware Teardown", "desc": "Identifying chips and flash memory." }
        ],
        "toolDetails": [
            { "name": "Binwalk", "desc": "Firmware analysis tool." },
            { "name": "Shodan", "desc": "Search engine for Internet-connected devices." },
            { "name": "Fritzing", "desc": "Electronics design software." }
        ]
    },
    {
        "id": 50,
        "title": "Quantum Cryptography Basics",
        "category": "Future Tech & AI",
        "goal": "Preparing for the \"Q-Day\" apocalypse.",
        "tools": "Qiskit (IBM), OpenQuantumSafe.",
        "skills": "Understanding the threat to RSA/ECC. Identifying crypto-agility needs.",
        "type": "Technical",
        "syllabus": [
            { "title": "Shor's Algorithm", "desc": "How quantum computers break asymmetric encryption." },
            { "title": "PQC", "desc": "Post-Quantum Cryptography algorithms (Lattice-based)." },
            { "title": "QKD", "desc": "Quantum Key Distribution physics." },
            { "title": "Harvest Now, Decrypt Later", "desc": "The immediate threat to long-term data secrets." }
        ],
        "toolDetails": [
            { "name": "Qiskit", "desc": "Open-source SDK for working with quantum computers." },
            { "name": "OpenQuantumSafe", "desc": "Library for prototyping quantum-resistant cryptography." },
            { "name": "IBM Quantum Experience", "desc": "Cloud access to real quantum processors." }
        ]
    },
    {
        "id": 54,
        "title": "OT & SCADA Security",
        "category": "Future Tech & AI",
        "goal": "Protecting industrial control systems.",
        "tools": "ScadaBR, GRFICS.",
        "skills": "Understanding industrial protocols. Recognizing safety system risks.",
        "type": "Technical",
        "syllabus": [
            { "title": "ICS Architectures", "desc": "Purdue Model (Levels 0-5)." },
            { "title": "Industrial Protocols", "desc": "Insecure by design (Modbus, DNP3, Profinet)." },
            { "title": "Safety Systems (SIS)", "desc": "The last line of defense against physical destruction." },
            { "title": "Air Gaps", "desc": "The myth of isolated networks." }
        ],
        "toolDetails": [
            { "name": "ScadaBR", "desc": "Open source SCADA system." },
            { "name": "GRFICS", "desc": "Graphical Realism Framework for Industrial Control Simulation." },
            { "name": "ControlThings", "desc": "Platform for conducting penetration testing on ICS." }
        ]
    }
];

export const softSkillsModules: Module[] = [
    {
        "id": 1,
        "title": "Resume Building & Optimization",
        "category": "Communication",
        "goal": "Creating a CV that passes the robots (ATS) and impresses humans.",
        "tools": "Canva, Jobscan, LaTeX.",
        "skills": "Writing an ATS-compliant resume. Structuring technical experience effectively.",
        "type": "Soft Skills"
    },
    {
        "id": 7,
        "title": "Public Speaking",
        "category": "Communication",
        "goal": "Delivering technical ideas with confidence.",
        "tools": "TED Talks, Toastmasters.",
        "skills": "Overcoming stage fright. Presenting to groups.",
        "type": "Soft Skills"
    },
    {
        "id": 2,
        "title": "Interview Preparation & Mock Sessions",
        "category": "Communication",
        "goal": "Mastering the art of the interview.",
        "tools": "Pramp, Glassdoor, Voice Recorder.",
        "skills": "Answering \"Tell me about yourself\" confidently. Handling technical grilling.",
        "type": "Soft Skills"
    },
    {
        "id": 8,
        "title": "Presentation Design (PowerPoint/Canva)",
        "category": "Communication",
        "goal": "Creating slides that inform, not bore.",
        "tools": "PowerPoint, Canva, Prezi.",
        "skills": "Designing clean, professional decks. Summarizing complex data.",
        "type": "Soft Skills"
    },
    {
        "id": 3,
        "title": "Personal Branding Strategy",
        "category": "Communication",
        "goal": "Establishing a professional reputation in the industry.",
        "tools": "Medium, Twitter/X, Personal Blog.",
        "skills": "creating technical content. Building an audience.",
        "type": "Soft Skills"
    },
    {
        "id": 9,
        "title": "Storytelling with Data",
        "category": "Communication",
        "goal": "Making numbers emotional and memorable.",
        "tools": "Tableau Public, Google Data Studio.",
        "skills": "Creating compelling data narratives.",
        "type": "Soft Skills"
    },
    {
        "id": 4,
        "title": "LinkedIn Growth & Optimization",
        "category": "Communication",
        "goal": "Turning a profile into an inbound lead generator.",
        "tools": "LinkedIn Analytics.",
        "skills": "Creating an \"All-Star\" profile. Networking with recruiters.",
        "type": "Soft Skills"
    },
    {
        "id": 10,
        "title": "Technical Writing (SOPs/Documentation)",
        "category": "Communication",
        "goal": "Writing clear, usable documentation.",
        "tools": "Markdown, Confluence, Word.",
        "skills": "Writing Standard Operating Procedures. Documenting code.",
        "type": "Soft Skills"
    },
    {
        "id": 5,
        "title": "Portfolio Development",
        "category": "Communication",
        "goal": "Proving skills through tangible work.",
        "tools": "GitHub, GitBook, WordPress.",
        "skills": "Showcasing code and projects. Writing technical guides.",
        "type": "Soft Skills"
    },
    {
        "id": 11,
        "title": "Report Writing for Executives",
        "category": "Communication",
        "goal": "Translating tech risk into business language.",
        "tools": "Report Templates.",
        "skills": "Writing pentest executive summaries. Justifying budgets.",
        "type": "Soft Skills"
    },
    {
        "id": 6,
        "title": "Professional Networking Strategies",
        "category": "Communication",
        "goal": "Accessing the hidden job market.",
        "tools": "Hunter.io, LinkedIn Sales Nav.",
        "skills": "expanding professional network. Getting referrals.",
        "type": "Soft Skills"
    },
    {
        "id": 12,
        "title": "Email Etiquette & Corporate Messaging",
        "category": "Communication",
        "goal": "Professional written communication.",
        "tools": "Grammarly.",
        "skills": "Writing effective business emails.",
        "type": "Soft Skills"
    },
    {
        "id": 13,
        "title": "Cross-Cultural Communication",
        "category": "Communication",
        "goal": "Working effectively in global teams.",
        "tools": "The Culture Map.",
        "skills": "Navigating cultural differences in remote teams.",
        "type": "Soft Skills"
    },
    {
        "id": 14,
        "title": "Negotiation Skills",
        "category": "Communication",
        "goal": "Getting what you want without burning bridges.",
        "tools": "Levels.fyi (Salary data).",
        "skills": "Negotiating salaries. Securing budget approvals.",
        "type": "Soft Skills"
    },
    {
        "id": 15,
        "title": "Persuasion & Influence",
        "category": "Communication",
        "goal": "Influencing without authority.",
        "tools": "Stakeholder Maps.",
        "skills": "Getting buy-in for security initiatives.",
        "type": "Soft Skills"
    },
    {
        "id": 16,
        "title": "Critical Thinking",
        "category": "Management & Business",
        "goal": "Analyzing information objectively.",
        "tools": "Mind Mapping.",
        "skills": "Questioning assumptions. Validating evidence.",
        "type": "Soft Skills"
    },
    {
        "id": 22,
        "title": "Time Management & Productivity",
        "category": "Management & Business",
        "goal": "Maximizing output and focus.",
        "tools": "Trello/Notion, Focus Timers.",
        "skills": "Prioritizing tasks. Managing interruptions.",
        "type": "Soft Skills"
    },
    {
        "id": 17,
        "title": "Analytical Problem Solving",
        "category": "Management & Business",
        "goal": "Systematically solving complex issues.",
        "tools": "SWOT Analysis.",
        "skills": "Debugging complex failures. finding root causes.",
        "type": "Soft Skills"
    },
    {
        "id": 23,
        "title": "Agile Methodologies (Scrum/Kanban)",
        "category": "Management & Business",
        "goal": "Working at the speed of modern dev.",
        "tools": "Jira, Kanban Boards.",
        "skills": "Participating in stand-ups. Working in sprints.",
        "type": "Soft Skills"
    },
    {
        "id": 18,
        "title": "Strategic Decision Making",
        "category": "Management & Business",
        "goal": "Making choices under uncertainty.",
        "tools": "Decision Matrices.",
        "skills": "Making fast, accurate decisions in a crisis.",
        "type": "Soft Skills"
    },
    {
        "id": 24,
        "title": "Project Management Basics",
        "category": "Management & Business",
        "goal": "Delivering projects on time and budget.",
        "tools": "Asana, MS Project.",
        "skills": "Managing security projects. Tracking progress.",
        "type": "Soft Skills"
    },
    {
        "id": 19,
        "title": "Cognitive Biases & Fallacies",
        "category": "Management & Business",
        "goal": "Identifying flaws in reasoning.",
        "tools": "Bias Cheat Sheets.",
        "skills": "Avoiding mental traps during investigations.",
        "type": "Soft Skills"
    },
    {
        "id": 25,
        "title": "Business Acumen for Tech Pros",
        "category": "Management & Business",
        "goal": "Understanding the business engine.",
        "tools": "Annual Reports.",
        "skills": "Speaking the language of business.",
        "type": "Soft Skills"
    },
    {
        "id": 20,
        "title": "Systems Thinking",
        "category": "Management & Business",
        "goal": "Seeing the big picture.",
        "tools": "Causal Loop Diagrams.",
        "skills": "Understanding how changes affect the whole ecosystem.",
        "type": "Soft Skills"
    },
    {
        "id": 26,
        "title": "Financial Literacy (Budgets/ROI)",
        "category": "Management & Business",
        "goal": "Managing money and budgets.",
        "tools": "Budget Templates.",
        "skills": "Creating security budgets. Calculating ROI.",
        "type": "Soft Skills"
    },
    {
        "id": 21,
        "title": "Creative Innovation",
        "category": "Management & Business",
        "goal": "Solving problems in novel ways.",
        "tools": "Whiteboarding.",
        "skills": "Bypassing security controls creatively.",
        "type": "Soft Skills"
    },
    {
        "id": 27,
        "title": "Change Management",
        "category": "Management & Business",
        "goal": "Guiding organizations through transition.",
        "tools": "Impact Assessments.",
        "skills": "Implementing new policies smoothly.",
        "type": "Soft Skills"
    },
    {
        "id": 28,
        "title": "Crisis Management",
        "category": "Management & Business",
        "goal": "Leading through disaster.",
        "tools": "Tabletop Exercises.",
        "skills": "Managing communication during a breach.",
        "type": "Soft Skills"
    },
    {
        "id": 29,
        "title": "Emotional Intelligence (EQ)",
        "category": "EQ & Leadership",
        "goal": "Managing self and others emotionally.",
        "tools": "EQ Assessments.",
        "skills": "Handling high-stress emotions.",
        "type": "Soft Skills"
    },
    {
        "id": 33,
        "title": "Stress Management & Resilience",
        "category": "EQ & Leadership",
        "goal": "Preventing burnout.",
        "tools": "Mindfulness apps.",
        "skills": "Maintaining mental health in Ops.",
        "type": "Soft Skills"
    },
    {
        "id": 30,
        "title": "Empathy in the Workplace",
        "category": "EQ & Leadership",
        "goal": "Understanding user and team needs.",
        "tools": "Empathy Maps.",
        "skills": "Building trust with teams.",
        "type": "Soft Skills"
    },
    {
        "id": 34,
        "title": "Leadership Fundamentals",
        "category": "EQ & Leadership",
        "goal": "Inspiring and guiding others.",
        "tools": "360 Feedback.",
        "skills": "Leading small teams.",
        "type": "Soft Skills"
    },
    {
        "id": 31,
        "title": "Conflict Resolution",
        "category": "EQ & Leadership",
        "goal": "Resolving disputes constructively.",
        "tools": "TKI Model.",
        "skills": "Mediating team conflicts.",
        "type": "Soft Skills"
    },
    {
        "id": 35,
        "title": "Mentorship Skills",
        "category": "EQ & Leadership",
        "goal": "Growing the next generation.",
        "tools": "GROW Model.",
        "skills": "Mentoring juniors effectively.",
        "type": "Soft Skills"
    },
    {
        "id": 32,
        "title": "Team Collaboration Dynamics",
        "category": "EQ & Leadership",
        "goal": "Working well with others.",
        "tools": "Slack/Teams.",
        "skills": "Collaborating cross-functionally.",
        "type": "Soft Skills"
    },
    {
        "id": 36,
        "title": "Workplace Ethics & Integrity",
        "category": "EQ & Leadership",
        "goal": "Maintaining professional standards.",
        "tools": "Case Studies.",
        "skills": "Navigating ethical dilemmas.",
        "type": "Soft Skills"
    }
];

export const allModules = [...technicalModules, ...softSkillsModules];
