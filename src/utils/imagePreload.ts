import { talentTreeMap } from '../data/talentTreeMap';

export function sanitizeTalentName(name: string): string {
    return name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_');
}

function preloadImage(src: string) {
    const img = new Image();
    img.src = src;
}

export function preloadAllTalentImages() {
    const seen = new Set<string>();

    for (const tree of Object.values(talentTreeMap)) {
        if (!tree) continue; // ✅ Fix: skip if tree is undefined

        for (const talent of tree.talents) {
            const imageName = sanitizeTalentName(talent.name);
            if (!seen.has(imageName)) {
                preloadImage(`images/talent_icons/${imageName}.png`);
                seen.add(imageName);
            }
        }
    }

    for (let rank = 1; rank <= 3; rank++) {
        preloadImage(`images/rank_icons/Talent-Rank-${rank}.png`);
    }
}
