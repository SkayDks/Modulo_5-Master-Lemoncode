import React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  RowRendererProps,
  RowComponent,
  CellComponent,
} from 'common/components';
import { Employee } from '../employee-list.vm';

type Props = RowRendererProps<Employee>;

export const EmployeeRowComponent: React.FunctionComponent<Props> = ({
  row,
  onEdit,
  onDelete,
}) => {
  return (
    <RowComponent>
      <CellComponent>
        <Checkbox checked={row.isActive} disabled />
      </CellComponent>
      <CellComponent>{row.id}</CellComponent>
      <CellComponent>{row.name}</CellComponent>
      <CellComponent>{row.email}</CellComponent>
      <CellComponent>
        {row.lastDateIncurred}
        <IconButton aria-label="Edit employee" onClick={() => onEdit(row.id)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete employee" onClick={() => onDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </CellComponent>
    </RowComponent>
  );
};
