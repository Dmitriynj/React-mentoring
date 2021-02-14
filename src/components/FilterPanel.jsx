import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Sorting } from './Sorting';
import { GenreSelector } from './GenreSelector';

const useStyles = makeStyles(() => ({
  managePanel: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 3rem 0 3rem',
    margin: '20px 0 20px 0',
  },
}));

const FilterPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.managePanel} id="manage-panel">
      <GenreSelector />
      <Sorting />
    </div>
  );
};

export { FilterPanel };
