import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as fakePromiseTraker from 'react-promise-tracker';

describe('SpinnerComponent specs', () => {
  /* beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  }); */
  it('should be displayed a spinnerComponent when a promise is pendings', async () => {
    // Arrange
    const stub = jest
      .spyOn(fakePromiseTraker, 'usePromiseTracker');
    
    render(<SpinnerComponent />);

    jest.advanceTimersByTime(2030);
    const spinnerElement = screen.getByRole('presentation');

    // Assert
    expect(spinnerElement).toBeInTheDocument();
  });
  /*
  it('should dont be displayed a spinnerComponent before a promise is pending', async () => {
    // Arrange
    // Act
    act(() => {
      render(<SpinnerComponent />);
      trackPromise(
        new Promise(() => {
          setTimeout(() => {}, 300);
        })
      ).then();
    });
    const spinnerElementBeforePromise = screen.queryByRole('presentation');
    jest.advanceTimersByTime(20);
    const spinnerElementPendingPromise = screen.getByRole('presentation');
    // Assert
    expect(spinnerElementBeforePromise).not.toBeInTheDocument();
    expect(spinnerElementPendingPromise).toBeInTheDocument();
  });
   it('should dont be displayed a spinnerComponent before a promise is pending', async () => {
    // Arrange
    // Act
    trackPromise(
      new Promise(() => {
        setTimeout(() => {}, 300);
      })
    ).then();
    render(<SpinnerComponent />);
    const spinnerElementPendingPromise = screen.getByRole('presentation');
    // Assert
    expect(spinnerElementPendingPromise).toBeInTheDocument();

    jest.advanceTimersByTime(1000);
    await waitFor(() => {
      expect(spinnerElementPendingPromise).not.toBeInTheDocument();
    });
  }); */
});
