import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import { MODAL_BUTTONS_STYLES } from '../constants';

const useStyles = makeStyles((theme) => ({
  field: {
    padding: '5px 0 5px 0',
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: '#232323',
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    border: 'none',
    borderRadius: 4,
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
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: '#ececec',
  },
  closeButton: {
    color: 'inherit',
    marginLeft: 'auto',
  },
  ...MODAL_BUTTONS_STYLES,
}));

const withModalWrapper = (Component, title) => {
  const WrappedModalContent = ({ open, handleClose, ...props }) => {
    const classes = useStyles();
    const [modalStyle] = React.useState({
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
    });

    return (
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.root}>
            <Button className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </Button>
            <Typography variant="h4">{title}</Typography>
            <Component {...props} />
          </div>
        </div>
      </Modal>
    );
  };

  WrappedModalContent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return WrappedModalContent;
};

export { withModalWrapper };
