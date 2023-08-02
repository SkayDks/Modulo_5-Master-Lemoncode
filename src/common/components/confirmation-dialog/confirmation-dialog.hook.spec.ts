import { renderHook, act, waitFor } from '@testing-library/react';
import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';
describe('useConfirmationDialog specs', () => {
  it('should return and object: isOpen with default values', () => {
    //Arrange
    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    //Assert
    expect(result.current.isOpen).toEqual(false);
  });
  it('should return and object: itemToDelete with default values', () => {
    //Arrange
    const defaultDeleteItem: Lookup = { id: '', name: '' };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    //Assert
    expect(result.current.itemToDelete).toEqual(defaultDeleteItem);
  });
  it('should update deleteItem and isOpen when it calls onOpenDialog', () => {
    //Arrange
    const testDeleteItem: Lookup = { id: '1', name: 'Test' };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(testDeleteItem);
    });
    //Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(testDeleteItem);
  });
  it('should update and isOpen when it calls onClose after onOpenDialog', () => {
    //Arrange
    const testDeleteItem: Lookup = { id: '1', name: 'Test' };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(testDeleteItem);
    });
    expect(result.current.isOpen).toEqual(true);
    act(() => {
      result.current.onClose();
    });
    //Assert
    expect(result.current.isOpen).toEqual(false);
  });
  it('should update deleteItem to empty item when it calls onAccept after onOpenDialog', () => {
    //Arrange
    const testDeleteItem: Lookup = { id: '1', name: 'Test' };
    const emptyDeleteItem: Lookup = { id: '', name: '' };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(testDeleteItem);
    });
    expect(result.current.itemToDelete).toEqual(testDeleteItem);
    act(() => {
      result.current.onAccept();
    });    
    //Assert
    expect(result.current.itemToDelete).toEqual(emptyDeleteItem);
  });
});
