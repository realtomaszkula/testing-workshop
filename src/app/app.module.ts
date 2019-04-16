import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { PadStartPipe } from './pad-start-pipe/pad-start.pipe';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    PadStartPipe,
    TodoListComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
