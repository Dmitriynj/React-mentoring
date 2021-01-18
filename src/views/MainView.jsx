import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
        {/* <div>
          <Button className={classes.genreButton}>All</Button>
          <Button className={classes.genreButton}>DOCUMENTARY</Button>
          <Button className={classes.genreButton}>COMEDY</Button>
          <Button className={classes.genreButton}>HORROR</Button>
          <Button className={classes.genreButton}>CRIME</Button>
        </div> */}
        <GenreSelector />
        <Sorting />
      </div>
      <FilmsList />
      <MoviePagination />
    </>
  );
};

export { MainView };
