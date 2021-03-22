import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, Redirect } from 'react-router-dom';
import HeaderComp from './containers/Header';
import { NoMovies } from './components/NoMovies';
import { HeadContent } from './components/HeadContent';
import { SearchResults } from './containers/SearchResults';
import { NotFound } from './components/NotFound';
import { FilterPanel } from './components/FilterPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationsProvider } from './containers/NotificationsProvider';

const generateClassName = createGenerateClassName();

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CssBaseline />
      <ErrorBoundary>
        <NotificationsProvider>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                console.log('redirecting to movies');
                return <Redirect exact to="/movies" />;
              }}
            />
            <Route exact path={['/movies', '/movie/:id', '/no-movies']}>
              <HeaderComp />
              <HeadContent />
              <FilterPanel />
              <Switch>
                <Route path="/no-movies">
                  <NoMovies />
                </Route>
                <Route path={['/movies', '/movie/:id']}>
                  <SearchResults />
                </Route>
              </Switch>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          {/* </Router> */}
        </NotificationsProvider>
      </ErrorBoundary>
    </StylesProvider>
  );
};

export { App };
