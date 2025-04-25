import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { Download, Upload } from '@mui/icons-material';
import { exportToJson, exportToQueryParam } from '../utils/exportImport';
import { ExportedTalentState } from '../utils/exportImport';
import { GAME_VERSION } from '../constants/gameVersion';

interface ImportExportProps {
    talentPoints: Record<string, Record<string, number>>;
    setTalentPoints: (val: Record<string, Record<string, number>>) => void;
    setTalentPointsSpent: (val: Record<string, number>) => void;
    snackbar: {
        setMessage: (msg: string) => void;
        setOpen: (open: boolean) => void;
    };
    importDialogOpen: boolean;
    setImportDialogOpen: (val: boolean) => void;
    exportDialogOpen: boolean;
    setExportDialogOpen: (val: boolean) => void;
    importText: string;
    setImportText: (text: string) => void;
    exportText: string;
    setExportText: (text: string) => void;
}

export default function ImportExportButtons({
                                                talentPoints,
                                                setTalentPoints,
                                                setTalentPointsSpent,
                                                snackbar,
                                                importDialogOpen,
                                                setImportDialogOpen,
                                                exportDialogOpen,
                                                setExportDialogOpen,
                                                importText,
                                                setImportText,
                                                exportText,
                                                setExportText,
                                            }: ImportExportProps) {
    const handleCopyURL = () => {
        const encoded = exportToQueryParam(talentPoints);
        const url = `${window.location.origin}${window.location.pathname}?build=${encoded}`;
        navigator.clipboard.writeText(url);
        snackbar.setMessage('Build URL copied to clipboard!');
        snackbar.setOpen(true);
    };

    const handleImport = () => {
        try {
            const parsed = JSON.parse(importText) as ExportedTalentState;
            if (!parsed.talentPoints || !parsed.gameVersion) {
                throw new Error('Invalid format');
            }

            let completedMessage;
            if (parsed.gameVersion !== GAME_VERSION) {
                completedMessage = "Version mismatch. We'll match what we can, but review your Trees.";
            } else {
                completedMessage = "Build imported successfully.";
            }

            setTalentPoints(parsed.talentPoints);
            const newSpent: Record<string, number> = {};
            for (const [treeKey, talents] of Object.entries(parsed.talentPoints)) {
                newSpent[treeKey] = Object.values(talents).reduce((sum, pts) => sum + pts, 0);
            }
            setTalentPointsSpent(newSpent);

            setImportDialogOpen(false);
            snackbar.setMessage(completedMessage);
            snackbar.setOpen(true);
        } catch {
            snackbar.setMessage('Invalid JSON. Please check your input.');
            snackbar.setOpen(true);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Button startIcon={<Upload />} onClick={() => setImportDialogOpen(true)}>
                    Import Build
                </Button>

                <Button startIcon={<Download />} onClick={() => {
                    const data = exportToJson(talentPoints);
                    setExportText(data);
                    setExportDialogOpen(true);
                }}>
                    Export Build
                </Button>

                <Button variant="outlined" onClick={handleCopyURL}>
                    Copy URL
                </Button>
            </Box>

            {/* Export Dialog */}
            <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Export Build</DialogTitle>
                <DialogContent>
                    <TextField
                        value={exportText}
                        multiline
                        fullWidth
                        minRows={10}
                        slotProps={{ input: { readOnly: true } }}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(exportText);
                        snackbar.setMessage('Build copied to clipboard!');
                        snackbar.setOpen(true);
                    }}>
                        Copy to Clipboard
                    </Button>
                    <Button onClick={() => setExportDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Import Dialog */}
            <Dialog open={importDialogOpen} onClose={() => setImportDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Import Build</DialogTitle>
                <DialogContent>
                    <TextField
                        value={importText}
                        onChange={e => setImportText(e.target.value)}
                        multiline
                        fullWidth
                        minRows={10}
                        placeholder="Paste your exported build JSON here..."
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImport}>Load Build</Button>
                    <Button onClick={() => setImportDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
