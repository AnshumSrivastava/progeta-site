<script>
    import { onMount } from 'svelte';
    
    let text = "";
    const commands = [
        "> CONNECTING TO TARGET...",
        "> 10.10.23.44 [OPEN]",
        "> EXPLOIT: MS17-010",
        "> PAYLOAD: REVERSE_TCP",
        "> SESSION 1 OPENED",
        "> SYSTEM ACCESS GRANTED"
    ];
    
    onMount(() => {
        let lineIdx = 0;
        let charIdx = 0;
        
        const type = () => {
            if (lineIdx >= commands.length) {
                lineIdx = 0;
                text = "";
            }
            
            const currentLine = commands[lineIdx];
            
            if (charIdx < currentLine.length) {
                text += currentLine[charIdx];
                charIdx++;
                setTimeout(type, 50 + Math.random() * 50);
            } else {
                text += "\n";
                lineIdx++;
                charIdx = 0;
                setTimeout(type, 800);
            }
        };
        
        type();
    });
</script>

<div class="terminal-view">
    <pre>{text}<span class="blink">_</span></pre>
</div>

<style>
    .terminal-view {
        background: rgba(0,0,0,0.3);
        padding: 1rem;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        color: #00ff41;
        height: 100%;
        overflow: hidden;
        width: 100%;
        border: 1px solid rgba(0, 255, 65, 0.2);
    }
    
    pre {
        white-space: pre-wrap;
        margin: 0;
    }
    
    .blink {
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink { 50% { opacity: 0; } }
</style>
