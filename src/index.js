import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

hydrate(<App Router={BrowserRouter} />, document.getElementById('root'));
