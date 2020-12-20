import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputLabel, Button } from '@material-ui/core';
import { uniqueId, map } from 'lodash';

const useStyles = makeStyles(() => ({
  field: {
    padding: '5px 0 5px 0',
  },
  input: {
    background: '#2e2e2e',
    color: 'white',
    fontWeight: 400,
    padding: '0 5px 0 5px',
    width: '100%',
    '&::after': {
      borderBottomColor: '#f65261',
    },
  },
  label: {
    fontWeight: 400,
    color: '#f65261',
    fontSize: 14,
    marginBottom: 2,
  },
  footer: {
    marginLeft: 'auto',
  },
  confirmButton: {
    marginLeft: 10,
    background: '#f65261',
    color: 'white',
    borderRadius: 4,
    border: '2px solid #f65261',
    '&:hover': { background: '#f65261' },
  },
  resetButton: {
    borderRadius: 4,
    border: '2px solid #f65261',
    color: '#f65261',
  },
}));

const ManagedMovie = ({ defaultMovieFields }) => {
  const classes = useStyles();
  const [movieFields] = useState(defaultMovieFields);

  const fieldElement = ({ value, name }) => {
    return (
      <section className={classes.field} key={`field-${uniqueId()}`}>
        <InputLabel className={classes.label}>{name}</InputLabel>
        <Input defaultValue={value} type="text" className={classes.input} />
      </section>
    );
  };

  const fieldElements = map(movieFields, fieldElement);

  return (
    <>
      {fieldElements}
      <section className={classes.footer}>
        <Button className={classes.resetButton}>Reset</Button>
        <Button className={classes.confirmButton}>Submit</Button>
      </section>
    </>
  );
};

ManagedMovie.propTypes = {
  defaultMovieFields: PropTypes.array,
};
ManagedMovie.defaultProps = {
  defaultMovieFields: [
    { name: 'TITLE' },
    { name: 'RELEASE DATE' },
    { name: 'MOVIE URL' },
    { name: 'GENRE' },
    { name: 'OVERVIEW' },
    { name: 'RUNTIME' },
  ],
};

export { ManagedMovie };
