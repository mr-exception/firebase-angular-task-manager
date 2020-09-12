/**
 * these interfaces are for firestore entities and their properties
 */
export interface Company {
  id: number;
  title: string;
  description: string;
}
export interface Project {
  id: number;
  name: string;
  description: string;
  companyId: number;
}
export interface Record {
  projectId: number;
  taskId: number;
  hours: number;
}
export class Task {
  id: number;
  name: string;
  description: string;
}
