import React from 'react';
import PropTypes from 'prop-types';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
// import HeaderComp from './containers/Header';
import { NoMovies } from './components/NoMovies';
// import { HeadContent } from './components/HeadContent';
// import { SearchResults } from './containers/SearchResults';
import { NotFound } from './components/NotFound';
// import { FilterPanel } from './components/FilterPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
// import { NotificationsProvider } from './containers/NotificationsProvider';
// import { configureStore } from './store/store';

const generateClassName = createGenerateClassName();

// const store = configureStore();

const App = ({ location, Router, context }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (context) {
    console.log('have context', context);
  }

  console.log('location', location);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CssBaseline />
      <ErrorBoundary>
        {/* <Provider store={store}> */}
        {/* <NotificationsProvider> */}
        <Router location={location}>
          <Switch>
            <Route exact path={['/movies', '/movie/:id', '/no-movies']}>
              header
              {/* <HeaderComp />
                <HeadContent />
                <FilterPanel /> */}
              <Switch>
                <Route path="/no-movies">
                  <NoMovies />
                </Route>
                <Route path={['/movies', '/movie/:id']}>
                  This will be movies page
                  {/* <SearchResults /> */}
                </Route>
              </Switch>
            </Route>
            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
        {/* </NotificationsProvider> */}
        {/* </Provider> */}
      </ErrorBoundary>
    </StylesProvider>
  );
};
App.propTypes = {
  location: PropTypes.string,
  Router: PropTypes.object.isRequired,
  context: PropTypes.object,
};
App.defaultProps = {
  location: '/',
  context: undefined,
};

export { App };
