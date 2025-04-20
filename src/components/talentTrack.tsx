import { Box } from '@mui/material';
import {TalentData, Track} from '../constants/treeStructures.ts';

type Coord = [number, number];

interface TalentTrackProps {
    tracks: Track[];
    talents: TalentData[];
    talentPoints: Record<string, Record<string, number>>;
    treeKey: string;
}

export default function TalentTrack({ tracks, talents, talentPoints, treeKey }: TalentTrackProps) {
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

    const treeTalentPoints = talentPoints[treeKey] || {};
    const activeTalentCoords = new Set<string>();
    talents.forEach(t => {
        if ((treeTalentPoints[t.name] || 0) > 0) {
            activeTalentCoords.add(getCoordString(t.position));
        }
    });

    const highlightedTrackIndices = new Set<number>();
    const visitedCoords = new Set<string>();
    const queue: string[] = [...activeTalentCoords];
    const talentNameToCoord: Record<string, [number, number]> = {};
    for (const talent of talents) {
        talentNameToCoord[talent.name] = talent.position;
    }

    const pointsSpentInTree = Object.values(treeTalentPoints).reduce((sum, pts) => sum + pts, 0);

    const isTalentReachable = (talent: TalentData): boolean => {
        const requiredPoints = (talent.rank - 1) * 4;
        if (pointsSpentInTree < requiredPoints) return false;

        const pointsInTree = talentPoints[treeKey] || {};
        const prereqs = talent.prerequisites ?? [];

        return prereqs.length === 0 || prereqs.some(req => {
            if (typeof req === 'string') {
                return (pointsInTree[req] || 0) > 0;
            } else if (Array.isArray(req)) {
                return req.every(inner => (pointsInTree[inner] || 0) > 0);
            }
            return false;
        });
    };

    const leadsToReachableTalent = (coordStr: string, visited = new Set<string>()): boolean => {
        if (visited.has(coordStr)) return false;
        visited.add(coordStr);

        const talent = talents.find(t => getCoordString(t.position) === coordStr);
        const pointsInTree = talentPoints[treeKey] || {};
        if (talent) {
            const owned = (pointsInTree[talent.name] || 0) > 0;
            if (owned || isTalentReachable(talent)) {
                return true;
            } else {
                return false; // 🧠 KEY CHANGE: don't walk past a valid but unowned talent
            }
        }

        const downstreamTracks = tracks.filter(t => getCoordString(resolveCoord(t.from)) === coordStr);
        for (const t of downstreamTracks) {
            const nextCoord = getCoordString(resolveCoord(t.to));
            if (leadsToReachableTalent(nextCoord, visited)) return true;
        }

        return false;
    };



    while (queue.length > 0) {
        const current = queue.shift()!;
        visitedCoords.add(current);

        for (let idx = 0; idx < tracks.length; idx++) {
            const { from, to } = tracks[idx];
            const fromStr = getCoordString(typeof from === 'string' ? talentNameToCoord[from] : from);
            const toStr = getCoordString(typeof to === 'string' ? talentNameToCoord[to] : to);

            if (current === fromStr && !highlightedTrackIndices.has(idx)) {
                // Only highlight if `toStr` eventually leads to something valid
                if (leadsToReachableTalent(toStr)) {
                    highlightedTrackIndices.add(idx);
                    if (!visitedCoords.has(toStr)) {
                        queue.push(toStr);
                    }
                }
            }
        }
    }

    const drawElbowPath = (x1: number, y1: number, x2: number, y2: number): string => {
        return `M${x1},${y1} L${x2},${y1} L${x2},${y2}`;
    };

    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <svg width="100%" height="100%">
                {tracks.map((track, idx) => {
                    const fromCoord = resolveCoord(track.from);
                    const toCoord = resolveCoord(track.to);
                    const [x1, y1] = getTalentCenter(fromCoord);
                    const [x2, y2] = getTalentCenter(toCoord);
                    const strokeColor = highlightedTrackIndices.has(idx) ? '#ffffff' : '#444';

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

