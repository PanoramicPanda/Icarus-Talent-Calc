import { Box, Tooltip, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { normalizeBenefits} from "../utils/normalizeBenefits.ts";

import {TalentData} from "../constants/treeStructures.ts";

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
                <Box sx={{ px: 1, py: 0.5, maxWidth: 280 }}>
                    {/* Talent Name Header Box */}
                    <Box
                        sx={{
                            backgroundColor: '#292929',
                            border: '1px solid #555',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mb: 1,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ color: '#fcea2c', fontWeight: 'bold' }}>
                            {talent.name}
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                        {talent.description}
                    </Typography>

                    {/* Thin Rule */}
                    <Box sx={{ height: '1px', backgroundColor: '#444', mb: 1 }} />

                    {/* Benefits */}
                    {normalizeBenefits(talent.benefits).map((tier, idx) => (
                        <Box key={idx}>
                            {tier.map((b, i) => (
                                <Typography
                                    key={i}
                                    variant="body2"
                                    sx={{
                                        color: idx === currentPoints - 1 ? '#fcea2c' : '#777',
                                        fontWeight: idx === currentPoints - 1 ? 600 : 400,
                                    }}
                                >
                                    {`${b.value} ${b.desc}`}
                                </Typography>
                            ))}
                        </Box>
                    ))}

                    {/* Thick Rule */}
                    <Box sx={{ height: '2px', backgroundColor: '#555', mt: 1, mb: 1 }} />

                    {/* Click Tips */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                            🖱 Left Click: Upgrade
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                            🖱 Right Click: Refund
                        </Typography>
                    </Box>
                </Box>
            }
            placement="right"
            followCursor
            enterDelay={0}
            leaveDelay={0}
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#1e1e1e',
                        border: '1px solid #555',
                        borderRadius: 1,
                        p: 0,
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
}
