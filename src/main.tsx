import React from 'react';
import ReactDOM from 'react-dom/client';
import TalentTreeApp from "./talentTreeApp.tsx";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <TalentTreeApp />
        </ThemeProvider>
    </React.StrictMode>
);