import { canRefundTalent, prerequisiteMet } from '../refund.ts';
import { getGateRequirement } from '../../data/ranks.ts';

import {TalentData} from "../../constants/treeStructures.ts";

const makeTalent = (name: string, rank: number): TalentData => ({
    name,
    description: '',
    rank,
    prerequisites: [],
    benefits: new Array(14).fill([{ value: '+1' }]),
    position: [0, 0],
    tree: 'Resources'
});


describe('canRefundTalent', () => {
    const rank1 = makeTalent('R1-A', 1);
    const rank2 = makeTalent('R2-A', 2);
    const rank3 = makeTalent('R3-A', 3);
    const rank4 = makeTalent('R4-A', 4);

    const gate2 = getGateRequirement(2);
    const gate3 = getGateRequirement(3);
    const gate4 = getGateRequirement(4);

    const allTalents = [rank1, rank2, rank3, rank4];

    it('allows refunding the only talent owned', () => {
        const result = canRefundTalent(rank1, 1, { 'Resources': {'R1-A': 1} }, allTalents);
        expect(result).toBe(true);
    });

    it('blocks going below 4 rank 1 talents when you own a rank 2 talent', () => {
        const result = canRefundTalent(rank1, gate2, { 'Resources': {'R1-A': 4, 'R2-A': 1 }}, allTalents);
        expect(result).toBe(false);
    });

    it ('allows refunding rank 1 talent if it does not drop below threshold for owning rank 2', () => {
        const result = canRefundTalent(rank1, gate2+1, { 'Resources': {'R1-A': gate2+1, 'R2-A': 1 }}, allTalents);
        expect(result).toBe(true);
    });

    it ('allows refunding rank 1 talent if it does not drop below threshold for owning rank 3', () => {
        const result = canRefundTalent(rank1, gate3, { 'Resources': {'R1-A': gate3, 'R2-A': 1, 'R3-A': 1 }}, allTalents);
        expect(result).toBe(true);
    });

    it('blocks refunding a rank 1 talent that would drop below threshold for owning rank 2', () => {
        const result = canRefundTalent(rank1, gate2, { 'Resources': {'R1-A': gate2, 'R2-A': 2 }}, allTalents);
        expect(result).toBe(false);
    });

    it('blocks refunding a rank 1 talent that would drop below threshold for owning rank 2', () => {
        const result = canRefundTalent(rank1, gate2, { 'Resources': {'R1-A': 1, 'R2-A': 1 }}, allTalents);
        expect(result).toBe(false);
    });

    it('allows refunding rank 4 if it is the only rank 4 talent', () => {
        const result = canRefundTalent(rank4, 1, { 'Resources': {'R4-A': 1, 'R1-A': gate4 }}, allTalents);
        expect(result).toBe(true);
    });

    it('blocks refunding lower-rank talent if it drops total under rank 3 threshold', () => {
        const result = canRefundTalent(rank1, gate2, { 'Resources': {
            'R4-A': 0,
            'R1-A': gate2,
            'R2-A': gate2,
            'R3-A': 1,
        }}, allTalents);
        expect(result).toBe(false);
    });

    it('blocks refunding lower-rank talent if it drops any higher rank owned from its threshold', () => {
        const result = canRefundTalent(rank1, gate2, { 'Resources': {
            'R4-A': 1,
            'R1-A': gate2,
            'R2-A': gate2,
            'R3-A': gate2,
        }}, allTalents);
        expect(result).toBe(false);
    });

    it('allows refunding rank 1 if no talents from higher ranks are owned', () => {
        const result = canRefundTalent(rank1, 1, { 'Resources': {
            'R1-A': 1,
            'R2-A': 0,
            'R3-A': 0,
            'R4-A': 0,
        }}, allTalents);
        expect(result).toBe(true);
    });

    it('allows refunding from a higher rank', () => {
        const result = canRefundTalent(rank2, 1, { 'Resources': {
            'R1-A': gate2,
            'R2-A': 1,
            'R3-A': 0,
            'R4-A': 0,
        }}, allTalents);
        expect(result).toBe(true);
    });

    it('blocks refunding a point from R1 if it breaks support for R3', () => {
        const result = canRefundTalent(rank1, gate3, { 'Resources': {
            'R1-A': gate3,
            'R3-A': 1,
        }}, allTalents);
        expect(result).toBe(false);
    });

    it('Cannot refund below Rank 3 talent threshold', () => {
       const result = canRefundTalent(rank1, gate3, { 'Resources': {
           'R1-A': gate3,
           'R2-A': 0,
           'R3-A': 2,
           'R4-A': 1,
        }}, allTalents);
        expect(result).toBe(false);
    });
});


describe('prerequisiteMet', () => {
    const treeKey = 'Resources';

    it('returns true if a single prerequisite is met', () => {
        const prerequisites = ['TalentA'];
        const talentPoints = {
            Resources: {
                TalentA: 1,
            },
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(true);
    });

    it('returns false if a single prerequisite is not met', () => {
        const prerequisites = ['TalentA'];
        const talentPoints = {
            Resources: {
                TalentA: 0,
            },
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(false);
    });

    it('returns true if at least one OR prerequisite is met', () => {
        const prerequisites = ['TalentA', 'TalentB'];
        const talentPoints = {
            Resources: {
                TalentB: 1,
            },
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(true);
    });

    it('returns false if no OR prerequisites are met', () => {
        const prerequisites = ['TalentA', 'TalentB'];
        const talentPoints = {
            Resources: {},
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(false);
    });

    it('returns true if an AND clause is fully satisfied', () => {
        const prerequisites = [['TalentA', 'TalentB']];
        const talentPoints = {
            Resources: {
                TalentA: 1,
                TalentB: 1,
            },
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(true);
    });

    it('returns false if an AND clause is only partially satisfied', () => {
        const prerequisites = [['TalentA', 'TalentB']];
        const talentPoints = {
            Resources: {
                TalentA: 1,
                TalentB: 0,
            },
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(false);
    });

    it('returns true if any one clause (including AND groups) is satisfied', () => {
        const prerequisites = [['TalentA', 'TalentB'], 'TalentC'];
        const talentPoints = {
            Resources: {
                TalentC: 1,
            },
        };

        expect(prerequisiteMet(prerequisites, talentPoints, treeKey)).toBe(true);
    });
});
