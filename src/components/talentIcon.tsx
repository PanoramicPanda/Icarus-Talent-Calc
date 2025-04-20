import { Box } from "@mui/material";
import { sanitizeTalentName } from "../utils/imagePreload.ts";
import { TalentData } from "../constants/treeStructures.ts";
import { useState } from "react";

interface TalentIconProps {
    talent: TalentData;
    currentPoints: number;
    isUnlocked: boolean;
    hasPointsToSpend: boolean;
}

export default function TalentIcon({
                                       talent,
                                       currentPoints,
                                       isUnlocked,
                                       hasPointsToSpend,
                                   }: TalentIconProps) {
    const imageName = talent.imageName || sanitizeTalentName(talent.name);
    const [isHovered, setIsHovered] = useState(false);

    const borderColor =
        currentPoints > 0
            ? "#fcea2c"
            : isUnlocked && hasPointsToSpend
                ? "#cccdcc"
                : "#484947";

    const afterBackground =
        currentPoints > 0
            ? "linear-gradient(135deg, transparent 75%, #fcea2c 50%)"
            : isUnlocked && hasPointsToSpend
                ? "linear-gradient(135deg, transparent 75%, #cccdcc 50%)"
                : "linear-gradient(135deg, transparent 75%, #484947 50%)";

    return (
        <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                overflow: 'visible', // allow corner indicators outside
                boxShadow:
                    currentPoints > 0
                        ? "0 0 4px 1px rgba(252, 234, 44, 0.6)"
                        : undefined,
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 18,
                    height: 18,
                    background: afterBackground,
                    zIndex: 3,
                }
            }}
        >
            {/* Hover Indicators */}
            {isHovered && (
                <>
                    {/* Top Left */}
                    <Box sx={{
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1,
                        width: 10,
                        height: 10,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            width: 8,
                            height: 2,
                            backgroundColor: "#ffffff",
                            top: 0,
                            left: 0,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            width: 2,
                            height: 8,
                            backgroundColor: "#ffffff",
                            top: 0,
                            left: 0,
                        },
                        animation: "pulseL 1.4s ease-in-out infinite",
                    }} />
                    {/* Top Right */}
                    <Box sx={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        zIndex: 1,
                        width: 10,
                        height: 10,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            width: 8,
                            height: 2,
                            backgroundColor: "#ffffff",
                            top: 0,
                            right: 0,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            width: 2,
                            height: 8,
                            backgroundColor: "#ffffff",
                            top: 0,
                            right: 0,
                        },
                        animation: "pulseL 1.4s ease-in-out infinite",
                    }} />
                    {/* Bottom Left */}
                    <Box sx={{
                        position: "absolute",
                        bottom: -6,
                        left: -6,
                        zIndex: 1,
                        width: 10,
                        height: 10,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            width: 8,
                            height: 2,
                            backgroundColor: "#ffffff",
                            bottom: 0,
                            left: 0,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            width: 2,
                            height: 8,
                            backgroundColor: "#ffffff",
                            bottom: 0,
                            left: 0,
                        },
                        animation: "pulseL 1.4s ease-in-out infinite",
                    }} />
                    {/* Bottom Right */}
                    <Box sx={{
                        position: "absolute",
                        bottom: -6,
                        right: -6,
                        zIndex: 1,
                        width: 10,
                        height: 10,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            width: 8,
                            height: 2,
                            backgroundColor: "#ffffff",
                            bottom: 0,
                            right: 0,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            width: 2,
                            height: 8,
                            backgroundColor: "#ffffff",
                            bottom: 0,
                            right: 0,
                        },
                        animation: "pulseL 1.4s ease-in-out infinite",
                    }} />
                </>
            )}

            {/* Talent Image */}
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

            {/* Glow Animation */}
            <style>
                {`
                    @keyframes pulseL {
                        0% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(1.2); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                `}
            </style>
        </Box>
    );
}
