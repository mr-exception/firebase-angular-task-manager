export class Company {
  constructor(
    public id: number,
    public title: string,
    public description: string
  ) {}
}
export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public companyId: number,
    public tasks: Task[] = []
  ) {}
}
export class Record {
  constructor(
    public projectId: number,
    public taskId: number,
    public hours: number
  ) {}
}
export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {}
}
