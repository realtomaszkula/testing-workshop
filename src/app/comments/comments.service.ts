import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Comment {
  id: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor() {}

  getComments(): Observable<Comment[]> {
    return of([]);
  }
}
