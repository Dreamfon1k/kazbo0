import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatButtonModule } from '@angular/material';
import {SchedulerModule} from "./scheduler/scheduler.module";
import { AppComponent } from './app.component';

@NgModule({
  imports:  [
    BrowserModule,
    SchedulerModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

