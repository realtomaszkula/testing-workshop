import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../services/todos.service';
import { By } from '@angular/platform-browser';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let service: TodosService;

  const selectors = {
    input: '[data-test="todo-input"]',
    button: '[data-test="todo-btn"]'
  };

  const input = () => fixture.debugElement.query(By.css(selectors.input));
  const button = () => fixture.debugElement.query(By.css(selectors.button));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [ FormsModule ],
      providers: [ {provide: TodosService, useValue: { addTodo: jasmine.createSpy() }} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TodosService);
    fixture.detectChanges();
  });

  it('should add new item', () => {
    const expectedValue = 'submit high five for the trainers';
    input().nativeElement.value = expectedValue;
    input().nativeElement.dispatchEvent(new Event('input'));

    button().nativeElement.click();
    expect(service.addTodo).toHaveBeenCalledWith(expectedValue);
    expect(component.newContent).toBe('');
  });
});
