import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
});

const FilmCard = ({ title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
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
