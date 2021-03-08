import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '../test-utils';
import { NetflixLogo } from '../../components/NetflixLogo';

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <NetflixLogo />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('NetflixLogo', () => {
  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
