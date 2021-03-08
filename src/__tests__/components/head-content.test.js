import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '../test-utils';
import { HeadContent } from '../../components/HeadContent';

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <HeadContent />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('Head content', () => {
  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
