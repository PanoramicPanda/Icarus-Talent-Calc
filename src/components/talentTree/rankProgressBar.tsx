import { Box, LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { getRankIcon, RANK_GATES } from '../../data/ranks.ts';

interface RankProgressBarProps {
    pointsSpent: number;
}

export default function RankProgressBar({ pointsSpent }: RankProgressBarProps) {
    const [hover, setHover] = useState(false);

    let currentRank = 1;
    let nextGate = RANK_GATES[0];

    for (let i = 0; i < RANK_GATES.length; i++) {
        if (pointsSpent >= RANK_GATES[i].requiredPoints) {
            currentRank = RANK_GATES[i].rank;
            nextGate = RANK_GATES[i + 1];
        } else {
            nextGate = RANK_GATES[i];
            break;
        }
    }

    const nextRank = nextGate ? nextGate.rank : null;

    let progressPercent = 100;
    let pointsToNext = 0;

    if (nextGate) {
        const previousGatePoints = RANK_GATES.find(g => g.rank === currentRank)?.requiredPoints || 0;
        const needed = nextGate.requiredPoints - previousGatePoints;
        const progress = pointsSpent - previousGatePoints;
        progressPercent = (progress / needed) * 100;
        pointsToNext = nextGate.requiredPoints - pointsSpent;
    }

    const message = nextGate
        ? `${pointsToNext} point${pointsToNext !== 1 ? 's' : ''} to ${nextGate.title}`
        : 'Max Rank Reached';

    return (
        <Box
            sx={{
                width: 400,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                my: 2,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Left Icon */}
            {currentRank > 1 ? (
                <Box
                    component="img"
                    src={getRankIcon(currentRank)}
                    alt={`Rank ${currentRank}`}
                    sx={{ width: 24, height: 24, mr: 1 }}
                />
            ) : (
                <Box sx={{ width: 24, height: 24, mr: 1 }} />
            )}

            {/* Progress Bar with optional message */}
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#333',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#ffba27',
                        },
                    }}
                />
                {hover && (
                    <Typography
                        variant="caption"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#fff',
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            textShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;',
                        }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>

            {/* Right Icon */}
            {nextRank ? (
                <Box
                    component="img"
                    src={getRankIcon(nextRank)}
                    alt={`Rank ${nextRank}`}
                    sx={{ width: 24, height: 24, ml: 1 }}
                />
            ) : (
                <Box sx={{ width: 24, height: 24, ml: 1 }} />
            )}
        </Box>
    );
}
