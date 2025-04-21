import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import info from '../data/info.md?raw';

export default function InfoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Info</DialogTitle>
            <DialogContent dividers>
                <ReactMarkdown>{info}</ReactMarkdown>
            </DialogContent>
        </Dialog>
    );
}
