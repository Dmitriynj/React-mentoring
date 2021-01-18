import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, InputLabel } from '@material-ui/core';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getMovieById, updateMovie } from '../store/thunks';
import { getCurEditingMovie } from '../store/selectors';
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

const EditMovieModalContentStateless = ({
  id,
  curEditingMovie,
  getMovieByIdReq,
  sendEditConfirmReq,
  onConfirm,
}) => {
  const classes = useStyles();
  const [editedMovie, setEditedMovie] = useState();

  useEffect(() => {
    getMovieByIdReq(id);
  }, []);

  useEffect(() => {
    setEditedMovie(curEditingMovie);
  }, [curEditingMovie]);

  console.log('editedMovie', editedMovie);

  const onChangeInput = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'runtime') {
      value = Number(value);
    }
    if (name === 'genres') {
      value = value.split(',');
    }
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const onReset = () => {
    setEditedMovie(curEditingMovie);
  };

  const onSubmitChanges = () => {
    sendEditConfirmReq(editedMovie);
    onConfirm();
  };

  return (
    <>
      {!isEmpty(editedMovie) && (
        <>
          <section className={classes.field} key="title-field">
            <InputLabel className={classes.label}>TITLE</InputLabel>
            <Input
              name="title"
              type="text"
              onChange={onChangeInput}
              value={editedMovie.title}
              className={classes.input}
            />
          </section>
          <section className={classes.field} key="release-date-field">
            <InputLabel className={classes.label}>RELEASE DATE</InputLabel>
            <Input
              name="release_date"
              onChange={onChangeInput}
              value={editedMovie.release_date}
              type="date"
              className={classes.input}
            />
          </section>
          <section className={classes.field} key="genres-field">
            <InputLabel className={classes.label}>GENRES</InputLabel>
            <Input
              name="genres"
              onChange={onChangeInput}
              value={editedMovie.genres.join(',')}
              type="text"
              className={classes.input}
            />
          </section>
          <section className={classes.field} key="overview-field">
            <InputLabel className={classes.label}>OVERVIEW</InputLabel>
            <Input
              name="overview"
              onChange={onChangeInput}
              value={editedMovie.overview}
              type="text"
              className={classes.input}
            />
          </section>
          <section className={classes.field} key="runtime-field">
            <InputLabel className={classes.label}>RUNTIME</InputLabel>
            <Input
              name="runtime"
              onChange={onChangeInput}
              value={editedMovie.runtime}
              type="number"
              className={classes.input}
            />
          </section>
        </>
      )}
      <section className={classes.footer} key="footer">
        <Button onClick={onReset} className={classes.resetButton}>
          Reset
        </Button>
        <Button onClick={onSubmitChanges} className={classes.confirmButton}>
          Submit
        </Button>
      </section>
    </>
  );
};
EditMovieModalContentStateless.propTypes = {
  id: PropTypes.number.isRequired,
  curEditingMovie: PropTypes.object,
  sendEditConfirmReq: PropTypes.func.isRequired,
  getMovieByIdReq: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
EditMovieModalContentStateless.defaultProps = {
  curEditingMovie: undefined,
};

const mapStateToProps = (state) => ({
  curEditingMovie: getCurEditingMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendEditConfirmReq: (data) => dispatch(updateMovie(data)),
  getMovieByIdReq: (id) => dispatch(getMovieById(id)),
});

const EditMovieModalContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMovieModalContentStateless);

export { EditMovieModalContent };
