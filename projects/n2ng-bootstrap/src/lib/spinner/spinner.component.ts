import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'n2ng-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class N2ngSpinnerComponent {
  @Input() public message: string = '';
}
