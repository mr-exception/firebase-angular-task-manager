/**
 * this component is service to provice methods for
 * comunicating with firebase service
 */
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import {
  exhaust,
  map,
  first,
  catchError,
  switchMap,
  combineAll,
} from 'rxjs/operators';
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
            record['project'] = this.getProject(record.projectId);
            record['task'] = this.getTask(record.taskId);
            return record;
          });
        })
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
