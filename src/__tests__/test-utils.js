/* eslint-disable react/prop-types */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { moviesReducer } from '../store/reducers';

function render(
  ui,
  { initialState, store = createStore(moviesReducer, initialState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/jest-dom/extend-expect';
// override render method
export { render };
