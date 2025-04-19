import {TalentData} from "../constants/treeStructures.ts";

/**
 * Determines whether a talent can be refunded without breaking any rules.
 *
 * @param talentToRefund - The talent the user is attempting to refund.
 * @param currentPoints - The current number of points in that talent.
 * @param talentPoints - A map of all talent names to how many points are in each.
 * @param allTalentsInTree - The list of all talents in the current tree.
 */
export function canRefundTalent(
    talentToRefund: TalentData,
    currentPoints: number,
    talentPoints: Record<string, Record<string, number>>,
    allTalentsInTree: TalentData[]
): boolean {
    const treeKey = talentToRefund.tree;
    const currentTreePoints = talentPoints[treeKey] || {};
    const nextPointsInTalent = currentPoints - 1;

    // Simulate talentPoints after refund
    const simulatedPoints: Record<string, number> = {
        ...currentTreePoints,
        [talentToRefund.name]: nextPointsInTalent,
    };

    const remainingTalents = allTalentsInTree.filter(
        t => (simulatedPoints[t.name] || 0) > 0
    );

    if (remainingTalents.length === 0) return true;

    for (const talent of remainingTalents) {
        if (talent.rank <= 1) continue;

        if (
            talent.name === talentToRefund.name &&
            nextPointsInTalent === 0 &&
            allTalentsInTree
                .filter(t => t.rank === talent.rank)
                .every(t =>
                    t.name === talent.name
                        ? nextPointsInTalent === 0
                        : (simulatedPoints[t.name] || 0) === 0
                )
        ) {
            continue;
        }

        const lowerPoints = allTalentsInTree.reduce((sum, t) => {
            const p = simulatedPoints[t.name] || 0;
            return t.rank < talent.rank ? sum + p : sum;
        }, 0);

        const requiredLowerPoints = (talent.rank - 1) * 4;
        if (lowerPoints < requiredLowerPoints) {
            return false;
        }
    }

    return true;
}

export function prerequisiteMet(
    prerequisites: (string | string[])[],
    talentPoints: Record<string, Record<string, number>>,
    treeKey: string
): boolean {
    const pointsInTree = talentPoints[treeKey] || {};

    return prerequisites.some(req => {
        if (typeof req === 'string') {
            return (pointsInTree[req] || 0) > 0;
        } else if (Array.isArray(req)) {
            return req.every(inner => (pointsInTree[inner] || 0) > 0);
        }
        return false;
    });
}
