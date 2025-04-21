import {FullTrack} from "../../constants/treeStructures.ts";

import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const huntingTree = {
    talents: defineTalentTree("Hunting", [
        {
            name: "Fine Butcher I",
            description: "Increased yield from skinning",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "+25%", desc: "Meat Yield when Skinning" }],
            ],
            position: [0, 0],
        },
        {
            name: "Chase 'Em Down",
            description: "",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [0, 2],
        },
        {
            name: "Swift Stalker",
            description: "",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [0, 4],
        },
        {
            name: "Bone Collector",
            description: "",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [0, 6],
        },
        {
            name: "Strong Shoulders",
            description: "",
            rank: 1,
            prerequisites: ["Fine Butcher I", "Chase 'Em Down"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [1, 1],
        },
        {
            name: "Leather Breakdown",
            description: "",
            rank: 1,
            prerequisites: ["Chase 'Em Down", "Swift Stalker"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [1, 3],
        },
        {
            name: "Quick Getaway",
            description: "",
            rank: 1,
            prerequisites: ["Swift Stalker", "Bone Collector"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [1, 5],
        },
        {
            name: "Health Bars",
            description: "",
            rank: 2,
            prerequisites: ["Strong Shoulders"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [2, 0],
        },
        {
            name: "Without A Sound",
            description: "",
            rank: 2,
            prerequisites: ["Leather Breakdown", "Quick Getaway"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [2, 5],
        },
        {
            name: "Sense Small Animals",
            description: "",
            rank: 2,
            prerequisites: ["Strong Shoulders"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [3, 1],
        },
        {
            name: "Trained Hunter",
            description: "",
            rank: 2,
            prerequisites: ["Leather Breakdown", "Without A Sound"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [3, 3],
        },
        {
            name: "Careful Skinner",
            description: "",
            rank: 2,
            prerequisites: ["Trained Hunter"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [4, 3],
        },
        {
            name: "Ghillie Armor",
            description: "",
            rank: 3,
            prerequisites: ["Without A Sound"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [3, 6],
        },
        {
            name: "Sense Medium Animals",
            description: "",
            rank: 3,
            prerequisites: ["Sense Small Animals"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [4, 1],
        },
        {
            name: "Quick Clean Up",
            description: "",
            rank: 3,
            prerequisites: ["Sense Medium Animals", "Careful Skinner"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [5, 2],
            imageName: 'Heavy_Hitter'
        },
        {
            name: "Fine Butcher II",
            description: "",
            rank: 3,
            prerequisites: ["Careful Skinner"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [5, 4],
        },
        {
            name: "Bone Collector II",
            description: "",
            rank: 3,
            prerequisites: ["Careful Skinner", "Quick Clean Up"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [6, 1],
        },
        {
            name: "Chase 'Em Down II",
            description: "",
            rank: 3,
            prerequisites: ["Careful Skinner"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [6, 4],
            imageName: 'Chase_Em_Down'
        },
        {
            name: "Sense Megafauna",
            description: "",
            rank: 4,
            prerequisites: ["Sense Medium Animals"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [5, 0],
        },
        {
            name: "Brittle Bones",
            description: "",
            rank: 4,
            prerequisites: ["Bone Collector II"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [7, 1],
        },
        {
            name: "Big Game Hunter",
            description: "",
            rank: 4,
            prerequisites: ["Careful Skinner", "Ghillie Armor", "Quick Clean Up"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [7, 4],
        },
        {
            name: "Cold Hearted",
            description: "",
            rank: 4,
            prerequisites: ["Careful Skinner", "Big Game Hunter", "Quick Clean Up"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [8, 3],
        },
        {
            name: "Arctic Armor",
            description: "",
            rank: 4,
            prerequisites: ["Ghillie Armor", "Big Game Hunter"],
            benefits: [
                [{ value: "", desc: "" }],
            ],
            position: [8, 6],
        }
    ]),
    fullTracks: [
        { start: "Fine Butcher I", end: "Strong Shoulders", path: [[1, 0]] },
        { start: "Chase 'Em Down", end: "Strong Shoulders", path: [[1, 2]] },
        { start: "Chase 'Em Down", end: "Leather Breakdown", path: [[1, 2]] },
        { start: "Swift Stalker", end: "Leather Breakdown", path: [[1, 4]] },
        { start: "Swift Stalker", end: "Quick Getaway", path: [[1, 4]] },
        { start: "Bone Collector", end: "Quick Getaway", path: [[1, 6]] },

        { start: "Strong Shoulders", end: "Health Bars", path: [[2, 2]] },
        { start: "Strong Shoulders", end: "Sense Small Animals", path: [[2, 2]] },

        { start: "Leather Breakdown", end: "Without A Sound", path: [[2, 3]] },
        { start: "Leather Breakdown", end: "Trained Hunter", path: [[2, 3]] },

        { start: "Quick Getaway", end: "Without A Sound" },
        { start: "Sense Small Animals", end: "Sense Medium Animals" },
        { start: "Trained Hunter", end: "Careful Skinner" },

        { start: "Without A Sound", end: "Ghillie Armor", path: [[3, 5]] },
        { start: "Ghillie Armor", end: "Arctic Armor", path: [[7, 6]] },

        { start: "Sense Medium Animals", end: "Sense Megafauna", path: [[5, 1]] },
        { start: "Sense Medium Animals", end: "Quick Clean Up", path: [[5, 1]] },

        { start: "Careful Skinner", end: "Quick Clean Up", path: [[5, 3]] },
        { start: "Careful Skinner", end: "Fine Butcher II", path: [[5, 3]] },

        { start: "Careful Skinner", end: "Bone Collector II", path: [[5, 3], [6, 3]] },
        { start: "Bone Collector II", end: "Brittle Bones" },
        { start: "Careful Skinner", end: "Chase 'Em Down II", path: [[5, 3], [6, 3]] },

        { start: "Careful Skinner", end: "Big Game Hunter", path: [[5, 3], [6, 3], [7, 3]] },
        { start: "Quick Clean Up", end: "Big Game Hunter", path: [[5, 1], [7, 3]] },
        { start: "Big Game Hunter", end: "Cold Hearted", path: [[7, 3]] },
        { start: "Big Game Hunter", end: "Arctic Armor", path: [[7, 6]] }
    ] as FullTrack[]

};
