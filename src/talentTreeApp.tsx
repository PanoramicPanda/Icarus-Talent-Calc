import {useEffect, useState} from 'react';
import {Categories, talentTreeMap, Trees} from "./data/talentTreeMap.ts";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    Stack,
    Typography
} from '@mui/material';
import RankProgressBar from "./components/talentTree/rankProgressBar.tsx";
import PointTotals from './components/pointTotals';
import {getPoolForTree, pointPools} from "./data/points.ts";
import {GAME_VERSION} from './constants/gameVersion';
import ChangelogDialog from './components/changelogDialog';
import {
    calculatePointsSpent,
    importFromQueryParam,
    isVersionMismatch
} from './utils/exportImport';
import SummaryBox from "./components/summaryBox.tsx";
import {preloadAllTalentImages} from './utils/imagePreload';
import './talentTree.css'
import {TalentTree} from "./components/talentTree/talentTree.tsx";
import ResetButtons from "./components/resetButtons.tsx";
import ImportExportButtons from './components/importExportButtons.tsx';


export default function TalentTreeApp() {
    const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null);
    const [selectedTree, setSelectedTree] = useState<keyof typeof Trees | null>(null);
    const [talentPoints, setTalentPoints] = useState<Record<string, Record<string, number>>>({});
    const [talentPointsSpent, setTalentPointsSpent] = useState<Record<string, number>>({});
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    // @ts-ignore
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [confirmResetAllOpen, setConfirmResetAllOpen] = useState(false);
    const [confirmResetTreeOpen, setConfirmResetTreeOpen] = useState(false);
    const [changelogOpen, setChangelogOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [importText, setImportText] = useState('');
    const [exportText, setExportText] = useState('');
    // @ts-ignore
    const [blockingTalents, setBlockingTalents] = useState<Set<string>>(new Set());

    useEffect(() => {
        (window as any).setBlockingTalents = setBlockingTalents;
        return () => {
            delete (window as any).setBlockingTalents;
        };
    }, []);


    useEffect(() => {
        const runAfterPaint = () => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => preloadAllTalentImages());
            } else {
                setTimeout(() => preloadAllTalentImages(), 500); // Slight delay to let UI paint
            }
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(runAfterPaint);
        });
    }, []);

    useEffect(() => {
        const buildParam = new URLSearchParams(window.location.search).get('build');
        if (buildParam) {
            const imported = importFromQueryParam(buildParam);
            if (imported) {
                if (isVersionMismatch(imported.gameVersion)) {
                    setSnackbarMessage("Version mismatch. We'll match what we can, but review your Trees.");
                    setSnackbarOpen(true);
                }

                setTalentPoints(imported.talentPoints);
                setTalentPointsSpent(calculatePointsSpent(imported.talentPoints));
            }
        }
    }, []);

    useEffect(() => {
        const allCategories = Object.values(Categories);
        if (allCategories.length === 1) {
            const onlyCategory = allCategories[0];
            setSelectedCategory(onlyCategory);

            const treesInCategory = Object.keys(Trees)
                .filter(tree => Trees[tree as keyof typeof Trees].category === onlyCategory);

            if (treesInCategory.length === 1) {
                setSelectedTree(treesInCategory[0] as keyof typeof Trees);
            }
        }
    }, []);


    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                justifyContent: 'center', // horizontally center
                alignItems: 'flex-start', // top-aligned
                px: 2,
                py: 4,
                boxSizing: 'border-box'
            }}
        >
            {/* Game Version Display */}
            <Typography
                variant="caption"
                sx={{position: 'absolute', top: 8, right: 12, color: '#aaa'}}
            >
                Game Version: {GAME_VERSION}
            </Typography>

            {/* Changelog Button */}
            <Button
                variant="outlined"
                size="small"
                color="info"
                onClick={() => setChangelogOpen(true)}
            >
                View Changelog
            </Button>

            {/* Summary Box */}
            <SummaryBox talentPoints={talentPoints} allTalents={talentTreeMap}/>

            <Box sx={{width: 600}}>
                {/* Point Totals */}
                <PointTotals talentPoints={talentPoints}/>

                {/* Reset Buttons */}
                <ResetButtons
                    selectedTree={selectedTree}
                    onResetAll={() => {
                        setTalentPoints({});
                        setTalentPointsSpent({});
                        setSnackbarMessage("All points have been reset.");
                    }}
                    onResetTree={(treeKey) => {
                        const treeData = talentTreeMap[treeKey];
                        if (!treeData) return;

                        const talentsInTree = treeData.talents;
                        setTalentPoints(prev => {
                            const updated = {...prev};
                            for (const talent of talentsInTree) {
                                delete updated[treeKey][talent.name];
                            }
                            return updated;
                        });

                        setTalentPointsSpent(prev => ({
                            ...prev,
                            [treeKey]: 0,
                        }));

                        setSnackbarMessage(`Reset all points from the ${Trees[treeKey].name} tree.`);
                    }}
                    confirmResetAllOpen={confirmResetAllOpen}
                    confirmResetTreeOpen={confirmResetTreeOpen}
                    setConfirmResetAllOpen={setConfirmResetAllOpen}
                    setConfirmResetTreeOpen={setConfirmResetTreeOpen}
                />


                {/* Export/Import Buttons */}
                <ImportExportButtons
                    talentPoints={talentPoints}
                    setTalentPoints={setTalentPoints}
                    setTalentPointsSpent={setTalentPointsSpent}
                    snackbar={{setMessage: setSnackbarMessage, setOpen: setSnackbarOpen}}
                    importDialogOpen={importDialogOpen}
                    setImportDialogOpen={setImportDialogOpen}
                    exportDialogOpen={exportDialogOpen}
                    setExportDialogOpen={setExportDialogOpen}
                    importText={importText}
                    setImportText={setImportText}
                    exportText={exportText}
                    setExportText={setExportText}
                />

                <div>
                    {/* Category Selection */}
                    {Object.values(Categories).length > 1 && (
                        <Box sx={{mb: 3}}>
                            <Stack direction="row" spacing={2}>
                                {Object.values(Categories).map(category => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? 'contained' : 'outlined'}
                                        onClick={() => {
                                            const treesInCategory = Object.keys(Trees)
                                                .filter(tree => Trees[tree as keyof typeof Trees].category === category);

                                            setSelectedCategory(category);

                                            if (treesInCategory.length === 1) {
                                                setSelectedTree(treesInCategory[0] as keyof typeof Trees);
                                            } else {
                                                setSelectedTree(null);
                                            }
                                        }}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </Stack>
                        </Box>
                    )}


                    {/*Tree Selection*/}
                    {selectedCategory && Object.keys(Trees)
                        .filter(tree => Trees[tree as keyof typeof Trees].category === selectedCategory).length > 1 && (
                        <Box sx={{mb: 2}}>
                            <Typography variant="h6" gutterBottom>
                                Select a Tree
                            </Typography>
                            <Stack direction="row" spacing={2} flexWrap="wrap">
                                {Object.keys(Trees)
                                    .filter(tree => Trees[tree as keyof typeof Trees].category === selectedCategory)
                                    .map(tree => (
                                        <Button
                                            key={tree}
                                            variant={selectedTree === tree ? 'contained' : 'outlined'}
                                            onClick={() => setSelectedTree(tree as keyof typeof Trees)}
                                        >
                                            {Trees[tree as keyof typeof Trees].name}
                                        </Button>
                                    ))}
                            </Stack>
                        </Box>
                    )}


                    {/*Rank Progress Bar*/}
                    {selectedTree && (
                        <RankProgressBar pointsSpent={talentPointsSpent[selectedTree] || 0}/>
                    )}

                    {/*Talent Tree Display*/}
                    {selectedTree && (
                        <TalentTree
                            treeKey={selectedTree}
                            talents={talentTreeMap[selectedTree]!.talents}
                            tracks={talentTreeMap[selectedTree]!.tracks}
                            pointsSpent={talentPointsSpent[selectedTree] || 0}
                            talentPoints={talentPoints}
                            onShowError={setSnackbarMessage}
                            onRankChange={(talentName, delta) => {
                                const talent = talentTreeMap[selectedTree]!.talents.find(t => t.name === talentName);
                                if (!talent) return;

                                const pool = getPoolForTree(talent.tree);
                                if (!pool) return;

                                const poolCap = pointPools[pool].cap;

                                const totalPointsInPool = Object.entries(talentPointsSpent)
                                    .filter(([tree]) => pointPools[pool].trees.includes(tree as keyof typeof Trees))
                                    .reduce((sum, [, pts]) => sum + pts, 0);

                                const isSpending = delta > 0;
                                const currentTalentPoints = talentPoints[selectedTree!]?.[talentName] || 0;
                                const maxPoints = talent.benefits.length;

                                if (isSpending) {
                                    if (currentTalentPoints >= maxPoints) return; // already maxed
                                    if (totalPointsInPool >= poolCap) {
                                        setSnackbarMessage(`You’ve reached the ${pool} pool cap of ${poolCap} points.`);
                                        return;
                                    }
                                }

                                // Proceed with change
                                setTalentPoints(prev => {
                                    const treePoints = prev[selectedTree!] || {};
                                    const current = talentPoints[selectedTree!]?.[talentName] || 0;
                                    const next = Math.max(0, current + delta);
                                    return {
                                        ...prev,
                                        [selectedTree!]: {
                                            ...treePoints,
                                            [talentName]: next
                                        }
                                    };
                                });


                                setTalentPointsSpent(prev => {
                                    const current = prev[selectedTree!] || 0;
                                    const next = Math.max(0, current + delta);
                                    return {...prev, [selectedTree!]: next};
                                });
                            }}
                            blockingTalents={blockingTalents}
                            setBlockingTalents={setBlockingTalents}
                        />
                    )}

                    {/* Snackbar for Error Messages */}
                    <Snackbar
                        open={!!snackbarMessage}
                        autoHideDuration={4000}
                        onClose={() => {
                            setSnackbarMessage(null);
                            setBlockingTalents(new Set());
                        }}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    >
                        <Alert severity="warning" variant="filled" onClose={() => setSnackbarMessage(null)}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    {/* Changelog Dialog */}
                    <ChangelogDialog open={changelogOpen} onClose={() => setChangelogOpen(false)}/>

                </div>
            </Box>
        </Box>
    );
}


