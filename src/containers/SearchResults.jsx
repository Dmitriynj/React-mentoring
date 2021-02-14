import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { FilmsList } from '../components/FilmsList';
import { MoviePagination } from '../components/MoviePagination';
import { fetchMovies } from '../store/thunks';
import { mapMoviesData } from '../store/selectors';
import { useQuery } from '../hooks/useQuery';

const SearchResultsStateless = ({ moviesData, sendGetMovies }) => {
  const isFirstRender = useRef(true);
  const history = useHistory();
  const { search, getQueryOptions } = useQuery();
  const { data: movies, totalAmount, limit, offset } = moviesData;
  const isEmptyRes = !isFirstRender.current && isEmpty(movies);

  useEffect(() => {
    if (search) {
      sendGetMovies(getQueryOptions());
    }
  }, [search]);

  useEffect(() => {
    if (isEmptyRes) {
      history.push('/no-movies');
    }
    isFirstRender.current = false;
  }, [moviesData]);

  const component = (
    <>
      <FilmsList movies={movies} />
      <MoviePagination totalAmount={totalAmount} limit={limit} offset={offset} />
    </>
  );

  return component;
};

SearchResultsStateless.propTypes = {
  moviesData: PropTypes.object.isRequired,
  sendGetMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesData: mapMoviesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendGetMovies: (data) => dispatch(fetchMovies(data)),
});

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsStateless);

export { SearchResults };
