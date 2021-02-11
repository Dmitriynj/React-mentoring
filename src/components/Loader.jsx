import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 4,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Loader = ({ loading }) => {
  const classes = useStyles();
  return <div className={classes.root}>{loading && <LinearProgress color="secondary" />}</div>;
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export { Loader };
