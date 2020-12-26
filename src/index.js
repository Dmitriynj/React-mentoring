import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppStateContextProvider } from './contexts/AppStateContext';
import { App } from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ErrorBoundary>
    <AppStateContextProvider>
      <App />
    </AppStateContextProvider>
  </ErrorBoundary>,
  rootElement
);
