import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';

import { EditRecordDialogComponent } from './edit-record-dialog.component';
import { Record } from 'src/app/models/firebase-entities.model';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('EditRecordDialog', () => {
  let service: FirebaseApisService;
  let firebase;

  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogTestModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule,
        MatAutocompleteModule,
      ],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          },
        },
      ],
    });

    dialog = TestBed.inject(MatDialog);
    noop = TestBed.createComponent(NoopComponent);

    service = TestBed.inject(FirebaseApisService);
    firebase = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
  });

  it('should create', () => {
    const record: Record = {
      id: 'fakeid',
      projectId: 1,
      taskId: 1,
      hours: 1,
    };
    dialog.open(EditRecordDialogComponent, { data: { record } });

    noop.detectChanges();

    const caption = overlayContainerElement.querySelector(
      '.mat-dialog-content > p'
    );
    expect(caption.textContent).toBe('Are you sure from deleting this record?');

    const cancelBtn = overlayContainerElement.querySelector(
      '.mat-dialog-actions > button:nth-child(2)'
    );
    expect(cancelBtn.textContent).toBe('cancel');

    const removeBtn = overlayContainerElement.querySelector(
      '.mat-dialog-actions > button:nth-child(1)'
    );
    expect(removeBtn.textContent).toBe('remove');
  });
});

// Noop component is only a workaround to trigger change detection
@Component({
  template: '',
})
class NoopComponent {}

const TEST_DIRECTIVES = [EditRecordDialogComponent, NoopComponent];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [EditRecordDialogComponent],
})
class DialogTestModule {}
