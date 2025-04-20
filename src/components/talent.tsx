import {Box} from '@mui/material';
import TalentIcon from './talentIcon';
import RankIcon from './rankIcon';
import PointsLabel from './pointsLabel';
import TooltipWrapper from './tooltipWrapper';
import {canRefundTalent} from '../utils/refund';
import {TalentData} from "../constants/treeStructures.ts";
import {getPoolForTree, pointPools} from '../data/points.ts';
import { getPointsSpentInPool } from '../utils/pointsSpent.ts';

interface TalentProps {
    talent: TalentData;
    currentPoints: number;
    maxPoints: number;
    pointsSpent: number;
    isUnlocked: boolean;
    allTalents: TalentData[];
    talentPoints: Record<string, Record<string, number>>;
    onRankChange: (talentName: string, delta: number) => void;
    onShowError: (msg: string) => void;
}

export default function Talent({
                                   talent,
                                   currentPoints,
                                   maxPoints,
                                   pointsSpent,
                                   isUnlocked,
                                   allTalents,
                                   talentPoints,
                                   onRankChange,
                                   onShowError
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
            onShowError(`${talent.name} is a prerequisite for another talent you still own.`);
            return;
        }

        if (!canRefundTalent(talent, currentPoints, talentPoints, allTalents)) {
            onShowError(`You must maintain enough points in lower ranks to support your current rank.`);
            return;
        }

        onRankChange(talent.name, -1);
    };

    // Get the pool this talent belongs to
    const pool = getPoolForTree(talent.tree);
    const unspentPoints = pool ? pointPools[pool].cap - getPointsSpentInPool(pool, talentPoints) : 0;
    const hasPointsToSpend = unspentPoints > 0;


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
                    />
                </Box>
            </TooltipWrapper>
        </div>
    );
}

