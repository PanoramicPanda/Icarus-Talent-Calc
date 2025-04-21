import {FullTrack} from "../../constants/treeStructures.ts";
import {defineTalentTree} from "../../utils/defineTalentTree.ts";

export const fishingTree = {
    talents: defineTalentTree("Fishing", [
        {
            name: "Angler's Technique",
            description: "Cheaper fishing rod crafting",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: -20, desc: "+{0}% Crafted Fishing Rod Resource Cost", category: "Fishing"}],
                [{value: -40, desc: "+{0}% Crafted Fishing Rod Resource Cost", category: "Fishing"}],
            ],
            position: [0, 3],
            imageName: "Fishing/Talent_AnglersTechnique",
        },
        {
            name: "Calmer Waters",
            description: "Reduced fish speed while fishing",
            rank: 1,
            prerequisites: ["Angler's Technique"],
            benefits: [
                [{value: -15, desc: "+{0}% Speed of Fish while Fishing", category: "Fishing"}],
                [{value: -30, desc: "+{0}% Speed of Fish while Fishing", category: "Fishing"}],
            ],
            position: [1, 0],
            imageName: "Fishing/Talent_CallersWater",
        },
        {
            name: "Fish Fu",
            description: "Increases damage reduction while fishing",
            rank: 3,
            prerequisites: ["Calmer Waters"],
            benefits: [
                [{value: 25, desc: "+{0} Physical Resistance while Fishing", category: "Fishing"}],
            ],
            position: [2, 0],
            imageName: "Fishing/Talent_FishFlu",
        },
        {
            name: "Nice day for fishing ain't it?",
            description: "Increases resistance to exposure",
            rank: 4,
            prerequisites: ["Fish Fu"],
            benefits: [
                [{value: 5, desc: "+{0}% Exposure Resistance", category: "Exposure"}],
                [{value: 10, desc: "+{0}% Exposure Resistance", category: "Exposure"}],
            ],
            position: [4, 0],
            imageName: "Fishing/Talent_NiceDayForFishinAintIt",
        },
        {
            name: "Efficient Fisher",
            description: "Reduced durability loss on lures",
            rank: 1,
            prerequisites: ["Natural Angler", "Angler's Technique"],
            benefits: [
                [{value: -10, desc: "+{0}% Wear Rate of Lures while Fishing", category: "Fishing"}],
                [{value: -20, desc: "+{0}% Wear Rate of Lures while Fishing", category: "Fishing"}],
                [{value: -30, desc: "+{0}% Wear Rate of Lures while Fishing", category: "Fishing"}],
            ],
            position: [3, 5],
            imageName: "Fishing/Talent_EfficientFisher",
        },
        {
            name: "Hefty catch",
            description: "Increased caught fish weight",
            rank: 1,
            prerequisites: ["Efficient Fisher"],
            benefits: [
                [{value: 10, desc: "+{0}% Weight of Caught Fish", category: "Misc"}],
            ],
            position: [5, 3],
            imageName: "Fishing/Talent_HeftCatch",
        },
        {
            name: "That's a big one",
            description: "Increased caught fish length",
            rank: 1,
            prerequisites: ["Efficient Fisher"],
            benefits: [
                [{value: 10, desc: "+{0}% Length of Caught Fish", category: "Misc"}],
            ],
            position: [5, 7],
            imageName: "Fishing/Talent_ThatsABigOne",
        },
        {
            name: "Fisher's Haul",
            description: "Decreases fish weight in your inventory",
            rank: 2,
            prerequisites: ["Hefty catch", "That's a big one"],
            benefits: [
                [{value: -25, desc: "+{0}% Carry Weight of Fish", category: "Fishing"}],
            ],
            position: [6, 5],
            imageName: "Fishing/Talent_FishersHaul",
        },
        {
            name: "Steady Breathing",
            description: "Reduced oxygen consumption rate",
            rank: 2,
            prerequisites: ["Fisher's Haul"],
            benefits: [
                [{value: -10, desc: "+{0}% Oxygen Consumption", category: "Upkeep"}],
                [{value: -15, desc: "+{0}% Oxygen Consumption", category: "Upkeep"}],
            ],
            position: [6, 2],
            imageName: "Fishing/Talent_SteadyBreathing",
        },
        {
            name: "One with the water",
            description: "Reduced water consumption rate",
            rank: 2,
            prerequisites: ["Fisher's Haul"],
            benefits: [
                [{value: -10, desc: "+{0}% Water Consumption", category: "Upkeep"}],
                [{value: -15, desc: "+{0}% Water Consumption", category: "Upkeep"}],
            ],
            position: [6, 8],
            imageName: "Fishing/Talent_OneWithTheWater",
        },
        {
            name: "Saltiest Catch",
            description: "Increased quality of caught saltwater fish",
            rank: 3,
            prerequisites: ["Steady Breathing"],
            benefits: [
                [{value: 5, desc: "+{0}% caught Saltwater Fish Quality", category: "Misc"}],
            ],
            position: [7, 1],
            imageName: "Fishing/Talent_SaltiestCatch",
        },
        {
            name: "Freshest Catch",
            description: "Increased quality of caught freshwater fish",
            rank: 3,
            prerequisites: ["One with the water"],
            benefits: [
                [{value: 5, desc: "+{0}% caught Freshwater Fish Quality", category: "Misc"}],
            ],
            position: [7, 9],
            imageName: "Fishing/Talent_FreshestCatch",
        },
        {
            name: "Pescatarian",
            description: "Buffs from food containing fish are increased",
            rank: 2,
            prerequisites: ["Fisher's Haul"],
            benefits: [
                [{value: 15, desc: "+{0}% Fish Food Modifier Effectiveness", category: "Fishing"}],
                [{value: 30, desc: "+{0}% Fish Food Modifier Effectiveness", category: "Fishing"}],
            ],
            position: [8, 6],
            imageName: "Fishing/Talent_Pescatarian",
        },
        {
            name: "Deadliest Catch",
            description: "Increased quality of fish caught during storms",
            rank: 3,
            prerequisites: ["Fisher's Haul"],
            benefits: [
                [{value: 10, desc: "+{0}% Quality of Caught Fish while in a Storm", category: "Misc"}],
            ],
            position: [8, 4],
            imageName: "Fishing/Talent_DeadliestCatch",
        },
        {
            name: "The Golden Zone",
            description: "Increased size of capture area when fishing",
            rank: 3,
            prerequisites: ["Deadliest Catch", "Pescatarian"],
            benefits: [
                [{value: 5, desc: "+{0}% Fishing Capture Zone Size", category: "Fishing"}],
                [{value: 15, desc: "+{0}% Fishing Capture Zone Size", category: "Fishing"}],
                [{value: 30, desc: "+{0}% Fishing Capture Zone Size", category: "Fishing"}],
            ],
            position: [9, 5],
            imageName: "Fishing/Talent_GoldenZone",
        },
        {
            name: "Medium Game Fisher",
            description: "Increases the likelyhood of finding uncommon fish",
            rank: 4,
            prerequisites: ["The Golden Zone"],
            benefits: [
                [{value: 10, desc: "+{0}% chance to catch Uncommon Fish", category: "Misc"}, {value: -2, desc: "+{0}% chance to catch Common Fish", category: "Misc"}],
                [{value: 25, desc: "+{0}% chance to catch Uncommon Fish", category: "Misc"}, {value: -5, desc: "+{0}% chance to catch Common Fish", category: "Misc"}],
            ],
            position: [10, 7],
            imageName: "Fishing/Talent_MediumGameFisher",
        },
        {
            name: "Big Game Fisher",
            description: "Increases the likelyhood of finding rare and unique fish",
            rank: 4,
            prerequisites: ["The Golden Zone"],
            benefits: [
                [{value: 10, desc: "+{0}% chance to catch Rare Fish", category: "Misc"}, {value: 10, desc: "+{0}% chance to catch Unique Fish", category: "Misc"}, {value: -2, desc: "+{0}% chance to catch Common Fish", category: "Misc"}],
                [{value: 20, desc: "+{0}% chance to catch Rare Fish", category: "Misc"}, {value: 20, desc: "+{0}% chance to catch Unique Fish", category: "Misc"}, {value: -5, desc: "+{0}% chance to catch Common Fish", category: "Misc"}],
            ],
            position: [10, 3],
            imageName: "Fishing/Talent_BigGameFisher",
        },
        {
            name: "Natural Angler",
            description: "Increased size of capture area when fishing",
            rank: 1,
            prerequisites: [],
            benefits: [
                [{value: 10, desc: "+{0}% Fishing Capture Zone Size", category: "Fishing"}],
                [{value: 20, desc: "+{0}% Fishing Capture Zone Size", category: "Fishing"}],
            ],
            position: [0, 7],
            imageName: "Fishing/Talent_NaturalAngler",
        },
    ]),
    fullTracks: [] as FullTrack[]
};
