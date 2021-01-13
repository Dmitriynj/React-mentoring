import React, { useState, useCallback } from 'react';
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

const ManagedMovie = () => {
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  const handleOpenEditModal = useCallback(() => {
    setOpenEditModal(true);
  }, []);
  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);
  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const onOpenEditMovieModal = () => {
    handleOpenEditModal();
    popupState.close();
  };
  const onOpenDeleteMovieModal = () => {
    handleOpenDeleteModal();
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
      <EditMovieModal open={openEditModal} handleClose={handleCloseEditModal} />
      <DeleteMovieModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        onConfirm={handleCloseDeleteModal}
      />
    </>
  );
};

export { ManagedMovie };
