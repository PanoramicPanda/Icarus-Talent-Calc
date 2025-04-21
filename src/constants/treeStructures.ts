import {Trees} from "../data/talentTreeMap.ts";

export type TrackEndpoint = string | [number, number]

export interface FullTrack {
    start: string;                     // Name of the starting talent
    end: string;                       // Name of the ending talent
    path?: [number, number][];         // Optional path override
}

export interface TalentData {
    name: string
    description: string
    rank: number
    prerequisites: (string | string[])[]
    benefits: { value: string; desc?: string }[][];
    tree: keyof typeof Trees
    position: [number, number],
    imageName?: string
}