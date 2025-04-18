import { Box, LinearProgress } from '@mui/material';

interface RankProgressBarProps {
    pointsSpent: number;
}

export default function RankProgressBar({ pointsSpent }: RankProgressBarProps) {
    const rankIcons: Record<number, string> = {
        2: 'images/rank_icons/Talent-Rank-1.png',
        3: 'images/rank_icons/Talent-Rank-2.png',
        4: 'images/rank_icons/Talent-Rank-3.png',
    };

    const currentRank = Math.min(4, Math.floor(pointsSpent / 4) + 1);
    const nextRank = currentRank < 4 ? currentRank + 1 : null;
    const progressPercent = nextRank ? ((pointsSpent % 4) / 4) * 100 : 100;

    return (
        <Box
            sx={{
                width: 400,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                my: 2,
            }}
        >
            {/* Left Icon */}
            {currentRank > 1 ? (
                <Box
                    component="img"
                    src={rankIcons[currentRank]}
                    alt={`Rank ${currentRank}`}
                    sx={{ width: 24, height: 24, mr: 1 }}
                />
            ) : (
                <Box sx={{ width: 24, height: 24, mr: 1 }} />
            )}

            {/* Progress Bar */}
            <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#333',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#fcea2c',
                        },
                    }}
                />
            </Box>

            {/* Right Icon */}
            {nextRank ? (
                <Box
                    component="img"
                    src={rankIcons[nextRank]}
                    alt={`Rank ${nextRank}`}
                    sx={{ width: 24, height: 24, ml: 1 }}
                />
            ) : (
                <Box sx={{ width: 24, height: 24, ml: 1 }} />
            )}
        </Box>
    );
}
