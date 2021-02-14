import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const BACKGROUND_IMAGE_URL = 'bg-lost-in-space.png';

const useStyles = makeStyles(() => ({
  mainImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 0,
    margin: 0,
    padding: 0,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url(${BACKGROUND_IMAGE_URL} )`,
  },
  content: {
    background:
      'radial-gradient(ellipse at center,rgba(0,0,0,.5) 0,rgba(0,0,0,.2) 45%,rgba(0,0,0,.1) 55%,rgba(0,0,0,0) 70%)',
    height: '50%',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    marginBottom: 20,
  },
}));

const GoHomeButton = withStyles(() => ({
  root: {
    fontWeight: 'bold',
    backgroundColor: 'white',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'white',
    },
  },
}))(Button);

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => {
    history.push('/movies');
  };

  return (
    <div className={classes.mainImage}>
      <div className={classes.content}>
        <Typography variant="h2" className={classes.header}>
          Lost your way?
        </Typography>
        <Typography variant="body1" className={classes.message}>
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </Typography>
        <GoHomeButton size="large" onClick={goHome} className={classes.homeButton}>
          Netflix Home
        </GoHomeButton>
      </div>
    </div>
  );
};

export { NotFound };
