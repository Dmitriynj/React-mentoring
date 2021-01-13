export const getMovies = (state) => {
  return state.moviesReducer.moviesData?.data;
};
