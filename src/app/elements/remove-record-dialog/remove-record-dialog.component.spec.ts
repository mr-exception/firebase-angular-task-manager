import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRecordDialogComponent } from './remove-record-dialog.component';

describe('RemoveRecordDialogComponent', () => {
  let component: RemoveRecordDialogComponent;
  let fixture: ComponentFixture<RemoveRecordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveRecordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
