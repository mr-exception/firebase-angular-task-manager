import { TestBed } from '@angular/core/testing';

import { FirebaseApisService } from './firebase-apis.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { ICompany, IProject, ITask } from '../models/firebase-entities.model';
import { of } from 'rxjs';

const setup = () => {
  const firebase = jasmine.createSpyObj('AngularFirestore', [
    'collection',
    'doc',
  ]);
  const service = TestBed.inject(FirebaseApisService);
  return { service, firebase };
};

describe('FirebaseApisService', () => {
  let service: FirebaseApisService;
  let firebase;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
    });
    service = setup().service;
    firebase = setup().firebase;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /**
   * fetch companies tests
   */
  it('should get companies', (done) => {
    // create mock data
    const data: ICompany[] = [
      { id: 1, title: 'some title', description: 'some description' },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getCompanies('').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          title: 'some title',
          description: 'some description',
        },
      ]);
      done();
    });
  });
  it('should get companies with filter', (done) => {
    // create mock data
    const data: ICompany[] = [
      { id: 1, title: 'some title', description: 'some description' },
      { id: 1, title: 'other title', description: 'some description' },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getCompanies('some').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        { id: 1, title: 'some title', description: 'some description' },
      ]);
      done();
    });
  });
  it('should get empty companies list with filter', (done) => {
    // create mock data
    const data: ICompany[] = [
      { id: 1, title: 'some title', description: 'some description' },
      { id: 1, title: 'other title', description: 'some description' },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getCompanies('salimon').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([]);
      done();
    });
  });
  /**
   * fetch project tests
   */
  it('should get projects', (done) => {
    // create mock data
    const data: IProject[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
        companyId: 2,
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getProjects('', 0).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
          companyId: 2,
        },
      ]);
      done();
    });
  });
  it('should get projects with companyId filter', (done) => {
    // create mock data
    const data: IProject[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
        companyId: 2,
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getProjects('', 2).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
          companyId: 2,
        },
      ]);
      done();
    });
  });
  it('should get projects with name filter', (done) => {
    // create mock data
    const data: IProject[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
        companyId: 2,
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getProjects('some', 0).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
          companyId: 2,
        },
      ]);
      done();
    });
  });
  it('should get projects with name and companyId filter', (done) => {
    // create mock data
    const data: IProject[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
        companyId: 2,
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getProjects('some', 0).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
          companyId: 2,
        },
      ]);
      done();
    });
  });
  it('should get project with id 1', (done) => {
    // create mock data
    const data: IProject[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
        companyId: 2,
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getProjects('some', 2).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
          companyId: 2,
        },
      ]);
      done();
    });
  });
  /**
   * fetch task tests
   */
  it('should get tasks', (done) => {
    // create mock data
    const data: ITask[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getTasks('').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
        },
      ]);
      done();
    });
  });
  it('should get tasks', (done) => {
    // create mock data
    const data: ITask[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getTasks('some').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual([
        {
          id: 1,
          name: 'some name',
          description: 'some description',
        },
      ]);
      done();
    });
  });
  it('should get task with id 3', (done) => {
    // create mock data
    const data: ITask[] = [
      {
        id: 1,
        name: 'some name',
        description: 'some description',
      },
    ];
    const valueChangesMock = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(data)),
    };
    // replace firestore in serivce
    firebase.collection.and.returnValue(valueChangesMock);
    service.firestore = firebase;

    // test the function
    service.getTask(3).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual({
        id: 1,
        name: 'some name',
        description: 'some description',
      });
      done();
    });
  });
});
