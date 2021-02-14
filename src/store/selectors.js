// TODO - replace get with map
export const mapMoviesData = (state) => {
  return state.moviesReducer.moviesData;
};

export const mapLoading = (state) => {
  return state.moviesReducer.loading;
};

export const mapMovieDetails = (state) => {
  return state.moviesReducer.movieDetails;
};
