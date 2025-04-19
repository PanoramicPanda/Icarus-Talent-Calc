import {Track} from "../../constants/trackStructure.ts";

export const resourcesTreeTracks: Track[] = [
    {from: "Lumber Yield", to: "Wood Breakdown"},
    {from: "Wood Breakdown", to: [3, 0]},
    {from: [3, 0], to: "Movin' Wood"},
    {from: [3, 0], to: "Seasoned Logsman"},
    {from: "Seasoned Logsman", to: "Friend Of The Trees"},
    {from: "Seasoned Logsman", to: "Peerless Lumberjack"},
    {from: "Skilled Picker", to: "All The Good Stuff"},
    {from: "Rock Star", to: [2, 4]},
    {from: [2, 4], to: "Oxygen Thief"},
    {from: [2, 4], to: "Waste Not"},
    {from: [2, 4], to: "Slinging Stone"},
    {from: "Slinging Stone", to: [4, 4]},
    {from: [4, 4], to: "Unburdened"},
    {from: [4, 4], to: "Iron Miner"},
    {from: "Unburdened", to: [6, 3]},
    {from: "Iron Miner", to: [6, 5]},
    {from: [6, 3], to: "Lucky Strike"},
    {from: [6, 5], to: "Lucky Strike"},
    {from: "Dense Packing I", to: [1, 6]},
    {from: [1, 6], to: "Carry On"},
    {from: [1, 6], to: [2, 6]},
    {from: [2, 6], to: "Exotic Power"},
    {from: [2, 6], to: "Dense Packing II"},
    {from: "Dense Packing II", to: [3, 7]},
    {from: [3, 7], to: "Exotic Sprinter"}
]