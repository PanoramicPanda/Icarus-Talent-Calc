import {Track} from "../../constants/treeStructures.ts";
import {defineTalentTree} from "../talentTreeMap.ts";

export const buildingTree = {
    talents: defineTalentTree("Building", [
        // Add TalentData objects here
    ]),
    tracks: [] as Track[]
};
