import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { CounterComponent } from './counter/counter.component';
import { PadStartPipe } from './pad-start-pipe/pad-start.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SmartCounterComponent } from './smart-counter/smart-counter.component';
import { DumbCounterComponent } from './smart-counter/dumb-counter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    PadStartPipe,
    TodoListComponent,
    AddTodoComponent,
    CommentsComponent,
    ProductDetailsComponent,
    SmartCounterComponent,
    DumbCounterComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
