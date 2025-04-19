import {defineTalentTree} from "../../constants/talentStructure.ts";

export const resourcesTalents = defineTalentTree("Resources", [
    {
        name: "Lumber Yield",
        description: "Increased yield from felling trees",
        rank: 1,
        prerequisites: [],
        benefits: ["+5%", "+10%", "+20%"],
        benefitsDesc: "Yield from felling trees",
        position: [0, 0]
    },
    {
        name: "Skilled Picker",
        description: "Increased yield from harvesting by hand",
        rank: 1,
        prerequisites: [],
        benefits: ["+5%", "+10%", "+15%", "+20%"],
        benefitsDesc: "Yield from harvesting by hand",
        position: [0, 2]
    },
    {
        name: "Rock Star",
        description: "Increased yield from mining stone",
        rank: 1,
        prerequisites: [],
        benefits: ["+10%", "+15%", "+20%"],
        benefitsDesc: "Yield from mining stone",
        position: [0, 4]
    },
    {
        name: "Dense Packing I",
        description: "Increased inventory weight capacity",
        rank: 1,
        prerequisites: [],
        benefits: ["+5%", "+10%", "+20%"],
        benefitsDesc: "Weight Capacity",
        position: [0, 6]
    },
    {
        name: "Wood Breakdown",
        description: "Unlocks the ability to turn wood into sticks",
        rank: 2,
        prerequisites: ["Lumber Yield"],
        benefits: ["Ability to turn wood into sticks"],
        position: [1, 0]
    },
    {
        name: "All The Good Stuff",
        description: "Chance to receive secondary resources from bushes",
        rank: 2,
        prerequisites: ["Skilled Picker"],
        benefits: ["10%", "20%", "30%"],
        benefitsDesc: "Chance to receive secondary resources from bushes",
        position: [1, 2]
    },
    {
        name: "Carry On",
        description: "Reduced encumbrance penalty",
        rank: 1,
        prerequisites: ["Dense Packing I"],
        benefits: ["-3%", "-8%", "-15%", "-25%"],
        benefitsDesc: "Encumbrance penalty",
        position: [1, 5]
    },
    {
        name: "Oxygen Thief",
        description: "Increased yield from Mining Oxite",
        rank: 2,
        prerequisites: ["Rock Star"],
        benefits: ["+10%", "+15%", "+20%"],
        benefitsDesc: "Yield from Mining Oxite",
        position: [2, 3]
    },
    {
        name: "Waste Not",
        description: "Receive stone in addition to resources when mining ore deposits",
        rank: 2,
        prerequisites: ["Rock Star"],
        benefits: ["5%", "8%", "15%"],
        benefitsDesc: "Chance to receive stone in addition to resources when mining ore deposits",
        position: [2, 5]
    },
    {
        name: "Exotic Power",
        description: "Reduced exotics weight in your inventory",
        rank: 2,
        prerequisites: ["Dense Packing I"],
        benefits: ["-5%", "-10%", "-15%", "-25%"],
        benefitsDesc: "Weight of exotics in your inventory",
        position: [2, 7]
    },
    {
        name: "Movin' Wood",
        description: "Decreases wood weight in your inventory",
        rank: 2,
        prerequisites: ["Wood Breakdown"],
        benefits: ["-5%", "-10%", "-15%", "-30%"],
        benefitsDesc: "Weight of wood in your inventory",
        position: [3,1]
    },
    {
        name: "Slinging Stone",
        description: "Decreases stone weight in your inventory",
        rank: 3,
        prerequisites: ["Rock Star"],
        benefits: ["-5%", "-10%", "-15%", "-25%"],
        benefitsDesc: "Weight of stone in your inventory",
        position: [3, 4]
    },
    {
        name: "Dense Packing II",
        description: "Increased inventory weight capacity",
        rank: 3,
        prerequisites: ["Dense Packing I"],
        benefits: ["+5%", "+10%", "+20%"],
        benefitsDesc: "Weight Capacity",
        position: [3, 6]
    },
    {
        name: "Unburdened",
        description: "Decreased ore weight in your inventory",
        rank: 3,
        prerequisites: ["Slinging Stone"],
        benefits: ["-5%", "-10%", "-15%", "-25%"],
        benefitsDesc: "Ore weight in your inventory",
        position: [4, 3]
    },
    {
        name: "Iron Miner",
        description: "Increased yield from iron deposits",
        rank: 3,
        prerequisites: ["Slinging Stone"],
        benefits: ["+10%", "+15%", "+20%"],
        benefitsDesc: "Yield from iron deposits",
        position: [4, 5]
    },
    {
        name: "Exotic Sprinter",
        description: "Increased movement speed while carrying exotics",
        rank: 3,
        prerequisites: ["Dense Packing II"],
        benefits: ["+5%", "+8%", "+10%"],
        benefitsDesc: "Movement speed while carrying exotics",
        position: [4, 7]
    },
    {
        name: "Seasoned Logsman",
        description: "Chopped wood is automatically added to your inventory",
        rank: 4,
        prerequisites: ["Wood Breakdown"],
        benefits: ["Chopped wood is automatically added to your inventory"],
        position: [5, 0]
    },
    {
        name: "Friend Of The Trees",
        description: "Reduced damage from falling trees (+50% Falling Tree Resistance)",
        rank: 4,
        prerequisites: ["Seasoned Logsman"],
        benefits: ["+50%"],
        benefitsDesc: "Falling tree resistance",
        position: [5, 2]
    },
    {
        name: "Peerless Lumberjack",
        description: "Chance to instantly chop up a tree (+1% chance to Instantly Fell Trees)",
        rank: 4,
        prerequisites: ["Seasoned Logsman"],
        benefits: ["+1%"],
        benefitsDesc: "Chance to instantly fell trees",
        position: [6, 0]
    },
    {
        name: "Lucky Strike",
        description: "Chance to mine a deposit in one hit (+1% chance to instantly Break Mineral or Ore Deposits while Mining)",
        rank: 4,
        prerequisites: ["Unburdened", "Iron Miner"],
        benefits: ["+1%"],
        benefitsDesc: "Chance to instantly break mineral or ore deposits while mining",
        position: [6, 4]
    }
])
