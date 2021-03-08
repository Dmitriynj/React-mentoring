import React from 'react';
import { MemoryRouter, Route, __setSpy } from 'react-router-dom';
import { render, fireEvent } from '../test-utils';
import { NotFound } from '../../components/NotFound';

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <NotFound />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('NotFound', () => {
  const mockedPush = jest.fn();

  beforeEach(() => {
    __setSpy('useHistory', () => ({
      push: mockedPush,
    }));
  });

  it('renders correctly', () => {
    const { container, queryByText } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
    expect(queryByText('Lost your way?')).toMatchSnapshot();
  });

  it('should call history.push on go home', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Netflix Home'));

    expect(mockedPush).toBeCalledWith('/movies');
  });
});
