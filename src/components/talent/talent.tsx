import {Box} from '@mui/material';
import TalentIcon from './talentIcon.tsx';
import RankIcon from './rankIcon.tsx';
import PointsLabel from './pointsLabel.tsx';
import TooltipWrapper from './tooltipWrapper.tsx';
import {canRefundTalent} from '../../utils/refund.ts';
import {TalentData} from "../../constants/treeStructures.ts";
import {getPoolForTree, isPoolPerTreeCap, pointPools} from '../../data/points.ts';
import {getPointsSpentInPool, getPointsSpentInTree} from '../../utils/pointsSpent.ts';
import {Trees} from "../../data/talentTreeMap.ts";

interface TalentProps {
    talent: TalentData;
    treeKey: keyof typeof Trees;
    currentPoints: number;
    maxPoints: number;
    pointsSpent: number;
    isUnlocked: boolean;
    allTalents: TalentData[];
    talentPoints: Record<string, Record<string, number>>;
    onRankChange: (talentName: string, delta: number) => void;
    onShowError: (msg: string) => void;
    blockingTalents: Set<string>;
    setBlockingTalents: (talents: Set<string>) => void;
}

export default function Talent({
                                   talent,
                                   treeKey,
                                   currentPoints,
                                   maxPoints,
                                   pointsSpent,
                                   isUnlocked,
                                   allTalents,
                                   talentPoints,
                                   onRankChange,
                                   onShowError,
                                   blockingTalents,
                                   setBlockingTalents
                               }: TalentProps) {
    const handleClick = () => {
        if (currentPoints < maxPoints && isUnlocked) {
            onRankChange(talent.name, 1);
        }
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const nextPoints = currentPoints - 1;
        if (currentPoints === 0) return;

        const isBlockedByDownstream = nextPoints === 0 && allTalents.some((other) => {
            const otherPoints = talentPoints[other.tree]?.[other.name] || 0;
            if (otherPoints === 0) return false;

            const prerequisites = other.prerequisites || [];

            // If this talent isn't referenced at all, skip
            const referencesTalent = prerequisites.some(req =>
                typeof req === 'string'
                    ? req === talent.name
                    : Array.isArray(req) && req.includes(talent.name)
            );
            if (!referencesTalent) return false;

            // Check if this refund would make *all* clauses fail
            const isClauseSatisfied = (req: string | string[]) => {
                if (typeof req === 'string') {
                    return req === talent.name
                        ? nextPoints > 0
                        : (talentPoints[talent.tree]?.[req] || 0) > 0;
                }
                // AND clause: all inner elements must be true
                return req.every(inner =>
                    inner === talent.name
                        ? nextPoints > 0
                        : (talentPoints[talent.tree]?.[inner] || 0) > 0
                );
            };


            const atLeastOneClauseStillValid = prerequisites.some(isClauseSatisfied);

            return !atLeastOneClauseStillValid;
        });


        if (isBlockedByDownstream) {
            const blocking = allTalents
                .filter(other => {
                    const otherPoints = talentPoints[other.tree]?.[other.name] || 0;
                    if (otherPoints === 0) return false;

                    const referencesTalent = other.prerequisites?.some(req =>
                        typeof req === 'string'
                            ? req === talent.name
                            : Array.isArray(req) && req.includes(talent.name)
                    );

                    if (!referencesTalent) return false;

                    const nextPoints = currentPoints - 1;
                    const isClauseSatisfied = (req: string | string[]) => {
                        if (typeof req === 'string') {
                            return req === talent.name
                                ? nextPoints > 0
                                : (talentPoints[talent.tree]?.[req] || 0) > 0;
                        }
                        return req.every(inner =>
                            inner === talent.name
                                ? nextPoints > 0
                                : (talentPoints[talent.tree]?.[inner] || 0) > 0
                        );
                    };

                    const atLeastOneClauseStillValid = other.prerequisites.some(isClauseSatisfied);
                    return !atLeastOneClauseStillValid;
                })
                .map(t => t.name);

            if (typeof onShowError === 'function') {
                onShowError(`${talent.name} is a prerequisite for another talent you still own.`);
            }

            // Call the setter from props or context
            setBlockingTalents(new Set(blocking));
            setTimeout(() => setBlockingTalents(new Set()), 3000);

            return;
        }


        if (!canRefundTalent(talent, currentPoints, talentPoints, allTalents)) {
            onShowError(`You must maintain enough points in lower ranks to support your current rank.`);
            // Find the highest rank that is still owned
            const remainingTalents = allTalents.filter(t => (talentPoints[treeKey]?.[t.name] || 0) > 0);
            const highestRank = Math.max(...remainingTalents.map(t => t.rank));

            // If the refund would break the threshold, we highlight all talents of that highest rank
            const blockingByRankGate = allTalents
                .filter(t => t.rank === highestRank && (talentPoints[treeKey]?.[t.name] || 0) > 0)
                .map(t => t.name);

            setBlockingTalents(new Set(blockingByRankGate));

            setTimeout(() => setBlockingTalents(new Set()), 3000);

            return;
        }

        onRankChange(talent.name, -1);
    };

    // Get the pool this talent belongs to
    const pool = getPoolForTree(talent.tree);
    const perTreePoints = isPoolPerTreeCap(pool);
    const poolCap = pool ? pointPools[pool].cap : 0;
    const unspentPoints = pool ? poolCap - getPointsSpentInPool(pool, talentPoints) : 0;
    const hasPointsToSpend = perTreePoints ? getPointsSpentInTree(treeKey, talentPoints) < poolCap : unspentPoints > 0;


    return (
        <div
            key={talent.name}
            style={{ gridRow: talent.position[0] + 1, gridColumn: talent.position[1] + 1 }}
        >
            <TooltipWrapper talent={talent} currentPoints={currentPoints}>
                <Box
                    key={talent.name}
                    className={currentPoints > 0 ? 'owned' : isUnlocked ? 'can-buy' : 'locked'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                >
                    <PointsLabel currentPoints={currentPoints} maxPoints={maxPoints} isUnlocked={isUnlocked} />
                    <RankIcon rank={talent.rank} pointsSpent={pointsSpent} />
                    <TalentIcon
                        talent={talent}
                        currentPoints={currentPoints}
                        isUnlocked={isUnlocked}
                        hasPointsToSpend={hasPointsToSpend}
                        isBlocking={blockingTalents?.has(talent.name)}
                    />
                </Box>
            </TooltipWrapper>
        </div>
    );
}

