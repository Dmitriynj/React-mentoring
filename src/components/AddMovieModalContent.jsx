import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createMovie } from '../store/thunks';
import { MODAL_BUTTONS_STYLES } from '../constants';

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

  ...MODAL_BUTTONS_STYLES,
}));

const AddNewMovieStateless = ({ sendCreateReq, onConfirm }) => {
  const classes = useStyles();
  const [creatingMovie, setCreatingMovie] = useState({
    title: '',
    release_date: '',
    overview: '',
    genres: [''],
    runtime: '',
    poster_path: '',
  });

  console.log('creating movie', creatingMovie);

  const onChangeInput = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'runtime') {
      value = Number(value);
    }
    if (name === 'genres') {
      value = value.split(',');
    }
    setCreatingMovie({ ...creatingMovie, [name]: value });
  };

  const onSubmitChanges = () => {
    sendCreateReq(creatingMovie);
    onConfirm();
  };

  return (
    <>
      <section className={classes.field} key="title-field">
        <InputLabel className={classes.label}>TITLE</InputLabel>
        <Input
          name="title"
          type="text"
          onChange={onChangeInput}
          value={creatingMovie.title}
          className={classes.input}
        />
      </section>
      <section className={classes.field} key="release-date-field">
        <InputLabel className={classes.label}>RELEASE DATE</InputLabel>
        <Input
          name="release_date"
          onChange={onChangeInput}
          value={creatingMovie.release_date}
          type="date"
          className={classes.input}
        />
      </section>
      <section className={classes.field} key="genres-field">
        <InputLabel className={classes.label}>GENRES</InputLabel>
        <Input
          name="genres"
          onChange={onChangeInput}
          value={creatingMovie.genres.join(',')}
          type="text"
          className={classes.input}
        />
      </section>
      <section className={classes.field} key="overview-field">
        <InputLabel className={classes.label}>OVERVIEW</InputLabel>
        <Input
          name="overview"
          onChange={onChangeInput}
          value={creatingMovie.overview}
          type="text"
          className={classes.input}
        />
      </section>
      <section className={classes.field} key="runtime-field">
        <InputLabel className={classes.label}>RUNTIME</InputLabel>
        <Input
          name="runtime"
          onChange={onChangeInput}
          value={creatingMovie.runtime}
          type="number"
          className={classes.input}
        />
      </section>
      <section className={classes.field} key="poster-path-field">
        <InputLabel className={classes.label}>POSTER PATH</InputLabel>
        <Input
          name="poster_path"
          onChange={onChangeInput}
          value={creatingMovie.poster_path}
          type="text"
          className={classes.input}
        />
      </section>

      <section className={classes.footer} key="footer">
        <Button onClick={onSubmitChanges} className={classes.confirmButton}>
          Create
        </Button>
      </section>
    </>
  );
};
AddNewMovieStateless.propTypes = {
  sendCreateReq: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendCreateReq: (data) => dispatch(createMovie(data)),
});

const AddMovieModalContent = connect(null, mapDispatchToProps)(AddNewMovieStateless);

export { AddMovieModalContent };
