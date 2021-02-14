import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  template: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
}));

const NoMovies = () => {
  const classes = useStyles();

  return (
    <div className={classes.template}>
      <Typography variant="h4">No movies found</Typography>
    </div>
  );
};

export { NoMovies };
