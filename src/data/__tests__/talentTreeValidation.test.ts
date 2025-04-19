import { describe, it, expect } from 'vitest';
import { talentTreeMap } from '../talentTreeMap.ts';
import { Track } from '../../constants/trackStructure.ts';

// Utility to detect cycles using DFS
function hasCycle(graph: Record<string, string[]>): boolean {
    const visited = new Set<string>();
    const recStack = new Set<string>();

    function visit(node: string): boolean {
        if (recStack.has(node)) return true;
        if (visited.has(node)) return false;

        visited.add(node);
        recStack.add(node);

        for (const neighbor of graph[node] || []) {
            if (visit(neighbor)) return true;
        }

        recStack.delete(node);
        return false;
    }

    return Object.keys(graph).some(visit);
}

describe('Talent Tree Validation', () => {
    Object.entries(talentTreeMap).forEach(([treeKey, treeData]) => {
        if (!treeData) return; // Guard against undefined entries

        const { talents, tracks } = treeData;

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
                    const flatPrereqs = talent.prerequisites.flatMap(req =>
                        Array.isArray(req) ? req : [req]
                    );
                    graph[talent.name] = flatPrereqs;
                }
                expect(hasCycle(graph)).toBe(false);
            });

            it('does not have circular track paths', () => {
                const graph: Record<string, string[]> = {};
                for (const track of tracks as Track[]) {
                    const fromKey = Array.isArray(track.from) ? `${track.from[0]},${track.from[1]}` : track.from;
                    const toKey = Array.isArray(track.to) ? `${track.to[0]},${track.to[1]}` : track.to;
                    if (!graph[fromKey]) graph[fromKey] = [];
                    graph[fromKey].push(toKey);
                }
                expect(hasCycle(graph)).toBe(false);
            });
        });
    });
});