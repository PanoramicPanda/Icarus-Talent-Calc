// src/components/PointTotals.tsx
import { Box, Typography } from '@mui/material';
import { pointPools, TalentPool} from '../data/points.ts';
import { getPointsSpentInPool } from '../utils/pointsSpent.ts';

interface PointTotalsProps {
    talentPoints: Record<string, Record<string, number>>;
}

export default function PointTotals({ talentPoints }: PointTotalsProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, mt: 1 }}>
            {Object.entries(pointPools).map(([poolKey, pool]) => {
                const spent = getPointsSpentInPool(poolKey as TalentPool, talentPoints);
                const isPerTreeCap = pool.perTreeCap || false
                const pointRender = isPerTreeCap ? `${pool.cap} per Tree` : `${spent} / ${pool.cap}`

                return (
                    <Box
                        key={poolKey}
                        sx={{
                            px: 2,
                            py: 1,
                            border: '1px solid #444',
                            borderRadius: 1,
                            backgroundColor: '#1c1c1c',
                            color: '#ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 100,
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="caption" sx={{ color: '#999' }}>
                            {poolKey} Points
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                color: isPerTreeCap ? '#ffba27' : spent >= pool.cap ? 'red' : '#ffba27'
                            }}
                        >
                            {pointRender}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
}
