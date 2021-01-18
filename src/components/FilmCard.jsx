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
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
});

const FilmCard = ({ id, title, imageUrl, description, genres, releaseDate, avgVote, budget }) => {
  const classes = useStyles();
  const { setCurrentMovie } = useAppState();

  const openMovieDetails = () => {
    document.querySelector('#header-content').scrollIntoView({
      behavior: 'smooth',
    });
    setCurrentMovie({ title, imageUrl, description });
  };

  console.log('movie id', id);

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{ title: classes.cardHeaderTitle }}
        action={<ManagedMovie id={id} />}
        title={title}
      />
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Contemplative Reptile"
        onClick={openMovieDetails}
      />
      <CardContent>
        <div className={classes.description}>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          Genres: {genres.join(',')}
        </Typography>
        <Typography variant="body2" component="p">
          Release date: {releaseDate}
        </Typography>
        <Typography variant="body2" component="p">
          Avg vote: {avgVote}
        </Typography>
        <Typography variant="body2" component="p">
          Budget: {budget}
        </Typography>
      </CardContent>
    </Card>
  );
};

FilmCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  genres: PropTypes.array.isRequired,
  releaseDate: PropTypes.string.isRequired,
  avgVote: PropTypes.number,
  budget: PropTypes.number,
};
FilmCard.defaultProps = {
  imageUrl: '',
  avgVote: 0,
  budget: 0,
};

export { FilmCard };
