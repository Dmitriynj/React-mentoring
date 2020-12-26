import React from 'react';
import Grid from '@material-ui/core/Grid';
import { reduce, uniqueId, isEmpty } from 'lodash';
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

const getFilmsPortion = (filmPortion) => {
  return filmPortion.map(({ title, description, imageUrl }) => (
    <Grid item xs={3} key={`film-row-item-${uniqueId()}`}>
      <FilmCard title={title} description={description} imageUrl={imageUrl} />
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
