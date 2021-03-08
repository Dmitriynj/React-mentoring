import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '../test-utils';
import { FilterPanel } from '../../components/FilterPanel';

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <FilterPanel />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('FilterPanel panel', () => {
  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
