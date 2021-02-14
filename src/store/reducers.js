import {
  GET_MOVIES_IN_PROGRESS,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIE_BY_ID_IN_PROGRESS,
  GET_MOVIE_BY_ID_SUCCESS,
  GET_MOVIE_BY_ID_FAILURE,
  UPDATE_MOVIE_IN_PROGRESS,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAILURE,
  REMOVE_MOVIE_IN_PROGRESS,
  REMOVE_MOVIE_SUCCESS,
  REMOVE_MOVIE_FAILURE,
  CLEAR_MOVIE_DETAILS,
} from './actions';
import { reducersFactory } from './reducer-factory';

const initialState = {
  moviesData: { data: [] },
  movieDetails: {},
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

handlers[GET_MOVIE_BY_ID_IN_PROGRESS] = (state) => {
  return {
    ...state,
    loading: true,
  };
};
handlers[GET_MOVIE_BY_ID_SUCCESS] = (state, action) => {
  const { movie } = action.payload;
  return {
    ...state,
    loading: false,
    movieDetails: movie,
  };
};
handlers[GET_MOVIE_BY_ID_FAILURE] = (state, action) => {
  const { error } = action.payload;
  return {
    ...state,
    loading: false,
    errors: [...state.errors, error],
  };
};

handlers[UPDATE_MOVIE_IN_PROGRESS] = (state) => {
  return {
    ...state,
    loading: true,
  };
};
handlers[UPDATE_MOVIE_SUCCESS] = (state, action) => {
  const { movie: updatedMovie } = action.payload;
  const updatedMovieArray = state.moviesData.data.map((curMovie) => {
    if (curMovie.id === updatedMovie.id) {
      return updatedMovie;
    }
    return curMovie;
  });
  return {
    ...state,
    moviesData: {
      ...state.moviesData,
      data: updatedMovieArray,
    },
    loading: false,
  };
};
handlers[UPDATE_MOVIE_FAILURE] = (state, action) => {
  const { error } = action.payload;
  return {
    ...state,
    loading: false,
    errors: [...state.errors, error],
  };
};
handlers[REMOVE_MOVIE_IN_PROGRESS] = (state) => {
  return {
    ...state,
    loading: true,
  };
};
handlers[REMOVE_MOVIE_SUCCESS] = (state, action) => {
  const { id } = action.payload;
  const updatedMovieArray = state.moviesData.data.filter(({ id: curId }) => id !== curId);
  return {
    ...state,
    moviesData: {
      ...state.moviesData,
      data: updatedMovieArray,
    },
    loading: false,
  };
};
handlers[REMOVE_MOVIE_FAILURE] = (state, action) => {
  const { error } = action.payload;
  return {
    ...state,
    loading: false,
    errors: [...state.errors, error],
  };
};

handlers[CLEAR_MOVIE_DETAILS] = (state) => {
  return {
    ...state,
    movieDetails: undefined,
  };
};

const moviesReducer = reducersFactory(initialState, handlers);

export { moviesReducer };
