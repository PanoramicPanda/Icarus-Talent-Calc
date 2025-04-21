import { describe, it, expect, assert } from 'vitest';
import { talentTreeMap } from '../talentTreeMap.ts';
import { FullTrack, TalentData } from '../../constants/treeStructures.ts';

// Utility to detect cycles using DFS
// Utility to detect cycles using DFS
function hasCycle(graph: Record<string, string[]>): { hasCycle: boolean; path?: string[] } {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const pathStack: string[] = [];

    function visit(node: string): boolean {
        if (recStack.has(node)) {
            const cycleStartIndex = pathStack.indexOf(node);
            return cycleStartIndex !== -1
                ? (cyclePath.push(...pathStack.slice(cycleStartIndex)), true)
                : true;
        }
        if (visited.has(node)) return false;

        visited.add(node);
        recStack.add(node);
        pathStack.push(node);

        for (const neighbor of graph[node] || []) {
            if (visit(neighbor)) return true;
        }

        pathStack.pop();
        recStack.delete(node);
        return false;
    }

    const cyclePath: string[] = [];

    for (const node of Object.keys(graph)) {
        if (visit(node)) {
            return { hasCycle: true, path: [...cyclePath, cyclePath[0]] };
        }
    }

    return { hasCycle: false };
}

describe('Talent Tree Validation', () => {
    Object.entries(talentTreeMap).forEach(([treeKey, treeData]) => {
        if (!treeData) return;

        const { talents, fullTracks } = treeData as {
            talents: TalentData[];
            fullTracks: FullTrack[];
        };

        describe(`Tree: ${treeKey}`, () => {
            it('has valid talent format', () => {
                for (const talent of talents) {
                    expect(talent).toHaveProperty('name');
                    expect(talent).toHaveProperty('description');
                    expect(talent).toHaveProperty('rank');
                    expect(talent).toHaveProperty('benefits');
                    expect(talent).toHaveProperty('position');
                    expect(Array.isArray(talent.benefits)).toBe(true);
                    expect(Array.isArray(talent.position)).toBe(true);
                }
            });

            it('does not have circular prerequisites', () => {
                const graph: Record<string, string[]> = {};
                for (const talent of talents) {
                    const flatPrereqs = (talent.prerequisites ?? []).flatMap((req) =>
                        Array.isArray(req) ? req : [req]
                    );
                    graph[talent.name] = flatPrereqs;
                }
                const result = hasCycle(graph);
                if (result.hasCycle) {
                    console.error('❌ Prerequisite cycle detected:', result.path?.join(' → '));
                }
                assert(!result.hasCycle, `Cycle found in prerequisites: ${result.path?.join(" → ")}`);
            });

            it('does not have circular track paths', () => {
                const graph: Record<string, string[]> = {};
                for (const track of fullTracks) {
                    const fromKey = track.start;
                    const toKey = track.end;
                    if (!graph[fromKey]) graph[fromKey] = [];
                    graph[fromKey].push(toKey);
                }
                const result = hasCycle(graph);
                if (result.hasCycle) {
                    console.error('❌ Track cycle detected:', result.path?.join(' → '));
                }
                expect(result.hasCycle).toBe(false);
            });
        });
    });
});