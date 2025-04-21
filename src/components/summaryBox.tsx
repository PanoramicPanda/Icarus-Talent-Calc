import { Box, Typography } from '@mui/material';
import { getPoolForTree } from '../data/points.ts';
import {FullTrack, TalentData} from "../constants/treeStructures.ts";
import { normalizeBenefits } from '../utils/normalizeBenefits';

interface SummaryBoxProps {
    allTalents: Partial<Record<string, { talents: TalentData[]; fullTracks: FullTrack[] }>>;
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
                const categoryMap: Record<string, { desc: string; values: number[] }[]> = {};

                for (const talent of talents) {
                    const spent = talentPoints[talent.tree]?.[talent.name] || 0;
                    if (spent === 0) continue;

                    const normalized = normalizeBenefits(talent.benefits ?? []);
                    const tier = normalized[spent - 1] ?? [];

                    for (const benefit of tier) {
                        const { value, desc, category } = benefit;
                        const categoryKey = category ?? "Uncategorized";


                        if (!categoryMap[categoryKey]) categoryMap[categoryKey] = [];

                        const existing = categoryMap[categoryKey].find(b => b.desc === desc);
                        if (existing) {
                            existing.values.push(value);
                        } else {
                            categoryMap[categoryKey].push({ desc, values: [value] });
                        }

                    }
                }

                return (
                    <Box key={poolName} sx={{ mb: 2 }}>
                        {multiplePools && (
                            <Typography variant="subtitle2" sx={{ color: '#ffba27', fontWeight: 'bold', mb: 1 }}>
                                {poolName}
                            </Typography>
                        )}

                        {Object.entries(categoryMap)
                            .sort(([a], [b]) => {
                                if (a === "Flag") return 1;
                                if (b === "Flag") return -1;
                                return a.localeCompare(b);
                            })
                            .map(([category, benefits]) => (
                                <Box key={category} sx={{ mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ color: '#999', fontWeight: 600 }}>
                                    {category}
                                </Typography>
                                {benefits.map(({ desc, values }, idx) => {
                                    const total = values.reduce((sum, v) => sum + v, 0);
                                    const formatted = desc.replace("{0}", Math.abs(total).toString());
                                    const flipped = total < 0 && desc.startsWith("+") ? formatted.replace("+", "-") : formatted;

                                    return (
                                        <Typography key={idx} variant="body2" sx={{ color: '#ccc' }}>
                                            • {flipped}
                                        </Typography>
                                    );
                                })}
                            </Box>
                        ))}

                    </Box>
                );
            })}
        </Box>
    );

}