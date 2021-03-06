/* eslint-disable react/prop-types */
import React from 'react';
import { MemoryRouter, Route, __setSpy } from 'react-router-dom';
import { render, fireEvent } from '../test-utils';
import { MoviePagination } from '../../components/MoviePagination';

const TestComponent = ({ totalAmount, limit, offset }) => (
  <MemoryRouter initialEntries={['/movies']}>
    <Route exact path="/movies">
      <div id="manage-panel">dummy manage panel</div>
      <MoviePagination totalAmount={totalAmount} limit={limit} offset={offset} />
    </Route>
  </MemoryRouter>
);

function renderComponent({ ...props }) {
  return render(<TestComponent {...props} />, { initialState: {} });
}

describe('Movie pagination', () => {
  const mockedPush = jest.fn();

  beforeEach(() => {
    __setSpy('useHistory', () => ({
      push: mockedPush,
    }));
  });

  it('should renders and re-renders correctly', () => {
    const { container, queryByLabelText, rerender } = renderComponent({
      totalAmount: 1000,
      limit: 10,
      offset: 0,
    });

    expect(container.firstChild).toMatchSnapshot();
    expect(queryByLabelText('Go to previous page')).not.toBeNull();
    expect(queryByLabelText('page 1')).not.toBeNull();
    expect(queryByLabelText('Go to page 5')).not.toBeNull();
    expect(queryByLabelText('Go to next page')).not.toBeNull();

    rerender(<TestComponent totalAmount={1000} limit={10} offset={200} />);
    expect(queryByLabelText('page 21')).not.toBeNull();

    rerender(<TestComponent totalAmount={1000} limit={10} offset={0} />);
    expect(queryByLabelText('page 1')).not.toBeNull();
  });

  it('should not render pagination element if totalAmount less or equal 0', () => {
    const { queryByLabelText } = renderComponent({
      totalAmount: 0,
      limit: 10,
      offset: 0,
    });

    expect(queryByLabelText('Go to previous page')).toBeNull();
    expect(queryByLabelText('page 1')).toBeNull();
    expect(queryByLabelText('Go to next page')).toBeNull();
  });

  it('should call history push on page change', () => {
    const { getByLabelText } = renderComponent({
      totalAmount: 100,
      limit: 10,
      offset: 0,
    });
    window.HTMLElement.prototype.scrollIntoView = jest.fn().mockImplementationOnce(() => {});

    fireEvent.click(getByLabelText('Go to page 5'));
    expect(mockedPush).toBeCalledWith({ pathname: '/movies', search: 'offset=40' });
  });
});
