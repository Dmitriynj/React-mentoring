import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useQuery } from '../hooks/useQuery';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'inherit',
    color: 'white',
    border: 'none',
  },
});

const genres = {
  0: [],
  1: ['Documentary'],
  2: ['Comedy'],
  3: ['Horror'],
  4: ['Crime'],
};

const GenreSelector = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const { query } = useQuery();

  const handleChange = (event, newValue) => {
    query.set('filter', genres[newValue]);
    query.set('searchBy', 'title');

    history.push({ pathname: '/movies', search: query.toString() });
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor="secondary" centered>
        <Tab style={{ minWidth: 40 }} label="All" />
        <Tab style={{ minWidth: 40 }} label="Documentary" />
        <Tab style={{ minWidth: 40 }} label="Comedy" />
        <Tab style={{ minWidth: 40 }} label="Horror" />
        <Tab style={{ minWidth: 40 }} label="Crime" />
      </Tabs>
    </Paper>
  );
};

export { GenreSelector };
