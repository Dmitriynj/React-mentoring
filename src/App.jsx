import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MainView } from './views/MainView';
import { Header } from './containers/Header';
import './reset.css';
import './index.css';

const useStyles = makeStyles(() => ({
  main: { paddingTop: 20 },
  background: {
    backgroundColor: '#424242',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Header />
      <div className={classes.main}>
        <MainView />
      </div>
    </div>
  );
};

export { App };
