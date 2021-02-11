import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { reduce, uniqueId, isEmpty } from 'lodash';
import { FilmCard } from './FilmCard';

const FilmsList = ({ movies }) => {
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

FilmsList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export { FilmsList };
