import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('confirmation.dialog component specs', () => {
  it('should not show the dialog commponet when isOpen is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: () => {},
      onClose: () => {},
      title: '',
      labels: { acceptButton: '', closeButton: '' },
      children: '',
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.queryByRole('dialog');
    // Assert
    expect(dialogElement).not.toBeInTheDocument();
  });
  it('should show the texts in the indicated place with the texts passed through the props', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Test Title',
      labels: { acceptButton: 'Test Accept', closeButton: 'Test Close' },
      children: <div>Test Children</div>,
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const titleElement = screen.getByRole('heading', {
      name: 'Test Title',
    });
    const childrenElement = screen.getByText('Test Children');
    const buttonElementA = screen.getByRole('button', {
      name: 'Test Accept',
    });
    const buttonElementB = screen.getByRole('button', {
      name: 'Test Close',
    });
    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
    expect(buttonElementA).toBeInTheDocument();
    expect(buttonElementB).toBeInTheDocument();
  });
  it('should call onClose when clicks on "Close" button', async () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: jest.fn(),
      title: 'Test Title',
      labels: { acceptButton: 'Test Accept', closeButton: 'Test Close' },
      children: 'Test Children Content',
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonElement = screen.getByRole('button', {
      name: 'Test Close',
    });
    await userEvent.click(buttonElement);
    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });
  it('should call onAcept and onClose when clicks on "Accept" button', async () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Test Title',
      labels: { acceptButton: 'Test Accept', closeButton: 'Test Close' },
      children: 'Test Children Content',
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonElement = screen.getByRole('button', {
      name: 'Test Accept',
    });
    await userEvent.click(buttonElement);
    // Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
