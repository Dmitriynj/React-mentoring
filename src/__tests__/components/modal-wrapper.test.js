import React from 'react';
import { render } from '../test-utils';
import { ModalWrapper } from '../../components/shared/ModalWrapper';
import { ManageMovieForm } from '../../components/shared/ManageMovieForm';

describe('Modal wrapper', () => {
  let onConfirmMock;
  let tree;

  beforeEach(() => {
    onConfirmMock = jest.fn();
    tree = render(
      <ModalWrapper title="Add movie" open closeModal={() => {}}>
        <ManageMovieForm onConfirm={onConfirmMock} />
      </ModalWrapper>
    );
  });

  it('renders correctly', () => {
    expect(tree.container.firstChild).toMatchSnapshot();
  });
});
