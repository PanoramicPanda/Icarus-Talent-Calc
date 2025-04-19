# Icarus Talent Calculator

A web-based talent calculator and planner for the survival game **Icarus** by RocketWerkz.

This tool allows players to plan out their builds, explore talent trees, and share them with others. It supports features like multi-pool point caps, smart prerequisite logic, rank-based refund gating, and more — all within a clean, modern UI powered by React and MUI.

## 🌐 Live Demo

👉 [Coming Soon]

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
    benefits: ["+5%", "+10%", "+15%"],
    benefitsDesc: "Headshot Damage"
  },
  ...
])
```
3. Add your tree to `talentTreeMap.ts`:

```ts
import { combatTree } from './data/combat';
...
export const talentTreeMap = {
  Combat: combatTree,
  ...
};
```

4. Define any track connections using [from, to] positions or talent names within the tracks property of the tree file. The coordinates are treated like a two dimensional grid, with the origin at the top left corner, and the rows going downwards.


### 🛡 Talent Data Guidelines

- Talent `name` must be unique within a tree
- `rank` should be 1–4, with appropriate gating
- Use `benefits` and `benefitsDesc` to group effects in the summary
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