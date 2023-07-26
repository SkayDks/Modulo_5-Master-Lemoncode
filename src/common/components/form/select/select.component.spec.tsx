import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectComponent } from './select.component';
import { Lookup } from 'common/models';
import { Formik, Form } from 'formik';

const renderWithFormik = (component, initialValues) =>
  render(
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {() => <Form>{component}</Form>}
    </Formik>
  );

describe('common/components/form/select/select.component spec', () => {
  it('should render a select element when it feeds required props and three items', () => {
    // Arrange
    const props = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ] as Lookup[],
      label: 'Test label',
      value: '',
    };
    // Act
    render(<SelectComponent {...props} />);
    const selectElement = screen.getByRole('button');
    // Assert
    expect(selectElement).toBeInTheDocument();
  });
  it('should render a menu with three item when it clicks on select element', async () => {
    // Arrange
    const props = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ] as Lookup[],
      label: 'Test label',
      value: '',
    };
    // Act
    render(<SelectComponent {...props} />);
    const selectElement = screen.getByRole('button');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await userEvent.click(selectElement);
    const menuElement = screen.getByRole('listbox');
    const itemElementList = screen.getAllByRole('option');
    // Assert
    expect(menuElement).toBeInTheDocument();
    expect(itemElementList).toHaveLength(3);
  });
  it('should calls onChange method with value equals 2 when it clicks on second item', async () => {
    // Arrange
    const props = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ] as Lookup[],
      label: 'Test label',
      value: '',
      onChange: jest.fn(),
    };
    // Act
    render(<SelectComponent {...props} />);
    const selectElement = screen.getByRole('button');
    await userEvent.click(selectElement);
    const itemElementList = screen.getAllByRole('option');
    await userEvent.click(itemElementList[1]);
    // Assert
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '2' } }),
      expect.anything()
    );
  });
  it('should update selected item when it clicks on third item using Formik', async () => {
    // Arrange
    const props = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ] as Lookup[],
      label: 'Test label',
      name: 'selectedItem',
    };
    // Act
    renderWithFormik(<SelectComponent {...props} />, { selectedItem: '1' });
    const selectElement = screen.getByRole('button');
    expect(selectElement.textContent).toEqual('Item 1');
    await userEvent.click(selectElement);
    const itemElementList = screen.getAllByRole('option');
    await userEvent.click(itemElementList[2]);
    // Assert
    expect(selectElement.textContent).toEqual('Item 3');
  });
});
