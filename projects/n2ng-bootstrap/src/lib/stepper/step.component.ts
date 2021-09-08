import { Component, ContentChild, Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[n2ng-step-header]',
})
export class N2ngStepHeaderDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Component({
  selector: 'n2ng-step',
  templateUrl: './step.component.html',
  styleUrls: [ './step.component.scss' ]
})
export class N2ngStepComponent {
  @Input() label?: string

  no = 0;
  isActive = false;

  isLast?: boolean;

  @ContentChild(N2ngStepHeaderDirective) header?: N2ngStepHeaderDirective;
}
