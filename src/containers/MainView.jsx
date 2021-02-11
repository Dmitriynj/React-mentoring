import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { FilmsList } from '../components/FilmsList';
import { Sorting } from '../components/Sorting';
import { MoviePagination } from '../components/MoviePagination';
import { GenreSelector } from '../components/GenreSelector';
import { fetchMovies } from '../store/thunks';
import { changeQueryOptions } from '../store/actions';
import { getMovies, getQueryOptions, getTotalMoviesAmount } from '../store/selectors';

const useStyles = makeStyles(() => ({
  genreButton: {
    color: '#eeeeee',
  },
  managePanel: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 3rem 0 3rem',
    marginBottom: 20,
  },
}));

const MainViewStateless = ({
  movies,
  queryOptions,
  totalAmount,
  sendGetMovies,
  updateQueryOptions,
}) => {
  const classes = useStyles();
  const isFirstRender = useRef(true);
  const { limit, offset } = queryOptions;

  useEffect(() => {
    sendGetMovies(queryOptions);
  }, [queryOptions]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // https://assets.nflxext.com/ffe/siteui/pages/errors/bg-lost-in-space.png

  return (
    <>
      <div className={classes.managePanel} id="manage-panel">
        <GenreSelector onChooseGenre={updateQueryOptions} />
        <Sorting onSort={updateQueryOptions} />
      </div>
      <Switch>
        <Route exact path="/">
          {movies && (
            <>
              <FilmsList movies={movies} />
              <MoviePagination
                totalAmount={totalAmount}
                limit={limit}
                offset={offset}
                onChangePage={updateQueryOptions}
              />
            </>
          )}
        </Route>
      </Switch>
    </>
  );
};

MainViewStateless.propTypes = {
  movies: PropTypes.array,
  sendGetMovies: PropTypes.func.isRequired,
  queryOptions: PropTypes.object.isRequired,
  totalAmount: PropTypes.number,
  updateQueryOptions: PropTypes.func.isRequired,
};
MainViewStateless.defaultProps = {
  movies: [],
  totalAmount: null,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  queryOptions: getQueryOptions(state),
  totalAmount: getTotalMoviesAmount(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendGetMovies: (data) => dispatch(fetchMovies(data)),
  updateQueryOptions: (data) => dispatch(changeQueryOptions(data)),
});

const MainView = connect(mapStateToProps, mapDispatchToProps)(MainViewStateless);

export { MainView };
