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
                [{value: "+25%", desc: "Meat Yield when Skinning"}],
            ],
            position: [0, 0],
        },
        {
            name: "Chase 'Em Down",
            description: "Increased Maximum Stamina",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: "+10", desc: "Maximum Stamina"}],
                [{value: "+25"}],
                [{value: "+40"}],
            ],
            position: [0, 2],
        },
        {
            name: "Swift Stalker",
            description: "Increased movement speed while crouching",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: "+3%", desc: "Movement Speed while Crouching"}],
                [{value: "+5%"}],
                [{value: "+10%"}],
            ],
            position: [0, 4],
        },
        {
            name: "Bone Collector",
            description: "Increased bone yield when skinning ",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: "+15%", desc: "Bone Yield when Skinning"}],
            ],
            position: [0, 6],
        },
        {
            name: "Strong Shoulders",
            description: "Increased Movement Speed while Carrying an Animal ",
            rank: 1,
            prerequisites: ["Fine Butcher I", "Chase 'Em Down"],
            benefits: [
                [{value: "+5%", desc: "Movement Speed while Carrying an Animal "}],
            ],
            position: [1, 1],
        },
        {
            name: "Leather Breakdown",
            description: "Unlocks the ability to turn leather into rope in Character Crafting menu",
            rank: 1,
            prerequisites: ["Chase 'Em Down", "Swift Stalker"],
            benefits: [
                [{value: "Unlocks the ability to turn leather into rope in Character Crafting menu"}],
            ],
            position: [1, 3],
        },
        {
            name: "Quick Getaway",
            description: "Trigger 5 seconds of increased Stamina Regeneration when Damaged",
            rank: 1,
            prerequisites: ["Swift Stalker", "Bone Collector"],
            benefits: [
                [{value: "Trigger 5 seconds of increased Stamina Regeneration when Damaged"}],
            ],
            position: [1, 5],
        },
        {
            name: "Health Bars",
            description: "Can see Creature Alert Level and Health",
            rank: 2,
            prerequisites: ["Strong Shoulders"],
            benefits: [
                [{value: "Can see Creature Alert Level and Health"}],
            ],
            position: [2, 0],
        },
        {
            name: "Without A Sound",
            description: "Decreased Perceived Threat while Stealthed ",
            rank: 2,
            prerequisites: ["Leather Breakdown", "Quick Getaway"],
            benefits: [
                [{value: "-5%", desc: "Perceived Threat while Stealthed "}],
                [{value: "-10%"}],
                [{value: "-15%"}],
            ],
            position: [2, 5],
        },
        {
            name: "Sense Small Animals",
            description: "Nearby small animals will highlight when aiming",
            rank: 2,
            prerequisites: ["Strong Shoulders"],
            benefits: [
                [{value: "Nearby small animals will highlight when aiming"}],
            ],
            position: [3, 1],
        },
        {
            name: "Trained Hunter",
            description: "Knives degrade slower when skinning",
            rank: 2,
            prerequisites: ["Leather Breakdown", "Without A Sound"],
            benefits: [
                [{value: "-10%", desc: "Knife Degradation while Skinning"}],
                [{value: "-20%"}],
                [{value: "-40%"}],
            ],
            position: [3, 3],
        },
        {
            name: "Careful Skinner",
            description: "Increased leather from skinning",
            rank: 2,
            prerequisites: ["Trained Hunter"],
            benefits: [
                [{value: "+10%", desc: "Leather from Skinning"}],
                [{value: "+20%"}],
            ],
            position: [4, 3],
        },
        {
            name: "Ghillie Armor",
            description: "Grants access to Ghillie Armor blueprints",
            rank: 3,
            prerequisites: ["Without A Sound"],
            benefits: [
                [{value: "Grants access to Ghillie Armor blueprints"}],
            ],
            position: [3, 6],
        },
        {
            name: "Sense Medium Animals",
            description: "Nearby medium animals will highlight when aiming",
            rank: 3,
            prerequisites: ["Sense Small Animals"],
            benefits: [
                [{value: "Nearby medium animals will highlight when aiming"}],
            ],
            position: [4, 1],
        },
        {
            name: "Quick Clean Up",
            description: "Increased damage against creature bones",
            rank: 3,
            prerequisites: ["Sense Medium Animals", "Careful Skinner"],
            benefits: [
                [{value: "+15%", desc: "Damage against Creature Bones"}],
                [{value: "+30%"}],
            ],
            position: [5, 2],
            imageName: 'Heavy_Hitter'
        },
        {
            name: "Fine Butcher II",
            description: "Increased meat yield when skinning ",
            rank: 3,
            prerequisites: ["Careful Skinner"],
            benefits: [
                [{value: "+10%", desc: "Meat Yield when Skinning"}],
                [{value: "+25%"}],
            ],
            position: [5, 4],
        },
        {
            name: "Bone Collector II",
            description: "Increased bone yield when skinning",
            rank: 3,
            prerequisites: ["Careful Skinner", "Quick Clean Up"],
            benefits: [
                [{value: "+8%", desc: "Bone Yield when Skinning"}],
                [{value: "+15%"}],
            ],
            position: [6, 1],
        },
        {
            name: "Chase 'Em Down II",
            description: "Increased maximum stamina ",
            rank: 3,
            prerequisites: ["Careful Skinner"],
            benefits: [
                [{value: "+10", desc: "Maximum Stamina"}],
                [{value: "+25"}],
                [{value: "+40"}],
            ],
            position: [6, 4],
            imageName: 'Chase_Em_Down'
        },
        {
            name: "Sense Megafauna",
            description: "Nearby large animals will highlight when aiming",
            rank: 4,
            prerequisites: ["Sense Medium Animals"],
            benefits: [
                [{value: "Nearby large animals will highlight when aiming"}],
            ],
            position: [5, 0],
        },
        {
            name: "Brittle Bones",
            description: "+20% chance to instantly gather bones when destroying skeletons",
            rank: 4,
            prerequisites: ["Bone Collector II"],
            benefits: [
                [{value: "+20%", desc: "Chance to instantly gather bones when destroying skeletons"}],
            ],
            position: [7, 1],
        },
        {
            name: "Big Game Hunter",
            description: "Allows you to see the location of World Bosses on the map ",
            rank: 4,
            prerequisites: ["Careful Skinner", "Ghillie Armor", "Quick Clean Up"],
            benefits: [
                [{value: "Allows you to see the location of World Bosses on the map "}],
            ],
            position: [7, 4],
        },
        {
            name: "Cold Hearted",
            description: "Double resource yield from skinning baby animals",
            rank: 4,
            prerequisites: ["Careful Skinner", "Big Game Hunter", "Quick Clean Up"],
            benefits: [
                [{value: "Double resource yield from skinning baby animals"}],
            ],
            position: [8, 3],
        },
        {
            name: "Arctic Armor",
            description: "Grants access to Arctic Armor blueprints",
            rank: 4,
            prerequisites: ["Ghillie Armor", "Big Game Hunter"],
            benefits: [
                [{value: "Grants access to Arctic Armor blueprints"}],
            ],
            position: [8, 6],
        }
    ]),
    fullTracks: [
        {start: "Fine Butcher I", path: [[1, 0]], end: "Strong Shoulders"},
        {start: "Chase 'Em Down", path: [[1, 2]], end: "Strong Shoulders"},
        {start: "Chase 'Em Down", path: [[1, 2]], end: "Leather Breakdown"},
        {start: "Swift Stalker", path: [[1, 4]], end: "Leather Breakdown"},
        {start: "Swift Stalker", path: [[1, 4]], end: "Quick Getaway"},
        {start: "Bone Collector", path: [[1, 6]], end: "Quick Getaway"},

        {start: "Strong Shoulders", path: [[2, 1]], end: "Health Bars"},
        {start: "Strong Shoulders", end: "Sense Small Animals"},

        {start: "Leather Breakdown", path: [[2, 3]], end: "Without A Sound"},
        {start: "Leather Breakdown", end: "Trained Hunter"},

        {start: "Quick Getaway", end: "Without A Sound"},
        {start: "Sense Small Animals", end: "Sense Medium Animals"},
        {start: "Trained Hunter", end: "Careful Skinner"},

        {start: "Without A Sound", path: [[2, 3]], end: "Trained Hunter"},
        {start: "Without A Sound", path: [[3, 5]], end: "Ghillie Armor"},
        {start: "Ghillie Armor", end: "Arctic Armor"},

        {start: "Sense Medium Animals", path: [[5, 1]], end: "Sense Megafauna"},
        {start: "Sense Medium Animals", path: [[5, 1]], end: "Quick Clean Up"},

        {start: "Careful Skinner", path: [[5, 3]], end: "Quick Clean Up"},
        {start: "Careful Skinner", path: [[5, 3]], end: "Fine Butcher II"},
        {start: "Careful Skinner", path: [[6, 3]], end: "Bone Collector II"},
        {start: "Careful Skinner", path: [[7, 3]], end: "Big Game Hunter"},
        {start: "Careful Skinner", path: [[6, 3]], end: "Chase 'Em Down II"},
        {start: "Careful Skinner", end: "Cold Hearted"},

        {start: "Bone Collector II", end: "Brittle Bones"},

        {start: "Quick Clean Up", path: [[5, 3], [7, 3]], end: "Big Game Hunter"},
        {start: "Quick Clean Up", path: [[5, 3]], end: "Cold Hearted"},
        {start: "Quick Clean Up", path: [[5, 3], [6, 3]], end: "Bone Collector II"},

        {start: "Ghillie Armor", path: [[7, 6]], end: "Big Game Hunter"},
        {start: "Big Game Hunter", path: [[7, 3]], end: "Cold Hearted"},
        {start: "Big Game Hunter", path: [[7, 6]], end: "Arctic Armor"}

    ] as FullTrack[]

};
