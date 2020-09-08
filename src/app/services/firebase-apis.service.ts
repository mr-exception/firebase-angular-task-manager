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
      new Company(1, 'salimon', 'sad tried grass me chicken selection sheep felt tobacco may pilot handle kids high use population find blood suit sweet title distant under children'),
      new Company(2, 'revendal', 'trap claws ought terrible simply pony south lift deeply support path larger proud young direction indicate mean string floor flag speak though beautiful highway'),
      new Company(3, 'tasmix', 'baby sport chose these tight order we partly fat part recognize start tonight being horse fed teeth effort before impossible dangerous layers minerals grown'),
      new Company(4, 'absenat', 'rose supper escape vessels enjoy language behind die twelve mark passage funny nation screen worried wagon changing my table beauty replace milk children shout'),
    ];

    companies = companies.filter((company: Company) =>
      company.title.includes(name) ? company : null
    );
    return from([companies]);
  }
  public static getProjects(name: string = '', companyId: number = 0) {
    let projects: Project[] = [
      new Project(1, 'ruler', 'nearly loose pipe wherever mass sail lips inside north canal teacher frame pride bet loss muscle saved themselves part rock actual invented guide jump', 1, []),
      new Project(2, 'whether', 'widely herd arrive statement birth cage handsome kept do frozen lie than form night lovely sunlight garage more join cow potatoes east actually coming', 3, []),
      new Project(3, 'broke', 'sing disappear interest low drink surface does theory population tell equipment forth cloth ago tobacco selection feature sitting setting printed using greatest aid naturally', 4, []),
      new Project(4, 'oxygen', 'same buffalo pond after aloud gentle collect naturally alone pupil surprise move song wait rocket younger percent tightly last flow street slipped thing helpful', 3, []),
      new Project(5, 'measure', 'wait led compound near think baby turn amount hospital oldest whatever rabbit oil pen thin invented native race branch lunch ourselves scale how tin', 1, []),
      new Project(6, 'previous', 'fourth refer level skin tax substance expression stiff tales layers feathers speed constantly development excellent spite whose drink friendly different nature score your dig', 4, []),
      new Project(7, 'industry', 'saw coach tin wait chance method agree trip essential basis point per nearer chart money merely tried ever price upward group than throughout fellow', 2, []),
      new Project(8, 'red', 'unless column enemy break supper home bell held vessels conversation share consist flame while welcome till to everything article although fight breath cross former', 1, []),
      new Project(9, 'nearby', 'condition frame lucky discovery native relationship steep valuable snow pour bend happily treated aid club usually wind disappear main none printed manufacturing watch cat', 3, []),
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
  public static getTasks(name: string = '') {
    let tasks: Task[] = [
      new Task(1, 'regular', 'particles folks simple till or eager pure tried fell stove pleasant tower outline east attempt usual nails these able pocket root fox fought cow'),
      new Task(1, 'per', 'post silly solution paid memory dance birth per understanding eventually social magnet bigger log sugar principle pot back out pool brought expression although gold'),
      new Task(1, 'naturally', 'turn driving raise little basic whenever event flew later heard compound explain behind population ill type century slope immediately highest reason glad moving after'),
      new Task(1, 'worker', 'afraid conversation trunk steam quiet double fact account meal baby natural running bear grandmother temperature observe brave women mirror slip kill usually built planning'),
      new Task(1, 'else', 'very throw depend coming trouble letter atom including according education silent smallest star passage pocket generally alive good therefore beautiful though speak spite soon'),
      new Task(1, 'several', 'dozen glad pool glass cross call size may handsome exact sell refer fun exist victory giant meet tongue instant doll per join of spent'),
      new Task(1, 'distant', 'coffee tree moon level whom loud plate carried balloon until matter ask line declared four shallow luck value grew applied pony sea weight dark'),
    ];

    tasks = tasks.filter((task: Task) =>
      task.name.includes(name) ? task : null
    );
    return from([tasks]);
  }
}
