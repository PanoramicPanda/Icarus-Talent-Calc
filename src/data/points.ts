import {Trees} from "../constants/talentStructure.ts";

export type TalentPool = 'General' | 'Solo';

export const pointPools: Record<TalentPool, {
    cap: number;
    trees: (keyof typeof Trees)[];
}> = {
    General: {
        cap: 90,
        trees: [
            'Resources', 'Hunting', 'CookingFarming',
            'Exploration', 'Husbandry', 'Fishing',
            'Repairing', 'Tools', 'Building',
            'Bows/Crossbows', 'Spears', 'Blades', 'Firearms'
        ]
    },
    Solo: {
        cap: 30,
        trees: ['Solo']
    }
};

export function getPoolForTree(tree: keyof typeof Trees): TalentPool | null {
    for (const pool of Object.keys(pointPools) as TalentPool[]) {
        if (pointPools[pool].trees.includes(tree)) return pool;
    }
    return null;
}
