import { Box, Tooltip, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { normalizeBenefits, formatBenefit} from "../../utils/normalizeBenefits.ts";
import '@fontsource/barlow';

import {TalentData} from "../../constants/treeStructures.ts";

interface TooltipWrapperProps {
    talent: TalentData;
    currentPoints: number;
    children: ReactElement;
}



export default function TooltipWrapper({
                                           talent,
                                           currentPoints,
                                           children,
                                       }: TooltipWrapperProps) {
    return (
        <Tooltip
            title={
                <Box sx={{ width: 250 }}>
                    {/* Talent Name Header Box */}
                    <Box
                        sx={{
                            // backgroundColor: '#292929',
                            backgroundImage: 'linear-gradient(black, #50370c)',
                            borderBottom: '1px solid #ffba27',
                            // px: 1,
                            // py: 0.5,
                            // borderRadius: 1,
                            mb: 1,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ py: 0.25, color: '#ffba27', textAlign: 'center' }}>
                            {talent.name.toUpperCase()}
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography fontFamily={"Barlow"} variant="body2" sx={{ px: 2, color: '#ccc', mb: 1, textAlign: 'center' }}>
                        {talent.description}
                    </Typography>

                    {/* Thick Rule */}
                    <Box sx={{ height: '2px', width:'75%', margin:'0 auto', backgroundColor: '#5b5b5b', mt: 1, mb: 1 }} />

                    {/* Benefits */}
                    {normalizeBenefits(talent.benefits).map((tier, idx) => (
                        <Box key={idx}>
                            {tier.map((b, i) => (
                                <Typography
                                    key={i}
                                    variant="body2"
                                    sx={{
                                        color: idx === currentPoints - 1 ? '#bf8a19' : '#777',
                                        // fontWeight: idx === currentPoints - 1 ? 600 : 400,
                                        mb: 0.5,
                                        textAlign: 'center',
                                    }}
                                >
                                    {formatBenefit(b)}
                                </Typography>
                            ))}
                            {idx !== talent.benefits.length - 1 && (
                                <Box sx={{ height: '1px',width:'30%', margin:'0 auto', backgroundColor: '#313131', mt: 0.5, mb: 0.5 }} />
                            )}
                        </Box>
                    ))}


                    {/* Thin Rule */}
                    <Box sx={{ height: '1px',width:'75%', margin:'0 auto', backgroundColor: '#505050', mt: 1, mb: 1 }} />




                    {/* Click Tips */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1 }}>
                        <Typography
                            variant="caption"
                            sx={{ color: '#abb98c', textAlign: 'center', lineHeight: '20px' }}  // 20 px = icon height
                        >
                            Unlock
                            <Box
                                component="img"
                                src="images/mouse_left.png"
                                alt="left mouse button"
                                sx={{ width: 20, height: 20, mx: 0.5, verticalAlign: 'middle' }}
                            />
                            Respec
                            <Box
                                component="img"
                                src="images/mouse_right.png"
                                alt="right mouse button"
                                sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            placement="right-start"
            followCursor
            enterDelay={0}
            leaveDelay={0}
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#121212',
                        border: '1px solid #555',
                        borderRadius: 1,
                        p: 0,
                    },
                },
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 15],
                            },
                        },
                    ],
                },
            }}
        >
            {children}
        </Tooltip>
    );
}
