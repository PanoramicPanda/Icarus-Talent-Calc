import { Trees } from '../data/talentTreeMap.ts';
import { pointPools, TalentPool } from '../data/points.ts';

/**
 * Calculates total points spent in a given talent pool.
 */
export function getPointsSpentInPool(pool: TalentPool, talentPoints: Record<string, Record<string, number>>): number {
    return Object.entries(talentPoints)
        .filter(([tree]) => pointPools[pool].trees.includes(tree as keyof typeof Trees))
        .flatMap(([, treeTalents]) => Object.values(treeTalents))
        .reduce((a, b) => a + b, 0);
}
