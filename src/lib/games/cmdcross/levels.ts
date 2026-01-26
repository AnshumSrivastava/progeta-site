export interface Entity {
    id: string; // "box1", "firewall"
    type: 'player' | 'box' | 'wall' | 'goal' | 'enemy' | 'key';
    r: number;
    c: number;
    symbol: string; // Visual char
    color?: string;
    description: string;
}

export interface Level {
    id: number;
    name: string;
    desc: string;
    objective: string;
    gridSize: number;
    entities: Entity[];
    allowedCommands: string[]; // ['cd', 'ls', 'mv', 'rm', 'chmod', 'sudo']
    xpReward?: number;
}

export const LEVELS: Level[] = [
    {
        id: 1,
        name: "/home/guest",
        desc: "Navigation Basics",
        objective: "Navigate to the /home/user directory.",
        gridSize: 8,
        allowedCommands: ['cd', 'ls'],
        xpReward: 100,
        entities: [
            { id: "player", type: "player", r: 4, c: 1, symbol: "@", description: "guest" },
            { id: "home", type: "goal", r: 4, c: 6, symbol: "⌂", color: "#4ade80", description: "/home/user" },
            { id: "w1", type: "wall", r: 3, c: 3, symbol: "#", description: "Permission Denied" },
            { id: "w2", type: "wall", r: 5, c: 3, symbol: "#", description: "Permission Denied" }
        ]
    },
    {
        id: 2,
        name: "/var/tmp",
        desc: "File Management",
        objective: "Move the 'cache_file' out of the way.",
        gridSize: 8,
        allowedCommands: ['cd', 'ls', 'mv'],
        entities: [
            { id: "player", type: "player", r: 6, c: 1, symbol: "@", description: "user" },
            { id: "cache", type: "box", r: 4, c: 4, symbol: "📦", color: "#60a5fa", description: "cache.tmp" },
            { id: "exit", type: "goal", r: 2, c: 6, symbol: "⚑", color: "#4ade80", description: "Process Exit" },
            { id: "w1", type: "wall", r: 3, c: 3, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 3, c: 4, symbol: "#", description: "" },
            { id: "w3", type: "wall", r: 5, c: 4, symbol: "#", description: "" },
            { id: "w4", type: "wall", r: 5, c: 5, symbol: "#", description: "" }
        ]
    },
    {
        id: 3,
        name: "/etc/firewall",
        desc: "Destructive Actions",
        objective: "Remove the 'rule_block' entity.",
        gridSize: 8,
        allowedCommands: ['cd', 'ls', 'mv', 'rm'],
        entities: [
            { id: "player", type: "player", r: 4, c: 1, symbol: "@", description: "admin" },
            { id: "rule", type: "box", r: 4, c: 3, symbol: "⛔", color: "#f87171", description: "rule_block.conf" },
            { id: "gateway", type: "goal", r: 4, c: 6, symbol: "🌐", color: "#4ade80", description: "Gateway" },
            // Walls funneling player to the rule
            { id: "w1", type: "wall", r: 3, c: 3, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 5, c: 3, symbol: "#", description: "" }
        ]
    },
    {
        id: 4,
        name: "/root/vault",
        desc: "Superuser Permissions",
        objective: "Unlock the 'secure_door' (chmod 777).",
        gridSize: 8,
        allowedCommands: ['cd', 'ls', 'mv', 'rm', 'chmod', 'sudo'],
        entities: [
            { id: "player", type: "player", r: 6, c: 3, symbol: "@", description: "root" },
            { id: "door", type: "key", r: 3, c: 3, symbol: "🔒", color: "#fbbf24", description: "secure_door (000)" },
            { id: "root", type: "goal", r: 1, c: 3, symbol: "👑", color: "#facc15", description: "/root" },
            { id: "w1", type: "wall", r: 3, c: 2, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 3, c: 4, symbol: "#", description: "" }
        ]
    },
    {
        id: 5,
        name: "/sbin/protected",
        desc: "Root Access Required",
        objective: "Sudo Remove the 'kernel_panic' process.",
        gridSize: 8,
        allowedCommands: ['cd', 'ls', 'sudo', 'rm'],
        entities: [
            { id: "player", type: "player", r: 5, c: 2, symbol: "@", description: "admin" },
            { id: "panic", type: "enemy", r: 4, c: 4, symbol: "☠", color: "#ef4444", description: "kernel_panic" },
            { id: "logs", type: "goal", r: 4, c: 6, symbol: "≡", color: "#4ade80", description: "System Logs" },
            { id: "w1", type: "wall", r: 3, c: 4, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 5, c: 4, symbol: "#", description: "" }
        ]
    },
    {
        id: 6,
        name: "/dev/mapper",
        desc: "Advanced Operations",
        objective: "Reconfigure the partition table.",
        gridSize: 10,
        allowedCommands: ['cd', 'ls', 'mv', 'chmod'],
        entities: [
            { id: "player", type: "player", r: 8, c: 1, symbol: "@", description: "sys" },
            { id: "sda1", type: "goal", r: 1, c: 8, symbol: "🖴", color: "#4ade80", description: "/boot" },
            // Gates
            { id: "gate_a", type: "key", r: 6, c: 3, symbol: "🔒", color: "#fbbf24", description: "Encrypted vol" },
            { id: "gate_b", type: "key", r: 4, c: 6, symbol: "🔒", color: "#fbbf24", description: "Encrypted vol" },
            // Junk to move
            { id: "tmp", type: "box", r: 6, c: 4, symbol: "🗑", color: "#9ca3af", description: "temp files" },
            // Walls
            { id: "w1", type: "wall", r: 6, c: 2, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 6, c: 7, symbol: "#", description: "" },
            { id: "w3", type: "wall", r: 4, c: 5, symbol: "#", description: "" }
        ]
    },
    {
        id: 7,
        name: "/var/www/html",
        desc: "Web Server Config",
        objective: "Deploy (move) 'index.html' to 'public_html'.",
        gridSize: 10,
        allowedCommands: ['cd', 'ls', 'mv'],
        xpReward: 350,
        entities: [
            { id: "player", type: "player", r: 1, c: 1, symbol: "@", description: "www-data" },
            { id: "index", type: "box", r: 3, c: 3, symbol: "📄", color: "#60a5fa", description: "index.html" },
            { id: "public", type: "goal", r: 8, c: 8, symbol: "🌐", color: "#4ade80", description: "public_html" },
            // Maze of configs
            { id: "w1", type: "wall", r: 2, c: 2, symbol: "#", description: "config" },
            { id: "w2", type: "wall", r: 2, c: 3, symbol: "#", description: "config" },
            { id: "w3", type: "wall", r: 2, c: 4, symbol: "#", description: "config" },
            { id: "w4", type: "wall", r: 4, c: 4, symbol: "#", description: "config" },
            { id: "w5", type: "wall", r: 5, c: 4, symbol: "#", description: "config" },
            { id: "w6", type: "wall", r: 6, c: 4, symbol: "#", description: "config" }
        ]
    },
    {
        id: 8,
        name: "/opt/database",
        desc: "Data Migration",
        objective: "Move 'db.sql' to 'migration_slot'.",
        gridSize: 10,
        allowedCommands: ['cd', 'ls', 'mv', 'rm'],
        xpReward: 500,
        entities: [
            { id: "player", type: "player", r: 9, c: 5, symbol: "@", description: "dba" },
            { id: "db", type: "box", r: 5, c: 5, symbol: "🗄️", color: "#fbbf24", description: "db.sql" },
            { id: "slot", type: "goal", r: 1, c: 5, symbol: "📥", color: "#4ade80", description: "Migration Slot" },
            { id: "old", type: "box", r: 3, c: 5, symbol: "🕸", color: "#9ca3af", description: "legacy_data" },
            // Walls
            { id: "w1", type: "wall", r: 4, c: 4, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 4, c: 6, symbol: "#", description: "" },
            { id: "w3", type: "wall", r: 6, c: 4, symbol: "#", description: "" },
            { id: "w4", type: "wall", r: 6, c: 6, symbol: "#", description: "" }
        ]
    },
    {
        id: 9,
        name: "/etc/shadow",
        desc: "Security Breach",
        objective: "Crack (sudo rm) the 'hash_lock' and exit.",
        gridSize: 12,
        allowedCommands: ['cd', 'ls', 'sudo', 'rm', 'chmod'],
        xpReward: 800,
        entities: [
            { id: "player", type: "player", r: 11, c: 6, symbol: "@", description: "hacker" },
            { id: "lock", type: "enemy", r: 6, c: 6, symbol: "🔑", color: "#ef4444", description: "hash_lock" },
            { id: "root", type: "goal", r: 1, c: 6, symbol: "💀", color: "#facc15", description: "root_access" },
            // Walls
            { id: "w1", type: "wall", r: 10, c: 4, symbol: "#", description: "" },
            { id: "w2", type: "wall", r: 10, c: 8, symbol: "#", description: "" },
            { id: "w3", type: "wall", r: 8, c: 5, symbol: "#", description: "" },
            { id: "w4", type: "wall", r: 8, c: 7, symbol: "#", description: "" }
        ]
    },
    {
        id: 10,
        name: "/boot/vmlinuz",
        desc: "System Core",
        objective: "Initialize the kernel (Reach Core).",
        gridSize: 12,
        allowedCommands: ['cd', 'ls', 'mv', 'chmod', 'sudo', 'rm'],
        xpReward: 1000,
        entities: [
            { id: "player", type: "player", r: 11, c: 1, symbol: "@", description: "init" },
            { id: "core", type: "goal", r: 6, c: 6, symbol: "⚛", color: "#60a5fa", description: "KERNEL_CORE" },
            // Defenses
            { id: "firewall", type: "enemy", r: 8, c: 8, symbol: "🔥", color: "#ef4444", description: "firewall" },
            { id: "gate", type: "key", r: 4, c: 4, symbol: "🔒", color: "#fbbf24", description: "boot_loader" },
            { id: "module", type: "box", r: 9, c: 3, symbol: "📦", color: "#a78bfa", description: "driver_pkg" }
        ]
    }
];
