import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { getLoading } from '../store/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 4,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const LoaderStateless = ({ loading }) => {
  const classes = useStyles();
  return <div className={classes.root}>{loading && <LinearProgress color="secondary" />}</div>;
};

LoaderStateless.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: getLoading(state),
});

const Loader = connect(mapStateToProps, null)(LoaderStateless);

export { Loader };
