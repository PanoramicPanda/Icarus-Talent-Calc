import {
    exportToJson,
    exportToQueryParam,
    importFromQueryParam,
    isVersionMismatch,
    calculatePointsSpent,
} from '../exportImport';
import { GAME_VERSION } from '../../constants/gameVersion';

describe('Export/Import Utilities', () => {
    const sampleTalentPoints = {
        Resources: {
            'Lumber Yield': 1,
            'Wood Breakdown': 2,
        },
        Combat: {
            'Sharpshooter': 1
        }
    };

    it('exports to JSON correctly', () => {
        const json = exportToJson(sampleTalentPoints);
        const parsed = JSON.parse(json);
        expect(parsed).toHaveProperty('gameVersion', GAME_VERSION);
        expect(parsed).toHaveProperty('talentPoints');
        expect(parsed.talentPoints.Resources['Lumber Yield']).toBe(1);
    });

    it('exports and imports via query param without data loss', () => {
        const param = exportToQueryParam(sampleTalentPoints);
        const imported = importFromQueryParam(param);
        expect(imported).not.toBeNull();
        expect(imported?.gameVersion).toBe(GAME_VERSION);
        expect(imported?.talentPoints.Combat['Sharpshooter']).toBe(1);
    });

    it('returns null for invalid compressed data', () => {
        const result = importFromQueryParam('notAValidParam');
        expect(result).toBeNull();
    });

    it('detects version mismatches correctly', () => {
        expect(isVersionMismatch('1.0.0')).toBe(GAME_VERSION !== '1.0.0');
        expect(isVersionMismatch(GAME_VERSION)).toBe(false);
    });

    it('calculates points spent correctly', () => {
        const spent = calculatePointsSpent(sampleTalentPoints);
        expect(spent.Resources).toBe(3); // 1 + 2
        expect(spent.Combat).toBe(1);
    });
});