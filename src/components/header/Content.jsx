import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import { useAppState } from '../../hooks/useAppState';
import { Search } from './Search';
import { MovieDetails } from './MovieDetails';

const useStyles = makeStyles(() => ({
  shadowed: {
    backgroundImage: `-webkit-gradient(linear,left bottom,left top,color-stop(50%,rgba(0,0,0,0)),to(rgba(0,0,0,.7))),radial-gradient(50% 100%,rgba(0,0,0,0) 50%,rgba(0,0,0,.7) 100%)`,
    width: '100%',
    height: '100%',
  },
}));

const Content = () => {
  const classes = useStyles();

  const { currentMovie } = useAppState();

  return (
    <div className={classes.shadowed} id="header-content">
      {isEmpty(currentMovie) ? <Search /> : <MovieDetails {...currentMovie} />}
    </div>
  );
};

export { Content };
