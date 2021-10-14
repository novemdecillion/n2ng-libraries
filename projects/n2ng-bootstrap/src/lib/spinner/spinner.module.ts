import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { N2ngSpinnerComponent } from './spinner.component';

const DECLARATIONS = [
  N2ngSpinnerComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class N2ngSpinnerModule { }
