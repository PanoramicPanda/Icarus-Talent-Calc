import {TalentData} from "../constants/treeStructures.ts";
import {Trees} from "../data/talentTreeMap.ts";

export function defineTalentTree<K extends keyof typeof Trees>(
    treeKey: K,
    talents: Omit<TalentData, "tree">[]
): TalentData[] {
    return talents.map(t => ({...t, tree: treeKey}))
}