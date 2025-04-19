import {Track} from "../../constants/treeStructures.ts";
import {defineTalentTree} from "../talentTreeMap.ts";

export const explorationTree = {
    talents: defineTalentTree("Exploration", [
        // Add TalentData objects here
    ]),
    tracks: [] as Track[]
};
