import { FullTrack } from "../../constants/treeStructures.ts";
import { defineTalentTree } from "../../utils/defineTalentTree.ts";

export const soloTree = {
    talents: defineTalentTree("Solo", [
        {
            name: "Marathon Runner",
            description: "Increased maximum stamina",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "+20", desc: "Maximum Stamina" }],
                [{ value: "+50" }]
            ],
            position: [0, 1]
        },
        {
            name: "Fleet Footed",
            description: "Increased movement speed",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "%5", desc: "Increased movement speed" }],
                [{ value: "+10%" }]
            ],
            position: [0, 4]
        },
        {
            name: "Healthy Maverick",
            description: "Increased maximum health",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "+50", desc: "Maximum Health" }],
                [{ value: "+100" }]
            ],
            position: [0, 6]
        },
        {
            name: "Heavy Hitter",
            description: "Increased melee damage",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{ value: "+5%", desc: "Increased melee damage" }],
                [{ value: "+10%" }]
            ],
            position: [0, 8]
        },
        {
            name: "Lightning Recovery",
            description: "Increased stamina regeneration",
            rank: 1,
            prerequisites: ["Marathon Runner"],
            benefits: [
                [{ value: "+10%", desc: "Stamina Regeneration" }],
                [{ value: "+20%" }]
            ],
            position: [1, 1]
        },
        {
            name: "'Tis But A Scratch",
            description: "Reduced damage from animals",
            rank: 1,
            prerequisites: ["Fleet Footed"],
            benefits: [
                [{ value: "+5", desc: "Reduced damage from animals" }],
                [{ value: "+10" }],
                [{ value: "+15" }]
            ],
            position: [1, 3]
        },
        {
            name: "Steel Ankles",
            description: "Reduced chance of sprain from fall damage",
            rank: 1,
            prerequisites: ["Fleet Footed"],
            benefits: [
                [{ value: "5%", desc: "Less chance of sprain from fall damage" }],
                [{ value: "10%" }],
                [{ value: "20%" }]
            ],
            position: [1, 5]
        },
        {
            name: "Bounce Back",
            description: "Increased health regeneration",
            rank: 1,
            prerequisites: ["Healthy Maverick", "Heavy Hitter"],
            benefits: [
                [{ value: "+10%", desc: "Health Regeneration" }],
                [{ value: "+20%" }]
            ],
            position: [1, 6]
        },
        {
            name: "Precision Logging",
            description: "Increased yield from felling trees",
            rank: 2,
            prerequisites: ["Lightning Recovery"],
            benefits: [
                [{ value: "+5%", desc: "Yield from felling trees" }],
                [{ value: "+10%" }]
            ],
            position: [2, 0]
        },
        {
            name: "Low Maintenance",
            description: "Decreased Water, Food, and Oxygen consumption",
            rank: 2,
            prerequisites: ["Lightning Recovery", "'Tis But A Scratch"],
            benefits: [
                [
                    { value: '-10%', desc: 'Water Consumption' },
                    { value: '-10%', desc: 'Food Consumption' },
                    { value: '-10%', desc: 'Oxygen Consumption' }
                ],
                [
                    { value: '-20%', desc: 'Water Consumption' },
                    { value: '-20%', desc: 'Food Consumption' },
                    { value: '-20%', desc: 'Oxygen Consumption' }
                ]
            ],
            position: [3, 2]
        },
        {
            name: "Very, Very Quiet",
            description: "-15% Perceived threat while stealthed",
            rank: 2,
            prerequisites: ["Fleet Footed"],
            benefits: [
                [{ value: "-15%", desc: "Perceived threat while stealthed" }]
            ],
            position: [3, 4]
        },
        {
            name: "Sweet, Savoury, Satisfied",
            description: "+10% Food Effects Duration ",
            rank: 2,
            prerequisites: ["Bounce Back"],
            benefits: [
                [{ value: "+10%", desc: "Food Effects Duration" }]
            ],
            position: [3, 5]
        },
        {
            name: "Honed Heads",
            description: "Increased Damage with Bows/Crossbows",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: [
                [{ value: "+5%", desc: "Damage and Reload Speed with Bows/Crossbows" }],
                [{ value: "+10%" }]
            ],
            position: [3, 7]
        },
        {
            name: "Slice and Dice",
            description: "Increased Damage with Knives",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: [
                [{ value: "+5%", desc: "Damage with Knives" }],
                [{ value: "+10%" }]
            ],
            position: [3, 9]
        },
        {
            name: "Miner Rewards",
            description: "Increased yield from mining ore deposits",
            rank: 2,
            prerequisites: ["Precision Logging"],
            benefits: [
                [{ value: "+5%", desc: "Yield from mining ore deposits" }],
                [{ value: "+10%", desc: "Yield from mining ore deposits" }]
            ],
            position: [4, 0]
        },
        {
            name: "The Big Three",
            description: "Increased Yield from felling trees, mining and harvesting ",
            rank: 2,
            prerequisites: ["Miner Rewards", "Low Maintenance"],
            benefits: [
                [
                    { value: '+15%', desc: 'Yield from felling trees' },
                    { value: '+15%', desc: 'Yield from mining' },
                    { value: '+15%', desc: 'Yield from harvesting' }
                ]
            ],
            position: [5, 1]
        },
        {
            name: "Pack Horse",
            description: "More Weight capacity",
            rank: 2,
            prerequisites: ["Low Maintenance", "Bounce Back"],
            benefits: [
                [{ value: "+25%", desc: "Weight capacity" }]
            ],
            position: [5, 4]
        },
        {
            name: "Bring A Gun To A Gun Fight",
            description: "Increased Damage with Firearms",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: [
                [{ value: '+5%', desc: 'Damage with Firearms' }],
                [
                    { value: '+10%', desc: 'Damage with Firearms' },
                    { value: '+10%', desc: 'Reload Speed with Firearms' }
                ]
            ],
            position: [5, 7]
        },
        {
            name: "Stick Of Destiny",
            description: "Increased Damage with Spears",
            rank: 2,
            prerequisites: ["Heavy Hitter"],
            benefits: [
                [{ value: "+5%", desc: "Damage with Spears" }],
                [{ value: "+10%" }]
            ],
            position: [5, 9]
        },
        {
            name: "Efficient Home Maintenance",
            description: "Decreased stamina cost for Firewhacker use and faster repair time with hammers",
            rank: 2,
            prerequisites: ["Bounce Back", "Pack Horse"],
            benefits: [
                [
                    { value: "+5%", desc: "Staming Regeration with a Fire Whacker Equipped" },
                    { value: "-5%", desc: "Repair Tool Action Hold Time" }
                ]
            ],
            position: [6, 6]
        },
        {
            name: "Savage Hunter I",
            description: "Increased yield from Butchering Animals and Creature Bones",
            rank: 3,
            prerequisites: ["The Big Three"],
            benefits: [
                [{ value: "+25%", desc: "Yield from Butchering Animals and Creature Bones" }],
                [{ value: "+50%" }]
            ],
            position: [6, 0]
        },
        {
            name: "More Than A Handful",
            description: "Increased yield from harvesting by hand",
            rank: 3,
            prerequisites: ["The Big Three"],
            benefits: [
                [{ value: "+5%", desc: "Yield from harvesting by hand" }],
                [{ value: "+10%" }]
            ],
            position: [6, 2]
        },
        {
            name: "Mobile Stockpile",
            description: "Reduce Carry Weight of Wood, Stone and Ores",
            rank: 3,
            prerequisites: ["Pack Horse"],
            benefits: [
                [{ value: "-20%", desc: "Carry Weight of Wood, Stone and Ores" }]
            ],
            position: [6, 4]
        },
        {
            name: "Gotta Damage Fast",
            description: "Increased Damage of Crafted Hedgehogs",
            rank: 3,
            prerequisites: ["Efficient Home Maintenance"],
            benefits: [
                [{ value: "+25%", desc: "Damage of Crafted Hedgehogs" }]
            ],
            position: [7, 6]
        },
        {
            name: "Health Monitor",
            description: "Can see Creature Alert Level and Health",
            rank: 3,
            prerequisites: ["Heavy Hitter"],
            benefits: [
                [{ value: "Can see Creature Alert Level and Health" }]
            ],
            position: [6, 8]
        },
        {
            name: "Savage Hunter II",
            description: "Increased yield from Skinning Leather and Skinning Fur",
            rank: 4,
            prerequisites: ["Savage Hunter I"],
            benefits: [
                [{ value: "+25%", desc: "Yield from Skinning Leather and Skinning Fur" }],
                [{ value: "+50%" }]
            ],
            position: [7, 0]
        },
        {
            name: "Lone Wolf",
            description: "Increased XP gain when not in a party",
            rank: 4,
            prerequisites: ["The Big Three", "Pack Horse"],
            benefits: [
                [{ value: "+8%", desc: "XP gain when not in a party" }],
                [{ value: "+15%" }]
            ],
            position: [7, 3]
        },
        {
            name: "Basic Move",
            description: "Thatch, Wood, Stone, and Concrete building pieces weigh less in your inventory",
            rank: 4,
            prerequisites: ["Mobile Stockpile"],
            benefits: [
                [{ value: "-15%", desc: "Thatch, Wood, Stone, and Concrete building pieces weight" }],
                [{ value: "-30%" }]
            ],
            position: [7, 4]
        }
    ]),
    fullTracks: [
        { start: "Marathon Runner", end: "Lightning Recovery" },
        { start: "Lightning Recovery", path: [[1, 0]], end: "Precision Logging" },
        { start: "Lightning Recovery", path: [[1, 2]], end: "Low Maintenance" },

        { start: "Precision Logging", end: "Miner Rewards" },
        { start: "Miner Rewards", path: [[5, 0]], end: "The Big Three" },

        { start: "Fleet Footed", path: [[1, 4]], end: "'Tis But A Scratch" },
        { start: "Fleet Footed", path: [[1, 4]], end: "Steel Ankles" },
        { start: "Fleet Footed", end: "Very, Very Quiet" },

        { start: "'Tis But A Scratch", path: [[1, 2]], end: "Low Maintenance" },

        { start: "Low Maintenance", path: [[5, 2]], end: "The Big Three" },
        { start: "Low Maintenance", path: [[5, 2]], end: "Pack Horse" },
        { start: "Low Maintenance", path: [[5, 2], [5, 3]], end: "Lone Wolf" },

        { start: "The Big Three", path: [[5, 3]], end: "Lone Wolf" },
        { start: "The Big Three", path: [[6, 1]], end: "Savage Hunter I" },
        { start: "The Big Three", path: [[6, 1]], end: "More Than A Handful" },

        { start: "Savage Hunter I", end: "Savage Hunter II" },
        { start: "Pack Horse", end: "Mobile Stockpile" },
        { start: "Pack Horse", path: [[5, 6]], end: "Efficient Home Maintenance" },
        { start: "Mobile Stockpile", end: "Basic Move" },

        { start: "Healthy Maverick", end: "Bounce Back" },
        { start: "Bounce Back", path: [[3, 6]], end: "Sweet, Savoury, Satisfied" },
        { start: "Bounce Back", path: [[3, 6], [5, 6]], end: "Efficient Home Maintenance" },
        { start: "Bounce Back", path: [[5, 6]], end: "Pack Horse" },

        { start: "Efficient Home Maintenance", end: "Gotta Damage Fast" },

        { start: "Heavy Hitter", path: [[1, 8]], end: "Bounce Back" },
        { start: "Heavy Hitter", path: [[3, 8]], end: "Honed Heads" },
        { start: "Heavy Hitter", path: [[3, 8]], end: "Slice and Dice" },
        { start: "Heavy Hitter", path: [[5, 8]], end: "Bring A Gun To A Gun Fight" },
        { start: "Heavy Hitter", path: [[5, 8]], end: "Stick Of Destiny" },
        { start: "Heavy Hitter", end: "Health Monitor" }
    ] as FullTrack[]
};
