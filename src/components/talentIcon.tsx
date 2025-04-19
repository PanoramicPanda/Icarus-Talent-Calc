import {Box} from "@mui/material";


interface TalentIconProps {
    talentName: string;
    currentPoints: number;
    isUnlocked: boolean;
}

export default function TalentIcon({ talentName, currentPoints, isUnlocked }: TalentIconProps) {
    const imageName = talentName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_');

    return (
        <Box
            sx={{
                width: 55,
                height: 55,
                border: 2,
                borderColor:
                    currentPoints > 0 ? '#fcea2c' :
                        isUnlocked ? '#cccdcc' :
                            '#484947',
                borderStyle: 'ridge',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 18,
                    height: 18,
                    background: currentPoints > 0
                        ? 'linear-gradient(135deg, transparent 75%, #fcea2c 50%)'
                        : isUnlocked
                            ? 'linear-gradient(135deg, transparent 75%, #cccdcc 50%)'
                            : 'linear-gradient(135deg, transparent 75%, #484947 50%)',
                    zIndex: 3,
                },
            }}
        >
            <Box
                component="img"
                src={`images/talent_icons/${imageName}.png`}
                alt={talentName}
                sx={{
                    width: '100%',
                    height: '100%',
                    filter: currentPoints === 0 ? 'grayscale(100%)' : 'none',
                }}
            />
        </Box>
    );
}