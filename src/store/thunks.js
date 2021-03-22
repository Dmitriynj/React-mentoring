import axios from 'axios';
import {
  getMoviesInProgress,
  getMoviesSuccess,
  getMoviesFailure,
  getMovieByIdInProgress,
  getMovieByIdSuccess,
  getMovieByIdFailure,
  updateMovieInProgress,
  updateMovieSuccess,
  updateMovieFailure,
  removeMovieInProgress,
  removeMovieSuccess,
  removeMovieFailure,
  createMovieInProgress,
  createMovieSuccess,
  createMovieFailure,
} from './actions';

const axiosInstance = axios.create({
  baseURL: process.env.SERVICE_URL,
});

const fetchMovies = (url) => (dispatch) => {
  dispatch(getMoviesInProgress());

  // return needs for SSR
  return axiosInstance
    .get(url)
    .then((res) => {
      dispatch(getMoviesSuccess(res.data));
    })
    .catch((error) => {
      dispatch(getMoviesFailure(error));
    });
};

const getMovieById = (id) => (dispatch) => {
  // return needs for SSR
  dispatch(getMovieByIdInProgress());

  return axiosInstance
    .get(`movies/${id}`)
    .then((res) => dispatch(getMovieByIdSuccess(res.data)))
    .catch((error) => dispatch(getMovieByIdFailure(error)));
};

const updateMovie = (movie) => (dispatch) => {
  // tagline is just needed for some reason
  axiosInstance
    .put(
      'movies',
      { ...movie, tagline: 'some' },
      {
        headers: { 'content-type': 'application/json' },
      }
    )
    .then((res) => dispatch(updateMovieSuccess(res.data)))
    .catch((error) => dispatch(updateMovieFailure(error)));
  dispatch(updateMovieInProgress());
};

const removeMovie = (id) => (dispatch) => {
  axiosInstance
    .delete(`movies/${id}`)
    .then(() => dispatch(removeMovieSuccess(id)))
    .catch((error) => dispatch(removeMovieFailure(error)));
  dispatch(removeMovieInProgress());
};

const createMovie = (movie) => (dispatch) => {
  axiosInstance
    .post('movies', movie, {
      headers: { 'content-type': 'application/json' },
    })
    .then(() => {
      dispatch(createMovieSuccess());
    })
    .catch((error) => {
      dispatch(createMovieFailure(error));
    });
  dispatch(createMovieInProgress());
};

export { fetchMovies, getMovieById, updateMovie, removeMovie, createMovie };
