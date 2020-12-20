import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { throttle } from 'lodash';
import { NetflixLogo } from './NetflixLogo';
import { Search } from './Search';
import { ModalWindow } from './ModalWindow';
import { ManagedMovie } from './ManagedMovie';

const CHANGE_HEADER_ON_SCROLLED_PIXELS = 400;
const BACKGROUND_IMAGE_URL = 'background.jpg';

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
    padding: '0 3rem 0 3rem',
    position: 'fixed',
    color: '#f65261',
    background: 'transparent',
    transition: 'background ease 0.3s',
    boxShadow: 'none',
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

const movieFields = [
  { value: 'some', name: 'TITLE' },
  { value: 'some release date', name: 'RELEASE DATE' },
  { value: 'movie url', name: 'MOVIE URL' },
  { value: 'some genre', name: 'GENRE' },
  { value: 'some overview', name: 'OVERVIEW' },
  { value: 'some runtime', name: 'RUNTIME' },
];

const Header = () => {
  const classes = useStyles();

  React.useEffect(() => {
    const headerColorChange = throttle(() => {
      const windowsScrollTop = window.pageYOffset;
      if (windowsScrollTop > CHANGE_HEADER_ON_SCROLLED_PIXELS) {
        document.body.getElementsByTagName('header')[0].classList.remove(classes.transparentHeader);
        document.body.getElementsByTagName('header')[0].classList.add(classes.filledHeader);
      } else {
        document.body.getElementsByTagName('header')[0].classList.add(classes.transparentHeader);
        document.body.getElementsByTagName('header')[0].classList.remove(classes.filledHeader);
      }
    }, 150);

    window.addEventListener('scroll', headerColorChange);
    return function cleanup() {
      window.removeEventListener('scroll', headerColorChange);
    };
  });

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NetflixLogo className={classes.logo} />
          </Typography>
          <ModalWindow
            title="Add Movie"
            actionText="+Add Movie"
            buttonClassName={classes.addMovieButton}
          >
            <ManagedMovie defaultMovieFields={movieFields} />
          </ModalWindow>
        </Toolbar>
      </AppBar>
      <div className={classes.mainImage}>
        <div className={classes.shadowed}>
          <Search />
        </div>
      </div>
    </>
  );
};

export { Header };
