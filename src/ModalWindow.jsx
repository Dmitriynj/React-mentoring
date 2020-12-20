import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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

const ModalWindow = ({ actionText, buttonClassName, children, title }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState({
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} className={buttonClassName}>
        {actionText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableScrollLock
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.root}>
            <Button className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </Button>
            <Typography variant="h4">{title}</Typography>
            {children}
          </div>
        </div>
      </Modal>
    </div>
  );
};
ModalWindow.propTypes = {
  title: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export { ModalWindow };
