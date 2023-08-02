import  Axios  from 'axios';
import { Employee } from './employee.api-model';
import { mockEmployee } from './employee.mock-data';

const url = '/api/employees';

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const { data } = await Axios.get<Employee>(`${url}/${id}`);
  
  return data;
};