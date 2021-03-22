import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { moviesReducer } from './reducers';

const reducers = {
  moviesReducer,
};

const rootReducer = combineReducers(reducers);

export const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)));
};
