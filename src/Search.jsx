import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginBottom: 10,
  },
  searchElement: {
    background: '#1c1c1c',
    opacity: '85%',
    color: 'white',
    padding: 10,
    border: 'none',
  },
}));

const Search = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        FIND YOUR MOVIE
      </Typography>
      <Input color="secondary" className={classes.searchElement} />
    </div>
  );
};

export { Search };
