import {Track} from "../../constants/treeStructures.ts";

import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const explorationTree = {
    talents: defineTalentTree("Exploration", [
        // Add TalentData objects here
    ]),
    tracks: [] as Track[]
};
