import { SearchResults } from './containers/SearchResults';
import { NoMovies } from './components/NoMovies';
import { MovieDetails } from './containers/MovieDetails';
import NotFound from './components/NotFound';
import { fetchMovies, getMovieById } from './store/thunks';

const routes = [
  {
    path: '/movies',
    exact: true,
    component: SearchResults,
    loadData: ({ url, dispatch }) => {
      return dispatch(fetchMovies(url));
    },
  },
  {
    path: '/no-movies',
    component: NoMovies,
  },
  {
    path: '/movie/:id',
    exact: true,
    component: MovieDetails,
    loadData: ({ params, dispatch }) => {
      return dispatch(getMovieById(params.id));
    },
  },
  {
    component: NotFound,
  },
];

export { routes };
