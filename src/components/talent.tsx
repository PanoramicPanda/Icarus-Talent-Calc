import { Box } from '@mui/material';
import TalentIcon from './talentIcon';
import RankIcon from './rankIcon';
import PointsLabel from './pointsLabel';
import TooltipWrapper from './tooltipWrapper';
import { TalentData } from '../constants/talents/talentStructure';

interface TalentProps {
    talent: TalentData;
    currentPoints: number;
    maxPoints: number;
    pointsSpent: number;
    isUnlocked: boolean;
    allTalents: TalentData[];
    talentPoints: Record<string, number>;
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

        // Check if talent is a blocking prerequisite
        const isBlockedByDownstream = nextPoints === 0 && allTalents.some((other) => {
            const otherPoints = talentPoints[other.name] || 0;
            if (otherPoints === 0) return false;
            const otherPrereqs = other.prerequisites.flat();
            const stillActive = otherPrereqs.filter(prereq => prereq !== talent.name && (talentPoints[prereq] || 0) > 0);
            return otherPrereqs.includes(talent.name) && stillActive.length === 0;
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
                    <TalentIcon talentName={talent.name} currentPoints={currentPoints} isUnlocked={isUnlocked} />
                </Box>
            </TooltipWrapper>
        </div>
    );
}

import { canRefundTalent } from '../utils/refund';

