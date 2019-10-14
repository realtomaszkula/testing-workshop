import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export interface AddResult {
  id: number;
}

export interface DeleteResult {
  result: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosAsyncService {
  private url = 'https://example.com/myService';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customm-Header': 'custom-value-here',
      Authorization: 'my-token'
    })
  };

  constructor(private client: HttpClient) {}

  addTodo(content: string): Observable<number> {
    return this.client
      .post<AddResult>(this.url, content, this.httpOptions)
      .pipe(map(result => result.id));
  }

  removeTodo(id: number): Observable<boolean> {
    const deleteUrl = this.url + '/' + id;
    return this.client
      .delete<DeleteResult>(deleteUrl, this.httpOptions)
      .pipe(map(result => result.result));
  }

  getTodos(): Observable<Todo[]> {
    return this.client.get<Todo[]>(this.url, this.httpOptions);
  }

  // Excercise 1: implement a method to get a single todo by id;

  // Excercise 2: implement a methods to update todo's;
}
