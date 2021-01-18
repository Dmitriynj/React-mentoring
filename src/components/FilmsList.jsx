import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { reduce, uniqueId, isEmpty } from 'lodash';
import { fetchMovies } from '../store/thunks';
import { getMoviesData, getQueryOptions } from '../store/selectors';
import { FilmCard } from './FilmCard';

const FilmsListStateless = ({ moviesData, queryOptions, getMovies }) => {
  const { data: movies } = moviesData;

  useEffect(() => {
    getMovies(queryOptions);
  }, [queryOptions]);

  console.log('render', movies);

  const getFilmsPortion = (filmPortion) => {
    return filmPortion.map(
      ({ id, title, overview, poster_path, genres, release_date, vote_average, budget }) => (
        <Grid item xs={3} key={`film-row-item-${uniqueId()}`}>
          <FilmCard
            id={id}
            title={title}
            description={overview}
            imageUrl={poster_path}
            genres={genres}
            releaseDate={release_date}
            avgVote={vote_average}
            budget={budget}
          />
        </Grid>
      )
    );
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
  moviesData: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  queryOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  moviesData: getMoviesData(state),
  queryOptions: getQueryOptions(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: (data) => dispatch(fetchMovies(data)),
});

const FilmsList = connect(mapStateToProps, mapDispatchToProps)(FilmsListStateless);

export { FilmsList };
