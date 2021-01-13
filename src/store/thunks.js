import axios from 'axios';
import { getMoviesInProgress, getMoviesSuccess, getMoviesFailure } from './actions';

const axiosInstance = axios.create({
  baseURL: process.env.SERVICE_URL,
});

const fetchMovies = () => (dispatch) => {
  axiosInstance
    .get('movies')
    .then((data) => dispatch(getMoviesSuccess(data)))
    .catch((error) => dispatch(getMoviesFailure(error)));
  dispatch(getMoviesInProgress());
};

export { fetchMovies };
