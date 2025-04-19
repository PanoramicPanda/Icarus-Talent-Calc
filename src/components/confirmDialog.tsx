// src/components/ConfirmDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit">Cancel</Button>
                <Button onClick={onConfirm} color="warning" variant="contained" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
