import { TestBed } from '@angular/core/testing';

import { FirebaseApisService } from './firebase-apis.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';

describe('FirebaseApisService', () => {
  let service: FirebaseApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
    });
    service = TestBed.inject(FirebaseApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /**
   * fetch companies tests
   */
  it('should get companies', (done) => {
    service.getCompanies('').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        title: 'nadal',
        description:
          'dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue',
        id: 3,
      });
      expect(obs).toContain({
        title: 'absenat',
        id: 1,
        description:
          'pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis',
      });
      expect(obs).toContain({
        description:
          'diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel',
        title: 'salimon',
        id: 2,
      });
      done();
    });
  });
  it('should get companies with filter', (done) => {
    service.getCompanies('salimon').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        description:
          'diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel',
        title: 'salimon',
        id: 2,
      });
      done();
    });
  });
  it('should get empty companies list with filter', (done) => {
    service.getCompanies('salimon').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        description:
          'diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel',
        title: 'salimon',
        id: 2,
      });
      done();
    });
  });
  /**
   * fetch project tests
   */
  it('should get projects', (done) => {
    service.getProjects('', 0).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        companyId: 2,
        name: 'calculator',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames ac turpis. Dolor magna eget est lorem ipsum dolor sit. A pellentesque sit amet porttitor eget dolor morbi.',
        id: 3,
      });
      expect(obs).toContain({
        id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames ac turpis. Dolor magna eget est lorem ipsum dolor sit. A pellentesque sit amet porttitor eget dolor morbi.',
        companyId: 2,
        name: 'task maker',
      });
      expect(obs).toContain({
        companyId: 1,
        id: 2,
        name: 'todolist',
        description:
          'dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue',
      });
      expect(obs).toContain({
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit amet. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus.',
        name: 'sharing pad',
        id: 4,
        companyId: 3,
      });
      done();
    });
  });
  it('should get projects with companyId filter', (done) => {
    service.getProjects('', 1).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        companyId: 1,
        id: 2,
        name: 'todolist',
        description:
          'dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue',
      });
      done();
    });
  });
  it('should get projects with name filter', (done) => {
    service.getProjects('task', 0).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames ac turpis. Dolor magna eget est lorem ipsum dolor sit. A pellentesque sit amet porttitor eget dolor morbi.',
        companyId: 2,
        name: 'task maker',
      });
      done();
    });
  });
  it('should get projects with name and companyId filter', (done) => {
    service.getProjects('task', 1).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).not.toContain({
        id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames ac turpis. Dolor magna eget est lorem ipsum dolor sit. A pellentesque sit amet porttitor eget dolor morbi.',
        companyId: 2,
        name: 'task maker',
      });
      done();
    });
  });
  it('should get project with id 1', (done) => {
    service.getProject(1).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual({
        id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames ac turpis. Dolor magna eget est lorem ipsum dolor sit. A pellentesque sit amet porttitor eget dolor morbi.',
        companyId: 2,
        name: 'task maker',
      });
      done();
    });
  });
  /**
   * fetch task tests
   */
  it('should get tasks', (done) => {
    service.getTasks('').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        name: 'implement navbar',
        id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est velit egestas dui id ornare. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Venenatis lectus magna fringilla urna porttitor rhoncus.',
      });
      expect(obs).toContain({
        id: 2,
        name: 'implement notifications',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui id ornare. Eget felis eget nunc lobortis mattis. Pellentesque elit eget gravida cum sociis natoque penatibus et.',
      });
      expect(obs).toContain({
        id: 1,
        name: 'implemented fireauth',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit amet. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus.',
      });
      expect(obs).toContain({
        id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh sed. Erat nam at lectus urna duis convallis convallis tellus id. Quam viverra orci sagittis eu volutpat odio.',
        name: '404 page',
      });
      done();
    });
  });
  it('should get tasks', (done) => {
    service.getTasks('navbar').subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toContain({
        name: 'implement navbar',
        id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est velit egestas dui id ornare. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Venenatis lectus magna fringilla urna porttitor rhoncus.',
      });
      done();
    });
  });
  it('should get task with id 3', (done) => {
    service.getTask(3).subscribe((obs) => {
      expect(obs).toBeDefined();
      expect(obs).toEqual({
        name: 'implement navbar',
        id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est velit egestas dui id ornare. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Venenatis lectus magna fringilla urna porttitor rhoncus.',
      });
      done();
    });
  });
});
