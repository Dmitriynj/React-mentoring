import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { getMovieById } from '../store/thunks';
import { mapMovieDetails } from '../store/selectors';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    padding: 30,
    background:
      'radial-gradient(ellipse at center,rgba(0,0,0,.5) 0,rgba(0,0,0,.2) 45%,rgba(0,0,0,.1) 55%,rgba(0,0,0,0) 70%)',
  },
  image: {
    width: 180,
    height: 240,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const MovieDetailsStateless = ({ movie, getMovie }) => {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    getMovie(id);
  }, [id]);

  console.log('id', id);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={movie.poster_path} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h3">
                {movie.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {movie.overview}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

MovieDetailsStateless.propTypes = {
  movie: PropTypes.object,
  getMovie: PropTypes.func.isRequired,
};
MovieDetailsStateless.defaultProps = {
  movie: {},
};

const mapStateToProps = (state) => ({
  movie: mapMovieDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMovie: (id) => dispatch(getMovieById(id)),
});

const MovieDetails = connect(mapStateToProps, mapDispatchToProps)(MovieDetailsStateless);

export { MovieDetails };
