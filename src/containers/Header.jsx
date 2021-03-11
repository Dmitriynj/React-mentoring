import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { throttle, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { NetflixLogo } from '../components/NetflixLogo';
import { Loader } from '../components/Loader';
import { ManageMovieForm } from '../components/shared/ManageMovieForm';
import { ModalWrapper } from '../components/shared/ModalWrapper';
import { createMovie } from '../store/thunks';
import { mapLoading, mapMovieDetails } from '../store/selectors';
import { clearMovieDetails } from '../store/actions';

const CHANGE_HEADER_ON_SCROLLED_PIXELS = 280;

const useStyles = makeStyles(() => ({
  addMovieButton: {
    color: 'inherit',
    fontWeight: 600,
  },
  logo: {
    fontSize: 100,
    height: '100%',
  },
  header: {
    display: 'flex',
    position: 'fixed',
    color: '#f65261',
    background: 'transparent',
    transition: 'background ease 0.3s',
    boxShadow: 'none',
  },
  toolbar: {
    padding: '0 3rem 0 3rem',
  },
  transparentHeader: {
    background: 'transparent',
  },
  filledHeader: {
    background: '#232323',
    border: '0',
    boxShadow: '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ loading, addMovie, currentMovie, clearMovie }) => {
  const classes = useStyles();
  const history = useHistory();
  const [showSearchIcon, setShowSearchIcon] = useState();
  const [isOpenModal, seIsOpenModal] = useState(false);

  React.useEffect(() => {
    if (isEmpty(currentMovie)) {
      setShowSearchIcon(false);
    } else {
      setShowSearchIcon(true);
    }
  }, [currentMovie]);

  React.useEffect(() => {
    const scrolledRoot = document.getElementById('root');

    const headerColorChange = throttle(() => {
      const windowsScrollTop = scrolledRoot.scrollTop;
      if (windowsScrollTop > CHANGE_HEADER_ON_SCROLLED_PIXELS) {
        document.body.getElementsByTagName('header')[0].classList.remove(classes.transparentHeader);
        document.body.getElementsByTagName('header')[0].classList.add(classes.filledHeader);
      } else {
        document.body.getElementsByTagName('header')[0].classList.add(classes.transparentHeader);
        document.body.getElementsByTagName('header')[0].classList.remove(classes.filledHeader);
      }
    }, 150);

    scrolledRoot.addEventListener('scroll', headerColorChange);
    return function cleanup() {
      scrolledRoot.removeEventListener('scroll', headerColorChange);
    };
  });

  const switchToInput = () => {
    console.log('switch');
    setShowSearchIcon(false);
    history.push('/movies');
    clearMovie();
  };

  const switchIsOpenModal = () => {
    seIsOpenModal((prev) => !prev);
  };

  const onAddMovie = (values) => {
    console.log('value', values);
    addMovie(values);
    switchIsOpenModal();
  };

  return (
    <AppBar position="static" className={classes.header}>
      <Loader loading={loading} />
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          <NetflixLogo className={classes.logo} />
        </Typography>
        {showSearchIcon ? (
          <IconButton color="inherit" onClick={switchToInput}>
            <SearchIcon />
          </IconButton>
        ) : (
          <>
            <Button type="button" onClick={switchIsOpenModal} className={classes.addMovieButton}>
              +Add Movie
            </Button>
            <ModalWrapper title="Add movie" open={isOpenModal} closeModal={switchIsOpenModal}>
              <ManageMovieForm onConfirm={onAddMovie} />
            </ModalWrapper>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
Header.propTypes = {
  currentMovie: PropTypes.object,
  addMovie: PropTypes.func.isRequired,
  clearMovie: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
Header.defaultProps = {
  currentMovie: {},
};

const mapStateToProps = (state) => ({
  currentMovie: mapMovieDetails(state),
  loading: mapLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  addMovie: (data) => dispatch(createMovie(data)),
  clearMovie: () => dispatch(clearMovieDetails()),
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
