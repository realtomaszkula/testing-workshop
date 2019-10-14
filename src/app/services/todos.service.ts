import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: Todo[] = [];
  private id = 0;

  addTodo(content: string): number {
    const id = this.id++;
    this.todos.push({ id: id, content: content, completed: false });
    return id;
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(m => m.id !== id);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  // Excercise 1: implement a method to get a single todo by id;

  // Excercise 2: implement a methods to update todo's;

  constructor() {}
}
