import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FilmsList } from '../components/FilmsList';
import { Sorting } from '../components/Sorting';
import { MoviePagination } from '../components/MoviePagination';
import { GenreSelector } from '../components/GenreSelector';

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

const MainView = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.managePanel} id="manage-panel">
        <GenreSelector />
        <Sorting />
      </div>
      <FilmsList />
      <MoviePagination />
    </>
  );
};

export { MainView };
