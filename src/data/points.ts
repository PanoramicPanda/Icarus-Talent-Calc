import {Trees} from "./talentTreeMap.ts";

export type TalentPool = 'General' | 'Solo' | 'Pets' | 'Mounts';

export const pointPools: Record<TalentPool, {
    cap: number;
    trees: (keyof typeof Trees)[];
    perTreeCap?: boolean;
}> = {
    General: {
        cap: 90,
        trees: [
            'Resources', 'Hunting', 'Cooking',
            'Exploration', 'Husbandry', 'Fishing',
            'Repairing', 'Tools', 'Building',
            'Bows', 'Spears', 'Blades', 'Firearms'
        ]
    },
    Solo: {
        cap: 30,
        trees: ['Solo']
    },
    Pets: {
        cap: 26,
        trees: [
            'Boar', 'Cat', 'Chicken', 'Cow',
            'Hyena', 'Dog', 'Rooster',
            'Sheep', 'Snow_Wolf', 'Wolf'
        ],
        perTreeCap: true
    },
    Mounts: {
        cap: 51,
        trees:[
            'Arctic_Moa', 'Blueback', 'Buffalo',
            'Horse', 'Moa', 'Stryder', 'Terrenus',
            'Tusker', 'Shaggy_Zebra', 'Zebra'
        ],
        perTreeCap: true
    }
};

export function getPoolForTree(tree: keyof typeof Trees): TalentPool | null {
    for (const pool of Object.keys(pointPools) as TalentPool[]) {
        if (pointPools[pool].trees.includes(tree)) return pool;
    }
    return null;
}

export function isPoolPerTreeCap(pool: TalentPool| null): boolean {
    if (!pool) return false;
    return pointPools[pool].perTreeCap || false;
}
