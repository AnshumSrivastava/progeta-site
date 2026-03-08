<script lang="ts">
    import { Store } from "./store";

    interface Props {
        onComplete: (data: {
            score: number;
            total: number;
            badgeId?: string | null;
            statLine: string;
        }) => void;
    }
    let { onComplete }: Props = $props();

    const SLUG = "build-threat-model";
    interface Node {
        id: string;
        x: number;
        y: number;
        label: string;
        type: "asset" | "threat" | "control";
    }
    interface Connection {
        from: string;
        to: string;
        label: string;
    }

    let nodes = $state<Node[]>([]);
    let connections = $state<Connection[]>([]);
    let nodeCtr = $state(0);
    let addMode = $state<"asset" | "threat" | "control" | null>(null);
    let connectMode = $state(false);
    let connectFrom = $state<string | null>(null);
    let selectedNode = $state<string | null>(null);
    let editLabel = $state("");
    let connLabel = $state("");
    let modelName = $state("");
    let canvasEl: HTMLDivElement | undefined = $state();

    function handleCanvasClick(e: MouseEvent) {
        if (!addMode || !canvasEl) return;
        const rect = canvasEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = `node-${nodeCtr++}`;
        nodes = [
            ...nodes,
            {
                id,
                x,
                y,
                label: `${addMode.charAt(0).toUpperCase() + addMode.slice(1)} ${nodeCtr}`,
                type: addMode,
            },
        ];
        addMode = null;
    }

    function handleNodeClick(id: string) {
        if (connectMode) {
            if (!connectFrom) {
                connectFrom = id;
            } else if (connectFrom !== id) {
                connections = [
                    ...connections,
                    {
                        from: connectFrom,
                        to: id,
                        label: connLabel || "relates to",
                    },
                ];
                connectFrom = null;
                connectMode = false;
                connLabel = "";
            }
        } else {
            selectedNode = selectedNode === id ? null : id;
            const node = nodes.find((n) => n.id === id);
            if (node) editLabel = node.label;
        }
    }

    function updateLabel() {
        if (!selectedNode) return;
        nodes = nodes.map((n) =>
            n.id === selectedNode ? { ...n, label: editLabel } : n,
        );
        selectedNode = null;
    }

    function deleteNode(id: string) {
        nodes = nodes.filter((n) => n.id !== id);
        connections = connections.filter((c) => c.from !== id && c.to !== id);
        selectedNode = null;
    }

    function handleSave() {
        const data = Store.get(SLUG);
        const models = data.models || [];
        models.unshift({
            name: modelName || `Model ${models.length + 1}`,
            date: new Date().toISOString().slice(0, 10),
            nodes: [...nodes],
            connections: [...connections],
        });
        Store.set(SLUG, { models: models.slice(0, 10) });

        let badge: string | null = null;
        if (Store.addBadge(SLUG, "model-first")) badge = "model-first";
        if (models.length >= 3 && Store.addBadge(SLUG, "model-three"))
            badge = "model-three";

        onComplete({
            score: nodes.length,
            total: nodes.length,
            badgeId: badge,
            statLine: `${nodes.length} NODES · ${connections.length} CONNECTIONS · ${modelName || "Untitled"}`,
        });
    }

    function getNodeColor(type: string) {
        return type === "asset"
            ? "#1A8FE3"
            : type === "threat"
              ? "#E05C20"
              : "#18C96A";
    }
</script>

<div class="screen-build">
    <span class="sq-eyebrow">THREAT MODELLING WORKSPACE</span>

    <input
        class="model-name"
        type="text"
        placeholder="Name your model..."
        bind:value={modelName}
    />

    <!-- Toolbar -->
    <div class="tm-toolbar">
        <button
            class="tm-btn"
            class:active={addMode === "asset"}
            onclick={() => {
                addMode = addMode === "asset" ? null : "asset";
                connectMode = false;
            }}
        >
            <span class="tm-dot" style="background: #1A8FE3;"></span> ADD ASSET
        </button>
        <button
            class="tm-btn"
            class:active={addMode === "threat"}
            onclick={() => {
                addMode = addMode === "threat" ? null : "threat";
                connectMode = false;
            }}
        >
            <span class="tm-dot" style="background: #E05C20;"></span> ADD THREAT
        </button>
        <button
            class="tm-btn"
            class:active={addMode === "control"}
            onclick={() => {
                addMode = addMode === "control" ? null : "control";
                connectMode = false;
            }}
        >
            <span class="tm-dot" style="background: #18C96A;"></span> ADD CONTROL
        </button>
        <button
            class="tm-btn"
            class:active={connectMode}
            onclick={() => {
                connectMode = !connectMode;
                addMode = null;
                connectFrom = null;
            }}
        >
            ⟶ CONNECT
        </button>
    </div>

    {#if connectMode}
        <input
            class="conn-label"
            type="text"
            placeholder="Connection label (e.g. mitigates, targets)..."
            bind:value={connLabel}
        />
    {/if}

    {#if addMode}
        <p class="instruction">
            Click on the canvas below to place a {addMode} node.
        </p>
    {/if}

    <!-- Canvas -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="tm-canvas" bind:this={canvasEl} onclick={handleCanvasClick}>
        <!-- Connection lines (SVG overlay) -->
        <svg class="tm-svg">
            {#each connections as conn}
                {@const from = nodes.find((n) => n.id === conn.from)}
                {@const to = nodes.find((n) => n.id === conn.to)}
                {#if from && to}
                    <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="#171B30"
                        stroke-width="1"
                    />
                    <text
                        x={(from.x + to.x) / 2}
                        y={(from.y + to.y) / 2 - 6}
                        fill="#424870"
                        font-size="9"
                        text-anchor="middle"
                        font-family="DM Mono, monospace">{conn.label}</text
                    >
                {/if}
            {/each}
        </svg>

        <!-- Nodes -->
        {#each nodes as node}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="tm-node"
                class:selected={selectedNode === node.id}
                style="left: {node.x}px; top: {node.y}px; border-color: {getNodeColor(
                    node.type,
                )};"
                onclick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleNodeClick(node.id);
                }}
            >
                <span
                    class="tm-node-type"
                    style="color: {getNodeColor(node.type)};"
                    >{node.type.toUpperCase()}</span
                >
                <span class="tm-node-label">{node.label}</span>
            </div>
        {/each}

        {#if nodes.length === 0}
            <div class="tm-empty">
                <p>Select a node type above, then click here to place it.</p>
            </div>
        {/if}
    </div>

    <!-- Edit node -->
    {#if selectedNode}
        {@const node = nodes.find((n) => n.id === selectedNode)}
        {#if node}
            <div class="edit-panel">
                <span class="edit-label">EDIT NODE</span>
                <input
                    class="edit-input"
                    type="text"
                    bind:value={editLabel}
                    onkeydown={(e) => {
                        if (e.key === "Enter") updateLabel();
                    }}
                />
                <div class="edit-actions">
                    <button class="si-btn" onclick={updateLabel}>SAVE</button>
                    <button
                        class="si-btn danger"
                        onclick={() => deleteNode(node.id)}>DELETE</button
                    >
                </div>
            </div>
        {/if}
    {/if}

    <!-- Stats -->
    <div class="tm-stats">
        <span class="tm-stat"
            >ASSETS: {nodes.filter((n) => n.type === "asset").length}</span
        >
        <span class="tm-stat"
            >THREATS: {nodes.filter((n) => n.type === "threat").length}</span
        >
        <span class="tm-stat"
            >CONTROLS: {nodes.filter((n) => n.type === "control").length}</span
        >
        <span class="tm-stat">CONNECTIONS: {connections.length}</span>
    </div>

    <button
        class="si-btn primary"
        onclick={handleSave}
        disabled={nodes.length === 0}>SAVE MODEL & COMPLETE →</button
    >
</div>

<style>
    .screen-build {
        width: 100%;
        max-width: 800px;
    }
    .sq-eyebrow {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #424870;
        display: block;
        margin-bottom: 16px;
    }
    .model-name {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid #171b30;
        color: #edf0ff;
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 24px;
        padding: 8px 0;
        outline: none;
        margin-bottom: 16px;
        box-sizing: border-box;
    }
    .model-name:focus {
        border-bottom-color: var(--game-accent, #1a8fe3);
    }
    .model-name::placeholder {
        color: #1e2440;
    }

    .tm-toolbar {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
    }
    .tm-btn {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        letter-spacing: 0.1em;
        padding: 8px 12px;
        border: 1px solid #171b30;
        border-radius: 3px;
        background: transparent;
        color: #424870;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .tm-btn:hover,
    .tm-btn.active {
        border-color: #424870;
        color: #8890bb;
    }
    .tm-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .conn-label {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid #171b30;
        color: #8890bb;
        font-family: "DM Mono", monospace;
        font-size: 11px;
        padding: 6px 0;
        outline: none;
        margin-bottom: 8px;
        box-sizing: border-box;
    }
    .instruction {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        color: #424870;
        margin: 0 0 8px 0;
    }

    .tm-canvas {
        position: relative;
        width: 100%;
        min-height: 400px;
        background: #03040a;
        border: 1px solid #0f1220;
        border-radius: 4px;
        cursor: crosshair;
        overflow: hidden;
    }
    .tm-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    .tm-empty {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tm-empty p {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #1e2440;
    }

    .tm-node {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 8px 12px;
        background: #07090f;
        border: 1px solid;
        border-radius: 4px;
        cursor: pointer;
        min-width: 80px;
        text-align: center;
        transition: box-shadow 0.15s;
        z-index: 1;
    }
    .tm-node:hover {
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.04);
    }
    .tm-node.selected {
        box-shadow: 0 0 0 2px rgba(26, 143, 227, 0.3);
    }
    .tm-node-type {
        font-family: "DM Mono", monospace;
        font-size: 8px;
        letter-spacing: 0.12em;
        display: block;
        margin-bottom: 2px;
    }
    .tm-node-label {
        font-family: "DM Sans", sans-serif;
        font-size: 12px;
        color: #edf0ff;
    }

    .edit-panel {
        background: #07090f;
        border: 1px solid #171b30;
        padding: 12px;
        border-radius: 4px;
        margin-top: 12px;
    }
    .edit-label {
        font-family: "DM Mono", monospace;
        font-size: 9px;
        color: #424870;
        display: block;
        margin-bottom: 6px;
    }
    .edit-input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid #171b30;
        color: #edf0ff;
        font-family: "DM Sans", sans-serif;
        font-size: 14px;
        padding: 4px 0;
        outline: none;
        box-sizing: border-box;
    }
    .edit-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }

    .tm-stats {
        display: flex;
        gap: 16px;
        margin: 16px 0;
        flex-wrap: wrap;
    }
    .tm-stat {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        color: #424870;
    }

    .si-btn {
        font-family: "DM Mono", monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        padding: 10px 20px;
        border-radius: 3px;
        background: transparent;
        cursor: pointer;
        color: #424870;
        border: 1px solid #171b30;
    }
    .si-btn.primary {
        color: var(--game-accent, #1a8fe3);
        border-color: var(--game-accent, #1a8fe3);
    }
    .si-btn.danger {
        color: #e05c20;
        border-color: #e05c20;
    }
    .si-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }
</style>
