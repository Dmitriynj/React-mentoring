import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { throttle, isEmpty } from 'lodash';
import { NetflixLogo } from '../NetflixLogo';
import { ModalButton } from '../ModalButton';
import { ManagedMovie } from '../ManagedMovie';
import { Content } from './Content';
import { useAppState } from '../../hooks/useAppState';
import { movieFields } from '../../constants';

const CHANGE_HEADER_ON_SCROLLED_PIXELS = 280;
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
}));

const Header = () => {
  const classes = useStyles();
  const { currentMovie, setCurrentMovie } = useAppState();
  const [showSearchIcon, setShowSearchIcon] = useState();

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
    setShowSearchIcon(false);
    setCurrentMovie({});
  };

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NetflixLogo className={classes.logo} />
          </Typography>
          {showSearchIcon ? (
            <IconButton color="inherit" onClick={switchToInput}>
              <SearchIcon />
            </IconButton>
          ) : (
            <ModalButton
              title="Add Movie"
              actionText="+Add Movie"
              buttonClassName={classes.addMovieButton}
            >
              <ManagedMovie defaultMovieFields={movieFields} />
            </ModalButton>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.mainImage}>
        <Content />
      </div>
    </>
  );
};

export { Header };
