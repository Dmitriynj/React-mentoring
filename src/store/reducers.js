import {
  GET_MOVIES_IN_PROGRESS,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  CHANGE_QUERY_OPTIONS,
  GET_MOVIE_BY_ID_IN_PROGRESS,
  GET_MOVIE_BY_ID_SUCCESS,
  GET_MOVIE_BY_ID_FAILURE,
  UPDATE_MOVIE_IN_PROGRESS,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAILURE,
  REMOVE_MOVIE_IN_PROGRESS,
  REMOVE_MOVIE_SUCCESS,
  REMOVE_MOVIE_FAILURE,
} from './actions';
import { reducersFactory } from './reducer-factory';

const initialState = {
  moviesData: { data: [] },
  queryOptions: {
    search: '',
    sortBy: 'release_date',
    searchBy: 'title',
    offset: 0,
    limit: 12,
  },
  curEditingMovie: {},
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

handlers[CHANGE_QUERY_OPTIONS] = (state, action) => {
  const { queryOptions } = action.payload;
  return {
    ...state,
    queryOptions: { ...state.queryOptions, ...queryOptions },
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
    curEditingMovie: movie,
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

const moviesReducer = reducersFactory(initialState, handlers);

export { moviesReducer };
