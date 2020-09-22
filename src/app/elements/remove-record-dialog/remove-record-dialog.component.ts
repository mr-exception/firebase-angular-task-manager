import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IRecord } from 'src/app/models/firebase-entities.model';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';

@Component({
  selector: 'app-remove-record-dialog',
  templateUrl: './remove-record-dialog.component.html',
  styleUrls: ['./remove-record-dialog.component.scss'],
})
export class RemoveRecordDialogComponent implements OnInit {
  constructor(
    public firebaseApi: FirebaseApisService,
    public dialogRef: MatDialogRef<RemoveRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  remove() {
    this.firebaseApi.removeRecord(this.data.record).subscribe(() => {
      this.dialogRef.close('removed');
    });
  }
  cancel() {
    this.dialogRef.close('canceled');
  }
  ngOnInit(): void {}
}

export interface DialogData {
  record: IRecord;
}
