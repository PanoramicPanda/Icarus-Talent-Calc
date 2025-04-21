import {FullTrack} from "../../constants/treeStructures.ts";

import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const buildingTree = {
    talents: defineTalentTree("Building", [
        // Add TalentData objects here
    ]),
    fullTracks: [] as FullTrack[]
};
