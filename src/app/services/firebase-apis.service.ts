import { Injectable } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import { combineAll, switchMap, mergeAll, concatAll } from 'rxjs/operators';
import { componentFactoryName } from '@angular/compiler';
// import models
import {
  Company,
  Project,
  Record,
  Task,
} from '../models/firebase-entities.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseApisService {
  constructor() {}
  public static getCompanies(name: string = '') {
    let companies: Company[] = [
      new Company(1, 'salimon', 'salimon compnay'),
      new Company(2, 'revendal', 'revendal compnay'),
      new Company(3, 'tasmix', 'tasmix compnay'),
      new Company(4, 'absenat', 'absenat compnay'),
    ];

    companies = companies.filter((company: Company) =>
      company.title.includes(name) ? company : null
    );
    return from([companies]);
  }
  public static getProjects(name: string = '', companyId: number = 0) {
    let projects: Project[] = [
      new Project(1, 'ruler', 'ruler project', 1, []),
      new Project(2, 'whether', 'whether project', 3, []),
      new Project(3, 'broke', 'broke project', 4, []),
      new Project(4, 'oxygen', 'oxygen project', 3, []),
      new Project(5, 'measure', 'measure project', 1, []),
      new Project(6, 'previous', 'previous project', 4, []),
      new Project(7, 'industry', 'industry project', 2, []),
      new Project(8, 'red', 'red project', 1, []),
      new Project(9, 'nearby', 'nearby project', 3, []),
    ];

    projects = projects.filter((project: Project) =>
      project.name.includes(name) ? project : null
    );
    if (companyId !== 0)
      projects = projects.filter((project: Project) =>
        project.companyId === companyId ? project : null
      );
    return from([projects]);
  }
}
