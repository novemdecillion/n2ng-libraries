import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { N2ngStepComponent, N2ngStepHeaderDirective } from './step.component';
import { N2ngNextStep, N2ngPrevStep, N2ngStepperComponent } from './stepper.component';

const DECLARATIONS = [
  N2ngStepHeaderDirective,
  N2ngStepperComponent,
  N2ngStepComponent,
  N2ngNextStep,
  N2ngPrevStep,
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    NgbCollapseModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class N2ngStepperModule { }
