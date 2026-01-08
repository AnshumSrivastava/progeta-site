
// Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeSections() {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// "Alive" Spotlight Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card, .journey-node, .interactive-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Data Helper
function getData() {
    if (typeof siteData !== 'undefined') {
        return siteData;
    } else {
        console.error('siteData not loaded.');
        return null;
    }
}

// --- 1. CORE LOADERS (Minimal Previews) ---

async function loadBenefits() {
    const data = getData();
    if (!data) return;
    const container = document.getElementById('benefits-grid');
    if (!container) return;

    container.innerHTML = '';
    data.benefits.forEach((benefit, index) => {
        const card = document.createElement('div');
        card.className = 'card stagger-delay';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `<h3>${benefit.title}</h3><p>${benefit.description}</p>`;
        container.appendChild(card);
    });
}

async function loadTracks() {
    const data = getData();
    if (!data || !document.getElementById('tracks-list')) return;
    const container = document.getElementById('tracks-list');
    container.innerHTML = '';

    data.tracks.forEach((track, index) => {
        const card = document.createElement('a');
        card.href = `detail.html?collection=tracks&id=${index}`;
        card.className = 'card stagger-delay interactive-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.textDecoration = 'none';

        const phaseCount = track.phases ? track.phases.length : 0;

        card.innerHTML = `
            <span class="category">CAREER TRACK 0${index + 1}</span>
            <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">${track.title}</h3>
            <div style="display:flex; gap:1rem; margin-top:auto;">
                <span class="tag">${phaseCount} Phases</span>
                <span class="tag">6 Months</span>
            </div>
            <div style="margin-top:1rem; text-align:right; font-family:var(--font-mono); color:var(--accent-primary); font-size:0.8rem;">
                VIEW CURRICULUM &rarr;
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadModules() {
    const data = getData();
    if (!data) return;

    const container = document.getElementById('modules-grid');
    if (!container) return;
    const searchInput = document.getElementById('module-search');

    // Flatten modules
    const technical = (data.modules && data.modules.technical) ? data.modules.technical.map(m => ({ ...m, type: 'Technical', rawType: 'technical' })) : [];
    const soft = (data.modules && data.modules.soft_skills) ? data.modules.soft_skills.map(m => ({ ...m, type: 'Soft Skills', rawType: 'soft_skills' })) : [];
    const allModules = [...technical, ...soft];

    const renderModules = (modules) => {
        container.innerHTML = '';
        if (modules.length === 0) {
            container.innerHTML = '<p style="color:var(--text-secondary)">No modules found matching query.</p>';
            return;
        }

        modules.forEach((module, index) => {
            const card = document.createElement('a');
            card.href = `detail.html?collection=modules&cat=${module.rawType}&id=${module.id}`;
            card.className = 'card stagger-delay interactive-card';
            card.style.animationDelay = `${(index % 10) * 0.05}s`;
            card.style.textDecoration = 'none';

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <span class="category">${module.type.toUpperCase()} // ${module.id}</span>
                </div>
                <h3 style="margin-top:0.5rem; margin-bottom:0.5rem;">${module.title}</h3>
                <p style="color:var(--text-tertiary); font-size:0.8rem; margin:0;">${module.category || 'Core Competency'}</p>
                <div style="margin-top:auto; text-align:right; color:var(--accent-primary); font-size:1.2rem;">&rarr;</div>
            `;
            container.appendChild(card);
        });

        setTimeout(() => {
            const cards = container.querySelectorAll('.stagger-delay');
            cards.forEach(c => c.classList.add('visible'));
        }, 50);
    };

    renderModules(allModules);

    // Filter Logic
    const buttons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    const filterAndRender = () => {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        let filtered = allModules;

        if (currentFilter !== 'all') {
            filtered = filtered.filter(m => m.type === currentFilter);
        }

        if (query) {
            filtered = filtered.filter(m =>
                m.title.toLowerCase().includes(query) ||
                (m.category && m.category.toLowerCase().includes(query))
            );
        }

        renderModules(filtered);
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterAndRender();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterAndRender);
    }
}

async function loadWorkshops() {
    const data = getData();
    if (!data || !document.getElementById('workshops-grid')) return;
    const container = document.getElementById('workshops-grid');
    container.innerHTML = '';

    data.workshops.forEach((workshop, index) => {
        const card = document.createElement('a');
        card.href = `detail.html?collection=workshops&id=${index}`;
        card.className = 'card stagger-delay interactive-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.textDecoration = 'none';

        card.innerHTML = `
            <span class="category">SIMULATION 0${index + 1}</span>
            <h3 style="font-size: 1.3rem;">${workshop.title}</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem;">${workshop.role || 'Participant'}</p>
             <div style="margin-top:1rem; text-align:right; font-family:var(--font-mono); color:var(--accent-primary); font-size:0.8rem;">
                ENTER SIMULATION &rarr;
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadEvents() {
    const data = getData();
    if (!data || !document.getElementById('events-grid')) return;
    const container = document.getElementById('events-grid');
    container.innerHTML = '';

    data.events.forEach((event, index) => {
        // LINKED CARD
        const card = document.createElement('a');
        card.href = `detail.html?collection=events&id=${index}`;
        card.className = 'card stagger-delay interactive-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.textDecoration = 'none';

        card.innerHTML = `
            <span class="category">${event.type || 'Event'}</span>
            <h3>${event.title}</h3>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.5rem;">${event.description || ''}</p>
            <div style="margin-top:1rem; text-align:right; font-family:var(--font-mono); color:var(--accent-secondary); font-size:0.8rem;">
                VIEW PROTOCOL &rarr;
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 2. DETAIL VIEW CONTROLLER ---

function loadDetailView() {
    const contentDiv = document.getElementById('detail-content');
    if (!contentDiv) return; // Not on detail page

    const params = new URLSearchParams(window.location.search);
    const collection = params.get('collection');
    const id = params.get('id');
    const cat = params.get('cat');

    const data = getData();
    const titleEl = document.getElementById('detail-title');
    const categoryEl = document.getElementById('detail-category');
    const bodyEl = document.querySelector('.detail-body');

    if (!collection || id === null) {
        titleEl.textContent = "INVALID REFERENCE";
        return;
    }

    let item = null;
    let html = '';

    // --- MODULE DETAIL (DASHBOARD) ---
    if (collection === 'modules' && cat) {
        const list = data.modules[cat];
        // Ensure ID type match (data uses strings mostly)
        if (list) item = list.find(m => String(m.id) === String(id));

        if (item) {
            titleEl.textContent = item.title;
            // Add ID to title for tech feel
            categoryEl.innerHTML = `MODULE <span style="color:var(--accent-primary)">//</span> ${cat.toUpperCase()} <span style="color:var(--accent-primary)">//</span> ID.${item.id}`;

            // Parse tools for chips
            let toolsHtml = '';
            if (item.tools) {
                const toolsArr = item.tools.split(/,|&|\./).map(t => t.trim()).filter(t => t.length > 0);
                toolsHtml = toolsArr.map(t => `<span class="tool-chip">${t}</span>`).join('');
            }

            // Parse concepts for list
            let conceptsHtml = '';
            if (item.concepts) {
                // If it looks like a list vs paragraph
                conceptsHtml = `<p>${item.concepts}</p>`;
            }

            html = `
                <!-- Main Goal Panel -->
                <div class="dashboard-panel" style="grid-column: 1 / -1;">
                    <div class="panel-title"><span>PRIMARY OBJECTIVE</span> <span>[GOAL]</span></div>
                    <p style="font-size:1.2rem; line-height:1.6;">${item.goal || 'Objective not defined.'}</p>
                </div>

                <div class="module-dashboard">
                    <!-- Left Column: Operations & Skills -->
                    <div class="dashboard-panel">
                        <div class="panel-title"><span>OPERATIONAL COMPETENCIES</span> <span>[SKILLS]</span></div>
                        <p>${item.skills || 'No specific skills listed.'}</p>
                        
                        <div class="panel-title" style="margin-top:2rem;"><span>CORE CONCEPTS</span> <span>[THEORY]</span></div>
                        ${conceptsHtml}
                    </div>

                    <!-- Right Column: Arsenal -->
                    <div class="dashboard-panel">
                        <div class="panel-title"><span>TACTICAL ARSENAL</span> <span>[TOOLS]</span></div>
                        <div class="tool-grid">
                            ${toolsHtml || '<span style="color:var(--text-tertiary)">No specific tools required.</span>'}
                        </div>
                        
                        <div class="panel-title" style="margin-top:2rem;"><span>METADATA</span></div>
                        <div class="meta-item"><label>CATEGORY</label><span>${item.category || 'General'}</span></div>
                        <div class="meta-item"><label>TYPE</label><span>${item.type}</span></div>
                    </div>
                </div>
            `;
        }
    }
    // --- TRACK DETAIL (TIMELINE) ---
    else if (collection === 'tracks') {
        item = data.tracks[id];
        if (item) {
            titleEl.textContent = item.title;
            categoryEl.innerHTML = `CAREER TRACK <span style="color:var(--accent-primary)">//</span> DIPLOMA PROGRAM`;

            html += `<div class="track-timeline">`;

            if (item.phases) {
                // FIXED: Use ID directly from data instead of title matching
                item.phases.forEach((phase, idx) => {
                    let modulesHtml = '';

                    phase.modules.forEach(m => {
                        // Map "Technical" -> "technical", "Soft Skills" -> "soft_skills"
                        // The data uses "Technical" or "Soft Skills" (Title Case)
                        // The URL param expects "technical" or "soft_skills"
                        const rawType = m.type === 'Technical' ? 'technical' : 'soft_skills';
                        const typeClass = m.type === 'Technical' ? 'tech' : 'soft';

                        const linkHref = `detail.html?collection=modules&cat=${rawType}&id=${m.id}`;

                        modulesHtml += `
                            <a href="${linkHref}" class="timeline-module-card">
                                <span class="tm-type ${typeClass}">${m.type.toUpperCase()} // ID.${m.id}</span>
                                <h4 class="tm-title">${m.title}</h4>
                            </a>
                        `;
                    });

                    html += `
                        <div class="timeline-phase">
                            <div class="timeline-node"></div>
                            <div class="phase-header">
                                <h3 class="phase-title">${phase.name}</h3>
                                <span class="phase-duration">Duration: 4-6 Weeks</span>
                            </div>
                            <div class="phase-modules-grid">
                                ${modulesHtml}
                            </div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
        }
    }
    // --- WORKSHOP DETAIL ---
    else if (collection === 'workshops') {
        item = data.workshops[id];
        if (item) {
            titleEl.textContent = item.title;
            // Tech-style breadcrumb
            categoryEl.innerHTML = `LIVE FIRE SIMULATION <span style="color:var(--accent-primary)">//</span> ${item.role.toUpperCase()}`;

            // TECH MODS CHIPS
            let techMap = item.tech_mods.map(m => {
                const link = `detail.html?collection=modules&cat=technical&id=${m.id}`;
                return `<a href="${link}" class="tool-chip" style="text-decoration:none; cursor:pointer;">TP.${m.id} ${m.title}</a>`;
            }).join('');

            // SOFT MODS CHIPS
            let softMap = item.soft_mods.map(m => {
                const link = `detail.html?collection=modules&cat=soft_skills&id=${m.id}`;
                return `<a href="${link}" class="tool-chip" style="border-color:var(--accent-secondary); color:var(--accent-secondary); text-decoration:none; cursor:pointer;">SP.${m.id} ${m.title}</a>`;
            }).join('');

            html = `
                <!-- Mission Header -->
                <div class="dashboard-panel" style="grid-column: 1 / -1; background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(20,20,20,0.5) 100%);">
                     <div class="panel-title"><span>MISSION DOSSIER</span> <span>[CLASSIFIED]</span></div>
                     <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem; margin-top:1rem;">
                        <div>
                             <label style="font-family:var(--font-mono); color:var(--text-tertiary); font-size:0.8rem;">OPERATIVE ROLE</label>
                             <div style="font-size:1.5rem; color:var(--accent-primary); margin-top:0.25rem;">${item.role}</div>
                        </div>
                         <div>
                             <label style="font-family:var(--font-mono); color:var(--text-tertiary); font-size:0.8rem;">EXPECTED OUTCOME</label>
                             <div style="font-size:1.1rem; color:var(--text-primary); margin-top:0.25rem;">${item.outcome}</div>
                        </div>
                     </div>
                </div>

                <div class="module-dashboard">
                    <!-- Left: Mission Profile -->
                     <div class="dashboard-panel">
                        <div class="panel-title"><span>MISSION OBJECTIVES</span></div>
                        <p style="font-size:1.2rem; line-height:1.7;">${item.mission}</p>
                        
                        <div class="panel-title" style="margin-top:2rem;"><span>SOFT SKILL REQUIREMENTS</span></div>
                        <div class="tool-grid">${softMap || '<span class="text-muted">None specified.</span>'}</div>
                    </div>

                    <!-- Right: Technical Loadout -->
                    <div class="dashboard-panel">
                        <div class="panel-title"><span>REQUIRED TECHNICAL LOADOUT</span></div>
                        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">Operatives must be proficient in the following technical modules to succeed in this simulation.</p>
                        <div class="tool-grid" style="flex-direction:column; align-items:flex-start;">
                             ${techMap || 'No technical modules required.'}
                        </div>
                    </div>
                </div>
            `;
        }
    }
    // --- EVENT DETAIL ---
    else if (collection === 'events') {
        item = data.events[id];
        if (item) {
            titleEl.textContent = item.title;
            categoryEl.innerHTML = `COMMUNITY EVENT <span style="color:var(--accent-primary)">//</span> ${item.type.toUpperCase()}`;

            // 1. Generate Flow (Simulated based on type)
            // Tech events get a rigorous schedule; Soft skills get a social one.
            const isTech = item.type === 'Technical Events';

            const protocol = isTech ? [
                { time: '09:00', task: 'System Check & Environment Setup' },
                { time: '09:30', task: 'Mission Briefing' },
                { time: '10:00', task: 'Live Execution Phase' },
                { time: '13:00', task: 'Tactical De-brief & Analysis' }
            ] : [
                { time: '18:00', task: 'Doors Open & Check-In' },
                { time: '18:30', task: 'Keynote Session' },
                { time: '19:15', task: 'Interactive Workshop / Mixer' },
                { time: '20:30', task: 'Closing Remarks & Networking' }
            ];

            const flowHtml = protocol.map(step => `
                <div class="protocol-step">
                    <span class="step-time">${step.time} HOURS</span>
                    <h4 class="step-title">${step.task}</h4>
                </div>
            `).join('');

            // 2. Suggestions / Directives
            const suggestions = isTech ? [
                "Bring a laptop with Kali Linux or generic VM installed.",
                "Ensure generic pen-testing tools are updated (Nmap, Wireshark).",
                "Review the Code of Conduct regarding active scanning."
            ] : [
                "Bring business cards or digital contact info.",
                "Prepare a 30-second elevator pitch about your current projects.",
                "Open mind required; participate in group discussions."
            ];

            const suggestionsHtml = suggestions.map(s => `<li>${s}</li>`).join('');

            html = `
                <div class="dashboard-panel" style="grid-column: 1 / -1; margin-bottom: 2rem;">
                    <div class="panel-title"><span>EVENT OVERVIEW</span></div>
                    <p style="font-size:1.3rem; line-height:1.6; color:var(--text-primary);">${item.description || 'No description available.'}</p>
                </div>

                <div class="module-dashboard">
                    <!-- Left: Protocol Flow -->
                    <div class="dashboard-panel">
                        <div class="panel-title"><span>OPERATIONAL TIMELINE</span> <span>[FLOW]</span></div>
                        <div class="event-protocol">
                            ${flowHtml}
                        </div>
                    </div>

                    <!-- Right: Directives -->
                    <div class="dashboard-panel">
                        <div class="panel-title"><span>MISSION DIRECTIVES</span> <span>[PRE-REQS]</span></div>
                        <div class="directive-panel">
                            <ul class="suggestion-list">
                                ${suggestionsHtml}
                            </ul>
                        </div>

                         <div class="panel-title" style="margin-top:2rem;"><span>LOGISTICS</span></div>
                         <div class="meta-item"><label>LOCATION</label><span>Main HQ, Sector 7</span></div>
                         <div class="meta-item"><label>ACCESS LEVEL</label><span>Public / Student</span></div>
                    </div>
                </div>
            `;
        }
    }
    // --- ARTICLE DETAIL ---
    else if (collection === 'articles') {
        const list = data.articles;
        if (list) item = list.find(a => String(a.id) === String(id));

        if (item) {
            titleEl.textContent = item.title;
            categoryEl.innerHTML = `INTELLIGENCE BRIEFING <span style="color:var(--accent-primary)">//</span> ${item.category}`;

            html = `
                <div class="dashboard-panel" style="grid-column: 1 / -1; padding: 3rem;">
                    <div style="border-left:4px solid var(--accent-primary); padding-left:1.5rem; margin-bottom:2rem;">
                         <div style="font-family:var(--font-mono); color:var(--text-tertiary); margin-bottom:0.5rem;">AUTHOR: ${item.author} // DATE: ${item.date}</div>
                         <div style="font-size:1.4rem; color:var(--text-secondary); font-style:italic;">"${item.summary}"</div>
                    </div>
                    
                    <div style="font-size:1.1rem; line-height:1.8; color:var(--text-primary); max-width:800px;">
                        ${item.content}
                    </div>

                    <div style="margin-top:3rem; padding-top:2rem; border-top:1px solid var(--border-color); text-align:center;">
                         <div style="font-family:var(--font-mono); color:var(--accent-secondary);">Report End // Classification: PUBLIC</div>
                    </div>
                </div>
             `;
        }
    }

    if (!item) {
        titleEl.textContent = "DATA NOT FOUND";
        html = "<p>The requested artifact could not be retrieved from the archives.</p>";
    }
    bodyEl.innerHTML = html;
}

// --- 3. HOME PAGE LOGIC (DIRECT FLOW) ---

async function loadHomeContent() {
    const data = getData();
    if (!data) return;

    // A. ARTICLES (3 Max)
    const articleContainer = document.getElementById('home-articles-grid');
    if (articleContainer && data.articles) {
        data.articles.slice(0, 3).forEach((art) => {
            const card = document.createElement('a');
            card.href = `detail.html?collection=articles&id=${art.id}`;
            card.className = 'card interactive-card'; // Reuse generic card style
            card.style.textDecoration = 'none';
            card.innerHTML = `
                <span class="category" style="font-size:0.7rem;">${art.category}</span>
                <h3 style="margin-top:0.5rem;">${art.title}</h3>
                <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.5rem;">${art.summary}</p>
            `;
            articleContainer.appendChild(card);
        });
    }

    // B. TRACKS (All)
    const trackContainer = document.getElementById('home-tracks-grid');
    if (trackContainer && data.tracks) {
        data.tracks.forEach((track, index) => {
            const card = document.createElement('a');
            card.href = `detail.html?collection=tracks&id=${index}`; // Link to detail
            card.className = 'card interactive-card';
            card.style.textDecoration = 'none';
            card.innerHTML = `
                <span class="category">DIPLOMA // 6 MONTHS</span>
                <h3>${track.title}</h3>
                <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                    ${track.phases.map(p => `<span class="tool-chip" style="font-size:0.7rem; padding:0.2rem 0.5rem;">${p.name.split(':')[0]}</span>`).slice(0, 2).join('')}
                    <span class="tool-chip" style="font-size:0.7rem; padding:0.2rem 0.5rem;">+2 More</span>
                </div>
            `;
            trackContainer.appendChild(card);
        });
    }

    // C. WORKSHOPS (3 Featured)
    const workContainer = document.getElementById('home-workshops-grid');
    if (workContainer && data.workshops) {
        data.workshops.slice(0, 3).forEach((ws, index) => {
            const card = document.createElement('a');
            card.href = `detail.html?collection=workshops&id=${index}`;
            card.className = 'card interactive-card';
            card.style.textDecoration = 'none';
            card.innerHTML = `
                <span class="category">LIVE FIRE // ${ws.role}</span>
                <h3>${ws.title}</h3>
                <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.5rem;">${ws.mission.substring(0, 80)}...</p>
            `;
            workContainer.appendChild(card);
        });
    }

    // E. HERO TESTIMONIAL (Stacked)
    const heroTestimonial = document.getElementById('hero-testimonial');
    if (heroTestimonial && data.testimonials && data.testimonials.length >= 3) {
        // Pick 3 unique randoms
        const shuffled = [...data.testimonials].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        let html = '<div class="testimonial-stack">';

        // Render 3 cards: Main, Blur1, Blur2
        // We render in reverse order of visual layering (Back to Front) or use Z-index
        // DOM Order: Blur2 (Bottom), Blur1, Main (Top)

        // Card 3 (Background)
        html += createTestimonialCard(selected[2], 'card-blur-2');
        // Card 2 (Mid)
        html += createTestimonialCard(selected[1], 'card-blur-1');
        // Card 1 (Front)
        html += createTestimonialCard(selected[0], 'card-main');

        html += '</div>';
        heroTestimonial.innerHTML = html;
    }


    function createTestimonialCard(op, typeClass) {
        return `
        <div class="hero-testimonial-card ${typeClass}">
            <div class="hero-quote" style="${typeClass === 'card-blur-2' ? 'display:none' : ''}">"${op.quote}"</div>
            <div class="hero-author">
                <div>
                    <span class="ha-name">${op.name}</span>
                    <span class="ha-role">${op.role}</span>
                </div>
                <span class="ha-callsign">${op.callsign}</span>
            </div>
        </div>
    `;
    }

    // D. EVENTS (3 Upcoming)
    const eventContainer = document.getElementById('home-events-grid');
    if (eventContainer && data.events) {
        data.events.slice(0, 3).forEach((ev, index) => {
            const card = document.createElement('a');
            card.href = `detail.html?collection=events&id=${index}`;
            card.className = 'card interactive-card';
            card.style.textDecoration = 'none';
            card.innerHTML = `
                <span class="category">${ev.type}</span>
                <h3>${ev.title}</h3>
                <div style="margin-top:1rem; text-align:right; font-family:var(--font-mono); color:var(--accent-secondary); font-size:0.8rem;">
                    VIEW PROTOCOL &rarr;
                </div>
            `;
            eventContainer.appendChild(card);
        });
    }
}


// --- SYSTEM INIT ---
document.addEventListener("DOMContentLoaded", () => {

    // 1. Invitation Loader Logic (Professional & Once per Session)
    const enterBtn = document.getElementById('enter-btn');
    const loader = document.getElementById('loader-overlay');

    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('siteVisited');

    if (hasVisited === 'true') {
        // Instant load if already visited
        document.body.classList.add('loaded');
        if (loader) loader.style.display = 'none'; // Ensure it's gone
    } else {
        // First time in session: Show Loader
        if (enterBtn && loader) {
            enterBtn.addEventListener('click', () => {
                document.body.classList.add('loaded');
                sessionStorage.setItem('siteVisited', 'true');
            });
        } else if (loader) {
            // Internal pages (if accessed directly without visiting home first): Auto remove
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                sessionStorage.setItem('siteVisited', 'true');
            }, 500);
        }
    }

    // Global Search Wire-up
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = 'modules.html';
            }
        });
    }

    // 2. Background
    const bgContainer = document.getElementById('ascension-container');
    if (bgContainer) {
        for (let i = 0; i < 12; i++) {
            const line = document.createElement('div');
            line.classList.add('ascension-line');
            line.style.left = `${Math.random() * 100}%`;
            line.style.animationDuration = `${10 + Math.random() * 20}s`;
            line.style.animationDelay = `${Math.random() * 5}s`;
            bgContainer.appendChild(line);
        }
    }

    // 3. Load Data based on Context
    // Global loaders for their specific pages
    if (document.getElementById('tracks-grid')) loadTracks();
    if (document.getElementById('modules-grid')) loadModules(); // has internal filtering
    if (document.getElementById('workshops-grid')) loadWorkshops();
    if (document.getElementById('events-grid')) loadEvents();
    if (document.getElementById('benefits-grid')) loadBenefits(); // if used

    // HOME PAGE CONTENT
    // The hero testimonial is part of loadHomeContent now or we call it if we see the element
    if (document.getElementById('home-articles-grid') || document.getElementById('hero-testimonial')) {
        loadHomeContent();
    }

    // 4. Detail View Check
    if (window.location.pathname.includes('detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const collection = params.get('collection');
        const id = params.get('id');
        const cat = params.get('cat');
        loadDetailView(collection, id, cat);
    }
});

// --- STATS COUNTER ANIMATION (Slide -> Spin -> Count) ---
function initStatsCounter() {
    // 1. Target the cards themselves for the slide-in
    const statCards = document.querySelectorAll('.tm-stat');

    // Create Spinner Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;

                // A. Trigger Slide Up
                card.classList.add('reveal-visible');

                // B. Handle Spinner & Count Logic
                const valueEl = card.querySelector('.tm-value');
                if (valueEl) {
                    // Inject Spinner dynamically if not present
                    let spinner = card.querySelector('.stat-spinner');
                    if (!spinner) {
                        spinner = document.createElement('div');
                        spinner.className = 'stat-spinner';
                        card.appendChild(spinner);
                    }

                    // 1. State: Loading
                    valueEl.classList.add('val-hidden');
                    spinner.style.display = 'block';

                    // 2. Wait (Simulate Calculation)
                    setTimeout(() => {
                        // 3. State: Reveal
                        spinner.style.display = 'none';
                        valueEl.classList.remove('val-hidden');

                        // 4. Start Counting
                        startCounting(valueEl);

                    }, 800); // 0.8s spin time
                }

                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => observer.observe(card));
}

function startCounting(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Ease out quart

        const currentVal = Math.floor(start + (target - start) * ease);
        el.innerText = currentVal + (el.getAttribute('data-suffix') || '');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.innerText = target + (el.getAttribute('data-suffix') || '');
        }
    }
    requestAnimationFrame(update);
}

// Add to Init
document.addEventListener('DOMContentLoaded', initStatsCounter);
