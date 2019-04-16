import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    service = new TodosService();
  });

  it('should return empty array by default', () => {
    expect(service.getTodos()).toEqual([]);
  });

  it('should add item to array', () => {
    const expectedContent = 'alamakota';
    service.addTodo(expectedContent);
    expect(service.getTodos()).toEqual([{id: 0, content: expectedContent, completed: false}]);
  });

  it('should remove item from array', () => {
    const expectedContent = 'alamakota';
    const id = service.addTodo(expectedContent);
    service.removeTodo(id);
    expect(service.getTodos()).toEqual([]);
  });

});
