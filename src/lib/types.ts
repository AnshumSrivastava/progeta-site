// ════════════════════════════════════════════════════
// Shared TypeScript Interfaces
// ════════════════════════════════════════════════════

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'doing' | 'done' | 'dropped';
    priority: 'urgent' | 'high' | 'medium' | 'low';
    due_date?: string;
    tags: string[];
    project_id?: string;
    area: string;
    source: Source;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface Habit {
    id: string;
    name: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'custom';
    custom_days?: number[];
    target_count: number;
    category: string;
    color?: string;
    icon?: string;
    active: boolean;
    source: Source;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface HabitLog {
    id: string;
    habit_id: string;
    date: string;
    count: number;
    note?: string;
    logged_at: string;
}

export interface Goal {
    id: string;
    title: string;
    description?: string;
    why?: string;
    status: 'active' | 'completed' | 'paused' | 'dropped';
    horizon: string;
    area: string;
    parent_goal_id?: string;
    target_date?: string;
    progress_type: 'manual' | 'auto';
    progress_value: number;
    source: Source;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface FocusSession {
    id: string;
    task_id?: string;
    duration_planned: number;
    duration_actual: number;
    type: 'pomodoro' | 'deep' | 'flow';
    started_at: string;
    ended_at?: string;
    interruptions: number;
    reflection?: string;
    energy_before?: number;
    energy_after?: number;
    source: Source;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    subcategory?: string;
    date: string;
    description?: string;
    account?: string;
    currency: string;
    tags: string[];
    recurring: boolean;
    recurring_interval?: string;
    source: Source;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface Note {
    id: string;
    title: string;
    content?: string;
    type: 'note' | 'snippet' | 'idea';
    tags: string[];
    area?: string;
    linked_ids: string[];
    source: Source;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface JournalEntry {
    id: string;
    date: string;
    prompt?: string;
    content?: string;
    mood?: number;
    energy?: number;
    tags: string[];
    private: boolean;
    source: Source;
    created_at: string;
    updated_at: string;
}

export interface Certificate {
    id: string;
    holder_name: string;
    programme: string;
    issued_at: string;
    status: 'active' | 'revoked';
    created_at: string;
}

export interface VitalEntry {
    id: string;
    date: string;
    type: 'weight' | 'sleep' | 'water' | 'steps' | 'calories' | 'exercise';
    value: number;
    unit: string;
    note?: string;
    source: Source;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export type Source = 'ui' | 'voice' | 'agent' | 'import';
export type SelfOSMode = 'local' | 'cloud';
