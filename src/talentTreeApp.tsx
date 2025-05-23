import {useEffect, useRef, useState} from 'react';
import {Categories, talentTreeMap, Trees} from "./data/talentTreeMap.ts";
import {
    Alert,
    Box,
    Button,
    IconButton,
    Snackbar,
    Stack,
    Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RankProgressBar from "./components/talentTree/rankProgressBar.tsx";
import PointTotals from './components/pointTotals';
import {getPoolForTree, isPoolPerTreeCap, pointPools} from "./data/points.ts";
import {GAME_VERSION} from './constants/gameVersion';
import InfoDialog from './components/infoDialog.tsx';
import {
    calculatePointsSpent, exportToQueryParam,
    importFromQueryParam,
    isVersionMismatch
} from './utils/exportImport';
import SummaryBox from "./components/summaryBox.tsx";
import './talentTree.css'
import {TalentTree} from "./components/talentTree/talentTree.tsx";
import ResetButtons from "./components/resetButtons.tsx";
import ImportExportButtons from './components/importExportButtons.tsx';
import CategoryRibbon from "./components/categoryRibbon.tsx";
import '@fontsource/barlow';
import '@fontsource/tomorrow';
import {getPointsSpentInPool, getPointsSpentInTree} from "./utils/pointsSpent.ts";


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
    const [infoOpen, setInfoOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [importText, setImportText] = useState('');
    const [exportText, setExportText] = useState('');
    // @ts-ignore
    const [blockingTalents, setBlockingTalents] = useState<Set<string>>(new Set());
    const hasImportedRef = useRef(false);


    // Keep track of Blocking talents
    useEffect(() => {
        (window as any).setBlockingTalents = setBlockingTalents;
        return () => {
            delete (window as any).setBlockingTalents;
        };
    }, []);

    // Import Talent Points from URL
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

        hasImportedRef.current = true;
    }, []);

    // Dynamically update the URL with the talent points
    useEffect(() => {
        if (!hasImportedRef.current) return;

        const hasPoints = Object.values(talentPoints).some(tree =>
            Object.values(tree).some(points => points > 0)
        );

        if (hasPoints) {
            const param = exportToQueryParam(talentPoints);
            const newUrl = `${window.location.pathname}?build=${param}`;
            window.history.replaceState({}, '', newUrl);
        } else {
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, [talentPoints]);


    // Set initial state for selected category and tree
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
                flexDirection: 'row',
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

            {/* Info Button */}
            <IconButton
                aria-label="info"
                onClick={() => setInfoOpen(true)}
                sx={{position: 'absolute', top: 20, right: 12, color: '#aaa'}}
            >
                <InfoIcon />
            </IconButton >

            {/* Summary Box */}
            <Box sx={{ width: 300, flexShrink: 0, mr: 4 }}>
                <SummaryBox talentPoints={talentPoints} allTalents={talentTreeMap} />
            </Box>

            <Box sx={{width: '100%'}}>
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
                            if (!prev?.[treeKey]) return prev;
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
                    <CategoryRibbon
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedTree={setSelectedTree}
                    />


                    {/*Tree Selection*/}
                    {selectedCategory && Object.keys(Trees)
                        .filter(tree => Trees[tree as keyof typeof Trees].category === selectedCategory).length > 1 && (
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
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
                    {selectedTree && selectedCategory != 'Pets' && selectedCategory != 'Mounts' && (
                        <RankProgressBar pointsSpent={talentPointsSpent[selectedTree] || 0}/>
                    )}

                    {/*Talent Tree Display*/}
                    {selectedTree && (
                        <TalentTree
                            treeKey={selectedTree}
                            talents={talentTreeMap[selectedTree]!.talents}
                            fullTracks={talentTreeMap[selectedTree]!.fullTracks}
                            pointsSpent={talentPointsSpent[selectedTree] || 0}
                            talentPoints={talentPoints}
                            onShowError={setSnackbarMessage}
                            onRankChange={(talentName, delta) => {
                                const talent = talentTreeMap[selectedTree]!.talents.find(t => t.name === talentName);
                                if (!talent) return;

                                const pool = getPoolForTree(talent.tree);
                                if (!pool) return;
                                const perTreePoints = isPoolPerTreeCap(pool);

                                const poolCap = pointPools[pool].cap;

                                const totalPointsInPool = getPointsSpentInPool(pool, talentPoints);

                                const spentInTree = getPointsSpentInTree(selectedTree, talentPoints);

                                // const totalPointsInPool = Object.entries(talentPointsSpent)
                                //     .filter(([tree]) => pointPools[pool].trees.includes(tree as keyof typeof Trees))
                                //     .reduce((sum, [, pts]) => sum + pts, 0);

                                const isSpending = delta > 0;
                                const currentTalentPoints = talentPoints[selectedTree!]?.[talentName] || 0;
                                const maxPoints = talent.benefits.length;

                                if (isSpending) {
                                    if (currentTalentPoints >= maxPoints) return; // already maxed
                                    if (perTreePoints) {
                                        if (spentInTree >= poolCap) {
                                            setSnackbarMessage(`You’ve reached the ${selectedTree} tree cap of ${poolCap} points.`);
                                            return;
                                        }
                                    }else {
                                        if (totalPointsInPool >= poolCap) {
                                            setSnackbarMessage(`You’ve reached the ${pool} pool cap of ${poolCap} points.`);
                                            return;
                                        }
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

                    {/* Info Dialog */}
                    <InfoDialog open={infoOpen} onClose={() => setInfoOpen(false)}/>

                </div>
            </Box>
        </Box>
    );
}


