import { Box, Typography } from '@mui/material';
import { getPoolForTree } from '../data/points.ts';
import {TalentData} from "../constants/treeStructures.ts";
import { normalizeBenefits } from '../utils/normalizeBenefits';

interface SummaryBoxProps {
    allTalents: Partial<Record<string, { talents: TalentData[]; tracks: any[] }>>;
    talentPoints: Record<string, Record<string, number>>;
}

export default function SummaryBox({ allTalents, talentPoints }: SummaryBoxProps) {
    // Build map of pool -> owned talents
    const poolToTalents: Record<string, TalentData[]> = {};

    for (const [treeKey, treeData] of Object.entries(allTalents)) {
        if (!treeData) continue;

        const pointsInTree = talentPoints[treeKey] || {};
        for (const talent of treeData.talents) {
            const spent = pointsInTree[talent.name] || 0;
            if (spent > 0) {
                const pool = getPoolForTree(treeKey);
                if (!pool) continue;

                if (!poolToTalents[pool]) poolToTalents[pool] = [];
                poolToTalents[pool].push(talent);
            }
        }
    }

    // Only show header if more than one pool
    const multiplePools = Object.keys(poolToTalents).length > 1;

    return (
        <Box sx={{ px: 2, py: 1 }}>
            {Object.entries(poolToTalents).map(([poolName, talents]) => {
                // Group benefits by description
                const benefitMap: Record<string, string[]> = {};
                const soloBenefits: string[] = [];

                for (const talent of talents) {
                    const spent = talentPoints[talent.tree]?.[talent.name] || 0;
                    if (spent === 0) continue;

                    const normalized = normalizeBenefits(talent.benefits);
                    const tier = normalized[spent - 1] || [];
                    tier.forEach(({ value, desc }) => {
                        if (desc) {
                            if (!benefitMap[desc]) benefitMap[desc] = [];
                            benefitMap[desc].push(value);
                        } else {
                            soloBenefits.push(value);
                        }
                    });
                }

                const benefitLines = [
                    ...Object.entries(benefitMap).map(([desc, benefits]) => {
                        return `${combineBenefits(benefits)} ${desc}`;
                    }),
                    ...soloBenefits
                ];

                return (
                    <Box key={poolName} sx={{ mb: 2 }}>
                        {multiplePools && (
                            <Typography variant="subtitle2" sx={{ color: '#fcea2c', fontWeight: 'bold', mb: 1 }}>
                                {poolName}
                            </Typography>
                        )}
                        {benefitLines.map((line, idx) => (
                            <Typography key={idx} variant="body2" sx={{ color: '#ccc' }}>
                                • {line}
                            </Typography>
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
}

// Combine benefits like "+5%", "+10%" into "+15%" if possible
function combineBenefits(benefits: string[]): string {
    const numeric = benefits.every(b => /^[-+]?[\d.]+%$/.test(b.trim()));

    if (numeric) {
        const total = benefits.reduce((sum, b) => sum + parseFloat(b), 0);
        return `${total}%`;
    }

    return benefits.join(', ');
}
