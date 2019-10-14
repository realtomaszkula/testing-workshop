import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment, CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  template: `
    <div *ngIf="loading" data-test="spinner">
      Loading...
    </div>
    <div *ngIf="error" data-test="error">
      {{ error }}
    </div>
    <div *ngIf="!error && !loading" data-test="comments">
      <ul>
        <li *ngFor="let comment of comments">
          {{ comment.body }}
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class CommentsComponent implements OnInit, OnDestroy {
  error: string | null = null;
  loading = false;
  comments: Comment[];

  private subcription: Subscription;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.commentsService.getComments().subscribe({
      next: comments => {
        this.loading = false;
        this.comments = comments;
      },
      error: error => {
        this.loading = false;
        this.error = error;
      }
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
