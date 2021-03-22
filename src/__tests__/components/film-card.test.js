import React from 'react';
import { MemoryRouter, Route, __setSpy } from 'react-router-dom';
import { render, fireEvent } from '../test-utils';
import { FilmCard } from '../../containers/FilmCard';

function renderComponent(movie) {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <div id="header-content">dummy header</div>
        <FilmCard movie={movie} />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('Film card', () => {
  const movie = {
    id: 12,
    title: 'some title',
    release_date: '2021-01-07',
    poster_path: 'some poster path',
    genres: ['Documentary', 'Comedy'],
    runtime: 123,
    overview: 'some text',
  };
  const mockedPush = jest.fn();
  let tree;

  beforeEach(() => {
    __setSpy('useHistory', () => ({
      push: mockedPush,
    }));
  });

  it('renders correctly', () => {
    tree = renderComponent(movie);
    expect(tree.getByText(/release date:/i)).toBeInTheDocument();
  });

  it('should call history.push', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn().mockImplementationOnce(() => {});

    const { getByTitle } = renderComponent(movie);

    fireEvent.click(getByTitle('Contemplative Reptile'));

    expect(mockedPush).toHaveBeenCalledWith('/movie/12');
  });
});
