import {Trees} from "../data/talentTreeMap.ts";

export type TrackEndpoint = string | [number, number]

export interface Track {
    from: TrackEndpoint
    to: TrackEndpoint
}

export interface TalentData {
    name: string
    description: string
    rank: number
    prerequisites: (string | string[])[]
    benefits: string[]
    benefitsDesc?: string
    tree: keyof typeof Trees
    position: [number, number],
    imageName?: string
}