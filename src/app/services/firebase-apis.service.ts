/**
 * this component is service to provice methods for
 * comunicating with firebase service
 */
import { Injectable } from '@angular/core';
import { Observable, from, of, combineLatest } from 'rxjs';
import { exhaust, map, first, catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  Company,
  Project,
  Record,
  Task,
} from '../models/firebase-entities.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseApisService {
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}
  /**
   * this method retrives list of companies
   * @param title
   */
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
  /**
   * this method retrives a company by id
   * @param id
   */
  public getCompany(id: number) {
    return this.firestore
      .collection<Company>('companies', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  /**
   * this method retrives list of projects on firebase
   * @param name
   * @param companyId
   */
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
  /**
   * this method retrives a project by id
   * @param id
   */
  public getProject(id: number) {
    return this.firestore
      .collection<Project>('projects', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  /**
   * this method retrives the list of tasks on firebase
   * @param title
   */
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
  /**
   * this method retrives a task by id
   */
  public getTask(id: number) {
    return this.firestore
      .collection<Task>('tasks', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  /**
   * this methods retrives the list of records on firebase
   */
  public getRecords(): Observable<Record[]> {
    return this.firestore
      .collection<Record>('records')
      .valueChanges()
      .pipe(
        switchMap((records: Record[]) => {
          const projectIds = records.map((rc) => rc.projectId);
          const taskIds = records.map((rc) => rc.taskId);
          return combineLatest(
            of(records),
            combineLatest(projectIds.map((pid) => this.getProject(pid))),
            combineLatest(taskIds.map((tid) => this.getTask(tid)))
          );
        }),
        map(([records, projects, tasks]) =>
          records.map((record) => ({
            ...record,
            project: projects.find((p) => p.id === record.projectId),
            task: tasks.find((p) => p.id === record.taskId),
          }))
        )
      );
  }
  /**
   * inserts a new record in records collection
   * @param record
   */
  public saveRecord(record: Record): Observable<DocumentReference> {
    return from(this.firestore.collection('records').add(record));
  }

  /**
   * ==========================================================================================
   * auth methods
   * ==========================================================================================
   */
  authInformation: firebase.User;
  /**
   * login to firebase auth service
   * @param email
   * @param password
   */
  public login(email: string, password: string): Observable<boolean> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((response) => of(false)), // in case of invalid information
      map((response: firebase.auth.UserCredential): boolean => {
        if (!response) {
          this.authInformation = null;
          return false;
        } else {
          this.authInformation = response.user;
          return true;
        }
      })
    );
  }
  public logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
