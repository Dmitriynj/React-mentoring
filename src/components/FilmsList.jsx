import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { reduce, uniqueId, isEmpty } from 'lodash';
import { fetchMovies } from '../store/thunks';
import { getMovies } from '../store/selectors';
import { FilmCard } from './FilmCard';

const mockedFilmsList = [
  {
    title: 'Some',
    description: 'Description',
    imageUrl: 'sample.jpg',
  },
  {
    title: 'Some1',
    description: 'Description1',
    imageUrl: 'sample1.jpg',
  },
  {
    title: 'Some1',
    description: 'Description2',
    imageUrl: 'sample2.jpg',
  },
  {
    title: 'Some3',
    description: 'Description3',
    imageUrl: 'sample3.jpg',
  },
  {
    title: 'Some4',
    description: 'Description4',
    imageUrl: 'sample4.jpg',
  },
  {
    title: 'Some5',
    description: 'Description5',
    imageUrl: 'sample5.jpg',
  },
  {
    title: 'Some6',
    description: 'Description6',
    imageUrl: 'sample6.jpg',
  },
  {
    title: 'Some7',
    description: 'Description7',
    imageUrl: 'sample7.jpg',
  },
  {
    title: 'Some8',
    description: 'Description8',
    imageUrl: 'sample8.jpg',
  },
  {
    title: 'Some9',
    description: 'Description8',
    imageUrl: 'sample9.jpg',
  },
  {
    title: 'Some10',
    description: 'Description8',
    imageUrl: 'sample10.jpg',
  },
  {
    title: 'Some11',
    description: 'Description8',
    imageUrl: 'sample11.jpg',
  },
  {
    title: 'Some12',
    description: 'Description8',
    imageUrl: 'sample12.jpg',
  },
];

const FilmsListStateless = ({ movies, getMoviesRequest }) => {
  useEffect(() => {
    getMoviesRequest();
  }, []);

  console.log('render', movies);

  const getFilmsPortion = (filmPortion) => {
    return filmPortion.map(({ title, overview, poster_path }) => (
      <Grid item xs={3} key={`film-row-item-${uniqueId()}`}>
        <FilmCard title={title} description={overview} imageUrl={poster_path} />
      </Grid>
    ));
  };

  const filmElements = reduce(
    movies.data,
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

      if (index === mockedFilmsList.length - 1) {
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
  movies: PropTypes.object,
  getMoviesRequest: PropTypes.func.isRequired,
};
FilmsListStateless.defaultProps = {
  movies: undefined,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesRequest: () => dispatch(fetchMovies()),
});

const FilmsList = connect(mapStateToProps, mapDispatchToProps)(FilmsListStateless);

export { FilmsList };
