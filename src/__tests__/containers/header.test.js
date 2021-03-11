import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '../test-utils';
import { Header } from '../../containers/Header';

describe('Film card', () => {
  const addMovieStub = jest.fn();
  const clearMovieStub = jest.fn();

  function renderComponent(movie) {
    return render(
      <MemoryRouter initialEntries={['/movies']}>
        <Route exact path="/movies">
          <div id="root">
            <Header
              currentMovie={movie}
              addMovie={addMovieStub}
              clearMovie={clearMovieStub}
              loading={false}
            />
          </div>
        </Route>
      </MemoryRouter>
    );
  }

  beforeAll(() => {
    window.HTMLElement.prototype.addEventListener = jest.fn().mockImplementation(() => {});
  });

  afterAll(() => {
    window.HTMLElement.prototype.addEventListener.mockClear();
  });

  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //   });

  it('renders correctly', () => {
    const { container, queryByRole, queryByText } = renderComponent({
      id: 1,
      title: 'some',
      // others
    });

    expect(container.firstChild).toMatchSnapshot();
    expect(queryByRole('button')).not.toBeNull();
    expect(queryByText(/\+Add Movie/i)).toBeNull();
  });

  it('should render add movie action button', () => {
    const { queryByRole, queryByText } = renderComponent({});

    expect(queryByRole('button')).not.toBeNull();
    expect(queryByText(/\+Add Movie/i)).not.toBeNull();
  });

  it('should call clearMovie when clicking search icon', async () => {
    const { getByRole, queryByText } = renderComponent({
      id: 1,
      title: 'some',
      // others
    });

    const button = getByRole('button').firstChild.firstChild;

    expect(queryByText(/\+Add Movie/i)).toBeNull();

    await waitFor(() => {
      fireEvent.click(button);
    });

    expect(queryByText(/\+Add Movie/i)).not.toBeNull();
  });
});
