import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Header } from './containers/Header';
import { NoMovies } from './components/NoMovies';
import { HeadContent } from './components/HeadContent';
import { SearchResults } from './containers/SearchResults';
import { NotFound } from './components/NotFound';
import { FilterPanel } from './components/FilterPanel';
import './reset.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/movies', '/movie/:id', '/no-movies']}>
          <Header />
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
        <Route exact path="/">
          <Redirect to="/movies" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export { App };
