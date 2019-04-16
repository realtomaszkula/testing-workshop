import { Component } from '@angular/core';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todo-list',
  template: `
    <ul>
      <li *ngFor="let todo of service.getTodos()" data-test="todo">
        <span data-test="todo-content">{{ todo.content }}</span>
      </li>
    </ul>
  `,
  styles: [],
})
export class TodoListComponent {
  constructor(private service: TodosService) {}

  // Exercise: should render todo.completed
}
