import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeMovie } from '../store/thunks';
import { MODAL_BUTTONS_STYLES } from '../constants';

const useStyles = makeStyles(() => ({
  footer: { display: 'flex', justifyContent: 'flex-end', padding: 10 },
  ...MODAL_BUTTONS_STYLES,
}));

const DeleteMovieModalContentStateless = ({ id, deleteMovie, onConfirm }) => {
  const classes = useStyles();

  const onConfirmDeleting = () => {
    deleteMovie(id);
    onConfirm();
  };

  return (
    <>
      <Typography>Are you really want to delete this movie?</Typography>
      <section className={classes.footer}>
        <Button onClick={onConfirmDeleting} className={classes.confirmButton}>
          Submit
        </Button>
      </section>
    </>
  );
};

DeleteMovieModalContentStateless.propTypes = {
  id: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteMovie: (id) => dispatch(removeMovie(id)),
});

const DeleteMovieModalContent = connect(null, mapDispatchToProps)(DeleteMovieModalContentStateless);

export { DeleteMovieModalContent };
