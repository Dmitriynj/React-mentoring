import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import { useAppState } from '../hooks/useAppState';
import { Search } from '../components/Search';
import { MovieDetails } from '../components/MovieDetails';
import { changeQueryOptions } from '../store/actions';

const BACKGROUND_IMAGE_URL = 'background.jpg';

const useStyles = makeStyles(() => ({
  mainImage: {
    border: 0,
    height: '60vh',
    margin: 0,
    display: 'flex',
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 1000,
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url(${BACKGROUND_IMAGE_URL} )`,
  },
  shadowed: {
    backgroundImage: `-webkit-gradient(linear,left bottom,left top,color-stop(50%,rgba(0,0,0,0)),to(rgba(0,0,0,.7))),radial-gradient(50% 100%,rgba(0,0,0,0) 50%,rgba(0,0,0,.7) 100%)`,
    width: '100%',
    height: '100%',
  },
}));

const HeadContentStateless = ({ updateQueryOption }) => {
  const classes = useStyles();
  const { currentMovie } = useAppState();

  const search = (value) => {
    updateQueryOption({
      search: value,
      searchBy: 'title',
    });
  };

  return (
    <div className={classes.mainImage}>
      <div className={classes.shadowed} id="header-content">
        {isEmpty(currentMovie) ? <Search onSearch={search} /> : <MovieDetails {...currentMovie} />}
      </div>
    </div>
  );
};
HeadContentStateless.propTypes = {
  updateQueryOption: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateQueryOption: (data) => dispatch(changeQueryOptions(data)),
});

const HeadContent = connect(null, mapDispatchToProps)(HeadContentStateless);

export { HeadContent };
