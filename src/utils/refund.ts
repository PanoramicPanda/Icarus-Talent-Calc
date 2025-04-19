import { TalentData } from '../constants/talentStructure.ts';

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
    talentPoints: Record<string, number>,
    allTalentsInTree: TalentData[]
): boolean {
    const nextPointsInTalent = currentPoints - 1;

    // Simulate what the talentPoints would look like if we refund this one point
    const simulatedPoints: Record<string, number> = {
        ...talentPoints,
        [talentToRefund.name]: nextPointsInTalent,
    };

    // List of talents that will still have points after the refund
    const remainingTalents = allTalentsInTree.filter(
        t => (simulatedPoints[t.name] || 0) > 0
    );

    // If refunding this would leave no talents, always allow
    if (remainingTalents.length === 0) return true;

    for (const talent of remainingTalents) {
        // Skip if it's rank 1, no requirements needed
        if (talent.rank <= 1) continue;

        // Skip threshold check if we're refunding the last remaining talent of this rank
        if (
            talent.name === talentToRefund.name &&
            nextPointsInTalent === 0 &&
            allTalentsInTree
                .filter(t => t.rank === talent.rank)
                .every(t => (t.name === talent.name ? nextPointsInTalent : simulatedPoints[t.name] || 0) === 0)
        ) {
            continue;
        }

        console.log('Refunding:', talentToRefund.name);
        console.log('Simulated Points:', simulatedPoints);

        for (const talent of allTalentsInTree) {
            console.log(`Talent: ${talent.name}, Rank: ${talent.rank}`);
        }

        let lowerPoints = 0;

        for (const t of allTalentsInTree) {
            const p = simulatedPoints[t.name] || 0;
            if (t.rank < talent.rank) {
                console.log(`  Including ${t.name} (rank ${t.rank}) with ${p} points`);
                lowerPoints += p;
            }
        }


        // // How many points are still spent in ranks *below* this one
        // const lowerPoints = allTalentsInTree.reduce((sum, t) => {
        //     const points = simulatedPoints[t.name] || 0;
        //     return t.rank < talent.rank ? sum + points : sum;
        // }, 0);

        const requiredLowerPoints = (talent.rank - 1) * 4;

        // If we still own this higher-rank talent, and refunding would break its lower-rank support...
        if (lowerPoints < requiredLowerPoints) {
            return false; // ❌ Invalid refund
        }
    }

    return true; // ✅ All higher ranks still supported
}
