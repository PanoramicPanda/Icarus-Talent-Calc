import { Box, Button, Stack } from '@mui/material';
import { Categories, Trees, getCategoryIcon } from '../data/talentTreeMap';

interface CategoryRibbonProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: Categories) => void;
    setSelectedTree: (tree: string | null) => void;
}

export default function CategoryRibbon({
                                            selectedCategory,
                                            setSelectedCategory,
                                            setSelectedTree,
                                        }: CategoryRibbonProps) {
    const allCategories = Object.values(Categories);

    if (allCategories.length <= 1) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Stack direction="row" spacing={2}>
                {allCategories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'contained' : 'outlined'}
                        onClick={() => {
                            const treesInCategory = Object.keys(Trees).filter(
                                tree => Trees[tree as keyof typeof Trees].category === category
                            );

                            setSelectedCategory(category);

                            if (treesInCategory.length === 1) {
                                setSelectedTree(treesInCategory[0]);
                            } else {
                                setSelectedTree(null);
                            }
                        }}
                        startIcon={
                            getCategoryIcon(category) ? (
                                <img
                                    src={getCategoryIcon(category)}
                                    alt={category}
                                    style={{ width: 12, height: 12 }}
                                />
                            ) : undefined
                        }
                    >
                        {category}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
}
