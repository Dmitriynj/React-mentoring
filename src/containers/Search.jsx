import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { changeQueryOptions } from '../../store/actions';

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

const ON_INPUT_VALIDATION_DELAY = 300;

const SearchStateless = ({ updateQueryOption }) => {
  const classes = useStyles();

  const onInputChange = debounce((event) => {
    const { value } = event.target;
    updateQueryOption({
      search: value,
      searchBy: 'title',
    });
  }, ON_INPUT_VALIDATION_DELAY);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        FIND YOUR MOVIE
      </Typography>
      <Input className={classes.searchElement} onChange={onInputChange} />
    </div>
  );
};
SearchStateless.propTypes = {
  updateQueryOption: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateQueryOption: (data) => dispatch(changeQueryOptions(data)),
});

const Search = connect(null, mapDispatchToProps)(SearchStateless);

export { Search };
