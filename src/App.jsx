import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainView } from './containers/MainView';
import { Header } from './containers/Header';
import { HeadContent } from './containers/HeadContent';
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
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HeadContent />
          <div className={classes.background}>
            <div className={classes.main}>
              <MainView />
            </div>
          </div>
        </Route>
        <Route exact path="/no-movies">
          <div>No movies found</div>
        </Route>
      </Switch>
    </Router>
  );
};

export { App };
