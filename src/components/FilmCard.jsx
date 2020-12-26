import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  MenuItem,
  Popover,
} from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { ModalButton } from './ModalButton';
import { ManagedMovie } from './ManagedMovie';
import { DeleteMovieConfirmation } from './DeleteMovieConfirmation';
import { useAppState } from '../hooks/useAppState';
import { movieFields } from '../constants';

const useStyles = makeStyles({
  card: {
    maxWidth: 220,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'inherit',
    color: '#afafaf',
    margin: '5px auto',
  },
  wrapper: {
    position: 'relative',
  },
  moreContainer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  more: {
    margin: 10,
    position: 'relative',
    backgroundColor: '#232323',
    borderRadius: '50%',
    color: 'white',
    height: 25,
    width: 25,
    '&:hover': {
      backgroundColor: '#232323',
    },
  },
  media: {
    cursor: 'pointer',
    height: 240,
  },
  actionButton: {
    color: 'white',
  },
  menuItem: {
    background: '#232323',
    color: 'white',
    '&:hover': {
      background: '#232323',
    },
  },
  editMovieButton: {},
});

const FilmCard = ({ title, imageUrl, description }) => {
  const classes = useStyles();
  const popoverElement = useRef();
  const { setCurrentMovie } = useAppState();

  const openMovieDetails = () => {
    setCurrentMovie({ title, imageUrl, description });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.wrapper}>
        <PopupState variant="popover" popupId="demo-popup-popover" className={classes.menuItem}>
          {(popupState) => (
            <div className={classes.moreContainer}>
              <IconButton
                aria-label="settings"
                color="inherit"
                className={classes.more}
                {...bindTrigger(popupState)}
              >
                <MoreVertIcon />
              </IconButton>

              <Popover
                ref={popoverElement}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                {...bindPopover(popupState)}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    popoverElement.current.style.display = 'none';
                  }}
                >
                  <ModalButton
                    title="Edit"
                    actionText="edit"
                    buttonClassName={classes.actionButton}
                    onClose={popupState.close}
                  >
                    <ManagedMovie defaultMovieFields={movieFields} />
                  </ModalButton>
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    popoverElement.current.style.display = 'none';
                  }}
                >
                  <ModalButton
                    title="Confirmation"
                    actionText="Delete movie"
                    buttonClassName={classes.actionButton}
                    onClose={popupState.close}
                  >
                    <DeleteMovieConfirmation
                      onConfirm={() => {
                        popupState.close();
                      }}
                    />
                  </ModalButton>
                </MenuItem>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Contemplative Reptile"
        onClick={openMovieDetails}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {title}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export { FilmCard };
