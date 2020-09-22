/**
 * this component is the home page with a list of records
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApisService } from '../../services/firebase-apis.service';

// import models
import { Record } from '../../models/firebase-entities.model';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RemoveRecordDialogComponent } from 'src/app/elements/remove-record-dialog/remove-record-dialog.component';
import { EditRecordDialogComponent } from 'src/app/elements/edit-record-dialog/edit-record-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public firebaseApi: FirebaseApisService,
    public dialog: MatDialog
  ) {}

  records$: Observable<Record[]> = this.firebaseApi.getRecords();
  sortData(event: Sort) {
    this.records$ = this.firebaseApi.getRecords(event);
  }
  openRemoveDialog(record: Record) {
    const dialogRef = this.dialog.open(RemoveRecordDialogComponent, {
      width: '400px',
      data: { record },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed with result ${result}`);
    });
  }
  openEditDialog(record: Record) {
    const dialogRef = this.dialog.open(EditRecordDialogComponent, {
      width: '700px',
      data: { record },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed with result ${result}`);
    });
  }
  ngOnInit() {}
}
