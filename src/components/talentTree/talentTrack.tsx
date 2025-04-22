import { Box } from '@mui/material';
import { TalentData, FullTrack } from '../../constants/treeStructures.ts';
import { getPoolForTree, pointPools } from '../../data/points.ts';
import { getPointsSpentInPool } from '../../utils/pointsSpent.ts';
import { getGateRequirement } from '../../data/ranks.ts';
import {TALENT_ICON_HEIGHT, TALENT_ICON_WIDTH, TREE_COLUMN_WIDTH, TREE_ROW_HEIGHT} from "../../data/dimension.ts";

interface TalentTrackProps {
    fullTracks: FullTrack[];
    talents: TalentData[];
    talentPoints: Record<string, Record<string, number>>;
    treeKey: string;
}

export default function TalentTrack({ fullTracks, talents, talentPoints, treeKey }: TalentTrackProps) {
    const treeTalentPoints = talentPoints[treeKey] || {};
    const pointsSpentInTree = Object.values(treeTalentPoints).reduce((sum, pts) => sum + pts, 0);

    const talentMap = Object.fromEntries(talents.map(t => [t.name, t]));
    const hasPointsIn = (name: string) => (treeTalentPoints[name] || 0) > 0;

    const isTalentReachable = (talent: TalentData): boolean => {
        const requiredPoints = getGateRequirement(talent.rank);
        if (pointsSpentInTree < requiredPoints) return false;

        const pool = getPoolForTree(treeKey as keyof typeof pointPools);
        if (pool) {
            const unspentPoints = pointPools[pool].cap - getPointsSpentInPool(pool, talentPoints);
            if (unspentPoints <= 0) return false;
        }

        const prereqs = talent.prerequisites ?? [];
        return prereqs.length === 0 || prereqs.some(req => {
            if (typeof req === 'string') {
                return hasPointsIn(req);
            } else if (Array.isArray(req)) {
                return req.every(inner => hasPointsIn(inner));
            }
            return false;
        });
    };

    const getTalentCenter = ([row, col]: [number, number]): [number, number] => {
        const x = col * TREE_COLUMN_WIDTH + TALENT_ICON_WIDTH / 2;
        const y = row * TREE_ROW_HEIGHT + TALENT_ICON_HEIGHT / 2;
        return [x, y];
    };

    const drawTrack = (track: FullTrack, color: string, index: number) => {
        const startPos = talentMap[track.start]?.position;
        const endPos = talentMap[track.end]?.position;
        if (!startPos || !endPos) return null;

        const pathCoords = track.path
            ? [startPos, ...track.path, endPos]
            : [startPos, endPos];


        const [start, ...rest] = pathCoords.map(getTalentCenter);
        const pathD = rest.reduce(
            (d, [x, y]) => `${d} L${x},${y}`,
            `M${start[0]},${start[1]}`
        );

        return (
            <path
                key={index}
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
            />
        );
    };

    const dimmed: FullTrack[] = [];
    const highlighted: FullTrack[] = [];

    for (const track of fullTracks) {
        const fromTaken = hasPointsIn(track.start);
        const toReachable = isTalentReachable(talentMap[track.end]);

        (fromTaken && toReachable ? highlighted : dimmed).push(track);
    }

    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <svg width="100%" height="100%">
                {dimmed.map((t, i) => drawTrack(t, '#444', i))}
                {highlighted.map((t, i) => drawTrack(t, '#fff', i + dimmed.length))}
            </svg>
        </Box>
    );
}
