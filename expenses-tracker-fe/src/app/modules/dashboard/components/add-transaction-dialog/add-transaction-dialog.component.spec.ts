import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionDialogComponent } from './add-transaction-dialog.component';

describe('AddTransactionDialogComponent', () => {
  let component: AddTransactionDialogComponent;
  let fixture: ComponentFixture<AddTransactionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransactionDialogComponent]
    });
    fixture = TestBed.createComponent(AddTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
