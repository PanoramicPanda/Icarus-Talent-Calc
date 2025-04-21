import {FullTrack} from "../../constants/treeStructures.ts";
import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const huntingTree = {
    talents: defineTalentTree("Hunting", [
        {
            name: "Cold Hearted",
            description: "Double resource yield from baby animals",
            rank: 4,
            prerequisites: ["Big Game Hunter", "Careful Skinner", "Quick Clean Up"],
            benefits: [
                [{value: 1, desc: "Double Yield from Skinning Baby Animals", category: "Butchery"}],
            ],
            position: [8, 3],
            imageName: "Hunting/Talent_Hunting_ColdHearted",
        },
        {
            name: "Chase 'em Down",
            description: "Increase to base stamina",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 10, desc: "+{0} Maximum Stamina", category: "Stamina"}],
                [{value: 25, desc: "+{0} Maximum Stamina", category: "Stamina"}],
                [{value: 40, desc: "+{0} Maximum Stamina", category: "Stamina"}],
            ],
            position: [0, 2],
            imageName: "Hunting/Talent_Hunting_ChaseEmDown",
        },
        {
            name: "Careful Skinner",
            description: "Increased leather from skinning",
            rank: 2,
            prerequisites: ["Trained Hunter"],
            benefits: [
                [{value: 10, desc: "+{0}% Yield from Skinning Leather", category: "Hunting"}],
                [{value: 20, desc: "+{0}% Yield from Skinning Leather", category: "Hunting"}],
            ],
            position: [4, 3],
            imageName: "Hunting/Talent_Hunting_CarefulSkinner",
        },
        {
            name: "Blueprint: Arctic Armor",
            description: "Grants access to Arctic Armor blueprints",
            rank: 4,
            prerequisites: ["Blueprint: Ghillie Armor", "Big Game Hunter"],
            benefits: [
                [{value: 1, desc: "Grants access to Arctic Armor blueprints", category: "Flag"}],
            ],
            position: [8, 7],
            imageName: "Hunting/Talent_Hunting_PolarBearArmour",
        },
        {
            name: "Sense Small Animals",
            description: "Nearby small animals will highlight when aiming",
            rank: 2,
            prerequisites: ["Strong Shoulders"],
            benefits: [
                [{value: 1, desc: "Small Creatures are Highlighted when Aiming", category: "Hunting"}],
            ],
            position: [3, 1],
            imageName: "Hunting/Talent_Hunting_SmallAnimalSenses",
        },
        {
            name: "Sense Medium Animals",
            description: "Nearby medium animals will highlight when aiming",
            rank: 3,
            prerequisites: ["Sense Small Animals"],
            benefits: [
                [{value: 1, desc: "Medium Creatures are Highlighted when Aiming", category: "Hunting"}],
            ],
            position: [4, 1],
            imageName: "Hunting/Talent_Hunting_MediumAnimalSense",
        },
        {
            name: "Sense Megafauna",
            description: "Nearby large animals will highlight when aiming",
            rank: 4,
            prerequisites: ["Sense Medium Animals"],
            benefits: [
                [{value: 1, desc: "Large Creatures are Highlighted when Aiming", category: "Hunting"}],
            ],
            position: [5, 0],
            imageName: "Hunting/Talent_Hunting_LargeAnimalSenses",
        },
        {
            name: "Swift Stalker",
            description: "Increased movespeed while crouching",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 3, desc: "+{0}% Crouching Movement Speed", category: "Movement"}],
                [{value: 5, desc: "+{0}% Crouching Movement Speed", category: "Movement"}],
                [{value: 10, desc: "+{0}% Crouching Movement Speed", category: "Movement"}],
            ],
            position: [0, 4],
            imageName: "Hunting/Talent_Hunting_SwiftStalker",
        },
        {
            name: "Without a Sound",
            description: "Harder to detect when in stealth",
            rank: 2,
            prerequisites: ["Quick Getaway", "Leather Breakdown"],
            benefits: [
                [{value: -5, desc: "+{0}% Perceived Threat while Stealthed", category: "Stealth"}],
                [{value: -10, desc: "+{0}% Perceived Threat while Stealthed", category: "Stealth"}],
                [{value: -15, desc: "+{0}% Perceived Threat while Stealthed", category: "Stealth"}],
            ],
            position: [2, 6],
            imageName: "Hunting/Talent_Hunting_WithoutASound",
        },
        {
            name: "Strong Shoulders",
            description: "Increased movespeed when carrying animal carcasses",
            rank: 1,
            prerequisites: ["Chase 'em Down", "Fine Butcher I"],
            benefits: [
                [{value: 5, desc: "+{0}% Movement Speed while Carrying", category: "Modifiers"}],
            ],
            position: [1, 1],
            imageName: "Hunting/Talent_Hunting_StrongShoulders",
        },
        {
            name: "Fine Butcher I",
            description: "Increased meat yield when skinning",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 25, desc: "+{0}% Yield from Butchering Animals", category: "Butchery"}],
            ],
            position: [0, 0],
            imageName: "Hunting/Talent_Hunting_SkilledButcher",
        },
        {
            name: "Bone Collector",
            description: "Increased bone yield when skinning",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 15, desc: "+{0}% Yield from Creature Bones", category: "Hunting"}],
            ],
            position: [0, 7],
            imageName: "Hunting/Talent_Hunting_BoneCollector",
        },
        {
            name: "Blueprint: Ghillie Armor",
            description: "Grants access to Ghillie Armor blueprints",
            rank: 3,
            prerequisites: ["Without a Sound"],
            benefits: [
                [{value: 1, desc: "Grants access to Ghillie Armor blueprints", category: "Flag"}],
            ],
            position: [3, 7],
            imageName: "Hunting/Talent_Hunting_GillieArmour",
        },
        {
            name: "Quick Getaway",
            description: "Increased stamina regen after taking damage",
            rank: 1,
            prerequisites: ["Bone Collector", "Swift Stalker"],
            benefits: [
                [{value: 1, desc: "Trigger 5 seconds of increased Stamina Regeneration when Damaged", category: "Modifiers"}],
            ],
            position: [1, 6],
            imageName: "Hunting/Talent_Hunting_QuickGetaway",
        },
        {
            name: "Leather Breakdown",
            description: "Unlocks the blueprint to turn leather into rope on Character",
            rank: 1,
            prerequisites: ["Swift Stalker", "Chase 'em Down"],
            benefits: [
                [{value: 1, desc: "Unlocks the blueprint to turn leather into rope on Character", category: "Flag"}],
            ],
            position: [1, 3],
            imageName: "Cooking/Talent_Cooking_BlueprintAdvancedFoodRecipe",
        },
        {
            name: "Fine Butcher II",
            description: "Increased meat yield when skinning",
            rank: 3,
            prerequisites: ["Careful Skinner"],
            benefits: [
                [{value: 10, desc: "+{0}% Yield from Butchering Animals", category: "Butchery"}],
                [{value: 25, desc: "+{0}% Yield from Butchering Animals", category: "Butchery"}],
            ],
            position: [5, 5],
            imageName: "Hunting/Talent_Hunting_SkilledButcher2",
        },
        {
            name: "Bone Collector II",
            description: "Increased bone yield when skinning",
            rank: 3,
            prerequisites: ["Careful Skinner", "Quick Clean Up"],
            benefits: [
                [{value: 8, desc: "+{0}% Yield from Creature Bones", category: "Hunting"}],
                [{value: 15, desc: "+{0}% Yield from Creature Bones", category: "Hunting"}],
            ],
            position: [6, 1],
            imageName: "Hunting/Talent_Hunting_BoneCollector2",
        },
        {
            name: "Health Bars",
            description: "See animal health bars",
            rank: 2,
            prerequisites: ["Strong Shoulders"],
            benefits: [
                [{value: 1, desc: "Can see Creature Alert Level and Health", category: "Hunting"}],
            ],
            position: [2, 0],
            imageName: "Hunting/Talent_Hunting_HealthBars",
        },
        {
            name: "Chase 'em Down II",
            description: "Increase to base stamina",
            rank: 3,
            prerequisites: ["Careful Skinner", "Quick Clean Up"],
            benefits: [
                [{value: 10, desc: "+{0} Maximum Stamina", category: "Stamina"}],
                [{value: 25, desc: "+{0} Maximum Stamina", category: "Stamina"}],
                [{value: 40, desc: "+{0} Maximum Stamina", category: "Stamina"}],
            ],
            position: [6, 5],
            imageName: "Hunting/Talent_Hunting_ChaseEmDown",
        },
        {
            name: "Big Game Hunter",
            description: "Allows you to see the location of World Bosses on the map",
            rank: 4,
            prerequisites: ["Blueprint: Ghillie Armor", "Careful Skinner", "Quick Clean Up"],
            benefits: [
                [{value: 1, desc: "Can see World Bosses on the Map", category: "Map"}],
            ],
            position: [7, 5],
            imageName: "Hunting/Talent_Hunting_RefinedGhillerArmour",
        },
        {
            name: "Trained Hunter",
            description: "Knives degrade slower when skinning",
            rank: 2,
            prerequisites: ["Leather Breakdown", "Without a Sound"],
            benefits: [
                [{value: -10, desc: "+{0}% Wear Rate of Knives while Skinning", category: "Skinning"}],
                [{value: -20, desc: "+{0}% Wear Rate of Knives while Skinning", category: "Skinning"}],
                [{value: -40, desc: "+{0}% Wear Rate of Knives while Skinning", category: "Skinning"}],
            ],
            position: [3, 3],
            imageName: "Hunting/Talent_Hunting_TrainedHunter",
        },
        {
            name: "Brittle Bones",
            description: "Chance to Instantly Gather Bones",
            rank: 4,
            prerequisites: ["Bone Collector II"],
            benefits: [
                [{value: 20, desc: "+{0}% Chance to Instantly Gather Bone", category: "Skinning"}],
            ],
            position: [7, 1],
            imageName: "Repairing/Talent_Repairing_BluntForceTrauma",
        },
        {
            name: "Quick Clean Up",
            description: "Increased damage against creature bones",
            rank: 3,
            prerequisites: ["Careful Skinner", "Sense Medium Animals"],
            benefits: [
                [{value: 15, desc: "+{0}% Damage vs Creature Bones", category: "Generic Damage"}],
                [{value: 30, desc: "+{0}% Damage vs Creature Bones", category: "Generic Damage"}],
            ],
            position: [5, 2],
            imageName: "Tools/Talent_Tools_StrongBack",
        },
    ]),
    fullTracks: [
        {start: "Fine Butcher I", path: [[1, 0]], end: "Strong Shoulders"},
        {start: "Chase 'em Down", path: [[1, 2]], end: "Strong Shoulders"},
        {start: "Chase 'em Down", path: [[1, 2]], end: "Leather Breakdown"},
        {start: "Swift Stalker", path: [[1, 4]], end: "Leather Breakdown"},
        {start: "Swift Stalker", path: [[1, 4]], end: "Quick Getaway"},
        {start: "Bone Collector", path: [[1, 7]], end: "Quick Getaway"},

        {start: "Strong Shoulders", path: [[2, 1]], end: "Health Bars"},
        {start: "Strong Shoulders", end: "Sense Small Animals"},

        {start: "Leather Breakdown", path: [[2, 3]], end: "Without a Sound"},
        {start: "Leather Breakdown", end: "Trained Hunter"},

        {start: "Quick Getaway", end: "Without a Sound"},
        {start: "Sense Small Animals", end: "Sense Medium Animals"},
        {start: "Trained Hunter", end: "Careful Skinner"},

        {start: "Without a Sound", path: [[2, 3]], end: "Trained Hunter"},
        {start: "Without a Sound", path: [[3, 6]], end: "Blueprint: Ghillie Armor"},
        {start: "Blueprint: Ghillie Armor", end: "Blueprint: Arctic Armor"},

        {start: "Sense Medium Animals", path: [[5, 1]], end: "Sense Megafauna"},
        {start: "Sense Medium Animals", path: [[5, 1]], end: "Quick Clean Up"},

        {start: "Careful Skinner", path: [[5, 3]], end: "Quick Clean Up"},
        {start: "Careful Skinner", path: [[5, 3]], end: "Fine Butcher II"},
        {start: "Careful Skinner", path: [[6, 3]], end: "Bone Collector II"},
        {start: "Careful Skinner", path: [[7, 3]], end: "Big Game Hunter"},
        {start: "Careful Skinner", path: [[6, 3]], end: "Chase 'em Down II"},
        {start: "Careful Skinner", end: "Cold Hearted"},

        {start: "Bone Collector II", end: "Brittle Bones"},

        {start: "Quick Clean Up", path: [[5, 3], [7, 3]], end: "Big Game Hunter"},
        {start: "Quick Clean Up", path: [[5, 3]], end: "Cold Hearted"},
        {start: "Quick Clean Up", path: [[5, 3], [6, 3]], end: "Bone Collector II"},

        {start: "Blueprint: Ghillie Armor", path: [[7, 7]], end: "Big Game Hunter"},
        {start: "Big Game Hunter", path: [[7, 3]], end: "Cold Hearted"},
        {start: "Big Game Hunter", path: [[7, 7]], end: "Blueprint: Arctic Armor"}

    ] as FullTrack[]

};
