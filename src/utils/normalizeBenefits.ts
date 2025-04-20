type Benefit = { value: string; desc?: string };
type NormalizedBenefit = { value: string; desc: string };

export function normalizeBenefits(
    benefits: Benefit[][],
    fallbackDesc = ''
): NormalizedBenefit[][] {
    let lastDesc = fallbackDesc;
    return benefits.map(tier =>
        tier.map(({ value, desc }) => {
            if (desc) lastDesc = desc;
            return { value, desc: desc ?? lastDesc };
        })
    );
}
