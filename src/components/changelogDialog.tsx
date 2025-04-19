import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import changelog from '../data/changelog.md?raw';

export default function ChangelogDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Changelog</DialogTitle>
            <DialogContent dividers>
                <ReactMarkdown>{changelog}</ReactMarkdown>
            </DialogContent>
        </Dialog>
    );
}
