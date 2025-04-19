import { Box } from '@mui/material';
import { TalentData } from '../constants/talentStructure.ts';
import { Track } from '../constants/trackStructure.ts';

type Coord = [number, number];

interface TalentTrackProps {
    tracks: Track[];
    talents: TalentData[];
    talentPoints: Record<string, number>;
}

export default function TalentTrack({ tracks, talents, talentPoints }: TalentTrackProps) {
    const getTalentByName = (name: string) =>
        talents.find(t => t.name === name);

    const resolveCoord = (endpoint: string | Coord): Coord => {
        if (Array.isArray(endpoint)) return endpoint;
        return getTalentByName(endpoint)?.position ?? [0, 0];
    };

    const getCoordString = ([row, col]: Coord) => `${row},${col}`;

    const getTalentCenter = (endpoint: string | Coord): [number, number] => {
        const [row, col] = Array.isArray(endpoint)
            ? endpoint
            : getTalentByName(endpoint)?.position ?? [0, 0];

        const ICON_WIDTH = 55;
        const ICON_HEIGHT = 55;
        const CELL_WIDTH = 60;
        const CELL_HEIGHT = 100;
        const GAP = 8;

        const x = col * (CELL_WIDTH + GAP) + ICON_WIDTH / 2;
        const y = row * (CELL_HEIGHT + GAP) + ICON_HEIGHT / 2;

        return [x, y];
    };

    // 🔍 Map of all coord strings to track indices they are part of
    const coordToTrackIndices = new Map<string, number[]>();
    tracks.forEach((track, idx) => {
        const from = resolveCoord(track.from);
        const to = resolveCoord(track.to);

        const fromStr = getCoordString(from);
        const toStr = getCoordString(to);

        if (!coordToTrackIndices.has(fromStr)) coordToTrackIndices.set(fromStr, []);
        if (!coordToTrackIndices.has(toStr)) coordToTrackIndices.set(toStr, []);

        coordToTrackIndices.get(fromStr)!.push(idx);
        coordToTrackIndices.get(toStr)!.push(idx);
    });

    // 🧠 Build a list of all active talent coords to start propagation
    const activeTalentCoords = new Set<string>();
    talents.forEach(t => {
        if ((talentPoints[t.name] || 0) > 0) {
            activeTalentCoords.add(getCoordString(t.position));
        }
    });

    // 🌟 Compute all highlighted tracks via BFS
    const highlightedTrackIndices = new Set<number>();
    const visitedCoords = new Set<string>();

    const queue: string[] = [...activeTalentCoords];

    while (queue.length > 0) {
        const current = queue.shift()!;
        if (visitedCoords.has(current)) continue;
        visitedCoords.add(current);

        const neighbors = coordToTrackIndices.get(current);
        if (!neighbors) continue;

        for (const idx of neighbors) {
            const track = tracks[idx];
            const from = resolveCoord(track.from);
            const to = resolveCoord(track.to);

            const fromStr = getCoordString(from);
            const toStr = getCoordString(to);

            // Only allow propagation in the "from → to" direction
            if (current === fromStr) {
                highlightedTrackIndices.add(idx);

                const isToTalent = talents.some(t => getCoordString(t.position) === toStr);
                if (!isToTalent) {
                    queue.push(toStr);
                }
            }
        }
    }


    const drawElbowPath = (x1: number, y1: number, x2: number, y2: number): string => {
        return `M${x1},${y1} L${x2},${y1} L${x2},${y2}`;
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <svg width="100%" height="100%">
                {tracks.map((track, idx) => {
                    const fromCoord = resolveCoord(track.from);
                    const toCoord = resolveCoord(track.to);

                    const [x1, y1] = getTalentCenter(fromCoord);
                    const [x2, y2] = getTalentCenter(toCoord);

                    const strokeColor = highlightedTrackIndices.has(idx) ? '#fcea2c' : '#444';

                    return (
                        <path
                            key={idx}
                            d={drawElbowPath(x1, y1, x2, y2)}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                    );
                })}
            </svg>
        </Box>
    );
}
