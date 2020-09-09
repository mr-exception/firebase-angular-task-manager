import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, zip, combineLatest, generate } from 'rxjs';
import {
  combineAll,
  switchMap,
  filter,
  concatAll,
  exhaust,
  map,
  pairwise,
  buffer,
  bufferCount,
} from 'rxjs/operators';
import { componentFactoryName } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
// import models
import {
  Company,
  Project,
  Record,
  Task,
} from '../models/firebase-entities.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

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
            projects = projects.filter((project) =>
              project.companyId === companyId ? project : null
            );
          }
          return projects;
        })
      );
  }
  public getTasks(name: string = ''): Observable<Task[]> {
    return this.firestore
      .collection<Task>('tasks')
      .valueChanges()
      .pipe(
        map((tasks: Task[]) =>
          tasks.filter((task) => (task.name.includes(name) ? task : null))
        )
      );
  }
  public async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
