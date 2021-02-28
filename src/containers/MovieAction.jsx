import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import { connect } from 'react-redux';
import { removeMovie, updateMovie } from '../store/thunks';
import { ManageMovieForm } from '../components/shared/ManageMovieForm';
import { ModalWrapper } from '../components/shared/ModalWrapper';
import { DeleteMovieForm } from '../components/DeleteMovieForm';

const useStyles = makeStyles(() => ({
  menu: { backgroundColor: '#232323', color: 'white' },
}));

const MovieAction = ({ movie, editMovie, deleteMovie }) => {
  const classes = useStyles();
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();

  useEffect(() => {}, []);

  const switchIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onEdit = (editedMovie) => {
    console.log('editing', editedMovie);
    editMovie(editedMovie);
    switchIsOpen();
  };

  const onDelete = () => {
    console.log('deleting');
    deleteMovie(movie.id);
    switchIsOpen();
  };

  const onChooseAction = (event) => {
    const contentVal =
      event.target.innerText === 'Edit' ? (
        <ManageMovieForm initialMovie={movie} onConfirm={onEdit} />
      ) : (
        <DeleteMovieForm onConfirm={onDelete} />
      );
    setContent(contentVal);
    switchIsOpen();
    popupState.close();
  };

  return (
    <>
      <IconButton aria-label="settings" color="inherit" {...bindTrigger(popupState)}>
        <MoreVertIcon />
      </IconButton>
      <Menu classes={{ paper: classes.menu }} {...bindMenu(popupState)}>
        <MenuItem onClick={onChooseAction}>Edit</MenuItem>
        <MenuItem onClick={onChooseAction}>Delete</MenuItem>
      </Menu>
      {content && (
        <ModalWrapper title="Edit movie" open={isOpen} closeModal={switchIsOpen}>
          {content}
        </ModalWrapper>
      )}
    </>
  );
};
MovieAction.propTypes = {
  movie: PropTypes.object.isRequired,
  editMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  editMovie: (data) => dispatch(updateMovie(data)),
  deleteMovie: (id) => dispatch(removeMovie(id)),
});

export default connect(null, mapDispatchToProps)(MovieAction);
