import { Trees, TalentData } from "../constants/talentStructure.ts";

import { resourcesTree } from "./talentTrees/resources.ts";
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