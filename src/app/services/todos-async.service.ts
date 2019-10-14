import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosAsyncService {
  private todos: Map<number, Todo> = new Map();
  private id = 0;

  addTodo(content: string): Observable<number> {
    const id = this.id++;
    this.todos.set(id, { id: id, content: content, completed: false });
    return of(id);
  }

  removeTodo(id: number): Observable<boolean> {
    if (!this.todos.has(id)) return of(false);

    this.todos.delete(id);
    return of(true);
  }

  getTodos(): Observable<Todo[]> {
    return of(Array.from(this.todos.values()));
  }

  // Excercise 1: implement a method to get a single todo by id;

  // Excercise 2: implement a methods to update todo's;

  constructor() {}
}
