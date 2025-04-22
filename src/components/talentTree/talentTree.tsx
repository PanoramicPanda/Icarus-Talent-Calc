import {Trees} from "../../data/talentTreeMap.ts";
import {TalentData} from "../../constants/treeStructures.ts";
import {prerequisiteMet} from "../../utils/refund.ts";
import {useRef} from "react";
import {Box} from "@mui/material";
import TalentTrack from "./talentTrack.tsx";
import Talent from "../talent/talent.tsx";
import {getGateRequirement} from "../../data/ranks.ts";
import {TREE_COLUMN_WIDTH, TREE_ROW_HEIGHT} from "../../data/dimension.ts";

export function TalentTree({
                               treeKey,
                               talents,
                               fullTracks,
                               pointsSpent,
                               talentPoints,
                               onRankChange,
                               onShowError,
                               blockingTalents,
                               setBlockingTalents
                           }: {
    treeKey: keyof typeof Trees,
    talents: TalentData[],
    fullTracks: any[],
    pointsSpent: number,
    talentPoints: Record<string, Record<string, number>>,
    onRankChange: (talentName: string, rank: number) => void,
    onShowError: (message: string) => void;
    blockingTalents: Set<string>;
    setBlockingTalents: (talents: Set<string>) => void;
}) {

    const canAccessTalent = (talent: TalentData): boolean => {
        const requiredPoints = getGateRequirement(talent.rank);
        const hasEnoughPoints = pointsSpent >= requiredPoints;

        const hasMetPrereqs =
            talent.prerequisites.length === 0 ||
            prerequisiteMet(talent.prerequisites, talentPoints, treeKey);

        return hasEnoughPoints && hasMetPrereqs;
    };


    // Determine grid size
    const maxRow = Math.max(...talents.map(t => t.position[0]));
    const maxCol = Math.max(...talents.map(t => t.position[1]));

    // Refs for layout mapping
    const gridRef = useRef<HTMLDivElement>(null);
    const tileRefs = useRef<Record<string, HTMLDivElement | null>>({});

    return (
        <Box sx={{position: 'relative'}} ref={gridRef}>
            <TalentTrack
                fullTracks={fullTracks}
                talents={talents}
                talentPoints={talentPoints}
                treeKey={treeKey}
            />


            <div className="talent-tree-grid" style={{
                display: 'grid',
                gridTemplateRows: `repeat(${maxRow + 1}, 100px)`,
                gridTemplateColumns: `repeat(${maxCol + 1}, 60px)`,
                gap: '8px'
            }}>
                {talents.map(talent => {
                    const currentPoints = talentPoints[treeKey]?.[talent.name] || 0;
                    const maxPoints = talent.benefits.length;
                    const isUnlocked = canAccessTalent(talent);
                    // const [row, col] = talent.position;

                    return (
                        <div
                            key={talent.name}
                            ref={(el) => {
                                tileRefs.current[talent.name] = el
                            }}
                            style={{
                                position: 'absolute',
                                top: `${talent.position[0] * TREE_ROW_HEIGHT}px`,
                                left: `${talent.position[1] * TREE_COLUMN_WIDTH}px`,
                            }}
                        >
                            <Talent
                                talent={talent}
                                treeKey={treeKey}
                                currentPoints={currentPoints}
                                maxPoints={maxPoints}
                                pointsSpent={pointsSpent}
                                isUnlocked={isUnlocked}
                                allTalents={talents}
                                talentPoints={talentPoints}
                                onRankChange={onRankChange}
                                onShowError={onShowError}
                                blockingTalents={blockingTalents}
                                setBlockingTalents={setBlockingTalents}
                            />
                        </div>
                    );
                })}
            </div>
        </Box>
    );
}