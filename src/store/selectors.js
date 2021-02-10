export const getMovies = (state) => {
  return state.moviesReducer.moviesData?.data;
};

export const getTotalMoviesAmount = (state) => {
  return state.moviesReducer.moviesData?.totalAmount;
};

export const getLoading = (state) => {
  return state.moviesReducer.loading;
};

export const getQueryOptions = (state) => {
  return state.moviesReducer.queryOptions;
};

export const getCurEditingMovie = (state) => {
  return state.moviesReducer.curEditingMovie;
};
