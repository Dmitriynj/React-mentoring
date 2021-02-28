/* eslint-disable func-names */
import React from 'react';
import _ from 'lodash';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Search } from '../../components/Search';

const mockedPush = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  const mockedModule = jest.createMockFromModule('react-router-dom');

  // mock useHistory only
  return {
    ...mockedModule,
    ...originalModule,
    useHistory: () => ({
      push: mockedPush,
    }),
  };
});

jest.useFakeTimers();

function renderComponent() {
  return render(
    <MemoryRouter initialEntries={['/movies']}>
      <Route exact path="/movies">
        <Search />
      </Route>
    </MemoryRouter>
  );
}

describe('Search', () => {
  beforeEach(() => {
    /**
     * _.debounce spy is needed due to
     * this issue https://github.com/facebook/jest/issues/3465
     */
    jest.spyOn(_, 'debounce').mockImplementation(function (fn, delay) {
      let timer = null;
      return function () {
        const context = this;
        // eslint-disable-next-line prefer-rest-params
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    });
  });

  it('renders correctly', () => {
    const { container, getByText } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(/find your movie/i)).toBeInTheDocument();
  });

  it('changes input value', () => {
    renderComponent();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'some text' } });

    expect(mockedPush).not.toBeCalled();
    act(() => {
      jest.runAllTimers();
    });

    expect(mockedPush).toHaveBeenCalledWith({ pathname: '/movies', search: 'search=some+text' });
  });
});
