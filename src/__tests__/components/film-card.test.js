import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FilmCard } from '../../components/FilmCard';
import { moviesReducer } from '../../store/reducers';

const store = createStore(moviesReducer, {});

describe('Delete movie', () => {
  const movie = {
    title: 'some title',
    release_date: '2021-01-07',
    poster_path: 'some poster path',
    genres: ['Documentary', 'Comedy'],
    runtime: 123,
    overview: 'some text',
  };
  let tree;

  //   beforeEach(() => {
  //     tree = render(
  //       <MemoryRouter initialEntries={['/movies']}>
  //         <Route exact path="/movies">
  //           <FilmCard movie={movie} />
  //         </Route>
  //       </MemoryRouter>
  //     );
  //   });

  it('renders correctly', () => {
    tree = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <Route exact path="/movies">
            <FilmCard movie={movie} />
          </Route>
        </MemoryRouter>
      </Provider>
    );
    // expect(tree.container.firstChild).toMatchSnapshot();
    expect(tree.getByText(/release date:/i)).toBeInTheDocument();
    // expect(tree.getByText(//i)).toBeInTheDocument();
  });
});
