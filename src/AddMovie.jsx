import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputLabel, Button } from '@material-ui/core';

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

const AddMovie = () => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.field}>
        <InputLabel className={classes.label}>MOVIE ID</InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.field}>
        <InputLabel className={classes.label}>TITLE</InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.field}>
        <InputLabel className={classes.label}>RELEASE DATE</InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.field}>
        <InputLabel className={classes.label}>MOVIE URL</InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.field}>
        <InputLabel className={classes.label}>GENRE</InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.field}>
        <InputLabel className={classes.label}>OVERVIEW</InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.field}>
        <InputLabel color="secondary" className={classes.label}>
          RUNTIME
        </InputLabel>
        <Input type="text" className={classes.input} />
      </section>
      <section className={classes.footer}>
        <Button className={classes.resetButton}>Reset</Button>
        <Button className={classes.confirmButton}>Submit</Button>
      </section>
    </>
  );
};

export { AddMovie };
