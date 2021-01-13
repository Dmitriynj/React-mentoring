// import { filter } from 'lodash';
import { GET_MOVIES_IN_PROGRESS, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE } from './actions';
import { reducersFactory } from './reducer-factory';

const initialState = {
  moviesData: { data: [] },
  loading: false,
  errors: [],
};

const handlers = {};

handlers[GET_MOVIES_IN_PROGRESS] = (state) => {
  return {
    ...state,
    loading: true,
  };
};
handlers[GET_MOVIES_SUCCESS] = (state, action) => {
  const { moviesData } = action.payload;
  return {
    ...state,
    loading: false,
    moviesData,
  };
};
handlers[GET_MOVIES_FAILURE] = (state, action) => {
  const { error } = action.payload;
  return {
    ...state,
    loading: false,
    errors: [...state.errors, error],
  };
};

const moviesReducer = reducersFactory(initialState, handlers);

export { moviesReducer };
