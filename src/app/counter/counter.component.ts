import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="downvote()" data-test="downvote">-</button>
    <span data-test="counter">{{ counter }}</span>
    <button (click)="upvote()" data-test="upvote">+</button>
  `,
  styles: [],
})
export class CounterComponent {
  counter = 0;

  upvote() {
    this.counter++;
  }
  downvote() {
    this.counter--;
  }
}
