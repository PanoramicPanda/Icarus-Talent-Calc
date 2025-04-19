import {Track} from "../../constants/treeStructures.ts";

import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const soloTree = {
    talents: defineTalentTree("Solo", [
        // Add TalentData objects here
    ]),
    tracks: [] as Track[]
};
