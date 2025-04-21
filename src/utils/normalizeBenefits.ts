type Benefit = { value: number; desc?: string; category?: string };
type NormalizedBenefit = { value: number; desc: string; category?: string };

export function normalizeBenefits(
    benefits: Benefit[][],
    fallbackDesc = ''
): NormalizedBenefit[][] {
    let lastDesc = fallbackDesc;
    return benefits.map(tier =>
        tier.map(({ value, desc, category }) => {
            if (desc) lastDesc = desc;
            return { value, desc: desc ?? lastDesc, category };
        })
    );
}


export function formatBenefit(b: { value: number; desc: string }): string {
    const filled = b.desc.replace("{0}", Math.abs(b.value).toString());
    return b.value < 0 && b.desc.startsWith("+")
        ? filled.replace("+", "-")
        : filled;
}
