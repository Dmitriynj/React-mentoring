/* eslint-disable func-names */
import React from 'react';
import { MemoryRouter, Route, __setSpy } from 'react-router-dom';
import { render, fireEvent } from '../test-utils';
import { Sorting } from '../../components/Sorting';

jest.useFakeTimers();

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <Sorting />
      </Route>
    </MemoryRouter>
  );
}

describe('Sorting', () => {
  const mockedPush = jest.fn();

  beforeEach(() => {
    __setSpy('useHistory', () => ({
      push: mockedPush,
    }));
  });

  it('renders correctly', () => {
    const { container, getByText } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(/RELEASE DATE/i)).toBeInTheDocument();
  });

  it('should call histor.push on change order', () => {
    const { getAllByRole } = renderComponent();
    const buttons = getAllByRole('button');
    const changeOrderButton = buttons[buttons.length - 1];

    fireEvent.click(changeOrderButton);
    expect(mockedPush).toBeCalledWith({ pathname: '/movies', search: 'sortOrder=desc' });

    fireEvent.click(changeOrderButton);
    expect(mockedPush).toBeCalledWith({ pathname: '/movies', search: 'sortOrder=asc' });
  });

  it('should call history.push on change field', () => {
    const { getByLabelText } = renderComponent();
    const selectInput = getByLabelText('select-input').children[1];

    fireEvent.change(selectInput, { target: { value: 'vote_average' } });
    expect(mockedPush).toBeCalledWith({ pathname: '/movies', search: 'sortBy=vote_average' });

    fireEvent.change(selectInput, { target: { value: 'budget' } });
    expect(mockedPush).toBeCalledWith({ pathname: '/movies', search: 'sortBy=budget' });

    fireEvent.change(selectInput, { target: { value: '' } });
    expect(mockedPush).toBeCalledWith({ pathname: '/movies', search: 'sortBy=release_date' });
  });
});
