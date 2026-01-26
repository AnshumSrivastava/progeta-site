import { cmdCrossState, userProgress } from '$lib/core/storage';
import { get } from 'svelte/store';

export type CommandWord = {
    answer: string;
    hint: string;
    description: string;
};

export const LEVELS = [
    {
        id: 1,
        name: "INIT",
        words: [
            { answer: "LS", hint: "List directory contents", description: "Standard utility to view files." },
            { answer: "CD", hint: "Change directory", description: "Move between folders." },
            { answer: "PWD", hint: "Print working directory", description: "Show current path." },
            { answer: "MAN", hint: "Manual pager", description: "Read documentation." }
        ]
    },
    {
        id: 2,
        name: "SYSADMIN",
        words: [
            { answer: "TOP", hint: "Display Linux processes", description: "Real-time system monitoring." },
            { answer: "GREP", hint: "Global Regular Expression Print", description: "Search text patterns." },
            { answer: "CHMOD", hint: "Change mode", description: "Modify file permissions." }
        ]
    },
    {
        id: 3,
        name: "NETSEC",
        words: [
            { answer: "PING", hint: "Send ICMP ECHO_REQUEST", description: "Check network connectivity." },
            { answer: "NMAP", hint: "Network Mapper", description: "Scan ports and services." },
            { answer: "SSH", hint: "Secure Shell", description: "Encrypted remote login." }
        ]
    }
];

export function checkAnswer(levelId: number, input: string, target: string) {
    const isCorrect = input.toUpperCase() === target.toUpperCase();
    if (isCorrect) {
        // Update local state
        userProgress.update(p => ({
            ...p,
            xp: p.xp + 10,
            streak: p.streak + 1
        }));

        cmdCrossState.update(s => ({
            ...s,
            highScore: s.highScore + 10
        }));
    } else {
        userProgress.update(p => ({
            ...p,
            streak: 0
        }));
    }
    return isCorrect;
}
