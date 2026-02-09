<script>
    import { careerTracks } from "$lib/content/jobs";
    import MagneticButton from "./MagneticButton.svelte";
    import { fly } from "svelte/transition";
    import { base } from "$app/paths";

    let activeTrackId = careerTracks[0].id;

    $: activeTrack = careerTracks.find((t) => t.id === activeTrackId);

    // Derived dummy data for WOW factor (would be in content file ideally)
    // Data mapped to IDs from jobs.ts
    const trackDetails = {
        1: {
            salary: "₹10L - 18L",
            role: "CTI Specialist",
            tools: ["Maltego", "Shodan", "MISP"],
        },
        2: {
            salary: "₹8L - 14L",
            role: "SOC Analyst",
            tools: ["Splunk", "Wireshark", "CrowdStrike"],
        },
        3: {
            salary: "₹12L - 24L",
            role: "DevSecOps Engineer",
            tools: ["Docker", "K8s", "Snyk"],
        },
        4: {
            salary: "₹12L - 20L",
            role: "GRC Analyst",
            tools: ["NIST", "ISO 27001", "OneTrust"],
        },
        5: {
            salary: "₹10L - 22L",
            role: "Penetration Tester",
            tools: ["Burp Suite", "Metasploit", "Nmap"],
        },
        6: {
            salary: "₹14L - 28L",
            role: "Security Engineer",
            tools: ["Python", "Bash", "Ansible"],
        },
    };
</script>

<div class="pathfinder-container">
    <!-- TABS -->
    <div class="tabs">
        {#each careerTracks as track}
            <button
                class="tab-btn {activeTrackId === track.id ? 'active' : ''}"
                on:click={() => (activeTrackId = track.id)}
            >
                {track.title}
            </button>
        {/each}
    </div>

    <!-- CONTENT CARD -->
    <!-- Key block to trigger transition on change -->
    {#key activeTrackId}
        <div class="path-content" in:fly={{ y: 20, duration: 400, delay: 50 }}>
            <div class="path-header">
                <div>
                    <span class="cat-pill">Selected Protocol</span>
                    <h2 style="margin: 0.5rem 0;">{activeTrack.title}</h2>
                    <p style="max-width: 500px;">{activeTrack.description}</p>

                    <!-- DELIVERY MODES -->
                    <div class="delivery-modes">
                        <div class="mode-badge online">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                ><circle cx="12" cy="12" r="10"></circle><line
                                    x1="2"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                ></line><path
                                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                                ></path></svg
                            >
                            <span>Online Live</span>
                        </div>
                        <div class="mode-badge offline">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                ><path d="M3 21h18" /><path
                                    d="M5 21V7l8-4 8 4v14"
                                /><path
                                    d="M17 21v-8.5a1.5 1.5 0 0 0-1.5-1.5h-7a1.5 1.5 0 0 0-1.5 1.5V21"
                                /><path d="M9 21v-8.5" /></svg
                            >
                            <span>In-Person Campus</span>
                        </div>
                    </div>
                </div>
                <MagneticButton
                    href="{base}/tracks/{activeTrackId}"
                    variant="primary">Initialize Track</MagneticButton
                >
            </div>

            <div class="path-stats">
                <div class="stat-box">
                    <span class="label">Est. Compensation</span>
                    <div class="value pulse">
                        {trackDetails[activeTrackId]?.salary || "₹12L+"}
                    </div>
                </div>
                <div class="stat-box">
                    <span class="label">Target Role</span>
                    <div class="value">
                        {trackDetails[activeTrackId]?.role || "Specialist"}
                    </div>
                </div>
                <div class="stat-box">
                    <span class="label">Arsenal</span>
                    <div class="tool-tags">
                        {#each trackDetails[activeTrackId]?.tools || [] as tool}
                            <span class="tool-tag">{tool}</span>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Visual decorative background for the card -->
            <div class="card-bg"></div>
        </div>
    {/key}
</div>

<style>
    /* Container: Standard Clean Glass */
    .pathfinder-container {
        background: var(--bg-surface);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        padding: 0.5rem;
        width: 100%;
    }

    /* Tabs: Standard Buttons */
    .tabs {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        overflow-x: auto;
        border-bottom: 1px solid var(--glass-border);
        margin-bottom: 0.5rem;
    }

    .tab-btn {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        padding: 0.75rem 1.5rem;
        font-family: var(--font-display);
        font-weight: 600;
        cursor: pointer;
        border-radius: 12px;
        transition: all 0.3s;
        white-space: nowrap;
    }

    .tab-btn:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.05);
    }

    .tab-btn.active {
        background: var(--glass-highlight);
        color: var(--text-primary);
    }

    /* Content: Clean & Light */
    .path-content {
        padding: 3rem;
        position: relative;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .path-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 3rem;
        position: relative;
        z-index: 2;
    }

    .path-header h2 {
        font-size: 2rem;
        color: var(--text-primary);
        background: none;
        -webkit-text-fill-color: initial;
    }

    .path-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        position: relative;
        z-index: 2;
    }

    .stat-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--glass-border);
        padding: 1.5rem;
        border-radius: 12px;
        transition: none; /* Removed hover jump */
    }

    .label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        display: block;
        opacity: 1;
    }

    .value {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        font-family: var(--font-display);
        letter-spacing: normal;
    }

    .pulse {
        text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
    }

    .cat-pill {
        font-size: 0.7rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 4px 10px;
        border-radius: 100px;
        margin-bottom: 1rem;
        display: inline-block;
        border: none;
    }

    .delivery-modes {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .mode-badge {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--glass-border);
        border-radius: 100px; /* Rounded again */
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-secondary);
    }

    .mode-badge.online svg {
        color: var(--accent-blue);
    }
    .mode-badge.offline svg {
        color: #10b981;
    }

    .tool-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    .tool-tag {
        font-size: 0.8rem;
        padding: 4px 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        color: var(--text-primary);
        font-family: inherit;
        border: none;
    }

    .card-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            circle at top right,
            rgba(59, 130, 246, 0.1),
            transparent 60%
        );
        pointer-events: none;
        z-index: 1;
        opacity: 1;
        transform: none;
    }

    @media (max-width: 900px) {
        .path-header {
            flex-direction: column;
            gap: 2rem;
            align-items: stretch;
        }
        .path-stats {
            grid-template-columns: 1fr;
        }
        .tabs {
            padding: 0.5rem;
        }
        .tab-btn {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
        }
    }
</style>
