import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FilmsList } from '../FilmsList';

const useStyles = makeStyles(() => ({
  genreButton: {
    color: '#eeeeee',
  },
  managePanel: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 3rem 0 3rem',
  },
}));

const MainView = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.managePanel}>
        <div>
          <Button className={classes.genreButton}>All</Button>
          <Button className={classes.genreButton}>DOCUMENTARY</Button>
          <Button className={classes.genreButton}>COMEDY</Button>
          <Button className={classes.genreButton}>HORROR</Button>
          <Button className={classes.genreButton}>CRIME</Button>
        </div>
        <div>
          <Button className={classes.genreButton}>SORT BY</Button>
          <Button className={classes.genreButton}>RELEASE DATE</Button>
        </div>
      </div>
      <FilmsList />
    </>
  );
};

export { MainView };
