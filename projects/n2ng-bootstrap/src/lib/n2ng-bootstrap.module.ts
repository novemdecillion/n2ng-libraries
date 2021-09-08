import { NgModule } from '@angular/core';
import { N2ngConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { N2ngSpinnerModule } from './spinner/spinner.module';
import { N2ngStepperModule } from './stepper/stepper.module';
import { N2ngTableModule } from './table/table.module';

@NgModule({
  exports: [
    N2ngConfirmDialogModule,
    N2ngStepperModule,
    N2ngSpinnerModule,
    N2ngTableModule
  ]
})
export class N2ngBootstrapModule { }
