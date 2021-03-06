/**
 * this component is service to provice methods for
 * comunicating with firebase service
 */
import { Injectable } from '@angular/core';
import { Observable, from, of, combineLatest } from 'rxjs';
import { exhaust, map, first, catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ICompany,
  IProject,
  IRecord,
  ISaveRecord,
  ITask,
} from '../models/firebase-entities.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { Sort } from '@angular/material/sort';

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
  public getCompanies(title: string = ''): Observable<ICompany[]> {
    return this.firestore
      .collection<ICompany>('companies')
      .valueChanges()
      .pipe(
        map((companies: ICompany[]) =>
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
      .collection<ICompany>('companies', (ref) => ref.where('id', '==', id))
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
  ): Observable<IProject[]> {
    return this.firestore
      .collection<IProject>('projects')
      .valueChanges()
      .pipe(
        map((projects: IProject[]) => {
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
      .collection<IProject>('projects', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  /**
   * this method retrives the list of tasks on firebase
   * @param title
   */
  public getTasks(title: string = ''): Observable<ITask[]> {
    return this.firestore
      .collection<ITask>('tasks')
      .valueChanges()
      .pipe(
        map((tasks: ITask[]) =>
          tasks.filter((task) => (task.name.includes(title) ? task : null))
        )
      );
  }
  /**
   * this method retrives a task by id
   */
  public getTask(id: number) {
    return this.firestore
      .collection<ITask>('tasks', (ref) => ref.where('id', '==', id))
      .valueChanges()
      .pipe(exhaust(), first());
  }
  /**
   * this methods retrives the list of records on firebase
   */
  public getRecords(sort: Sort = null): Observable<IRecord[]> {
    return (this.firestore.collection('records', (ref) => {
      if (sort && sort.direction !== '') {
        return ref.orderBy(sort.active, sort.direction);
      } else {
        return ref;
      }
    }) as AngularFirestoreCollection<IRecord>)
      .snapshotChanges()
      .pipe(
        catchError((err) => of([])),
        map((actions) => {
          return (actions as DocumentChangeAction<IRecord>[]).map((action) => {
            const data = action.payload.doc.data() as IRecord;
            const id = action.payload.doc.id;
            const record = { id, ...data };
            return record;
          });
        }),
        switchMap((records: IRecord[]) => {
          const projectIds = records.map((rc) => rc.projectId);
          const taskIds = records.map((rc) => rc.taskId);
          return combineLatest([
            of(records),
            combineLatest(projectIds.map((pid) => this.getProject(pid))),
            combineLatest(taskIds.map((tid) => this.getTask(tid))),
          ]);
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
  public saveRecord(record: ISaveRecord): Observable<DocumentReference> {
    return from(this.firestore.collection('records').add(record));
  }
  /**
   * removes a record from records collection
   * @param record
   */
  public removeRecord(record: IRecord): Observable<void> {
    return from(this.firestore.doc<IRecord>(`records/${record.id}`).delete());
  }
  /**
   * updates the record in records collection based on record id
   * @param record
   */
  public editRecord(record: IRecord): Observable<void> {
    return from(
      this.firestore.doc<IRecord>(`records/${record.id}`).set(record)
    );
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
