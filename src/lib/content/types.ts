export interface Module {
    id: string | number;
    title: string;
    category?: string;
    goal?: string;
    tools?: string;
    skills?: string;
    concepts?: string;
    type: 'Technical' | 'Soft Skills';
    syllabus?: { title: string; desc: string }[];
    toolDetails?: { name: string; desc: string }[];
}

export interface TrackPhase {
    name: string;
    modules: Module[];
}

export interface Track {
    id: number;
    title: string;
    description: string;
    roleSummary?: string;
    skills?: string[];
    dayInLife?: { time: string; activity: string }[];
    phases: TrackPhase[];
    deliverables?: { title: string; desc: string }[];
}

export interface Workshop {
    title: string;
    role: string;
    outcome: string;
    mission: string;
    soft_mods: Module[];
    tech_mods: Module[];
}

export interface Event {
    type: string;
    title: string;
    description: string;
    date?: string;
    status?: string;
}

export interface Article {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    summary: string;
    content: string;
}
