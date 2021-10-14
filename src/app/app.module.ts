import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { N2ngBootstrapModule } from 'projects/n2ng-bootstrap/src/public-api';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    N2ngBootstrapModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
