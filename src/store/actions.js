export const GET_MOVIES_IN_PROGRESS = 'GET_MOVIES_IN_PROGRESS';
export const getMoviesInProgress = () => ({
  type: GET_MOVIES_IN_PROGRESS,
});

export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const getMoviesSuccess = (data) => ({
  type: GET_MOVIES_SUCCESS,
  payload: { moviesData: data },
});

export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';
export const getMoviesFailure = (error) => ({
  type: GET_MOVIES_FAILURE,
  payload: { error },
});

export const GET_MOVIE_BY_ID_IN_PROGRESS = 'GET_MOVIE_BY_ID_IN_PROGRESS';
export const getMovieByIdInProgress = (id) => ({
  type: GET_MOVIE_BY_ID_IN_PROGRESS,
  payload: { id },
});
export const GET_MOVIE_BY_ID_SUCCESS = 'GET_MOVIE_BY_ID_SUCCESS';
export const getMovieByIdSuccess = (data) => ({
  type: GET_MOVIE_BY_ID_SUCCESS,
  payload: { movie: data },
});
export const GET_MOVIE_BY_ID_FAILURE = 'GET_MOVIE_BY_ID_FAILURE';
export const getMovieByIdFailure = () => ({
  type: GET_MOVIE_BY_ID_FAILURE,
});

export const CLEAR_MOVIE_DETAILS = 'CLEAR_MOVIE_DETAILS';
export const clearMovieDetails = () => ({
  type: CLEAR_MOVIE_DETAILS,
});

export const UPDATE_MOVIE_IN_PROGRESS = 'UPDATE_MOVIE_IN_PROGRESS';
export const updateMovieInProgress = (id) => ({
  type: UPDATE_MOVIE_IN_PROGRESS,
  payload: { id },
});
export const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
export const updateMovieSuccess = (data) => ({
  type: UPDATE_MOVIE_SUCCESS,
  payload: { movie: data },
});
export const UPDATE_MOVIE_FAILURE = 'UPDATE_MOVIE_FAILURE';
export const updateMovieFailure = (error) => ({
  type: UPDATE_MOVIE_FAILURE,
  payload: { error },
});

export const REMOVE_MOVIE_IN_PROGRESS = 'REMOVE_MOVIE_IN_PROGRESS';
export const removeMovieInProgress = () => ({
  type: REMOVE_MOVIE_IN_PROGRESS,
});
export const REMOVE_MOVIE_SUCCESS = 'REMOVE_MOVIE_SUCCESS';
export const removeMovieSuccess = (id) => ({
  type: REMOVE_MOVIE_SUCCESS,
  payload: { id },
});
export const REMOVE_MOVIE_FAILURE = 'REMOVE_MOVIE_FAILURE';
export const removeMovieFailure = (error) => ({
  type: REMOVE_MOVIE_FAILURE,
  payload: { error },
});

export const CREATE_MOVIE_IN_PROGRESS = 'CREATE_MOVIE_IN_PROGRESS';
export const createMovieInProgress = () => ({
  type: CREATE_MOVIE_IN_PROGRESS,
});
export const CREATE_MOVIE_SUCCESS = 'CREATE_MOVIE_SUCCESS';
export const createMovieSuccess = () => ({
  type: REMOVE_MOVIE_SUCCESS,
});
export const CREATE_MOVIE_FAILURE = 'CREATE_MOVIE_FAILURE';
export const createMovieFailure = (error) => ({
  type: CREATE_MOVIE_FAILURE,
  payload: { error },
});

// export
