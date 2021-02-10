import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { reduce, uniqueId, isEmpty } from 'lodash';
import { fetchMovies } from '../store/thunks';
import { getMovies, getQueryOptions } from '../store/selectors';
import { FilmCard } from '../components/FilmCard';

const FilmsListStateless = ({ movies, queryOptions, getMovies }) => {
  useEffect(() => {
    getMovies(queryOptions);
  }, [queryOptions]);

  console.log('render', movies);

  const getFilmsPortion = (filmPortion) => {
    return filmPortion.map((curMovie) => (
      <Grid item xs={3} key={`film-row-item-${uniqueId()}`}>
        <FilmCard movie={curMovie} />
      </Grid>
    ));
  };

  const filmElements = reduce(
    movies,
    ({ result, temp }, filmData, index) => {
      if (index % 4 === 0 && !isEmpty(temp)) {
        return {
          result: [
            ...result,
            <Grid container item xs={12} key={`films-row-${uniqueId()}`}>
              {getFilmsPortion(temp)}
            </Grid>,
          ],
          temp: [filmData],
        };
      }

      if (index === movies.length - 1) {
        return {
          result: [
            ...result,
            <Grid container item xs={12} key={`films-row-${uniqueId()}`}>
              {getFilmsPortion([...temp, filmData])}
            </Grid>,
          ],
          temp: [],
        };
      }

      return {
        result,
        temp: [...temp, filmData],
      };
    },
    { result: [], temp: [] }
  );

  return <Grid container>{filmElements.result}</Grid>;
};

FilmsListStateless.propTypes = {
  movies: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
  queryOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  queryOptions: getQueryOptions(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: (data) => dispatch(fetchMovies(data)),
});

const FilmsList = connect(mapStateToProps, mapDispatchToProps)(FilmsListStateless);

export { FilmsList };
