import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardHeader, Typography, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ManagedMovie } from './ManagedMovie';
import { useAppState } from '../hooks/useAppState';

const useStyles = makeStyles({
  card: {
    maxWidth: 220,
    backgroundColor: '#232323',
    color: '#eeeeee',
    margin: '5px auto',
  },
  cardHeaderTitle: {
    fontSize: 18,
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
  const { setCurrentMovie } = useAppState();

  const openMovieDetails = () => {
    document.querySelector('#header-content').scrollIntoView({
      behavior: 'smooth',
    });
    setCurrentMovie({ title, imageUrl, description });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{ title: classes.cardHeaderTitle }}
        action={<ManagedMovie />}
        title={title}
      />
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
