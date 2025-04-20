import {Box} from "@mui/material";
import { sanitizeTalentName} from "../utils/imagePreload.ts";
import {TalentData} from "../constants/treeStructures.ts";


interface TalentIconProps {
    talent: TalentData;
    currentPoints: number;
    isUnlocked: boolean;
}

export default function TalentIcon({ talent, currentPoints, isUnlocked }: TalentIconProps) {
    const imageName = talent.imageName ||sanitizeTalentName(talent.name);

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
                src={`images/talent_icons/${imageName}.webp`}
                alt={talent.name}
                sx={{
                    width: '100%',
                    height: '100%',
                    filter: isUnlocked ? 'none' : 'grayscale(100%)',
                }}
            />
        </Box>
    );
}