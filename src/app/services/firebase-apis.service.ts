import { Injectable } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import { combineAll, switchMap, mergeAll, concatAll } from 'rxjs/operators';
import { componentFactoryName } from '@angular/compiler';
// import models
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseApisService {
  constructor() {}
  public static getCompanies(term: string) {
    console.log(term);
    const companies = [
      new Company(1, 'salimon', 'salimon compnay'),
      new Company(2, 'revendal', 'revendal compnay'),
      new Company(3, 'tasmix', 'tasmix compnay'),
      new Company(4, 'absenat', 'absenat compnay'),
    ];
    return from([
      companies.filter((company: Company) =>
        company.title.includes(term) ? company : null
      ),
    ]);
  }
}
