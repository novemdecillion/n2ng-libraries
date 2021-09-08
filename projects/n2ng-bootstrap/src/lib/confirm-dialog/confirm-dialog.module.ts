import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { N2ngConfirmDialogComponent } from './confirm-dialog.component';

const DECLARATIONS = [
  N2ngConfirmDialogComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    ReactiveFormsModule,
    NgbModalModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class N2ngConfirmDialogModule { }
