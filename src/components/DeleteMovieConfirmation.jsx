import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MODAL_BUTTONS_STYLES } from '../constants';

const useStyles = makeStyles(() => ({
  footer: { display: 'flex', justifyContent: 'flex-end', padding: 10 },

  ...MODAL_BUTTONS_STYLES,
}));

const DeleteMovieConfirmation = ({ onConfirm }) => {
  const classes = useStyles();

  return (
    <>
      <Typography>Are you really want to delete this movie?</Typography>
      <section className={classes.footer}>
        <Button onClick={onConfirm} className={classes.confirmButton}>
          Submit
        </Button>
      </section>
    </>
  );
};

DeleteMovieConfirmation.propTypes = {
  onConfirm: PropTypes.func,
};
DeleteMovieConfirmation.defaultProps = {
  onConfirm: () => {},
};

export { DeleteMovieConfirmation };
