import { Button } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ConfirmDialog from "./confirmDialog";
import { Trees } from "../data/talentTreeMap";

interface ResetButtonsProps {
    selectedTree: keyof typeof Trees | null;
    onResetAll: () => void;
    onResetTree: (treeKey: keyof typeof Trees) => void;
    confirmResetAllOpen: boolean;
    confirmResetTreeOpen: boolean;
    setConfirmResetAllOpen: (val: boolean) => void;
    setConfirmResetTreeOpen: (val: boolean) => void;
}

export default function ResetButtons({
                                         selectedTree,
                                         onResetAll,
                                         onResetTree,
                                         confirmResetAllOpen,
                                         confirmResetTreeOpen,
                                         setConfirmResetAllOpen,
                                         setConfirmResetTreeOpen
                                     }: ResetButtonsProps) {
    return (
        <>
            {/* Reset All Button */}
            <Button
                variant="outlined"
                color="warning"
                startIcon={<RestartAltIcon />}
                onClick={() => setConfirmResetAllOpen(true)}
                sx={{ mb: 2 }}
            >
                Reset All
            </Button>

            {/* Reset Tree Button */}
            {selectedTree && (
                <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    startIcon={<RestartAltIcon />}
                    onClick={() => setConfirmResetTreeOpen(true)}
                    sx={{ float: 'right', mb: 1 }}
                >
                    Reset Tree
                </Button>
            )}

            {/* Confirm Dialogs */}
            <ConfirmDialog
                open={confirmResetAllOpen}
                title="Reset All Trees?"
                message="Are you sure you want to reset all talent trees? This cannot be undone."
                onConfirm={() => {
                    onResetAll();
                    setConfirmResetAllOpen(false);
                }}
                onCancel={() => setConfirmResetAllOpen(false)}
            />

            <ConfirmDialog
                open={confirmResetTreeOpen}
                title="Reset This Tree?"
                message={selectedTree ? `Are you sure you want to reset the ${Trees[selectedTree].name} tree?` : ''}
                onConfirm={() => {
                    if (selectedTree) {
                        onResetTree(selectedTree);
                    }
                    setConfirmResetTreeOpen(false);
                }}
                onCancel={() => setConfirmResetTreeOpen(false)}
            />
        </>
    );
}
