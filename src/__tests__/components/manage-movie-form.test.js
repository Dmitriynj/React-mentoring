import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ManageMovieForm } from '../../components/shared/ManageMovieForm';

describe('ManageMovie', () => {
  const initialMovie = {
    title: 'some title',
    release_date: '2021-01-07',
    poster_path: 'some poster path',
    genres: ['Documentary', 'Comedy'],
    runtime: 123,
    overview: 'some text',
  };
  let onConfirmMock;
  let tree;

  beforeEach(() => {
    onConfirmMock = jest.fn();
    tree = render(<ManageMovieForm initialMovie={initialMovie} onConfirm={onConfirmMock} />);
  });

  it('renders correctly', () => {
    expect(tree.container.firstChild).toMatchSnapshot();
    expect(tree.getByText(/title/i)).toBeInTheDocument();
    expect(tree.getByText(/release date/i)).toBeInTheDocument();
    expect(tree.getByText(/submit/i)).toBeInTheDocument();
  });

  it('should submit form', async () => {
    const rightClick = { button: 2 };

    fireEvent.click(tree.getByText('Submit'), rightClick);
    await waitFor(() => expect(onConfirmMock).toHaveBeenCalledWith(initialMovie));
  });
});
