import React from 'react';
import { MemoryRouter, Route, __setSpy } from 'react-router-dom';
import { render, fireEvent } from '../test-utils';
import { GenreSelector } from '../../components/GenreSelector';

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <GenreSelector />
      </Route>
    </MemoryRouter>,
    { initialState: {} }
  );
}

describe('GenreSelector', () => {
  const mockedPush = jest.fn();

  beforeEach(() => {
    __setSpy('useHistory', () => ({
      push: mockedPush,
    }));
  });

  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call history.push', () => {
    const { getAllByRole } = renderComponent();
    const tabs = getAllByRole('tab');

    fireEvent.click(tabs[0]);
    expect(mockedPush).toBeCalledWith({
      pathname: '/movies',
      search: 'filter=&searchBy=title',
    });

    fireEvent.click(tabs[1]);
    expect(mockedPush).toBeCalledWith({
      pathname: '/movies',
      search: 'filter=Documentary&searchBy=title',
    });

    fireEvent.click(tabs[2]);
    expect(mockedPush).toBeCalledWith({
      pathname: '/movies',
      search: 'filter=Comedy&searchBy=title',
    });

    fireEvent.click(tabs[3]);
    expect(mockedPush).toBeCalledWith({
      pathname: '/movies',
      search: 'filter=Horror&searchBy=title',
    });

    fireEvent.click(tabs[4]);
    expect(mockedPush).toBeCalledWith({
      pathname: '/movies',
      search: 'filter=Crime&searchBy=title',
    });
  });
});
