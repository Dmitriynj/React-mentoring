import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FormField } from '../../components/FormField';

describe('Form field', () => {
  test('should change value', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <FormField
        alias="title"
        type="text"
        label="Title"
        value=""
        onChange={onChange}
        errorMsg="something incorrect"
        touched
      />
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(/title/i)).toBeInTheDocument();
    expect(getByText(/something incorrect/i)).toBeInTheDocument();
  });
});
