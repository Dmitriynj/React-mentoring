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
  DISMISS_NOTIFICATION,
  CREATE_MOVIE_IN_PROGRESS,
  CREATE_MOVIE_FAILURE,
  CREATE_MOVIE_SUCCESS,
} from './actions';
import { reducersFactory } from './reducer-factory';

const initialState = {
  moviesData: { data: [] },
  movieDetails: {},
  loading: false,
  error: {},
};

const handlers = {};

const getError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    return {
      message: error.response.data,
      status: error.response.status,
      id: `error-${Date.now()}`,
    };
  }
  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return {
      message: 'Something went wrong, please check your connection',
      id: `error-${Date.now()}`,
    };
  }
  // Something happened in setting up the request that triggered an Error
  console.log('Error', error.message);
  return {
    message: 'Something went wrong, please contact admin',
    id: `error-${Date.now()}`,
  };
};

const loading = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const setError = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    loading: false,
    error: getError(error),
  };
};

handlers[GET_MOVIES_IN_PROGRESS] = loading;
handlers[GET_MOVIES_SUCCESS] = (state, action) => {
  const { moviesData } = action.payload;
  return {
    ...state,
    loading: false,
    moviesData,
  };
};
handlers[GET_MOVIES_FAILURE] = setError;
handlers[GET_MOVIE_BY_ID_IN_PROGRESS] = loading;
handlers[GET_MOVIE_BY_ID_SUCCESS] = (state, action) => {
  const { movie } = action.payload;
  return {
    ...state,
    loading: false,
    movieDetails: movie,
  };
};
handlers[GET_MOVIE_BY_ID_FAILURE] = setError;
handlers[UPDATE_MOVIE_IN_PROGRESS] = loading;
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
handlers[UPDATE_MOVIE_FAILURE] = setError;
handlers[REMOVE_MOVIE_IN_PROGRESS] = loading;
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
handlers[REMOVE_MOVIE_FAILURE] = setError;
handlers[CLEAR_MOVIE_DETAILS] = (state) => {
  return {
    ...state,
    movieDetails: undefined,
  };
};
handlers[CREATE_MOVIE_IN_PROGRESS] = loading;
handlers[CREATE_MOVIE_FAILURE] = setError;
handlers[CREATE_MOVIE_SUCCESS] = (state) => {
  return {
    ...state,
    loading: false,
  };
};

handlers[DISMISS_NOTIFICATION] = (state) => {
  return {
    ...state,
    error: {},
  };
};

const moviesReducer = reducersFactory(initialState, handlers);

export { moviesReducer };
