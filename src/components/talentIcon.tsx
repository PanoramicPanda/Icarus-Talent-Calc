import {Box} from "@mui/material";
import { sanitizeTalentName} from "../utils/imagePreload.ts";
import {TalentData} from "../constants/treeStructures.ts";


interface TalentIconProps {
    talent: TalentData;
    currentPoints: number;
    isUnlocked: boolean;
    hasPointsToSpend: boolean;
}

export default function TalentIcon({ talent, currentPoints, isUnlocked, hasPointsToSpend }: TalentIconProps) {
    const imageName = talent.imageName ||sanitizeTalentName(talent.name);

    const borderColor = currentPoints > 0
        ? '#fcea2c'
        : isUnlocked && hasPointsToSpend
            ? '#cccdcc'
            : '#484947';

    const afterBackground = currentPoints > 0
        ? 'linear-gradient(135deg, transparent 75%, #fcea2c 50%)'
        : isUnlocked && hasPointsToSpend
            ? 'linear-gradient(135deg, transparent 75%, #cccdcc 50%)'
            : 'linear-gradient(135deg, transparent 75%, #484947 50%)';

    return (
        <Box
            sx={{
                width: 55,
                height: 55,
                border: 2,
                borderColor,
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
                    background: afterBackground,
                    zIndex: 3,
                },
            }}
        >
            <Box
                component="img"
                src={`images/talent_icons/${imageName}.webp`}
                alt={talent.name}
                sx={{
                    width: '100%',
                    height: '100%',
                    filter: currentPoints > 0 || (isUnlocked && hasPointsToSpend) ? 'none' : 'grayscale(100%)',
                }}
            />
        </Box>
    );
}