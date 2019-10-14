import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private value = new BehaviorSubject(0);

  count$ = this.value.asObservable();

  decrement(): void {
    this.value.next(this.value.getValue() - 1);
  }
  increment(): void {
    this.value.next(this.value.getValue() + 1);
  }
}
