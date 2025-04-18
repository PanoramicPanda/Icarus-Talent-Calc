import { Box } from '@mui/material';

interface PointsLabelProps {
    currentPoints: number;
    maxPoints: number;
    isUnlocked: boolean;
}

export default function PointsLabel({ currentPoints, maxPoints, isUnlocked }: PointsLabelProps) {
    const bg = currentPoints > 0 ? '#fcea2c' : isUnlocked ? '#212221' : '#222222';
    const border = currentPoints > 0 ? '#fcea2c' : isUnlocked ? '#cccdcc' : '#484947';
    const color = currentPoints > 0 ? 'black' : isUnlocked ? '#cccdcc' : '#7b7b7b';

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '-8px',
                left: '-10px',
                width: 28,
                height: 20,
                backgroundColor: bg,
                color: color,
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                zIndex: 5,
                clipPath: 'polygon(0 0, 100% 0, 100% 65%, 75% 100%, 0 100%)',
                boxShadow: `inset 0 0 0 2px ${border}`,
            }}
        >
            {currentPoints}/{maxPoints}
        </Box>
    );
}
