import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  const selectors = {
    counter: '[data-test="counter"]',
    upvote: '[data-test="upvote"]',
    downvote: '[data-test="downvote"]',
  };
  const upvote = () => fixture.debugElement.query(By.css(selectors.upvote));
  const counter = () => fixture.debugElement.query(By.css(selectors.counter));
  const downvote = () => fixture.debugElement.query(By.css(selectors.downvote));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display counter', () => {
    expect(counter()).not.toBeNull();
    expect(counter().nativeElement.textContent).toContain('0');
  });
  it('should display downvote button', () => {
    expect(downvote()).not.toBeNull();
    expect(downvote().nativeElement.textContent).toContain('-');
  });
  it('should display upvote button', () => {
    expect(upvote()).not.toBeNull();
    expect(upvote().nativeElement.textContent).toContain('+');
  });
  it('clicking on upvote button should increase counter', () => {
    upvote().nativeElement.click();
    expect(component.counter).toBe(1);
    fixture.detectChanges();
    expect(counter().nativeElement.textContent).toBe('1');
  });
  it('clicking on downvote button should increase downvote', () => {
    downvote().nativeElement.click();
    expect(component.counter).toBe(-1);
    fixture.detectChanges();
    expect(counter().nativeElement.textContent).toBe('-1');
  });
});
