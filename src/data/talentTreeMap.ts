import { resourcesTalents} from "./talents/resources.ts";
import { resourcesTreeTracks} from "./tracks/resources.ts";
import { Trees, TalentData } from "../constants/talentStructure.ts";

export const talentTreeMap: Partial<Record<keyof typeof Trees, { talents: TalentData[]; tracks: any[] }>> = {
    Resources: {
        talents: resourcesTalents,
        tracks: resourcesTreeTracks,
    },
}