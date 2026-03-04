<script lang="ts">
    const STORAGE_KEY = "pt-threat-model";

    interface Asset {
        id: string;
        name: string;
        type: "asset" | "threat" | "control";
        x: number;
        y: number;
    }
    interface Connection {
        from: string;
        to: string;
        label: string;
    }
    interface SavedModel {
        date: string;
        name: string;
        assets: Asset[];
        connections: Connection[];
    }

    const assetTemplates = [
        { name: "Web Application", type: "asset" as const },
        { name: "Database", type: "asset" as const },
        { name: "API Gateway", type: "asset" as const },
        { name: "User Data", type: "asset" as const },
        { name: "Authentication System", type: "asset" as const },
        { name: "Cloud Storage", type: "asset" as const },
        { name: "SQL Injection", type: "threat" as const },
        { name: "Credential Stuffing", type: "threat" as const },
        { name: "Data Exfiltration", type: "threat" as const },
        { name: "Phishing", type: "threat" as const },
        { name: "DDoS", type: "threat" as const },
        { name: "Insider Threat", type: "threat" as const },
        { name: "Input Validation", type: "control" as const },
        { name: "MFA", type: "control" as const },
        { name: "Encryption at Rest", type: "control" as const },
        { name: "Rate Limiting", type: "control" as const },
        { name: "Network Segmentation", type: "control" as const },
        { name: "Audit Logging", type: "control" as const },
    ];

    function loadModels(): SavedModel[] {
        if (typeof localStorage === "undefined") return [];
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }
    function saveModels(m: SavedModel[]) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
    }

    let models = $state(loadModels());
    let assets = $state<Asset[]>([]);
    let connections = $state<Connection[]>([]);
    let modelName = $state("Untitled Model");
    let connectingFrom = $state<string | null>(null);
    let connectionLabel = $state("");

    function addAsset(template: {
        name: string;
        type: "asset" | "threat" | "control";
    }) {
        const id = `${template.type}-${Date.now()}`;
        const x = 50 + Math.random() * 300;
        const y = 50 + Math.random() * 200;
        assets = [
            ...assets,
            { id, name: template.name, type: template.type, x, y },
        ];
    }

    function removeAsset(id: string) {
        assets = assets.filter((a) => a.id !== id);
        connections = connections.filter((c) => c.from !== id && c.to !== id);
    }

    function startConnect(id: string) {
        if (connectingFrom === id) {
            connectingFrom = null;
            return;
        }
        if (connectingFrom) {
            const label = connectionLabel || "threatens";
            connections = [
                ...connections,
                { from: connectingFrom, to: id, label },
            ];
            connectingFrom = null;
            connectionLabel = "";
        } else {
            connectingFrom = id;
        }
    }

    function removeConnection(idx: number) {
        connections = connections.filter((_, i) => i !== idx);
    }

    function saveModel() {
        const model: SavedModel = {
            date: new Date().toISOString().slice(0, 10),
            name: modelName,
            assets: [...assets],
            connections: [...connections],
        };
        models = [model, ...models.filter((m) => m.name !== modelName)];
        saveModels(models);
    }

    function loadModel(model: SavedModel) {
        modelName = model.name;
        assets = [...model.assets];
        connections = [...model.connections];
    }

    function clearCanvas() {
        assets = [];
        connections = [];
        connectingFrom = null;
    }

    function getColor(type: string): string {
        if (type === "asset") return "#1a8fe3";
        if (type === "threat") return "#e05c20";
        return "#18c96a";
    }
</script>

<svelte:head>
    <title>Build a Threat Model — Training Labs — Progeta Technologies</title>
    <meta
        name="description"
        content="Drag assets, threats, and controls onto a canvas. Connect them to build a visual threat model for any system."
    />
</svelte:head>

<div class="game-shell">
    <a href="/resources/games" class="back-link">← BACK TO LABS</a>
    <header class="game-header">
        <span class="domain-badge">CYBERSECURITY</span>
        <h1 class="game-title">Build a Threat Model</h1>
        <p class="game-sub">
            Map what you protect, what threatens it, and what stands between.
        </p>
    </header>

    <div class="toolbar">
        <div class="tb-group">
            <span class="tb-label">ASSETS</span>
            {#each assetTemplates.filter((t) => t.type === "asset") as tmpl}
                <button class="tb-btn asset" onclick={() => addAsset(tmpl)}
                    >+ {tmpl.name}</button
                >
            {/each}
        </div>
        <div class="tb-group">
            <span class="tb-label">THREATS</span>
            {#each assetTemplates.filter((t) => t.type === "threat") as tmpl}
                <button class="tb-btn threat" onclick={() => addAsset(tmpl)}
                    >+ {tmpl.name}</button
                >
            {/each}
        </div>
        <div class="tb-group">
            <span class="tb-label">CONTROLS</span>
            {#each assetTemplates.filter((t) => t.type === "control") as tmpl}
                <button class="tb-btn control" onclick={() => addAsset(tmpl)}
                    >+ {tmpl.name}</button
                >
            {/each}
        </div>
    </div>

    {#if connectingFrom}
        <div class="connect-notice">
            <span
                >CONNECTING FROM: {assets.find((a) => a.id === connectingFrom)
                    ?.name} → Click another node to connect</span
            >
            <input
                class="connect-label"
                type="text"
                placeholder="Connection label..."
                bind:value={connectionLabel}
            />
        </div>
    {/if}

    <!-- Canvas -->
    <div class="canvas">
        {#if assets.length === 0}
            <p class="canvas-empty">
                Click assets, threats, or controls above to add them to your
                model.
            </p>
        {/if}
        {#each assets as asset}
            <div
                class="node"
                style="left: {asset.x}px; top: {asset.y}px; --nc: {getColor(
                    asset.type,
                )}"
            >
                <span class="node-type">{asset.type.toUpperCase()}</span>
                <span class="node-name">{asset.name}</span>
                <div class="node-actions">
                    <button
                        class="node-act"
                        onclick={() => startConnect(asset.id)}
                        >{connectingFrom === asset.id ? "✗" : "⤯"}</button
                    >
                    <button
                        class="node-act del"
                        onclick={() => removeAsset(asset.id)}>×</button
                    >
                </div>
            </div>
        {/each}
    </div>

    <!-- Connections list -->
    {#if connections.length > 0}
        <div class="conn-list">
            <span class="conn-label">CONNECTIONS</span>
            {#each connections as conn, i}
                <div class="conn-row">
                    <span class="conn-text"
                        >{assets.find((a) => a.id === conn.from)?.name} →
                        <em>{conn.label}</em>
                        → {assets.find((a) => a.id === conn.to)?.name}</span
                    >
                    <button class="conn-del" onclick={() => removeConnection(i)}
                        >×</button
                    >
                </div>
            {/each}
        </div>
    {/if}

    <!-- Save/Load -->
    <div class="save-row">
        <input
            class="model-name"
            type="text"
            bind:value={modelName}
            placeholder="Model name..."
        />
        <button class="save-btn" onclick={saveModel}>SAVE MODEL</button>
        <button class="clear-btn" onclick={clearCanvas}>CLEAR</button>
    </div>

    {#if models.length > 0}
        <div class="models-list">
            <span class="models-label">SAVED MODELS</span>
            {#each models as model}
                <button class="model-btn" onclick={() => loadModel(model)}
                    >{model.name} — {model.date} ({model.assets.length} nodes)</button
                >
            {/each}
        </div>
    {/if}
</div>

<style>
    .game-shell {
        max-width: 900px;
        margin: 0 auto;
        padding: clamp(100px, 14vw, 140px) clamp(20px, 4vw, 40px) 80px;
        min-height: 100vh;
        background: #020408;
    }
    .back-link {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 32px;
        transition: color 0.2s;
    }
    .back-link:hover {
        color: #8890bb;
    }
    .game-header {
        margin-bottom: 24px;
    }
    .domain-badge {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #e05c20;
        border: 1px solid #e05c20;
        padding: 3px 10px;
        border-radius: 2px;
        display: inline-block;
        margin-bottom: 12px;
    }
    .game-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: clamp(32px, 5vw, 44px);
        color: #edf0ff;
        line-height: 1;
        margin: 0 0 8px 0;
    }
    .game-sub {
        font-family: "DM Sans", sans-serif;
        font-weight: 300;
        font-size: 14px;
        color: #424870;
        margin: 0;
        font-style: italic;
    }

    .toolbar {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
    }
    .tb-group {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
    }
    .tb-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: #424870;
        min-width: 70px;
    }
    .tb-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.06em;
        padding: 4px 8px;
        border-radius: 2px;
        cursor: pointer;
        background: #07090f;
        border: 1px solid #0f1220;
        transition: border-color 0.2s;
    }
    .tb-btn.asset {
        color: #1a8fe3;
    }
    .tb-btn.threat {
        color: #e05c20;
    }
    .tb-btn.control {
        color: #18c96a;
    }
    .tb-btn:hover {
        border-color: #424870;
    }

    .connect-notice {
        background: rgba(26, 143, 227, 0.08);
        border: 1px solid #1a8fe3;
        padding: 10px 14px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }
    .connect-notice span {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #1a8fe3;
    }
    .connect-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        background: #03040a;
        border: 1px solid #0f1220;
        color: #8890bb;
        padding: 4px 8px;
        outline: none;
    }

    .canvas {
        position: relative;
        min-height: 350px;
        background: #03040a;
        border: 1px solid #0f1220;
        margin-bottom: 16px;
        overflow: hidden;
    }
    .canvas-empty {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #424870;
        text-align: center;
        padding: 100px 20px;
        margin: 0;
    }

    .node {
        position: absolute;
        background: #07090f;
        border: 1px solid var(--nc);
        padding: 8px 12px;
        border-radius: 3px;
        min-width: 100px;
    }
    .node-type {
        font-family: "DM Mono", monospace;
        font-size: 8px;
        letter-spacing: 0.12em;
        color: var(--nc);
        display: block;
        opacity: 0.7;
    }
    .node-name {
        font-family: "DM Sans", sans-serif;
        font-size: 12px;
        color: #edf0ff;
        display: block;
        margin: 2px 0;
    }
    .node-actions {
        display: flex;
        gap: 6px;
        margin-top: 4px;
    }
    .node-act {
        font-family: "DM Mono", monospace;
        font-size: 12px;
        color: #424870;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
    .node-act.del {
        color: #e05c20;
    }

    .conn-list {
        margin-bottom: 16px;
    }
    .conn-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .conn-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        border-bottom: 1px solid #0f1220;
    }
    .conn-text {
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        color: #8890bb;
    }
    .conn-text em {
        color: #edf0ff;
        font-style: normal;
    }
    .conn-del {
        font-family: "DM Mono", monospace;
        font-size: 14px;
        color: #e05c20;
        background: none;
        border: none;
        cursor: pointer;
    }

    .save-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    .model-name {
        font-family: "DM Mono", monospace;
        font-size: 12px;
        background: #07090f;
        border: 1px solid #0f1220;
        color: #edf0ff;
        padding: 8px 12px;
        outline: none;
        flex: 1;
        min-width: 150px;
    }
    .save-btn,
    .clear-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        padding: 8px 14px;
        border-radius: 2px;
        cursor: pointer;
        background: transparent;
    }
    .save-btn {
        color: #18c96a;
        border: 1px solid #18c96a;
    }
    .clear-btn {
        color: #424870;
        border: 1px solid #0f1220;
    }

    .models-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .models-label {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #424870;
        display: block;
        margin-bottom: 8px;
    }
    .model-btn {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #8890bb;
        background: #07090f;
        border: 1px solid #0f1220;
        padding: 8px 12px;
        cursor: pointer;
        text-align: left;
        border-radius: 2px;
    }
    .model-btn:hover {
        border-color: #424870;
    }
</style>
