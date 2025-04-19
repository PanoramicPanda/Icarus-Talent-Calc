// src/components/PointTotals.tsx
import { Box, Typography } from '@mui/material';
import { pointPools, TalentPool } from '../constants/points';
import { Trees } from '../constants/talents/talentStructure';

interface PointTotalsProps {
    pointsSpent: Record<string, number>;
}

export default function PointTotals({ pointsSpent }: PointTotalsProps) {
    // Tally points by pool
    const poolTotals: Record<TalentPool, number> = {
        General: 0,
        Solo: 0
    };

    for (const [tree, points] of Object.entries(pointsSpent)) {
        const pool = Object.entries(pointPools).find(([, value]) =>
            value.trees.includes(tree as keyof typeof Trees)
        )?.[0] as TalentPool;

        if (pool) {
            poolTotals[pool] += points;
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            {Object.entries(pointPools).map(([poolKey, pool]) => (
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
                            color:
                                poolTotals[poolKey as TalentPool] > pool.cap
                                    ? 'red'
                                    : '#fcea2c'
                        }}
                    >
                        {poolTotals[poolKey as TalentPool]} / {pool.cap}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}
