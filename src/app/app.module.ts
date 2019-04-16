import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { PadStartPipe } from './pad-start-pipe/pad-start.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    PadStartPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
