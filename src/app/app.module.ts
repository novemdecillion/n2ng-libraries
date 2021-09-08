import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { N2ngBootstrapModule } from 'projects/n2ng-bootstrap/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    N2ngBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
