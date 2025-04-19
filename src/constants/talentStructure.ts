export enum Categories {
    Survival = "Survival",
    Adventure = "Adventure",
    Habitation = "Habitation",
    Combat = "Combat",
    Solo = "Solo"
}

export interface TreeInfo {
    name: string
    category: Categories
}

export const Trees: Record<string, TreeInfo> = {
    Resources: { name: "Resources", category: Categories.Survival },
    Hunting: { name: "Hunting", category: Categories.Survival },
    CookingFarming: { name: "Cooking/Farming", category: Categories.Survival },
    Exploration: { name: "Exploration", category: Categories.Adventure },
    Husbandry: { name: "Husbandry", category: Categories.Adventure },
    Fishing: { name: "Fishing", category: Categories.Adventure },
    Repairing: { name: "Repairing", category: Categories.Habitation },
    Tools: { name: "Tools", category: Categories.Habitation },
    Building: { name: "Building", category: Categories.Habitation },
    Bows: { name: "Bows / Crossbows", category: Categories.Combat },
    Spears: { name: "Spears", category: Categories.Combat },
    Blades: { name: "Blades", category: Categories.Combat },
    Firearms: { name: "Firearms", category: Categories.Combat },
    Solo: { name: "Solo", category: Categories.Solo },
}

export interface TalentData {
    name: string
    description: string
    rank: number
    prerequisites: (string | string[])[]
    benefits: string[]
    benefitsDesc?: string
    tree: keyof typeof Trees
    position: [number, number]
}

export function defineTalentTree<K extends keyof typeof Trees>(
    treeKey: K,
    talents: Omit<TalentData, "tree">[]
): TalentData[] {
    return talents.map(t => ({ ...t, tree: treeKey }))
}
