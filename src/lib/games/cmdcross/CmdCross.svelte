<script lang="ts">
    import { LEVELS } from './levels';
    import { onMount, tick } from 'svelte';
    import { fly, fade, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    // --- DOCS ---
    const COMMAND_DOCS = {
        'cd': { 
            syntax: 'cd [dir] or [path]', 
            desc: 'Change Directory. Support stacked paths.',
            ex: 'cd right/right/down' 
        },
        'ls': { 
            syntax: 'ls', 
            desc: 'List Segments. Scans the current grid for visible nodes.', 
            ex: 'ls' 
        },
        'mv': { 
            syntax: 'mv [id] [dir]', 
            desc: 'Move Entity. Relocates a mutable object (Box/File).', 
            ex: 'mv cache_file down' 
        },
        'rm': { 
            syntax: 'rm [id]', 
            desc: 'Remove. Permanently deletes an object from the filesystem.', 
            ex: 'rm virus_v1' 
        },
        'chmod': { 
            syntax: 'chmod [777] [id]', 
            desc: 'Change Mode. Unlocks encryption on secure nodes.', 
            ex: 'chmod 777 secure_door' 
        },
        'sudo': { 
            syntax: 'sudo [cmd]', 
            desc: 'SuperUser Do. Executes command with elevated privileges.', 
            ex: 'sudo rm firewall' 
        }
    };

    // --- STATE ---
    let currentLevelIdx = 0;
    $: currentLevel = LEVELS[currentLevelIdx];
    
    // Game State
    let entities = [];
    let terminalHistory = [
        { type: 'system', text: 'CmdHero v1.0.0' },
        { type: 'system', text: 'Type "help" for docs.' }
    ];
    let showWin = false;
    let showHelp = false;
    let commandInput = "";

    // Boot State
    let booting = true;
    let bootLogs = [];
    
    // Stats
    let xp = 0;
    let maxLevelReached = 0;
    let levelScore = 0;

    // Refs
    let terminalEndRef;
    let inputRef;

    function toggleHelp() {
        showHelp = !showHelp;
    }

    // --- INIT ---
    onMount(async () => {
        // Load Save
        const savedXp = localStorage.getItem('cmdHero_xp');
        if (savedXp) xp = parseInt(savedXp);
        
        const savedLvl = localStorage.getItem('cmdHero_level');
        if (savedLvl) {
            maxLevelReached = parseInt(savedLvl);
            currentLevelIdx = Math.min(maxLevelReached, LEVELS.length - 1);
        }

        // Simulate Boot
        const logs = [
            `USER_PROFILE: LOADED (XP: ${xp})`,
            "INITIALIZING KERNEL...",
            "LOADING MODULES [OK]",
            "MOUNTING FILESYSTEM...",
            "DECRYPTING SECURE CHANNEL...",
            "ESTABLISHING UPLINK..."
        ];
        
        for (let log of logs) {
            bootLogs = [...bootLogs, log];
            await new Promise(r => setTimeout(r, 400));
        }
        await new Promise(r => setTimeout(r, 800));
        booting = false;
        
        if(inputRef) inputRef.focus();
    });

    function saveProgress() {
        localStorage.setItem('cmdHero_xp', xp.toString());
        localStorage.setItem('cmdHero_level', currentLevelIdx.toString());
    }

    // --- INIT ---
    $: if (currentLevel) {
        // Deep copy entities to avoid mutating source
        entities = JSON.parse(JSON.stringify(currentLevel.entities));
        showWin = false;
        // Start Score = Max Reward
        levelScore = currentLevel.xpReward || 500;
        log(`Loaded ${currentLevel.name}: ${currentLevel.objective}`, 'info');
    }

    // --- ENGINE ---
    function getEntityMap() {
        // Map r,c to entity for collision
        let map = {};
        entities.forEach(e => {
            map[`${e.r},${e.c}`] = e;
        });
        return map;
    }

    function log(text, type='output') {
        terminalHistory = [...terminalHistory, { type, text }];
        tick().then(() => {
             if(terminalEndRef) terminalEndRef.scrollIntoView({ behavior: 'smooth' });
        });
    }

    function handleCommand(e) {
        if (e.key === 'Enter') {
            const cmdRaw = commandInput.trim();
            commandInput = "";
            if (!cmdRaw) return;

            log(`> ${cmdRaw}`, 'input');
            execute(cmdRaw);
        }
    }

    async function execute(cmdStr) {
        let parts = cmdStr.trim().split(' ');
        let cmd = parts[0].toLowerCase();
        
        // SUDO Logic
        let isSudo = false;
        if (cmd === 'sudo') {
            if (!currentLevel.allowedCommands.includes('sudo')) {
                log("User is not in the sudoers file. This incident will be reported.", "error");
                return;
            }
            isSudo = true;
            parts.shift(); // Remove sudo
            if (parts.length === 0) { log("usage: sudo command", "info"); return; }
            cmd = parts[0].toLowerCase();
        }

        const args = parts.slice(1);

        // --- GLOBAL CHECKS ---
        if (cmd === 'help') {
             log("Opening Manual Pages...", 'info');
             showHelp = true;
             return;
        }

        if (cmd === 'man') {
            if (!args[0]) { log("What manual page do you want?", "info"); return; }
            showManPage(args[0]);
            return;
        }

        if (!currentLevel.allowedCommands.includes(cmd) && cmd !== 'reset' && cmd !== 'clear') {
            log(`bash: ${cmd}: command not found (or permission denied)`, 'error');
            return;
        }

        // --- COMMANDS ---

        if (cmd === 'ls') {
            log("drwxr-xr-x  2 user user 4096 .", 'info');
            log(`-rw-r--r--  1 user user  ${entities.length} metadata`, 'info');
            entities.forEach(e => {
                if (e.type !== 'wall') {
                     // Pad ID for alignment
                     const idStr = e.id.padEnd(12);
                     log(`  ${idStr} [${e.type}] (${e.c},${e.r}) - ${e.description}`, 'info');
                }
            });
            return;
        }

        if (cmd === 'clear') {
            terminalHistory = [];
            return;
        }

        if (cmd === 'reset') {
            entities = JSON.parse(JSON.stringify(currentLevel.entities));
            levelScore = currentLevel.xpReward || 500; // Reset Score
            log("System Reset.", 'info');
            return;
        }

        // CD (Change Directory) -> Player Move (Stacked + Smart)
        if (cmd === 'cd') {
            let rawPath = args[0];
            if (!rawPath) { log("usage: cd [path] or [id]", 'error'); return; }
            
            // SMART CD: Check if arg is an Entity ID
            const targetEntity = entities.find(e => e.id.toLowerCase() === rawPath.toLowerCase());
            if (targetEntity) {
                // Determine path to entity
                const player = entities.find(e => e.type === 'player');
                let newPath = "";
                
                if (targetEntity.r === player.r) {
                    // Horizontal
                    const dist = targetEntity.c - player.c;
                    const dir = dist > 0 ? 'right' : 'left';
                    const steps = Math.abs(dist);
                    newPath = Array(steps).fill(dir).join('/');
                } else if (targetEntity.c === player.c) {
                    // Vertical
                    const dist = targetEntity.r - player.r;
                    const dir = dist > 0 ? 'down' : 'up';
                    const steps = Math.abs(dist);
                    newPath = Array(steps).fill(dir).join('/');
                } else {
                    log(`cd: No direct route to '${targetEntity.id}'. Use manual navigation.`, 'error');
                    return;
                }
                
                log(`Resolving path to ${targetEntity.id}...`, 'info');
                rawPath = newPath; 
                // Fallthrough to standard path processing
            }
            
            // Split path into segments
            const steps = rawPath.split('/').filter(s => s.length > 0);
            
            for (let step of steps) {
                let dir = step.toLowerCase();
                let moveDir = null;
                
                if (['..', 'up', 'north'].includes(dir)) moveDir = 'up';
                else if (['down', 'south'].includes(dir)) moveDir = 'down';
                else if (['left', 'west'].includes(dir)) moveDir = 'left';
                else if (['right', 'east'].includes(dir)) moveDir = 'right';
                else if (dir === '.') continue; 
                else {
                    log(`bash: cd: ${dir}: No such file or directory`, 'error');
                    break;
                }

                if (moveDir) {
                    const success = moveEntity('player', moveDir);
                    if (!success) {
                        log(`bash: cd: ${moveDir}: Blocked or Permission Denied`, 'error');
                        break;
                    }
                    // Wait for animation before next step
                    if (steps.length > 1) await new Promise(r => setTimeout(r, 250));
                    levelScore -= 2; // Cost: 2
                }
            }
            return;
        }

        // MV (Move) -> Object Move
        if (cmd === 'mv') {
            const targetId = args[0];
            const rawPath = args[1];
            if (!targetId || !rawPath) { log("usage: mv [source] [path]", 'error'); return; }
            
            // Validate Source
            const target = entities.find(e => e.id === targetId);
            if (!target) { log(`mv: cannot stat '${targetId}': No such file or directory`, 'error'); return; }
            if (target.type === 'player') { log("mv: cannot move user context (use cd)", 'error'); return; }
            if (target.type === 'wall' || target.type === 'goal') { log(`mv: cannot move '${targetId}': Permission denied`, 'error'); return; }
            
            // Pathing for MV
            const steps = rawPath.split('/').filter(s => s.length > 0);
            
            for (let step of steps) {
                 let dir = step.toLowerCase();
                 let moveDir = null;

                 if (['up', 'north'].includes(dir)) moveDir = 'up';
                 else if (['down', 'south'].includes(dir)) moveDir = 'down';
                 else if (['left', 'west'].includes(dir)) moveDir = 'left';
                 else if (['right', 'east'].includes(dir)) moveDir = 'right';
                 else {
                     log(`mv: invalid direction '${dir}'`, 'error');
                     break;
                 }
                 
                 const success = moveEntity(target.id, moveDir);
                 if (!success) {
                     log(`mv: failed to move '${targetId}' ${moveDir}`, 'error');
                     break;
                 }
                 levelScore -= 2; // Cost: 2
                 if (steps.length > 1) await new Promise(r => setTimeout(r, 250));
            }
            return;
        }

        // RM (Remove) -> Destroy
        if (cmd === 'rm') {
            const targetId = args[0];
            if (!targetId) { log("usage: rm [file]", 'error'); return; }
            
            const idx = entities.findIndex(e => e.id === targetId);
            if (idx === -1) { log(`rm: cannot remove '${targetId}': No such file or directory`, 'error'); return; }
            const target = entities[idx];
            
            // Protected Types
            if (target.type === 'player' || target.type === 'wall' || target.type === 'goal') { 
                log(`rm: cannot remove '${targetId}': Operation not permitted`, 'error'); 
                return; 
            }
            
            if (target.type === 'key') {
                log(`rm: cannot remove '${targetId}': Permission denied. Encrypted asset. Try 'chmod'.`, 'error');
                return;
            }
            
            // Sudo Requirement for Level 5+
             if (target.type === 'enemy' && !isSudo && currentLevel.allowedCommands.includes('sudo')) {
                log(`rm: cannot remove '${targetId}': Permission denied (Are you root?)`, 'error');
                return;
            }

            entities.splice(idx, 1);
            entities = [...entities];
            log(`removed '${targetId}'`, 'success');
            levelScore += 10; // Reward: +10 for cleaning
            return;
        }

        // CHMOD (Change Mode) -> Unlock
        if (cmd === 'chmod') {
            const mode = args[0];
            const targetId = args[1];
            if (!mode || !targetId) { log("usage: chmod [mode] [file]", 'error'); return; }
            
            const target = entities.find(e => e.id === targetId);
            if (!target) { log(`chmod: cannot access '${targetId}': No such file or directory`, 'error'); return; }
            
            if (target.type === 'key') {
                if (mode === '777' || mode === '+x') {
                    // Unlock: Change to 'unlocked' (walkable, removable)
                    target.type = 'unlocked';
                    target.symbol = '🔓';
                    target.color = '#4ade80'; // Green
                    log(`changed mode of '${targetId}' to ${mode}`, 'success');
                    entities = [...entities];
                } else {
                    log(`chmod: mode '${mode}' not effective`, 'info');
                }
            } else {
                if (target.type === 'unlocked') {
                    log(`chmod: '${targetId}' is already fully accessible (777).`, 'success');
                } else {
                    log(`chmod: '${targetId}' is not a secure asset`, 'info');
                }
            }
            return;
        }

        log(`bash: ${cmd}: command not found`, 'error');
    }
    
    function showManPage(cmd) {
         if(cmd === 'cd') log("cd - change directory (move player)", 'info');
         else if(cmd === 'mv') log("mv - move file (move object)", 'info');
         else if(cmd === 'rm') log("rm - remove file (destroy object)", 'info');
         else if(cmd === 'chmod') log("chmod - change file mode bits (unlock)", 'info');
         else log(`No manual entry for ${cmd}`, 'error');
    }


    function moveEntity(id, dirStr) {
        const idx = entities.findIndex(e => e.id === id);
        if (idx === -1) return false;
        const e = entities[idx];

        let dr = 0, dc = 0;
        const d = dirStr.toLowerCase();
        if (d === 'up' || d === 'north') dr = -1;
        else if (d === 'down' || d === 'south') dr = 1;
        else if (d === 'left' || d === 'west') dc = -1;
        else if (d === 'right' || d === 'east') dc = 1;
        else { log("Invalid direction.", 'error'); return false; }

        const nr = e.r + dr;
        const nc = e.c + dc;

        // BOUNDS CHECK
        if (nr < 0 || nr >= currentLevel.gridSize || nc < 0 || nc >= currentLevel.gridSize) {
            log("Error: Out of bounds.", 'error');
            return false;
        }

        // COLLISION CHECK
        const map = getEntityMap();
        const blocker = map[`${nr},${nc}`];
        if (blocker) {
            // WIN CONDITION (Player -> Goal)
            if (blocker.type === 'goal' && e.type === 'player') {
                 // Proceed to move, checkWinCondition will catch it.
            } 
            // DEATH (Player -> Enemy)
            else if (blocker.type === 'enemy' && e.type === 'player') {
                log("FATAL ERROR: Process was killed by " + blocker.id, 'error');
                // Optional: Just reset immediately or show modal
                setTimeout(() => {
                     entities = JSON.parse(JSON.stringify(currentLevel.entities));
                     log("System Rebooted.", 'info');
                }, 1000);
                return false;
            }
            // BLOCKERS
            else if (['wall', 'box', 'key', 'enemy'].includes(blocker.type)) {
                 // Silent fail for smart path? Or log?
                 // log(`Error: Path blocked by ${blocker.id}`, 'error');
                 return false;
            }
            // 'unlocked' type is walkable, falls through.
        }

        // EXECUTE MOVE
        entities[idx].r = nr;
        entities[idx].c = nc;
        entities = [...entities]; // Update Svelte
        log(`${id} moved ${d}.`, 'success');
        
        checkWinCondition();
        return true;
    }

    function checkWinCondition() {
        const player = entities.find(e => e.type === 'player');
        const goals = entities.filter(e => e.type === 'goal');
        
        // Find if player is on ANY goal
        const met = goals.some(g => g.r === player.r && g.c === player.c);
        
        if (met && !showWin) {
            showWin = true;
            // Award XP (One time per level session? Simplified for now)
            const reward = currentLevel.xpReward || 100;
            xp += reward;
            log(`SUCCESS: TARGET REACHED. +${reward} XP`, 'success');
            saveProgress();
        }
    }
    
    function nextLevel() {
         if (currentLevelIdx < LEVELS.length - 1) {
            currentLevelIdx++;
        } else {
            alert(`ALL MISSIONS COMPLETE. FINAL XP: ${xp}`);
        }
    }
    


</script>

<div class="cmd-hero-app">
    <!-- VISUAL LAYER (Left) -->
    <div class="visual-stage">
        {#if booting}
            <div class="boot-screen" transition:fade={{duration: 500}}>
                <div class="boot-content">
                    <div class="boot-logo">_PROGETA_OS v4.2</div>
                    <div class="boot-logs">
                        {#each bootLogs as log}
                            <div class="log-line">> {log}</div>
                        {/each}
                        <div class="cursor-blink">_</div>
                    </div>
                    <div class="boot-progress">
                        <div class="bar-fill"></div>
                    </div>
                </div>
            </div>
        {/if}

        <div class="header-overlay">
            <div class="header-top">
                <div>
                    <h2>{currentLevel.name}</h2>
                    <div class="objective">{currentLevel.desc}</div>
                </div>
            </div>
            
            <div class="binaries">
                <span class="bin-label">PATH:</span>
                {#each currentLevel.allowedCommands as cmd}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="bin-tag" on:click={() => { commandInput = cmd + " "; inputRef.focus(); }}>{cmd}</span>
                {/each}
            </div>
        </div>
        
        <div class="game-grid" style="--grid-size: {currentLevel.gridSize}">
            <!-- Background Grid Lines -->
            {#each Array(currentLevel.gridSize * currentLevel.gridSize) as _, i}
                <div class="grid-cell"></div>
            {/each}

            <!-- Entities -->
            {#each entities as e (e.id)}
                <div 
                    class="entity {e.type}"
                    style="
                        --r: {e.r}; --c: {e.c};
                        --color: {e.color || '#fff'};
                    "
                    in:scale
                    animate:fly={{duration: 200}}
                >
                    <div class="entity-content" style="color: var(--color)">
                        {e.symbol}
                    </div>
                    {#if e.type !== 'wall'}
                        <div class="entity-label">{e.id}</div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <!-- SIDEBAR (Right) -->
    <div class="sidebar">
        <!-- TERMINAL -->
        <div class="terminal-stage" on:click={() => inputRef.focus()}>
            <div class="panel-header">TERMINAL_EMULATOR</div>
            <div class="terminal-history">
                {#each terminalHistory as line}
                    <div class="term-line {line.type}">
                        {line.text}
                    </div>
                {/each}
                <div bind:this={terminalEndRef}></div>
            </div>
            <div class="input-line">
                <span class="prompt">admin@hero:~$</span>
                <input 
                    bind:this={inputRef}
                    type="text" 
                    bind:value={commandInput} 
                    on:keydown={handleCommand}
                    spellcheck="false"
                    autocomplete="off"
                />
            </div>
        </div>

        <!-- MANUAL (Always Visible) -->
        <div class="manual-panel">
            <div class="panel-header">
                <span>MANUAL_PAGES</span>
                <div style="display: flex; gap: 1rem;">
                    <span class="xp-badge">SCORE: {levelScore}</span>
                    <span class="xp-badge" style="color: #fbbf24;">XP: {xp}</span>
                </div>
            </div>
            <div class="manual-content">
                {#each currentLevel.allowedCommands as cmd}
                    {#if COMMAND_DOCS[cmd]}
                        <div class="doc-item">
                            <div class="doc-title">
                                <span class="cmd-name">{cmd}</span>
                                <span class="cmd-syntax">{COMMAND_DOCS[cmd].syntax}</span>
                            </div>
                            <div class="doc-desc">{COMMAND_DOCS[cmd].desc}</div>
                            <div class="doc-ex">Ex: {COMMAND_DOCS[cmd].ex}</div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>

    {#if showWin}
        <div class="modal">
             <div class="modal-card">
                 <h1>MISSION COMPLETE</h1>
                 <button on:click={nextLevel}>EXECUTE NEXT SEQUENCE</button>
             </div>
        </div>
    {/if}
</div>

<style>
    :root {
        --bg-viz: #111;
        --bg-term: #050505;
        --bg-panel: #0a0a0c;
        --accent: #10b981;
        --border: 1px solid #222;
    }

    .cmd-hero-app {
        display: flex; flex-direction: row; height: 100vh;
        background: var(--bg-viz); font-family: 'JetBrains Mono', monospace;
        color: white; overflow: hidden;
    }

    /* VISUAL STAGE */
    .visual-stage {
        flex: 2;
        display: flex; flex-direction: column; 
        position: relative;
        background: radial-gradient(circle at center, #222 0%, #000 100%);
        border-right: var(--border);
        overflow: hidden; /* Ensure entities don't fly out */
    }
    
    .header-overlay {
        position: absolute; top: 2rem; left: 2rem; right: 2rem;
        z-index: 10; pointer-events: none;
    }
    .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; pointer-events: auto; }
    .header-overlay h2 { margin: 0; font-size: 2.5rem; opacity: 0.2; font-weight: 800; letter-spacing: -1px; }
    .objective { color: var(--accent); opacity: 0.8; font-size: 1rem; margin-bottom: 0.5rem; }
    
    .binaries { display: flex; gap: 0.5rem; align-items: center; pointer-events: auto; margin-top: 1rem; }
    .bin-label { font-size: 0.7rem; color: #666; font-weight: bold; }
    .bin-tag { 
        font-size: 0.75rem; 
        background: rgba(255,255,255,0.1); 
        padding: 4px 8px; 
        border-radius: 4px; 
        color: var(--accent);
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s;
    }
    .bin-tag:hover { background: rgba(255,255,255,0.2); border-color: var(--accent); }

    /* GRID */
    .game-grid {
        display: grid;
        grid-template-columns: repeat(var(--grid-size), 1fr);
        grid-template-rows: repeat(var(--grid-size), 1fr);
        width: 100%; height: 100%;
        position: relative;
        background: rgba(0,0,0,0.3);
    }
    .grid-cell { border: 1px solid rgba(255,255,255,0.03); }

    /* SIDEBAR */
    .sidebar {
        flex: 1; min-width: 400px; max-width: 500px;
        display: flex; flex-direction: column;
        border-left: var(--border); background: var(--bg-panel);
    }
    
    .panel-header {
        padding: 8px 16px; background: #030303; border-bottom: var(--border);
        font-size: 0.7rem; color: #555; font-weight: bold; letter-spacing: 1px;
        display: flex; justify-content: space-between; align-items: center;
    }
    .xp-badge { color: var(--accent); }

    /* TERMINAL */
    .terminal-stage {
        flex: 3;
        background: var(--bg-term); 
        display: flex; flex-direction: column;
        overflow: hidden;
    }
    .terminal-history { flex: 1; overflow-y: auto; padding: 1rem; scroll-behavior: smooth; }
    .term-line { margin-bottom: 4px; opacity: 0.9; font-size: 0.9rem; line-height: 1.4; word-break: break-all; }
    .term-line.error { color: #f87171; }
    .term-line.success { color: #4ade80; }
    .term-line.info { color: #60a5fa; }
    .term-line.input { color: #666; margin-top: 8px; }

    .input-line { 
        display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; color: #fff; 
        padding: 1rem; border-top: var(--border); background: #080808;
    }
    .prompt { color: var(--accent); font-weight: bold; }
    input {
        background: transparent; border: none; outline: none; color: white; flex: 1;
        font-family: inherit; font-size: inherit;
    }

    /* MANUAL */
    .manual-panel {
        flex: 2; border-top: var(--border);
        background: #0e0e10;
        display: flex; flex-direction: column;
        overflow: hidden;
    }
    .manual-content { flex: 1; overflow-y: auto; padding: 1rem; }
    
    .doc-item { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px dashed #222; }
    .doc-item:last-child { border-bottom: none; }
    
    .doc-title { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; }
    .cmd-name { color: #fff; font-weight: bold; font-size: 1rem; }
    .cmd-syntax { color: #777; font-size: 0.75rem; }
    .doc-desc { color: #aaa; margin-bottom: 4px; line-height: 1.3; font-size: 0.85rem; }
    .doc-ex { color: #444; font-style: italic; font-size: 0.8rem; }

    /* ENTITIES */
    .entity {
        position: absolute;
        width: calc(100% / var(--grid-size));
        height: calc(100% / var(--grid-size));
        top: calc(var(--r) * (100% / var(--grid-size)));
        left: calc(var(--c) * (100% / var(--grid-size)));
        display: flex; justify-content: center; align-items: center;
        transition: top 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        z-index: 2;
    }

    /* WALL STYLING */
    .entity.wall {
        background: #0a0a0a;
        border: 1px solid #141414;
        z-index: 1; 
    }
    .entity.wall .entity-content, 
    .entity.wall .entity-label {
        display: none;
    }
    
    /* GOAL STYLING */
    .entity.goal {
        background: rgba(74, 222, 128, 0.25);
        border: 1px solid rgba(74, 222, 128, 0.4);
        box-shadow: inset 0 0 30px rgba(74, 222, 128, 0.1);
    }
    .entity.goal .entity-content, 
    .entity.goal .entity-label {
        display: none;
    }
    
    .entity-content {
        font-size: 2rem; font-weight: bold;
        text-shadow: 0 0 10px currentColor;
    }
    
    .entity-label {
        position: absolute; bottom: 2px;
        font-size: 0.5rem; opacity: 0.5; color: white;
        text-transform: uppercase; letter-spacing: 1px;
        pointer-events: none;
    }
    
    .entity.player .entity-content { animation: pulse 2s infinite; }
    @keyframes pulse { 0% { opacity: 0.8; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.8; transform: scale(0.9); } }
    
    /* BOOT */
    .boot-screen {
        position: fixed; inset: 0; z-index: 1000;
        background: #000; color: var(--accent);
        display: flex; justify-content: center; align-items: center;
        font-family: var(--font-mono); font-size: 0.9rem;
    }
    .boot-content { width: 300px; }
    .boot-logo { font-weight: 800; margin-bottom: 2rem; letter-spacing: 2px; text-shadow: 0 0 10px var(--accent); }
    .boot-logs { margin-bottom: 2rem; color: #4ade80; opacity: 0.8; height: 150px; }
    .log-line { margin-bottom: 4px; }
    .boot-progress { height: 2px; background: #333; width: 100%; position: relative; overflow: hidden; }
    .bar-fill {
        position: absolute; top: 0; left: 0; height: 100%; background: var(--accent);
        width: 100%; animation: loadBar 2s ease-in-out;
    }
    @keyframes loadBar { from { width: 0%; } to { width: 100%; } }

     /* MODAL */
    .modal {
        position: fixed; inset: 0; background: rgba(0,0,0,0.8);
        display: flex; justify-content: center; align-items: center; z-index: 100;
        backdrop-filter: blur(5px);
    }
    .modal-card {
        background: #111; border: 1px solid var(--accent); padding: 2rem;
        text-align: center; box-shadow: 0 0 50px rgba(16, 185, 129, 0.2);
    }
    .modal-card h1 { color: var(--accent); margin-bottom: 2rem; }
    button {
        background: var(--accent); border: none; padding: 1rem 2rem; font-family: inherit;
        font-weight: bold; cursor: pointer; color: black;
    }
</style>
