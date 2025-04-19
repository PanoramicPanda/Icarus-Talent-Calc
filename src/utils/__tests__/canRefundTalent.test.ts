import { canRefundTalent } from '../refund.ts';
import { TalentData } from '../../constants/talentStructure.ts';

const makeTalent = (name: string, rank: number): TalentData => ({
    name,
    description: '',
    rank,
    prerequisites: [],
    benefits: ['+1','+1','+1','+1','+1','+1','+1','+1','+1','+1','+1','+1','+1','+1'],
    position: [0, 0],
    tree: 'Resources'
});


describe('canRefundTalent', () => {
    const rank1 = makeTalent('R1-A', 1);
    const rank2 = makeTalent('R2-A', 2);
    const rank3 = makeTalent('R3-A', 3);
    const rank4 = makeTalent('R4-A', 4);

    const allTalents = [rank1, rank2, rank3, rank4];

    it('allows refunding the only talent owned', () => {
        const result = canRefundTalent(rank1, 1, { 'R1-A': 1 }, allTalents);
        expect(result).toBe(true); // Passed
    });

    it('blocks going below 4 rank 1 talents when you own a rank 2 talent', () => {
        const result = canRefundTalent(rank1, 4, { 'R1-A': 4, 'R2-A': 1 }, allTalents);
        expect(result).toBe(false); // Passed
    });

    it ('allows refunding rank 1 talent if it does not drop below threshold for owning rank 2', () => {
        const result = canRefundTalent(rank1, 5, { 'R1-A': 5, 'R2-A': 1 }, allTalents);
        expect(result).toBe(true);  // Passed
    });

    it ('allows refunding rank 1 talent if it does not drop below threshold for owning rank 3', () => {
        const result = canRefundTalent(rank1, 8, { 'R1-A': 8, 'R2-A': 1, 'R3-A': 1 }, allTalents);
        expect(result).toBe(true);  // Passed
    });

    it('blocks refunding a rank 1 talent that would drop below threshold for owning rank 2', () => {
        const result = canRefundTalent(rank1, 4, { 'R1-A': 4, 'R2-A': 2 }, allTalents);
        expect(result).toBe(false); // Passed
    });

    it('blocks refunding a rank 1 talent that would drop below threshold for owning rank 2', () => {
        const result = canRefundTalent(rank1, 1, { 'R1-A': 1, 'R2-A': 1 }, allTalents);
        expect(result).toBe(false); // Passed
    });

    it('allows refunding rank 4 if it is the only rank 4 talent', () => {
        const result = canRefundTalent(rank4, 1, { 'R4-A': 1, 'R1-A': 12 }, allTalents);
        expect(result).toBe(true); // Passed
    });

    it('blocks refunding lower-rank talent if it drops total under rank 3 threshold', () => {
        const result = canRefundTalent(rank1, 4, {
            'R4-A': 0,
            'R1-A': 4,
            'R2-A': 4,
            'R3-A': 1,
        }, allTalents);
        expect(result).toBe(false); // Passed
    });

    it('blocks refunding lower-rank talent if it drops any higher rank owned from its threshold', () => {
        const result = canRefundTalent(rank1, 4, {
            'R4-A': 1,
            'R1-A': 4,
            'R2-A': 4,
            'R3-A': 4,
        }, allTalents);
        expect(result).toBe(false); // Passed
    });

    it('allows refunding rank 1 if no talents from higher ranks are owned', () => {
        const result = canRefundTalent(rank1, 1, {
            'R1-A': 1,
            'R2-A': 0,
            'R3-A': 0,
            'R4-A': 0,
        }, allTalents);
        expect(result).toBe(true); // Passed
    });

    it('allows refunding from a higher rank', () => {
        const result = canRefundTalent(rank2, 1, {
            'R1-A': 4,
            'R2-A': 1,
            'R3-A': 0,
            'R4-A': 0,
        }, allTalents);
        expect(result).toBe(true); // Passed // 4 points below Rank 2 is enough
    });

    it('blocks refunding a point from R1 if it breaks support for R3', () => {
        const result = canRefundTalent(rank1, 8, {
            'R1-A': 8,
            'R3-A': 1,
        }, allTalents);
        expect(result).toBe(false); //Passed // R3 needs 8 points below it
    });

    it('derp', () => {
       const result = canRefundTalent(rank1, 8, {
           'R1-A': 10,
           'R2-A': 2,
           'R3-A': 2,
           'R4-A': 1,
        }, allTalents);
        expect(result).toBe(false); // Passed // R3 needs 8 points below it
    });
});
