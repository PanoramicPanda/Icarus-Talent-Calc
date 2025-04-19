import { Box } from '@mui/material';

interface RankIconProps {
    rank: number;
    pointsSpent: number;
}

export default function RankIcon({ rank, pointsSpent }: RankIconProps) {
    if (rank <= 1) {
        return <Box sx={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20 }} />;
    }

    const threshold = (rank - 1) * 4;
    const isGrayscale = pointsSpent < threshold;

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '-8px',
                right: '-6px',
                backgroundImage: 'linear-gradient(#0a0a0a, #141413)',
                border: '2px solid #171717',
                width: 20,
                height: 20,
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component="img"
                src={`images/rank_icons/Talent-Rank-${rank - 1}.webp`}
                alt={`Rank ${rank - 1}`}
                sx={{
                    width: 16,
                    height: 16,
                    filter: isGrayscale ? 'grayscale(100%)' : 'none',
                }}
            />
        </Box>
    );
}
