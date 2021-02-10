import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { changeQueryOptions } from '../store/actions';

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

const GenreSelectorStateless = ({ updateQueryOptions }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    updateQueryOptions({ filter: genres[newValue], searchBy: 'title' });
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
GenreSelectorStateless.propTypes = {
  updateQueryOptions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateQueryOptions: (data) => dispatch(changeQueryOptions(data)),
});

const GenreSelector = connect(null, mapDispatchToProps)(GenreSelectorStateless);

export { GenreSelector };
