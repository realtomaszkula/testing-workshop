import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-add-todo',
  template: `
    <input type="text" placeholder="Type new content" [(ngModel)]="newContent" data-test="todo-input">
    <button (click)="addTodo()" data-test="todo-btn">Add</button>
  `,
  styles: []
})
export class AddTodoComponent {
  newContent: string;

  constructor(public service: TodosService) { }

  addTodo() {
    this.service.addTodo(this.newContent);
    this.newContent = '';
  }

  // Excercise: add implementation to avoid adding empty TODO item.
}
