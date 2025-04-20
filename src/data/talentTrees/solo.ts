import {Track} from "../../constants/treeStructures.ts";

import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const soloTree = {
    talents: defineTalentTree("Solo", [
        {
            name: "Marathon Runner",
            description: "Increased maximum stamina",
            rank: 1,
            prerequisites: [],
            benefits: ["+20", "+50"],
            benefitsDesc: "Maximum Stamina",
            position: [0, 1]
        },
        {
            name: "Fleet Footed",
            description: "Increased movement speed",
            rank: 1,
            prerequisites: [],
            benefits: ["%5", "+10%"],
            benefitsDesc: "Increased movement speed",
            position: [0, 4]
        },
        {
            name: "Healthy Maverick",
            description: "Increased maximum health",
            rank: 1,
            prerequisites: [],
            benefits: ["+50", "+100"],
            benefitsDesc: "Maximum Health",
            position: [0, 6]
        },
        {
            name: "Heavy Hitter",
            description: "Increased melee damage",
            rank: 1,
            prerequisites: [],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Increased melee damage",
            position: [0, 8]
        },
        {
            name: "Lightning Recovery",
            description: "Increased stamina regeneration",
            rank: 1,
            prerequisites: ["Marathon Runner"],
            benefits: ["+10%", "+20%"],
            benefitsDesc: "Stamina Regeneration",
            position: [1, 1]
        },
        {
            name: "'Tis But A Scratch",
            description: "Reduced damage from animals",
            rank: 1,
            prerequisites: ["Fleet Footed"],
            benefits: ["+5", "+10", "+15"],
            benefitsDesc: "Reduced damage from animals",
            position: [1, 3]
        },
        {
            name: "Steel Ankles",
            description: "Reduced chance of sprain from fall damage",
            rank: 1,
            prerequisites: ["Fleet Footed"],
            benefits: ["5%", "10%", "20%"],
            benefitsDesc: "Less chance of sprain from fall damage",
            position: [1, 5]
        },
        {
            name: "Bounce Back",
            description: "Increased health regeneration",
            rank: 1,
            prerequisites: ["Healthy Maverick", "Heavy Hitter"],
            benefits: ["+10%", "+20%"],
            benefitsDesc: "Health Regeneration",
            position: [1, 6]
        },
        {
            name: "Precision Logging",
            description: "Increased yield from felling trees",
            rank: 2,
            prerequisites: ["Lightning Recovery"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Yield from felling trees",
            position: [2, 0]
        },
        {
            name: "Low Maintenance",
            description: "Decreased Water, Food, and Oxygen consumption",
            rank: 2,
            prerequisites: ["Lightning Recovery", "'Tis But A Scratch"],
            benefits: ["-10%", "-20%"],
            benefitsDesc: "Consumption",
            position: [3, 2]
        },
        {
            name: "Very, Very Quiet",
            description: "-15% Perceived threat while stealthed",
            rank: 2,
            prerequisites: ["Fleet Footed"],
            benefits: ["-15%"],
            benefitsDesc: "Perceived threat while stealthed",
            position: [3, 4]
        },
        {
            name: "Sweet, Savoury, Satisfied",
            description: "+10% Food Effects Duration ",
            rank: 2,
            prerequisites: ["Bounce Back"],
            benefits: ["+10%"],
            benefitsDesc: "Food Effects Duration",
            position: [3, 5]
        },
        {
            name: "Honed Heads",
            description: "Increased Damage with Bows/Crossbows",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Damage and Reload Speed with Bows/Crossbows",
            position: [3, 7]
        },
        {
            name: "Slice and Dice",
            description: "Increased Damage with Knives",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Damage with Knives",
            position: [3, 9]
        },
        {
            name: "Miner Rewards",
            description: "Increased yield from mining ore deposits",
            rank: 2,
            prerequisites: ["Precision Logging"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Yield from mining ore deposits",
            position: [4, 0]
        },
        {
            name: "The Big Three",
            description: "Increased Yield from felling trees, mining and harvesting ",
            rank: 2,
            prerequisites: ["Miner Rewards", "Low Maintenance"],
            benefits: ["+15%"],
            benefitsDesc: "Yield from felling trees, mining and harvesting",
            position: [5, 1]
        },
        {
            name: "Pack Horse",
            description: "More Weight capacity",
            rank: 2,
            prerequisites: ["Low Maintenance", "Bounce Back"],
            benefits: ["+25%"],
            benefitsDesc: "Weight capacity",
            position: [5, 4]
        },
        {
            name: "Bring A Gun To A Gun Fight",
            description: "Increased Damage with Firearms",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Damage with Firearms",
            position: [5, 7]
        },
        {
            name: "Stick Of Destiny",
            description: "Increased Damage with Spears",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Damage with Spears",
            position: [5, 9]
        },
        {
            name: "Efficient Home Maintenance",
            description: "Increased Stamina Regeneration with a Fire Whacker Equipped",
            rank: 2,
            prerequisites: ["Bounce Back", "Pack Horse"],
            benefits: ["+5%"],
            benefitsDesc: "Staming Regeration with a Fire Whacker Equipped",
            position: [6, 6]
        },
        {
            name: "Savage Hunter I",
            description: "Increased yield from Butchering Animals and Creature Bones",
            rank: 3,
            prerequisites: ["The Big Three"],
            benefits: ["+25%", "+50%"],
            benefitsDesc: "Yield from Butchering Animals and Creature Bones",
            position: [6, 0]
        },
        {
            name: "More Than A Handful",
            description: "Increased yield from harvesting by hand",
            rank: 3,
            prerequisites: ["The Big Three"],
            benefits: ["+5%", "+10%"],
            benefitsDesc: "Yield from harvesting by hand",
            position: [6, 2]
        },
        {
            name: "Mobile Stockpile",
            description: "Reduce Carry Weight of Wood, Stone and Ores",
            rank: 3,
            prerequisites: ["Pack Horse"],
            benefits: ["-20%"],
            benefitsDesc: "Carry Weight of Wood, Stone and Ores",
            position: [6, 4]
        },
        {
            name: "Gotta Damage Fast",
            description: "Increased Damage of Crafted Hedgehogs",
            rank: 3,
            prerequisites: ["Efficient Home Maintenance"],
            benefits: ["+25%"],
            benefitsDesc: "Damage of Crafted Hedgehogs",
            position: [7, 6]
        },
        {
            name: "Health Monitor",
            description: "Can see Creature Alert Level and Health",
            rank: 3,
            prerequisites: ["Heavy Hitter"],
            benefits: ["Can see Creature Alert Level and Health"],
            position: [6, 8]
        },
        {
            name: "Savage Hunter II",
            description: "Increased yield from Skinning Leather and Skinning Fur",
            rank: 4,
            prerequisites: ["Savage Hunter I"],
            benefits: ["+25%", "+50%"],
            benefitsDesc: "Yield from Skinning Leather and Skinning Fur",
            position: [7, 0]
        },
        {
            name: "Lone Wolf",
            description: "Increased XP gain when not in a party",
            rank: 4,
            prerequisites: ["The Big Three", "Pack Horse"],
            benefits: ["+8%", "+15%"],
            benefitsDesc: "XP gain when not in a party",
            position: [7, 3]
        },
        {
            name: "Basic Move",
            description: "Thatch, Wood, Stone, and Concrete building pieces weigh less in your inventory",
            rank: 4,
            prerequisites: ["Mobile Stockpile"],
            benefits: ["-15%", "-30%"],
            benefitsDesc: "Thatch, Wood, Stone, and Concrete building pieces weight",
            position: [7, 4]
        },
    ]),
    tracks: [
        {from: "Marathon Runner", to: "Lightning Recovery"},
        {from: "Lightning Recovery", to: [1,0]},
        {from: "Lightning Recovery", to: [1,2]},
        {from: [1,0], to: "Precision Logging"},
        {from: "Precision Logging", to: "Miner Rewards"},
        {from: "Miner Rewards", to: [5,0]},
        {from: [5,0], to: "The Big Three"},
        {from: "Fleet Footed", to: [1,4]},
        {from: [1,4], to: "'Tis But A Scratch"},
        {from: [1,4], to: "Steel Ankles"},
        {from: [1,4], to: "Very, Very Quiet"},
        {from: "'Tis But A Scratch", to: [1,2]},
        {from: [1,2], to: "Low Maintenance"},
        {from: "Low Maintenance", to: [5,2]},
        {from: [5,2], to: "Low Maintenance"},
        {from: [5,2], to: [5,3]},
        {from: [5,2], to: "The Big Three"},
        {from: [5,3], to: "Pack Horse"},
        {from: [5,3], to: "Lone Wolf"},
        {from: "The Big Three", to: [6,1]},
        {from: [6,1], to: "Savage Hunter I"},
        {from: [6,1], to: "More Than A Handful"},
        {from: "Savage Hunter I", to: "Savage Hunter II"},
        {from: "Pack Horse", to: "Mobile Stockpile"},
        {from: "Mobile Stockpile", to: "Basic Move"},
        {from: "Healthy Maverick", to: "Bounce Back"}, // Fucking up
        {from: "Bounce Back", to: [3,6]},
        {from: [3,6], to: "Sweet, Savoury, Satisfied"},
        {from: [3,6], to: [5,6]},
        {from: [5,6], to: "Efficient Home Maintenance"},
        {from: "Efficient Home Maintenance", to: "Gotta Damage Fast"},
        {from: [5,6], to: "Pack Horse"},
        {from: "Heavy Hitter", to: [1,8]},
        {from: [1,8], to: "Bounce Back"},
        {from: [1,8], to: [3,8]},
        {from: [3,8], to: "Honed Heads"},
        {from: [3,8], to: "Slice and Dice"}, // Stopping Short
        {from: [3,8], to: [5,8]},
        {from: [5,8], to: "Bring A Gun To A Gun Fight"},
        {from: [5,8], to: "Stick Of Destiny"}, //Stopping Short
        {from: [5,8], to: "Health Monitor"},
    ] as Track[]
};
