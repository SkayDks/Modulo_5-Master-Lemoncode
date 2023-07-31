import Axios from 'axios';
import { Employee } from './employee-list.api-model';
import { mockEmployeeList } from './employee-list.mock-data';

let employeeList = [...mockEmployeeList];

const url = '/api/employees';

// Como no consegui que funcionara el server lo deje con el error
// para poder usar axios para poder interceptar con cypress
export const getEmployeeList = async (): Promise<Employee[]> => {
  const { data } = await Axios.get<Employee[]>(url);
  return data;
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  employeeList = employeeList.filter((e) => e.id !== id);
  return true;
};
