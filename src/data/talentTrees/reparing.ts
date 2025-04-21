import {FullTrack} from "../../constants/treeStructures.ts";
import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const repairingTree = {
    talents: defineTalentTree("Repairing", [
        {
            name: "Hardy Whacker",
            description: "Reduced durability loss on fire whacker",
            rank: 1,
            prerequisites: ["Speedy Whacks"],
            benefits: [
                [{value: -10, desc: "+{0}% Wear Rate of Fire Whackers", category: "Item"}],
                [{value: -25, desc: "+{0}% Wear Rate of Fire Whackers", category: "Item"}],
                [{value: -50, desc: "+{0}% Wear Rate of Fire Whackers", category: "Item"}],
            ],
            position: [3, 4],
            imageName: "Repairing/Talent_Repairing_HardyFlapper",
        },
        {
            name: "Speedy Whacks",
            description: "Increased extinguishing speed with fire whacker",
            rank: 1,
            prerequisites: ["Ready To Work"],
            benefits: [
                [{value: 10, desc: "+{0}% Fire Extinguishing Speed", category: "Fire"}],
                [{value: 20, desc: "+{0}% Fire Extinguishing Speed", category: "Fire"}],
                [{value: 30, desc: "+{0}% Fire Extinguishing Speed", category: "Fire"}],
            ],
            position: [1, 4],
            imageName: "Repairing/Talent_Repairing_FastFlapping",
        },
        {
            name: "First Responder",
            description: "Increased movespeed with fire whacker equipped",
            rank: 1,
            prerequisites: ["Ready To Work"],
            benefits: [
                [{value: 10, desc: "+{0}% Movement Speed with a Fire Whacker", category: "Movement"}],
            ],
            position: [1, 2],
            imageName: "Repairing/Talent_Repairing_FirstResponder",
        },
        {
            name: "Hammer Time I",
            description: "Increased repair hammer speed",
            rank: 1,
            prerequisites: ["Ready To Work"],
            benefits: [
                [{value: -15, desc: "+{0}% Repair Tool Action Hold Time", category: "Building"}],
                [{value: -30, desc: "+{0}% Repair Tool Action Hold Time", category: "Building"}],
                [{value: -50, desc: "+{0}% Repair Tool Action Hold Time", category: "Building"}],
            ],
            position: [1, 0],
            imageName: "Repairing/Talent_Repairing_HammerTime",
        },
        {
            name: "Hardy Hammer",
            description: "Reduced durability loss on repair hammer",
            rank: 2,
            prerequisites: ["Hammer Time I", "Boneshatter"],
            benefits: [
                [{value: -25, desc: "+{0}% Wear Rate of Hammers", category: "Item"}],
                [{value: -50, desc: "+{0}% Wear Rate of Hammers", category: "Item"}],
            ],
            position: [3, 0],
            imageName: "Repairing/Talent_Repairing_HardyHammer",
        },
        {
            name: "With One Swing",
            description: "Chance to instantly repair building pieces",
            rank: 3,
            prerequisites: ["Whacker Endurance", "Hardy Hammer"],
            benefits: [
                [{value: 25, desc: "+{0}% Chance to Repair a Building Piece Instantly", category: "Building"}],
            ],
            position: [4, 1],
            imageName: "Repairing/Talent_Repairing_WithOneSwing",
        },
        {
            name: "Whacker Endurance",
            description: "Increased stamina regen with fire whacker equipped",
            rank: 2,
            prerequisites: ["First Responder", "Boneshatter"],
            benefits: [
                [{value: 15, desc: "+{0}% Stamina Regeneration with a Fire Whacker Equipped", category: "Stamina"}],
                [{value: 30, desc: "+{0}% Stamina Regeneration with a Fire Whacker Equipped", category: "Stamina"}],
            ],
            position: [3, 2],
            imageName: "Repairing/Talent_Repairing_FlapperEndurance",
        },
        {
            name: "Lingering Extinguishing",
            description: "Recently extinguished building pieces remain fire resistant for a time",
            rank: 3,
            prerequisites: ["Hardy Whacker", "Whacker Endurance"],
            benefits: [
                [{value: 10, desc: "Extinguished Building Pieces have Reduced Burn Chance for {0} seconds", category: "Building"}],
            ],
            position: [4, 3],
            imageName: "Repairing/Talent_Repairing_LingeringExtinguish",
        },
        {
            name: "Hard to Reach",
            description: "Gives ability to throw a fire whacker",
            rank: 4,
            prerequisites: ["Lingering Extinguishing"],
            benefits: [
                [{value: 1, desc: "Can Throw Your Fire Whacker", category: "Misc"}],
            ],
            position: [5, 3],
            imageName: "Repairing/Talent_Repairing_HardToReachPlaces",
        },
        {
            name: "Better Than New",
            description: "Recently repaired building pieces are resistant to storm damage for a time",
            rank: 3,
            prerequisites: ["Hardy Hammer"],
            benefits: [
                [{value: 10, desc: "Repaired Building Pieces have Increased Wind Damage Resistance for {0} seconds", category: "Building"}],
            ],
            position: [4, 0],
            imageName: "Repairing/Talent_Repairing_BetterThanNew",
        },
        {
            name: "Hammer Time II",
            description: "Increased repair hammer speed",
            rank: 3,
            prerequisites: ["Better Than New"],
            benefits: [
                [{value: -10, desc: "+{0}% Repair Tool Action Hold Time", category: "Building"}],
                [{value: -25, desc: "+{0}% Repair Tool Action Hold Time", category: "Building"}],
            ],
            position: [5, 0],
            imageName: "Repairing/Talent_Repairing_HammerTime",
        },
        {
            name: "Ready To Work",
            description: "Increased stamina regeneration",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 5, desc: "+{0}% Stamina Regeneration", category: "Stamina"}],
                [{value: 15, desc: "+{0}% Stamina Regeneration", category: "Stamina"}],
                [{value: 30, desc: "+{0}% Stamina Regeneration", category: "Stamina"}],
            ],
            position: [0, 1],
            imageName: "Bows/Talent_Bow_EasyDraw",
        },
        {
            name: "Boneshatter",
            description: "Increased damage against creature bones",
            rank: 1,
            prerequisites: ["First Responder", "Hammer Time I"],
            benefits: [
                [{value: 10, desc: "+{0}% Damage vs Creature Bones", category: "Generic Damage"}],
                [{value: 20, desc: "+{0}% Damage vs Creature Bones", category: "Generic Damage"}],
            ],
            position: [2, 1],
            imageName: "Repairing/Talent_Repairing_BluntForceTrauma",
        },
    ]),
    fullTracks: [] as FullTrack[]
};
