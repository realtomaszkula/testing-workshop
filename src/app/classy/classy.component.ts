import { Component } from '@angular/core';

@Component({
  selector: 'app-classy',
  template: `
    <div [class.active]="isActive" data-test="content">
      Adipisicing cupidatat veniam in Lorem in eu id consectetur cupidatat duis.
    </div>
    <button (click)="isActive = !isActive" data-test="toggle">Toggle</button>
  `,
  styles: []
})
export class ClassyComponent {
  isActive = false;
}
