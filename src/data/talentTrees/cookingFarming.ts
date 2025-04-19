import {Track} from "../../constants/treeStructures.ts";

import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const cookingFarmingTree = {
    talents: defineTalentTree("Cooking/Farming", [
        // Add TalentData objects here
    ]),
    tracks: [] as Track[]
};
