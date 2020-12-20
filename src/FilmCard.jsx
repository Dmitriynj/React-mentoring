import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'inherit',
    color: '#afafaf',
    margin: '30px auto',
  },
  media: {
    height: 340,
  },
  moreContainer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  more: {
    padding: 2,
    margin: 2,
    height: 24,
    position: 'relative',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '50%',
  },
});

const FilmCard = ({ title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.moreContainer}>
          <span className={classes.more}>
            <MoreVertIcon />
          </span>
        </div>
        <CardMedia className={classes.media} image="sample.jpg" title="Contemplative Reptile" />
        <CardContent>
          <Typography>{title}</Typography>
          <Typography component="span">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export { FilmCard };
