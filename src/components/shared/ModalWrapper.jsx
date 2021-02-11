import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: '#232323',
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    border: 'none',
    borderRadius: 4,
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
}));

const ModalWrapper = ({ children, title, open, closeModal }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState({
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  });

  return (
    <Modal open={open} onClose={closeModal}>
      <div style={modalStyle} className={classes.paper}>
        <div className={classes.root}>
          <Button className={classes.closeButton} onClick={closeModal}>
            <CloseIcon />
          </Button>
          <Typography variant="h4">{title}</Typography>
          {children}
        </div>
      </div>
    </Modal>
  );
};
ModalWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export { ModalWrapper };
