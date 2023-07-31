import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('mapper spects', () => {
  it.each<apiModel.Project>([undefined, null])(
    'should return empty project when it feeds %p',
    (members: any) => {
      // Arrange
      // Act
      const result: viewModel.Project = mapProjectFromApiToVm(members);
      // Assert
      expect(result).toEqual({
        id: '',
        name: '',
        externalId: '',
        comments: '',
        isActive: false,
        employees: [],
      });
    }
  );
  it('should return item one mapped item when it feeds project', () => {
    // Arrange
    const members: apiModel.EmployeeSummary[] = [
      { id: '1', isAssigned: false, employeeName: 'Test Name 1' },
      { id: '2', isAssigned: false, employeeName: 'Test Name 2' },
      { id: '3', isAssigned: false, employeeName: 'Test Name 3' },
    ];
    const project: apiModel.Project = {
      id: '1',
      name: 'Test project Name',
      externalId: '1',
      comments: 'Test comment',
      isActive: false,
      employees: members,
    };
    // Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    // Assert
    const expectResult: viewModel.Project = {
      id: '1',
      name: 'Test project Name',
      externalId: '1',
      comments: 'Test comment',
      isActive: false,
      employees: [
        { id: '1', isAssigned: false, employeeName: 'Test Name 1' },
        { id: '2', isAssigned: false, employeeName: 'Test Name 2' },
        { id: '3', isAssigned: false, employeeName: 'Test Name 3' },
      ],
    };
    expect(result).toEqual(expectResult);
  });
  it.each<apiModel.Project>([undefined, null])(
    'should return empty project.employess when it feeds %p',
    (members: any) => {
      // Arrange
      const project: apiModel.Project = {
        id: '',
        name: '',
        externalId: '',
        comments: '',
        isActive: false,
        employees: members,
      };
      // Act
      const result: viewModel.EmployeeSummary[] =
        mapProjectFromApiToVm(project).employees;
      // Assert
      expect(result).toEqual([]);
    }
  );
  it('should return array one mapped item when it feeds array with one item on projec.employees', () => {
    // Arrange
    const members: apiModel.EmployeeSummary[] = [
      { id: '1', isAssigned: false, employeeName: 'Test Name 1' },
    ];
    const project: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: members,
    };
    // Act
    const result: viewModel.EmployeeSummary[] =
      mapProjectFromApiToVm(project).employees;
    // Assert
    const expectResult: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: false,
        employeeName: 'Test Name 1',
      },
    ];
    expect(result).toEqual(expectResult);
  });
});
