import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '../test-utils';
import { NoMovies } from '../../components/NoMovies';

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <NoMovies />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('NoMovies', () => {
  it('renders correctly', () => {
    const { container, queryByText } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
    expect(queryByText('No movies found')).toMatchSnapshot();
  });
});
