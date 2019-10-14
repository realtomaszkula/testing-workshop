import { TodosAsyncService } from './todos-async.service';

describe('TodosAsyncService', () => {
  let service: TodosAsyncService;

  beforeEach(() => {
    service = new TodosAsyncService();
  });

  it('should return empty array by default', done => {
    service.getTodos().subscribe(next => {
      expect(next).toEqual([]);
      done();
    });
  });

  it('should add todo and return observable with id', done => {
    service.addTodo('first test TODO item').subscribe(next => {
      expect(next).toEqual(0);
      done();
    });
  });

  it('should complete after first element on add', done => {
    let cnt = 0;
    service.addTodo('first test TODO item').subscribe({
      next: _ => ++cnt,
      complete: () => {
        expect(cnt).toEqual(1);
        done();
      }
    });
  });

  it('should complete after first element on get', done => {
    let cnt = 0;
    service.getTodos().subscribe({
      next: _ => ++cnt,
      complete: () => {
        expect(cnt).toEqual(1);
        done();
      }
    });
  });

  it('should add todo into items', done => {
    const expectedContent = 'another todo added in the test';
    service.addTodo(expectedContent);
    service.getTodos().subscribe(next => {
      expect(next).toEqual([
        { id: 0, content: expectedContent, completed: false }
      ]);
      done();
    });
  });

  it('should remove todo', done => {
    let id;
    service.addTodo('todo to be removed').subscribe(n => (id = n));
    service.removeTodo(id);
    service.getTodos().subscribe(next => {
      expect(next).toEqual([]);
      done();
    });
  });

  it('should complete after first element on remove', done => {
    let cnt = 0;
    service.removeTodo(1).subscribe({
      next: _ => ++cnt,
      complete: () => {
        expect(cnt).toEqual(1);
        done();
      }
    });
  });
});
