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
export const getMoviesFailure = ({ error }) => ({
  type: GET_MOVIES_FAILURE,
  payload: { error },
});
