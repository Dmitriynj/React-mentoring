import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppStateContextProvider } from './contexts/AppStateContext';
import { configureStore } from './store/store';
import { App } from './App';

const store = configureStore();

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <AppStateContextProvider>
        <App />
      </AppStateContextProvider>
    </Provider>
  </ErrorBoundary>,
  rootElement
);
