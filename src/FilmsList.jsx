import React from 'react';
import Grid from '@material-ui/core/Grid';
import { reduce, uniqueId, isEmpty } from 'lodash';
import { FilmCard } from './FilmCard';

const mockedFilmsList = [
  {
    title: 'Some',
    description: 'Description',
  },
  {
    title: 'Some1',
    description: 'Description1',
  },
  {
    title: 'Some1',
    description: 'Description2',
  },
  {
    title: 'Some3',
    description: 'Description3',
  },
  {
    title: 'Some4',
    description: 'Description4',
  },
  {
    title: 'Some5',
    description: 'Description5',
  },
  {
    title: 'Some6',
    description: 'Description6',
  },
  {
    title: 'Some7',
    description: 'Description7',
  },
  {
    title: 'Some8',
    description: 'Description8',
  },
  {
    title: 'Some9',
    description: 'Description8',
  },
  {
    title: 'Some10',
    description: 'Description8',
  },
  {
    title: 'Some11',
    description: 'Description8',
  },
  {
    title: 'Some12',
    description: 'Description8',
  },
  {
    title: 'Some13',
    description: 'Description8',
  },
];

const getFilmsPortion = (filmPortion) => {
  return filmPortion.map(({ title, description }) => (
    <Grid item xs={3} key={`film-row-item-${uniqueId()}`}>
      <FilmCard title={title} description={description} />
    </Grid>
  ));
};

const filmElements = reduce(
  mockedFilmsList,
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

const FilmsList = () => {
  return <Grid container>{filmElements.result}</Grid>;
};

export { FilmsList };
