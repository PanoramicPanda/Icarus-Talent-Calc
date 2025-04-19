import { Trees, TalentData } from "../constants/talentStructure.ts";

import { resourcesTree } from "./trees/resources.ts";

export const talentTreeMap: Partial<Record<keyof typeof Trees, { talents: TalentData[]; tracks: any[] }>> = {
    Resources: resourcesTree,
};