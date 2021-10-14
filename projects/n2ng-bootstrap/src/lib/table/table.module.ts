import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { N2ngTableCellDirective, N2ngTableColumnComponent, N2ngTableComponent, N2ngTableHeaderCellDirective } from './table.component';

const DECLARATIONS = [
  N2ngTableCellDirective,
  N2ngTableHeaderCellDirective,
  N2ngTableColumnComponent,
  N2ngTableComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class N2ngTableModule { }
