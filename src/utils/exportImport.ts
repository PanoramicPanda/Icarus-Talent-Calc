import { GAME_VERSION } from '../constants/gameVersion';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { talentTreeMap } from '../data/talentTreeMap';

export interface ExportedTalentState {
    gameVersion: string;
    talentPoints: Record<string, Record<string, number>>; // treeKey -> talentName -> points
}

// Converts flat structure to nested by tree
export function nestTalentPoints(talentPoints: Record<string, number>): Record<string, Record<string, number>> {
    const nested: Record<string, Record<string, number>> = {};

    for (const [name, points] of Object.entries(talentPoints)) {
        // You must have a global talent lookup function
        const talent = findTalentByName(name);
        if (!talent) continue;

        if (!nested[talent.tree]) nested[talent.tree] = {};
        nested[talent.tree][name] = points;
    }

    return nested;
}

// Export to JSON string
export function exportToJson(talentPoints: Record<string, Record<string, number>>): string {
    const exportData: ExportedTalentState = {
        gameVersion: GAME_VERSION,
        talentPoints
    };
    return JSON.stringify(exportData, null, 2);
}

// Export to compressed query param
export function exportToQueryParam(talentPoints: Record<string, Record<string, number>>): string {
    const data: ExportedTalentState = {
        gameVersion: GAME_VERSION,
        talentPoints
    };
    const json = JSON.stringify(data);
    return compressToEncodedURIComponent(json);
}


// Import from compressed query param
export function importFromQueryParam(param: string): ExportedTalentState | null {
    try {
        const json = decompressFromEncodedURIComponent(param);
        return json ? JSON.parse(json) : null;
    } catch {
        return null;
    }
}

// Compare version
export function isVersionMismatch(importedVersion: string): boolean {
    return importedVersion !== GAME_VERSION;
}

// Check if talent exists in the talent tree map
function findTalentByName(name: string) {
    for (const entry of Object.values(talentTreeMap)) {
        if (!entry) continue;
        const found = entry.talents.find(t => t.name === name);
        if (found) return found;
    }
    return null;
}

export function calculatePointsSpent(talentPoints: Record<string, Record<string, number>>): Record<string, number> {
    const spent: Record<string, number> = {};
    for (const [treeKey, talents] of Object.entries(talentPoints)) {
        spent[treeKey] = Object.values(talents).reduce((sum, pts) => sum + pts, 0);
    }
    return spent;
}