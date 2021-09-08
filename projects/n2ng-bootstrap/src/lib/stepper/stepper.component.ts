import { AfterContentInit, Component, ContentChildren, Directive, HostListener, Input, OnInit, QueryList } from '@angular/core';
import { N2ngStepComponent } from './step.component';


@Directive({
  selector: 'button[n2ngbNextStep]',
  host: {
    '[type]': 'type',
  }
})
export class N2ngNextStep {
  @Input() type: string = 'submit';

  constructor(public stepper: N2ngStepperComponent) {}

  @HostListener('click')
  handleClick() {
    this.stepper.next();
  }
}

@Directive({
  selector: 'button[n2ngbPrevStep]',
  host: {
    '[type]': 'type',
  }
})
export class N2ngPrevStep {
  @Input() type: string = 'button';

  constructor(public stepper: N2ngStepperComponent) {}

  @HostListener('click')
  handleClick() {
    this.stepper.previous();
  }
}


@Component({
  selector: 'n2ngb-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: [ './stepper.component.scss' ]
})
export class N2ngStepperComponent implements OnInit, AfterContentInit {
  @ContentChildren(N2ngStepComponent) steps?: QueryList<N2ngStepComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.steps) {
      this.steps
        .forEach((step, index) => {
          if (0 == index) {
            step.isActive = true;
          }
          step.no = index + 1;
        });

      this.steps.last.isLast = true;
    }
  }

  next() {
    this.steps?.find((step, index) => {
      if(step.isActive) {
        step.isActive = false;
        if (index + 1 < this.steps!.length) {
          this.steps!.get(index + 1)!.isActive = true;
        }
        return true;
      }
      return false;
    })

  }

  previous() {
    this.steps?.find((step, index) => {
      if(step.isActive) {
        step.isActive = false;
        if (0 <= index - 1) {
          this.steps!.get(index - 1)!.isActive = true;
        }
        return true;
      }
      return false;
    })

  }

}
