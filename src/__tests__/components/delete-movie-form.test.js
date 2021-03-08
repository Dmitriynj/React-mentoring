import React from 'react';
import { render } from '../test-utils';
import { DeleteMovieForm } from '../../components/DeleteMovieForm';

describe('Delete movie', () => {
  let onConfirmMock;
  let tree;

  beforeEach(() => {
    onConfirmMock = jest.fn();
    tree = render(<DeleteMovieForm onConfirm={onConfirmMock} />);
  });

  it('renders correctly', () => {
    expect(tree.container.firstChild).toMatchSnapshot();
    expect(tree.getByText(/are you really want to delete this movie?/i)).toBeInTheDocument();
  });
});
