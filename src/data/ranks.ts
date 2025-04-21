export interface RankGate {
    rank: number;       // e.g. 2, 3, 4
    requiredPoints: number; // e.g. 4, 8, 12
    title: string; // e.g. "Novice Rank", "Apprentice Rank", "Master Rank"
}

export const RANK_GATES: RankGate[] = [
    { rank: 2, requiredPoints: 4, title: 'Apprentice Rank' },
    { rank: 3, requiredPoints: 8, title: 'Journeyman Rank' },
    { rank: 4, requiredPoints: 12, title: 'Master Rank' },
];

export const RANK_ICONS: Record<number, string> = {
    2: 'images/rank_icons/Talent-Rank-1.webp',
    3: 'images/rank_icons/Talent-Rank-2.webp',
    4: 'images/rank_icons/Talent-Rank-3.webp',
};

export function getRankIcon(rank: number): string | undefined {
    return RANK_ICONS[rank];
}


// Optional helper to get gate by rank
export function getGateRequirement(rank: number): number {
    const gate = RANK_GATES.find(r => r.rank === rank);
    return gate?.requiredPoints || 0;
}
