import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClassyComponent } from './classy.component';

describe('ClassyComponent', () => {
  let component: ClassyComponent;
  let fixture: ComponentFixture<ClassyComponent>;
  const selectors = {
    button: () => fixture.debugElement.query(By.css('[data-test="toggle"]')),
    content: () => fixture.debugElement.query(By.css('[data-test="content"]'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('clicking on button should toggle active class', () => {
    expect(selectors.content().classes['active']).toBe(false);
    selectors.button().nativeElement.click();
    fixture.detectChanges();
    expect(selectors.content().classes['active']).toBe(true);
    selectors.button().nativeElement.click();
    fixture.detectChanges();
    expect(selectors.content().classes['active']).toBe(false);
  });
});
