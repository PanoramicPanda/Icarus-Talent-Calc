import {TalentData} from "../constants/treeStructures.ts";
import {resourcesTree} from "./talentTrees/resources.ts";
import {explorationTree} from "./talentTrees/exploration.ts";
import {huntingTree} from "./talentTrees/hunting.ts";
import {cookingFarmingTree} from "./talentTrees/cookingFarming.ts";
import {husbandryTree} from "./talentTrees/husbandry.ts";
import {fishingTree} from "./talentTrees/fishing.ts";
import {repairingTree} from "./talentTrees/reparing.ts";
import {toolsTree} from "./talentTrees/tools.ts";
import {buildingTree} from "./talentTrees/building.ts";
import {bowsCrossbowsTree} from "./talentTrees/bowsCrossbows.ts";
import {spearsTree} from "./talentTrees/spears.ts";
import {bladesTree} from "./talentTrees/blades.ts";
import {firearmsTree} from "./talentTrees/firearms.ts";
import {soloTree} from "./talentTrees/solo.ts";

export interface TreeInfo {
    name: string
    category: Categories
}


export enum Categories {
    Survival = "Survival",
    Adventure = "Adventure",
    Habitation = "Habitation",
    Combat = "Combat",
    Solo = "Solo"
}

export const Trees: Record<string, TreeInfo> = {
    Resources: {name: "Resources", category: Categories.Survival},
    Hunting: {name: "Hunting", category: Categories.Survival},
    CookingFarming: {name: "Cooking/Farming", category: Categories.Survival},
    Exploration: {name: "Exploration", category: Categories.Adventure},
    Husbandry: {name: "Husbandry", category: Categories.Adventure},
    Fishing: {name: "Fishing", category: Categories.Adventure},
    Repairing: {name: "Repairing", category: Categories.Habitation},
    Tools: {name: "Tools", category: Categories.Habitation},
    Building: {name: "Building", category: Categories.Habitation},
    BowsCrossbows: {name: "Bows/Crossbows", category: Categories.Combat},
    Spears: {name: "Spears", category: Categories.Combat},
    Blades: {name: "Blades", category: Categories.Combat},
    Firearms: {name: "Firearms", category: Categories.Combat},
    Solo: {name: "Solo", category: Categories.Solo},
}

export const talentTreeMap: Partial<Record<keyof typeof Trees, { talents: TalentData[]; tracks: any[] }>> = {
    Resources: resourcesTree,
    Hunting: huntingTree,
    CookingFarming: cookingFarmingTree,
    Exploration: explorationTree,
    Husbandry: husbandryTree,
    Fishing: fishingTree,
    Repairing: repairingTree,
    Tools: toolsTree,
    Building: buildingTree,
    BowsCrossbows: bowsCrossbowsTree,
    Spears: spearsTree,
    Blades: bladesTree,
    Firearms: firearmsTree,
    Solo: soloTree,
};