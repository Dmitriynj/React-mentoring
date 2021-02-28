import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MovieDetails } from '../containers/MovieDetails';
import { Search } from './Search';

const useStyles = makeStyles(() => ({
  mainImage: {
    border: 0,
    height: '60vh',
    margin: 0,
    display: 'flex',
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 1000,
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url('/background.jpg')`,
  },
  shadowed: {
    backgroundImage: `-webkit-gradient(linear,left bottom,left top,color-stop(50%,rgba(0,0,0,0)),to(rgba(0,0,0,.7))),radial-gradient(50% 100%,rgba(0,0,0,0) 50%,rgba(0,0,0,.7) 100%)`,
    width: '100%',
    height: '100%',
  },
}));

const HeadContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainImage}>
      <div className={classes.shadowed} id="header-content">
        <Switch>
          <Route exact path={['/movies', '/no-movies']}>
            <Search />
          </Route>
          <Route exact path={['/movie/:id', '/movies']}>
            <MovieDetails />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export { HeadContent };
