import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';

import './scss/app.scss';
import { BrowserRouter } from 'react-router-dom';
import { BASE_PATH } from './basePath';

const root = createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter basename={BASE_PATH}>
        <App />
    </BrowserRouter>
);