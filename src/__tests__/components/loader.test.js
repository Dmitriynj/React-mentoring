import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '../test-utils';
import { Loader } from '../../components/Loader';

function renderComponent(loading) {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <Loader loading={loading} />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('Loader', () => {
  it('should render progressbar if loading true', () => {
    const { container, queryByRole } = renderComponent(true);
    expect(container.firstChild).toMatchSnapshot();
    expect(queryByRole('progressbar')).not.toBeNull();
  });

  it('should not render progressbar if loading false', () => {
    const { queryByRole } = renderComponent(false);
    expect(queryByRole('progressbar')).toBeNull();
  });
});
