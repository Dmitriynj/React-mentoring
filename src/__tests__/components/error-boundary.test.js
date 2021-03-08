import React from 'react';
import { render } from '../test-utils';
import { ErrorBoundary } from '../../components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders correctly', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const Throw = () => {
      throw new Error();
    };

    const { getByText } = render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong.')).toBeDefined();

    spy.mockRestore();
  });
});
