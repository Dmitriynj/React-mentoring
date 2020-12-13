import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MainView } from './views/MainView';
import { Header } from './Header';
import { ErrorBoundary } from './ErrorBoundary';
import './reset.css';
import './index.css';

const useStyles = makeStyles(() => ({
  main: { paddingTop: 20 },
  background: {
    backgroundColor: '#232323',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ErrorBoundary>
      <div className={classes.background}>
        <Header />
        <div className={classes.main}>
          <MainView />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export { App };
