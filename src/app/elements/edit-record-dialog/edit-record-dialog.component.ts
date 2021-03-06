import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {
  ICompany,
  IProject,
  IRecord,
  ITask,
} from 'src/app/models/firebase-entities.model';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';

@Component({
  selector: 'app-edit-record-dialog',
  templateUrl: './edit-record-dialog.component.html',
  styleUrls: ['./edit-record-dialog.component.scss'],
})
export class EditRecordDialogComponent implements OnInit {
  constructor(
    public firebaseApi: FirebaseApisService,
    public dialogRef: MatDialogRef<EditRecordDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}
  cancel() {
    this.dialogRef.close('canceled');
  }

  /**
   * company fields
   */
  company: ICompany;
  companies$: Observable<ICompany[]>;
  companyTermChanged(value: string) {
    this.companies$ = this.firebaseApi.getCompanies(value);
  }
  companySelected(company: ICompany) {
    this.company = company;
    this.companies$ = this.firebaseApi.getCompanies(company.title);
    // update projects
    this.projects$ = this.firebaseApi.getProjects(
      (this.project || {}).name,
      (this.company || {}).id || 0
    );
  }

  /**
   * project fields
   */
  project: IProject;
  projects$: Observable<IProject[]>;
  projectTermChanged(value: string) {
    this.projects$ = this.firebaseApi.getProjects(
      value,
      (this.company || {}).id || 0
    );
  }
  projectSelected(project: IProject) {
    this.project = project;
    this.projects$ = this.firebaseApi.getProjects(
      project.name,
      (this.company || {}).id || 0
    );
  }

  /**
   * task fields
   */
  task: ITask;
  tasks$: Observable<ITask[]>;
  taskTermChanged(value: string) {
    this.tasks$ = this.firebaseApi.getTasks(value);
  }
  taskSelected(task: ITask) {
    this.task = task;
    this.tasks$ = this.firebaseApi.getTasks(task.name);
  }

  hours: FormControl = new FormControl('', [Validators.required]);

  submit() {
    if (!this.project)
      return this.snackBar.open(`please choose a project`, null, {
        duration: 5000,
      });
    if (!this.task)
      return this.snackBar.open(`please choose a task`, null, {
        duration: 5000,
      });
    if (!this.hours.valid)
      return this.snackBar.open(
        `please define the hours spent on this task`,
        null,
        {
          duration: 5000,
        }
      );
    this.firebaseApi
      .editRecord({
        id: this.data.record.id,
        projectId: this.project.id,
        taskId: this.task.id,
        hours: this.hours.value,
      })
      .subscribe((_) => {
        this.dialogRef.close('editd');
      });
  }
  ngOnInit(): void {
    // fill default deta
    this.tasks$ = this.firebaseApi.getTasks((this.task || {}).name);
    this.firebaseApi
      .getProject(this.data.record.projectId)
      .subscribe((project: IProject) => {
        this.projectSelected(project);
        this.firebaseApi
          .getCompany(project.companyId)
          .subscribe((company: ICompany) => {
            this.companySelected(company);
          });
      });
    this.firebaseApi
      .getTask(this.data.record.taskId)
      .subscribe((task: ITask) => {
        this.taskSelected(task);
      });
    this.hours.setValue(this.data.record.hours);
  }
}

export interface IDialogData {
  record: IRecord;
}
