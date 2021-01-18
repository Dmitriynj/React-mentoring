import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import { EditMovieModalContent } from './EditMovieModalContent';
import { DeleteMovieModalContent } from './DeleteMovieModalContent';
import { withModalWrapper } from './withModalWrapper';

const EditMovieModal = withModalWrapper(EditMovieModalContent, 'Edit movie');
const DeleteMovieModal = withModalWrapper(DeleteMovieModalContent, 'Delete movie');

const useStyles = makeStyles(() => ({
  menu: { backgroundColor: '#232323', color: 'white' },
}));

const ManagedMovie = ({ id }) => {
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);
  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const onOpenEditMovieModal = () => {
    setOpenEditModal(true);
    popupState.close();
  };
  const onOpenDeleteMovieModal = () => {
    setOpenDeleteModal(true);
    popupState.close();
  };

  return (
    <>
      <IconButton aria-label="settings" color="inherit" {...bindTrigger(popupState)}>
        <MoreVertIcon />
      </IconButton>
      <Menu classes={{ paper: classes.menu }} {...bindMenu(popupState)}>
        <MenuItem onClick={onOpenEditMovieModal}>Edit</MenuItem>
        <MenuItem onClick={onOpenDeleteMovieModal}>Delete</MenuItem>
      </Menu>
      <EditMovieModal
        id={id}
        open={openEditModal}
        handleClose={handleCloseEditModal}
        onConfirm={handleCloseEditModal}
      />
      <DeleteMovieModal
        id={id}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        onConfirm={handleCloseDeleteModal}
      />
    </>
  );
};
ManagedMovie.propTypes = {
  id: PropTypes.number.isRequired,
};

export { ManagedMovie };
