import {FullTrack} from "../../constants/treeStructures.ts";
import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const spearsTree = {
    talents: defineTalentTree("Spears", [
        {
            name: "Quick Thrust",
            description: "Increased melee attack speed",
            rank: 1,
            prerequisites: ["Strong Thrust I", "Efficient Crafter I"],
            benefits: [
                [{value: 10, desc: "+{0}% Attack Speed with Spears", category: "Melee Weapon"}],
                [{value: 15, desc: "+{0}% Attack Speed with Spears", category: "Melee Weapon"}],
                [{value: 20, desc: "+{0}% Attack Speed with Spears", category: "Melee Weapon"}],
            ],
            position: [1, 1.25],
            imageName: "Spears/Talent_Spear_QuickThrust",
        },
        {
            name: "Strong Thrust I",
            description: "Increased melee attack damage",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 3, desc: "+{0}% Damage with Spears", category: "Melee DMG"}],
                [{value: 5, desc: "+{0}% Damage with Spears", category: "Melee DMG"}],
                [{value: 10, desc: "+{0}% Damage with Spears", category: "Melee DMG"}],
            ],
            position: [0, 0.0],
            imageName: "Spears/Talent_Spear_StrongThrust1",
        },
        {
            name: "Strong Thrust II",
            description: "Increased melee attack damage",
            rank: 2,
            prerequisites: ["Quick Thrust"],
            benefits: [
                [{value: 5, desc: "+{0}% Damage with Spears", category: "Melee DMG"}],
                [{value: 10, desc: "+{0}% Damage with Spears", category: "Melee DMG"}],
                [{value: 15, desc: "+{0}% Damage with Spears", category: "Melee DMG"}],
            ],
            position: [2, 0.0],
            imageName: "Spears/Talent_Spear_StrongThrust2",
        },
        {
            name: "Deadly Thrust I",
            description: "Increased critical hit multiplier on spears",
            rank: 2,
            prerequisites: ["Quick Thrust", "From Afar I"],
            benefits: [
                [{value: 5, desc: "+{0}% Critical Damage with Spears", category: "Generic Damage"}],
                [{value: 20, desc: "+{0}% Critical Damage with Spears", category: "Generic Damage"}],
            ],
            position: [2, 3.25],
            imageName: "Spears/Talent_Spear_DeadlyThrust1",
        },
        {
            name: "Deadly Thrust II",
            description: "Increased critical hit multiplier on spears",
            rank: 2,
            prerequisites: ["Deadly Thrust I"],
            benefits: [
                [{value: 15, desc: "+{0}% Critical Damage with Spears", category: "Generic Damage"}],
                [{value: 30, desc: "+{0}% Critical Damage with Spears", category: "Generic Damage"}],
            ],
            position: [3, 4.25],
            imageName: "Spears/Talent_Spear_DeadlyThrust2",
        },
        {
            name: "Spear Quick Draw",
            description: "Increased aim speed",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 5, desc: "+{0}% Aim Speed with Spears", category: "Ranged Weapon"}],
                [{value: 10, desc: "+{0}% Aim Speed with Spears", category: "Ranged Weapon"}],
                [{value: 15, desc: "+{0}% Aim Speed with Spears", category: "Ranged Weapon"}],
            ],
            position: [0, 6.75],
            imageName: "Spears/Talent_Spear_QuickDraw",
        },
        {
            name: "From Afar I",
            description: "Increased ranged damage",
            rank: 1,
            prerequisites: ["Spear Quick Draw", "Seasoned Spearman"],
            benefits: [
                [{value: 5, desc: "+{0}% Damage with Thrown Spears", category: "Ranged DMG"}],
                [{value: 8, desc: "+{0}% Damage with Thrown Spears", category: "Ranged DMG"}],
            ],
            position: [1, 5.5],
            imageName: "Spears/Talent_Spear_FromAfar1",
        },
        {
            name: "From Afar II",
            description: "Increased ranged damage",
            rank: 2,
            prerequisites: ["From Afar I"],
            benefits: [
                [{value: 10, desc: "+{0}% Damage with Thrown Spears", category: "Ranged DMG"}],
                [{value: 12, desc: "+{0}% Damage with Thrown Spears", category: "Ranged DMG"}],
            ],
            position: [2, 7.0],
            imageName: "Spears/Talent_Spear_FromAfar2",
        },
        {
            name: "Long Reach I",
            description: "Increased throw distance",
            rank: 3,
            prerequisites: ["There It Is"],
            benefits: [
                [{value: 5, desc: "+{0}% Speed of Thrown Spears", category: "Misc"}],
                [{value: 10, desc: "+{0}% Speed of Thrown Spears", category: "Misc"}],
            ],
            position: [5, 5.5],
            imageName: "Spears/Talent_Spear_LongReach1",
        },
        {
            name: "Long Reach II",
            description: "Increased throw distance",
            rank: 4,
            prerequisites: ["Long Reach I"],
            benefits: [
                [{value: 10, desc: "+{0}% Speed of Thrown Spears", category: "Misc"}],
                [{value: 15, desc: "+{0}% Speed of Thrown Spears", category: "Misc"}],
            ],
            position: [6, 7.0],
            imageName: "Spears/Talent_Spear_LongReach2",
        },
        {
            name: "Quick Step",
            description: "Increased movespeed while aiming",
            rank: 1,
            prerequisites: ["From Afar II"],
            benefits: [
                [{value: 5, desc: "+{0}% Movement Speed while Aiming a Spear", category: "Character"}],
                [{value: 10, desc: "+{0}% Movement Speed while Aiming a Spear", category: "Character"}],
                [{value: 15, desc: "+{0}% Movement Speed while Aiming a Spear", category: "Character"}],
            ],
            position: [3, 7.0],
            imageName: "Spears/Talent_Spear_QuickStep",
        },
        {
            name: "Seasoned Spearman",
            description: "Decreased stamina usage with spears",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: -5, desc: "+{0}% Stamina Consumed by Spear Actions", category: "Stamina"}],
                [{value: -10, desc: "+{0}% Stamina Consumed by Spear Actions", category: "Stamina"}],
                [{value: -15, desc: "+{0}% Stamina Consumed by Spear Actions", category: "Stamina"}],
            ],
            position: [0, 4.25],
            imageName: "Spears/Talent_Spears_SeasonedSpearman",
        },
        {
            name: "Efficient Crafter II",
            description: "Cheaper spear crafting",
            rank: 3,
            prerequisites: ["Could Go All Day"],
            benefits: [
                [{value: -20, desc: "+{0}% Resource Cost of Crafted Spears", category: "Crafting"}],
            ],
            position: [4, 1.25],
            imageName: "Spears/Talent_Spear_EfficientCrafter2",
        },
        {
            name: "Excellent Crafter I",
            description: "Crafted spears have increased durability",
            rank: 3,
            prerequisites: ["Deadly Thrust I"],
            benefits: [
                [{value: 25, desc: "+{0}% Maximum Health for Crafted Spears", category: "Crafting"}],
            ],
            position: [4, 3.25],
            imageName: "Spears/Talent_Spear_ExcellentCrafter",
        },
        {
            name: "Spear Parry",
            description: "Take less melee damage when spear equipped",
            rank: 4,
            prerequisites: ["Efficient Crafter II"],
            benefits: [
                [{value: 15, desc: "+{0}% Melee Resistance with a Spear Equipped", category: "Resistance"}],
                [{value: 20, desc: "+{0}% Melee Resistance with a Spear Equipped", category: "Resistance"}],
            ],
            position: [5, 1.25],
            imageName: "Spears/Talent_Spear_SpearParry",
        },
        {
            name: "There It Is",
            description: "Thrown spears highlight in world",
            rank: 3,
            prerequisites: ["Deadly Thrust I", "From Afar II", "From Afar I"],
            benefits: [
                [{value: 1, desc: "Thrown Spears are highlighted", category: "Character"}],
            ],
            position: [4, 5.5],
            imageName: "Spears/Talent_Spear_ThereItIs",
        },
        {
            name: "Could Go All Day",
            description: "Increased stamina regen when spear equipped",
            rank: 3,
            prerequisites: ["Quick Thrust", "Deadly Thrust I"],
            benefits: [
                [{value: 10, desc: "+{0}% Stamina Regeneration with a Spear Equipped", category: "Stamina"}],
                [{value: 20, desc: "+{0}% Stamina Regeneration with a Spear Equipped", category: "Stamina"}],
            ],
            position: [3, 1.25],
            imageName: "Spears/Talent_Spear_CouldGoAllDay",
        },
        {
            name: "Deep Wounds",
            description: "Spear strikes cause bleeding over time",
            rank: 4,
            prerequisites: ["Long Reach I"],
            benefits: [
                [{value: 5, desc: "{0}% chance to Wound on Hit with Spears", category: "Modifiers"}],
                [{value: 10, desc: "{0}% chance to Wound on Hit with Spears", category: "Modifiers"}],
                [{value: 15, desc: "{0}% chance to Wound on Hit with Spears", category: "Modifiers"}],
            ],
            position: [6, 4.25],
            imageName: "Spears/Talent_Spear_DeepWounds",
        },
        {
            name: "Efficient Crafter I",
            description: "Cheaper spear crafting",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: -20, desc: "+{0}% Resource Cost of Crafted Spears", category: "Crafting"}],
            ],
            position: [0, 2.5],
            imageName: "Spears/Talent_Spear_EfficientCrafter",
        },
        {
            name: "Excellent Crafter II",
            description: "Crafted spears have increased durability",
            rank: 4,
            prerequisites: ["Excellent Crafter I"],
            benefits: [
                [{value: 25, desc: "+{0}% Maximum Health for Crafted Spears", category: "Crafting"}],
            ],
            position: [5, 3.25],
            imageName: "Spears/Talent_Spear_ExcellentCrafter2",
        },
    ]),
    fullTracks: [
        { start: "Strong Thrust I", path: [[1, 0.0]], end: "Quick Thrust" },
        { start: "Efficient Crafter I", path: [[1, 2.5]], end: "Quick Thrust" },
        { start: "Quick Thrust", path: [[2, 1.25]], end: "Strong Thrust II" },
        { start: "Quick Thrust", path: [[2, 1.25]], end: "Deadly Thrust I" },
        { start: "From Afar I", path: [[2, 5.5]], end: "Deadly Thrust I" },
        { start: "Deadly Thrust I", path: [[3, 3.25]], end: "Deadly Thrust II" },
        { start: "Spear Quick Draw", path: [[1, 6.75]], end: "From Afar I" },
        { start: "Seasoned Spearman", path: [[1, 4.25]], end: "From Afar I" },
        { start: "From Afar I", path: [[2, 5.5]], end: "From Afar II" },
        { start: "There It Is", end: "Long Reach I" },
        { start: "Long Reach I", path: [[6, 5.5]], end: "Long Reach II" },
        { start: "From Afar II", end: "Quick Step" },
        { start: "Could Go All Day", end: "Efficient Crafter II" },
        { start: "Deadly Thrust I", end: "Excellent Crafter I" },
        { start: "Efficient Crafter II", end: "Spear Parry" },
        { start: "Deadly Thrust I", path: [[2, 5.5]], end: "There It Is" },
        { start: "From Afar II", path: [[2, 5.5]], end: "There It Is" },
        { start: "From Afar I", end: "There It Is" },
        { start: "Quick Thrust", end: "Could Go All Day" },
        { start: "Deadly Thrust I", path: [[2, 1.25]], end: "Could Go All Day" },
        { start: "Long Reach I", path: [[6, 5.5]], end: "Deep Wounds" },
        { start: "Excellent Crafter I", end: "Excellent Crafter II" },
    ] as FullTrack[],
};
