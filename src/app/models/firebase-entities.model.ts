/**
 * these interfaces are for firestore entities and their properties
 */
export interface ICompany {
  id: number;
  title: string;
  description: string;
}
export interface IProject {
  id: number;
  name: string;
  description: string;
  companyId: number;

  company?: ICompany;
}
export interface ISaveRecord {
  projectId: number;
  taskId: number;
  hours: number;

  project?: IProject;
  task?: ITask;
}
export interface IRecord {
  id: string;
  projectId: number;
  taskId: number;
  hours: number;

  project?: IProject;
  task?: ITask;
}
export class ITask {
  id: number;
  name: string;
  description: string;
}
