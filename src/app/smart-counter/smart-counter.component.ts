import { Component } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-smart-counter',
  template: `
    <app-dumb-counter
      [count]="counter.count$ | async"
      (increment)="counter.increment()"
      (decrement)="counter.decrement()"
    ></app-dumb-counter>
  `,
  styles: []
})
export class SmartCounterComponent {
  constructor(public counter: CounterService) {}
}
