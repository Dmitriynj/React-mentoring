import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardHeader, Typography, CardContent } from '@material-ui/core';
import { getMovieById } from '../store/thunks';
import MovieAction from './MovieAction';

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

const FilmCardStateless = ({ movie, getMovie }) => {
  const classes = useStyles();
  const history = useHistory();

  const openMovieDetails = () => {
    document.querySelector('#header-content').scrollIntoView({
      behavior: 'smooth',
    });
    getMovie(movie.id);
    history.push(`/movie/${movie.id}`);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{ title: classes.cardHeaderTitle }}
        action={<MovieAction movie={movie} />}
        title={movie.title}
      />
      {movie.poster_path && (
        <CardMedia
          className={classes.media}
          image={movie.poster_path}
          title="Contemplative Reptile"
          onClick={openMovieDetails}
        />
      )}
      <CardContent>
        <div className={classes.description}>
          <Typography variant="body2" component="p">
            {movie.overview}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          Genres: {movie.genres.join(',')}
        </Typography>
        <Typography variant="body2" component="p">
          Release date: {movie.release_date}
        </Typography>
        <Typography variant="body2" component="p">
          Avg vote: {movie.vote_average}
        </Typography>
        <Typography variant="body2" component="p">
          Budget: {movie.budget}
        </Typography>
      </CardContent>
    </Card>
  );
};

FilmCardStateless.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovie: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getMovie: (id) => dispatch(getMovieById(id)),
});

const FilmCard = connect(null, mapDispatchToProps)(FilmCardStateless);

export { FilmCard };
