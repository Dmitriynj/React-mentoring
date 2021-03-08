import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '../test-utils';
import { FilmsList } from '../../components/FilmsList';

const movies = [
  {
    id: 1,
    title: 'some title1',
    release_date: '2021-01-01',
    poster_path: 'some poster path1',
    genres: ['Documentary', 'Comedy'],
    runtime: 1,
    overview: 'some text1',
  },
  {
    id: 2,
    title: 'some title2',
    release_date: '2021-01-02',
    poster_path: 'some poster path2',
    genres: ['Documentary'],
    runtime: 2,
    overview: 'some text2',
  },
  {
    id: 3,
    title: 'some title3',
    release_date: '2021-01-03',
    poster_path: 'some poster path3',
    genres: ['Documentary'],
    runtime: 3,
    overview: 'some text3',
  },
  {
    id: 4,
    title: 'some title4',
    release_date: '2021-01-04',
    poster_path: 'some poster path4',
    genres: ['Documentary'],
    runtime: 4,
    overview: 'some text4',
  },
  {
    id: 5,
    title: 'some title5',
    release_date: '2021-01-05',
    poster_path: 'some poster path5',
    genres: ['Documentary'],
    runtime: 5,
    overview: 'some text5',
  },
  {
    id: 6,
    title: 'some title6',
    release_date: '2021-01-06',
    poster_path: 'some poster path6',
    genres: ['Documentary'],
    runtime: 6,
    overview: 'some text6',
  },
  {
    id: 7,
    title: 'some title7',
    release_date: '2021-01-07',
    poster_path: 'some poster path7',
    genres: ['Documentary'],
    runtime: 7,
    overview: 'some text7',
  },
  {
    id: 8,
    title: 'some title8',
    release_date: '2021-01-08',
    poster_path: 'some poster path8',
    genres: ['Documentary'],
    runtime: 8,
    overview: 'some text8',
  },
];

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <FilmsList movies={movies} />
      </Route>
    </MemoryRouter>,
    { initialState: { moviesData: { totalAmount: 4, data: movies, offset: 0, limit: 10 } } }
  );
}

describe('Films list', () => {
  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
