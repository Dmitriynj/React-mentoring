import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Input } from '@material-ui/core';

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
    '&::after': {
      borderBottomColor: '#f65261',
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        FIND YOUR MOVIE
      </Typography>
      <Input className={classes.searchElement} />
    </div>
  );
};

export { Search };
