import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Todo, TodosService } from '../services/todos.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const todos: Todo[] = [
    { id: 1, completed: false, content: 'hello' },
    { id: 2, completed: true, content: 'world' },
  ];
  const selectors = {
    todo: '[data-test="todo"]',
    content: '[data-test="todo-content"]',
  };
  const todoItems = () => fixture.debugElement.queryAll(By.css(selectors.todo));
  const todoContent = (t: DebugElement) =>
    t.query(By.css(selectors.content)).nativeElement.textContent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        { provide: TodosService, useValue: { getTodos: () => todos } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render todos', () => {
    expect(todoItems().length).toBe(2);
  });

  it('should render content', () => {
    const [t1, t2] = todoItems();

    expect(todoContent(t1)).toContain(todos[0].content);
    expect(todoContent(t2)).toContain(todos[1].content);
  });

  it('should render content', () => {
    const [t1, t2] = todoItems();

    expect(todoContent(t1)).toContain(todos[0].content);
    expect(todoContent(t2)).toContain(todos[1].content);
  });
});
