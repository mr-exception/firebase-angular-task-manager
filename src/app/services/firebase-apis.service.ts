/**
 * this component is service to provice methods for
 * comunicating with firebase service
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaust, map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  Company,
  Project,
  Record,
  Task,
} from '../models/firebase-entities.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseApisService {
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}
  public getCompanies(title: string = ''): Observable<Company[]> {
    return this.firestore
      .collection<Company>('companies')
      .valueChanges()
      .pipe(
        map((companies: Company[]) =>
          companies.filter((company) =>
            company.title.includes(title) ? company : null
          )
        )
      );
  }
  public getCompany(id: number) {
    return this.firestore
      .collection<Company>('companies', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  public getProjects(
    name: string = '',
    companyId: number = 0
  ): Observable<Project[]> {
    return this.firestore
      .collection<Project>('projects')
      .valueChanges()
      .pipe(
        map((projects: Project[]) => {
          projects = projects.filter((project) =>
            project.name.includes(name) ? project : null
          );
          if (companyId !== 0) {
            projects = projects.filter((project) => {
              return project.companyId.toString() === companyId.toString()
                ? project
                : null;
            });
          }
          return projects;
        })
      );
  }
  public getProject(id: number) {
    return this.firestore
      .collection<Project>('projects', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  public getTasks(title: string = ''): Observable<Task[]> {
    return this.firestore
      .collection<Task>('tasks')
      .valueChanges()
      .pipe(
        map((tasks: Task[]) =>
          tasks.filter((task) => (task.name.includes(title) ? task : null))
        )
      );
  }
  public getTask(id: number) {
    return this.firestore
      .collection<Task>('tasks', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }

  public getRecords(): Observable<Record[]> {
    return this.firestore
      .collection<Record>('records')
      .valueChanges()
      .pipe(
        map((records: Record[]) => {
          return records.map((record: Record) => {
            this.getProject(record.projectId).subscribe((project: Project) => {
              record['projectName'] = project.name;
            });
            this.getTask(record.taskId).subscribe((task: Task) => {
              record['taskName'] = task.name;
            });
            return record;
          });
        })
      );
  }

  public async saveRecord(record: Record) {
    return this.firestore.collection('records').add(record);
  }
  public async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
