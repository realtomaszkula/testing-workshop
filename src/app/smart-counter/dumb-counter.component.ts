import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dumb-counter',
  template: `
    <button (click)="decrement.emit()">-</button>
    <span>{{ count }}</span>
    <button (click)="increment.emit()">-</button>
  `,
  styles: []
})
export class DumbCounterComponent {
  @Input() count: number;
  @Output() decrement = new EventEmitter<void>();
  @Output() increment = new EventEmitter<void>();
}
