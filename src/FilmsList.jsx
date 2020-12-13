import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FilmCard } from './FilmCard';

const FilmsList = () => {
  function FormRow() {
    return (
      <>
        <Grid item xs={3}>
          <FilmCard title="Sample" description="sample description" />
        </Grid>
        <Grid item xs={3}>
          <FilmCard title="Sample" description="sample description" />
        </Grid>
        <Grid item xs={3}>
          <FilmCard title="Sample" description="sample description" />
        </Grid>
        <Grid item xs={3}>
          <FilmCard title="Sample" description="sample description" />
        </Grid>
      </>
    );
  }

  return (
    <Grid container>
      <Grid container item xs={12}>
        <FormRow />
      </Grid>
      <Grid container item xs={12}>
        <FormRow />
      </Grid>
      <Grid container item xs={12}>
        <FormRow />
      </Grid>
    </Grid>
  );
};

export { FilmsList };
