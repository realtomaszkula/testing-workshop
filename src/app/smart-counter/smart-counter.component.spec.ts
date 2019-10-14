import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { CounterService } from './counter.service';
import { DumbCounterComponent } from './dumb-counter.component';
import { SmartCounterComponent } from './smart-counter.component';

class MockCounterService {
  count$ = new BehaviorSubject<number>(0);
  decrement = jasmine.createSpy();
  increment = jasmine.createSpy();
}
describe('SmartCounterComponent', () => {
  let component: SmartCounterComponent;
  let fixture: ComponentFixture<SmartCounterComponent>;
  let counter: DumbCounterComponent;
  let service: MockCounterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SmartCounterComponent,
        MockComponent(DumbCounterComponent)
      ],
      providers: [{ provide: CounterService, useClass: MockCounterService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    counter = fixture.debugElement
      .query(By.directive(DumbCounterComponent))
      .injector.get(DumbCounterComponent);
    service = TestBed.get(CounterService);
  });

  it('should delegate <app-dumb-counter> (increment) to counterService.increment()', () => {
    expect(service.increment).not.toHaveBeenCalled();
    counter.increment.emit();
    expect(service.increment).toHaveBeenCalled();
  });

  it('should delegate <app-dumb-counter> (decrement) to counterService.decrement()', () => {
    expect(service.increment).not.toHaveBeenCalled();
    counter.increment.emit();
    expect(service.increment).toHaveBeenCalled();
  });

  it('should set <app-dumb-counter> [count] to value of counterService.count$', () => {
    expect(counter.count).toBe(0);
    service.count$.next(5);
    fixture.detectChanges();
    expect(counter.count).toBe(5);
  });
});
