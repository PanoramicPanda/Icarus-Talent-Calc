# Icarus Talent Calculator

A web-based talent calculator and planner for the survival game **Icarus** by RocketWerkz.

This tool allows players to plan out their builds, explore talent trees, and share them with others. It supports features like multi-pool point caps, smart prerequisite logic, rank-based refund gating, and more — all within a clean, modern UI powered by React and MUI.

## 🌐 Live Demo

👉 [Icarus Talent Calculator](https://panoramicpanda.github.io/Icarus-Talent-Calc/)

---

## 🧩 Features

- 🔢 Plan and preview talent allocations for all trees
- 🔐 Smart logic for prerequisites and point refunding
- 🔄 Export/import builds as JSON or shareable URL parameters
- 📊 Rank gating logic enforced by point thresholds
- 🎨 Dark mode & polished MUI-based UI
- 🧠 Talent summaries grouped by benefit
- 🔁 Reset options per-tree or globally
- ✅ Data-driven structure for easy expansion

---

## 🛠 Tech Stack

- **React** + **TypeScript**
- **Vite** for fast dev builds
- **MUI (Material UI)** for component styling
- **lz-string** for compact URL encoding
- **Vitest** for unit testing

---

## 🚀 Getting Started

```bash
git clone https://github.com/PanoramicPanda/Icarus-Talent-Calc.git
cd Icarus-Talent-Calc
npm install
npm run dev
```

Access the local app at http://localhost:5173

---
## 📁 Project Structure

```bash
public/
  ├── images/             # Images and icons
src/
  ├── components/         # Reusable UI components
  ├── constants/          # Static enums and mappings
  ├── data/               # Talent and track definitions (by tree)
  ├── utils/              # Logic for import/export, validation, etc.
  └── main.tsx             # Entry component
```

---
## 🤝 Contributing

We welcome contributions — especially for expanding talent data. Here's how to get started:

### 🧩 Adding a New Talent Tree

1. Create a new file in src/data/ for your tree, e.g. combat.ts if one doesn't exist.
1. Use the `defineTalentTree()` helper:
```ts
export const combatTree = defineTalentTree("Combat", [
  {
    name: "Sharpshooter",
    description: "Increase headshot damage.",
    rank: 2,
    position: [0, 0],
    prerequisites: [],
    benefits: [
      [{ value: "+5%", desc: "Headshot Damage" }],
      [{ value: "+10%" }], // Without a description, it will inherit the most recent one
      [{ value: "+15%" }]
    ]
  },
  ...
])
```
3. For talents with **multiple benefits at the same point**, just add multiple entries inside the inner array:
```ts
{
  name: "Bring A Gun To A Gun Fight",
  description: "Increased Damage and Reload Speed with Firearms",
  rank: 2,
  position: [5, 7],
  prerequisites: ["Heavy Hitter"],
  benefits: [
    [
      { value: "+5%", desc: "Damage with Firearms" },
    ],
    [
      { value: "+10%", desc: "Damage with Firearms" },
      { value: "+10%", desc: "Reload Speed with Firearms" }
    ]
  ]
}
```
4. Add your tree to `talentTreeMap.ts`:

```ts
import { combatTree } from './data/combat';
...
export const talentTreeMap = {
  Combat: combatTree,
  ...
};
```

5. Define any track connections using `{from:, to:}` pairs either by:
- Talent names (e.g., `{from: "Iron Miner", to: "Lucky Strike"}`)
- Coordinate references (e.g., `{from: [3, 0], to: "Seasoned Logsman"}`)

Coordinates are treated as `[row, column]` on a grid, with (0, 0) in the top-left.

### 🛡 Talent Data Guidelines

- Talent `name` must be unique within a tree
- `rank` should be 1–4, with appropriate gating
- benefits is an array of arrays of { value, desc } objects
  - Each outer array represents a point spent
  - Each inner array can hold multiple effects for that rank
  - The total amount of outer arrays equals the number of points available for that talent
  - If a `{ value }` is provided with no desc, the most recent previous desc will be used automatically
- `prerequisites` can be:
  - Single string = requires any one
  - Array of strings = requires any one
  - Nested array = all must be met (AND group)
  ```ts
  prerequisites: [["Iron Miner", "Unburdened"], "Dense Packing I"]
  ```

---
## 🧪 Testing

Run all tests:

```bash
npm run test
```

Tests cover:

- Talent refund logic
- Import/export validation
- Talent structure sanity checks

---
## 📦 Build

```bash
npm run build
```
---
## 📜 License

MIT — Open source with ❤️ for the Icarus community.